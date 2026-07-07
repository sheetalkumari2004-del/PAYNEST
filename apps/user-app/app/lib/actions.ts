"use server";

import prisma from "@repo/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth";

type TransferResult = {
    success: boolean;
    message: string;
};

/**
 * Transfers `amount` (in paise, matching Balance.amount's unit) from the
 * signed-in user to the user identified by `toNumber`.
 *
 * Correctness under concurrency:
 * Two requests to move money between the same pair of users can arrive at
 * the same instant (e.g. two browser tabs, or a retried request). Without
 * row locking, both could read the same starting balance, both decide the
 * sender has enough money, and both write updated balances back — silently
 * letting a user overspend. We prevent this with SELECT ... FOR UPDATE
 * inside a transaction, which makes Postgres block any second transaction
 * from reading those specific Balance rows until the first one commits.
 *
 * Deadlock avoidance: if two transfers run concurrently in opposite
 * directions between the same two users, and each locked "sender's row
 * first", transaction A would hold A's lock waiting for B's, while
 * transaction B holds B's lock waiting for A's — a permanent deadlock.
 * Locking both rows in a fixed, global order (ascending userId) instead of
 * "sender first" means every concurrent transfer requests locks in the same
 * sequence, so that cycle can never form.
 */
export async function p2pTransfer(toNumber: string, amount: number): Promise<TransferResult> {
    const session = await getServerSession(authOptions);
    const fromUserId = Number(session?.user?.id);

    if (!fromUserId) {
        return { success: false, message: "You must be signed in to send money" };
    }
    if (!toNumber || !toNumber.trim()) {
        return { success: false, message: "Enter a recipient phone number" };
    }
    if (!Number.isFinite(amount) || amount <= 0) {
        return { success: false, message: "Enter a valid amount" };
    }

    const toUser = await prisma.user.findFirst({ where: { number: toNumber.trim() } });
    if (!toUser) {
        return { success: false, message: "No user found with that phone number" };
    }
    const toUserId = toUser.id;

    if (toUserId === fromUserId) {
        return { success: false, message: "You can't send money to yourself" };
    }

    const [firstId, secondId] = fromUserId < toUserId ? [fromUserId, toUserId] : [toUserId, fromUserId];

    try {
        await prisma.$transaction(async (tx) => {
            // Lock order is fixed (ascending userId), independent of sender/receiver.
            await tx.$queryRaw`SELECT * FROM "Balance" WHERE "userId" = ${firstId} FOR UPDATE`;
            await tx.$queryRaw`SELECT * FROM "Balance" WHERE "userId" = ${secondId} FOR UPDATE`;

            const senderBalance = await tx.balance.findUnique({ where: { userId: fromUserId } });

            if (!senderBalance || senderBalance.amount < amount) {
                throw new Error("INSUFFICIENT_BALANCE");
            }

            await tx.balance.update({
                where: { userId: fromUserId },
                data: { amount: { decrement: amount } },
            });

            await tx.balance.update({
                where: { userId: toUserId },
                data: { amount: { increment: amount } },
            });

            await tx.p2pTransfer.create({
                data: {
                    fromUserId,
                    toUserId,
                    amount,
                    status: "Success",
                },
            });
        });

        return { success: true, message: `Sent ${(amount / 100).toFixed(2)} INR successfully` };
    } catch (e: any) {
        if (e.message === "INSUFFICIENT_BALANCE") {
            return { success: false, message: "Insufficient balance" };
        }
        console.error(e);
        return { success: false, message: "Transfer failed, please try again" };
    }
}

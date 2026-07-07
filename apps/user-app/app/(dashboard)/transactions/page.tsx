import prisma from "@repo/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import { Transaction, TransactionsList } from "../../../components/TransactionsList";

async function getTransactions(): Promise<Transaction[]> {
    const session = await getServerSession(authOptions);
    const userId = Number(session?.user?.id);

    const [onRamps, sent, received] = await Promise.all([
        prisma.onRampTransaction.findMany({ where: { userId } }),
        prisma.p2pTransfer.findMany({
            where: { fromUserId: userId },
            include: { toUser: true }
        }),
        prisma.p2pTransfer.findMany({
            where: { toUserId: userId },
            include: { fromUser: true }
        }),
    ]);

    const onRampTxns: Transaction[] = onRamps.map(t => ({
        id: `onramp-${t.id}`,
        type: "Added Money",
        counterparty: t.provider,
        amount: t.amount,
        direction: "credit",
        time: t.startTime,
        status: t.status,
    }));

    const sentTxns: Transaction[] = sent.map(t => ({
        id: `sent-${t.id}`,
        type: "Sent",
        counterparty: t.toUser.number,
        amount: t.amount,
        direction: "debit",
        time: t.timestamp,
        status: t.status,
    }));

    const receivedTxns: Transaction[] = received.map(t => ({
        id: `received-${t.id}`,
        type: "Received",
        counterparty: t.fromUser.number,
        amount: t.amount,
        direction: "credit",
        time: t.timestamp,
        status: t.status,
    }));

    return [...onRampTxns, ...sentTxns, ...receivedTxns].sort(
        (a, b) => b.time.getTime() - a.time.getTime()
    );
}

export default async function() {
    const transactions = await getTransactions();

    return <div className="w-screen">
        <div className="text-4xl text-[#6a51a6] pt-8 mb-8 font-bold">
            Transactions
        </div>
        <div className="p-4">
            <TransactionsList transactions={transactions} />
        </div>
    </div>
}

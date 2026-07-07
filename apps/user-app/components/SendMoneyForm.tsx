"use client"
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { TextInput } from "@repo/ui/textinput";
import { useState } from "react";
import { p2pTransfer } from "../app/lib/actions";

export const SendMoneyForm = () => {
    const [number, setNumber] = useState("");
    const [amount, setAmount] = useState("");
    const [status, setStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);
    const [loading, setLoading] = useState(false);

    async function handleSend() {
        setStatus(null);
        const amountInPaise = Math.round(Number(amount) * 100);

        if (!number.trim()) {
            setStatus({ type: "error", message: "Enter a recipient phone number" });
            return;
        }
        if (!Number.isFinite(amountInPaise) || amountInPaise <= 0) {
            setStatus({ type: "error", message: "Enter a valid amount" });
            return;
        }

        setLoading(true);
        const result = await p2pTransfer(number.trim(), amountInPaise);
        setLoading(false);

        setStatus({ type: result.success ? "success" : "error", message: result.message });
        if (result.success) {
            setNumber("");
            setAmount("");
        }
    }

    return <Card title="Send Money">
        <div className="w-full">
            <TextInput label={"Recipient phone number"} placeholder={"1231231231"} onChange={setNumber} />
            <TextInput label={"Amount (INR)"} placeholder={"100"} onChange={setAmount} />
            {status && (
                <div className={`pt-2 text-sm ${status.type === "success" ? "text-green-600" : "text-red-600"}`}>
                    {status.message}
                </div>
            )}
            <div className="flex justify-center pt-4">
                <Button onClick={handleSend}>
                    {loading ? "Sending..." : "Send Money"}
                </Button>
            </div>
        </div>
    </Card>
}

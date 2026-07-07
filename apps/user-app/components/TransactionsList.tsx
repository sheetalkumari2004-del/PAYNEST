import { Card } from "@repo/ui/card";

export type Transaction = {
    id: string;
    type: string;
    counterparty: string;
    amount: number;
    direction: "credit" | "debit";
    time: Date;
    status: string;
};

export const TransactionsList = ({ transactions }: { transactions: Transaction[] }) => {
    if (!transactions.length) {
        return <Card title="All Transactions">
            <div className="text-center pb-8 pt-8">
                No transactions yet
            </div>
        </Card>
    }

    return <Card title="All Transactions">
        <div className="pt-2">
            {transactions.map(t => (
                <div key={t.id} className="flex justify-between border-b border-slate-200 py-2 last:border-0">
                    <div>
                        <div className="text-sm font-medium">
                            {t.type}{t.counterparty ? ` — ${t.counterparty}` : ""}
                        </div>
                        <div className="text-slate-600 text-xs">
                            {t.time.toDateString()} · {t.status}
                        </div>
                    </div>
                    <div className={`flex flex-col justify-center font-medium ${t.direction === "credit" ? "text-green-600" : "text-red-600"}`}>
                        {t.direction === "credit" ? "+" : "-"} Rs {(t.amount / 100).toFixed(2)}
                    </div>
                </div>
            ))}
        </div>
    </Card>
}

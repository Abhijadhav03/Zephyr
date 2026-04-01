import { ArrowRight, Banknote, CreditCard, Landmark, ShieldCheck, Smartphone, Zap } from "lucide-react";
import type { TransferData } from "../../../../types";
import React from "react";
import { motion } from "framer-motion";
import { cn } from "../../../../lib/utils";
interface PaymentMethodProps {
    onNext: (data: Partial<TransferData>) => void;
    onBack: () => void;
    data: Partial<TransferData>;
}
export function Paymentmethod({ onNext, onBack, data }: PaymentMethodProps) {
    const [method, setMethod] = React.useState(data.paymentMethod || 'Manual Bank Transfer');

    const methods = [
        {
            id: 'Manual Bank Transfer',
            icon: <Landmark className="w-6 h-6" />,
            title: 'Manual Bank Transfer',
            tag: 'CHEAPEST',
            description: 'Pay from your bank app or website',
            fee: '0.00',
            arrival: 'Arrives in 1-3 days'
        },
        {
            id: 'Debit Card',
            icon: <CreditCard className="w-6 h-6" />,
            title: 'Debit Card',
            tag: 'FASTEST',
            description: 'Instant verification, simple checkout',
            fee: '4.82',
            arrival: 'Instant',
            isFast: true
        },
        {
            id: 'Apple / Google Pay',
            icon: <Smartphone className="w-6 h-6" />,
            title: 'Apple / Google Pay',
            description: 'Use your saved biometric security',
            fee: '5.12',
            arrival: 'Instant',
            isFast: true
        },
        {
            id: 'Credit Card',
            icon: <Banknote className="w-6 h-6" />,
            title: 'Credit Card',
            description: 'Convenient but higher network fees',
            fee: '12.45',
            arrival: 'Instant',
            isFast: true
        }
    ];

    const recipientReceives = (data?.sendAmount ?? 0) * (data?.exchangeRate ?? 0);
    const totalToPay = (data?.sendAmount ?? 0) + (data?.fee ?? 0);

    return (
        <div>
            {/* <h1>Payment Method</h1> */}
            {/* <p>How do you want to send the money?</p> */}
            <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12"
            >
                <div className="lg:col-span-7 space-y-8">
                    <div className="space-y-2">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-xs font-bold text-secondary uppercase tracking-widest">Step 03 of 05</span>
                            <span className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">Payment Method</span>
                        </div>
                        <div className="h-1 w-full bg-slate-100 rounded-full overflow-hidden">
                            <div className="h-full bg-secondary w-3/5 transition-all duration-500"></div>
                        </div>
                        <h2 className="text-4xl font-black text-primary font-headline mt-8">Choose payment method</h2>
                    </div>

                    <div className="space-y-4">
                        {methods.map((m) => (
                            <button
                                key={m.id}
                                onClick={() => setMethod(m.id)}
                                className={cn(
                                    "w-full p-6 rounded-2xl border-2 transition-all flex items-center gap-6 text-left group",
                                    method === m.id ? "border-primary bg-primary/5" : "border-slate-100 bg-white hover:border-slate-200"
                                )}
                            >
                                <div className={cn(
                                    "w-12 h-12 rounded-xl flex items-center justify-center transition-colors",
                                    method === m.id ? "bg-primary text-white" : "bg-surface-container-high text-slate-400 group-hover:bg-slate-200"
                                )}>
                                    {m.icon}
                                </div>
                                <div className="flex-1 space-y-1">
                                    <div className="flex items-center gap-3">
                                        <span className="font-bold text-primary">{m.title}</span>
                                        {m.tag && <span className="text-[10px] font-black bg-secondary/10 text-secondary px-2 py-0.5 rounded uppercase tracking-wider">{m.tag}</span>}
                                    </div>
                                    <p className="text-sm text-on-surface-variant">{m.description}</p>
                                </div>
                                <div className="text-right space-y-1">
                                    <div className="font-bold text-primary">£{m.fee} fee</div>
                                    <div className="flex items-center justify-end gap-1 text-xs font-medium text-on-surface-variant">
                                        {m.isFast && <Zap size={12} className="text-secondary" />}
                                        {m.arrival}
                                    </div>
                                </div>
                            </button>
                        ))}
                    </div>

                    <div className="flex items-center justify-between pt-4">
                        <button onClick={onBack} className="text-primary font-bold hover:underline">Go Back</button>
                        <button
                            onClick={() => onNext({ paymentMethod: method })}
                            className="bg-primary text-white px-10 py-4 rounded-xl font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] transition-all"
                        >
                            Continue to Payment
                        </button>
                    </div>
                </div>

                <div className="lg:col-span-5 space-y-6">
                    <div className="bg-white rounded-[2.5rem] p-8 shadow-xl shadow-primary/5 border border-slate-100 space-y-8 sticky top-24">
                        <h3 className="text-2xl font-bold text-primary font-headline">Transfer Summary</h3>

                        <div className="space-y-6">
                            <div className="flex items-center justify-between">
                                <div className="space-y-1">
                                    <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">You Send</span>
                                    <div className="text-2xl font-bold text-primary">{data.sendAmount?.toLocaleString()} {data.sendCurrency?.code}</div>
                                </div>
                                <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400">
                                    <ArrowRight size={20} className="-rotate-45" />
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="space-y-1">
                                    <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Recipient Receives</span>
                                    <div className="text-2xl font-bold text-secondary">{recipientReceives.toLocaleString(undefined, { maximumFractionDigits: 2 })} {data.receiveCurrency?.code}</div>
                                </div>
                                <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400">
                                    <ArrowRight size={20} className="rotate-45" />
                                </div>
                            </div>
                        </div>

                        <div className="h-px bg-slate-100 w-full"></div>

                        <div className="space-y-4">
                            <div className="flex justify-between text-sm">
                                <span className="text-on-surface-variant">Exchange Rate</span>
                                <span className="font-bold text-primary">1 {data.sendCurrency?.code} = {data.exchangeRate?.toFixed(4)} {data.receiveCurrency?.code}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-on-surface-variant">Transfer Fee</span>
                                <span className="font-bold text-primary">£{data.fee?.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-lg pt-2">
                                <span className="font-bold text-primary">Total to Pay</span>
                                <span className="font-black text-primary">£{totalToPay.toLocaleString()}</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-secondary/5 border border-secondary/10 rounded-2xl p-6 flex gap-4 items-start">
                        <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center text-secondary shrink-0">
                            <ShieldCheck size={20} />
                        </div>
                        <div className="space-y-1">
                            <h4 className="text-sm font-bold text-secondary">Institutional Security</h4>
                            <p className="text-xs text-on-surface-variant leading-relaxed">Fully regulated by the FCA. Your funds are protected in tiered accounts.</p>
                        </div>
                    </div>
                </div>
            </motion.div>

        </div>
    )
}
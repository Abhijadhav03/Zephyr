import { ShieldCheck, User, UserCheck } from "lucide-react";
import { cn } from "../../../../lib/utils";
import type { TransferData } from "../../../../types";
import { motion } from "framer-motion";
import React, { useState } from "react";

interface ReciepientdetailsProps {
    onNext: (data: Partial<TransferData>) => void;
    onBack: () => void;
    data?: Partial<TransferData>
}

export function Reciepientdetails({ onNext, onBack, data }: ReciepientdetailsProps) {
    const [type, setType] = React.useState<'someone' | 'self'>('someone');
    const [recipientName, setRecipientName] = React.useState<string>(data?.recipientName || '');
    const [bankName, setBankName] = React.useState<string>(data?.bankName || '');
    const [ifscCode, setIfscCode] = React.useState<string>(data?.ifscCode || '');
    const [reason, setReason] = React.useState(data?.reason || 'Family Support');
    const [accountNumber, setAccountNumber] = React.useState<string>(data?.accountNumber || '');
    const reasons = ['Family Support', 'Property Purchase', 'Investment', 'Gift', 'Other'];
    console.log(data);
    // console.log(type, recipientName, bankName, ifscCode, reason, accountNumber);
    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="max-w-3xl mx-auto space-y-8"
        >
            <div className="space-y-2 text-center md:text-left">
                <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold text-secondary uppercase tracking-widest">Step 02 of 05</span>
                    <span className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">Recipient Details</span>
                </div>
                <div className="h-1 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-secondary w-2/5 transition-all duration-500"></div>
                </div>
                <h2 className="text-4xl font-black text-primary font-headline mt-8">Where is the money going?</h2>
                <p className="text-on-surface-variant">Enter the details of the bank account you'd like to transfer to.</p>
            </div>


            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button
                    onClick={() => setType('someone')}
                    className={cn(
                        "p-6 rounded-2xl border-2 transition-all flex flex-col items-center gap-4",
                        type === 'someone' ? "border-primary bg-primary/5" : "border-slate-100 bg-white hover:border-slate-200"
                    )}
                >
                    <User className={cn("w-8 h-8", type === 'someone' ? "text-primary" : "text-slate-400")} />
                    <span className={cn("font-bold", type === 'someone' ? "text-primary" : "text-slate-500")}>Someone else</span>
                </button>
                <button
                    onClick={() => setType('self')}
                    className={cn(
                        "p-6 rounded-2xl border-2 transition-all flex flex-col items-center gap-4",
                        type === 'self' ? "border-primary bg-primary/5" : "border-slate-100 bg-white hover:border-slate-200"
                    )}
                >
                    <UserCheck className={cn("w-8 h-8", type === 'self' ? "text-primary" : "text-slate-400")} />
                    <span className={cn("font-bold", type === 'self' ? "text-primary" : "text-slate-500")}>Send to self</span>
                </button>
            </div>

            <div className="bg-white rounded-[2.5rem] p-8 shadow-xl shadow-primary/5 border border-slate-100 space-y-6">
                <div className="space-y-2">
                    <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider px-1">Recipient's Full Name</label>
                    <input type="text" placeholder="eg: Rohit Sharma"
                        value={recipientName}
                        onChange={(e) => setRecipientName(e.target.value)}
                        className="w-full bg-surface-container-low border-none rounded-xl p-4 focus:ring-2 focus:ring-primary/20 transition-all font-medium"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider px-1">Bank Name</label>
                    <input type="text" placeholder="Start Typing Bank Name"
                        value={bankName}
                        onChange={(e) => setBankName(e.target.value)}
                        className="w-full bg-surface-container-low border-none rounded-xl p-4 focus:ring-2 focus:ring-primary/20 transition-all font-medium"
                    />
                </div>

                <div className="flex gap-4">

                    <div className="space-y-2 flex-1">
                        <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider px-1">Account Number</label>
                        <input type="text" placeholder="eg: 1234567890"
                            value={accountNumber}
                            onChange={(e) => setAccountNumber(e.target.value)}
                            className="w-full bg-surface-container-low border-none rounded-xl p-4 focus:ring-2 focus:ring-primary/20 transition-all font-medium"
                        />
                    </div>
                    <div className="space-y-2 flex-1">
                        <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider px-1">IFSC Code</label>
                        <input type="text" placeholder="eg: HDFC0000001"
                            value={ifscCode}
                            onChange={(e) => setIfscCode(e.target.value)}
                            className="w-full bg-surface-container-low border-none rounded-xl p-4 focus:ring-2 focus:ring-primary/20 transition-all font-medium"
                        />
                    </div>

                </div>

                <div className="space-y-4">
                    <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider px-1">Reason for Transfer</label>
                    <div className="flex flex-wrap gap-2">
                        {reasons.map((r) => (
                            <button
                                key={r}
                                onClick={() => setReason(r)}
                                className={cn(
                                    "px-4 py-2 rounded-full text-sm font-bold transition-all",
                                    reason === r ? "bg-primary text-white" : "bg-surface-container-high text-on-surface-variant hover:bg-slate-200"
                                )}
                            >
                                {r}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="bg-secondary/5 border border-secondary/10 rounded-2xl p-4 flex gap-4 items-start">
                    <ShieldCheck className="text-secondary shrink-0" size={24} />
                    <div className="space-y-1">
                        <h4 className="text-sm font-bold text-secondary">Institutional Grade Security</h4>
                        <p className="text-xs text-on-surface-variant">These details will be encrypted and stored securely for your future convenience.</p>
                    </div>
                </div>

                <div className="flex items-center justify-between pt-4">
                    <button onClick={onBack} className="text-primary font-bold hover:underline">Go Back</button>
                    <button
                        onClick={() => onNext({ recipientName, bankName, accountNumber, ifscCode, reason })}
                        className="bg-primary text-white px-10 py-4 rounded-xl font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] transition-all"
                    >
                        Continue to Payment
                    </button>
                </div>

            </div>
        </motion.div>
    )
}
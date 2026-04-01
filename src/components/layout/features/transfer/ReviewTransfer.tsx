import { ArrowRight, CheckCircle2, Clock, Info, ShieldCheck } from "lucide-react";
import type { TransferData } from "../../../../types";
import { motion } from "framer-motion";
import React from "react";
import { storage } from "../../../../lib/storage";

interface ReviewTransferProps {
    onNext: () => void;
    onBack: () => void;
    data: Partial<TransferData>;
}

export function ReviewTransfer({ onNext, onBack, data }: ReviewTransferProps) {
    const [isSubmitting, setIsSubmitting] = React.useState(false);
    const recipientReceives = (data.sendAmount || 0 - (data.fee || 0)) * (data.exchangeRate || 1);

    const handleConfirm = async () => {
        setIsSubmitting(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 1500));

            const transferRecord = {
                id: `SL-${Math.floor(1000 + Math.random() * 9000)}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`,
                date: new Date().toISOString(),
                amount: data.sendAmount || 0,
                currency: data.sendCurrency?.code || 'GBP',
                recipient: data.recipientName || 'Unknown',
                status: 'Processing' as const,
                receiveAmount: recipientReceives,
                receiveCurrency: data.receiveCurrency?.code || 'INR'
            };

            storage.addTransfer(transferRecord);
            onNext();
        } catch (error) {
            console.error('Transfer error:', error);
            alert('Failed to process transfer. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="max-w-4xl mx-auto space-y-8"
        >
            <div className="space-y-2 text-center">
                <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold text-secondary uppercase tracking-widest">Step 04 of 05</span>
                    <span className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">Review Transfer</span>
                </div>
                <div className="h-1 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-secondary w-4/5 transition-all duration-500"></div>
                </div>
                <h2 className="text-4xl font-black text-primary font-headline mt-8">Review your transfer</h2>
                <p className="text-on-surface-variant">Please check all details carefully before confirming.</p>
            </div>

            <div className="bg-white rounded-[2.5rem] p-8 shadow-xl shadow-primary/5 border border-slate-100 space-y-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="space-y-8">
                        <div className="space-y-4">
                            <h3 className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">Transfer Details</h3>
                            <div className="space-y-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-primary/5 flex items-center justify-center text-primary">
                                        <ArrowRight size={20} />
                                    </div>
                                    <div className="space-y-1">
                                        <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">You Send</span>
                                        <div className="text-xl font-bold text-primary">{data.sendAmount?.toLocaleString()} {data.sendCurrency?.code}</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-secondary/5 flex items-center justify-center text-secondary">
                                        <CheckCircle2 size={20} />
                                    </div>
                                    <div className="space-y-1">
                                        <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Recipient Gets</span>
                                        <div className="text-xl font-bold text-secondary">{recipientReceives.toLocaleString(undefined, { maximumFractionDigits: 2 })} {data.receiveCurrency?.code}</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400">
                                        <Clock size={20} />
                                    </div>
                                    <div className="space-y-1">
                                        <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Estimated Arrival</span>
                                        <div className="text-xl font-bold text-primary">Arrives in 24 Hours</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">Payment Method</h3>
                            <div className="bg-surface-container-low p-4 rounded-2xl flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-primary shadow-sm">
                                    <ShieldCheck size={20} />
                                </div>
                                <div className="space-y-1">
                                    <div className="text-sm font-bold text-primary">{data.paymentMethod}</div>
                                    <div className="text-xs text-on-surface-variant">Fee: £{data.fee?.toFixed(2)}</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-8">
                        <div className="space-y-4">
                            <h3 className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">Recipient Details</h3>
                            <div className="bg-surface-container-low p-6 rounded-3xl space-y-6">
                                <div className="space-y-1">
                                    <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Name</span>
                                    <div className="text-lg font-bold text-primary">{data.recipientName}</div>
                                </div>
                                <div className="space-y-1">
                                    <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Bank</span>
                                    <div className="text-lg font-bold text-primary">{data.bankName}</div>
                                </div>
                                <div className="space-y-1">
                                    <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Account Number</span>
                                    <div className="text-lg font-bold text-primary">{data.accountNumber}</div>
                                </div>
                                <div className="space-y-1">
                                    <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">IFSC Code</span>
                                    <div className="text-lg font-bold text-primary">{data.ifscCode}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-primary/5 border border-primary/10 rounded-2xl p-6 flex gap-4 items-start">
                    <Info className="text-primary shrink-0" size={24} />
                    <div className="space-y-1">
                        <h4 className="text-sm font-bold text-primary">Important Notice</h4>
                        <p className="text-xs text-on-surface-variant leading-relaxed">By clicking confirm, you agree to our Terms of Service and confirm that the recipient details are correct. Transfers to {data.receiveCurrency?.name} are subject to local banking regulations.</p>
                    </div>
                </div>

                <div className="flex items-center justify-between pt-4">
                    <button onClick={onBack} disabled={isSubmitting} className="text-primary font-bold hover:underline disabled:opacity-50">Go Back</button>
                    <button
                        onClick={handleConfirm}
                        disabled={isSubmitting}
                        className="bg-primary text-white px-12 py-5 rounded-2xl font-black shadow-xl shadow-primary/20 hover:scale-[1.02] transition-all flex items-center gap-3 disabled:opacity-50 disabled:hover:scale-100"
                    >
                        {isSubmitting ? 'Processing...' : `Confirm & Send £${data.sendAmount?.toLocaleString()}`}
                        {!isSubmitting && <ArrowRight size={20} />}
                    </button>
                </div>
            </div>
        </motion.div>
    );
}
import React from 'react';
import { motion } from 'motion/react';
import {
    CheckCircle2,
    Download,
    Share2,
    ArrowRight,
    Star,
    ExternalLink,
    Copy,
    Check
} from 'lucide-react';
import type { TransferData } from '../../../../types';
import { cn } from '../../../../lib/utils';

interface SuccessScreenProps {
    onReset: () => void;
    data: Partial<TransferData>;
}

export function SuccessScreen({ onReset, data }: SuccessScreenProps) {
    const [copied, setCopied] = React.useState(false);
    const [rating, setRating] = React.useState(0);
    const [isDownloading, setIsDownloading] = React.useState(false);

    const transferId = `SL-${Math.random().toString(36).substr(2, 4).toUpperCase()}-${Math.random().toString(36).substr(2, 4).toUpperCase()}`;

    const handleCopyId = () => {
        navigator.clipboard.writeText(transferId);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleDownloadReceipt = () => {
        setIsDownloading(true);

        // Simulate PDF generation
        const receiptContent = `
      SOVEREIGN LEDGER - TRANSFER RECEIPT
      ----------------------------------
      Transfer ID: ${transferId}
      Date: ${new Date().toLocaleString()}
      
      SENDER DETAILS:
      Amount Sent: ${data.sendAmount} ${data.sendCurrency?.code}
      Fee: ${data.fee} ${data.sendCurrency?.code}
      
      RECIPIENT DETAILS:
      Name: ${data.recipientName}
      Bank: ${data.bankName}
      Account: ****${data.accountNumber?.slice(-4)}
      
      CONVERSION:
      Exchange Rate: 1 ${data.sendCurrency?.code} = ${data.exchangeRate} ${data.receiveCurrency?.code}
      Amount Received: ${(Number(data.sendAmount) * Number(data.exchangeRate)).toFixed(2)} ${data.receiveCurrency?.code}
      
      STATUS: Initiated
      ----------------------------------
      Thank you for choosing Sovereign Ledger.
    `;

        const blob = new Blob([receiptContent], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `Sovereign_Ledger_Receipt_${transferId}.txt`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);

        setTimeout(() => setIsDownloading(false), 1500);
    };

    const handleShare = async () => {
        const shareData = {
            title: 'Sovereign Ledger Transfer',
            text: `I just sent ${data.sendAmount} ${data.sendCurrency?.code} to ${data.recipientName} via Sovereign Ledger. Transfer ID: ${transferId}`,
            url: window.location.href
        };

        try {
            if (navigator.share) {
                await navigator.share(shareData);
            } else {
                handleCopyId();
                alert('Transfer details copied to clipboard!');
            }
        } catch (err) {
            console.error('Error sharing:', err);
        }
    };

    const recipientReceives = (Number(data.sendAmount || 0) - Number(data.fee || 0)) * Number(data.exchangeRate || 1);

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-3xl mx-auto text-center space-y-12 py-12"
        >
            <div className="space-y-6">
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', damping: 12, stiffness: 200, delay: 0.2 }}
                    className="w-24 h-24 rounded-full bg-secondary text-white flex items-center justify-center mx-auto shadow-2xl shadow-secondary/20"
                >
                    <CheckCircle2 size={48} />
                </motion.div>
                <div className="space-y-2">
                    <h2 className="text-5xl font-black text-primary font-headline">Transfer Initiated</h2>
                    <p className="text-xl text-on-surface-variant font-medium">Your {data.sendCurrency?.code} {data.sendAmount?.toLocaleString()} is on its way to {data.recipientName}.</p>
                </div>
            </div>

            <div className="bg-white rounded-[3rem] p-10 shadow-2xl shadow-primary/5 border border-slate-100 space-y-8 text-left relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/5 rounded-bl-[5rem] -mr-8 -mt-8"></div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 relative z-10">
                    <div className="space-y-6">
                        <div className="space-y-1">
                            <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Transfer ID</span>
                            <div className="flex items-center gap-2 group cursor-pointer" onClick={handleCopyId}>
                                <div className="text-lg font-bold text-primary">{transferId}</div>
                                {copied ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} className="text-slate-300 group-hover:text-primary transition-colors" />}
                            </div>
                        </div>
                        <div className="space-y-1">
                            <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Recipient Name</span>
                            <div className="text-lg font-bold text-primary">{data.recipientName}</div>
                        </div>
                        <div className="space-y-1">
                            <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Estimated Arrival</span>
                            <div className="text-lg font-bold text-secondary">Tomorrow, 14:00 GMT</div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="space-y-1">
                            <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Amount Sent</span>
                            <div className="text-lg font-bold text-primary">{data.sendAmount?.toLocaleString()} {data.sendCurrency?.code}</div>
                        </div>
                        <div className="space-y-1">
                            <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Recipient Receives</span>
                            <div className="text-lg font-bold text-secondary">{recipientReceives.toLocaleString(undefined, { maximumFractionDigits: 2 })} {data.receiveCurrency?.code}</div>
                        </div>
                        <div className="space-y-1">
                            <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Payment Method</span>
                            <div className="text-lg font-bold text-primary">{data.paymentMethod}</div>
                        </div>
                    </div>
                </div>

                <div className="h-px bg-slate-100 w-full"></div>

                <div className="flex flex-wrap gap-4">
                    <button
                        onClick={handleDownloadReceipt}
                        disabled={isDownloading}
                        className={cn(
                            "flex-1 bg-surface-container-high text-primary px-6 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-slate-200 transition-all",
                            isDownloading && "opacity-50 cursor-not-allowed"
                        )}
                    >
                        <Download size={20} className={isDownloading ? "animate-bounce" : ""} />
                        {isDownloading ? "Generating..." : "Download Receipt"}
                    </button>
                    <button
                        onClick={handleShare}
                        className="flex-1 bg-surface-container-high text-primary px-6 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-slate-200 transition-all"
                    >
                        <Share2 size={20} />
                        Share Details
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-primary text-white p-8 rounded-[2.5rem] text-left space-y-4 flex flex-col justify-between group cursor-pointer hover:scale-[1.02] transition-all">
                    <div className="space-y-2">
                        <h3 className="text-2xl font-bold font-headline">Track your transfer</h3>
                        <p className="text-white/70 text-sm">Get real-time updates on your funds movement.</p>
                    </div>
                    <div className="flex items-center gap-2 font-bold group-hover:gap-4 transition-all">
                        Open Tracker <ArrowRight size={20} />
                    </div>
                </div>

                <div className="bg-white border border-slate-100 p-8 rounded-[2.5rem] text-left space-y-4 flex flex-col justify-between group cursor-pointer hover:scale-[1.02] transition-all">
                    <div className="space-y-2">
                        <div className="flex gap-1 text-secondary">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                    key={star}
                                    size={16}
                                    fill={star <= rating ? "currentColor" : "none"}
                                    className={cn(star <= rating ? "text-secondary" : "text-slate-200")}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setRating(star);
                                    }}
                                />
                            ))}
                        </div>
                        <h3 className="text-2xl font-bold font-headline text-primary">Rate your experience</h3>
                        <p className="text-on-surface-variant text-sm">Help us improve the gold standard in money movement.</p>
                    </div>
                    <div className="flex items-center gap-2 font-bold text-primary group-hover:gap-4 transition-all">
                        Leave a Review <ExternalLink size={20} />
                    </div>
                </div>
            </div>

            <button
                onClick={onReset}
                className="text-primary font-bold hover:underline py-4"
            >
                Make another transfer
            </button>
        </motion.div>
    );
}
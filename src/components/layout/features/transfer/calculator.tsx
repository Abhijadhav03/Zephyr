import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { type Currency, SUPPORTED_CURRENCIES, type TransferData } from '../../../../types';
import { Divide, Minus, RefreshCw } from 'lucide-react';
import { useExchangeRate } from '../../../../hooks/useExchangerate';


interface CalculatorProps {
    onNext: (data: Partial<TransferData>) => void;
    initialData?: Partial<TransferData>;
}


export function Calculator({ onNext, initialData }: CalculatorProps) {
    const [sendAmount, setSendAmount] = useState<number>(initialData?.sendAmount || 1000);
    // const [sendCurrency, setSendCurrency] = useState<Currency>(SUPPORTED_CURRENCIES[0]);
    const [sendCurrency, setSendCurrency] = useState<Currency>(initialData?.sendCurrency || SUPPORTED_CURRENCIES[0]);
    const [receiveCurrency, setReceiveCurrency] = useState<Currency>(initialData?.receiveCurrency || SUPPORTED_CURRENCIES[1]);

    const { exchangeRate, isFetching, error, isUsingMock, lastUpdated, refetch } = useExchangeRate(sendCurrency, receiveCurrency);

    const fee = sendCurrency.code === 'GBP' ? 2.50 : (sendCurrency.code === 'USD' ? 3.00 : 5.00);
    const recipientGets = (sendAmount - fee) * exchangeRate;
    // const [receiveCurrency, setReceiveCurrency] = useState<Currency>(SUPPORTED_CURRENCIES[1]);
    // console.log(sendAmount);
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-[2.5rem] p-8 shadow-2xl shadow-primary/5 border border-outline-variant/10 w-full max-w-lg"
        >
            <div className="space-y-6">

                <div className="space-y-2">

                    <label className="block text-sm font-bold text-on-surface-variant px-1">You Send</label>
                    <div className="bg-surface-container-highest rounded-2xl p-4 flex items-center justify-between group focus-within:bg-white focus-within:ring-1 focus-within:ring-primary/20 transition-all">
                        <input
                            type="number"
                            value={sendAmount}
                            onChange={(e) => setSendAmount(Number(e.target.value))}
                            className="bg-transparent border-none focus:ring-0 text-3xl font-headline font-bold text-primary w-full outline-none"
                            placeholder="0.00"
                        />
                    </div>
                </div>
            </div>


            <div className="relative px-4 py-2">
                <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-primary/10 via-primary/30 to-primary/10"></div>
                <div className="space-y-4 relative z-10">
                    <div className="flex items-center gap-6">
                        <div className="w-8 h-8 rounded-full bg-white border-2 border-primary flex items-center justify-center text-primary font-bold text-xs shrink-0">
                            <Minus size={14} />
                        </div>
                        <div className="flex-1 bg-white/40 backdrop-blur-md border border-white/20 px-4 py-3 rounded-2xl flex justify-between items-center text-sm">
                            <span className="text-on-surface-variant">Transaction Fee</span>
                            <span className="font-bold text-primary">{fee.toFixed(2)} {sendCurrency.code}</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-6">
                        <div className="w-8 h-8 rounded-full bg-white border-2 border-primary flex items-center justify-center text-primary font-bold text-xs shrink-0">
                            <Divide size={14} />
                        </div>
                        <div className="flex-1 bg-white/40 backdrop-blur-md border border-white/20 px-4 py-3 rounded-2xl flex justify-between items-center text-sm">
                            <span className="text-on-surface-variant">Exchange Rate</span>
                            <div className="flex items-center gap-2">
                                {isFetching && <RefreshCw size={12} className="animate-spin text-primary/40" />}
                                <span className="font-bold text-secondary">{exchangeRate.toFixed(4)} {receiveCurrency.code}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="space-y-2">

                <label className="block text-sm font-bold text-on-surface-variant px-1">Recipient Gets</label>
                <div className="bg-surface-container-highest rounded-2xl p-4 flex items-center justify-between">
                    <div className="text-3xl font-headline font-bold text-primary">
                        {recipientGets.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </div>
                </div>
            </div>

            <button
                onClick={() => onNext({ sendAmount, sendCurrency, receiveCurrency, exchangeRate, fee })}
                className="w-full bg-gradient-to-r from-primary to-primary-container text-white py-5 rounded-full font-headline font-bold text-lg shadow-xl shadow-primary/10 hover:shadow-primary/20 transition-all active:scale-[0.98] cursor-pointer"
            >
                Send Money Now
            </button>

        </motion.div>
    )
}
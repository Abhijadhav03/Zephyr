import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { type Currency, SUPPORTED_CURRENCIES, type TransferData } from '../../../../types';
import { Check, ChevronDown, Divide, Info, Minus, RefreshCw, Search } from 'lucide-react';
import { useExchangeRate } from '../../../../hooks/useExchangerate';
import { cn } from '../../../../lib/utils';


interface CalculatorProps {
    onNext: (data: Partial<TransferData>) => void;
    initialData?: Partial<TransferData>;
}


export function Calculator({ onNext, initialData }: CalculatorProps) {
    const [sendAmount, setSendAmount] = useState<number>(initialData?.sendAmount || 1000);
    // const [sendCurrency, setSendCurrency] = useState<Currency>(SUPPORTED_CURRENCIES[0]);
    const [sendCurrency, setSendCurrency] = useState<Currency>(initialData?.sendCurrency || SUPPORTED_CURRENCIES[0]);
    const [receiveCurrency, setReceiveCurrency] = useState<Currency>(initialData?.receiveCurrency || SUPPORTED_CURRENCIES[1]);

    const { exchangeRate, isFetching, error, refetch } = useExchangeRate(sendCurrency, receiveCurrency);

    const fee = sendCurrency.code === 'GBP' ? 2.50 : (sendCurrency.code === 'USD' ? 3.00 : 5.00);
    const recipientGets = Math.max(0, (sendAmount - fee) * exchangeRate);
    // const [receiveCurrency, setReceiveCurrency] = useState<Currency>(SUPPORTED_CURRENCIES[1]);
    // console.log(sendAmount);
    const [validationError, setValidationError] = useState<string | null>(null);

    const handleNext = () => {
        if (sendAmount <= fee) {
            setValidationError(`Amount must be greater than the fee (${fee.toFixed(2)} ${sendCurrency.code})`);
            return;
        }
        setValidationError(null);
        onNext({ sendAmount, sendCurrency, receiveCurrency, exchangeRate, fee });
    };
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
                        <CurrencyDropdown
                            selected={sendCurrency}
                            onSelect={setSendCurrency}
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
                    <CurrencyDropdown
                        selected={receiveCurrency}
                        onSelect={setReceiveCurrency}
                    />
                </div>
            </div>
            {/* Error/Fallback Message */}
            <AnimatePresence>
                {(error || validationError) && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className={cn(
                            "rounded-2xl p-4 space-y-3 border",
                            validationError ? "bg-rose-50 border-rose-200" : "bg-error-container/10 border-error/20"
                        )}
                    >
                        <div className="flex items-start gap-3">
                            <div className={cn(
                                "w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5",
                                validationError ? "bg-rose-100 text-rose-600" : "bg-error/10 text-error"
                            )}>
                                <Info size={12} />
                            </div>
                            <div className="flex-1">
                                <p className={cn(
                                    "text-xs font-bold leading-tight",
                                    validationError ? "text-rose-700" : "text-error"
                                )}>
                                    {validationError || error}
                                </p>
                                {!validationError && (
                                    <p className="text-[10px] text-on-surface-variant mt-1 leading-relaxed">
                                        If this persists, please check your connection or contact our 24/7 support team.
                                    </p>
                                )}
                            </div>
                        </div>
                        {!validationError && (
                            <div className="flex items-center gap-2 pt-1">
                                <button
                                    onClick={() => refetch()}
                                    className="text-[10px] font-bold text-primary px-3 py-1.5 bg-primary/5 rounded-lg hover:bg-primary/10 transition-colors flex items-center gap-1.5"
                                >
                                    <RefreshCw size={10} className={cn(isFetching && "animate-spin")} />
                                    Retry Connection
                                </button>
                                <button className="text-[10px] font-bold text-on-surface-variant px-3 py-1.5 hover:bg-surface-container rounded-lg transition-colors">
                                    Contact Support
                                </button>
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>

            <button
                onClick={handleNext}
                className="w-full mt-4 bg-gradient-to-r from-primary to-primary-container text-white py-5 rounded-full font-headline font-bold text-lg shadow-xl shadow-primary/10 hover:shadow-primary/20 transition-all active:scale-[0.98] cursor-pointer"
            >
                Send Money Now
            </button>

        </motion.div>
    )
}


function CurrencyDropdown({ selected, onSelect }: { selected: Currency, onSelect: (c: Currency) => void }) {
    const [isOpen, setIsOpen] = useState(false);
    const [search, setSearch] = useState('');

    const filtered = SUPPORTED_CURRENCIES.filter(c =>
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.code.toLowerCase().includes(search.toLowerCase()) ||
        c.country.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="relative">
            <div
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-3 bg-white px-4 py-2 rounded-full shadow-sm cursor-pointer hover:bg-slate-50 transition-colors border border-slate-100"
            >
                <img
                    src={selected.flag}
                    alt={selected.code}
                    className="w-6 h-6 rounded-full object-cover"
                    referrerPolicy="no-referrer"
                />
                <span className="font-bold font-headline text-primary">{selected.code}</span>
                <ChevronDown size={16} className={cn("text-primary/40 transition-transform", isOpen && "rotate-180")} />
            </div>

            <AnimatePresence>
                {isOpen && (
                    <>
                        <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
                        <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                            className="absolute right-0 mt-2 w-72 bg-white rounded-3xl shadow-2xl border border-slate-100 z-50 overflow-hidden"
                        >
                            <div className="p-4 border-bottom border-slate-50 bg-slate-50/50">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                                    <input
                                        autoFocus
                                        type="text"
                                        placeholder="Search country or currency..."
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        className="w-full bg-white border-none rounded-xl py-2 pl-9 pr-4 text-sm focus:ring-2 focus:ring-primary/10 outline-none"
                                    />
                                </div>
                            </div>
                            <div className="max-h-64 overflow-y-auto p-2">
                                {filtered.map((c) => (
                                    <button
                                        key={c.code}
                                        onClick={() => {
                                            onSelect(c);
                                            setIsOpen(false);
                                            setSearch('');
                                        }}
                                        className={cn(
                                            "w-full flex items-center justify-between p-3 rounded-2xl transition-all hover:bg-slate-50 group",
                                            selected.code === c.code && "bg-primary/5"
                                        )}
                                    >
                                        <div className="flex items-center gap-3">
                                            <img src={c.flag} alt={c.code} className="w-8 h-8 rounded-full object-cover" referrerPolicy="no-referrer" />
                                            <div className="text-left">
                                                <div className="text-sm font-bold text-primary">{c.code}</div>
                                                <div className="text-[10px] text-on-surface-variant font-medium">{c.country}</div>
                                            </div>
                                        </div>
                                        {selected.code === c.code && <Check size={16} className="text-primary" />}
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}
// function CurrencyDropdown({ selected, onSelect, label }: { selected: Currency, onSelect: (c: Currency) => void, label: string }) {
//     const [isOpen, setIsOpen] = useState(false);
//     return (
//         <div className="relative">
//             <label className="block text-sm font-bold text-on-surface-variant px-1">{label}</label>
//             <button
//                 onClick={() => setIsOpen(!isOpen)}
//                 className="w-full bg-surface-container-highest rounded-2xl p-4 flex items-center justify-between focus:ring-1 focus:ring-primary/20 transition-all"
//             >
//                 <div className="flex items-center gap-3">
//                     <img src={selected.flag} alt={selected.code} className="w-8 h-8 rounded-full" />
//                     <span className="text-lg font-bold text-primary">{selected.code}</span>
//                 </div>
//                 <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//                 </svg>
//             </button>
//             {isOpen && (
//                 <div className="absolute top-full left-0 right-0 bg-white rounded-2xl shadow-xl mt-2">
//                     {SUPPORTED_CURRENCIES.map((currency) => (
//                         <button
//                             key={currency.code}
//                             onClick={() => {
//                                 onSelect(currency);
//                                 setIsOpen(false);
//                             }}
//                             className="w-full flex items-center gap-3 px-4 py-3 hover:bg-primary/5 transition-colors"
//                         >
//                             <img src={currency.flag} alt={currency.code} className="w-8 h-8 rounded-full" />
//                             <span className="text-lg font-bold text-primary">{currency.code}</span>
//                         </button>
//                     ))}
//                 </div>
//             )}
//         </div>
//     )
// }

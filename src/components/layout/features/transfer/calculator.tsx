import { AnimatePresence, motion } from 'motion/react';
import { useState } from 'react';
import { type Currency, SUPPORTED_CURRENCIES, type TransferData } from '../../../../types';
import { Check, RefreshCw, Search } from 'lucide-react';
import { useExchangeRate } from '../../../../hooks/useExchangerate';
import { cn } from '../../../../lib/utils';

interface CalculatorProps {
    onNext: (data: Partial<TransferData>) => void;
    initialData?: Partial<TransferData>;
}

export function Calculator({ onNext, initialData }: CalculatorProps) {
    const [sendAmount, setSendAmount] = useState<number>(initialData?.sendAmount || 1000);
    const [sendCurrency, setSendCurrency] = useState<Currency>(initialData?.sendCurrency || SUPPORTED_CURRENCIES[0]);
    const [receiveCurrency, setReceiveCurrency] = useState<Currency>(initialData?.receiveCurrency || SUPPORTED_CURRENCIES[1]);

    const { exchangeRate, isFetching } = useExchangeRate(sendCurrency, receiveCurrency);

    const fee = sendCurrency.code === 'GBP' ? 2.50 : (sendCurrency.code === 'USD' ? 3.00 : 5.00);
    const recipientGets = (sendAmount - fee) * exchangeRate;

    return (
        <div className="win-window" style={{ width: '100%', maxWidth: '480px', fontFamily: "'Tahoma', 'MS Sans Serif', 'Arial', sans-serif" }}>
            {/* Title bar */}
            <div className="win-titlebar">
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
                        <rect width="12" height="12" rx="1" fill="#3a6ea5" />
                        <text x="2" y="10" fill="white" fontSize="8" fontWeight="bold" fontFamily="Arial">$</text>
                    </svg>
                    <span>Zephyr Transfer Calculator</span>
                </div>
                <div style={{ display: 'flex', gap: '2px' }}>
                    <button className="win-titlebar-btn" aria-label="Minimize">
                        <svg width="6" height="6" viewBox="0 0 6 6"><rect y="4" width="6" height="2" fill="#000" /></svg>
                    </button>
                    <button className="win-titlebar-btn" aria-label="Maximize">
                        <svg width="6" height="6" viewBox="0 0 6 6"><rect width="6" height="6" fill="none" stroke="#000" strokeWidth="1.5" /></svg>
                    </button>
                    <button className="win-titlebar-btn" aria-label="Close">
                        <svg width="6" height="6" viewBox="0 0 6 6">
                            <line x1="0" y1="0" x2="6" y2="6" stroke="#000" strokeWidth="1.5" />
                            <line x1="6" y1="0" x2="0" y2="6" stroke="#000" strokeWidth="1.5" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Body */}
            <div style={{ padding: '12px', backgroundColor: '#d4d0c8' }}>

                {/* You Send group */}
                <fieldset className="win-groupbox" style={{ marginBottom: '10px' }}>
                    <legend className="win-groupbox-label">You Send</legend>
                    <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                        <input
                            type="number"
                            value={sendAmount}
                            onChange={(e) => setSendAmount(Number(e.target.value))}
                            className="win-input"
                            style={{ fontSize: '18px', fontWeight: 'bold', fontFamily: "'Courier New', monospace" }}
                            placeholder="0.00"
                            aria-label="Amount to send"
                        />
                        <CurrencyDropdown
                            selected={sendCurrency}
                            onSelect={setSendCurrency}
                        />
                    </div>
                </fieldset>

                {/* Breakdown table */}
                <div
                    style={{
                        borderTop: '1px solid #808080',
                        borderLeft: '1px solid #808080',
                        borderRight: '1px solid #ffffff',
                        borderBottom: '1px solid #ffffff',
                        boxShadow: 'inset 1px 1px 0 #404040',
                        backgroundColor: '#ffffff',
                        marginBottom: '10px',
                        fontSize: '11px',
                    }}
                    role="table"
                    aria-label="Transfer breakdown"
                >
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            padding: '4px 8px',
                            borderBottom: '1px solid #d4d0c8',
                            backgroundColor: '#0a246a',
                            color: '#ffffff',
                        }}
                        role="row"
                    >
                        <span role="columnheader">Description</span>
                        <span role="columnheader">Amount</span>
                    </div>
                    <div
                        style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 8px', borderBottom: '1px solid #e8e4dc' }}
                        role="row"
                    >
                        <span role="cell">Transaction Fee</span>
                        <span role="cell" style={{ fontWeight: 'bold', color: '#cc0000' }}>
                            -{fee.toFixed(2)} {sendCurrency.code}
                        </span>
                    </div>
                    <div
                        style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 8px' }}
                        role="row"
                    >
                        <span role="cell" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                            Exchange Rate
                            {isFetching && <RefreshCw size={10} className="animate-spin" style={{ color: '#808080' }} />}
                        </span>
                        <span role="cell" style={{ fontWeight: 'bold', color: '#006400' }}>
                            {exchangeRate.toFixed(4)} {receiveCurrency.code}
                        </span>
                    </div>
                </div>

                {/* Recipient Gets group */}
                <fieldset className="win-groupbox" style={{ marginBottom: '12px' }}>
                    <legend className="win-groupbox-label">Recipient Gets</legend>
                    <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                        <div
                            className="win-input"
                            style={{
                                flex: 1,
                                fontSize: '18px',
                                fontWeight: 'bold',
                                fontFamily: "'Courier New', monospace",
                                color: '#006400',
                                display: 'flex',
                                alignItems: 'center',
                                minHeight: '28px',
                            }}
                            role="status"
                            aria-live="polite"
                            aria-label="Recipient amount"
                        >
                            {recipientGets.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </div>
                        <CurrencyDropdown
                            selected={receiveCurrency}
                            onSelect={setReceiveCurrency}
                        />
                    </div>
                </fieldset>

                {/* Separator */}
                <hr className="win-sep-h" />

                {/* Dialog buttons */}
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '6px', marginTop: '10px' }}>
                    <button
                        onClick={() => onNext({ sendAmount, sendCurrency, receiveCurrency, exchangeRate, fee })}
                        className="win-btn win-btn-primary"
                        style={{ minWidth: '120px', fontSize: '11px', fontWeight: 'bold' }}
                    >
                        Send Money &gt;&gt;
                    </button>
                    <button className="win-btn" style={{ minWidth: '75px' }}>
                        Cancel
                    </button>
                    <button className="win-btn" style={{ minWidth: '55px' }}>
                        Help
                    </button>
                </div>
            </div>

            {/* Status bar */}
            <div className="win-statusbar">
                <div className="win-statusbar-panel" style={{ flex: 1 }}>
                    Ready — Enter amount and select currencies to calculate transfer
                </div>
            </div>
        </div>
    );
}

function CurrencyDropdown({ selected, onSelect }: { selected: Currency; onSelect: (c: Currency) => void }) {
    const [isOpen, setIsOpen] = useState(false);
    const [search, setSearch] = useState('');

    const filtered = SUPPORTED_CURRENCIES.filter(c =>
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.code.toLowerCase().includes(search.toLowerCase()) ||
        c.country.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div style={{ position: 'relative', flexShrink: 0 }}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="win-btn"
                style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '3px 6px', minWidth: '80px', fontSize: '11px' }}
                aria-haspopup="listbox"
                aria-expanded={isOpen}
            >
                <img
                    src={selected.flag}
                    alt={selected.code}
                    style={{ width: '16px', height: '16px', objectFit: 'cover', imageRendering: 'pixelated' }}
                    referrerPolicy="no-referrer"
                />
                <span style={{ fontWeight: 'bold' }}>{selected.code}</span>
                <svg width="8" height="5" viewBox="0 0 8 5" aria-hidden="true">
                    <polygon points="0,0 8,0 4,5" fill="#000000" />
                </svg>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <>
                        <div style={{ position: 'fixed', inset: 0, zIndex: 40 }} onClick={() => setIsOpen(false)} />
                        <motion.div
                            initial={{ opacity: 0, y: 2 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 2 }}
                            transition={{ duration: 0.1 }}
                            className="win-window"
                            style={{
                                position: 'absolute',
                                right: 0,
                                top: '100%',
                                marginTop: '2px',
                                width: '240px',
                                zIndex: 50,
                            }}
                            role="listbox"
                        >
                            <div className="win-titlebar" style={{ padding: '2px 4px' }}>
                                <span style={{ fontSize: '10px' }}>Select Currency</span>
                                <button
                                    className="win-titlebar-btn"
                                    onClick={() => setIsOpen(false)}
                                    aria-label="Close currency picker"
                                >
                                    <svg width="6" height="6" viewBox="0 0 6 6">
                                        <line x1="0" y1="0" x2="6" y2="6" stroke="#000" strokeWidth="1.5" />
                                        <line x1="6" y1="0" x2="0" y2="6" stroke="#000" strokeWidth="1.5" />
                                    </svg>
                                </button>
                            </div>

                            <div style={{ padding: '4px', backgroundColor: '#d4d0c8' }}>
                                {/* Search */}
                                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '4px' }}>
                                    <Search size={11} style={{ color: '#808080', flexShrink: 0 }} aria-hidden="true" />
                                    <input
                                        autoFocus
                                        type="text"
                                        placeholder="Find..."
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        className="win-input"
                                        style={{ flex: 1, height: '20px', fontSize: '11px' }}
                                        aria-label="Search currencies"
                                    />
                                </div>

                                {/* List */}
                                <div
                                    style={{
                                        maxHeight: '200px',
                                        overflowY: 'auto',
                                        borderTop: '1px solid #808080',
                                        borderLeft: '1px solid #808080',
                                        borderRight: '1px solid #ffffff',
                                        borderBottom: '1px solid #ffffff',
                                        boxShadow: 'inset 1px 1px 0 #404040',
                                        backgroundColor: '#ffffff',
                                    }}
                                >
                                    {filtered.map((c, i) => (
                                        <button
                                            key={c.code}
                                            role="option"
                                            aria-selected={selected.code === c.code}
                                            onClick={() => {
                                                onSelect(c);
                                                setIsOpen(false);
                                                setSearch('');
                                            }}
                                            style={{
                                                width: '100%',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'space-between',
                                                padding: '3px 6px',
                                                fontSize: '11px',
                                                fontFamily: "'Tahoma', 'MS Sans Serif', 'Arial', sans-serif",
                                                border: 'none',
                                                backgroundColor: selected.code === c.code ? '#0a246a' : (i % 2 === 0 ? '#ffffff' : '#f0eeea'),
                                                color: selected.code === c.code ? '#ffffff' : '#000000',
                                                cursor: 'pointer',
                                                textAlign: 'left',
                                            }}
                                            className={cn(!selected.code.includes(c.code) && "hover:bg-blue-700 hover:text-white")}
                                        >
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                                <img
                                                    src={c.flag}
                                                    alt={c.code}
                                                    style={{ width: '16px', height: '16px', objectFit: 'cover' }}
                                                    referrerPolicy="no-referrer"
                                                />
                                                <span style={{ fontWeight: 'bold' }}>{c.code}</span>
                                                <span style={{ fontSize: '10px', opacity: 0.8 }}>{c.country}</span>
                                            </div>
                                            {selected.code === c.code && <Check size={11} />}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}

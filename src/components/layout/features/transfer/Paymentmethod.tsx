import React from "react";
import type { TransferData } from "../../../../types";

interface PaymentMethodProps {
    onNext: (data: Partial<TransferData>) => void;
    onBack: () => void;
    data: Partial<TransferData>;
}

const methods = [
    {
        id: 'Manual Bank Transfer',
        icon: '🏦',
        title: 'Manual Bank Transfer',
        tag: 'CHEAPEST',
        description: 'Pay from your bank app or website',
        fee: '0.00',
        arrival: '1-3 business days',
    },
    {
        id: 'Debit Card',
        icon: '💳',
        title: 'Debit Card',
        tag: 'FASTEST',
        description: 'Instant verification, simple checkout',
        fee: '4.82',
        arrival: 'Instant',
    },
    {
        id: 'Apple / Google Pay',
        icon: '📱',
        title: 'Apple / Google Pay',
        tag: '',
        description: 'Use your saved biometric security',
        fee: '5.12',
        arrival: 'Instant',
    },
    {
        id: 'Credit Card',
        icon: '💰',
        title: 'Credit Card',
        tag: '',
        description: 'Convenient but higher network fees',
        fee: '12.45',
        arrival: 'Instant',
    },
];

export function Paymentmethod({ onNext, onBack, data }: PaymentMethodProps) {
    const [method, setMethod] = React.useState(data.paymentMethod || 'Manual Bank Transfer');

    const recipientReceives = (data?.sendAmount ?? 0) * (data?.exchangeRate ?? 0);
    const totalToPay = (data?.sendAmount ?? 0) + (data?.fee ?? 0);

    return (
        <div style={{ fontFamily: "'Tahoma', 'MS Sans Serif', 'Arial', sans-serif", fontSize: '11px', maxWidth: '780px', margin: '0 auto' }}>

            {/* Wizard header */}
            <div className="win-window" style={{ marginBottom: '10px' }}>
                <div className="win-titlebar">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
                            <rect width="12" height="12" rx="1" fill="#3a6ea5" />
                            <text x="2" y="10" fill="white" fontSize="7" fontWeight="bold" fontFamily="Arial">Z</text>
                        </svg>
                        <span>Zephyr Transfer Wizard — Step 3 of 4: Payment Method</span>
                    </div>
                </div>
                <div style={{ padding: '6px 10px', backgroundColor: '#d4d0c8', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    {[
                        { num: 1, label: 'Amount', done: true },
                        { num: 2, label: 'Recipient', done: true },
                        { num: 3, label: 'Payment', active: true },
                        { num: 4, label: 'Review' },
                    ].map((s, i) => (
                        <React.Fragment key={s.num}>
                            {i > 0 && <div style={{ width: '20px', height: '1px', backgroundColor: '#808080' }} aria-hidden="true" />}
                            <WizardStep {...s} />
                        </React.Fragment>
                    ))}
                </div>
            </div>

            {/* Two-column layout */}
            <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>

                {/* Left: payment methods */}
                <div className="win-window" style={{ flex: 1 }}>
                    <div style={{ padding: '12px', backgroundColor: '#d4d0c8' }}>

                        <fieldset className="win-groupbox">
                            <legend className="win-groupbox-label">Select Payment Method</legend>

                            {/* Column header */}
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    padding: '3px 6px',
                                    backgroundColor: '#0a246a',
                                    color: '#ffffff',
                                    fontSize: '11px',
                                    marginBottom: '2px',
                                    fontWeight: 'bold',
                                }}
                                role="row"
                            >
                                <span role="columnheader">Method</span>
                                <span role="columnheader">Fee / Speed</span>
                            </div>

                            {/* Method rows */}
                            {methods.map((m, i) => (
                                <div
                                    key={m.id}
                                    onClick={() => setMethod(m.id)}
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        padding: '5px 6px',
                                        cursor: 'pointer',
                                        backgroundColor: method === m.id ? '#0a246a' : (i % 2 === 0 ? '#ffffff' : '#f0eeea'),
                                        color: method === m.id ? '#ffffff' : '#000000',
                                        borderBottom: '1px solid #e8e4dc',
                                        fontSize: '11px',
                                    }}
                                    role="option"
                                    aria-selected={method === m.id}
                                    tabIndex={0}
                                    onKeyDown={(e) => e.key === 'Enter' && setMethod(m.id)}
                                >
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <input
                                            type="radio"
                                            name="paymentMethod"
                                            value={m.id}
                                            checked={method === m.id}
                                            onChange={() => setMethod(m.id)}
                                            style={{ cursor: 'pointer' }}
                                            aria-label={m.title}
                                        />
                                        <div>
                                            <div style={{ fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                                {m.title}
                                                {m.tag && (
                                                    <span
                                                        style={{
                                                            fontSize: '9px',
                                                            fontWeight: 'bold',
                                                            padding: '1px 4px',
                                                            backgroundColor: method === m.id ? '#7ec8ff' : '#d4ead4',
                                                            color: '#000000',
                                                            border: '1px solid #808080',
                                                        }}
                                                    >
                                                        {m.tag}
                                                    </span>
                                                )}
                                            </div>
                                            <div style={{ fontSize: '10px', opacity: 0.8 }}>{m.description}</div>
                                        </div>
                                    </div>
                                    <div style={{ textAlign: 'right', flexShrink: 0, marginLeft: '12px' }}>
                                        <div style={{ fontWeight: 'bold' }}>£{m.fee}</div>
                                        <div style={{ fontSize: '10px', opacity: 0.8 }}>{m.arrival}</div>
                                    </div>
                                </div>
                            ))}
                        </fieldset>

                        <hr className="win-sep-h" />

                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '6px' }}>
                            <button onClick={onBack} className="win-btn">&lt; Back</button>
                            <button
                                onClick={() => onNext({ paymentMethod: method })}
                                className="win-btn win-btn-primary"
                                style={{ minWidth: '130px', fontWeight: 'bold' }}
                            >
                                Next &gt; Review
                            </button>
                            <button onClick={onBack} className="win-btn">Cancel</button>
                        </div>
                    </div>
                </div>

                {/* Right: summary panel */}
                <div className="win-window" style={{ width: '220px', flexShrink: 0 }}>
                    <div className="win-titlebar" style={{ padding: '2px 6px' }}>
                        <span style={{ fontSize: '11px' }}>Transfer Summary</span>
                    </div>
                    <div style={{ padding: '10px', backgroundColor: '#d4d0c8', fontSize: '11px' }}>

                        <SummaryRow label="You Send:" value={`${data.sendAmount?.toLocaleString()} ${data.sendCurrency?.code}`} />
                        <SummaryRow label="Recipient Gets:" value={`${recipientReceives.toLocaleString(undefined, { maximumFractionDigits: 2 })} ${data.receiveCurrency?.code}`} highlight />

                        <hr className="win-sep-h" />

                        <SummaryRow label="Rate:" value={`1 ${data.sendCurrency?.code} = ${data.exchangeRate?.toFixed(4)} ${data.receiveCurrency?.code}`} />
                        <SummaryRow label="Base Fee:" value={`£${data.fee?.toFixed(2)}`} />

                        <hr className="win-sep-h" />

                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                padding: '4px 0',
                                fontWeight: 'bold',
                                fontSize: '12px',
                                borderTop: '2px solid #000000',
                                marginTop: '2px',
                            }}
                        >
                            <span>Total:</span>
                            <span style={{ color: '#0a246a' }}>£{totalToPay.toLocaleString()}</span>
                        </div>

                        <div
                            style={{
                                marginTop: '8px',
                                padding: '6px',
                                backgroundColor: '#fffbe6',
                                borderTop: '1px solid #808080',
                                borderLeft: '1px solid #808080',
                                borderRight: '1px solid #ffffff',
                                borderBottom: '1px solid #ffffff',
                                fontSize: '10px',
                                lineHeight: '1.5',
                            }}
                            role="note"
                        >
                            FCA Regulated &bull; AES-256 Encrypted &bull; Funds protected in tiered accounts
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function WizardStep({ num, label, done, active }: { num: number; label: string; done?: boolean; active?: boolean }) {
    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px' }}>
            <div
                style={{
                    width: '18px',
                    height: '18px',
                    borderRadius: '50%',
                    backgroundColor: done ? '#006400' : active ? '#0a246a' : '#d4d0c8',
                    color: done || active ? '#ffffff' : '#808080',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '10px',
                    fontWeight: 'bold',
                    border: active ? '2px solid #000080' : '1px solid #808080',
                    flexShrink: 0,
                }}
                aria-current={active ? 'step' : undefined}
            >
                {done ? '✓' : num}
            </div>
            <span style={{ fontWeight: active ? 'bold' : 'normal', color: active ? '#000000' : '#808080' }}>{label}</span>
        </div>
    );
}

function SummaryRow({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '3px 0', fontSize: '11px' }}>
            <span style={{ color: '#555555' }}>{label}</span>
            <span style={{ fontWeight: 'bold', color: highlight ? '#006400' : '#000000' }}>{value}</span>
        </div>
    );
}

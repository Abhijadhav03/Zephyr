import React from "react";
import type { TransferData } from "../../../../types";
import { storage } from "../../../../lib/storage";

interface ReviewTransferProps {
    onNext: () => void;
    onBack: () => void;
    data: Partial<TransferData>;
}

export function ReviewTransfer({ onNext, onBack, data }: ReviewTransferProps) {
    const [isSubmitting, setIsSubmitting] = React.useState(false);
    const [agreed, setAgreed] = React.useState(false);

    const recipientReceives = (data.sendAmount || 0 - (data.fee || 0)) * (data.exchangeRate || 1);

    const handleConfirm = async () => {
        if (!agreed) {
            alert('Please accept the Terms of Service before confirming.');
            return;
        }
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
                receiveCurrency: data.receiveCurrency?.code || 'INR',
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
        <div style={{ fontFamily: "'Tahoma', 'MS Sans Serif', 'Arial', sans-serif", fontSize: '11px', maxWidth: '640px', margin: '0 auto' }}>

            {/* Wizard header */}
            <div className="win-window" style={{ marginBottom: '10px' }}>
                <div className="win-titlebar">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
                            <rect width="12" height="12" rx="1" fill="#3a6ea5" />
                            <text x="2" y="10" fill="white" fontSize="7" fontWeight="bold" fontFamily="Arial">Z</text>
                        </svg>
                        <span>Zephyr Transfer Wizard — Step 4 of 4: Review &amp; Confirm</span>
                    </div>
                </div>
                <div style={{ padding: '6px 10px', backgroundColor: '#d4d0c8', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    {[
                        { num: 1, label: 'Amount', done: true },
                        { num: 2, label: 'Recipient', done: true },
                        { num: 3, label: 'Payment', done: true },
                        { num: 4, label: 'Review', active: true },
                    ].map((s, i) => (
                        <React.Fragment key={s.num}>
                            {i > 0 && <div style={{ width: '20px', height: '1px', backgroundColor: '#808080' }} aria-hidden="true" />}
                            <WizardStep {...s} />
                        </React.Fragment>
                    ))}
                </div>
            </div>

            {/* Main review dialog */}
            <div className="win-window">
                <div style={{ padding: '12px', backgroundColor: '#d4d0c8', display: 'flex', flexDirection: 'column', gap: '10px' }}>

                    {/* Warning notice */}
                    <div
                        style={{
                            display: 'flex',
                            gap: '8px',
                            alignItems: 'flex-start',
                            padding: '8px',
                            backgroundColor: '#fffbe6',
                            borderTop: '1px solid #808080',
                            borderLeft: '1px solid #808080',
                            borderRight: '1px solid #ffffff',
                            borderBottom: '1px solid #ffffff',
                        }}
                        role="alert"
                    >
                        <svg width="22" height="20" viewBox="0 0 22 20" aria-hidden="true" style={{ flexShrink: 0 }}>
                            <polygon points="11,1 21,19 1,19" fill="#ffd700" stroke="#a09800" strokeWidth="1" />
                            <text x="9" y="16" fill="#000" fontSize="11" fontWeight="bold" fontFamily="Arial">!</text>
                        </svg>
                        <div style={{ fontSize: '11px' }}>
                            <strong>Important:</strong> Please review all details carefully. Once confirmed, this transfer cannot be cancelled.
                        </div>
                    </div>

                    {/* Two-column details */}
                    <div style={{ display: 'flex', gap: '10px' }}>

                        {/* Transfer details */}
                        <fieldset className="win-groupbox" style={{ flex: 1 }}>
                            <legend className="win-groupbox-label">Transfer Details</legend>
                            <DetailTable rows={[
                                { label: 'You Send:', value: `${data.sendAmount?.toLocaleString()} ${data.sendCurrency?.code}`, bold: true },
                                { label: 'Recipient Gets:', value: `${recipientReceives.toLocaleString(undefined, { maximumFractionDigits: 2 })} ${data.receiveCurrency?.code}`, bold: true, highlight: true },
                                { label: 'Exchange Rate:', value: `1 ${data.sendCurrency?.code} = ${data.exchangeRate?.toFixed(4)} ${data.receiveCurrency?.code}` },
                                { label: 'Transfer Fee:', value: `£${data.fee?.toFixed(2)}` },
                                { label: 'Payment Method:', value: data.paymentMethod || '' },
                                { label: 'Est. Arrival:', value: 'Approx. 24 Hours', bold: true },
                            ]} />
                        </fieldset>

                        {/* Recipient details */}
                        <fieldset className="win-groupbox" style={{ flex: 1 }}>
                            <legend className="win-groupbox-label">Recipient Details</legend>
                            <DetailTable rows={[
                                { label: 'Name:', value: data.recipientName || '' },
                                { label: 'Bank:', value: data.bankName || '' },
                                { label: 'Account:', value: data.accountNumber ? `****${data.accountNumber.slice(-4)}` : '' },
                                { label: 'IFSC:', value: data.ifscCode || '' },
                                { label: 'Reason:', value: data.reason || '' },
                            ]} />
                        </fieldset>
                    </div>

                    {/* Terms checkbox */}
                    <div style={{ padding: '6px', backgroundColor: '#ffffff', borderTop: '1px solid #808080', borderLeft: '1px solid #808080', borderRight: '1px solid #ffffff', borderBottom: '1px solid #ffffff', fontSize: '11px' }}>
                        <label style={{ display: 'flex', alignItems: 'flex-start', gap: '6px', cursor: 'pointer' }}>
                            <input
                                type="checkbox"
                                checked={agreed}
                                onChange={(e) => setAgreed(e.target.checked)}
                                style={{ marginTop: '1px', cursor: 'pointer' }}
                                aria-required="true"
                            />
                            <span>
                                I confirm that all the above details are correct and I agree to the{' '}
                                <span style={{ color: '#0000ff', textDecoration: 'underline', cursor: 'pointer' }}>Terms of Service</span>.
                                Transfers to {data.receiveCurrency?.name || data.receiveCurrency?.code} are subject to local banking regulations.
                            </span>
                        </label>
                    </div>

                    <hr className="win-sep-h" />

                    {/* Dialog buttons */}
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '6px' }}>
                        <button onClick={onBack} disabled={isSubmitting} className="win-btn">
                            &lt; Back
                        </button>
                        <button
                            onClick={handleConfirm}
                            disabled={isSubmitting || !agreed}
                            className="win-btn win-btn-primary"
                            style={{
                                minWidth: '160px',
                                fontWeight: 'bold',
                                opacity: isSubmitting || !agreed ? 0.5 : 1,
                                cursor: isSubmitting || !agreed ? 'default' : 'pointer',
                            }}
                        >
                            {isSubmitting ? 'Processing...' : `Confirm & Send £${data.sendAmount?.toLocaleString()}`}
                        </button>
                        <button onClick={onBack} disabled={isSubmitting} className="win-btn">
                            Cancel
                        </button>
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

function DetailTable({ rows }: { rows: { label: string; value: string; bold?: boolean; highlight?: boolean }[] }) {
    return (
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '11px' }}>
            <tbody>
                {rows.map((row) => (
                    <tr key={row.label} style={{ borderBottom: '1px solid #e8e4dc' }}>
                        <td style={{ padding: '3px 4px', color: '#555555', whiteSpace: 'nowrap' }}>{row.label}</td>
                        <td
                            style={{
                                padding: '3px 4px',
                                fontWeight: row.bold ? 'bold' : 'normal',
                                color: row.highlight ? '#006400' : '#000000',
                            }}
                        >
                            {row.value}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

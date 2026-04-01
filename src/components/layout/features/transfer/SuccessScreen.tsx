import React from 'react';
import type { TransferData } from '../../../../types';

interface SuccessScreenProps {
    onReset: () => void;
    data: Partial<TransferData>;
}

export function SuccessScreen({ onReset, data }: SuccessScreenProps) {
    const [copied, setCopied] = React.useState(false);
    const [rating, setRating] = React.useState(0);
    const [isDownloading, setIsDownloading] = React.useState(false);

    const transferId = React.useMemo(
        () => `SL-${Math.floor(1000 + Math.random() * 9000)}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`,
        []
    );

    const recipientReceives = (Number(data.sendAmount || 0) - Number(data.fee || 0)) * Number(data.exchangeRate || 1);

    const handleCopyId = () => {
        navigator.clipboard.writeText(transferId);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleDownloadReceipt = () => {
        setIsDownloading(true);
        const receiptContent = `ZEPHYR - TRANSFER RECEIPT\n----------------------------------\nTransfer ID: ${transferId}\nDate: ${new Date().toLocaleString()}\n\nSENDER DETAILS:\nAmount Sent: ${data.sendAmount} ${data.sendCurrency?.code}\nFee: ${data.fee} ${data.sendCurrency?.code}\n\nRECIPIENT DETAILS:\nName: ${data.recipientName}\nBank: ${data.bankName}\nAccount: ****${data.accountNumber?.slice(-4)}\n\nCONVERSION:\nExchange Rate: 1 ${data.sendCurrency?.code} = ${data.exchangeRate} ${data.receiveCurrency?.code}\nAmount Received: ${recipientReceives.toFixed(2)} ${data.receiveCurrency?.code}\n\nSTATUS: Initiated\n----------------------------------\nThank you for choosing Zephyr.`;
        const blob = new Blob([receiptContent], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `Zephyr_Receipt_${transferId}.txt`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        setTimeout(() => setIsDownloading(false), 1500);
    };

    return (
        <div style={{
            fontFamily: "'Tahoma', 'MS Sans Serif', 'Arial', sans-serif",
            fontSize: '11px',
            maxWidth: '560px',
            margin: '0 auto',
        }}>

            {/* Success message box — like a Windows info dialog */}
            <div className="win-window" style={{ marginBottom: '10px' }}>
                <div className="win-titlebar">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
                            <circle cx="6" cy="6" r="6" fill="#006400" />
                            <polyline points="2.5,6 5,8.5 9.5,3.5" stroke="#ffffff" strokeWidth="1.5" fill="none" />
                        </svg>
                        <span>Transfer Initiated Successfully</span>
                    </div>
                    <div style={{ display: 'flex', gap: '2px' }}>
                        <button className="win-titlebar-btn" aria-label="Close" onClick={onReset}>
                            <svg width="6" height="6" viewBox="0 0 6 6">
                                <line x1="0" y1="0" x2="6" y2="6" stroke="#000" strokeWidth="1.5" />
                                <line x1="6" y1="0" x2="0" y2="6" stroke="#000" strokeWidth="1.5" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Success message body */}
                <div style={{ padding: '16px', backgroundColor: '#d4d0c8', display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                    {/* Big checkmark icon */}
                    <div style={{ flexShrink: 0 }}>
                        <svg width="48" height="48" viewBox="0 0 48 48" aria-label="Success" role="img">
                            <circle cx="24" cy="24" r="22" fill="#006400" stroke="#004800" strokeWidth="1.5" />
                            <polyline points="10,24 19,33 38,14" stroke="#ffffff" strokeWidth="3.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                    <div>
                        <div style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '6px' }}>
                            Transfer Initiated
                        </div>
                        <p style={{ fontSize: '11px', lineHeight: '1.6', margin: 0 }}>
                            Your {data.sendCurrency?.code} {data.sendAmount?.toLocaleString()} is on its way to <strong>{data.recipientName}</strong>.
                            Estimated arrival: <strong>Tomorrow, 14:00 GMT</strong>.
                        </p>
                    </div>
                </div>
            </div>

            {/* Transfer ID + details */}
            <div className="win-window" style={{ marginBottom: '10px' }}>
                <div className="win-titlebar" style={{ padding: '2px 6px' }}>
                    <span>Transfer Receipt — {transferId}</span>
                </div>
                <div style={{ padding: '10px', backgroundColor: '#d4d0c8', display: 'flex', flexDirection: 'column', gap: '8px' }}>

                    {/* Transfer ID row */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span style={{ fontWeight: 'bold', minWidth: '100px' }}>Transfer ID:</span>
                        <div
                            style={{
                                flex: 1,
                                fontFamily: "'Courier New', monospace",
                                fontSize: '12px',
                                fontWeight: 'bold',
                                padding: '2px 6px',
                                borderTop: '1px solid #808080',
                                borderLeft: '1px solid #808080',
                                borderRight: '1px solid #ffffff',
                                borderBottom: '1px solid #ffffff',
                                backgroundColor: '#ffffff',
                                letterSpacing: '1px',
                            }}
                        >
                            {transferId}
                        </div>
                        <button
                            className="win-btn"
                            onClick={handleCopyId}
                            style={{ minWidth: 0, padding: '2px 8px', fontSize: '11px' }}
                            title="Copy transfer ID"
                        >
                            {copied ? 'Copied!' : 'Copy'}
                        </button>
                    </div>

                    {/* Details table */}
                    <div
                        style={{
                            borderTop: '1px solid #808080',
                            borderLeft: '1px solid #808080',
                            borderRight: '1px solid #ffffff',
                            borderBottom: '1px solid #ffffff',
                            boxShadow: 'inset 1px 1px 0 #404040',
                            backgroundColor: '#ffffff',
                        }}
                    >
                        {[
                            { label: 'Amount Sent', value: `${data.sendAmount?.toLocaleString()} ${data.sendCurrency?.code}` },
                            { label: 'Recipient Receives', value: `${recipientReceives.toLocaleString(undefined, { maximumFractionDigits: 2 })} ${data.receiveCurrency?.code}`, highlight: true },
                            { label: 'Recipient Name', value: data.recipientName || '' },
                            { label: 'Payment Method', value: data.paymentMethod || '' },
                            { label: 'Estimated Arrival', value: 'Tomorrow, 14:00 GMT', bold: true },
                        ].map((row, i) => (
                            <div
                                key={row.label}
                                style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    padding: '4px 8px',
                                    borderBottom: i < 4 ? '1px solid #e8e4dc' : undefined,
                                    backgroundColor: i % 2 === 0 ? '#ffffff' : '#f8f6f2',
                                    fontSize: '11px',
                                }}
                            >
                                <span style={{ color: '#555555' }}>{row.label}</span>
                                <span style={{
                                    fontWeight: row.bold || row.highlight ? 'bold' : 'normal',
                                    color: row.highlight ? '#006400' : '#000000',
                                }}>
                                    {row.value}
                                </span>
                            </div>
                        ))}
                    </div>

                    {/* Rating */}
                    <fieldset className="win-groupbox">
                        <legend className="win-groupbox-label">Rate Your Experience</legend>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '4px 0' }}>
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    key={star}
                                    onClick={() => setRating(star)}
                                    style={{
                                        width: '22px',
                                        height: '22px',
                                        background: 'none',
                                        border: 'none',
                                        cursor: 'pointer',
                                        padding: 0,
                                        fontSize: '18px',
                                        lineHeight: 1,
                                        color: star <= rating ? '#ffd700' : '#c8c4bc',
                                    }}
                                    title={`${star} star${star !== 1 ? 's' : ''}`}
                                    aria-label={`Rate ${star} star${star !== 1 ? 's' : ''}`}
                                >
                                    &#9733;
                                </button>
                            ))}
                            {rating > 0 && (
                                <span style={{ fontSize: '11px', color: '#555555', marginLeft: '6px' }}>
                                    {['', 'Poor', 'Fair', 'Good', 'Very Good', 'Excellent'][rating]}
                                </span>
                            )}
                        </div>
                    </fieldset>

                    <hr className="win-sep-h" />

                    {/* Action buttons */}
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '6px' }}>
                        <button
                            onClick={handleDownloadReceipt}
                            disabled={isDownloading}
                            className="win-btn"
                            style={{ minWidth: '130px' }}
                        >
                            {isDownloading ? 'Saving...' : 'Save Receipt...'}
                        </button>
                        <button
                            onClick={onReset}
                            className="win-btn win-btn-primary"
                            style={{ minWidth: '130px', fontWeight: 'bold' }}
                        >
                            New Transfer
                        </button>
                        <button onClick={onReset} className="win-btn">
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

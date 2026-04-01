import React from "react";
import type { TransferData } from "../../../../types";

interface ReciepientdetailsProps {
    onNext: (data: Partial<TransferData>) => void;
    onBack: () => void;
    data?: Partial<TransferData>;
}

const WIN_STYLE: React.CSSProperties = {
    fontFamily: "'Tahoma', 'MS Sans Serif', 'Arial', sans-serif",
    fontSize: '11px',
};

export function Reciepientdetails({ onNext, onBack, data }: ReciepientdetailsProps) {
    const [type, setType] = React.useState<'someone' | 'self'>('someone');
    const [recipientName, setRecipientName] = React.useState<string>(data?.recipientName || '');
    const [bankName, setBankName] = React.useState<string>(data?.bankName || '');
    const [ifscCode, setIfscCode] = React.useState<string>(data?.ifscCode || '');
    const [reason, setReason] = React.useState(data?.reason || 'Family Support');
    const [accountNumber, setAccountNumber] = React.useState<string>(data?.accountNumber || '');
    const reasons = ['Family Support', 'Property Purchase', 'Investment', 'Gift', 'Other'];

    return (
        <div style={{ ...WIN_STYLE, maxWidth: '680px', margin: '0 auto' }}>

            {/* Progress wizard header */}
            <div className="win-window" style={{ marginBottom: '10px' }}>
                <div className="win-titlebar">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
                            <rect width="12" height="12" rx="1" fill="#3a6ea5" />
                            <text x="2" y="10" fill="white" fontSize="7" fontWeight="bold" fontFamily="Arial">Z</text>
                        </svg>
                        <span>Zephyr Transfer Wizard — Step 2 of 4: Recipient Details</span>
                    </div>
                </div>
                <div style={{ padding: '6px 10px', backgroundColor: '#d4d0c8', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <WizardStep num={1} label="Amount" done />
                    <div style={{ width: '20px', height: '1px', backgroundColor: '#808080' }} aria-hidden="true" />
                    <WizardStep num={2} label="Recipient" active />
                    <div style={{ width: '20px', height: '1px', backgroundColor: '#808080' }} aria-hidden="true" />
                    <WizardStep num={3} label="Payment" />
                    <div style={{ width: '20px', height: '1px', backgroundColor: '#808080' }} aria-hidden="true" />
                    <WizardStep num={4} label="Review" />
                </div>
            </div>

            {/* Main dialog */}
            <div className="win-window">
                <div style={{ padding: '12px', backgroundColor: '#d4d0c8', display: 'flex', flexDirection: 'column', gap: '10px' }}>

                    {/* Transfer type radio group */}
                    <fieldset className="win-groupbox">
                        <legend className="win-groupbox-label">Transfer Type</legend>
                        <div style={{ display: 'flex', gap: '20px', padding: '4px 0' }}>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', fontSize: '11px' }}>
                                <input
                                    type="radio"
                                    name="transferType"
                                    value="someone"
                                    checked={type === 'someone'}
                                    onChange={() => setType('someone')}
                                    style={{ cursor: 'pointer' }}
                                />
                                Send to someone else
                            </label>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', fontSize: '11px' }}>
                                <input
                                    type="radio"
                                    name="transferType"
                                    value="self"
                                    checked={type === 'self'}
                                    onChange={() => setType('self')}
                                    style={{ cursor: 'pointer' }}
                                />
                                Send to myself
                            </label>
                        </div>
                    </fieldset>

                    {/* Recipient details group */}
                    <fieldset className="win-groupbox">
                        <legend className="win-groupbox-label">Recipient Bank Details</legend>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>

                            <FormRow label="Recipient's Full Name:">
                                <input
                                    type="text"
                                    placeholder="e.g. Rohit Sharma"
                                    value={recipientName}
                                    onChange={(e) => setRecipientName(e.target.value)}
                                    className="win-input"
                                    aria-label="Recipient full name"
                                />
                            </FormRow>

                            <FormRow label="Bank Name:">
                                <input
                                    type="text"
                                    placeholder="e.g. HDFC Bank"
                                    value={bankName}
                                    onChange={(e) => setBankName(e.target.value)}
                                    className="win-input"
                                    aria-label="Bank name"
                                />
                            </FormRow>

                            <div style={{ display: 'flex', gap: '12px' }}>
                                <FormRow label="Account Number:" style={{ flex: 1 }}>
                                    <input
                                        type="text"
                                        placeholder="e.g. 1234567890"
                                        value={accountNumber}
                                        onChange={(e) => setAccountNumber(e.target.value)}
                                        className="win-input"
                                        aria-label="Account number"
                                    />
                                </FormRow>
                                <FormRow label="IFSC Code:" style={{ flex: 1 }}>
                                    <input
                                        type="text"
                                        placeholder="e.g. HDFC0000001"
                                        value={ifscCode}
                                        onChange={(e) => setIfscCode(e.target.value)}
                                        className="win-input"
                                        aria-label="IFSC code"
                                    />
                                </FormRow>
                            </div>
                        </div>
                    </fieldset>

                    {/* Reason group */}
                    <fieldset className="win-groupbox">
                        <legend className="win-groupbox-label">Reason for Transfer</legend>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', padding: '4px 0' }}>
                            {reasons.map((r) => (
                                <label
                                    key={r}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '4px',
                                        cursor: 'pointer',
                                        fontSize: '11px',
                                        marginRight: '8px',
                                    }}
                                >
                                    <input
                                        type="radio"
                                        name="reason"
                                        value={r}
                                        checked={reason === r}
                                        onChange={() => setReason(r)}
                                        style={{ cursor: 'pointer' }}
                                    />
                                    {r}
                                </label>
                            ))}
                        </div>
                    </fieldset>

                    {/* Info box */}
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
                            fontSize: '11px',
                        }}
                        role="note"
                    >
                        <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true" style={{ flexShrink: 0 }}>
                            <circle cx="8" cy="8" r="7" fill="#ffd700" stroke="#a09800" strokeWidth="1" />
                            <text x="6" y="12" fill="#000" fontSize="10" fontWeight="bold" fontFamily="Arial">!</text>
                        </svg>
                        <div>
                            <strong>Security Notice:</strong> These details will be encrypted using AES-256 and stored securely for your future convenience. Zephyr is FCA regulated.
                        </div>
                    </div>

                    <hr className="win-sep-h" />

                    {/* Dialog buttons */}
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '6px' }}>
                        <button onClick={onBack} className="win-btn">
                            &lt; Back
                        </button>
                        <button
                            onClick={() => onNext({ recipientName, bankName, accountNumber, ifscCode, reason })}
                            className="win-btn win-btn-primary"
                            style={{ minWidth: '140px', fontWeight: 'bold' }}
                        >
                            Next &gt; Payment
                        </button>
                        <button onClick={onBack} className="win-btn">
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

function FormRow({ label, children, style }: { label: string; children: React.ReactNode; style?: React.CSSProperties }) {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', ...style }}>
            <label style={{ fontSize: '11px', fontWeight: 'bold' }}>{label}</label>
            {children}
        </div>
    );
}

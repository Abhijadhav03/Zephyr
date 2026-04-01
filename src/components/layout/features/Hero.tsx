import { Calculator } from './transfer/calculator';

interface HeroProps {
    onStartTransfer: (data: any) => void;
}

export function Hero({ onStartTransfer }: HeroProps) {
    return (
        <section
            style={{
                backgroundColor: '#008080',
                minHeight: 'calc(100vh - 80px)',
                padding: '16px',
                paddingBottom: '36px',
                fontFamily: "'Tahoma', 'MS Sans Serif', 'Arial', sans-serif",
            }}
        >
            {/* Desktop icons row */}
            <div style={{ display: 'flex', gap: '24px', marginBottom: '16px', alignItems: 'flex-start' }}>
                <DesktopIcon
                    label="My Money"
                    icon={
                        <svg width="32" height="32" viewBox="0 0 32 32" aria-hidden="true">
                            <rect width="32" height="32" rx="2" fill="#c8c400" />
                            <rect x="4" y="8" width="24" height="16" rx="1" fill="#ffd700" stroke="#a09800" strokeWidth="1" />
                            <circle cx="16" cy="16" r="5" fill="#a09800" />
                            <text x="13" y="20" fill="#ffd700" fontSize="9" fontWeight="bold" fontFamily="Arial">$</text>
                        </svg>
                    }
                />
                <DesktopIcon
                    label="Exchange Rates"
                    icon={
                        <svg width="32" height="32" viewBox="0 0 32 32" aria-hidden="true">
                            <rect width="32" height="32" rx="2" fill="#1e6ba8" />
                            <circle cx="16" cy="16" r="10" stroke="#7ec8ff" strokeWidth="1.5" fill="none" />
                            <path d="M16 6 Q20 16 16 26" stroke="#7ec8ff" strokeWidth="1" fill="none" />
                            <path d="M16 6 Q12 16 16 26" stroke="#7ec8ff" strokeWidth="1" fill="none" />
                            <line x1="6" y1="16" x2="26" y2="16" stroke="#7ec8ff" strokeWidth="1" />
                        </svg>
                    }
                />
                <DesktopIcon
                    label="Transfer History"
                    icon={
                        <svg width="32" height="32" viewBox="0 0 32 32" aria-hidden="true">
                            <rect width="32" height="32" rx="2" fill="#ffffff" stroke="#808080" strokeWidth="1" />
                            <rect x="4" y="4" width="24" height="4" fill="#0a246a" />
                            <line x1="4" y1="12" x2="28" y2="12" stroke="#d4d0c8" strokeWidth="1" />
                            <line x1="4" y1="16" x2="28" y2="16" stroke="#d4d0c8" strokeWidth="1" />
                            <line x1="4" y1="20" x2="22" y2="20" stroke="#d4d0c8" strokeWidth="1" />
                        </svg>
                    }
                />
                <DesktopIcon
                    label="Recycle Bin"
                    icon={
                        <svg width="32" height="32" viewBox="0 0 32 32" aria-hidden="true">
                            <rect x="8" y="4" width="16" height="2" rx="1" fill="#808080" />
                            <rect x="10" y="6" width="12" height="22" rx="1" fill="#d4d0c8" stroke="#808080" strokeWidth="1" />
                            <line x1="14" y1="10" x2="14" y2="24" stroke="#808080" strokeWidth="1" />
                            <line x1="18" y1="10" x2="18" y2="24" stroke="#808080" strokeWidth="1" />
                        </svg>
                    }
                />
            </div>

            {/* Main content: two windows side by side */}
            <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start', flexWrap: 'wrap' }}>

                {/* Left info window */}
                <div className="win-window" style={{ width: '340px', minWidth: '280px', flex: '0 0 340px' }}>
                    <div className="win-titlebar">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
                                <rect width="12" height="12" rx="1" fill="#3a6ea5" />
                                <text x="2" y="10" fill="white" fontSize="8" fontWeight="bold" fontFamily="Arial">Z</text>
                            </svg>
                            <span>Welcome to Zephyr — Information</span>
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

                    {/* Tabs */}
                    <div style={{ display: 'flex', paddingTop: '6px', paddingLeft: '6px', backgroundColor: '#d4d0c8' }}>
                        <div className="win-tab win-tab-active" role="tab" aria-selected="true">About</div>
                        <div className="win-tab" role="tab" aria-selected="false">Rates</div>
                        <div className="win-tab" role="tab" aria-selected="false">Security</div>
                    </div>

                    <div
                        style={{
                            borderTop: '2px solid #ffffff',
                            borderLeft: '1px solid #808080',
                            borderRight: '1px solid #808080',
                            borderBottom: '1px solid #808080',
                            backgroundColor: '#d4d0c8',
                            margin: '0 6px 6px 6px',
                            padding: '12px',
                        }}
                    >
                        {/* Icon + heading */}
                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '12px' }}>
                            <svg width="48" height="48" viewBox="0 0 48 48" aria-hidden="true" style={{ flexShrink: 0 }}>
                                <rect width="48" height="48" rx="3" fill="#1e6ba8" />
                                <circle cx="24" cy="24" r="16" stroke="#7ec8ff" strokeWidth="2" fill="none" />
                                <path d="M24 8 Q30 24 24 40" stroke="#7ec8ff" strokeWidth="1.5" fill="none" />
                                <path d="M24 8 Q18 24 24 40" stroke="#7ec8ff" strokeWidth="1.5" fill="none" />
                                <line x1="8" y1="24" x2="40" y2="24" stroke="#7ec8ff" strokeWidth="1.5" />
                                <text x="18" y="28" fill="#ffd700" fontSize="12" fontWeight="bold" fontFamily="Arial">$</text>
                            </svg>
                            <div>
                                <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#000000', lineHeight: '1.2' }}>
                                    Institutional Grade Money Movement
                                </div>
                                <div style={{ fontSize: '11px', color: '#0000ff', marginTop: '2px', textDecoration: 'underline', cursor: 'pointer' }}>
                                    www.zephyr.local
                                </div>
                            </div>
                        </div>

                        <hr className="win-sep-h" />

                        <p style={{ fontSize: '11px', lineHeight: '1.6', color: '#000000', margin: '8px 0' }}>
                            Experience the gold standard in international transfers. Fast, secure, and completely transparent conversions from GBP to INR and 40+ other currencies.
                        </p>

                        <hr className="win-sep-h" />

                        {/* Feature checkboxes */}
                        <div style={{ marginTop: '8px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                            <FeatureRow label="FCA Regulated" checked />
                            <FeatureRow label="Bank-Grade AES-256 Security" checked />
                            <FeatureRow label="40+ Currencies Supported" checked />
                            <FeatureRow label="Real-time Exchange Rates" checked />
                            <FeatureRow label="Zero Hidden Fees" checked />
                        </div>

                        <hr className="win-sep-h" style={{ marginTop: '10px' }} />

                        {/* Rate display */}
                        <div
                            style={{
                                marginTop: '8px',
                                padding: '6px 8px',
                                borderTop: '1px solid #808080',
                                borderLeft: '1px solid #808080',
                                borderRight: '1px solid #ffffff',
                                borderBottom: '1px solid #ffffff',
                                backgroundColor: '#ffffff',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                            }}
                        >
                            <span style={{ fontSize: '11px', fontWeight: 'bold' }}>Live Rate GBP/INR:</span>
                            <span style={{ fontSize: '13px', fontWeight: 'bold', color: '#006400' }}>+0.42%</span>
                        </div>

                        <div
                            style={{
                                marginTop: '6px',
                                padding: '6px 8px',
                                borderTop: '1px solid #808080',
                                borderLeft: '1px solid #808080',
                                borderRight: '1px solid #ffffff',
                                borderBottom: '1px solid #ffffff',
                                backgroundColor: '#ffffff',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                            }}
                        >
                            <span style={{ fontSize: '11px', fontWeight: 'bold' }}>Typical Transfer Time:</span>
                            <span style={{ fontSize: '11px', color: '#0a246a', fontWeight: 'bold' }}>1-2 Business Days</span>
                        </div>
                    </div>

                    {/* Status bar */}
                    <div className="win-statusbar">
                        <div className="win-statusbar-panel" style={{ flex: 1 }}>Ready</div>
                        <div className="win-statusbar-panel">FCA Auth: Active</div>
                        <div className="win-statusbar-panel">TLS 1.3</div>
                    </div>
                </div>

                {/* Right: Calculator window */}
                <div style={{ flex: '1', minWidth: '320px', maxWidth: '520px' }}>
                    <Calculator onNext={onStartTransfer} />
                </div>

                {/* Right-most: Tips window */}
                <div className="win-window" style={{ width: '200px', minWidth: '180px', flex: '0 0 200px' }}>
                    <div className="win-titlebar">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true">
                                <circle cx="5" cy="5" r="5" fill="#ffd700" />
                                <text x="2.5" y="9" fill="#000" fontSize="8" fontWeight="bold" fontFamily="Arial">!</text>
                            </svg>
                            <span>Tips</span>
                        </div>
                        <button className="win-titlebar-btn" aria-label="Close">
                            <svg width="6" height="6" viewBox="0 0 6 6">
                                <line x1="0" y1="0" x2="6" y2="6" stroke="#000" strokeWidth="1.5" />
                                <line x1="6" y1="0" x2="0" y2="6" stroke="#000" strokeWidth="1.5" />
                            </svg>
                        </button>
                    </div>
                    <div style={{ padding: '8px', backgroundColor: '#d4d0c8', fontSize: '11px' }}>
                        <div style={{ fontWeight: 'bold', marginBottom: '6px', borderBottom: '1px solid #808080', paddingBottom: '4px' }}>
                            Did you know?
                        </div>
                        <ul style={{ margin: 0, padding: '0 0 0 14px', lineHeight: '1.8', color: '#000000' }}>
                            <li>GBP to INR is our most popular route</li>
                            <li>Rates update every 60 seconds</li>
                            <li>No weekend surcharges</li>
                            <li>Refer a friend for fee waivers</li>
                        </ul>
                        <hr className="win-sep-h" />
                        <button
                            onClick={() => onStartTransfer({})}
                            className="win-btn win-btn-primary"
                            style={{ width: '100%', marginTop: '6px' }}
                        >
                            Send Money Now
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}

function DesktopIcon({ label, icon }: { label: string; icon: React.ReactNode }) {
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '4px',
                cursor: 'pointer',
                padding: '4px',
                width: '64px',
                textAlign: 'center',
            }}
            className="group"
        >
            {icon}
            <span
                style={{
                    fontSize: '11px',
                    color: '#ffffff',
                    textShadow: '1px 1px 2px #000000',
                    lineHeight: '1.2',
                    wordBreak: 'break-word',
                }}
            >
                {label}
            </span>
        </div>
    );
}

function FeatureRow({ label, checked }: { label: string; checked?: boolean }) {
    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px' }}>
            <div
                style={{
                    width: '13px',
                    height: '13px',
                    borderTop: '1px solid #808080',
                    borderLeft: '1px solid #808080',
                    borderRight: '1px solid #ffffff',
                    borderBottom: '1px solid #ffffff',
                    boxShadow: 'inset 1px 1px 0 #404040',
                    backgroundColor: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                }}
            >
                {checked && (
                    <svg width="9" height="9" viewBox="0 0 9 9" aria-hidden="true">
                        <polyline points="1,5 3.5,7.5 8,1.5" stroke="#000000" strokeWidth="1.5" fill="none" />
                    </svg>
                )}
            </div>
            <span>{label}</span>
        </div>
    );
}

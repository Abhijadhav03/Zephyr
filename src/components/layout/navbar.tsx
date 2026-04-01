import { useUser } from "../../hooks/useUser";
import { useState } from "react";

interface NavbarProps {
    onLogoClick: () => void;
    onHistoryClick: () => void;
    onBusinessClick: () => void;
    currentView: string;
}

export function Navbar({ onLogoClick, onHistoryClick, onBusinessClick, currentView }: NavbarProps) {
    const { user, loading } = useUser("1");
    const [time] = useState(() => {
        const now = new Date();
        return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    });

    return (
        <div className="sticky top-0 z-50 select-none">
            {/* Window title bar */}
            <div className="win-titlebar">
                <div className="flex items-center gap-1.5">
                    {/* App icon — pixelated $ globe */}
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                        <rect width="14" height="14" rx="1" fill="#3a6ea5" />
                        <circle cx="7" cy="7" r="5" stroke="#7ec8e3" strokeWidth="1" fill="none" />
                        <text x="4" y="10" fill="#ffffff" fontSize="7" fontWeight="bold" fontFamily="Arial">$</text>
                    </svg>
                    <span className="font-bold text-xs">Zephyr Money Transfer — [Home]</span>
                </div>

                {/* Window control buttons */}
                <div className="flex items-center gap-1">
                    <button className="win-titlebar-btn" aria-label="Minimize" title="Minimize">
                        <svg width="8" height="8" viewBox="0 0 8 8"><rect x="0" y="6" width="8" height="2" fill="#000000" /></svg>
                    </button>
                    <button className="win-titlebar-btn" aria-label="Maximize" title="Maximize">
                        <svg width="8" height="8" viewBox="0 0 8 8"><rect x="0" y="0" width="8" height="8" fill="none" stroke="#000000" strokeWidth="1.5" /></svg>
                    </button>
                    <button
                        className="win-titlebar-btn"
                        style={{ backgroundColor: '#d4d0c8' }}
                        aria-label="Close"
                        title="Close"
                        onClick={onLogoClick}
                    >
                        <svg width="8" height="8" viewBox="0 0 8 8">
                            <line x1="0" y1="0" x2="8" y2="8" stroke="#000000" strokeWidth="1.5" />
                            <line x1="8" y1="0" x2="0" y2="8" stroke="#000000" strokeWidth="1.5" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Menu bar */}
            <div className="win-menubar" role="menubar">
                <button
                    role="menuitem"
                    onClick={onLogoClick}
                    className={`win-menu-item${currentView === 'home' ? ' win-menu-item-active' : ''}`}
                >
                    <span style={{ textDecoration: 'underline' }}>F</span>ile
                </button>
                <button
                    role="menuitem"
                    onClick={onHistoryClick}
                    className={`win-menu-item${currentView === 'history' ? ' win-menu-item-active' : ''}`}
                >
                    <span style={{ textDecoration: 'underline' }}>H</span>istory
                </button>
                <button
                    role="menuitem"
                    onClick={onBusinessClick}
                    className={`win-menu-item${currentView === 'business' ? ' win-menu-item-active' : ''}`}
                >
                    <span style={{ textDecoration: 'underline' }}>B</span>usiness
                </button>
                <button role="menuitem" className="win-menu-item">
                    <span style={{ textDecoration: 'underline' }}>V</span>iew
                </button>
                <button role="menuitem" className="win-menu-item">
                    <span style={{ textDecoration: 'underline' }}>H</span>elp
                </button>

                {/* Right side: user info + clock */}
                <div className="flex items-center gap-2 ml-auto pr-1">
                    {!loading && user && (
                        <div className="flex items-center gap-1.5" style={{ fontSize: '11px' }}>
                            <img
                                src={user.avatar}
                                alt={user.name}
                                referrerPolicy="no-referrer"
                                className="w-4 h-4 rounded-sm"
                                style={{ imageRendering: 'pixelated' }}
                            />
                            <span className="font-bold" style={{ color: '#0a246a' }}>{user.name}</span>
                            <span
                                style={{
                                    fontSize: '9px',
                                    color: '#006400',
                                    border: '1px solid #808080',
                                    padding: '0 2px',
                                    backgroundColor: '#d4ead4'
                                }}
                            >{user.tier}</span>
                        </div>
                    )}
                    <div className="win-statusbar-panel" style={{ fontSize: '11px' }}>
                        {time}
                    </div>
                </div>
            </div>

            {/* Toolbar */}
            <div className="win-toolbar" role="toolbar" aria-label="Standard toolbar">
                {/* Back */}
                <button className="win-btn" style={{ minWidth: 0, padding: '2px 8px' }} onClick={onLogoClick} title="Back">
                    <svg width="16" height="11" viewBox="0 0 16 11" fill="none" aria-hidden="true" style={{ display: 'inline-block', verticalAlign: 'middle' }}>
                        <path d="M5 1L1 5.5L5 10" stroke="#000" strokeWidth="1.5" fill="none" />
                        <line x1="1" y1="5.5" x2="15" y2="5.5" stroke="#000" strokeWidth="1.5" />
                    </svg>
                    {' '}Back
                </button>
                <button className="win-btn" style={{ minWidth: 0, padding: '2px 8px', color: '#808080' }} disabled title="Forward">
                    Forward{' '}
                    <svg width="16" height="11" viewBox="0 0 16 11" fill="none" aria-hidden="true" style={{ display: 'inline-block', verticalAlign: 'middle' }}>
                        <path d="M11 1L15 5.5L11 10" stroke="#808080" strokeWidth="1.5" fill="none" />
                        <line x1="15" y1="5.5" x2="1" y2="5.5" stroke="#808080" strokeWidth="1.5" />
                    </svg>
                </button>
                <div className="win-toolbar-sep" aria-hidden="true" />
                <button
                    className="win-btn"
                    style={{ minWidth: 0, padding: '2px 8px' }}
                    onClick={onHistoryClick}
                    title="History"
                >
                    History
                </button>
                <button
                    className="win-btn"
                    style={{ minWidth: 0, padding: '2px 8px' }}
                    onClick={onBusinessClick}
                    title="Business"
                >
                    Business
                </button>
                <div className="win-toolbar-sep" aria-hidden="true" />

                {/* Address bar */}
                <span style={{ fontSize: '11px', marginLeft: '4px' }}>Address:</span>
                <div
                    style={{
                        flex: 1,
                        display: 'flex',
                        alignItems: 'center',
                        marginLeft: '4px',
                        borderTop: '1px solid #808080',
                        borderLeft: '1px solid #808080',
                        borderRight: '1px solid #ffffff',
                        borderBottom: '1px solid #ffffff',
                        boxShadow: 'inset 1px 1px 0 #404040',
                        background: '#ffffff',
                        height: '20px',
                        padding: '0 4px',
                        fontSize: '11px',
                        color: '#0000ff',
                    }}
                >
                    http://zephyr.local/
                    {currentView !== 'home' ? currentView : ''}
                </div>
                <button className="win-btn" style={{ minWidth: 0, padding: '2px 8px', marginLeft: '2px' }} title="Go">
                    Go
                </button>
            </div>
        </div>
    );
}

import React from 'react';
import type { TransferRecord, TransferStatus } from '../../types';
import { storage } from '../../lib/storage';

const statusColors: Record<TransferStatus, { bg: string; color: string; border: string }> = {
    Completed: { bg: '#d4ead4', color: '#006400', border: '#808080' },
    Processing: { bg: '#fff3cd', color: '#856404', border: '#808080' },
    Pending: { bg: '#cce5ff', color: '#004085', border: '#808080' },
    Failed: { bg: '#f8d7da', color: '#721c24', border: '#808080' },
};

export default function TransferHistory() {
    const [searchTerm, setSearchTerm] = React.useState('');
    const [history, setHistory] = React.useState<TransferRecord[]>([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const timer = setTimeout(() => {
            const data = storage.getTransfers();
            setHistory(data || []);
            setLoading(false);
        }, 600);
        return () => clearTimeout(timer);
    }, []);

    const totalSent = history.reduce((acc, record) => acc + record.amount, 0);
    const filteredHistory = history.filter((record) =>
        record.recipient.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.id.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div style={{
            fontFamily: "'Tahoma', 'MS Sans Serif', 'Arial', sans-serif",
            fontSize: '11px',
            padding: '16px',
            backgroundColor: '#008080',
            minHeight: 'calc(100vh - 80px)',
        }}>

            {/* Window */}
            <div className="win-window" style={{ maxWidth: '900px', margin: '0 auto' }}>
                <div className="win-titlebar">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
                            <rect width="12" height="12" rx="1" fill="#3a6ea5" />
                            <rect x="2" y="3" width="8" height="6" rx="0.5" fill="none" stroke="#ffffff" strokeWidth="1" />
                            <line x1="2" y1="5" x2="10" y2="5" stroke="#ffffff" strokeWidth="0.8" />
                        </svg>
                        <span>Zephyr — Transfer History</span>
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

                {/* Toolbar */}
                <div className="win-toolbar">
                    <span style={{ fontSize: '11px' }}>Find:</span>
                    <input
                        type="text"
                        placeholder="Search recipient or ID..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="win-input"
                        style={{ width: '200px', height: '20px', fontSize: '11px' }}
                        aria-label="Search transfers"
                    />
                    <div className="win-toolbar-sep" aria-hidden="true" />
                    <button className="win-btn" style={{ minWidth: 0, padding: '2px 8px' }}>Refresh</button>
                    <button className="win-btn" style={{ minWidth: 0, padding: '2px 8px' }}>Print</button>
                </div>

                <div style={{ padding: '10px', backgroundColor: '#d4d0c8', display: 'flex', flexDirection: 'column', gap: '10px' }}>

                    {/* Stats row */}
                    <div style={{ display: 'flex', gap: '8px' }}>
                        <StatPanel label="Total Sent (MTD)" value={`£${totalSent.toLocaleString()}`} />
                        <StatPanel label="Success Rate" value="99.8%" />
                        <StatPanel label="Avg. Speed" value="14h 20m" />
                        <StatPanel label="Total Records" value={`${history.length}`} />
                    </div>

                    {/* Table */}
                    <div
                        style={{
                            borderTop: '1px solid #808080',
                            borderLeft: '1px solid #808080',
                            borderRight: '1px solid #ffffff',
                            borderBottom: '1px solid #ffffff',
                            boxShadow: 'inset 1px 1px 0 #404040',
                            backgroundColor: '#ffffff',
                            overflowX: 'auto',
                        }}
                        role="region"
                        aria-label="Transfer history table"
                    >
                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '11px' }}>
                            <thead>
                                <tr>
                                    {['Recipient', 'Transfer ID', 'Date', 'Sent', 'Received', 'Status'].map((col) => (
                                        <th
                                            key={col}
                                            style={{
                                                padding: '3px 8px',
                                                backgroundColor: '#0a246a',
                                                color: '#ffffff',
                                                textAlign: 'left',
                                                fontWeight: 'bold',
                                                fontSize: '11px',
                                                borderRight: '1px solid #1a3680',
                                                whiteSpace: 'nowrap',
                                            }}
                                            scope="col"
                                        >
                                            {col}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    <tr>
                                        <td colSpan={6} style={{ textAlign: 'center', padding: '24px', color: '#808080' }}>
                                            Loading records...
                                        </td>
                                    </tr>
                                ) : filteredHistory.length > 0 ? (
                                    filteredHistory.map((record, idx) => (
                                        <tr
                                            key={record.id}
                                            style={{
                                                backgroundColor: idx % 2 === 0 ? '#ffffff' : '#f0eeea',
                                                borderBottom: '1px solid #e8e4dc',
                                            }}
                                        >
                                            <td style={{ padding: '4px 8px', fontWeight: 'bold' }}>{record.recipient}</td>
                                            <td style={{ padding: '4px 8px', fontFamily: "'Courier New', monospace", fontSize: '10px', color: '#555555' }}>{record.id}</td>
                                            <td style={{ padding: '4px 8px', color: '#555555', whiteSpace: 'nowrap' }}>
                                                {new Date(record.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                                            </td>
                                            <td style={{ padding: '4px 8px', fontWeight: 'bold', color: '#0a246a' }}>
                                                {record.amount.toLocaleString()} {record.currency}
                                            </td>
                                            <td style={{ padding: '4px 8px', fontWeight: 'bold', color: '#006400' }}>
                                                {record.receiveAmount.toLocaleString(undefined, { maximumFractionDigits: 2 })} {record.receiveCurrency}
                                            </td>
                                            <td style={{ padding: '4px 8px' }}>
                                                <span
                                                    style={{
                                                        display: 'inline-block',
                                                        padding: '1px 6px',
                                                        fontSize: '10px',
                                                        fontWeight: 'bold',
                                                        backgroundColor: statusColors[record.status].bg,
                                                        color: statusColors[record.status].color,
                                                        border: `1px solid ${statusColors[record.status].border}`,
                                                        whiteSpace: 'nowrap',
                                                    }}
                                                >
                                                    {record.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={6} style={{ textAlign: 'center', padding: '24px', color: '#808080' }}>
                                            No transfers found. {searchTerm && 'Try a different search term.'}
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Status bar */}
                <div className="win-statusbar">
                    <div className="win-statusbar-panel" style={{ flex: 1 }}>
                        {loading ? 'Loading...' : `${filteredHistory.length} object(s)`}
                    </div>
                    <div className="win-statusbar-panel">Total: £{totalSent.toLocaleString()}</div>
                    <div className="win-statusbar-panel">FCA Regulated</div>
                </div>
            </div>
        </div>
    );
}

function StatPanel({ label, value }: { label: string; value: string }) {
    return (
        <div
            style={{
                flex: 1,
                borderTop: '1px solid #808080',
                borderLeft: '1px solid #808080',
                borderRight: '1px solid #ffffff',
                borderBottom: '1px solid #ffffff',
                boxShadow: 'inset 1px 1px 0 #404040',
                backgroundColor: '#ffffff',
                padding: '8px 10px',
                textAlign: 'center',
                fontSize: '11px',
            }}
        >
            <div style={{ color: '#555555', marginBottom: '2px' }}>{label}</div>
            <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#0a246a', fontFamily: "'Courier New', monospace" }}>{value}</div>
        </div>
    );
}

import React from 'react';
import { motion } from 'framer-motion';
import {
    ArrowUpRight,
    Clock,
    CheckCircle2,
    AlertCircle,
    Search,
    Filter,
    ArrowRight,
} from 'lucide-react';

import type { TransferRecord, TransferStatus } from '../../types';
import { cn } from '../../lib/utils';
import { storage } from '../../lib/storage';

const StatusBadge = ({ status }: { status: TransferStatus }) => {
    const styles: Record<TransferStatus, string> = {
        Completed: 'bg-emerald-50 text-emerald-700 border-emerald-100',
        Processing: 'bg-amber-50 text-amber-700 border-amber-100',
        Pending: 'bg-blue-50 text-blue-700 border-blue-100',
        Failed: 'bg-rose-50 text-rose-700 border-rose-100',
    };

    const icons: Record<TransferStatus, React.ReactNode> = {
        Completed: <CheckCircle2 size={14} />,
        Processing: <Clock size={14} />,
        Pending: <Clock size={14} />,
        Failed: <AlertCircle size={14} />,
    };

    return (
        <span
            className={cn(
                'flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border',
                styles[status]
            )}
        >
            {icons[status]}
            {status}
        </span>
    );
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
        <div className="max-w-5xl mx-auto px-6 py-12">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-6">
                <div className="space-y-2">
                    <h1 className="font-headline text-4xl font-bold text-primary">
                        Transfer History
                    </h1>
                    <p className="text-on-surface-variant">
                        Track and manage your global money movements.
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    <div className="relative flex-1 md:w-64">
                        <Search
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant"
                            size={18}
                        />
                        <input
                            type="text"
                            placeholder="Search recipient or ID..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-secondary/20 focus:border-secondary outline-none transition-all"
                        />
                    </div>

                    <button className="p-2.5 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors text-on-surface-variant">
                        <Filter size={20} />
                    </button>
                </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Main Table Section */}
                <div className="flex-grow space-y-8">
                    <div className="bg-white rounded-[1.5rem] sm:rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
                        <div className="hidden md:block overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-slate-50/50 border-b border-slate-100">
                                        <th className="px-8 py-5 text-xs font-bold uppercase tracking-widest text-on-surface-variant">
                                            Recipient & ID
                                        </th>
                                        <th className="px-8 py-5 text-xs font-bold uppercase tracking-widest text-on-surface-variant">
                                            Date
                                        </th>
                                        <th className="px-8 py-5 text-xs font-bold uppercase tracking-widest text-on-surface-variant">
                                            Amount Sent
                                        </th>
                                        <th className="px-8 py-5 text-xs font-bold uppercase tracking-widest text-on-surface-variant">
                                            Amount Received
                                        </th>
                                        <th className="px-8 py-5 text-xs font-bold uppercase tracking-widest text-on-surface-variant">
                                            Status
                                        </th>
                                        <th className="px-8 py-5 w-16"></th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50">
                                    {loading ? (
                                        <tr>
                                            <td colSpan={6} className="px-8 py-20 text-center">
                                                <div className="flex flex-col items-center gap-4">
                                                    <div className="w-10 h-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
                                                    <p className="text-on-surface-variant font-medium">
                                                        Fetching secure records...
                                                    </p>
                                                </div>
                                            </td>
                                        </tr>
                                    ) : filteredHistory.length > 0 ? (
                                        filteredHistory.map((record, idx) => (
                                            <motion.tr
                                                key={record.id}
                                                initial={{ opacity: 0, y: 8 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: idx * 0.03 }}
                                                className="group hover:bg-slate-50/70 transition-colors duration-200"
                                            >
                                                <td className="px-8 py-6">
                                                    <div className="flex items-center gap-4">
                                                        <div className="w-10 h-10 rounded-full bg-primary/5 flex items-center justify-center text-primary font-bold text-lg">
                                                            {record.recipient.charAt(0).toUpperCase()}
                                                        </div>
                                                        <div>
                                                            <div className="font-semibold text-primary">{record.recipient}</div>
                                                            <div className="text-xs text-on-surface-variant font-mono tracking-tight">
                                                                {record.id}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-8 py-6 text-sm text-on-surface-variant">
                                                    {new Date(record.date).toLocaleDateString('en-GB', {
                                                        day: 'numeric',
                                                        month: 'short',
                                                        year: 'numeric',
                                                    })}
                                                </td>
                                                <td className="px-8 py-6 font-headline font-bold text-primary">
                                                    {record.amount.toLocaleString()} {record.currency}
                                                </td>
                                                <td className="px-8 py-6">
                                                    <div className="font-semibold text-secondary">
                                                        {record.receiveAmount.toLocaleString()} {record.receiveCurrency}
                                                    </div>
                                                </td>
                                                <td className="px-8 py-6">
                                                    <StatusBadge status={record.status} />
                                                </td>
                                                <td className="px-8 py-6 text-right">
                                                    <button className="p-2 rounded-full hover:bg-white hover:shadow transition-all text-on-surface-variant opacity-0 group-hover:opacity-100">
                                                        <ArrowRight size={18} />
                                                    </button>
                                                </td>
                                            </motion.tr>
                                        ))
                                    ) : null}
                                </tbody>
                            </table>
                        </div>


                        {/* Mobile List */}
                        <div className="md:hidden divide-y divide-slate-100">
                            {loading ? (
                                <div className="px-6 py-12 text-center">
                                    <div className="flex flex-col items-center gap-4">
                                        <div className="w-10 h-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
                                        <p className="text-on-surface-variant font-bold">Fetching secure records...</p>
                                    </div>
                                </div>
                            ) : filteredHistory.map((record, idx) => (
                                <motion.div
                                    key={record.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.05 }}
                                    className="p-6 space-y-4"
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-primary/5 flex items-center justify-center text-primary font-bold">
                                                {record.recipient.charAt(0)}
                                            </div>
                                            <div>
                                                <div className="font-bold text-primary">{record.recipient}</div>
                                                <div className="text-[10px] text-on-surface-variant font-mono">{record.id}</div>
                                            </div>
                                        </div>
                                        <StatusBadge status={record.status} />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4 pt-2">
                                        <div>
                                            <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest mb-1">Sent</p>
                                            <p className="font-headline font-bold text-primary">{record.amount.toLocaleString()} {record.currency}</p>
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest mb-1">Received</p>
                                            <p className="font-headline font-bold text-secondary">{record.receiveAmount.toLocaleString()} {record.receiveCurrency}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between pt-2">
                                        <span className="text-xs text-on-surface-variant">
                                            {new Date(record.date).toLocaleDateString('en-GB', {
                                                day: 'numeric',
                                                month: 'short',
                                                year: 'numeric'
                                            })}
                                        </span>
                                        <button className="text-xs font-bold text-primary flex items-center gap-1">
                                            Details <ArrowRight size={14} />
                                        </button>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Empty State */}
                        {!loading && filteredHistory.length === 0 && (
                            <div className="py-20 text-center space-y-4">
                                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto">
                                    <Search size={32} className="text-slate-300" />
                                </div>
                                <div>
                                    <p className="font-semibold text-primary text-lg">No transfers found</p>
                                    <p className="text-sm text-on-surface-variant mt-1">
                                        Try searching for a different name or ID.
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                        <div className="bg-primary text-white p-8 rounded-[2rem] space-y-4">
                            <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                                <ArrowUpRight className="text-white" size={24} />
                            </div>
                            <div>
                                <p className="text-white/70 text-sm font-bold uppercase tracking-widest">Total Sent (MTD)</p>
                                <p className="text-4xl font-headline font-bold mt-2"> £{totalSent}</p>
                            </div>
                        </div>

                        <div className="bg-white border border-slate-100 p-8 rounded-[2rem] space-y-4 shadow-sm">
                            <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center">
                                <CheckCircle2 className="text-secondary" size={24} />
                            </div>
                            <div>
                                <p className="text-on-surface-variant text-sm font-bold uppercase tracking-widest">Success Rate</p>
                                <p className="text-4xl font-headline font-bold text-primary mt-2">99.8%</p>
                            </div>
                        </div>

                        <div className="bg-white border border-slate-100 p-8 rounded-[2rem] space-y-4 shadow-sm">
                            <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                                <Clock className="text-amber-600" size={24} />
                            </div>
                            <div>
                                <p className="text-on-surface-variant text-sm font-bold uppercase tracking-widest">Avg. Speed</p>
                                <p className="text-4xl font-headline font-bold text-primary mt-2">14h 20m</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
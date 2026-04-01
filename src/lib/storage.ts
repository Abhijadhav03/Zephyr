import type { TransferRecord } from '../types';
import { INITIAL_TRANSFERS } from './mockdata';

const TRANSFERS_KEY = 'sovereign_ledger_transfers';

export const storage = {
    getTransfers: (): TransferRecord[] => {
        if (typeof window === 'undefined') return INITIAL_TRANSFERS;
        const stored = localStorage.getItem(TRANSFERS_KEY);
        if (!stored) {
            // Initialize with mock data if empty
            localStorage.setItem(TRANSFERS_KEY, JSON.stringify(INITIAL_TRANSFERS));
            return INITIAL_TRANSFERS;
        }
        try {
            return JSON.parse(stored);
        } catch (e) {
            console.error('Failed to parse transfers from localStorage', e);
            return INITIAL_TRANSFERS;
        }
    },

    addTransfer: (transfer: TransferRecord): void => {
        if (typeof window === 'undefined') return;
        const transfers = storage.getTransfers();
        const updated = [transfer, ...transfers];
        localStorage.setItem(TRANSFERS_KEY, JSON.stringify(updated));
    },

    clearTransfers: (): void => {
        if (typeof window === 'undefined') return;
        localStorage.removeItem(TRANSFERS_KEY);
    }
};
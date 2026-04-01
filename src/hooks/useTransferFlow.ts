import { useState, useCallback } from 'react';
import type { TransferData } from '../types';

export function useTransferFlow() {
    const [view, setView] = useState<'home' | 'history' | 'business'>('home');
    const [step, setStep] = useState(1);
    const [transferData, setTransferData] = useState<Partial<TransferData>>({});

    const handleNext = useCallback((data: Partial<TransferData>) => {
        setTransferData(prev => ({ ...prev, ...data }));
        setStep(prev => prev + 1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    const handleBack = useCallback(() => {
        setStep(prev => prev - 1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    const handleReset = useCallback(() => {
        setStep(1);
        setTransferData({});
        setView('home');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);


    return {
        view,
        step,
        transferData,
        handleNext,
        handleBack,
        handleReset,
    };
}

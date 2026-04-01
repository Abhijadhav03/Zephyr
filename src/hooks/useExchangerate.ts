import { useState, useEffect, useCallback } from 'react';
import type { Currency } from '../types';

export function useExchangeRate(sendCurrency: Currency, receiveCurrency: Currency) {
    const [exchangeRate, setExchangeRate] = useState<number>(108.42);
    const [isFetching, setIsFetching] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isUsingMock, setIsUsingMock] = useState(false);
    const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

    const fetchRate = useCallback(async () => {
        setIsFetching(true);
        setError(null);
        setIsUsingMock(false);
        try {
            const response = await fetch(`https://open.er-api.com/v6/latest/${sendCurrency.code}`);
            if (!response.ok) throw new Error('Network error occurred');

            const data = await response.json();
            if (data.result === 'error') throw new Error(data['error-type'] || 'API error');

            if (data.rates && data.rates[receiveCurrency.code]) {
                setExchangeRate(data.rates[receiveCurrency.code]);
                setLastUpdated(new Date());
            } else {
                throw new Error('Rate not available for selected currency');
            }
        } catch (err) {
            console.error('Failed to fetch exchange rate:', err);
            setError('Live rates unavailable. Using secure offline fallback.');
            setIsUsingMock(true);

            const mockRates: Record<string, Record<string, number>> = {
                'GBP': { 'INR': 108.42, 'EUR': 1.17, 'USD': 1.27, 'AED': 4.66 },
                'USD': { 'INR': 83.12, 'EUR': 0.92, 'GBP': 0.79, 'AED': 3.67 },
                'EUR': { 'INR': 90.45, 'USD': 1.09, 'GBP': 0.85, 'AED': 4.00 }
            };
            if (mockRates[sendCurrency.code]?.[receiveCurrency.code]) {
                setExchangeRate(mockRates[sendCurrency.code][receiveCurrency.code]);
            }
        } finally {
            setIsFetching(false);
        }
    }, [sendCurrency.code, receiveCurrency.code]);

    useEffect(() => {
        fetchRate();
    }, [fetchRate]);

    return { exchangeRate, isFetching, error, isUsingMock, lastUpdated, refetch: fetchRate };
}

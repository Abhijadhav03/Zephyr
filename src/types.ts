export type Currency = {
    code: string;
    name: string;
    flag: string;
    country: string;
};
export type TransferData = {
    sendAmount: number;
    sendCurrency: Currency;
    receiveCurrency: Currency;
    exchangeRate: number;
    fee: number;
    recipientName: string;
    bankName: string;
    accountNumber: string;
    ifscCode: string;
    reason: string;
    paymentMethod: string;
};

export const SUPPORTED_CURRENCIES: Currency[] = [
    { code: 'GBP', name: 'British Pound', flag: 'https://flagcdn.com/w80/gb.png', country: 'United Kingdom' },
    { code: 'INR', name: 'Indian Rupee', flag: 'https://flagcdn.com/w80/in.png', country: 'India' },
    { code: 'USD', name: 'US Dollar', flag: 'https://flagcdn.com/w80/us.png', country: 'United States' },
    { code: 'EUR', name: 'Euro', flag: 'https://flagcdn.com/w80/eu.png', country: 'European Union' },
    { code: 'AUD', name: 'Australian Dollar', flag: 'https://flagcdn.com/w80/au.png', country: 'Australia' },
    { code: 'JPY', name: 'Japanese Yen', flag: 'https://flagcdn.com/w80/jp.png', country: 'Japan' },
    { code: 'AED', name: 'UAE Dirham', flag: 'https://flagcdn.com/w80/ae.png', country: 'United Arab Emirates' },
    { code: 'CAD', name: 'Canadian Dollar', flag: 'https://flagcdn.com/w80/ca.png', country: 'Canada' },
    { code: 'SGD', name: 'Singapore Dollar', flag: 'https://flagcdn.com/w80/sg.png', country: 'Singapore' },
];
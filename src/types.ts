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
export type TransferStatus = 'Completed' | 'Processing' | 'Pending' | 'Failed';

export type TransferRecord = {
    id: string;
    date: string;
    amount: number;
    currency: string;
    recipient: string;
    status: TransferStatus;
    receiveAmount: number;
    receiveCurrency: string;
};

export type CurrencyPair = {
    id: string;
    pair: string;
    rate: number;
    change: string;
    status: string;
    description: string;
};

export const MOCK_HISTORY: TransferRecord[] = [
    {
        id: 'SL-9823-XJ21',
        date: '2024-03-28T14:30:00Z',
        amount: 1200,
        currency: 'GBP',
        recipient: 'Aditi Sharma',
        status: 'Completed',
        receiveAmount: 126450.20,
        receiveCurrency: 'INR'
    },
    {
        id: 'SL-7712-BK99',
        date: '2024-03-25T09:15:00Z',
        amount: 500,
        currency: 'USD',
        recipient: 'Rahul Verma',
        status: 'Completed',
        receiveAmount: 41560.00,
        receiveCurrency: 'INR'
    },
    {
        id: 'SL-4432-LP05',
        date: '2024-03-20T18:45:00Z',
        amount: 2500,
        currency: 'EUR',
        recipient: 'Priya Patel',
        status: 'Processing',
        receiveAmount: 226125.00,
        receiveCurrency: 'INR'
    }
];

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


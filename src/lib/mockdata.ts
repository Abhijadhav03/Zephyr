import type { TransferRecord, CurrencyPair } from '../types';

export interface UserProfile {
    id: string;
    name: string;
    email: string;
    tier: string;
    balance: Record<string, number>;
    avatar: string;
}

export interface MarketUpdate {
    id: string;
    title: string;
    content: string;
    author: string;
    date: string;
    category: string;
    image: string;
}

export const INITIAL_USER_PROFILES: UserProfile[] = [
    {
        id: "1",
        name: "Abhishek Jadhav",
        email: "jadhavabhishek53366@gmail.com",
        tier: "Institutional",
        balance: {
            "GBP": 25000,
            "INR": 150000
        },
        avatar: "https://picsum.photos/seed/abhishek/200/200"
    },
    {
        id: "2",
        name: "Sarah Chen",
        email: "sarah.chen@example.com",
        tier: "Premium",
        balance: {
            "USD": 12000,
            "EUR": 8500
        },
        avatar: "https://picsum.photos/seed/sarah/200/200"
    }
];

export const INITIAL_MARKET_UPDATES: MarketUpdate[] = [
    {
        id: "1",
        title: "GBP/INR Hits 6-Month High",
        content: "The British Pound has surged against the Indian Rupee following positive economic data from the UK. Institutional investors are increasing their positions.",
        author: "Market Desk",
        date: "2026-04-01T08:00:00Z",
        category: "Market News",
        image: "https://picsum.photos/seed/market/800/400"
    },
    {
        id: "2",
        title: "RBI Maintains Interest Rates",
        content: "The Reserve Bank of India has kept interest rates steady, citing stable inflation. This move was widely expected by the market.",
        author: "Economic Analyst",
        date: "2026-03-31T14:30:00Z",
        category: "Policy",
        image: "https://picsum.photos/seed/rbi/800/400"
    }
];

export const INITIAL_CURRENCY_PAIRS: CurrencyPair[] = [
    {
        id: "1",
        pair: "GBP/INR",
        rate: 105.42,
        change: "+0.42%",
        status: "High Liquidity",
        description: "Standard institutional transfer pair with T+0 settlement available."
    },
    {
        id: "2",
        pair: "EUR/INR",
        rate: 89.15,
        change: "-0.12%",
        status: "Stable",
        description: "Euro to Rupee transfers with competitive mid-market rates."
    },
    {
        id: "3",
        pair: "USD/INR",
        rate: 83.24,
        change: "+0.05%",
        status: "High Volume",
        description: "Most traded pair with 24/7 liquidity and instant settlement."
    }
];

export const INITIAL_TRANSFERS: TransferRecord[] = [
    {
        id: "SL-9823-XJ21",
        date: "2026-03-28T14:30:00Z",
        amount: 1200,
        currency: "GBP",
        recipient: "Aditi Sharma",
        status: "Completed",
        receiveAmount: 126450.2,
        receiveCurrency: "INR"
    },
    {
        id: "SL-7712-BK99",
        date: "2026-03-25T09:15:00Z",
        amount: 500,
        currency: "USD",
        recipient: "Rahul Verma",
        status: "Completed",
        receiveAmount: 41560,
        receiveCurrency: "INR"
    },
    {
        id: "SL-4432-LP05",
        date: "2026-03-20T18:45:00Z",
        amount: 2500,
        currency: "EUR",
        recipient: "Priya Patel",
        status: "Processing",
        receiveAmount: 226125,
        receiveCurrency: "INR"
    }
];

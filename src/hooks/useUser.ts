import { useState, useEffect } from 'react';

export interface UserProfile {
    id: string;
    name: string;
    email: string;
    tier: string;
    balance: Record<string, number>;
    avatar: string;
}

export function useUser(userId: string = "1") {
    const [user, setUser] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch(`https://jsonplaceholder.typicode.com/users${userId}`);
                if (!response.ok) throw new Error('User not found');
                const data = await response.json();
                setUser(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An error occurred');
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [userId]);

    return { user, loading, error };
}

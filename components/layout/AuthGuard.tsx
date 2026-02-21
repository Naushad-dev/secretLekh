'use client';

import { useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { Spinner } from '@/components/ui/Spinner';

export function AuthGuard({ children }: { children: ReactNode }) {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !user) {
            router.replace('/login');
        }
        if (user) {
            user.getIdToken().then((token) => {
                document.cookie = `authToken=${token}; path=/; max-age=3600; SameSite=Strict`;
            });
        }
    }, [user, loading, router]);

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-950 flex items-center justify-center">
                <Spinner size="lg" />
            </div>
        );
    }

    if (!user) return null;

    return <>{children}</>;
}

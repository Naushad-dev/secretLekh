'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { LoginForm } from '@/components/auth/LoginForm';
import { GoogleSignInButton } from '@/components/auth/GoogleSignInButton';
import { Card, CardContent } from '@/components/ui/Card';
import { Spinner } from '@/components/ui/Spinner';

export default function LoginPage() {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && user) router.replace('/dashboard');
    }, [user, loading, router]);

    if (loading) {
        return (
            <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-gray-950">
                <Spinner size="lg" />
            </div>
        );
    }

    return (
        <div className="min-h-[calc(100vh-64px)] bg-gray-950 flex items-center justify-center px-4 py-16">
            <div className="w-full max-w-md space-y-6">
                <div className="text-center space-y-2">
                    <h1 className="text-3xl font-black text-white">Welcome back</h1>
                    <p className="text-gray-400 text-sm">Sign in to manage your secret notes.</p>
                </div>

                <Card>
                    <CardContent className="space-y-5">
                        <LoginForm />

                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-800" />
                            </div>
                            <div className="relative flex justify-center text-xs">
                                <span className="bg-gray-900 px-3 text-gray-500">or continue with</span>
                            </div>
                        </div>

                        <GoogleSignInButton />
                    </CardContent>
                </Card>

                <p className="text-center text-sm text-gray-500">
                    Don&apos;t have an account?{' '}
                    <Link href="/register" className="text-violet-400 hover:text-violet-300 font-medium transition-colors">
                        Create one free
                    </Link>
                </p>
            </div>
        </div>
    );
}

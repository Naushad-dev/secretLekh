'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { signInWithEmail } from '@/lib/firebase/auth';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { UI_CONFIG } from '@/lib/config/ui';

export function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const { auth } = UI_CONFIG;

    async function handleSubmit(e: FormEvent) {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            const cred = await signInWithEmail(email, password);
            const token = await cred.user.getIdToken();
            document.cookie = `authToken=${token}; path=/; max-age=3600; SameSite=Strict`;
            router.push('/dashboard');
        } catch (err: any) {
            const code = err.code || '';
            if (code === 'auth/user-not-found' || code === 'auth/wrong-password' || code === 'auth/invalid-credential') {
                setError('Invalid email or password. Please try again.');
            } else if (code === 'auth/too-many-requests') {
                setError('Too many failed attempts. Please try again later.');
            } else {
                setError('Something went wrong. Please check your connection.');
            }
        } finally {
            setLoading(false);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <Input
                label={auth.login.emailLabel}
                type="email"
                id="email"
                placeholder={auth.login.emailPlaceholder}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
            />
            <Input
                label={auth.login.passLabel}
                type="password"
                id="password"
                placeholder={auth.login.passPlaceholder}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
            />
            {error && (
                <p className="text-sm text-red-400 bg-red-900/20 border border-red-800 rounded-lg px-3 py-2">
                    {error}
                </p>
            )}
            <Button
                type="submit"
                variant="primary"
                size="lg"
                loading={loading}
                disabled={loading}
                className="w-full h-11 rounded-xl text-sm font-bold shadow-lg shadow-violet-600/20 active:scale-[0.98] transition-all"
            >
                {loading ? auth.login.loading : auth.login.button}
            </Button>
        </form>
    );
}

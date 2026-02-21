'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { signUpWithEmail } from '@/lib/firebase/auth';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { UI_CONFIG } from '@/lib/config/ui';

export function RegisterForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const { auth } = UI_CONFIG;

    async function handleSubmit(e: FormEvent) {
        e.preventDefault();
        setError('');
        if (password !== confirm) {
            setError(auth.register.errorMatch);
            return;
        }
        if (password.length < 6) {
            setError(auth.register.errorLength);
            return;
        }
        setLoading(true);
        try {
            const cred = await signUpWithEmail(email, password);
            const token = await cred.user.getIdToken();
            document.cookie = `authToken=${token}; path=/; max-age=3600; SameSite=Strict`;
            router.push('/dashboard');
        } catch (err: any) {
            const code = err.code || '';
            if (code === 'auth/email-already-in-use') {
                setError('An account with this email already exists.');
            } else if (code === 'auth/invalid-email') {
                setError('Please enter a valid email address.');
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
                label={auth.register.emailLabel}
                type="email"
                id="reg-email"
                placeholder={auth.register.emailPlaceholder}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
            />
            <Input
                label={auth.register.passLabel}
                type="password"
                id="reg-password"
                placeholder={auth.register.passPlaceholder}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="new-password"
            />
            <Input
                label={auth.register.confirmLabel}
                type="password"
                id="reg-confirm"
                placeholder={auth.register.confirmPlaceholder}
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                required
                autoComplete="new-password"
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
                {loading ? auth.register.loading : auth.register.button}
            </Button>
        </form>
    );
}

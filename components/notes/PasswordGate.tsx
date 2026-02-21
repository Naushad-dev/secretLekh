'use client';

import { useState, FormEvent } from 'react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { UI_CONFIG } from '@/lib/config/ui';

interface PasswordGateProps {
    onUnlock: (password: string) => Promise<void>;
    unlocking: boolean;
    error: string | null;
}

export function PasswordGate({ onUnlock, unlocking, error }: PasswordGateProps) {
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const { passwordGate } = UI_CONFIG;

    async function handleSubmit(e: FormEvent) {
        e.preventDefault();
        if (!password.trim()) return;
        await onUnlock(password);
    }

    return (
        <div className="space-y-6">
            <div className="text-center space-y-3">
                <div className="flex justify-center">{passwordGate.icons.lock}</div>
                <h2 className="text-xl font-bold text-white">{passwordGate.title}</h2>
                <p className="text-sm text-gray-400">{passwordGate.subtitle}</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative">
                    <Input
                        label={passwordGate.inputLabel}
                        type={showPassword ? 'text' : 'password'}
                        id="unlock-password"
                        placeholder={passwordGate.inputPlaceholder}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        autoFocus
                        error={error || undefined}
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword((s) => !s)}
                        className="absolute right-3 top-8 text-gray-500 hover:text-gray-300 transition-colors duration-150 p-1 rounded-lg hover:bg-gray-800"
                        tabIndex={-1}
                    >
                        {showPassword ? passwordGate.icons.hide : passwordGate.icons.show}
                    </button>
                </div>

                <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    loading={unlocking}
                    disabled={!password.trim() || unlocking}
                    className="w-full h-12 rounded-xl text-base font-bold transition-all active:scale-[0.98] shadow-lg shadow-violet-600/20"
                >
                    {unlocking ? passwordGate.verifying : passwordGate.buttonLabel}
                </Button>
            </form>
        </div>
    );
}

'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { UI_CONFIG } from '@/lib/config/ui';

interface ShareCardProps {
    result: {
        noteId: string;
        url: string;
        password: string;
    };
    onReset: () => void;
}

function CopyField({ label, value }: { label: string; value: string }) {
    const [copied, setCopied] = useState(false);
    const { shareCard } = UI_CONFIG;

    async function handleCopy() {
        await navigator.clipboard.writeText(value);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    }

    return (
        <div className="space-y-1.5">
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{label}</label>
            <div className="flex gap-2">
                <input
                    readOnly
                    value={value}
                    className="flex-1 rounded-xl bg-gray-800 border border-gray-700 px-3 py-2.5 text-sm text-gray-200 font-mono focus:outline-none cursor-text select-all"
                    onClick={(e: any) => e.target.select()}
                />
                <button
                    type="button"
                    onClick={handleCopy}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 whitespace-nowrap flex items-center gap-2 ${copied
                        ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/20'
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600 active:scale-95'
                        }`}
                >
                    {copied ? `✅ ${shareCard.copied}` : <>{shareCard.icons.copy} {shareCard.copy}</>}
                </button>
            </div>
        </div>
    );
}

export function ShareCard({ result, onReset }: ShareCardProps) {
    const { url, password } = result;
    const { shareCard } = UI_CONFIG;

    return (
        <div className="space-y-6 animate-in fade-in zoom-in duration-300">
            <div className="text-center space-y-3">
                <div className="mb-2">{shareCard.icons.success}</div>
                <h3 className="text-xl font-bold text-white tracking-tight">{shareCard.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed px-4">
                    {shareCard.subtitle}
                </p>
            </div>

            <div className="rounded-2xl bg-gray-950/60 border border-gray-800 p-5 space-y-5">
                <CopyField label={shareCard.urlLabel} value={url} />
                <CopyField label={shareCard.passLabel} value={password} />
            </div>

            <div className="flex gap-3 text-xs text-amber-100 bg-amber-950/20 border border-amber-900/40 rounded-xl px-4 py-3">
                {shareCard.icons.warning}
                <p className="leading-snug font-medium">{shareCard.warning}</p>
            </div>

            <Button
                variant="secondary"
                size="lg"
                onClick={onReset}
                className="w-full h-12 rounded-xl text-sm font-bold gap-2 bg-gray-800 hover:bg-gray-700 transition-all active:scale-[0.98]"
            >
                {shareCard.icons.plus} {shareCard.createAnother}
            </Button>
        </div>
    );
}

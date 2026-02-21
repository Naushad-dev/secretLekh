'use client';

import { useState, FormEvent } from 'react';
import { useCreateNote } from '@/hooks/useCreateNote';
import { Button } from '@/components/ui/Button';
import { ShareCard } from './ShareCard';
import { UI_CONFIG } from '@/lib/config/ui';

const MAX_CHARS = 500;
const EXPIRY_OPTIONS = [
    { label: 'No expiry', value: '' },
    { label: '1 hour', value: '1' },
    { label: '24 hours', value: '24' },
    { label: '7 days', value: '168' },
];

interface NoteFormProps {
    onNoteCreated?: () => void;
}

export function NoteForm({ onNoteCreated }: NoteFormProps) {
    const [content, setContent] = useState('');
    const [expiresIn, setExpiresIn] = useState('');
    const { createNote, loading, error, result, setResult } = useCreateNote();
    const { noteForm } = UI_CONFIG;

    const charCount = content.length;
    const isOverLimit = charCount > MAX_CHARS;
    const canSubmit = content.trim().length > 0 && !isOverLimit && !loading;

    async function handleSubmit(e: FormEvent) {
        e.preventDefault();
        if (!canSubmit) return;
        const success = await createNote(content, expiresIn ? parseInt(expiresIn) : null);
        if (success) {
            onNoteCreated?.();
        }
    }

    if (result) {
        return (
            <ShareCard
                result={result}
                onReset={() => {
                    setResult(null);
                    setContent('');
                    setExpiresIn('');
                }}
            />
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
                <div className="flex items-center justify-between">
                    <label htmlFor="note-content" className="text-sm font-medium text-gray-300">
                        {noteForm.label}
                    </label>
                    <span
                        className={`text-xs font-mono font-semibold tabular-nums ${isOverLimit
                            ? 'text-red-400'
                            : charCount > 450
                                ? 'text-amber-400'
                                : 'text-gray-500'
                            }`}
                    >
                        {charCount} / {MAX_CHARS}
                    </span>
                </div>
                <textarea
                    id="note-content"
                    rows={6}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder={noteForm.placeholder}
                    className={`w-full rounded-xl bg-gray-900 border px-4 py-3 text-gray-100 placeholder-gray-600 text-sm resize-none transition-all duration-200 focus:outline-none focus:ring-2 ${isOverLimit
                        ? 'border-red-500 focus:ring-red-500'
                        : 'border-gray-700 hover:border-gray-600 focus:ring-violet-500 focus:border-violet-500'
                        }`}
                />
                {isOverLimit && (
                    <p className="text-xs text-red-400">{noteForm.errorLimit(MAX_CHARS)}</p>
                )}
            </div>

            <div className="space-y-1.5">
                <label htmlFor="expiry" className="text-sm font-medium text-gray-300">
                    {noteForm.expiryLabel}
                </label>
                <select
                    id="expiry"
                    value={expiresIn}
                    onChange={(e) => setExpiresIn(e.target.value)}
                    className="w-full rounded-xl bg-gray-900 border border-gray-700 hover:border-gray-600 px-4 py-2.5 text-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-all duration-200"
                >
                    {EXPIRY_OPTIONS.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                            {opt.label}
                        </option>
                    ))}
                </select>
            </div>

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
                disabled={!canSubmit}
                className="w-full h-12 rounded-xl text-base font-bold transition-all active:scale-[0.98] shadow-lg shadow-violet-600/20 flex items-center justify-center gap-2"
            >
                {loading ? noteForm.creating : (
                    <span className="flex items-center gap-2">
                        {noteForm.icons.create} {noteForm.createButton}
                    </span>
                )}
            </Button>
        </form>
    );
}

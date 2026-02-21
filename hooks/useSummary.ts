'use client';
import { useState } from 'react';

export function useSummary() {
    const [summary, setSummary] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function summarize(noteId: string, password: string) {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch(`/api/notes/${noteId}/summarize`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || 'Failed to generate summary');
            setSummary(data.summary);
            return data.summary;
        } catch (err: any) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    }

    return { summarize, summary, loading, error };
}

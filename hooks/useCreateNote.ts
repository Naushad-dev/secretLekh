'use client';
import { useState } from 'react';
import { getCurrentUserToken } from '@/lib/firebase/auth';

interface CreateNoteResult {
    noteId: string;
    url: string;
    password: string;
}

export function useCreateNote() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [result, setResult] = useState<CreateNoteResult | null>(null);

    async function createNote(content: string, expiresIn: number | null) {
        setLoading(true);
        setError(null);
        try {
            const token = await getCurrentUserToken();
            const res = await fetch('/api/notes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ content, expiresIn }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || 'Failed to create note');


            setResult(data);
            return data;
        } catch (err: any) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    }

    return { createNote, loading, error, result, setResult };
}

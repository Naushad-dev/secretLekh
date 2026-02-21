'use client';
import { useState, useEffect } from 'react';

type NoteStatus = 'loading' | 'not-found' | 'expired' | 'locked' | 'unlocked';

interface NoteMeta {
    id: string;
    createdAt: any;
    expiresAt: any;
}

export function useNote(noteId: string) {
    const [note, setNote] = useState<NoteMeta | null>(null);
    const [status, setStatus] = useState<NoteStatus>('loading');
    const [unlocking, setUnlocking] = useState(false);
    const [unlockError, setUnlockError] = useState<string | null>(null);
    const [unlockedContent, setUnlockedContent] = useState<string | null>(null);

    useEffect(() => {
        if (!noteId) return;
        async function fetchNote() {
            try {
                const res = await fetch(`/api/notes/${noteId}/meta`);
                if (res.status === 404) { setStatus('not-found'); return; }
                if (res.status === 410) { setStatus('expired'); return; }
                const data = await res.json();
                setNote(data);
                setStatus('locked');
            } catch {
                setStatus('not-found');
            }
        }
        fetchNote();
    }, [noteId]);

    async function unlockNote(password: string) {
        setUnlocking(true);
        setUnlockError(null);
        try {
            const res = await fetch(`/api/notes/${noteId}/unlock`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || 'Incorrect password');
            setUnlockedContent(data.content);
            setStatus('unlocked');
            return data.content;
        } catch (err: any) {
            setUnlockError(err.message);
            throw err;
        } finally {
            setUnlocking(false);
        }
    }

    return { note, status, unlockNote, unlocking, unlockError, unlockedContent };
}

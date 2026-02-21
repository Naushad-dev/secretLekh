import {
    doc,
    setDoc,
    getDoc,
    getDocs,
    collection,
    query,
    where,
    updateDoc,
    deleteDoc,
    increment,
    DocumentData,
} from 'firebase/firestore';
import { db } from './config';

export interface NoteData {
    id?: string;
    userId: string;
    content: string;
    password?: string;
    createdAt: any;
    expiresAt: any;
    viewCount: number;
}

export async function createNote(noteId: string, data: NoteData): Promise<void> {
    const ref = doc(db, 'notes', noteId);
    await setDoc(ref, data);
}

export async function getNoteById(noteId: string): Promise<NoteData | null> {
    const ref = doc(db, 'notes', noteId);
    const snap = await getDoc(ref);
    if (!snap.exists()) return null;
    return { id: snap.id, ...snap.data() } as NoteData;
}

export async function getUserNotes(userId: string): Promise<NoteData[]> {
    try {
        const { getAuth } = await import('firebase/auth');
        const auth = getAuth();
        const user = auth.currentUser;
        if (!user) return [];

        const token = await user.getIdToken();
        const res = await fetch('/api/notes', {
            headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) throw new Error('Failed to fetch notes');
        return await res.json();
    } catch (err) {
        console.error('getUserNotes error:', err);
        return [];
    }
}

export async function incrementViewCount(noteId: string): Promise<void> {
    const ref = doc(db, 'notes', noteId);
    await updateDoc(ref, { viewCount: increment(1) });
}

export async function deleteNote(noteId: string): Promise<void> {
    const ref = doc(db, 'notes', noteId);
    await deleteDoc(ref);
}

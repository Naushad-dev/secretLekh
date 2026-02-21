import { NextResponse } from 'next/server';
import { getAdminDb } from '@/lib/firebase/admin';
import { summarizeNote } from '@/lib/aiService';



export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    try {
        const { password } = await request.json();
        if (!password) {
            return NextResponse.json({ error: 'Password is required' }, { status: 400 });
        }

        const db = getAdminDb();
        const snap = await db.collection('notes').doc(id).get();

        if (!snap.exists) {
            return NextResponse.json({ error: 'Note not found' }, { status: 404 });
        }
        const note = snap.data();

        const { decrypt } = await import('@/lib/encryption');

        // 1. Decrypt and verify password
        let decryptedPassword = '';
        try {
            decryptedPassword = decrypt(note?.password || '');
        } catch (err) {
            return NextResponse.json({ error: 'Incorrect password' }, { status: 401 });
        }

        if (decryptedPassword !== password) {
            return NextResponse.json({ error: 'Incorrect password' }, { status: 401 });
        }

        // 2. Decrypt content
        let decryptedContent = '';
        try {
            decryptedContent = decrypt(note?.content || '');
        } catch (err) {
            return NextResponse.json({ error: 'Could not decrypt note content' }, { status: 500 });
        }

        const summary = await summarizeNote(decryptedContent);
        return NextResponse.json({ summary }, { status: 200 });
    } catch (err) {
        console.error('POST /api/notes/[id]/summarize error:', err);
        return NextResponse.json({ error: 'Failed to generate summary' }, { status: 500 });
    }
}

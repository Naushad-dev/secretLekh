import { NextResponse } from 'next/server';
import { getAdminDb } from '@/lib/firebase/admin';



export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    try {
        const db = getAdminDb();
        const snap = await db.collection('notes').doc(id).get();
        if (!snap.exists) {
            return NextResponse.json({ error: 'Note not found' }, { status: 404 });
        }
        const note = snap.data();
        if (note?.expiresAt) {
            const exp = note.expiresAt.toDate();
            if (exp < new Date()) {
                return NextResponse.json({ error: 'This note has expired' }, { status: 410 });
            }
        }
        return NextResponse.json({
            id: snap.id,
            createdAt: note?.createdAt?.toDate()?.toISOString(),
            expiresAt: note?.expiresAt?.toDate()?.toISOString(),
        });
    } catch (err) {
        console.error('GET /api/notes/[id]/meta error:', err);
        return NextResponse.json({ error: 'Something went wrong.' }, { status: 500 });
    }
}

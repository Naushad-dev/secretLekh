import { NextResponse } from 'next/server';
import { getAdminAuth, getAdminDb } from '@/lib/firebase/admin';


export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    try {
        const authHeader = request.headers.get('Authorization');
        if (!authHeader?.startsWith('Bearer ')) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }
        const token = authHeader.split('Bearer ')[1];

        let uid;
        try {
            const decoded = await getAdminAuth().verifyIdToken(token);
            uid = decoded.uid;
        } catch {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const db = getAdminDb();
        const snap = await db.collection('notes').doc(id).get();

        if (!snap.exists) {
            return NextResponse.json({ error: 'Note not found' }, { status: 404 });
        }
        if (snap.data()?.userId !== uid) {
            return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
        }

        await db.collection('notes').doc(id).delete();
        return NextResponse.json({ success: true }, { status: 200 });
    } catch (err) {
        console.error('DELETE /api/notes/[id]/delete error:', err);
        return NextResponse.json({ error: 'Something went wrong.' }, { status: 500 });
    }
}

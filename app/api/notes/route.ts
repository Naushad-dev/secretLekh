import { NextResponse } from 'next/server';
import { getAdminAuth, getAdminDb } from '@/lib/firebase/admin';
import { generateNoteId, generatePassword } from '@/lib/generateId';
import { Timestamp } from 'firebase-admin/firestore';



export async function POST(request: Request) {
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

        const body = await request.json();
        const { content, expiresIn } = body;

        if (!content || content.trim().length === 0) {
            return NextResponse.json({ error: 'Note cannot be empty' }, { status: 400 });
        }
        //500 charachter limit 
        if (content.length > 500) {
            return NextResponse.json({ error: 'Note must be under 500 characters' }, { status: 400 });
        }

        const noteId = generateNoteId();
        const plainPassword = generatePassword();

        // 1. Encrypt both content and the plain password for server-side security
        // Note: We use the same encryption for the password as the content.
        const { encrypt } = await import('@/lib/encryption');
        const encryptedContent = encrypt(content);
        const encryptedPassword = encrypt(plainPassword);

        const now = Timestamp.now();
        let expiresAt = null;
        if (expiresIn) {
            const expiryMs = parseInt(expiresIn) * 60 * 60 * 1000;
            expiresAt = Timestamp.fromDate(new Date(Date.now() + expiryMs));
        }

        const db = getAdminDb();
        // Store AES encrypted password
        await db.collection('notes').doc(noteId).set({
            userId: uid,
            content: encryptedContent,
            password: encryptedPassword,
            createdAt: now,
            expiresAt,
            viewCount: 0,
        });

        const url = `${process.env.NEXT_PUBLIC_APP_URL}/note/${noteId}`;
        return NextResponse.json({ noteId, url, password: plainPassword }, { status: 200 });
    } catch (err) {
        console.error('POST /api/notes error:', err);
        return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 });
    }
}

export async function GET(request: Request) {
    try {
        const authHeader = request.headers.get('Authorization');
        if (!authHeader?.startsWith('Bearer ')) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const token = authHeader.split('Bearer ')[1];
        const decodedToken = await getAdminAuth().verifyIdToken(token);
        const uid = decodedToken.uid;

        const db = getAdminDb();
        const snap = await db.collection('notes')
            .where('userId', '==', uid)
            .orderBy('createdAt', 'desc')
            .get();

        const { decrypt } = await import('@/lib/encryption');

        const notes = snap.docs.map(doc => {
            const data = doc.data();
            let decryptedContent = '';
            let decryptedPassword = '';

            // 1. Decrypt Content
            try {
                decryptedContent = decrypt(data.content || '');
            } catch (err) {
                // If decryption fails, we return an empty string/placeholder
                // as we no longer support plain-text legacy notes.
                decryptedContent = '[Encrypted Content]';
                console.log("Error while decrypting content", err)
            }

            // 2. Decrypt Password (for creator display)
            try {
                decryptedPassword = decrypt(data.password || '');
            } catch (err) {
                // If it's a hash or malformed, we keep it empty.
                decryptedPassword = '';
                console.log("Error while decrypting password", err)
            }

            return {
                id: doc.id,
                userId: data.userId,
                content: decryptedContent,
                password: decryptedPassword,
                createdAt: data.createdAt?.toDate?.() || data.createdAt,
                expiresAt: data.expiresAt?.toDate?.() || data.expiresAt,
                viewCount: data.viewCount || 0,
            };
        });

        return NextResponse.json(notes);
    } catch (err) {
        console.error('GET /api/notes error:', err);
        return NextResponse.json({ error: 'Failed to fetch notes' }, { status: 500 });
    }
}

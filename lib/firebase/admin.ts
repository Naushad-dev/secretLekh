import { getApps, initializeApp, cert, getApp, App } from 'firebase-admin/app';
import { getAuth, Auth } from 'firebase-admin/auth';
import { getFirestore, Firestore } from 'firebase-admin/firestore';

function initAdmin(): App {
    if (getApps().length > 0) return getApp();

    return initializeApp({
        credential: cert({
            projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
            clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
            privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
        }),
    });
}

export function getAdminAuth(): Auth {
    initAdmin();
    return getAuth();
}

export function getAdminDb(): Firestore {
    initAdmin();
    return getFirestore();
}

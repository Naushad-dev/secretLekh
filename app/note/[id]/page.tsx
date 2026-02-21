'use client';

import { useParams } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';
import { useNote } from '@/hooks/useNote';
import { PasswordGate } from '@/components/notes/PasswordGate';
import { NoteDisplay } from '@/components/notes/NoteDisplay';
import { Card, CardContent } from '@/components/ui/Card';
import { Spinner } from '@/components/ui/Spinner';

export default function NotePage() {
    const { id } = useParams();
    const noteId = Array.isArray(id) ? id[0] : id;
    const { status, unlockNote, unlocking, unlockError, unlockedContent } = useNote(noteId || '');
    const [password, setPassword] = useState('');

    async function handleUnlock(pw: string) {
        setPassword(pw);
        await unlockNote(pw);
    }

    if (!noteId) return null;

    return (
        <div className="min-h-[calc(100vh-64px)] bg-gray-950 flex items-center justify-center px-4 py-16">
            <div className="w-full max-w-lg">
                {status === 'loading' && (
                    <div className="flex justify-center">
                        <Spinner size="lg" />
                    </div>
                )}

                {status === 'not-found' && (
                    <Card>
                        <CardContent className="text-center space-y-4 py-12">
                            <p className="text-5xl">🔍</p>
                            <h2 className="text-2xl font-bold text-white">Note not found</h2>
                            <p className="text-gray-400 text-sm">
                                This note doesn&apos;t exist or may have been deleted.
                            </p>
                            <Link href="/" className="inline-block text-violet-400 hover:text-violet-300 text-sm font-medium transition-colors">
                                ← Back to home
                            </Link>
                        </CardContent>
                    </Card>
                )}

                {status === 'expired' && (
                    <Card>
                        <CardContent className="text-center space-y-4 py-12">
                            <p className="text-5xl">⏰</p>
                            <h2 className="text-2xl font-bold text-white">This note has expired</h2>
                            <p className="text-gray-400 text-sm">
                                The creator set an expiry time and this note is no longer accessible.
                            </p>
                            <Link href="/" className="inline-block text-violet-400 hover:text-violet-300 text-sm font-medium transition-colors">
                                ← Back to home
                            </Link>
                        </CardContent>
                    </Card>
                )}

                {status === 'locked' && (
                    <Card>
                        <CardContent className="py-8">
                            <PasswordGate
                                onUnlock={handleUnlock}
                                unlocking={unlocking}
                                error={unlockError}
                            />
                        </CardContent>
                    </Card>
                )}

                {status === 'unlocked' && (
                    <Card>
                        <CardContent className="py-6">
                            <NoteDisplay noteId={noteId} content={unlockedContent} password={password} />
                        </CardContent>
                    </Card>
                )}

                {(status === 'locked' || status === 'unlocked') && (
                    <p className="text-center text-xs text-gray-600 mt-6">
                        Powered by{' '}
                        <Link href="/" className="text-violet-500 hover:text-violet-400 transition-colors">
                            SecretLekh
                        </Link>
                    </p>
                )}
            </div>
        </div>
    );
}

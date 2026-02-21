'use client';

import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { getUserNotes, NoteData } from '@/lib/firebase/firestore';
import { NoteForm } from '@/components/notes/NoteForm';
import { NoteCard } from '@/components/notes/NoteCard';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import { Spinner } from '@/components/ui/Spinner';
import { UI_CONFIG } from '@/lib/config/ui';

export default function DashboardPage() {
    const { user } = useAuth();
    const [notes, setNotes] = useState<NoteData[]>([]);
    const [loadingNotes, setLoadingNotes] = useState(true);
    const { dashboard } = UI_CONFIG;

    const fetchNotes = useCallback(async () => {
        if (!user) return;
        setLoadingNotes(true);
        try {
            const data = await getUserNotes(user.uid);
            data.sort((a, b) => {
                const aTime = a.createdAt?.toDate?.() ?? new Date(0);
                const bTime = b.createdAt?.toDate?.() ?? new Date(0);
                return bTime.getTime() - aTime.getTime();
            });
            setNotes(data);
        } catch (err) {
            console.error('Failed to fetch notes:', err);
        } finally {
            setLoadingNotes(false);
        }
    }, [user]);

    useEffect(() => {
        fetchNotes();
    }, [fetchNotes]);

    function handleNoteDeleted(deletedId: string) {
        setNotes((prev) => prev.filter((n) => n.id !== deletedId));
    }

    return (
        <div className="min-h-[calc(100vh-64px)] bg-gray-950 px-4 sm:px-6 py-10">
            <div className="max-w-6xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-black text-white mb-1">{dashboard.title}</h1>
                    <p className="text-gray-400 text-sm">
                        {dashboard.subtitle(user?.email?.split('@')[0] || '')}
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                    <div className="lg:col-span-2">
                        <Card>
                            <CardHeader>
                                <h2 className="font-bold text-white flex items-center gap-2">
                                    {dashboard.newNote.icon} {dashboard.newNote.title}
                                </h2>
                            </CardHeader>
                            <CardContent>
                                <NoteForm onNoteCreated={fetchNotes} />
                            </CardContent>
                        </Card>
                    </div>

                    <div className="lg:col-span-3 space-y-4">
                        <div className="flex items-center justify-between">
                            <h2 className="font-bold text-white">{dashboard.list.title}</h2>
                            <span className="text-xs text-gray-500 font-medium">
                                {notes.length} {notes.length === 1 ? 'note' : 'notes'}
                            </span>
                        </div>

                        {loadingNotes ? (
                            <div className="flex justify-center py-16">
                                <Spinner size="lg" />
                            </div>
                        ) : notes.length === 0 ? (
                            <div className="rounded-2xl border border-dashed border-gray-800 bg-gray-900/40 py-16 text-center">
                                <div className="mb-3">{dashboard.list.empty.icon}</div>
                                <p className="text-gray-200 font-bold text-lg">{dashboard.list.empty.title}</p>
                                <p className="text-gray-500 text-sm mt-1">{dashboard.list.empty.subtitle}</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {notes.map((note) => (
                                    <NoteCard key={note.id} note={note} onDeleted={handleNoteDeleted} />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

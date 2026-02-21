'use client';

import React, { useState } from 'react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { getCurrentUserToken } from '@/lib/firebase/auth';
import { UI_CONFIG } from '@/lib/config/ui';

interface NoteCardProps {
    note: any;
    onDeleted: (id: string) => void;
}

function formatDate(ts: any) {
    if (!ts) return '';
    const date = ts.toDate ? ts.toDate() : new Date(ts);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function isExpired(note: any) {
    if (!note.expiresAt) return false;
    const exp = note.expiresAt.toDate ? note.expiresAt.toDate() : new Date(note.expiresAt);
    return exp < new Date();
}

export function NoteCard({ note, onDeleted }: NoteCardProps) {
    const [deleting, setDeleting] = useState(false);
    const [linkCopied, setLinkCopied] = useState(false);
    const [passwordCopied, setPasswordCopied] = useState(false);

    const { noteCard } = UI_CONFIG;
    const expired = isExpired(note);
    const shareUrl = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/note/${note.id}`;

    async function handleDelete() {
        if (!window.confirm('Are you sure you want to delete this note? This cannot be undone.')) return;
        setDeleting(true);
        try {
            const token = await getCurrentUserToken();
            const res = await fetch(`/api/notes/${note.id}/delete`, {
                method: 'DELETE',
                headers: { Authorization: `Bearer ${token}` },
            });
            if (res.ok) onDeleted(note.id);
        } catch {
            // silently fail, note persists
        } finally {
            setDeleting(false);
        }
    }

    async function handleCopyLink() {
        await navigator.clipboard.writeText(shareUrl);
        setLinkCopied(true);
        setTimeout(() => setLinkCopied(false), 2000);
    }

    async function handleCopyPassword() {
        if (!note.password) return;
        await navigator.clipboard.writeText(note.password);
        setPasswordCopied(true);
        setTimeout(() => setPasswordCopied(false), 2000);
    }

    const preview = note.content
        ? note.content.length > 60
            ? note.content.slice(0, 60) + '…'
            : note.content
        : '—';

    return (
        <div className="group rounded-2xl bg-gray-900 border border-gray-800 hover:border-gray-700 transition-all duration-300 p-6 flex flex-col gap-5 shadow-sm hover:shadow-xl hover:shadow-violet-500/5 relative overflow-hidden">
            {/* Subtle glow effect on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

            <div className="flex items-start justify-between relative z-10">
                <div className="flex flex-col gap-1.5">
                    <div className="flex items-center gap-2 text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                        <span className="flex items-center gap-1">{noteCard.icons.calendar} {formatDate(note.createdAt)}</span>
                        <span className="w-1 h-1 rounded-full bg-gray-700" />
                        <span className="flex items-center gap-1">
                            {noteCard.icons.views} {note.viewCount ?? 0} views
                        </span>
                    </div>
                    <h3 className="text-base font-bold text-gray-100 group-hover:text-white transition-colors">
                        Note <span className="text-violet-400">#{note.id.slice(-4).toUpperCase()}</span>
                    </h3>
                </div>
                <div className="flex items-center gap-2">
                    {expired ? (
                        <Badge variant="danger" className="px-2 py-0.5 rounded-full text-[10px] font-bold">{noteCard.status.expired}</Badge>
                    ) : (
                        <Badge variant="success" className="px-2 py-0.5 rounded-full text-[10px] font-bold tracking-tight">{noteCard.status.active}</Badge>
                    )}
                </div>
            </div>

            <div className="relative z-10">
                <p className="text-sm text-gray-400 leading-relaxed bg-gray-950/50 rounded-xl p-4 border border-gray-800/50 group-hover:border-violet-500/20 transition-colors font-medium min-h-[80px]">
                    {preview}
                </p>
            </div>

            <div className="flex items-center gap-3 pt-2 relative z-10">
                <Button
                    size="sm"
                    variant="secondary"
                    className="flex-1 h-10 rounded-xl text-xs font-bold gap-2 bg-gray-800 hover:bg-gray-700 border-none transition-all active:scale-95"
                    onClick={handleCopyLink}
                >
                    {linkCopied ? `✅ ${noteCard.actions.urlCopied}` : <span className="flex items-center gap-2">{noteCard.icons.link} {noteCard.actions.copyUrl}</span>}
                </Button>
                {note.password && (
                    <Button
                        size="sm"
                        variant="primary"
                        className="flex-1 h-10 rounded-xl text-xs font-bold gap-2 bg-violet-600 hover:bg-violet-500 border-none transition-all active:scale-95 shadow-lg shadow-violet-600/20"
                        onClick={handleCopyPassword}
                    >
                        {passwordCopied ? `✅ ${noteCard.actions.passCopied}` : <span className="flex items-center gap-2">{noteCard.icons.key} {noteCard.actions.copyPass}</span>}
                    </Button>
                )}

                <Button
                    variant="danger"
                    size="sm"
                    loading={deleting}
                    onClick={handleDelete}
                    className="h-10 w-10 min-w-[40px] rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white border-none active:scale-90"
                >
                    <span className="text-lg leading-none">{noteCard.icons.delete}</span>
                </Button>
            </div>
        </div>
    );
}

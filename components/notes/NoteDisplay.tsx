'use client';

import { useSummary } from '@/hooks/useSummary';
import { Button } from '@/components/ui/Button';
import { SummaryBox } from './SummaryBox';
import { UI_CONFIG } from '@/lib/config/ui';

interface NoteDisplayProps {
    noteId: string;
    content: string | null;
    password?: string;
}

export function NoteDisplay({ noteId, content, password = '' }: NoteDisplayProps) {
    const { summarize, summary, loading, error } = useSummary();
    const { noteDisplay } = UI_CONFIG;

    async function handleSummarize() {
        await summarize(noteId, password);
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-2 text-emerald-400">
                {noteDisplay.icons.unlocked}
                <span className="text-sm font-semibold">{noteDisplay.unlocked}</span>
            </div>

            <div className="rounded-xl bg-gray-900 border border-gray-700 p-5 shadow-sm">
                <p className="text-gray-100 text-sm leading-relaxed whitespace-pre-wrap">{content}</p>
            </div>

            {!summary && (
                <Button
                    variant="secondary"
                    size="md"
                    loading={loading}
                    onClick={handleSummarize}
                    className="w-full h-11 rounded-xl text-sm font-bold gap-2 bg-gray-800 hover:bg-gray-700 transition-all active:scale-[0.98]"
                >
                    {loading ? noteDisplay.summarizing : (
                        <span className="flex items-center gap-2">
                            {noteDisplay.icons.summarize} {noteDisplay.summarize}
                        </span>
                    )}
                </Button>
            )}

            {loading && !summary && (
                <p className="text-center text-sm text-gray-500 animate-pulse font-medium">
                    {noteDisplay.reading}
                </p>
            )}

            {error && (
                <p className="text-sm text-red-100 bg-red-900/10 border border-red-800/50 rounded-xl px-4 py-3 text-center font-medium">
                    {noteDisplay.error}
                </p>
            )}

            {summary && <SummaryBox summary={summary} loading={loading} />}
        </div>
    );
}

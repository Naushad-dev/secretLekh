import { Spinner } from '@/components/ui/Spinner';
import { UI_CONFIG } from '@/lib/config/ui';

interface SummaryBoxProps {
    summary: string | null;
    loading: boolean;
}

export function SummaryBox({ summary, loading }: SummaryBoxProps) {
    const { summaryBox, noteDisplay } = UI_CONFIG;

    if (loading) {
        return (
            <div className="rounded-xl bg-violet-950/40 border border-violet-800/40 p-5 flex items-center justify-center gap-3">
                <Spinner size="sm" />
                <span className="text-sm text-violet-300 font-medium">{noteDisplay.summarizing}</span>
            </div>
        );
    }

    if (!summary) return null;

    const lines = summary
        .split('\n')
        .map((l) => l.trim())
        .filter((l) => l.length > 0);

    return (
        <div className="rounded-2xl bg-violet-950/20 border border-violet-800/20 p-5 space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-500">
            <div className="flex items-center gap-2">
                {summaryBox.icons.sparkles}
                <h3 className="text-xs font-bold text-violet-300 uppercase tracking-widest">{summaryBox.title}</h3>
            </div>
            <ul className="space-y-3">
                {lines.map((line, i) => {
                    const cleanLine = line.replace(/^[•\-\*]\s*/, '');
                    return (
                        <li key={i} className="flex items-start gap-3 text-sm text-gray-300 leading-relaxed group">
                            <span className="text-violet-500 mt-1 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-violet-500 group-hover:scale-125 transition-transform" />
                            <span>{cleanLine}</span>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

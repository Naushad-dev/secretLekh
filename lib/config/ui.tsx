import {
    ShieldCheck,
    Clock,
    Sparkles,
    Link as LinkIcon,
    Key,
    Eye,
    Calendar,
    Trash2,
    Plus,
    Inbox,
    LogOut,
    LayoutDashboard,
    User
} from 'lucide-react';
import React from 'react';

export const UI_CONFIG = {
    app: {
        name: 'Secret',
        brand: 'Lekh',
        tagline: 'Private · Secure · Ephemeral',
        logo: <ShieldCheck className="w-6 h-6 text-violet-400" />,
    },

    home: {
        hero: {
            title: 'Secret',
            brand: 'Lekh',
            subtitle: 'Create private notes protected by an auto-generated password. Share them via a unique link — they can expire, and AI can summarize them.',
            cta: 'Start for free',
            signin: 'Sign in',
        },
        features: [
            {
                icon: <ShieldCheck className="w-8 h-8 text-violet-400" />,
                title: 'Password Protected',
                desc: 'Every note is locked behind a unique auto-generated password.',
            },
            {
                icon: <Clock className="w-8 h-8 text-amber-400" />,
                title: 'Auto-Expiring Notes',
                desc: 'Set expiry to 1 hour, 24 hours, 7 days, or keep it forever.',
            },
            {
                icon: <Sparkles className="w-8 h-8 text-blue-400" />,
                title: 'AI Summary',
                desc: 'Whisper AI reads your note and gives a concise bullet-point summary.',
            },
            {
                icon: <LinkIcon className="w-8 h-8 text-emerald-400" />,
                title: 'Shareable Links',
                desc: 'Share a unique URL and password with anyone — no account needed to read.',
            },
        ],
        footer: {
            text: 'SecretLekh © {year} · Built with Next.js, Firebase & Gemini AI',
        }
    },

    dashboard: {
        title: 'Dashboard',
        subtitle: (name: string) => `Create and manage your private notes, ${name}.`,
        newNote: {
            title: 'New secret note',
            icon: <Plus className="w-4 h-4 text-violet-400" />,
        },
        list: {
            title: 'Your notes',
            empty: {
                icon: <Inbox className="w-12 h-12 text-gray-700 mx-auto" />,
                title: 'No notes yet',
                subtitle: 'Create your first secret note on the left.',
            }
        }
    },

    noteCard: {
        status: {
            active: 'ACTIVE',
            expired: 'EXPIRED',
        },
        icons: {
            calendar: <Calendar className="w-3 h-3" />,
            views: <Eye className="w-3 h-3 text-violet-400" />,
            link: <LinkIcon className="w-4 h-4" />,
            key: <Key className="w-4 h-4" />,
            delete: <Trash2 className="w-4 h-4" />,
        },
        actions: {
            copyUrl: 'Copy Link',
            urlCopied: 'URL Copied',
            copyPass: 'Copy Pass',
            passCopied: 'Pass Copied',
        }
    },

    navbar: {
        dashboard: 'Dashboard',
        logout: 'Logout',
        icons: {
            dashboard: <LayoutDashboard className="w-4 h-4" />,
            logout: <LogOut className="w-4 h-4" />,
            user: <User className="w-4 h-4" />,
        }
    },

    noteDisplay: {
        unlocked: 'Note unlocked',
        summarize: 'Summarize this note',
        summarizing: 'Generating summary…',
        reading: 'AI is reading your note…',
        error: 'Could not generate summary. Please try again.',
        icons: {
            unlocked: <ShieldCheck className="h-5 w-5" />,
            summarize: <Sparkles className="h-4 w-4" />,
        }
    },

    passwordGate: {
        title: 'This note is protected',
        subtitle: 'Enter the unlock password to view its contents.',
        inputLabel: 'Unlock password',
        inputPlaceholder: 'Enter unlock password',
        buttonLabel: 'Unlock Note',
        verifying: 'Verifying…',
        icons: {
            lock: <Key className="h-10 w-10 text-violet-400 mx-auto" />,
            show: <Eye className="w-4 h-4" />,
            hide: <Eye className="w-4 h-4 opacity-50" />,
        }
    },

    noteForm: {
        label: 'Your secret note',
        placeholder: "Type your private note here… it'll be protected by a password.",
        expiryLabel: 'Expiry',
        createButton: 'Create secret note',
        creating: 'Encrypting & saving…',
        errorLimit: (max: number) => `Note must be under ${max} characters.`,
        icons: {
            create: <ShieldCheck className="w-4 h-4" />,
        }
    },

    shareCard: {
        title: 'Note created!',
        subtitle: 'Share the link and password below. The password is shown only once.',
        urlLabel: 'Share URL',
        passLabel: 'Unlock Password',
        warning: 'Save the password now — it cannot be recovered after closing this.',
        createAnother: 'Create another note',
        copy: 'Copy',
        copied: 'Copied!',
        icons: {
            success: <Sparkles className="h-10 w-10 text-emerald-400 mx-auto" />,
            copy: <LinkIcon className="w-3.5 h-3.5" />,
            warning: <Clock className="w-4 h-4 text-amber-500 shrink-0" />,
            plus: <Plus className="w-4 h-4" />,
        }
    },

    summaryBox: {
        title: 'AI Summary',
        icons: {
            sparkles: <Sparkles className="h-4 w-4 text-violet-300" />,
        }
    },

    auth: {
        login: {
            title: 'Sign in',
            emailLabel: 'Email address',
            emailPlaceholder: 'you@example.com',
            passLabel: 'Password',
            passPlaceholder: '••••••••',
            button: 'Sign in',
            loading: 'Signing in…',
        },
        register: {
            title: 'Create account',
            emailLabel: 'Email address',
            emailPlaceholder: 'you@example.com',
            passLabel: 'Password',
            passPlaceholder: 'Min. 6 characters',
            confirmLabel: 'Confirm password',
            confirmPlaceholder: 'Repeat your password',
            button: 'Create account',
            loading: 'Creating account…',
            errorMatch: 'Passwords do not match.',
            errorLength: 'Password must be at least 6 characters.',
        }
    }
};

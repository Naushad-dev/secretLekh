'use client';

import { ReactNode } from 'react';

interface BadgeProps {
    variant?: 'default' | 'success' | 'danger' | 'warning' | 'info' | 'primary';
    children: ReactNode;
    className?: string;
}

export function Badge({ variant = 'default', children, className = '' }: BadgeProps) {
    const variants = {
        default: 'bg-gray-800 text-gray-300 border-gray-700',
        success: 'bg-emerald-900/40 text-emerald-400 border-emerald-800',
        danger: 'bg-red-900/40 text-red-400 border-red-800',
        warning: 'bg-amber-900/40 text-amber-400 border-amber-800',
        info: 'bg-blue-900/40 text-blue-400 border-blue-800',
        primary: 'bg-violet-900/40 text-violet-400 border-violet-800',
    };
    return (
        <span
            className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${variants[variant]} ${className}`}
        >
            {children}
        </span>
    );
}

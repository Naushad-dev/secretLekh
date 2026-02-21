'use client';

import { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    hint?: string;
    containerClassName?: string;
}

export function Input({
    label,
    error,
    hint,
    className = '',
    containerClassName = '',
    ...props
}: InputProps) {
    const inputBase =
        'w-full rounded-xl bg-gray-900 border px-4 py-2.5 text-gray-100 placeholder-gray-500 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500';
    const inputBorder = error
        ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
        : 'border-gray-700 hover:border-gray-600';

    return (
        <div className={`flex flex-col gap-1.5 ${containerClassName}`}>
            {label && (
                <label className="text-sm font-medium text-gray-300">{label}</label>
            )}
            <input
                className={`${inputBase} ${inputBorder} ${className}`}
                {...props}
            />
            {error && <p className="text-xs text-red-400">{error}</p>}
            {hint && !error && <p className="text-xs text-gray-500">{hint}</p>}
        </div>
    );
}

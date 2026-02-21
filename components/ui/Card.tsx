'use client';

import { HTMLAttributes, ReactNode } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
}

export function Card({ children, className = '', ...props }: CardProps) {
    return (
        <div
            className={`rounded-2xl bg-gray-900/80 border border-gray-800 backdrop-blur-sm shadow-xl ${className}`}
            {...props}
        >
            {children}
        </div>
    );
}

export function CardHeader({ children, className = '' }: CardProps) {
    return (
        <div className={`px-6 py-5 border-b border-gray-800 ${className}`}>
            {children}
        </div>
    );
}

export function CardContent({ children, className = '' }: CardProps) {
    return <div className={`px-6 py-5 ${className}`}>{children}</div>;
}

export function CardFooter({ children, className = '' }: CardProps) {
    return (
        <div
            className={`px-6 py-4 border-t border-gray-800 ${className}`}
        >
            {children}
        </div>
    );
}

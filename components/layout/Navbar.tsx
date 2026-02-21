'use client'
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { logOut } from '@/lib/firebase/auth';
import { Button } from '@/components/ui/Button';
import { UI_CONFIG } from '@/lib/config/ui';

export function Navbar() {
    const { user } = useAuth();
    const router = useRouter();
    const { app, navbar } = UI_CONFIG;

    async function handleLogout() {
        await logOut();
        document.cookie = 'authToken=; Max-Age=0; path=/';
        router.push('/login');
    }

    return (
        <header className="sticky top-0 z-50 w-full border-b border-gray-800 bg-gray-950/80 backdrop-blur-xl">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2.5 group">
                    <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-violet-900/40 group-hover:shadow-violet-700/60 transition-all duration-300">
                        {app.logo}
                    </div>
                    <span className="font-bold text-lg tracking-tight text-white">
                        {app.name}<span className="text-violet-400">{app.brand}</span>
                    </span>
                </Link>
                <nav className="flex items-center gap-3">
                    {user ? (
                        <>
                            <div className="hidden sm:flex items-center gap-2 text-sm text-gray-400 truncate max-w-[180px] bg-gray-900/50 px-3 py-1.5 rounded-lg border border-gray-800">
                                {navbar.icons.user}
                                <span className="truncate">{user.email?.split('@')[0]}</span>
                            </div>
                            <Link href="/dashboard">
                                <Button variant="secondary" size="sm" className="gap-2">
                                    {navbar.icons.dashboard}
                                    <span className="hidden sm:inline">{navbar.dashboard}</span>
                                </Button>
                            </Link>
                            <Button variant="ghost" size="sm" onClick={handleLogout} className="gap-2">
                                {navbar.icons.logout}
                                <span className="hidden sm:inline">{navbar.logout}</span>
                            </Button>
                        </>
                    ) : (
                        <>
                            <Link href="/login">
                                <Button variant="ghost" size="sm">Log in</Button>
                            </Link>
                            <Link href="/register">
                                <Button variant="primary" size="sm">Get started</Button>
                            </Link>
                        </>
                    )}
                </nav>
            </div>
        </header>
    );
}

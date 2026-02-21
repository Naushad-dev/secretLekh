import { AuthGuard } from '@/components/layout/AuthGuard';
import { ReactNode } from 'react';

export default function ProtectedLayout({ children }: { children: ReactNode }) {
    return <AuthGuard>{children}</AuthGuard>;
}

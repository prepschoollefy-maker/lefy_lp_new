'use client';

import '@/app/globals.css';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { FloatingCTA } from '@/components/layout/floating-cta';

export default function ResultsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <Header logoHref="https://lefy.jp/" />
            <main className="min-h-screen">{children}</main>
            <Footer />
            <FloatingCTA />
        </>
    );
}

'use client';

import { usePathname } from 'next/navigation';
import './globals.css';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { FloatingCTA } from '@/components/layout/floating-cta';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // resultsページの場合はロゴリンクをlefy.jpに変更
  const isResultsPage = pathname === '/results' || pathname.startsWith('/results/');
  const logoHref = isResultsPage ? 'https://lefy.jp/' : '/';

  return (
    <html lang="ja">
      <head>
        <title>LEFY - 中学受験個別指導塾</title>
        <meta name="description" content="中学受験個別指導塾LEFY（レフィー）の資料請求ありがとうございます。" />
        <link rel="icon" href="/favicon.png" type="image/png" />
      </head>
      <body className="bg-white text-navy-800 antialiased">
        <Header logoHref={logoHref} />
        <main className="min-h-screen">{children}</main>
        <Footer logoHref={logoHref} />
        {!isResultsPage && <FloatingCTA />}
      </body>
    </html>
  );
}

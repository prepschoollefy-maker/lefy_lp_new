'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Youtube } from 'lucide-react';

interface HeaderProps {
  logoHref?: string; // ロゴのリンク先（デフォルトは "/"）
}

export function Header({ logoHref = "/" }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-orange-200 bg-gradient-to-r from-orange-400 to-yellow-400 shadow-md">
      <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-3">
        <Link href={logoHref} className="block">
          <Image
            src="/lefy-logo.png"
            alt="LEFY"
            width={120}
            height={40}
            className="h-10 w-auto"
            priority
          />
        </Link>
        <Link
          href="https://www.youtube.com/@lefy-kobetsu"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 rounded-lg bg-red-600 px-3 py-2 text-sm font-semibold text-white transition-all hover:bg-red-700 hover:shadow-lg"
          aria-label="LEFY YouTube チャンネル"
        >
          <Youtube className="h-4 w-4" />
          <span>YouTube</span>
        </Link>
      </div>
    </header>
  );
}

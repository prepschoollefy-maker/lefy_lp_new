'use client';

import Link from 'next/link';
import { GraduationCap, MessageCircle, ClipboardList } from 'lucide-react';

export function FloatingCTA() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-navy-800 shadow-2xl">
      <div className="mx-auto flex max-w-4xl items-stretch">
        {/* 体験授業 */}
        <Link
          href="/trial-lesson"
          className="flex flex-1 flex-col items-center justify-center gap-2 border-r border-white/20 py-4 px-2 text-center transition-all hover:bg-navy-700"
        >
          <GraduationCap className="h-6 w-6 text-white" />
          <span className="text-sm font-bold text-white">体験授業</span>
        </Link>

        {/* 学習カウンセリング */}
        <Link
          href="/counseling"
          className="flex flex-1 flex-col items-center justify-center gap-2 border-r border-white/20 py-4 px-2 text-center transition-all hover:bg-navy-700"
        >
          <MessageCircle className="h-6 w-6 text-white" />
          <span className="text-sm font-bold text-white">
            学習<br />カウンセリング
          </span>
        </Link>

        {/* 入塾の流れ */}
        <Link
          href="/flow"
          className="flex flex-1 flex-col items-center justify-center gap-2 py-4 px-2 text-center transition-all hover:bg-navy-700"
        >
          <ClipboardList className="h-6 w-6 text-white" />
          <span className="text-sm font-bold text-white">入塾の流れ</span>
        </Link>
      </div>
    </div>
  );
}

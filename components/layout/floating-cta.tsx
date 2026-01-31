'use client';

import Link from 'next/link';
import { GraduationCap, MessageCircle, ClipboardList } from 'lucide-react';

export function FloatingCTA() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 backdrop-blur-md bg-gradient-to-r from-navy-900/95 via-navy-800/95 to-navy-900/95 border-t border-white/10 shadow-2xl">
      <div className="mx-auto flex max-w-4xl items-stretch">
        {/* 体験授業 - グラデーション1 */}
        <Link
          href="/trial-lesson"
          className="group flex flex-1 flex-col items-center justify-center gap-2 py-4 px-2 text-center transition-all duration-300 hover:scale-105 relative overflow-hidden"
        >
          {/* ホバー時の背景グラデーション */}
          <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-emerald-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

          {/* アイコン - グラデーション背景 */}
          <div className="relative z-10 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 p-2.5 shadow-lg group-hover:shadow-green-500/50 transition-all duration-300 group-hover:scale-110">
            <GraduationCap className="h-5 w-5 text-white" />
          </div>

          {/* テキスト */}
          <span className="relative z-10 text-xs font-bold text-white group-hover:text-green-300 transition-colors duration-300">
            体験授業
          </span>

          {/* 下線アニメーション */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-green-400 to-emerald-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
        </Link>

        {/* 学習相談 - グラデーション2 */}
        <Link
          href="/counseling"
          className="group flex flex-1 flex-col items-center justify-center gap-2 py-4 px-2 text-center transition-all duration-300 hover:scale-105 relative overflow-hidden"
        >
          {/* ホバー時の背景グラデーション */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-indigo-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

          {/* アイコン - グラデーション背景 */}
          <div className="relative z-10 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 p-2.5 shadow-lg group-hover:shadow-blue-500/50 transition-all duration-300 group-hover:scale-110">
            <MessageCircle className="h-5 w-5 text-white" />
          </div>

          {/* テキスト */}
          <span className="relative z-10 text-xs font-bold text-white group-hover:text-blue-300 transition-colors duration-300">
            学習相談
          </span>

          {/* 下線アニメーション */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 to-indigo-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
        </Link>

        {/* 入塾の流れ - グラデーション3 */}
        <Link
          href="/flow"
          className="group flex flex-1 flex-col items-center justify-center gap-2 py-4 px-2 text-center transition-all duration-300 hover:scale-105 relative overflow-hidden"
        >
          {/* ホバー時の背景グラデーション */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

          {/* アイコン - グラデーション背景 */}
          <div className="relative z-10 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 p-2.5 shadow-lg group-hover:shadow-purple-500/50 transition-all duration-300 group-hover:scale-110">
            <ClipboardList className="h-5 w-5 text-white" />
          </div>

          {/* テキスト */}
          <span className="relative z-10 text-xs font-bold text-white group-hover:text-purple-300 transition-colors duration-300">
            入塾の流れ
          </span>

          {/* 下線アニメーション */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-400 to-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
        </Link>
      </div>
    </div>
  );
}

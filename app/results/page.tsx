'use client';

import Link from 'next/link';
import { Award, GraduationCap, TrendingUp, ChevronRight } from 'lucide-react';

export default function ResultsPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-white">
            {/* ヒーローセクション */}
            <section className="relative overflow-hidden bg-gradient-to-br from-navy-700 via-navy-800 to-slate-900 py-20 px-6 text-center md:py-28">
                <div className="absolute inset-0 opacity-5">
                    <div className="absolute top-20 right-20 h-64 w-64 rounded-full bg-[#D9EEEF] blur-3xl"></div>
                    <div className="absolute bottom-20 left-20 h-80 w-80 rounded-full bg-white blur-3xl"></div>
                </div>

                <div className="relative z-10 mx-auto max-w-4xl">
                    <div className="mb-6 flex justify-center">
                        <div className="rounded-2xl bg-[#D9EEEF]/20 p-4 backdrop-blur-sm">
                            <Award className="h-12 w-12 text-[#D9EEEF] md:h-14 md:w-14" />
                        </div>
                    </div>

                    <h1 className="mb-6 text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl">
                        LEFYの合格実績一覧
                    </h1>

                    <p className="mx-auto max-w-3xl text-lg leading-relaxed text-slate-200 md:text-xl">
                        中学受験から大学受験まで、<br className="hidden md:block" />
                        LEFYの生徒たちが掴み取った成果をご紹介します
                    </p>
                </div>
            </section>

            {/* カード選択セクション */}
            <section className="py-16 px-4 md:py-24 md:px-8">
                <div className="mx-auto max-w-4xl">
                    <div className="mb-12 text-center">
                        <p className="text-base text-navy-600 md:text-lg">
                            ご覧になりたい実績をお選びください
                        </p>
                    </div>

                    <div className="grid gap-8 md:grid-cols-2">
                        {/* 中学受験の合格実績カード */}
                        <Link
                            href="/results/tyuju"
                            className="group relative overflow-hidden rounded-2xl border-2 border-navy-200 bg-white shadow-lg transition-all hover:border-navy-400 hover:shadow-2xl"
                        >
                            {/* 上部カラーバー */}
                            <div className="bg-gradient-to-r from-navy-600 to-navy-700 px-6 py-5">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm">
                                        <Award className="h-7 w-7 text-white" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-semibold text-navy-200">JUNIOR HIGH SCHOOL</p>
                                        <h3 className="text-xl font-bold text-white">中学受験</h3>
                                    </div>
                                </div>
                            </div>

                            {/* コンテンツ */}
                            <div className="p-6">
                                <h3 className="mb-3 text-xl font-bold text-navy-800">
                                    中学受験の合格実績はこちら
                                </h3>
                                <p className="mb-4 text-sm leading-relaxed text-navy-600">
                                    開成、聖光学院、栄光学園、フェリス女学院など難関校への合格実績と、合格者の声をご紹介します。
                                </p>

                                {/* 学校名プレビュー */}
                                <div className="mb-4 flex flex-wrap gap-1.5">
                                    {['開成', '聖光学院', '栄光学園', 'フェリス女学院', '浅野'].map((school) => (
                                        <span key={school} className="rounded-full bg-navy-50 px-2.5 py-1 text-xs font-medium text-navy-700">
                                            {school}
                                        </span>
                                    ))}
                                    <span className="rounded-full bg-navy-50 px-2.5 py-1 text-xs font-medium text-navy-500">
                                        ...他多数
                                    </span>
                                </div>

                                {/* CTA */}
                                <div className="flex items-center gap-2 text-sm font-bold text-navy-700 transition-colors group-hover:text-navy-900">
                                    詳しく見る
                                    <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                </div>
                            </div>
                        </Link>

                        {/* 中高一貫校生 成績UP・大学受験カード */}
                        <Link
                            href="/results/ikkanndaiju"
                            className="group relative overflow-hidden rounded-2xl border-2 border-rose-200 bg-white shadow-lg transition-all hover:border-rose-400 hover:shadow-2xl"
                        >
                            {/* 上部カラーバー */}
                            <div className="bg-gradient-to-r from-rose-600 to-rose-700 px-6 py-5">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm">
                                        <GraduationCap className="h-7 w-7 text-white" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-semibold text-rose-200">UNIVERSITY & GRADE UP</p>
                                        <h3 className="text-xl font-bold text-white">中高一貫校生</h3>
                                    </div>
                                </div>
                            </div>

                            {/* コンテンツ */}
                            <div className="p-6">
                                <h3 className="mb-3 text-lg font-bold text-navy-800">
                                    中高一貫校生 成績UP・<br />大学受験の合格実績はこちら
                                </h3>
                                <p className="mb-4 text-sm leading-relaxed text-navy-600">
                                    中高一貫校生の定期テスト成績UP実績と、大学受験の合格実績をご紹介します。
                                </p>

                                {/* 実績プレビュー */}
                                <div className="mb-4 flex flex-wrap gap-1.5">
                                    {['慶應義塾大学', '立教大学', '成績UP', '英検合格'].map((item) => (
                                        <span key={item} className="rounded-full bg-rose-50 px-2.5 py-1 text-xs font-medium text-rose-700">
                                            {item}
                                        </span>
                                    ))}
                                    <span className="rounded-full bg-rose-50 px-2.5 py-1 text-xs font-medium text-rose-500">
                                        ...他多数
                                    </span>
                                </div>

                                {/* CTA */}
                                <div className="flex items-center gap-2 text-sm font-bold text-rose-700 transition-colors group-hover:text-rose-900">
                                    詳しく見る
                                    <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
            </section>

            {/* フッター */}
            <footer className="border-t border-slate-200 bg-white py-8 px-4 text-center">
                <p className="text-sm text-slate-500">&copy; 2026 LEFY. All rights reserved.</p>
                <div className="mt-4">
                    <a href="https://lefy.jp/" className="text-sm font-medium text-navy-700 transition-colors hover:text-navy-900">
                        ホームページへ戻る
                    </a>
                </div>
            </footer>
        </div>
    );
}

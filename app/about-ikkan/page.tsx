'use client';

import Link from 'next/link';
import { ArrowLeft, GraduationCap, BookOpen, Target, CheckCircle } from 'lucide-react';

export default function AboutIkkanPage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-50 to-blue-50/30">
            <div className="mx-auto max-w-4xl px-4 py-8">
                {/* 戻るリンク */}
                <Link
                    href="/"
                    className="mb-6 inline-flex items-center gap-1 text-sm text-navy-600 transition-colors hover:text-navy-800"
                >
                    <ArrowLeft className="h-4 w-4" />
                    トップに戻る
                </Link>

                {/* ヒーローセクション */}
                <section className="mb-12 rounded-2xl bg-gradient-to-br from-navy-700 via-navy-800 to-navy-900 p-8 text-center text-white shadow-xl">
                    <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2">
                        <GraduationCap className="h-5 w-5" />
                        <span className="text-sm font-medium">中高一貫校・大学受験向け</span>
                    </div>
                    <h1 className="mb-4 text-3xl font-bold md:text-4xl">
                        LEFYってどんな塾？
                    </h1>
                    <p className="text-lg text-navy-100">
                        中高一貫校生・大学受験生のための個別指導
                    </p>
                </section>

                {/* 工事中メッセージ */}
                <section className="mb-12 rounded-2xl border-2 border-amber-300 bg-amber-50 p-8 text-center">
                    <div className="mb-4 text-4xl">🚧</div>
                    <h2 className="mb-4 text-2xl font-bold text-amber-800">
                        このページは現在作成中です
                    </h2>
                    <p className="text-amber-700">
                        近日公開予定です。しばらくお待ちください。
                    </p>
                </section>

                {/* プレースホルダーセクション */}
                <section className="mb-12 rounded-2xl border border-slate-200 bg-white p-8 shadow-lg">
                    <h2 className="mb-6 text-2xl font-bold text-navy-800">
                        今後追加予定のコンテンツ
                    </h2>
                    <div className="space-y-4">
                        <div className="flex items-start gap-3">
                            <CheckCircle className="mt-1 h-5 w-5 text-green-500" />
                            <div>
                                <h3 className="font-semibold text-navy-700">どんな生徒が通っているの？</h3>
                                <p className="text-sm text-navy-600">中高一貫校生の通塾事例を紹介</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <CheckCircle className="mt-1 h-5 w-5 text-green-500" />
                            <div>
                                <h3 className="font-semibold text-navy-700">LEFYの活用の仕方は？</h3>
                                <p className="text-sm text-navy-600">学校の定期テスト対策、大学受験対策など</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <CheckCircle className="mt-1 h-5 w-5 text-green-500" />
                            <div>
                                <h3 className="font-semibold text-navy-700">成績UP／合格実績</h3>
                                <p className="text-sm text-navy-600">中高一貫校生・大学受験生の実績を紹介</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTAセクション */}
                <section className="rounded-2xl bg-navy-800 p-8 text-center text-white">
                    <h2 className="mb-4 text-2xl font-bold">
                        まずはお気軽にご相談ください
                    </h2>
                    <p className="mb-6 text-navy-100">
                        無料学習相談・体験授業を受け付けております
                    </p>
                    <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
                        <Link
                            href="/counseling"
                            className="rounded-lg bg-white px-6 py-3 font-semibold text-navy-800 transition-colors hover:bg-navy-50"
                        >
                            無料学習相談
                        </Link>
                        <Link
                            href="/trial-lesson"
                            className="rounded-lg border-2 border-white px-6 py-3 font-semibold text-white transition-colors hover:bg-white/10"
                        >
                            体験授業
                        </Link>
                    </div>
                </section>
            </div>
        </div>
    );
}

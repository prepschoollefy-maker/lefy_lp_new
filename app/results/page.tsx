'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Award, Star, Phone, CheckCircle } from 'lucide-react';

// 年度別・学校種別合格実績データ（aboutページから再利用）
interface SchoolCategory {
    boys: string[];      // 男子校
    girls: string[];     // 女子校
    coed: string[];      // 共学
}

const resultsByYear: Record<2026 | 2025 | 2024 | 2023, SchoolCategory> = {
    2026: {
        boys: ['海陽'],
        girls: [],
        coed: ['栄東', '開智所沢', '埼玉栄', '宮崎日大']
    },
    2025: {
        boys: ['開成', '浅野', '聖光学院', 'サレジオ学院', '逗子開成', '鎌倉学園', '静岡聖光', '藤嶺学園藤沢', '武相'],
        girls: ['香蘭', '淑徳与野'],
        coed: ['愛光', '青山学院横浜英和', '市川', '開智', '神奈川大学附属', '関東学院', '桐蔭学園', '桐光学園', '埼玉栄', '栄東(東大クラス特待・難関大)', '佐久長聖(特待C含む)', '東京都市大学等々力(特選)', '日本大学', '日本大学藤沢', '三田国際(ISC、MSTC)', '八雲学園', '山手学院(特待含む)', '横浜創英', '早稲田佐賀']
    },
    2024: {
        boys: ['栄光学園', 'サレジオ学院', '逗子開成'],
        girls: [],
        coed: ['神奈川大学附属', '佐久長聖', '佐久長聖（特待B）', '中央大学附属横浜', '桐蔭学園（特待）', '森村学園（特待）', '山手学院']
    },
    2023: {
        boys: ['静岡聖光'],
        girls: ['フェリス女学院', '田園調布学園（午後算数）'],
        coed: ['佐久長聖（特待A）', '桐光学園', '関東学院', '宝仙学園（特待）']
    }
};

// 合格者の声（厳選版）
interface Testimonial {
    studentName: string;
    school: string;
    grade: string;
    voice: string;
}

const selectedTestimonials: Testimonial[] = [
    {
        studentName: 'K.U.君',
        school: '開成・聖光学院',
        grade: '精華小学校',
        voice: '僕は６年生の夏休み明けに算数のスランプに陥り、塾のマンスリーテストでも点が取れなくなってしまいました。LEFYに通い始めてから、先生の教え方も優しく、僕がミスをしても温かく指摘してくれました。入試直前期には第一志望校の過去問対策をしてもらい、入試本番では算数が良くでき、開成中学と聖光学院のダブルで合格ができました。'
    },
    {
        studentName: 'T.K君',
        school: '栄光学園',
        grade: '精華小学校',
        voice: '僕には、3ヶ月のブランクがありました。その時、知り合いの薦めでレフィーに入りました。レフィーの先生は、僕がミスをしても温かく見守ってくれ、僕が欠点に気づきやすいようにうまくまとめてくれました。先生方は癖のある栄光の算数にもちゃんと対応・サポートしてくれたため、合格することができました。'
    },
    {
        studentName: 'N.M.さん',
        school: 'フェリス女学院',
        grade: '私立関東学院小学校',
        voice: 'LEFYには入試本番の３カ月前から通い、算数と理科の苦手分野の対策をしてもらいました。通い始めたころは不安な状況が続いていましたが、１月ごろにはフェリスの過去問でも算数で点数を稼げるようなレベルになりました。弱点に対する嫌悪感が減り、自信を持って入試を迎えることができました。'
    }
];

export default function ResultsPage() {
    const [selectedYear, setSelectedYear] = useState<2026 | 2025 | 2024 | 2023>(2026);

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
                        小規模な個別指導塾から開成、聖光学院、栄光学園、フェリス女学院など、<br className="hidden md:block" />
                        難関校への合格者を輩出
                    </p>

                    <div className="mt-10 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-3 backdrop-blur-md">
                        <div className="h-2 w-2 rounded-full bg-[#D9EEEF]"></div>
                        <p className="text-lg font-semibold text-white">LEFY 中学受験専門個別指導</p>
                    </div>
                </div>
            </section>

            {/* 合格実績セクション */}
            <section className="py-16 px-4 md:py-20 md:px-8">
                <div className="mx-auto max-w-6xl">
                    <div className="mb-12 text-center">
                        <div className="mb-3 inline-block rounded-full bg-[#D9EEEF]/30 px-4 py-1.5">
                            <span className="text-sm font-semibold text-navy-700">ACHIEVEMENTS</span>
                        </div>
                        <h2 className="mb-4 text-3xl font-bold text-navy-800 md:text-4xl">
                            合格実績
                        </h2>
                    </div>

                    <div className="mb-10">
                        <div className="flex justify-center gap-2 overflow-x-auto pb-2">
                            {([2026, 2025, 2024, 2023] as const).map((year) => (
                                <button
                                    key={year}
                                    onClick={() => setSelectedYear(year)}
                                    className={`flex-shrink-0 rounded-lg px-6 py-2.5 text-sm font-semibold transition-all ${selectedYear === year
                                        ? 'bg-navy-700 text-white shadow-lg shadow-navy-700/20'
                                        : 'bg-white text-slate-600 shadow-sm hover:bg-slate-50'
                                        }`}
                                >
                                    {year}年度
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-8 rounded-2xl border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/50">
                        {resultsByYear[selectedYear].boys.length > 0 && (
                            <div>
                                <div className="mb-4 flex items-center gap-2">
                                    <div className="h-1 w-1 rounded-full bg-blue-500"></div>
                                    <h4 className="text-sm font-semibold uppercase tracking-wide text-blue-600">男子校</h4>
                                </div>
                                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                                    {resultsByYear[selectedYear].boys.map((school: string, index: number) => (
                                        <div key={index} className="group relative overflow-hidden rounded-lg border border-blue-200 bg-gradient-to-br from-blue-50 to-white px-3 py-3.5 text-center text-sm font-medium text-navy-800 shadow-sm transition-all hover:border-blue-400 hover:shadow-md">
                                            <CheckCircle className="absolute -right-1 -top-1 h-5 w-5 text-blue-400 opacity-0 transition-opacity group-hover:opacity-100" />
                                            {school}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {resultsByYear[selectedYear].girls.length > 0 && (
                            <div>
                                <div className="mb-4 flex items-center gap-2">
                                    <div className="h-1 w-1 rounded-full bg-pink-500"></div>
                                    <h4 className="text-sm font-semibold uppercase tracking-wide text-pink-600">女子校</h4>
                                </div>
                                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                                    {resultsByYear[selectedYear].girls.map((school: string, index: number) => (
                                        <div key={index} className="group relative overflow-hidden rounded-lg border border-pink-200 bg-gradient-to-br from-pink-50 to-white px-3 py-3.5 text-center text-sm font-medium text-navy-800 shadow-sm transition-all hover:border-pink-400 hover:shadow-md">
                                            <CheckCircle className="absolute -right-1 -top-1 h-5 w-5 text-pink-400 opacity-0 transition-opacity group-hover:opacity-100" />
                                            {school}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {resultsByYear[selectedYear].coed.length > 0 && (
                            <div>
                                <div className="mb-4 flex items-center gap-2">
                                    <div className="h-1 w-1 rounded-full bg-emerald-500"></div>
                                    <h4 className="text-sm font-semibold uppercase tracking-wide text-emerald-600">共学</h4>
                                </div>
                                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                                    {resultsByYear[selectedYear].coed.map((school: string, index: number) => (
                                        <div key={index} className="group relative overflow-hidden rounded-lg border border-emerald-200 bg-gradient-to-br from-emerald-50 to-white px-3 py-3.5 text-center text-sm font-medium text-navy-800 shadow-sm transition-all hover:border-emerald-400 hover:shadow-md">
                                            <CheckCircle className="absolute -right-1 -top-1 h-5 w-5 text-emerald-400 opacity-0 transition-opacity group-hover:opacity-100" />
                                            {school}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* 合格者の声セクション */}
            <section className="bg-gradient-to-br from-slate-100 to-slate-50 py-16 px-4 md:py-20 md:px-8">
                <div className="mx-auto max-w-5xl">
                    <div className="mb-12 text-center">
                        <div className="mb-3 inline-block rounded-full bg-white/80 px-4 py-1.5 shadow-sm">
                            <span className="text-sm font-semibold text-navy-700">VOICES</span>
                        </div>
                        <h2 className="mb-4 text-3xl font-bold text-navy-800 md:text-4xl">合格者の声</h2>
                    </div>

                    <div className="space-y-6">
                        {selectedTestimonials.map((testimonial, index) => (
                            <div key={index} className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-lg shadow-slate-200/50 transition-all hover:border-[#D9EEEF] hover:shadow-xl md:p-8">
                                <div className="mb-4 flex items-start gap-4">
                                    <div className="flex-shrink-0 rounded-xl bg-gradient-to-br from-[#D9EEEF] to-[#B8DFE6] p-3">
                                        <Star className="h-5 w-5 text-navy-700" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-lg font-bold text-navy-800">{testimonial.studentName}</h3>
                                        <p className="mt-0.5 text-sm text-slate-500">{testimonial.grade}</p>
                                        <div className="mt-2 inline-block rounded-full bg-navy-700 px-3 py-1">
                                            <p className="text-sm font-semibold text-white">{testimonial.school} 合格</p>
                                        </div>
                                    </div>
                                </div>
                                <p className="leading-relaxed text-slate-700">{testimonial.voice}</p>
                            </div>
                        ))}
                    </div>

                    <div className="mt-10 text-center">
                        <Link href="/about" className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-navy-700 shadow-sm transition-all hover:border-navy-700 hover:bg-slate-50">
                            他の合格者の声を見る
                            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </Link>
                    </div>
                </div>
            </section>

            {/* CTAセクション */}
            <section className="relative overflow-hidden bg-gradient-to-br from-navy-800 to-slate-900 py-16 px-4 md:py-20 md:px-8">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 right-0 h-96 w-96 rounded-full bg-[#D9EEEF] blur-3xl"></div>
                </div>

                <div className="relative z-10 mx-auto max-w-3xl text-center">
                    <div className="mb-4 inline-block rounded-full bg-[#D9EEEF]/20 px-4 py-1.5 backdrop-blur-sm">
                        <span className="text-sm font-semibold text-[#D9EEEF]">CONTACT</span>
                    </div>

                    <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">無料学習相談実施中</h2>

                    <p className="mb-10 text-base leading-relaxed text-slate-300 md:text-lg">
                        お子様の現状や目標をお伺いし、最適な学習プランをご提案します。<br className="hidden sm:block" />
                        まずはお気軽にご相談ください。
                    </p>

                    <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
                        <Link href="/counseling" className="group relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-xl bg-white py-4 px-8 text-base font-bold text-navy-800 shadow-xl transition-all hover:shadow-2xl">
                            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#D9EEEF] text-xs font-bold text-navy-800">無料</span>
                            学習相談に申し込む
                        </Link>

                        <a href="tel:0456209150" className="inline-flex items-center justify-center gap-3 rounded-xl border-2 border-white/30 bg-white/10 py-4 px-8 text-base font-bold text-white backdrop-blur-sm transition-all hover:border-white/50 hover:bg-white/20">
                            <Phone className="h-5 w-5" />
                            045-620-9150
                        </a>
                    </div>

                    <p className="mt-6 text-sm text-slate-400">受付時間: 平日・土日 9:00〜21:00</p>
                </div>
            </section>

            {/* フッター */}
            <footer className="border-t border-slate-200 bg-white py-8 px-4 text-center">
                <p className="text-sm text-slate-500">© 2026 LEFY 中学受験専門個別指導. All rights reserved.</p>
                <div className="mt-4">
                    <Link href="/" className="text-sm font-medium text-navy-700 transition-colors hover:text-navy-900">
                        ホームページへ戻る
                    </Link>
                </div>
            </footer>
        </div>
    );
}

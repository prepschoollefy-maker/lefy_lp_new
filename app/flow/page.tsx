'use client';

import { FloatingCTA } from '@/components/layout/floating-cta';
import Link from 'next/link';
import Image from 'next/image';

// ステップデータ
const steps = [
    {
        number: 1,
        title: '学習相談',
        subtitle: '（1-2 時間）',
        description: `LEFYは、お子様の現状の学力レベルや課題などを詳細に知ることなく、最適な指導はできないと考えています。そのため、約1-2時間の学習相談の時間を設けています。
学習相談でのヒアリング内容、体験授業でのご様子を踏まえ、ご入塾後の学習内容をご提案させていただきます。`,
        bgColor: 'bg-white',
        isDark: false,
        hasCTA: true,
    },
    {
        number: 2,
        title: '無料体験授業',
        subtitle: '（1コマ60〜80分）',
        description: '実際の授業を、受講検討科目の数だけご体験いただけます。',
        bgColor: 'bg-gradient-to-br from-sky-100 to-sky-200',
        isDark: false,
        hasCTA: false,
    },
    {
        number: 3,
        title: 'ご入塾をご検討ください',
        subtitle: '',
        description: '',
        bgColor: 'bg-gradient-to-br from-sky-200 to-sky-300',
        isDark: false,
        hasCTA: false,
    },
    {
        number: 4,
        title: 'ご入塾お手続き',
        subtitle: '',
        description: '',
        bgColor: 'bg-gradient-to-br from-sky-300 to-sky-400',
        isDark: false,
        hasCTA: false,
    },
    {
        number: 5,
        title: '学習計画を検討、作成',
        subtitle: '',
        description: `お手続きが完了しましたら、学習相談・体験授業での情報をもとに今後の学習計画を作成します。
生徒の状況に応じて、学習計画シートを作成したり、毎回の講義の1週間前に次回講義の内容をメールでヒアリングする方法を取ったりなど、生徒一人ひとりに合わせた最適なプランをご提案します。`,
        bgColor: 'bg-gradient-to-br from-sky-400 to-navy-500',
        isDark: true,
        hasCTA: false,
    },
    {
        number: 6,
        title: '授業開始',
        subtitle: '',
        description: '',
        bgColor: 'bg-navy-700',
        isDark: true,
        hasCTA: false,
    },
];

export default function FlowPage() {
    return (
        <div className="min-h-screen bg-gray-50 pb-32">
            {/* ヒーロー画像バナー */}
            <div className="relative h-40 w-full overflow-hidden md:h-56">
                <Image
                    src="/kyousitsu_gazou.jpg"
                    alt="LEFY教室の様子"
                    fill
                    className="object-cover object-top"
                    priority
                />
            </div>

            <main className="mx-auto max-w-4xl px-4 pt-8">
                {/* ページヘッダー */}
                <div className="mb-10">
                    <h1 className="text-3xl font-bold text-navy-800 md:text-4xl">
                        入塾までの流れ
                    </h1>
                    <p className="mt-2 text-sm text-navy-500">Flow</p>
                </div>

                {/* ステップリスト */}
                <div className="space-y-0">
                    {steps.map((step, index) => (
                        <div
                            key={step.number}
                            className={`relative ${step.bgColor}`}
                            style={{
                                clipPath: index < steps.length - 1
                                    ? 'polygon(0 0, 100% 0, 100% calc(100% - 20px), 50% 100%, 0 calc(100% - 20px))'
                                    : undefined,
                                marginBottom: index < steps.length - 1 ? '-20px' : '0',
                            }}
                        >
                            <div className="flex gap-6 p-8 md:gap-10 md:p-12">
                                {/* ステップ番号 */}
                                <div className="flex flex-col items-center">
                                    <span
                                        className={`text-5xl font-light md:text-7xl ${step.isDark ? 'text-white/60' : 'text-navy-300'
                                            }`}
                                    >
                                        {step.number}
                                    </span>
                                    {/* 縦線 */}
                                    {index < steps.length - 1 && (
                                        <div
                                            className={`mt-2 h-full w-0.5 ${step.isDark ? 'bg-white/30' : 'bg-navy-200'
                                                }`}
                                            style={{ minHeight: '40px' }}
                                        />
                                    )}
                                </div>

                                {/* コンテンツ */}
                                <div className="flex-1 pt-2">
                                    <h2 className={`text-xl font-bold md:text-2xl ${step.isDark ? 'text-white' : 'text-navy-600'
                                        }`}>
                                        {step.title}
                                    </h2>
                                    {step.subtitle && (
                                        <p className={`mt-1 text-lg ${step.isDark ? 'text-white/80' : 'text-navy-500'
                                            }`}>
                                            {step.subtitle}
                                        </p>
                                    )}
                                    {step.description && (
                                        <p className={`mt-4 whitespace-pre-line text-sm leading-relaxed md:text-base ${step.isDark ? 'text-white/90' : 'text-navy-700'
                                            }`}>
                                            {step.description}
                                        </p>
                                    )}
                                    {/* ステップ1のCTAボタン */}
                                    {step.hasCTA && (
                                        <div className="mt-6">
                                            <Link
                                                href="/counseling"
                                                className="inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-green-500 to-green-600 py-2.5 px-5 text-sm font-bold text-white shadow-lg transition-all hover:from-green-600 hover:to-green-700"
                                            >
                                                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-xs font-bold text-green-600">
                                                    無料
                                                </span>
                                                学習相談に申し込む
                                            </Link>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* CTA セクション */}
                <div className="mt-12 rounded-2xl bg-navy-800 p-8 text-center">
                    <h3 className="mb-4 text-xl font-bold text-white">
                        まずは学習相談から
                    </h3>
                    <p className="mb-6 text-sm text-white/80">
                        お子様の現状をヒアリングし、最適な学習プランをご提案します。
                    </p>
                    <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
                        <Link
                            href="/counseling"
                            className="flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-green-500 to-green-600 py-3 px-6 text-base font-bold text-white shadow-lg transition-all hover:from-green-600 hover:to-green-700"
                        >
                            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-xs font-bold text-green-600">
                                無料
                            </span>
                            学習相談に申し込む
                        </Link>
                        <a
                            href="tel:04570755151"
                            className="flex items-center justify-center gap-2 rounded-lg bg-white py-3 px-6 text-base font-bold text-red-600 shadow-lg transition-all hover:bg-gray-50"
                        >
                            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                            </svg>
                            045-7075-5151
                        </a>
                    </div>
                </div>
            </main>

            <FloatingCTA />
        </div>
    );
}

import { FileText, BookOpen, Coins, HelpCircle, MessageSquare, CheckCircle } from 'lucide-react';
import { PDFCard } from '@/components/lefy/pdf-card';
import { PageCard } from '@/components/lefy/page-card';
import { SectionHeader } from '@/components/lefy/section-header';
import { CTASection } from '@/components/lefy/cta-section';

const pdfResources = [
  {
    title: 'パンフレット',
    description: '講師紹介・指導体制など',
    readTime: '3分',
    href: 'https://xn----17tzfsi7izese635z79az7km36a8rso6h.my.canva.site/dag-elfuxj8',
  },
  {
    title: '授業料・システムのご案内',
    description: '料金体系とシステムの詳細',
    readTime: '1分',
    href: 'https://xn----17tzfsi7izese635z79az7km36a8rso6h.my.canva.site/tuition-system',
  },
  {
    title: '【中学受験】1対1個別指導の使い方-わが子の力を最大化する-',
    description: '個別指導の効果的な活用方法',
    readTime: '2分',
    href: '/送付資料_中学受験.pdf',
  },
];

const webPages = [
  {
    title: 'LEFYってどんな塾？',
    summary: (
      <>
        <span className="font-semibold text-red-600">SAPIX、グノーブル、四谷大塚、日能研</span>
        など大手集団塾生の偏差値向上を狙います。個別だけの中学受験も対応。
      </>
    ),
    points: ['どんな生徒が通ってるの？', 'LEFYの活用の仕方は？', 'LEFYでの偏差値UP／合格事例'],
    readTime: '2分',
    href: '/about',
    icon: BookOpen,
  },
  {
    title: '中学受験で個別指導が必須な背景',
    summary: '活用有無・方法で偏差値に大きな差が生まれている',
    points: ['個別利用が増えている3つの理由', '必要な対策の考え方'],
    readTime: '2分',
    href: '/why-private',
    icon: HelpCircle,
  },
  {
    title: '授業料／システム',
    summary: '単純明快なシステム。思わぬ追加費用や押し売りはありません。',
    points: ['料金の目安が分かる', 'よくある質問への回答'],
    readTime: '1分',
    href: '/pricing',
    icon: Coins,
  },
];



export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-blue-50/30">
      <div className="mx-auto max-w-3xl px-4 py-8">
        {/* 感謝セクション - アニメーション＆装飾付き */}
        <section className="relative mb-12 overflow-hidden">
          {/* 紙吹雪装飾 */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute left-[10%] top-[20%] h-3 w-3 animate-float-slow rounded-full bg-blue-400 opacity-60" />
            <div className="absolute left-[80%] top-[10%] h-2 w-2 animate-float rounded-full bg-yellow-400 opacity-70" />
            <div className="absolute left-[20%] top-[70%] h-2.5 w-2.5 animate-float-slow rounded-full bg-pink-400 opacity-60" />
            <div className="absolute left-[70%] top-[60%] h-3 w-3 animate-float rounded-full bg-green-400 opacity-50" />
            <div className="absolute left-[50%] top-[30%] h-2 w-2 animate-float-slow rounded-full bg-purple-400 opacity-60" />
            <div className="absolute left-[90%] top-[80%] h-2.5 w-2.5 animate-float rounded-full bg-red-400 opacity-50" />
            <div className="absolute left-[15%] top-[50%] h-2 w-2 animate-float rounded-full bg-cyan-400 opacity-70" />
            <div className="absolute left-[85%] top-[40%] h-3 w-3 animate-float-slow rounded-full bg-orange-400 opacity-60" />
          </div>

          {/* メインコンテンツ */}
          <div className="relative animate-fade-in-up rounded-2xl bg-gradient-to-br from-blue-50 via-white to-purple-50 p-8 text-center shadow-xl">
            {/* キラキラアイコン */}
            <div className="mb-4 flex justify-center gap-2">
              <span className="animate-sparkle text-3xl">✨</span>
              <span className="animate-sparkle-delay text-3xl">🎉</span>
              <span className="animate-sparkle text-3xl">✨</span>
            </div>

            <h1 className="mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-4xl font-bold text-transparent sm:text-5xl">
              資料請求
              <br />
              ありがとうございます！
            </h1>

            <div className="mx-auto max-w-xl space-y-3">
              <p className="text-base leading-relaxed text-navy-700">
                📮 郵送資料が届くまでに2日ほどかかる場合がございます。
              </p>
              <p className="text-base leading-relaxed text-navy-700">
                💡 本ページでは、郵送資料の要点をまとめておりますので、お手軽にご確認いただけます。
              </p>
            </div>

            {/* 下部装飾ライン */}
            <div className="mt-6 flex justify-center gap-1">
              <div className="h-1 w-12 rounded-full bg-gradient-to-r from-blue-400 to-purple-400" />
              <div className="h-1 w-12 rounded-full bg-gradient-to-r from-purple-400 to-pink-400" />
              <div className="h-1 w-12 rounded-full bg-gradient-to-r from-pink-400 to-red-400" />
            </div>
          </div>
        </section>

        <section className="mb-12">
          <div className="space-y-4">
            {webPages.map((page) => (
              <PageCard key={page.href} {...page} />
            ))}
          </div>
        </section>

        <section id="pdf" className="mb-12 rounded-2xl border border-slate-200 bg-white p-6 shadow-lg">
          <SectionHeader
            title="今回お送りする資料"
            subtitle="送付資料の実物をご覧いただけます"
          />
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            {pdfResources.map((pdf) => (
              <PDFCard key={pdf.href} {...pdf} />
            ))}
          </div>
        </section>


        <CTASection />
      </div>
    </div>
  );
}

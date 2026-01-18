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
        <section className="mb-12 text-center">
          <h1 className="mb-4 animate-fade-in-up text-3xl font-bold text-navy-800 sm:text-4xl">
            資料請求
            <br />
            ありがとうございます！
          </h1>
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

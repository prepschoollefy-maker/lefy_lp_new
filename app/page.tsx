import { BookOpen, Coins } from 'lucide-react';
import { PDFCard } from '@/components/lefy/pdf-card';
import { PageCard } from '@/components/lefy/page-card';
import { SectionHeader } from '@/components/lefy/section-header';
import { CTASection } from '@/components/lefy/cta-section';

const pdfResources = [
  {
    title: 'パンフレット',
    description: '講師紹介・指導体制など',
    href: 'https://xn----17tzfsi7izese635z79az7km36a8rso6h.my.canva.site/dag-elfuxj8',
  },
  {
    title: '授業料・システムのご案内',
    description: '料金体系とシステムの詳細',
    href: 'https://xn----17tzfsi7izese635z79az7km36a8rso6h.my.canva.site/tuition-system',
  },
  {
    title: '【中学受験】1対1個別指導の使い方-わが子の力を最大化する-',
    description: '個別指導の効果的な活用方法',
    href: '/送付資料_中学受験.pdf',
  },
  {
    title: '中高一貫校生 定期テスト対策／大学受験対策',
    description: '1対1の個別指導で一人ひとりに最適な学習を',
    href: 'https://xn----17tzfsi7izese635z79az7km36a8rso6h.my.canva.site/dagkothlcoi',
  },
];

export default function Home() {
  const showIkkanPage = process.env.NEXT_PUBLIC_SHOW_IKKAN_PAGE === 'true';

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-blue-50/30">
      <div className="mx-auto max-w-3xl px-4 py-8">
        <section className="mb-12 text-center">
          <h1 className="mb-4 animate-fade-in-up text-3xl font-bold text-navy-800 sm:text-4xl">
            資料請求
            <br />
            ありがとうございます！
          </h1>
          <p className="mb-2 text-base leading-relaxed text-navy-700">
            郵送資料が届くまでに2日ほどかかる場合がございます。
          </p>
          <p className="mb-2 text-base leading-relaxed text-navy-700">
            本ページでは、郵送資料の要点をまとめておりますので、お手軽にご確認いただけます。
          </p>
        </section>

        <section className="mb-12">
          <div className="space-y-4">
            {/* 中学受験向け */}
            <PageCard
              title="LEFYってどんな塾？"
              summary={
                <>
                  <span className="font-semibold text-red-600">SAPIX、グノーブル、四谷大塚、日能研</span>
                  など大手集団塾生の偏差値向上を狙います。個別だけの中学受験も対応。
                </>
              }
              points={['どんな生徒が通ってるの？', 'LEFYの活用の仕方は？', 'LEFYでの偏差値UP／合格事例']}
              href="/about"
              icon={BookOpen}
              label={showIkkanPage ? '中学受験生向け' : undefined}
            />

            {/* 中高一貫校向け（開発中は表示、本番は非表示） */}
            {showIkkanPage && (
              <PageCard
                title="LEFYってどんな塾？"
                summary="中高一貫校生・大学受験生向け。学校の定期テスト対策から大学受験まで対応。"
                points={['どんな生徒が通ってるの？', 'LEFYの活用の仕方は？', '成績UP／合格実績']}
                href="/about-ikkan"
                icon={BookOpen}
                label="中高一貫校・大学受験向け"
              />
            )}

            {/* 授業料／システム */}
            <PageCard
              title="授業料／システム"
              summary="単純明快なシステム。思わぬ追加費用はありません。"
              points={['料金の目安が分かる', '時間割', '教室風景']}
              href="/pricing"
              icon={Coins}
            />
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

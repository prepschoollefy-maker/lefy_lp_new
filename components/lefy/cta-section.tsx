import Link from 'next/link';

interface CTASectionProps {
  variant?: 'default' | 'compact';
}

export function CTASection({ variant = 'default' }: CTASectionProps) {
  if (variant === 'compact') {
    return (
      <div className="rounded-lg border border-navy-100 bg-navy-50/50 p-6">
        <p className="mb-4 text-sm text-navy-700">
          ご不明点や学習状況の整理は、無料でご相談いただけます。
        </p>
        <div className="flex flex-col gap-3 sm:flex-row">
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
            href="tel:0456209150"
            className="flex items-center justify-center gap-2 rounded-lg bg-white py-3 px-6 text-base font-bold text-red-600 shadow-lg transition-all hover:bg-gray-50"
            style={{ border: '2px solid #e5e7eb' }}
          >
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
            </svg>
            045-620-9150
          </a>
        </div>
      </div>
    );
  }

  return (
    <section className="rounded-2xl bg-gradient-to-br from-navy-600 to-navy-700 p-8 shadow-2xl">
      <h2 className="mb-3 text-xl font-bold text-white">
        お気軽にご相談ください
      </h2>
      <p className="mb-6 text-base leading-relaxed text-navy-100">
        近年の中学受験は入試問題のレベルが非常に高くなっているため、直前対策だけでは間に合いません。
        <br className="hidden sm:block" />
        日々の勉強がうまく回らないと思っている間にあっという間に6年生を迎えてしまいます。
        <br className="hidden sm:block" />
        着実に伸びる勉強サイクルを今すぐ実現しましょう。
      </p>
      <div className="flex flex-col gap-3 sm:flex-row">
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
          href="tel:0456209150"
          className="flex items-center justify-center gap-2 rounded-lg bg-white py-3 px-6 text-base font-bold text-red-600 shadow-lg transition-all hover:bg-gray-50"
          style={{ border: '2px solid #e5e7eb' }}
        >
          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
          </svg>
          045-620-9150
        </a>
      </div>
    </section>
  );
}

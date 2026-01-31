'use client';

import Link from 'next/link';
import { ArrowLeft, FileText, Clock, Shield } from 'lucide-react';
import { CTASection } from '@/components/lefy/cta-section';
import { SectionHeader } from '@/components/lefy/section-header';
import { FeeSimulator } from '@/components/tuition/fee-simulator';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqs = [
  {
    question: '週何コマから始められますか？',
    answer: '週1コマからご受講いただけます。',
  },
  {
    question: '途中でコマ数を変更できますか？',
    answer: '変更可能です。3コマ以上であれば授業のスポット追加も可能です。',
  },
  {
    question: '教材費はかかりますか？',
    answer: '集団塾にお通いで、集団塾のテキストを使用する場合は教材費は発生しません。学力に応じて別途テキストをおすすめしますので、その場合は実費でご準備いただきます。',
  },
  {
    question: '体験授業はありますか？',
    answer: 'はい、無料で体験授業をご受講いただけます。',
  },
  {
    question: '支払い方法は？',
    answer: '口座振替（毎月27日引き落とし）が基本です。初回のみお振込をお願いしております。',
  },
  {
    question: '退塾時の手続きは？',
    answer: '退塾月の前月末までにお申し出いただければ、翌月末での退塾となります。',
  },
];

export default function PricingPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <Link
        href="/"
        className="mb-6 inline-flex items-center gap-1 text-sm text-navy-500 transition-colors hover:text-navy-700"
      >
        <ArrowLeft className="h-4 w-4" />
        トップに戻る
      </Link>

      <section className="mb-8">
        <h1 className="mb-3 text-xl font-bold text-navy-800 sm:text-2xl">
          授業料／システム
        </h1>
        <div className="flex items-center gap-2 text-xs text-navy-400">
          <Clock className="h-3.5 w-3.5" />
          読む目安 1分
        </div>
      </section>

      <section className="mb-8 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50/50 p-6 shadow-sm">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-100">
            <Shield className="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <h3 className="mb-1 text-base font-bold text-navy-800">安心してご検討ください</h3>
            <p className="text-sm leading-relaxed text-navy-600">
              押し売りはしません。料金はシンプルで明確です。ご不明点があればお気軽にお問い合わせください。
            </p>
          </div>
        </div>
      </section>

      <section className="mb-10">
        <FeeSimulator />
      </section>

      <section className="mb-10">
        <SectionHeader title="時間割" />
        <div className="overflow-x-auto rounded-lg border border-navy-100 bg-white">
          <table className="w-full">
            <thead>
              <tr className="border-b border-navy-100 bg-navy-600">
                <th className="px-3 py-2.5 text-left text-xs font-semibold text-white sm:px-4 sm:text-sm"></th>
                <th className="px-3 py-2.5 text-center text-xs font-semibold text-white sm:px-4 sm:text-sm">平日（月～金）</th>
                <th className="px-3 py-2.5 text-center text-xs font-semibold text-white sm:px-4 sm:text-sm">土</th>
                <th className="px-3 py-2.5 text-center text-xs font-semibold text-white sm:px-4 sm:text-sm">日</th>
                <th className="px-3 py-2.5 text-center text-xs font-semibold text-white sm:px-4 sm:text-sm">講習期間</th>
              </tr>
            </thead>
            <tbody className="bg-slate-50">
              {[
                { time: '12:30-13:50', weekday: '×', sat: '×', sun: '○', lesson: '○' },
                { time: '14:00-15:20', weekday: '×', sat: '○', sun: '○', lesson: '○' },
                { time: '15:30-16:50', weekday: '×', sat: '○', sun: '○', lesson: '○' },
                { time: '17:00-18:20', weekday: '○', sat: '○', sun: '○', lesson: '△' },
                { time: '18:30-19:50', weekday: '○', sat: '○', sun: '○', lesson: '△' },
                { time: '20:00-21:20', weekday: '○', sat: '○', sun: '×', lesson: '△' },
              ].map((row, index) => (
                <tr key={index} className={index !== 5 ? 'border-b border-navy-100' : ''}>
                  <td className="bg-white px-3 py-2.5 text-xs font-medium text-navy-700 sm:px-4 sm:text-sm">{row.time}</td>
                  <td className="px-3 py-2.5 text-center text-sm text-navy-600 sm:text-base">{row.weekday}</td>
                  <td className="px-3 py-2.5 text-center text-sm text-navy-600 sm:text-base">{row.sat}</td>
                  <td className="px-3 py-2.5 text-center text-sm text-navy-600 sm:text-base">{row.sun}</td>
                  <td className="px-3 py-2.5 text-center text-sm text-navy-600 sm:text-base">{row.lesson}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-xs leading-relaxed text-navy-500">
          ※○の時間帯でご受講可能です。ただし、学校が終わる時間等によっては、△、×の箇所でも対応できる可能性がございますので、ご相談ください。
        </p>
      </section>

      <section className="mb-10">
        <SectionHeader title="教室風景" />
        <div className="overflow-hidden rounded-xl border border-navy-100 bg-white shadow-sm">
          <video
            controls
            className="w-full"
            preload="metadata"
          >
            <source src="/classroom-tour.mov" type="video/quicktime" />
            <source src="/classroom-tour.mov" type="video/mp4" />
            お使いのブラウザは動画タグをサポートしていません。
          </video>
        </div>
      </section>

      <section className="mb-10">
        <SectionHeader title="よくある質問" />
        <Accordion type="single" collapsible className="rounded-lg border border-navy-100 bg-white">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className={index !== faqs.length - 1 ? 'border-b border-navy-100' : ''}
            >
              <AccordionTrigger className="px-4 py-3 text-left text-sm font-medium text-navy-700 hover:no-underline">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-3 text-sm text-navy-500">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>



      <CTASection />
    </div>
  );
}

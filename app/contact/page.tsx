import Link from 'next/link';
import { ArrowLeft, Clock, Calendar, MessageCircle } from 'lucide-react';

export default function ContactPage() {
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
          無料の学習戦略診断
        </h1>
        <p className="text-sm text-navy-600">
          今の学習状況と志望校に合わせて、やることを整理します。
        </p>
      </section>

      <section className="mb-8 rounded-lg border border-navy-100 bg-navy-50/30 p-4">
        <div className="flex items-start gap-2">
          <Clock className="mt-0.5 h-4 w-4 shrink-0 text-navy-500" />
          <div>
            <p className="text-sm font-medium text-navy-700">所要時間：約30分</p>
            <p className="text-xs text-navy-500">オンラインまたは教室で実施</p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <a
          href="https://example.com/contact-form"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-4 rounded-lg border border-navy-100 bg-white p-4 transition-shadow hover:shadow-md"
        >
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-orange-100">
            <Calendar className="h-6 w-6 text-orange-600" />
          </div>
          <div>
            <p className="text-sm font-semibold text-navy-800">Webで日程を予約</p>
            <p className="text-xs text-navy-500">24時間いつでもお申し込み可能</p>
          </div>
        </a>

        <a
          href="https://line.me/example"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-4 rounded-lg border border-navy-100 bg-white p-4 transition-shadow hover:shadow-md"
        >
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-green-100">
            <MessageCircle className="h-6 w-6 text-green-600" />
          </div>
          <div>
            <p className="text-sm font-semibold text-navy-800">LINEで相談・予約</p>
            <p className="text-xs text-navy-500">お気軽にメッセージをお送りください</p>
          </div>
        </a>
      </section>
    </div>
  );
}

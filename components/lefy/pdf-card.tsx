import { FileText, ExternalLink } from 'lucide-react';
import Link from 'next/link';

interface PDFCardProps {
  title: string;
  description: string;
  readTime?: string;
  href: string;
}

export function PDFCard({ title, description, readTime, href }: PDFCardProps) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col rounded-xl border-2 border-slate-200 bg-gradient-to-br from-white to-slate-50 p-4 transition-all duration-300 hover:border-blue-300 hover:shadow-xl"
    >
      <div className="mb-3 flex items-center justify-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg transition-transform group-hover:scale-110">
          <FileText className="h-8 w-8 text-white" />
        </div>
      </div>

      <h3 className="mb-2 text-center text-sm font-bold text-navy-800 leading-snug">
        {title}
      </h3>

      <p className="mb-3 text-center text-xs text-gray-600">
        {description}
      </p>

      {readTime && (
        <div className="mt-auto flex items-center justify-center gap-2 text-xs text-gray-500">
          <span>読む目安 {readTime}</span>
        </div>
      )}

      <div className="mt-2 flex items-center justify-center gap-1 text-xs font-semibold text-blue-600 transition-all group-hover:gap-2">
        <span>詳細を見る</span>
        <ExternalLink className="h-3 w-3" />
      </div>
    </Link>
  );
}

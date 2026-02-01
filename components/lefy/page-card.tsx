import { Clock, ChevronRight, LucideIcon } from 'lucide-react';
import Link from 'next/link';
import { ReactNode } from 'react';

interface PageCardProps {
  title: string;
  summary: string | ReactNode;
  points: string[];
  readTime: string;
  href: string;
  icon: LucideIcon;
  label?: string;
}

export function PageCard({ title, summary, points, readTime, href, icon: Icon, label }: PageCardProps) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group block rounded-xl border border-navy-100 bg-white p-5 shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-orange-300 hover:shadow-2xl"
    >
      <div className="mb-3 flex items-start gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-navy-400 to-navy-600 shadow-lg transition-transform group-hover:scale-110">
          <Icon className="h-6 w-6 text-white" />
        </div>
        <div className="flex-1">
          {label && (
            <span className="mb-1 inline-block rounded-full bg-navy-100 px-2 py-0.5 text-xs font-semibold text-navy-700">
              {label}
            </span>
          )}
          <h3 className="text-lg font-bold text-navy-800">{title}</h3>
          <p className="mt-1.5 text-base text-gray-600">{summary}</p>
        </div>
      </div>

      <div className="mb-3 rounded-lg border border-blue-100 bg-gradient-to-br from-blue-50/50 to-indigo-50/30 p-3">
        <p className="mb-2 text-xs font-bold uppercase tracking-wide text-blue-700">このページで分かること</p>
        <div className="space-y-1.5">
          {points.map((point, index) => (
            <p key={index} className="flex items-start gap-2 text-sm text-navy-700">
              <span className="mt-0.5 flex h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500"></span>
              {point}
            </p>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between">
        <span className="flex items-center gap-1 text-sm text-gray-500">
          <Clock className="h-3 w-3" />
          読む目安 {readTime}
        </span>
        <span className="flex items-center gap-1.5 text-base font-semibold text-navy-600 transition-all group-hover:gap-2 group-hover:text-navy-500">
          ページを開く
          <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}

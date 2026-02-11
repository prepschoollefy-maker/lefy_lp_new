import Link from 'next/link';
import Image from 'next/image';

interface FooterProps {
  logoHref?: string;
}

export function Footer({ logoHref = "/" }: FooterProps) {
  const isExternal = logoHref.startsWith('http');

  return (
    <footer className="border-t border-navy-100 bg-white">
      <div className="mx-auto max-w-4xl px-4 py-8">
        <div className="flex flex-col items-center gap-4 text-center">
          {isExternal ? (
            <a href={logoHref} className="inline-block">
              <Image
                src="/lefy-logo.png"
                alt="LEFY"
                width={120}
                height={40}
                priority
              />
            </a>
          ) : (
            <Link href={logoHref} className="inline-block">
              <Image
                src="/lefy-logo.png"
                alt="LEFY"
                width={120}
                height={40}
                priority
              />
            </Link>
          )}
          <p className="text-xs text-navy-500">中学受験個別指導塾</p>

          <nav className="flex flex-wrap justify-center gap-4 text-xs text-navy-500">
            <Link href="https://lefy.jp/privacy-policy/" target="_blank" rel="noopener noreferrer" className="hover:text-navy-700">プライバシーポリシー</Link>
            <Link href="https://lefy.jp/contact/" target="_blank" rel="noopener noreferrer" className="hover:text-navy-700">お問い合わせ</Link>
          </nav>


          <p className="text-xs text-navy-400">
            &copy; {new Date().getFullYear()} LEFY. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

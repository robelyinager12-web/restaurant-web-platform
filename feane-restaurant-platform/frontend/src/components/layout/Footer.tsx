// File: frontend/src/components/layout/Footer.tsx
import Link from 'next/link';
import { Instagram, Facebook, Twitter } from 'lucide-react';
import { Logo } from './Logo';
import { useLanguage } from '../../context/LanguageContext';

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-white/10 bg-brand-dark pt-16">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 pb-10 sm:grid-cols-2 md:grid-cols-4 md:px-10">
        <div>
          <Logo />
          <p className="mt-3 text-sm text-white/50">{t.footer.tagline}</p>
          <div className="mt-5 flex gap-4 text-white/50">
            <a href="#" aria-label="Instagram" className="hover:text-brand-gold"><Instagram size={18} /></a>
            <a href="#" aria-label="Facebook" className="hover:text-brand-gold"><Facebook size={18} /></a>
            <a href="#" aria-label="Twitter" className="hover:text-brand-gold"><Twitter size={18} /></a>
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold text-white">{t.footer.quickLinks}</p>
          <div className="mt-4 flex flex-col gap-2 text-sm text-white/50">
            <Link href="/" className="hover:text-brand-gold">{t.footer.home}</Link>
            <Link href="/menu" className="hover:text-brand-gold">{t.footer.menu}</Link>
            <Link href="/about" className="hover:text-brand-gold">{t.footer.about}</Link>
            <Link href="/book-table" className="hover:text-brand-gold">{t.footer.bookTable}</Link>
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold text-white">{t.footer.account}</p>
          <div className="mt-4 flex flex-col gap-2 text-sm text-white/50">
            <Link href="/login" className="hover:text-brand-gold">{t.footer.signIn}</Link>
            <Link href="/register" className="hover:text-brand-gold">{t.footer.register}</Link>
            <Link href="/cart" className="hover:text-brand-gold">{t.footer.cart}</Link>
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold text-white">{t.footer.contactHeading}</p>
          <div className="mt-4 flex flex-col gap-2 text-sm text-white/50">
            <span>Injibara, Ethiopia</span>
            <span>+251 00 000 0000</span>
            <span>hello@feane.local</span>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 py-6 text-center text-xs text-white/30">
        © {new Date().getFullYear()} Feane. {t.footer.rightsReserved}
      </div>
    </footer>
  );
}
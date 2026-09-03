// File: frontend/src/components/layout/Logo.tsx
import Link from 'next/link';

interface Props {
  onClick?: () => void;
}

export function Logo({ onClick }: Props) {
  return (
    <Link href="/" onClick={onClick} className="flex items-center gap-2.5">
      <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-brand-gold text-sm font-bold text-brand-dark">
        FE
      </span>
      <span className="font-display text-2xl italic text-white">Feane</span>
    </Link>
  );
}
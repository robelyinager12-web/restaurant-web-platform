// File: frontend/src/app/layout.tsx
import type { Metadata } from 'next';
import { CartProvider } from '../context/CartContext';
import './globals.css';

export const metadata: Metadata = {
  title: 'Feane — Fast Food Restaurant',
  description: 'Order your favorite fast food online, or book a table at Feane.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-brand-dark text-white antialiased">
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
import './globals.css';
import { ReactNode } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export const metadata = {
  title: 'Zen Habit',
  description: 'A gamified habit tracker to build zen routines and grow your virtual garden.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main className="container" style={{ padding: '2rem 0' }}>{children}</main>
        <Footer />
      </body>
    </html>
  );
}

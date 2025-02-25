import './globals.css';
import { ReactNode } from 'react';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import { ThemeProvider } from './context/ThemeContext';

export const metadata = {
  title: 'Zen Habit',
  description: 'A gamified habit tracker to build zen routines and grow your virtual garden.',
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          <Header />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
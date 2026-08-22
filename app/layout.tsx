import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Cumpleaños de Valeria',
  description: 'Una noche para brillar juntos. 14 de noviembre de 2026.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="es"><body>{children}</body></html>;
}

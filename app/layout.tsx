import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'AI Horizon: SAGE University Bhopal Tech Blog',
  description: 'Official AI technical research blog of SAGE University Bhopal showcasing frontier AI developments, campus innovations, and technical deep dives.',
  keywords: ['AI Blog', 'SAGE University Bhopal', 'Generative AI', 'Computer Vision', 'Agentic Systems', 'Machine Learning Research'],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="bg-zinc-950 text-zinc-100 antialiased min-h-screen flex flex-col justify-between">
        <div>
          <Navbar />
          <main>{children}</main>
        </div>
        <Footer />
      </body>
    </html>
  );
}

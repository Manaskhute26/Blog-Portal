import Link from 'next/link';

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-zinc-950/95 border-b border-zinc-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand / Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-3 h-3 bg-zinc-100 rounded-none group-hover:bg-zinc-400 transition-colors" />
            <div className="flex flex-col">
              <span className="font-mono text-sm tracking-widest text-zinc-100 uppercase font-semibold">
                AI HORIZON
              </span>
              <span className="font-mono text-[10px] text-zinc-500 tracking-wider">
                SAGE UNIVERSITY BHOPAL
              </span>
            </div>
          </Link>

          {/* Navigation Links */}
          <nav className="flex items-center space-x-6 sm:space-x-8 font-mono text-xs tracking-wide">
            <Link 
              href="/" 
              className="text-zinc-300 hover:text-white transition-colors"
            >
              // ARTICLES
            </Link>
            <Link 
              href="/campus" 
              className="text-zinc-400 hover:text-white transition-colors hidden sm:inline-block"
            >
              // CAMPUS_SPOTLIGHT
            </Link>
            <Link 
              href="/about" 
              className="text-zinc-400 hover:text-white transition-colors"
            >
              // ABOUT
            </Link>
          </nav>

          {/* Right Status Badge */}
          <div className="hidden md:flex items-center space-x-2 font-mono text-[11px] text-zinc-400 border border-zinc-800 px-2.5 py-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>BHOPAL.AI_NODE</span>
          </div>
        </div>
      </div>
    </header>
  );
}

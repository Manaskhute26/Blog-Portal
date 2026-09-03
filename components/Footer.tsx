import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t border-zinc-800 bg-zinc-950 mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12 font-mono text-xs">
          {/* Col 1: About */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center space-x-2">
              <div className="w-2.5 h-2.5 bg-zinc-100" />
              <span className="text-zinc-100 font-semibold tracking-wider uppercase">
                AI HORIZON // SAGE UNIVERSITY
              </span>
            </div>
            <p className="font-sans text-xs text-zinc-400 max-w-md leading-relaxed">
              Official technical research blog of SAGE University Bhopal. Publishing frontier research in Generative AI, Computer Vision, Agentic Workflows, and Campus Innovation.
            </p>
          </div>

          {/* Col 2: Categories */}
          <div className="space-y-2">
            <span className="text-zinc-200 uppercase font-semibold block mb-3">// RESEARCH_AREAS</span>
            <ul className="space-y-1.5 text-zinc-400">
              <li><Link href="/" className="hover:text-zinc-200 transition-colors">&gt; Generative AI</Link></li>
              <li><Link href="/" className="hover:text-zinc-200 transition-colors">&gt; Computer Vision</Link></li>
              <li><Link href="/" className="hover:text-zinc-200 transition-colors">&gt; Agentic Systems</Link></li>
              <li><Link href="/" className="hover:text-zinc-200 transition-colors">&gt; Campus Spotlight</Link></li>
            </ul>
          </div>

          {/* Col 3: University details */}
          <div className="space-y-2">
            <span className="text-zinc-200 uppercase font-semibold block mb-3">// CAMPUS_LOCATION</span>
            <p className="text-zinc-400 font-sans text-xs">
              SAGE University Bhopal<br />
              Katara Extension, Sahara Bypass Road<br />
              Bhopal, Madhya Pradesh - 462022
            </p>
          </div>
        </div>

        {/* Hairline Bottom Bar */}
        <div className="pt-6 border-t border-zinc-800/80 flex flex-col sm:flex-row justify-between items-center font-mono text-[11px] text-zinc-500 gap-4">
          <div>
            &copy; {new Date().getFullYear()} SAGE University Bhopal. All rights reserved.
          </div>
          <div className="flex space-x-6">
            <span>SYS_VERSION: 1.0.0</span>
            <span>STATUS: ONLINE</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

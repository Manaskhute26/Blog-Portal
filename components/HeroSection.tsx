export function HeroSection() {
  return (
    <section className="py-16 border-b border-zinc-800 bg-zinc-950">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-6">
          {/* Monospace Metadata Tag */}
          <div className="inline-flex items-center space-x-2 border border-zinc-800 bg-zinc-900/50 px-3 py-1 font-mono text-xs text-zinc-400">
            <span className="w-2 h-2 bg-zinc-400"></span>
            <span>SAGE UNIVERSITY BHOPAL // DEPARTMENT OF AI &amp; DATA SCIENCE</span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white font-sans max-w-4xl leading-[1.1]">
            AI Horizon: SAGE University Bhopal Tech Blog
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-zinc-400 font-sans max-w-2xl font-normal leading-relaxed">
            Exploring global developments in Artificial Intelligence, machine learning theory, campus engineering projects, and technical deep dives.
          </p>

          {/* Stats / Quick Info hairline bar */}
          <div className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-4 font-mono text-xs text-zinc-400 border-t border-zinc-900">
            <div>
              <span className="text-zinc-500 block uppercase text-[10px]">// LOCATION</span>
              <span className="text-zinc-200">BHOPAL, MP, INDIA</span>
            </div>
            <div>
              <span className="text-zinc-500 block uppercase text-[10px]">// CORE FOCUS</span>
              <span className="text-zinc-200">GENAI &amp; AGENTIC SYSTEMS</span>
            </div>
            <div>
              <span className="text-zinc-500 block uppercase text-[10px]">// FORMAT</span>
              <span className="text-zinc-200">MDX + LATEX + CODE</span>
            </div>
            <div>
              <span className="text-zinc-500 block uppercase text-[10px]">// ENGINE</span>
              <span className="text-zinc-200">GEMINI AI SUMMARIZER</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

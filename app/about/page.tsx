import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About // AI Horizon | SAGE University Bhopal',
  description: 'AI Horizon is a student-led publication exploring the frontiers of agentic systems, multimodal models, and modern software engineering at SAGE University Bhopal.',
};

export default function AboutPage() {
  const pillars = [
    {
      code: '01 // ARCHITECTURE',
      title: 'Frontier Models',
      desc: 'Architectural breakdowns of large language models, attention mechanisms, cross-modal projections, and theoretical policy optimization.',
    },
    {
      code: '02 // INFRASTRUCTURE',
      title: 'Systems & Engineering',
      desc: 'Production full-stack implementations, autonomous agentic workflows, low-latency API architectures, and scalable database systems.',
    },
    {
      code: '03 // EXPERIMENTATION',
      title: 'Campus R&D',
      desc: 'Applied machine learning, IoT edge nodes, precision agriculture sensors, and collaborative prototypes developed in SAGE University labs.',
    },
  ];

  const colophon = [
    { label: 'FRAMEWORK', value: 'Next.js 14 (App Router)' },
    { label: 'STYLING', value: 'Tailwind CSS (Minimalist UI)' },
    { label: 'DATABASE', value: 'MongoDB Atlas' },
    { label: 'INTELLIGENCE', value: 'Gemini API (Dynamic Summarization)' },
    { label: 'MATH ENGINE', value: 'KaTeX & Remark-Math' },
    { label: 'TYPE SAFETY', value: 'TypeScript 5.x' },
  ];

  const contributors = [
    {
      name: 'Dr. Arvind Sharma',
      role: 'Faculty Advisor & Head of AI Research',
      github: 'https://github.com',
      linkedin: 'https://linkedin.com',
    },
    {
      name: 'Manas Khute',
      role: 'Lead Full-Stack Architect & Editor',
      github: 'https://github.com',
      linkedin: 'https://linkedin.com',
    },
    {
      name: 'Priya Verma',
      role: 'Edge Computing & Vision Systems Lead',
      github: 'https://github.com',
      linkedin: 'https://linkedin.com',
    },
    {
      name: 'Dr. Rajesh Kumar',
      role: 'Research Mentor, Dept. of Computer Science',
      github: 'https://github.com',
      linkedin: 'https://linkedin.com',
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Header */}
      <header className="space-y-4 border-b border-zinc-800 pb-8">
        <div className="flex items-center space-x-2 font-mono text-xs text-zinc-500">
          <span className="w-2 h-2 bg-zinc-400 rounded-none" />
          <span className="uppercase tracking-wider font-semibold text-zinc-400">
            // SAGE_AI_BLOG // ABOUT_INITIATIVE
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-sans">
          About AI Horizon
        </h1>
        <p className="font-mono text-xs text-zinc-500 uppercase tracking-wider">
          SAGE UNIVERSITY BHOPAL // EST. 2026
        </p>
      </header>

      {/* Section 1: The Mission */}
      <section className="space-y-4">
        <div className="font-mono text-xs text-zinc-500 uppercase tracking-wider">
          // 01_MISSION
        </div>
        <h2 className="text-2xl font-bold text-white font-sans tracking-tight">
          The Mission
        </h2>
        <p className="text-lg sm:text-xl text-zinc-300 font-sans leading-relaxed border-l-2 border-zinc-700 pl-4 py-1">
          AI Horizon is a student-led publication exploring the frontiers of agentic systems, multimodal models, and modern software engineering at SAGE University Bhopal.
        </p>
        <p className="text-zinc-400 font-sans text-base leading-relaxed">
          Rooted in the research culture of Central India, our goal is to bridge theoretical machine learning research with practical, production-ready software systems. We demystify frontier AI literature into reproducible code, benchmarks, and actionable engineering dispatches.
        </p>
      </section>

      {/* Section 2: What We Cover (Core Pillars) */}
      <section className="space-y-6 pt-12 border-t border-zinc-800">
        <div>
          <div className="font-mono text-xs text-zinc-500 uppercase tracking-wider mb-2">
            // 02_CORE_PILLARS
          </div>
          <h2 className="text-2xl font-bold text-white font-sans tracking-tight">
            What We Cover
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pillars.map((pillar) => (
            <div
              key={pillar.title}
              className="bg-zinc-950 border border-zinc-800 p-6 flex flex-col justify-between hover:border-zinc-700 transition-colors space-y-4"
            >
              <div className="space-y-2">
                <span className="font-mono text-[10px] text-zinc-500 block uppercase tracking-wider">
                  {pillar.code}
                </span>
                <h3 className="text-lg font-bold text-white font-sans tracking-tight">
                  {pillar.title}
                </h3>
              </div>
              <p className="text-xs font-sans text-zinc-400 leading-relaxed">
                {pillar.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Section 3: Colophon */}
      <section className="space-y-6 pt-12 border-t border-zinc-800">
        <div>
          <div className="font-mono text-xs text-zinc-500 uppercase tracking-wider mb-2">
            // 03_SYSTEM_SPECIFICATIONS
          </div>
          <h2 className="text-2xl font-bold text-white font-sans tracking-tight">
            Colophon &amp; Stack
          </h2>
          <p className="text-zinc-400 font-sans text-sm mt-1">
            Engineered under the principle of strategic minimalism — no heavy frameworks, zero runtime bloat, and pure aesthetic utility.
          </p>
        </div>

        <div className="border border-zinc-800 bg-zinc-950 p-6 space-y-3 font-mono text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {colophon.map((item) => (
              <div
                key={item.label}
                className="flex items-center justify-between border-b border-zinc-900 pb-2"
              >
                <span className="text-zinc-500">{item.label}:</span>
                <span className="text-zinc-300 font-semibold">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4: Contributors */}
      <section className="space-y-6 pt-12 border-t border-zinc-800">
        <div>
          <div className="font-mono text-xs text-zinc-500 uppercase tracking-wider mb-2">
            // 04_EDITORIAL_TEAM
          </div>
          <h2 className="text-2xl font-bold text-white font-sans tracking-tight">
            Contributors &amp; Editors
          </h2>
          <p className="text-zinc-400 font-sans text-sm mt-1">
            Research faculty, graduate fellows, and undergraduate software engineers at SAGE University Bhopal.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {contributors.map((member) => (
            <div
              key={member.name}
              className="border border-zinc-800 bg-zinc-950 p-4 space-y-2 hover:border-zinc-700 transition-colors"
            >
              <div className="flex items-center justify-between">
                <span className="font-sans text-sm font-semibold text-white">
                  {member.name}
                </span>
                <div className="flex items-center space-x-3 font-mono text-xs text-zinc-500">
                  <a
                    href={member.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-zinc-300 transition-colors underline underline-offset-2"
                  >
                    gh
                  </a>
                  <span>/</span>
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-zinc-300 transition-colors underline underline-offset-2"
                  >
                    in
                  </a>
                </div>
              </div>
              <p className="font-mono text-[11px] text-zinc-500">
                {member.role}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer Return */}
      <div className="pt-12 border-t border-zinc-800 font-mono text-xs flex justify-between items-center text-zinc-500">
        <span>SAGE UNIVERSITY BHOPAL // AI RESEARCH</span>
        <Link href="/" className="text-zinc-300 hover:text-white underline">
          [ RETURN_TO_FEED ]
        </Link>
      </div>
    </div>
  );
}


import React from 'react';
import { compileMDX } from 'next-mdx-remote/rsc';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

interface MDXContentProps {
  source: string;
}

/**
 * Strips outer markdown/mdx code fences (e.g. ```mdx ... ```) if an author
 * or LLM pasted the entire article wrapped inside a code fence block.
 */
function sanitizeSource(raw: string): string {
  let cleaned = raw.trim();
  if (cleaned.startsWith('```')) {
    cleaned = cleaned.replace(/^```(?:mdx|markdown|md)?\s*\n?/i, '');
    cleaned = cleaned.replace(/\n?```\s*$/i, '');
  }
  return cleaned;
}

export async function MDXContent({ source }: MDXContentProps) {
  const sanitizedSource = sanitizeSource(source);

  const { content } = await compileMDX({
    source: sanitizedSource,
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        remarkPlugins: [remarkMath],
        rehypePlugins: [rehypeKatex],
      },
    },
    components: {
      h1: (props) => (
        <h1 className="text-3xl sm:text-4xl font-bold text-white font-sans mt-12 mb-6 tracking-tight" {...props} />
      ),
      h2: (props) => (
        <h2 className="text-2xl sm:text-3xl font-bold text-zinc-100 font-sans mt-12 mb-4 tracking-tight border-b border-zinc-800 pb-2" {...props} />
      ),
      h3: (props) => (
        <h3 className="text-xl sm:text-2xl font-semibold text-zinc-200 font-sans mt-8 mb-3 tracking-tight" {...props} />
      ),
      p: (props) => (
        <p className="text-zinc-300 font-sans text-base sm:text-lg leading-relaxed mb-6 font-normal" {...props} />
      ),
      ul: (props) => (
        <ul className="list-disc list-outside ml-6 space-y-2 mb-6 text-zinc-300 font-sans text-base sm:text-lg leading-relaxed" {...props} />
      ),
      ol: (props) => (
        <ol className="list-decimal list-outside ml-6 space-y-2 mb-6 text-zinc-300 font-sans text-base sm:text-lg leading-relaxed" {...props} />
      ),
      li: (props) => (
        <li className="text-zinc-300 pl-1" {...props} />
      ),
      strong: (props) => (
        <strong className="font-semibold text-white" {...props} />
      ),
      em: (props) => (
        <em className="italic text-zinc-200" {...props} />
      ),
      blockquote: (props) => (
        <blockquote className="border-l-2 border-zinc-700 pl-5 py-2 my-8 italic text-zinc-400 font-sans bg-zinc-900/20" {...props} />
      ),
      code: (props) => {
        const isInline = !props.className?.includes('language-');
        if (isInline) {
          return (
            <code className="font-mono text-xs bg-zinc-900 border border-zinc-800 text-zinc-200 px-1.5 py-0.5 rounded" {...props} />
          );
        }
        return <code className="font-mono text-xs" {...props} />;
      },
      pre: (props) => (
        <div className="my-8 border border-zinc-800 bg-zinc-950 font-mono text-xs">
          <div className="flex items-center justify-between px-4 py-2 bg-zinc-900/90 border-b border-zinc-800 text-[11px] text-zinc-400">
            <span className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-zinc-500 rounded-full" />
              <span>// CODE</span>
            </span>
          </div>
          <div className="p-4 overflow-x-auto text-zinc-200 leading-relaxed">
            <pre {...props} />
          </div>
        </div>
      ),
      hr: () => <hr className="border-zinc-800 my-12" />,
      a: (props) => (
        <a className="text-zinc-100 underline underline-offset-4 decoration-zinc-600 hover:decoration-zinc-300 hover:text-white transition-colors" {...props} />
      ),
    },
  });

  return (
    <div className="prose prose-invert max-w-none text-zinc-300 text-base sm:text-lg leading-relaxed">
      {content}
    </div>
  );
}

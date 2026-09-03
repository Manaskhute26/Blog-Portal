import { getCampusPostsFromDB } from '@/lib/posts';
import { BlogCard } from '@/components/BlogCard';
import type { Metadata } from 'next';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Campus Innovations & Research Dispatch | SAGE AI Horizon',
  description: 'Spotlighting student prototypes, lab research, and technical milestones from SAGE University Bhopal.',
};

export default async function CampusPage() {
  const posts = await getCampusPostsFromDB();

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header Section */}
      <header className="space-y-4 border-b border-zinc-800 pb-8">
        <div className="flex items-center space-x-2 font-mono text-xs text-zinc-500">
          <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
          <span className="uppercase tracking-wider font-semibold text-zinc-400">
            // SAGE_RESEARCH_LABS // CAMPUS_DISPATCH
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-sans">
          Campus Innovations &amp; Research Dispatch
        </h1>
        <p className="text-base sm:text-lg text-zinc-400 font-sans max-w-3xl leading-relaxed">
          Spotlighting student prototypes, lab research, and technical milestones from SAGE University Bhopal.
        </p>
      </header>

      {/* Grid of Campus Posts */}
      {posts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 border border-zinc-800 font-mono text-sm text-zinc-500">
          // NO_CAMPUS_DISPATCHES_FOUND
        </div>
      )}
    </div>
  );
}


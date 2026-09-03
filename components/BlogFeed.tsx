'use client';

import { useState } from 'react';
import { Post } from '@/lib/mdx';
import { BlogCard } from './BlogCard';

interface BlogFeedProps {
  posts: Post[];
}

export function BlogFeed({ posts }: BlogFeedProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  const categories = ['ALL', 'Generative AI', 'Computer Vision', 'Campus Spotlight'];

  const filteredPosts = selectedCategory === 'ALL'
    ? posts
    : posts.filter((post) => post.frontmatter.category === selectedCategory);

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      {/* Category Filter Controls */}
      <div className="flex flex-wrap items-center gap-2 border-b border-zinc-800 pb-4">
        <span className="font-mono text-xs text-zinc-500 uppercase mr-2 tracking-wider">// FILTER:</span>
        {categories.map((category) => {
          const isActive = selectedCategory === category;
          return (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`font-mono text-xs px-3 py-1 border transition-colors ${
                isActive
                  ? 'bg-zinc-100 text-zinc-950 border-zinc-100 font-bold'
                  : 'bg-zinc-950 text-zinc-400 border-zinc-800 hover:border-zinc-600 hover:text-zinc-200'
              }`}
            >
              [ {category.toUpperCase()} ]
            </button>
          );
        })}
      </div>

      {/* Grid of Blog Posts */}
      {filteredPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 border border-zinc-800 font-mono text-sm text-zinc-500">
          // NO_ARTICLES_FOUND_IN_THIS_CATEGORY
        </div>
      )}
    </section>
  );
}

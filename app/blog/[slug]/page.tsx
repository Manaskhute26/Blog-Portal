import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { getPostBySlugFromDB, getAllSlugsFromDB } from '@/lib/posts';
import { MDXContent } from '@/components/MDXContent';
import { SummarizeButton } from '@/components/SummarizeButton';
import type { Metadata } from 'next';

export const dynamicParams = true;

interface PostPageProps {
  params: Promise<{
    slug: string;
  }> | {
    slug: string;
  };
}

export async function generateStaticParams() {
  const slugs = await getAllSlugsFromDB();
  return slugs.map((slug) => ({
    slug,
  }));
}

export async function generateMetadata(props: PostPageProps): Promise<Metadata> {
  const resolved = await Promise.resolve(props.params);
  const slug = resolved?.slug;
  if (!slug) {
    return {
      title: 'Post Not Found | SAGE AI Blog',
    };
  }

  const post = await getPostBySlugFromDB(slug);
  if (!post) {
    return {
      title: 'Post Not Found | SAGE AI Blog',
    };
  }
  return {
    title: `${post.frontmatter.title} | SAGE AI Horizon`,
    description: post.frontmatter.excerpt,
  };
}

export default async function PostPage(props: PostPageProps) {
  const resolved = await Promise.resolve(props.params);
  const slug = resolved?.slug;
  if (!slug) {
    notFound();
  }

  const post = await getPostBySlugFromDB(slug);

  if (!post) {
    notFound();
  }

  const { frontmatter, content } = post;
  const { title, date, category, excerpt, author, thumbnail, readingTime } = frontmatter;

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      {/* Top Navigation */}
      <div className="border-b border-zinc-800 pb-4">
        <Link 
          href="/" 
          className="font-mono text-xs text-zinc-400 hover:text-white transition-colors flex items-center space-x-2"
        >
          <span>&larr;</span>
          <span>// RETURN_TO_FEED</span>
        </Link>
      </div>

      {/* Header Section */}
      <header className="space-y-6">
        {/* Category & Date Metadata */}
        <div className="flex flex-wrap items-center gap-3 font-mono text-xs">
          <span className="border border-zinc-800 bg-zinc-900 px-3 py-1 text-zinc-300 uppercase font-semibold">
            [ {category} ]
          </span>
          <span className="text-zinc-500">•</span>
          <span className="text-zinc-400">{date}</span>
          {readingTime && (
            <>
              <span className="text-zinc-500">•</span>
              <span className="text-zinc-400">{readingTime}</span>
            </>
          )}
        </div>

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.15] font-sans">
          {title}
        </h1>

        {/* Excerpt Lead */}
        <p className="text-lg text-zinc-400 font-sans leading-relaxed border-l-2 border-zinc-800 pl-4 py-1">
          {excerpt}
        </p>

        {/* Author Bio Card */}
        <div className="flex items-center space-x-4 p-4 border border-zinc-800 bg-zinc-950 font-mono text-xs">
          <div className="w-10 h-10 bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-300 font-bold">
            {author.name.charAt(0)}
          </div>
          <div>
            <div className="text-zinc-100 font-semibold">{author.name}</div>
            <div className="text-zinc-500 font-sans text-xs">{author.role}</div>
          </div>
        </div>
      </header>

      {/* Featured Thumbnail */}
      {thumbnail && (
        <div className="relative h-72 sm:h-96 w-full bg-zinc-900 border border-zinc-800 overflow-hidden">
          <Image
            src={thumbnail}
            alt={title}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 1200px) 100vw, 800px"
          />
        </div>
      )}

      {/* Magic Summary Action */}
      <SummarizeButton content={content} title={title} />

      {/* Main Article Content */}
      <div className="pt-6 border-t border-zinc-800">
        <MDXContent source={content} />
      </div>

      {/* Footer Return */}
      <div className="pt-12 border-t border-zinc-800 font-mono text-xs flex justify-between items-center text-zinc-500">
        <span>SAGE UNIVERSITY BHOPAL // AI RESEARCH</span>
        <Link href="/" className="text-zinc-300 hover:text-white underline">
          [ TOP_OF_PAGE ]
        </Link>
      </div>
    </article>
  );
}

import Link from 'next/link';
import Image from 'next/image';
import { Post } from '@/lib/mdx';

interface BlogCardProps {
  post: Post;
}

export function BlogCard({ post }: BlogCardProps) {
  const { slug, frontmatter } = post;
  const { title, date, category, excerpt, thumbnail, readingTime, author } = frontmatter;

  return (
    <article className="group bg-zinc-950 border border-zinc-800 hover:border-zinc-600 transition-all duration-200 flex flex-col justify-between overflow-hidden">
      <div>
        {/* Visual Header / Thumbnail */}
        {thumbnail && (
          <div className="relative h-48 w-full bg-zinc-900 overflow-hidden border-b border-zinc-800">
            <Image
              src={thumbnail}
              alt={title}
              fill
              className="object-cover group-hover:scale-[1.02] transition-transform duration-300 opacity-90 group-hover:opacity-100"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        )}

        <div className="p-6 space-y-4">
          {/* Metadata Row: Category & Date */}
          <div className="flex items-center justify-between font-mono text-[11px] text-zinc-400">
            <span className="border border-zinc-800 bg-zinc-900/60 px-2.5 py-0.5 text-zinc-300 tracking-wider uppercase">
              [ {category} ]
            </span>
            <div className="flex items-center space-x-2 text-zinc-500">
              <span>{date}</span>
              {readingTime && (
                <>
                  <span>•</span>
                  <span>{readingTime}</span>
                </>
              )}
            </div>
          </div>

          {/* Post Title */}
          <h2 className="text-xl font-bold font-sans text-white group-hover:text-zinc-200 tracking-tight leading-snug">
            <Link href={`/blog/${slug}`} className="hover:underline underline-offset-4 decoration-zinc-600">
              {title}
            </Link>
          </h2>

          {/* Excerpt */}
          <p className="text-sm font-sans text-zinc-400 line-clamp-2 leading-relaxed">
            {excerpt}
          </p>
        </div>
      </div>

      {/* Footer / Author & Read Action */}
      <div className="p-6 pt-0 flex items-center justify-between font-mono text-xs border-t border-zinc-900 mt-4">
        <span className="text-zinc-400 font-sans text-xs">
          By {author.name}
        </span>
        <Link 
          href={`/blog/${slug}`} 
          className="text-zinc-300 group-hover:text-white flex items-center space-x-1 font-semibold group-hover:translate-x-0.5 transition-transform"
        >
          <span>READ_ARTICLE</span>
          <span>&rarr;</span>
        </Link>
      </div>
    </article>
  );
}

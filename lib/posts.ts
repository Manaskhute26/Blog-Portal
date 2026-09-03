import { connectToDatabase } from '@/lib/mongodb';
import Post, { IPost } from '@/lib/models/Post';
import type { Post as PostType, PostFrontmatter } from '@/lib/mdx';
import { getAllPosts, getPostBySlug } from '@/lib/mdx';

// ─── Transform MongoDB doc → Component-compatible Post shape ────────
function toPost(doc: IPost): PostType {
  const frontmatter: PostFrontmatter = {
    title: doc.title,
    date: doc.date instanceof Date ? doc.date.toISOString().split('T')[0] : String(doc.date),
    category: doc.category,
    excerpt: doc.excerpt,
    author: {
      name: doc.author?.name || 'SAGE Researcher',
      role: doc.author?.role || 'Contributor',
      avatar: doc.author?.avatar,
    },
    thumbnail: doc.thumbnail,
    readingTime: doc.readingTime,
  };

  return {
    slug: doc.slug,
    frontmatter,
    content: doc.content,
  };
}

// ─── Fetch all published posts (newest first) ───────────────────────
export async function getAllPostsFromDB(): Promise<PostType[]> {
  try {
    await connectToDatabase();
    const docs = await Post.find({ published: true })
      .sort({ date: -1 })
      .lean<IPost[]>()
      .exec();

    if (docs && docs.length > 0) {
      return docs.map(toPost);
    }
  } catch (error) {
    console.warn('MongoDB query failed in getAllPostsFromDB, using local fallback:', error);
  }

  // Graceful fallback to local content (critical for Vercel build time)
  return getAllPosts();
}

// ─── Fetch a single post by slug ────────────────────────────────────
export async function getPostBySlugFromDB(slug: string): Promise<PostType | null> {
  try {
    await connectToDatabase();
    const doc = await Post.findOne({ slug, published: true })
      .lean<IPost>()
      .exec();

    if (doc) {
      return toPost(doc as IPost);
    }
  } catch (error) {
    console.warn(`MongoDB query failed for slug "${slug}", using local fallback:`, error);
  }

  // Graceful fallback to local content
  return getPostBySlug(slug);
}

// ─── Fetch Campus Spotlight posts ──────────────────────────────────
export async function getCampusPostsFromDB(): Promise<PostType[]> {
  try {
    await connectToDatabase();
    const docs = await Post.find({
      published: true,
      $or: [
        { tags: { $in: ['Campus Spotlight', 'Campus'] } },
        { category: 'Campus Spotlight' },
      ],
    })
      .sort({ date: -1 })
      .lean<IPost[]>()
      .exec();

    if (docs && docs.length > 0) {
      return docs.map(toPost);
    }
  } catch (error) {
    console.warn('MongoDB query failed in getCampusPostsFromDB, using local fallback:', error);
  }

  // Graceful fallback
  return getAllPosts().filter((p) => p.frontmatter.category === 'Campus Spotlight');
}

// ─── Get all slugs (for generateStaticParams) ──────────────────────
export async function getAllSlugsFromDB(): Promise<string[]> {
  try {
    await connectToDatabase();
    const docs = await Post.find({ published: true })
      .select('slug')
      .lean<Pick<IPost, 'slug'>[]>()
      .exec();

    if (docs && docs.length > 0) {
      return docs.map((d) => d.slug);
    }
  } catch (error) {
    console.warn('MongoDB query failed in getAllSlugsFromDB, using local fallback:', error);
  }

  // Fallback to all local MDX slugs
  return getAllPosts().map((p) => p.slug);
}

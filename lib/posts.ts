import { connectToDatabase } from '@/lib/mongodb';
import Post, { IPost } from '@/lib/models/Post';
import type { Post as PostType, PostFrontmatter } from '@/lib/mdx';

// ─── Transform MongoDB doc → Component-compatible Post shape ────────
// The existing BlogFeed/BlogCard components expect { slug, frontmatter: {...}, content }
// but MongoDB stores fields flat. This mapper bridges the two.
function toPost(doc: IPost): PostType {
  const frontmatter: PostFrontmatter = {
    title: doc.title,
    date: doc.date instanceof Date ? doc.date.toISOString().split('T')[0] : String(doc.date),
    category: doc.category,
    excerpt: doc.excerpt,
    author: {
      name: doc.author.name,
      role: doc.author.role,
      avatar: doc.author.avatar,
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
  await connectToDatabase();

  const docs = await Post.find({ published: true })
    .sort({ date: -1 })
    .lean<IPost[]>()
    .exec();

  return docs.map(toPost);
}

// ─── Fetch a single post by slug ────────────────────────────────────
export async function getPostBySlugFromDB(slug: string): Promise<PostType | null> {
  await connectToDatabase();

  const doc = await Post.findOne({ slug, published: true })
    .lean<IPost>()
    .exec();

  if (!doc) return null;

  return toPost(doc as IPost);
}

// ─── Fetch Campus Spotlight posts ──────────────────────────────────
export async function getCampusPostsFromDB(): Promise<PostType[]> {
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

  return docs.map(toPost);
}

// ─── Get all slugs (for generateStaticParams) ──────────────────────
export async function getAllSlugsFromDB(): Promise<string[]> {
  await connectToDatabase();

  const docs = await Post.find({ published: true })
    .select('slug')
    .lean<Pick<IPost, 'slug'>[]>()
    .exec();

  return docs.map((d) => d.slug);
}


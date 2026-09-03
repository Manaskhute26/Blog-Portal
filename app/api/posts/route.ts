import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import Post from '@/lib/models/Post';

// POST /api/posts — Create a new blog post
export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();

    const body = await req.json();

    const {
      title,
      slug,
      excerpt,
      content,
      category,
      authorName,
      authorRole,
      thumbnail,
      readingTime,
      tags,
    } = body;

    // ─── Validation ───────────────────────────────────────────
    if (!title?.trim()) {
      return NextResponse.json({ error: 'Title is required' }, { status: 400 });
    }
    if (!slug?.trim()) {
      return NextResponse.json({ error: 'Slug is required' }, { status: 400 });
    }
    if (!excerpt?.trim()) {
      return NextResponse.json({ error: 'Excerpt is required' }, { status: 400 });
    }
    if (!content?.trim()) {
      return NextResponse.json({ error: 'Content is required' }, { status: 400 });
    }
    if (!category?.trim()) {
      return NextResponse.json({ error: 'Category is required' }, { status: 400 });
    }
    if (!authorName?.trim()) {
      return NextResponse.json({ error: 'Author name is required' }, { status: 400 });
    }

    // Check for duplicate slug
    const existing = await Post.findOne({ slug: slug.trim().toLowerCase() });
    if (existing) {
      return NextResponse.json(
        { error: `A post with slug "${slug}" already exists` },
        { status: 409 }
      );
    }

    // Strip accidental outer code fences if author pasted ```mdx ... ```
    let cleanContent = content.trim();
    if (cleanContent.startsWith('```')) {
      cleanContent = cleanContent.replace(/^```(?:mdx|markdown|md)?\s*\n?/i, '').replace(/\n?```\s*$/i, '').trim();
    }

    // ─── Create Post ──────────────────────────────────────────
    const post = await Post.create({
      title: title.trim(),
      slug: slug.trim().toLowerCase(),
      excerpt: excerpt.trim(),
      content: cleanContent,
      date: new Date(),
      category: category.trim(),
      author: {
        name: authorName.trim(),
        role: authorRole?.trim() || 'Contributor',
      },
      thumbnail: thumbnail?.trim() || undefined,
      readingTime: readingTime?.trim() || undefined,
      tags: tags
        ? tags
            .split(',')
            .map((t: string) => t.trim())
            .filter(Boolean)
        : [],
      published: true,
    });

    return NextResponse.json(
      {
        success: true,
        post: {
          title: post.title,
          slug: post.slug,
          id: post._id,
        },
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Error in POST /api/posts:', error);

    // Handle Mongoose validation errors
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((e: any) => e.message);
      return NextResponse.json(
        { error: 'Validation failed', details: messages },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'An error occurred while creating the post' },
      { status: 500 }
    );
  }
}

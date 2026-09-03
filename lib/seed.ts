/**
 * Seed Script — Migrates existing MDX content into MongoDB.
 *
 * Usage:
 *   npm run seed
 *
 * Requires MONGODB_URI in .env.local
 */

// Force Google Public DNS for SRV lookups (some ISP DNS servers refuse SRV queries from Node.js)
import dns from 'dns';
dns.setServers(['8.8.8.8', '8.8.4.4']);

import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// ─── Inline the connection logic (can't import ESM from script) ─────
const MONGODB_URI = process.env.MONGODB_URI;

async function connectDB() {
  if (!MONGODB_URI) {
    throw new Error(
      'MONGODB_URI is not defined. Create a .env.local file with your MongoDB connection string.'
    );
  }
  await mongoose.connect(MONGODB_URI, { bufferCommands: false });
  console.log('✅ Connected to MongoDB');
}

// ─── Inline schema (matching lib/models/Post.ts exactly) ────────────
const AuthorSchema = new mongoose.Schema(
  {
    name:   { type: String, required: true },
    role:   { type: String, required: true },
    avatar: { type: String },
  },
  { _id: false }
);

const PostSchema = new mongoose.Schema(
  {
    title:       { type: String, required: true, trim: true },
    slug:        { type: String, required: true, unique: true, trim: true, lowercase: true },
    excerpt:     { type: String, required: true, trim: true },
    content:     { type: String, required: true },
    date:        { type: Date, required: true, default: Date.now },
    tags:        { type: [String], default: [] },
    category:    { type: String, required: true },
    author:      { type: AuthorSchema, required: true },
    thumbnail:   { type: String },
    readingTime: { type: String },
    published:   { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Post = mongoose.models.Post || mongoose.model('Post', PostSchema);

// ─── Read all .mdx files from content/ ──────────────────────────────
function readMDXPosts() {
  const contentDir = path.join(process.cwd(), 'content');

  if (!fs.existsSync(contentDir)) {
    console.error('❌ content/ directory not found');
    process.exit(1);
  }

  const files = fs.readdirSync(contentDir).filter((f) => f.endsWith('.mdx') || f.endsWith('.md'));

  return files.map((fileName) => {
    const slug = fileName.replace(/\.mdx?$/, '');
    const raw = fs.readFileSync(path.join(contentDir, fileName), 'utf-8');
    const { data, content } = matter(raw);

    return {
      title:       data.title,
      slug,
      excerpt:     data.excerpt,
      content,
      date:        new Date(data.date),
      tags:        data.tags || [],
      category:    data.category,
      author: {
        name: data.author?.name || 'Unknown',
        role: data.author?.role || 'Contributor',
        avatar: data.author?.avatar,
      },
      thumbnail:   data.thumbnail,
      readingTime: data.readingTime,
      published:   true,
    };
  });
}

// ─── Main ───────────────────────────────────────────────────────────
async function main() {
  await connectDB();

  const posts = readMDXPosts();
  console.log(`📄 Found ${posts.length} MDX post(s) to seed.\n`);

  for (const postData of posts) {
    try {
      // Upsert: update if slug exists, otherwise insert
      const result = await Post.findOneAndUpdate(
        { slug: postData.slug },
        postData,
        { upsert: true, new: true, runValidators: true }
      );
      console.log(`  ✅ Seeded: "${result.title}" → slug: ${result.slug}`);
    } catch (err: any) {
      console.error(`  ❌ Failed to seed "${postData.title}":`, err.message);
    }
  }

  console.log('\n🎉 Seeding complete.');
  await mongoose.disconnect();
  process.exit(0);
}

main().catch((err) => {
  console.error('Fatal error during seeding:', err);
  process.exit(1);
});

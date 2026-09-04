'use client';

import { useState, FormEvent } from 'react';
import Link from 'next/link';

const CATEGORIES = ['Generative AI', 'Computer Vision', 'Campus Spotlight', 'AI Systems'];

export default function AdminNewPost() {
  const [form, setForm] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    category: CATEGORIES[0],
    authorName: '',
    authorRole: '',
    thumbnail: '',
    readingTime: '',
    tags: '',
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  // Auto-generate slug from title
  function handleTitleChange(value: string) {
    const slug = value
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
    setForm((prev) => ({ ...prev, title: value, slug }));
  }

  function updateField(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus('submitting');
    setMessage('');

    try {
      const res = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setStatus('success');
        setMessage(`Post created: "${data.post.title}" → /blog/${data.post.slug}`);
        // Reset form
        setForm({
          title: '',
          slug: '',
          excerpt: '',
          content: '',
          category: CATEGORIES[0],
          authorName: '',
          authorRole: '',
          thumbnail: '',
          readingTime: '',
          tags: '',
        });
      } else {
        setStatus('error');
        setMessage(data.error || 'Failed to create post');
      }
    } catch (err) {
      console.error(err);
      setStatus('error');
      setMessage('Network error — could not reach the server');
    }
  }

  // ─── Shared input styles ────────────────────────────────────
  const inputClass =
    'w-full bg-zinc-950 border border-zinc-800 text-zinc-100 font-mono text-sm px-4 py-2.5 focus:outline-none focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 placeholder:text-zinc-600 transition-colors';
  const labelClass = 'block font-mono text-xs text-zinc-400 uppercase tracking-wider mb-1.5';

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      {/* Navigation */}
      <div className="border-b border-zinc-800 pb-4 flex items-center justify-between">
        <Link
          href="/admin/dashboard"
          className="font-mono text-xs text-zinc-400 hover:text-white transition-colors flex items-center space-x-2"
        >
          <span>&larr;</span>
          <span>// RETURN_TO_DASHBOARD</span>
        </Link>
        <span className="font-mono text-[11px] text-zinc-600 uppercase tracking-widest">
          ADMIN // NEW_POST
        </span>
      </div>

      {/* Header */}
      <header className="space-y-2">
        <div className="flex items-center space-x-2 font-mono text-xs text-zinc-400">
          <span className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" />
          <span className="uppercase tracking-wider font-semibold text-zinc-300">
            ADMIN CONSOLE // CREATE NEW ARTICLE
          </span>
        </div>
        <p className="font-sans text-sm text-zinc-500">
          Write a new post and publish it directly to the MongoDB database.
        </p>
      </header>

      {/* Status Messages */}
      {status === 'success' && (
        <div className="font-mono text-xs text-emerald-400 py-3 px-4 border border-emerald-900 bg-emerald-950/20">
          // SUCCESS: {message}
        </div>
      )}
      {status === 'error' && (
        <div className="font-mono text-xs text-red-400 py-3 px-4 border border-red-900 bg-red-950/20">
          // ERROR: {message}
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6 border border-zinc-800 p-6 bg-zinc-950">
        {/* Title */}
        <div>
          <label className={labelClass}>// TITLE *</label>
          <input
            type="text"
            required
            value={form.title}
            onChange={(e) => handleTitleChange(e.target.value)}
            placeholder="e.g. Navigating the Agentic Era"
            className={inputClass}
          />
        </div>

        {/* Slug (auto-generated, editable) */}
        <div>
          <label className={labelClass}>// SLUG *</label>
          <input
            type="text"
            required
            value={form.slug}
            onChange={(e) => updateField('slug', e.target.value)}
            placeholder="auto-generated-from-title"
            className={inputClass}
          />
          <p className="font-mono text-[10px] text-zinc-600 mt-1">
            URL path: /blog/{form.slug || '...'}
          </p>
        </div>

        {/* Category + Reading Time Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>// CATEGORY *</label>
            <select
              required
              value={form.category}
              onChange={(e) => updateField('category', e.target.value)}
              className={inputClass}
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelClass}>// READING TIME</label>
            <input
              type="text"
              value={form.readingTime}
              onChange={(e) => updateField('readingTime', e.target.value)}
              placeholder="e.g. 5 min read"
              className={inputClass}
            />
          </div>
        </div>

        {/* Author Name + Role Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>// AUTHOR NAME *</label>
            <input
              type="text"
              required
              value={form.authorName}
              onChange={(e) => updateField('authorName', e.target.value)}
              placeholder="e.g. Dr. Arvind Sharma"
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>// AUTHOR ROLE</label>
            <input
              type="text"
              value={form.authorRole}
              onChange={(e) => updateField('authorRole', e.target.value)}
              placeholder="e.g. Head of AI Research"
              className={inputClass}
            />
          </div>
        </div>

        {/* Excerpt */}
        <div>
          <label className={labelClass}>// EXCERPT *</label>
          <textarea
            required
            rows={2}
            value={form.excerpt}
            onChange={(e) => updateField('excerpt', e.target.value)}
            placeholder="A brief summary of the article for the blog card..."
            className={inputClass + ' resize-none'}
          />
        </div>

        {/* Thumbnail URL */}
        <div>
          <label className={labelClass}>// THUMBNAIL URL</label>
          <input
            type="url"
            value={form.thumbnail}
            onChange={(e) => updateField('thumbnail', e.target.value)}
            placeholder="https://images.unsplash.com/photo-..."
            className={inputClass}
          />
        </div>

        {/* Tags */}
        <div>
          <label className={labelClass}>// TAGS</label>
          <input
            type="text"
            value={form.tags}
            onChange={(e) => updateField('tags', e.target.value)}
            placeholder="comma, separated, tags"
            className={inputClass}
          />
        </div>

        {/* Content (MDX) */}
        <div>
          <label className={labelClass}>// CONTENT (MDX / MARKDOWN) *</label>
          <div className="border border-zinc-800">
            <div className="flex items-center justify-between px-4 py-2 bg-zinc-900/90 border-b border-zinc-800 text-[11px] text-zinc-400 font-mono">
              <span className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-zinc-500 rounded-full" />
                <span>// MDX_EDITOR</span>
              </span>
              <span>RAW</span>
            </div>
            <textarea
              required
              rows={16}
              value={form.content}
              onChange={(e) => updateField('content', e.target.value)}
              placeholder="Write your article content in Markdown / MDX format..."
              className={inputClass + ' border-0 resize-y min-h-[300px]'}
            />
          </div>
        </div>

        {/* Submit */}
        <div className="flex items-center justify-between pt-4 border-t border-zinc-800">
          <span className="font-mono text-[10px] text-zinc-600">
            {form.title ? `"${form.title}"` : 'Untitled'} → /blog/{form.slug || '...'}
          </span>
          <button
            type="submit"
            disabled={status === 'submitting'}
            className="font-mono text-xs px-6 py-2.5 bg-zinc-100 text-zinc-950 hover:bg-white font-bold border border-zinc-100 transition-colors disabled:opacity-50"
          >
            {status === 'submitting'
              ? '[ ⚡ PUBLISHING... ]'
              : '[ 🚀 PUBLISH TO DATABASE ]'}
          </button>
        </div>
      </form>

      {/* Footer */}
      <div className="font-mono text-[10px] text-zinc-700 text-center">
        SAGE UNIVERSITY BHOPAL // ADMIN CONSOLE // v1.0
      </div>
    </div>
  );
}

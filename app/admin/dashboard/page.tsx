import Link from 'next/link';
import { getAllPostsFromDB } from '@/lib/posts';
import { AdminLogoutButton } from '@/components/AdminLogoutButton';
import { PlusCircle, ExternalLink, FileText, Compass, ShieldCheck } from 'lucide-react';
import type { Metadata } from 'next';

export const revalidate = 0; // Always fresh for admin view

export const metadata: Metadata = {
  title: 'Editorial Dashboard // Admin Console | SAGE AI Horizon',
  description: 'Manage articles, view dispatches, and publish new content.',
};

export default async function AdminDashboardPage() {
  const posts = await getAllPostsFromDB();
  const campusCount = posts.filter(
    (p) => p.frontmatter.category === 'Campus Spotlight'
  ).length;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Top Bar with System Identity and Logout */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-zinc-800 pb-6">
        <div className="space-y-1">
          <div className="flex items-center space-x-2 font-mono text-xs text-zinc-500">
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            <span className="uppercase tracking-wider font-semibold text-zinc-400">
              // SAGE_RESEARCH_LABS // EDITORIAL_CONSOLE
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-sans">
            Admin Dashboard
          </h1>
        </div>

        <div className="flex items-center space-x-4">
          <div className="hidden sm:flex items-center space-x-2 font-mono text-xs border border-zinc-800 bg-zinc-950 px-3 py-1.5 text-zinc-400">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            <span>SESSION_ACTIVE</span>
          </div>
          <AdminLogoutButton />
        </div>
      </div>

      {/* Metrics Row & Primary Action */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {/* Metric 1: Total Published */}
        <div className="border border-zinc-800 bg-zinc-950 p-6 space-y-2">
          <div className="flex items-center justify-between text-zinc-500 font-mono text-xs uppercase">
            <span>Published Articles</span>
            <FileText className="w-4 h-4" />
          </div>
          <div className="text-3xl font-bold font-mono text-white">
            {posts.length}
          </div>
          <div className="font-mono text-[11px] text-zinc-500">
            Live on public feed &amp; MongoDB
          </div>
        </div>

        {/* Metric 2: Campus Spotlights */}
        <div className="border border-zinc-800 bg-zinc-950 p-6 space-y-2">
          <div className="flex items-center justify-between text-zinc-500 font-mono text-xs uppercase">
            <span>Campus Spotlights</span>
            <Compass className="w-4 h-4" />
          </div>
          <div className="text-3xl font-bold font-mono text-white">
            {campusCount}
          </div>
          <div className="font-mono text-[11px] text-zinc-500">
            Rendered in /campus dispatch
          </div>
        </div>

        {/* Quick Action: Create New Post */}
        <div className="border border-zinc-800 bg-zinc-900/40 p-6 flex flex-col justify-between space-y-4">
          <div className="space-y-1">
            <div className="font-mono text-xs uppercase text-zinc-400 font-semibold">
              // CONTENT_ACTION
            </div>
            <div className="text-sm font-sans text-zinc-300">
              Draft or publish a new research article to the feed.
            </div>
          </div>
          <Link
            href="/admin/new"
            className="inline-flex items-center justify-center space-x-2 font-mono text-xs px-4 py-2.5 bg-zinc-100 hover:bg-white text-zinc-950 font-bold transition-colors"
          >
            <PlusCircle className="w-4 h-4" />
            <span>+ CREATE NEW ARTICLE</span>
          </Link>
        </div>
      </div>

      {/* Articles Management Table */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-white font-sans tracking-tight">
            Manage Published Articles
          </h2>
          <span className="font-mono text-xs text-zinc-500">
            COUNT: {posts.length}
          </span>
        </div>

        <div className="border border-zinc-800 bg-zinc-950 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left font-mono text-xs">
              <thead className="border-b border-zinc-800 bg-zinc-900/50 text-zinc-400">
                <tr>
                  <th className="py-3 px-4 font-semibold">// TITLE</th>
                  <th className="py-3 px-4 font-semibold">// CATEGORY</th>
                  <th className="py-3 px-4 font-semibold">// AUTHOR</th>
                  <th className="py-3 px-4 font-semibold">// DATE</th>
                  <th className="py-3 px-4 font-semibold text-right">// ACTION</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-900 text-zinc-300">
                {posts.map((post) => (
                  <tr
                    key={post.slug}
                    className="hover:bg-zinc-900/40 transition-colors"
                  >
                    <td className="py-3.5 px-4 font-sans font-medium text-white max-w-xs truncate">
                      {post.frontmatter.title}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="border border-zinc-800 px-2 py-0.5 text-[11px] text-zinc-400 uppercase">
                        {post.frontmatter.category}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-zinc-400">
                      {post.frontmatter.author.name}
                    </td>
                    <td className="py-3.5 px-4 text-zinc-500">
                      {post.frontmatter.date}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <Link
                        href={`/blog/${post.slug}`}
                        target="_blank"
                        className="inline-flex items-center space-x-1 text-zinc-400 hover:text-white underline underline-offset-2 transition-colors"
                      >
                        <span>[ VIEW ]</span>
                        <ExternalLink className="w-3 h-3" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Footer Return */}
      <div className="pt-8 border-t border-zinc-800 font-mono text-xs flex justify-between items-center text-zinc-500">
        <span>SAGE UNIVERSITY BHOPAL // EDITORIAL SYSTEM</span>
        <Link href="/" className="text-zinc-400 hover:text-white underline">
          [ VISIT_PUBLIC_BLOG ]
        </Link>
      </div>
    </div>
  );
}

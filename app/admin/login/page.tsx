'use client';

import { useState, FormEvent, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Lock, ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react';

function LoginFormContent() {
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get('redirect') || '/admin/dashboard';

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        // Hard navigate so middleware and cookies immediately evaluate fresh
        window.location.href = redirectUrl;
      } else {
        setError(data.error || 'Authentication failed. Please verify credentials.');
      }
    } catch {
      setError('Network error occurred while connecting to the authorization server.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-md space-y-8">
      {/* Breadcrumb / Return */}
      <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
        <Link
          href="/"
          className="font-mono text-xs text-zinc-500 hover:text-white transition-colors flex items-center space-x-2"
        >
          <span>&larr;</span>
          <span>// RETURN_TO_FEED</span>
        </Link>
        <span className="font-mono text-[10px] text-zinc-600 uppercase tracking-widest flex items-center space-x-1.5">
          <Lock className="w-3 h-3 text-zinc-500" />
          <span>ENCRYPTED_SESSION</span>
        </span>
      </div>

      {/* Header */}
      <header className="space-y-3">
        <div className="flex items-center space-x-2 font-mono text-xs text-zinc-400">
          <span className="w-2 h-2 bg-emerald-500 rounded-none animate-pulse" />
          <span className="uppercase tracking-wider font-semibold text-zinc-300">
            SAGE UNIVERSITY BHOPAL // GATEWAY
          </span>
        </div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight font-sans">
          Admin Authentication
        </h1>
        <p className="font-sans text-sm text-zinc-400">
          Sign in to access the editorial dashboard, create articles, and manage campus publications.
        </p>
      </header>

      {/* Error Alert */}
      {error && (
        <div className="p-4 border border-red-900/60 bg-red-950/20 font-mono text-xs text-red-300 flex items-start space-x-3">
          <AlertCircle className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
          <div>
            <div className="font-bold uppercase tracking-wider text-red-400">// AUTH_REJECTED</div>
            <div className="mt-1 leading-relaxed text-zinc-300">{error}</div>
          </div>
        </div>
      )}

      {/* Login Form */}
      <form onSubmit={handleSubmit} className="space-y-5 border border-zinc-800 bg-zinc-950 p-6">
        <div>
          <label className="block font-mono text-xs text-zinc-400 uppercase tracking-wider mb-2">
            // USERNAME
          </label>
          <input
            type="text"
            required
            autoComplete="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="e.g. admin"
            className="w-full bg-zinc-900/60 border border-zinc-800 text-zinc-100 font-mono text-sm px-4 py-2.5 focus:outline-none focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 placeholder:text-zinc-600 transition-colors"
          />
        </div>

        <div>
          <label className="block font-mono text-xs text-zinc-400 uppercase tracking-wider mb-2">
            // PASSWORD
          </label>
          <input
            type="password"
            required
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••••••"
            className="w-full bg-zinc-900/60 border border-zinc-800 text-zinc-100 font-mono text-sm px-4 py-2.5 focus:outline-none focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 placeholder:text-zinc-600 transition-colors"
          />
        </div>

        <div className="pt-2">
          <button
            type="submit"
            disabled={loading}
            className="w-full font-mono text-xs py-3 px-4 bg-zinc-100 hover:bg-white text-zinc-950 font-bold border border-zinc-100 transition-colors disabled:opacity-50 flex items-center justify-center space-x-2"
          >
            <span>{loading ? 'AUTHENTICATING...' : 'ENTER DASHBOARD'}</span>
            {!loading && <ArrowRight className="w-3.5 h-3.5" />}
          </button>
        </div>
      </form>

      {/* Security Footer Notice */}
      <div className="text-center font-mono text-[11px] text-zinc-600 space-y-1">
        <div className="flex items-center justify-center space-x-1.5 text-zinc-500">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
          <span>BCRYPT_PROTECTED // HTTP_ONLY_SESSION</span>
        </div>
        <div>Unauthorized access attempts are monitored and rate-limited.</div>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <Suspense fallback={<div className="font-mono text-xs text-zinc-500">// LOADING_AUTH_GATEWAY...</div>}>
        <LoginFormContent />
      </Suspense>
    </div>
  );
}

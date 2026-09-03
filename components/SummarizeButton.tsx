'use client';

import { useState } from 'react';
import { Sparkles, Loader2, X } from 'lucide-react';

interface SummarizeButtonProps {
  content: string;
  title: string;
}

export function SummarizeButton({ content, title }: SummarizeButtonProps) {
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState<string[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleSummarize() {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/summarize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content, title }),
      });

      const data = await response.json();
      if (response.ok && data.bullets) {
        setSummary(data.bullets);
      } else {
        setError(data.error || 'Failed to generate summary');
      }
    } catch (err) {
      console.error(err);
      setError('Network error reaching summary service');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="my-6">
      {/* Minimal Sleek Action Button */}
      {!summary && (
        <button
          onClick={handleSummarize}
          disabled={loading}
          className="inline-flex items-center space-x-2 font-mono text-xs px-3.5 py-2 bg-zinc-900/60 hover:bg-zinc-900 text-zinc-300 hover:text-white border border-zinc-800 hover:border-zinc-700 transition-colors disabled:opacity-50 group"
        >
          {loading ? (
            <Loader2 className="w-3.5 h-3.5 animate-spin text-zinc-400" />
          ) : (
            <Sparkles className="w-3.5 h-3.5 text-zinc-400 group-hover:text-zinc-200 transition-colors" />
          )}
          <span>{loading ? 'Generating Summary...' : 'Magic Summary'}</span>
        </button>
      )}

      {/* Error Message */}
      {error && (
        <div className="mt-3 font-mono text-xs text-red-400 py-2 px-3 border border-red-950 bg-red-950/20 inline-block">
          // ERROR: {error}
        </div>
      )}

      {/* Revealed Bullet Points */}
      {summary && (
        <div className="border border-zinc-800 bg-zinc-950/80 p-5 space-y-4">
          <div className="flex items-center justify-between font-mono text-[11px] text-zinc-500 uppercase border-b border-zinc-900 pb-2.5">
            <span className="flex items-center space-x-2 text-zinc-300 font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-zinc-400" />
              <span>EXECUTIVE SUMMARY</span>
            </span>
            <button
              onClick={() => setSummary(null)}
              className="text-zinc-500 hover:text-zinc-300 transition-colors flex items-center space-x-1"
              title="Close summary"
            >
              <X className="w-3.5 h-3.5" />
              <span className="text-[10px]">[ CLOSE ]</span>
            </button>
          </div>
          <ul className="space-y-3 font-sans text-sm text-zinc-300">
            {summary.map((bullet, idx) => (
              <li key={idx} className="flex items-start space-x-3">
                <span className="font-mono text-xs text-zinc-500 mt-0.5 font-bold select-none">
                  0{idx + 1}.
                </span>
                <span className="leading-relaxed">{bullet}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

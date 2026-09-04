'use client';

import { useState } from 'react';
import { LogOut, Loader2 } from 'lucide-react';

export function AdminLogoutButton() {
  const [loggingOut, setLoggingOut] = useState(false);

  async function handleLogout() {
    setLoggingOut(true);
    try {
      await fetch('/api/admin/logout', {
        method: 'POST',
      });
      // Force page refresh & redirect to login to clear client state and middleware cache
      window.location.href = '/admin/login';
    } catch {
      window.location.href = '/admin/login';
    }
  }

  return (
    <button
      onClick={handleLogout}
      disabled={loggingOut}
      className="inline-flex items-center space-x-2 font-mono text-xs px-3.5 py-1.5 border border-zinc-800 bg-zinc-950 hover:bg-zinc-900 text-zinc-400 hover:text-zinc-200 transition-colors disabled:opacity-50"
      title="End admin session"
    >
      {loggingOut ? (
        <Loader2 className="w-3.5 h-3.5 animate-spin text-zinc-400" />
      ) : (
        <LogOut className="w-3.5 h-3.5 text-zinc-400" />
      )}
      <span>{loggingOut ? 'LOGGING OUT...' : '[ LOGOUT ]'}</span>
    </button>
  );
}

interface AttemptRecord {
  count: number;
  firstAttempt: number;
  lockedUntil: number | null;
}

const attemptsMap = new Map<string, AttemptRecord>();

const MAX_FAILED_ATTEMPTS = 5;
const LOCKOUT_DURATION_MS = 15 * 60 * 1000; // 15 minutes
const WINDOW_DURATION_MS = 15 * 60 * 1000; // 15 minutes

/**
 * Checks if the given IP address is currently rate-limited.
 */
export function checkRateLimit(ip: string): { limited: boolean; retryAfterSeconds?: number } {
  const now = Date.now();
  const record = attemptsMap.get(ip);

  if (!record) {
    return { limited: false };
  }

  // Check if currently in lockout period
  if (record.lockedUntil && record.lockedUntil > now) {
    const retryAfterSeconds = Math.ceil((record.lockedUntil - now) / 1000);
    return { limited: true, retryAfterSeconds };
  }

  // Check if the tracking window has expired
  if (now - record.firstAttempt > WINDOW_DURATION_MS) {
    attemptsMap.delete(ip);
    return { limited: false };
  }

  return { limited: false };
}

/**
 * Records a failed login attempt for the given IP address.
 */
export function recordFailedAttempt(ip: string): { locked: boolean; remainingAttempts: number } {
  const now = Date.now();
  const record = attemptsMap.get(ip);

  if (!record || now - record.firstAttempt > WINDOW_DURATION_MS) {
    attemptsMap.set(ip, {
      count: 1,
      firstAttempt: now,
      lockedUntil: null,
    });
    return { locked: false, remainingAttempts: MAX_FAILED_ATTEMPTS - 1 };
  }

  record.count += 1;

  if (record.count >= MAX_FAILED_ATTEMPTS) {
    record.lockedUntil = now + LOCKOUT_DURATION_MS;
    return { locked: true, remainingAttempts: 0 };
  }

  return { locked: false, remainingAttempts: MAX_FAILED_ATTEMPTS - record.count };
}

/**
 * Resets the attempt counter for an IP upon successful login.
 */
export function resetAttempts(ip: string): void {
  attemptsMap.delete(ip);
}

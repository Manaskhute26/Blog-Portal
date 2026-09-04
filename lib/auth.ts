import bcrypt from 'bcryptjs';

export * from './session';

/**
 * Verifies a plaintext password against the stored bcrypt hash (or fallback plaintext in dev).
 */
export async function verifyAdminPassword(password: string): Promise<boolean> {
  const hash = process.env.ADMIN_PASSWORD_HASH;

  if (hash && hash.startsWith('$2')) {
    return bcrypt.compare(password, hash);
  }

  // Fallback to direct comparison only if hash is not yet configured
  const fallback = process.env.ADMIN_PASSWORD;
  if (fallback) {
    return password === fallback;
  }

  return false;
}

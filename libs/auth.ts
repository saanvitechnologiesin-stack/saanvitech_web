import crypto from 'crypto';

const AUTH_SECRET = process.env.AUTH_SECRET || process.env.ADMIN_SECRET_KEY || 'saanvi-career-auth-secret-key-2026';

/**
 * Hash a plain password using PBKDF2 with a random salt.
 */
export function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
  return `${salt}:${hash}`;
}

/**
 * Verify a plain password against the stored salt:hash string.
 */
export function verifyPassword(password: string, storedHash: string): boolean {
  try {
    const [salt, originalHash] = storedHash.split(':');
    if (!salt || !originalHash) return false;

    const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
    const hashBuffer = Buffer.from(hash, 'hex');
    const originalHashBuffer = Buffer.from(originalHash, 'hex');

    if (hashBuffer.length !== originalHashBuffer.length) return false;
    return crypto.timingSafeEqual(hashBuffer, originalHashBuffer);
  } catch {
    return false;
  }
}

/**
 * Generate a signed session token containing email and timestamp.
 */
export function generateSessionToken(email: string): string {
  const payload = JSON.stringify({
    email,
    timestamp: Date.now(),
  });
  const encodedPayload = Buffer.from(payload).toString('base64url');
  const signature = crypto
    .createHmac('sha256', AUTH_SECRET)
    .update(encodedPayload)
    .digest('hex');

  return `${encodedPayload}.${signature}`;
}

/**
 * Verify a signed session token. Returns the decoded email if valid, or null.
 */
export function verifySessionToken(token: string): { email: string } | null {
  try {
    if (!token) return null;
    const [encodedPayload, signature] = token.split('.');
    if (!encodedPayload || !signature) return null;

    const expectedSignature = crypto
      .createHmac('sha256', AUTH_SECRET)
      .update(encodedPayload)
      .digest('hex');

    const sigBuffer = Buffer.from(signature, 'hex');
    const expectedSigBuffer = Buffer.from(expectedSignature, 'hex');

    if (sigBuffer.length !== expectedSigBuffer.length) return null;
    if (!crypto.timingSafeEqual(sigBuffer, expectedSigBuffer)) return null;

    const decoded = JSON.parse(Buffer.from(encodedPayload, 'base64url').toString('utf8'));
    // Token valid for 7 days
    const maxAge = 7 * 24 * 60 * 60 * 1000;
    if (Date.now() - decoded.timestamp > maxAge) {
      return null;
    }

    return { email: decoded.email };
  } catch {
    return null;
  }
}


interface RateLimitEntry {
  count: number;
  resetTime: number;
}

class RateLimiter {
  private storage: Map<string, RateLimitEntry> = new Map();
  private maxAttempts: number;
  private windowMs: number;

  constructor(maxAttempts: number = 5, windowMs: number = 15 * 60 * 1000) {
    this.maxAttempts = maxAttempts;
    this.windowMs = windowMs;
  }

  isAllowed(identifier: string): boolean {
    const now = Date.now();
    const entry = this.storage.get(identifier);

    if (!entry || now > entry.resetTime) {
      // Reset or create new entry
      this.storage.set(identifier, {
        count: 1,
        resetTime: now + this.windowMs
      });
      return true;
    }

    if (entry.count >= this.maxAttempts) {
      return false;
    }

    entry.count++;
    this.storage.set(identifier, entry);
    return true;
  }

  getRemainingTime(identifier: string): number {
    const entry = this.storage.get(identifier);
    if (!entry) return 0;
    
    const now = Date.now();
    return Math.max(0, entry.resetTime - now);
  }

  reset(identifier: string): void {
    this.storage.delete(identifier);
  }
}

export const registrationRateLimiter = new RateLimiter(3, 15 * 60 * 1000); // 3 attempts per 15 minutes
export const emailRateLimiter = new RateLimiter(2, 60 * 1000); // 2 emails per minute

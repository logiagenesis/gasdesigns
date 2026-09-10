/**
 * In-memory fixed-window rate limiter.
 *
 * Deliberately simple: it survives only as long as the serverless instance
 * does, which is enough to blunt a naive flood but is NOT a substitute for a
 * shared store. If the site starts attracting real abuse, swap this for
 * Upstash/Redis — the call signature is designed so only this file changes.
 */

type Bucket = { count: number; resetAt: number };

const WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_PER_WINDOW = 5;
const MAX_TRACKED_KEYS = 5000;

const buckets = new Map<string, Bucket>();

/** Drops expired buckets, and the oldest ones if the map grows unbounded. */
function prune(now: number): void {
  for (const [key, bucket] of buckets) {
    if (bucket.resetAt <= now) buckets.delete(key);
  }
  if (buckets.size > MAX_TRACKED_KEYS) {
    const excess = buckets.size - MAX_TRACKED_KEYS;
    let removed = 0;
    for (const key of buckets.keys()) {
      buckets.delete(key);
      if (++removed >= excess) break;
    }
  }
}

export function rateLimit(key: string): {
  ok: boolean;
  remaining: number;
  retryAfterSeconds: number;
} {
  const now = Date.now();
  prune(now);

  const existing = buckets.get(key);

  if (!existing || existing.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return { ok: true, remaining: MAX_PER_WINDOW - 1, retryAfterSeconds: 0 };
  }

  existing.count += 1;
  const remaining = Math.max(0, MAX_PER_WINDOW - existing.count);
  const ok = existing.count <= MAX_PER_WINDOW;

  return {
    ok,
    remaining,
    retryAfterSeconds: ok ? 0 : Math.ceil((existing.resetAt - now) / 1000),
  };
}

/**
 * Best-effort client identity from proxy headers.
 * Falls back to a shared bucket rather than letting an unknown client bypass
 * the limit entirely.
 */
export function clientKey(headers: Headers): string {
  const forwarded = headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]!.trim();
  return headers.get("x-real-ip")?.trim() || "unknown";
}

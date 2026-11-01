// Frontend-only flag checking. Compares SHA-256("<challengeId>:<flag>") with challenge.flagHash.
// Never reveals the expected flag. Trims whitespace. Case-sensitive unless challenge.caseSensitive === false.
import { site } from '../data/site.js';
import { sha256Hex } from './sha256.js';

const escapeRe = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

export async function verifyFlag(challenge, raw) {
  const input = String(raw ?? '').trim();
  if (!input) return { ok: false, code: 'empty' };

  // Challenge-specific validation hook
  if (typeof challenge.validate === 'function') {
    try { return challenge.validate(input) ? { ok: true } : { ok: false, code: 'wrong' }; }
    catch { return { ok: false, code: 'wrong' }; }
  }

  const prefix = challenge.flagPrefix === undefined ? site.flagPrefix : challenge.flagPrefix;
  if (prefix && !new RegExp(`^${escapeRe(prefix)}\\{.+\\}$`, 'i').test(input)) {
    return { ok: false, code: 'format' };
  }

  const candidate = challenge.caseSensitive === false ? input.toLowerCase() : input;
  const hash = await sha256Hex(`${challenge.id}:${candidate}`);
  return hash === challenge.flagHash ? { ok: true } : { ok: false, code: 'wrong' };
}

const wrong = [
  'Not quite. The memory stays locked.',
  'That flag was rejected. Re-read the challenge and try again.',
  'Close, but no. Check spelling, case and underscores.',
];
export function feedbackFor(code, attempts, hasHints) {
  if (code === 'empty') return 'Enter a flag first.';
  if (code === 'format') return `That doesn't look like a flag. Flags look like ${site.flagFormat}`;
  const base = wrong[(attempts - 1) % wrong.length];
  return attempts >= 3 && hasHints ? `${base} Stuck? Open a hint.` : base;
}

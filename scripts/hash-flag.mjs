// Usage:  npm run hash -- <challenge-id> "<flag>" [--ci]
// Prints the value to paste into `flagHash` in src/data/challenges.js
import { createHash } from 'node:crypto';

const [, , id, flag, opt] = process.argv;
if (!id || !flag) {
  console.log('Usage: npm run hash -- <challenge-id> "<flag>" [--ci]\n  --ci = case-insensitive (also set caseSensitive: false on that challenge)');
  process.exit(1);
}
const f = opt === '--ci' ? flag.trim().toLowerCase() : flag.trim();
console.log(createHash('sha256').update(`${id}:${f}`).digest('hex'));

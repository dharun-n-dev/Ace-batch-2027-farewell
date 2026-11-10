// ─────────────────────────────────────────────────────────────
//  THE FIVE CHALLENGES.
//  id            unique, used in the URL and in the flag hash (don't change it after hashing!)
//  seniorId      which senior created it (see seniors.js) -> decides which sticker is revealed
//  flagHash      SHA-256 of  "<id>:<flag>"  → generate with:  npm run hash -- ch-01 "Ac3{real_flag}"
//  caseSensitive set false (and hash with --ci) to ignore case
//  validate      OPTIONAL custom check  (input) => boolean   (used instead of flagHash)
//  files         OPTIONAL downloads: [{ label, href }]  href is relative to /public, e.g. 'challenge-files/ch-01/a.zip'
//  hints         OPTIONAL list of strings, revealed one at a time
//  requires      OPTIONAL list of challenge ids that must be solved first (default: none, all open)
//  flagPrefix    OPTIONAL override of site.flagPrefix (null = skip the format check)
//
//  Honest note: this is a frontend-only site, so anyone determined can inspect the code. Hashing keeps
//  flags out of casual view; it is not a security boundary. It's a farewell gift, not a vault.
//
//  ⚠ PLACEHOLDER DATA: each demo flag is written in its description so you can test the full flow.
//    Delete that line when you put the real challenge in.
// ─────────────────────────────────────────────────────────────
const demo = (n, word) =>
  `Placeholder challenge. The original challenge details will be added here.\n\nDEMO FLAG FOR TESTING: Ac3{demo_${word}}`;

export const challenges = [
  {
    id: 'ch-01',
    number: 1,
    title: 'CHALLENGE 01',
    category: 'TBD',
    difficulty: 'TBD',
    showMeta: false,
    description: `🔐 Emoji Trail

You're given with a trail of emojis that hide something valuable...
Emoji Sequence:
😅 😃 😎 😀 😆 😀 😄 😁 😀 😁 😋 😂 😉 😁 😊

Each emoji represents a hexadecimal value.

😀 = 00
😁 = 07
😂 = 08
😃 = 0a
😄 = 0c
😅 = 0e
😆 = 1f
😉 = 2e
😊 = 2f
😋 = 5a
😎 = 5d

Using the provided legend, convert this emoji sequence into a hex string.

Something about the pattern feels deliberate — like there's more to discover.
Perhaps the image you've been given isn’t just decoration…
it might contain the very key needed to unravel the path.

Sometimes, it might be XOR-ing the hex string with the key uncover what's truly hidden.

Flag format: CnC{...}`,
    files: [],
    hints: [{ image: 'challenge-files/ch-01/emoji_hint_image.png', alt: 'Emoji trail hint' }],
    seniorId: 'senior-1',
    flagHash: 'c9d9f354e3439717face1ff1cd43208c7a20749d15bf9ac967287cf485e997b5',
    flagPrefix: 'CnC',
    caseSensitive: true,
  },
  { id: 'ch-02', number: 2, title: 'CHALLENGE 02', category: 'TBD', difficulty: 'TBD', description: demo(2, 'two'),   files: [], hints: [], seniorId: 'senior-2', flagHash: '4c5dbafef2ea49fc9d6b024f0fb356523bc8ccbc529c410d7af57f04d15c5813', caseSensitive: true },
  { id: 'ch-03', number: 3, title: 'CHALLENGE 03', category: 'TBD', difficulty: 'TBD', description: demo(3, 'three'), files: [], hints: [], seniorId: 'senior-3', flagHash: '7ebd934996a47aef2b04d906866a4568e28bfe9c201dff03ad5ce136b7e90da4', caseSensitive: true },
  { id: 'ch-04', number: 4, title: 'CHALLENGE 04', category: 'TBD', difficulty: 'TBD', description: demo(4, 'four'),  files: [], hints: [], seniorId: 'senior-4', flagHash: 'c076a6b4e3fa27118048ec7b9abc38fd52e657e28adf834e624e11859c1361d2', caseSensitive: true },
  { id: 'ch-05', number: 5, title: 'CHALLENGE 05', category: 'TBD', difficulty: 'TBD', description: demo(5, 'five'),  files: [], hints: [], seniorId: 'senior-5', flagHash: '51d16819d6fdb5ff8ffb8b2d3995a09095aa88ba41151e952d278a3a2af8a744', caseSensitive: true },
];

export const getChallenge = (id) => challenges.find((c) => c.id === id) || null;

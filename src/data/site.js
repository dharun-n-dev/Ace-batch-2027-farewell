// ─────────────────────────────────────────────────────────────
//  SITE-WIDE TEXT & SETTINGS. Edit freely.
// ─────────────────────────────────────────────────────────────
export const site = {
  title: 'OPERATION FAREWELL',
  tagline: 'A lifetime of memories.',
  intro: 'Some memories deserve to be unlocked.',

  dashboardKicker: 'The classified memory archive',
  dashboardLabel: 'Five keys. One memory vault.',

  // Flag format. Used for the input placeholder and the "does this look like a flag?" check.
  // If a challenge uses a different prefix, set `flagPrefix` on that challenge (or null to skip the check).
  flagFormat: 'CnC{example_flag}',
  flagPrefix: 'CnC',

  // localStorage key (bump the version suffix to wipe everyone's saved progress)
  storageKey: 'operation-farewell:v1',

  finale: {
    title: 'ALL FIVE MEMORIES RECOVERED',
    subtitle: 'THE ARCHIVE IS NOW YOURS.',
    quote:
      'Some challenges test what you know. The best memories remind you who made the journey worthwhile.',
  },

  destinations: {
    archive: {
      title: 'THE MEMORY ARCHIVE',
      text: 'Every event. Every photograph. Every moment worth remembering.',
      button: 'OPEN GALLERY',
    },
    vault: {
      title: 'THE ULTIMATE STICKER VAULT',
      text: 'Five people. Countless reactions. An unreasonable amount of chaos.',
      button: 'OPEN STICKER VAULT',
    },
  },

  farewell: {
    // Do not reword this line.
    message: 'Thank you for making these moments worth remembering.',
    // Editable.
    paragraph:
      'Long after the challenges are forgotten and the events become stories, the memories, laughter, and friendships you left behind will remain. This little archive is our way of saying thank you.',
    // Main group photo: a filename from src/assets/photos (leave '' for none)
    photo: 'photo-27.jpg',
    photoCaption: '',
    closingTop: 'MISSION COMPLETE',
    closingBottom: 'THE MEMORIES STAY.',
  },
};

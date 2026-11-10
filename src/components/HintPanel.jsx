import { useState } from 'react';
import { publicUrl } from '../utils/assetHelpers.js';

export default function HintPanel({ hints = [] }) {
  const [shown, setShown] = useState(0);
  if (!hints.length) return null;
  return (
    <section className="hints" aria-label="Hints">
      <h3 className="h-small">Hints</h3>
      {hints.slice(0, shown).map((h, i) => (
        <div key={i} className="hint">
          <p><span className="mono">Hint {i + 1}</span>{typeof h === 'string' ? ` ${h}` : h.text ? ` ${h.text}` : null}</p>
          {typeof h !== 'string' && h.image && (
            <img className="hint-image" src={publicUrl(h.image)} alt={h.alt || `Hint ${i + 1}`} />
          )}
        </div>
      ))}
      <button
        type="button"
        className="btn btn-ghost btn-sm"
        onClick={() => setShown((s) => Math.min(s + 1, hints.length))}
        disabled={shown >= hints.length}
      >
        {shown < hints.length ? (shown === 0 ? 'Reveal a hint' : 'Reveal the next hint') : 'Hint revealed'} ({shown}/{hints.length})
      </button>
    </section>
  );
}

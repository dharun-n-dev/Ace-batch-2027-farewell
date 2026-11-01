import { useState } from 'react';

export default function HintPanel({ hints = [] }) {
  const [shown, setShown] = useState(0);
  if (!hints.length) return null;
  return (
    <section className="hints" aria-label="Hints">
      <h3 className="h-small">Hints</h3>
      {hints.slice(0, shown).map((h, i) => (
        <p key={i} className="hint"><span className="mono">Hint {i + 1}</span> {h}</p>
      ))}
      {shown < hints.length && (
        <button type="button" className="btn btn-ghost btn-sm" onClick={() => setShown((s) => s + 1)}>
          {shown === 0 ? 'Reveal a hint' : 'Reveal the next hint'} ({shown}/{hints.length})
        </button>
      )}
    </section>
  );
}

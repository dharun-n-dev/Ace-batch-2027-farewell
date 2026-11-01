import { useState } from 'react';
import { site } from '../data/site.js';
import { verifyFlag, feedbackFor } from '../utils/flagValidation.js';

// Controlled flag form. Calls onSolved() ONLY when verifyFlag() says the flag is correct.
export default function FlagInput({ challenge, onSolved }) {
  const [value, setValue] = useState('');
  const [busy, setBusy] = useState(false);
  const [fb, setFb] = useState(null); // {type:'error'|'ok', text}
  const [attempts, setAttempts] = useState(0);
  const [shake, setShake] = useState(0);

  const submit = async (e) => {
    e.preventDefault();
    if (busy) return;
    setBusy(true);
    const r = await verifyFlag(challenge, value);
    setBusy(false);
    if (r.ok) { setFb({ type: 'ok', text: 'Flag accepted.' }); onSolved(); return; }
    const n = r.code === 'wrong' ? attempts + 1 : attempts;
    setAttempts(n);
    setShake((s) => s + 1);
    setFb({ type: 'error', text: feedbackFor(r.code, n || 1, challenge.hints?.length > 0) });
  };

  return (
    <form className="flag-form" onSubmit={submit} noValidate>
      <label htmlFor="flag" className="h-small">Your flag</label>
      <div className="flag-row">
        <input
          id="flag" key={shake} name="flag" type="text" className={`flag-input mono ${fb?.type === 'error' ? 'shake' : ''}`}
          value={value} onChange={(e) => { setValue(e.target.value); if (fb) setFb(null); }}
          placeholder={site.flagFormat} autoComplete="off" autoCapitalize="off" autoCorrect="off" spellCheck={false}
          aria-describedby="flag-fb" aria-invalid={fb?.type === 'error'}
        />
        <button type="submit" className="btn btn-primary" disabled={busy}>{busy ? 'Checking…' : 'Submit flag'}</button>
      </div>
      <p id="flag-fb" className={`flag-fb ${fb?.type || ''}`} role="status" aria-live="polite">{fb?.text || '\u00A0'}</p>
    </form>
  );
}

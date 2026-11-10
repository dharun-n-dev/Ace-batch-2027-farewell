import { useState } from 'react';
import { getChallenge } from '../data/challenges.js';
import { getSenior } from '../data/seniors.js';
import { challenges } from '../data/challenges.js';
import { useProgress } from '../hooks/useProgress.jsx';
import { go } from '../hooks/useHashRoute.js';
import { publicUrl } from '../utils/assetHelpers.js';
import FlagInput from '../components/FlagInput.jsx';
import HintPanel from '../components/HintPanel.jsx';
import StickerReveal from '../components/StickerReveal.jsx';
import { CheckIcon } from '../components/Icons.jsx';

export default function ChallengePage({ id }) {
  const challenge = getChallenge(id);
  const { isSolved, solve, solved, count, total, unlocked } = useProgress();
  const [reveal, setReveal] = useState(false);
  const [wasFinal, setWasFinal] = useState(false);

  if (!challenge) {
    return (
      <section className="page narrow center">
        <h1 className="h1">Case file not found</h1>
        <p className="lede">That challenge doesn't exist.</p>
        <a className="btn btn-primary" href="#/challenges">Back to challenges</a>
      </section>
    );
  }

  const senior = getSenior(challenge.seniorId);
  const done = isSolved(challenge.id);
  const missing = (challenge.requires || []).filter((r) => !isSolved(r));

  const onSolved = () => {
    const final = new Set([...solved, challenge.id]).size >= total;
    setWasFinal(final);
    solve(challenge.id);
    setReveal(true);
  };

  return (
    <section className="page narrow">
      <a className="back" href="#/challenges">‹ Back to challenges</a>
      <article className="paper challenge">
        <header>
          <p className="mono cf-no">Case file {String(challenge.number).padStart(2, '0')}</p>
          <h1 className="h1">{challenge.title}</h1>
          {challenge.showMeta !== false && (
            <p className="cf-meta">
              <span className="chip">{challenge.category}</span>
              <span className="chip chip-ghost">{challenge.difficulty}</span>
            </p>
          )}
        </header>

        <div className="prose">
          {challenge.description.split('\n\n').map((p, i) => <p key={i}>{p}</p>)}
        </div>

        {challenge.files?.length > 0 && (
          <section className="files" aria-label="Challenge files">
            <h3 className="h-small">Files</h3>
            <ul>
              {challenge.files.map((f) => (
                <li key={f.href}><a href={publicUrl(f.href)} download>{f.label}</a></li>
              ))}
            </ul>
          </section>
        )}

        <HintPanel hints={challenge.hints} />

        {missing.length > 0 ? (
          <p className="notice">This case file is sealed until you solve the earlier ones.</p>
        ) : done ? (
          <div className="solved-banner">
            <p><CheckIcon /> <strong>Challenge solved.</strong> Memory recovered.</p>
            <div className="row-wrap">
              <button type="button" className="btn btn-primary" onClick={() => { setWasFinal(false); setReveal(true); }}>Replay reveal</button>
              {unlocked && <a className="btn btn-ghost" href="#/finale">Open the archive</a>}
              <a className="btn btn-ghost" href="#/challenges">Return to challenges</a>
            </div>
          </div>
        ) : (
          <>
            <FlagInput challenge={challenge} onSolved={onSolved} />
            <a className="btn btn-ghost btn-sm" href="#/challenges">Return to dashboard</a>
          </>
        )}
      </article>

      {reveal && senior && (
        <StickerReveal
          challenge={challenge}
          senior={senior}
          isFinal={wasFinal}
          onClose={() => setReveal(false)}
          onReturn={() => { setReveal(false); go(wasFinal ? '/finale' : '/challenges'); }}
        />
      )}
    </section>
  );
}

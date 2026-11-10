import { getSenior } from '../data/seniors.js';
import { getSticker } from '../data/stickers.js';
import SafeImg from './SafeImg.jsx';
import { CheckIcon, LockIcon } from './Icons.jsx';

export default function ChallengeCard({ challenge, solved, locked, requiresTitles = [] }) {
  const sticker = solved ? getSticker(getSenior(challenge.seniorId)?.stickerId) : null;
  const status = solved ? 'solved' : locked ? 'locked' : 'available';
  const num = String(challenge.number).padStart(2, '0');
  return (
    <article className={`card-file status-${status}`}>
      <header className="cf-head">
        <span className="mono cf-no">Case file {num}</span>
        <span className={`cf-status ${status}`}>
          {solved ? <><CheckIcon width={14} height={14} /> Solved</> : locked ? <><LockIcon width={13} height={13} /> Locked</> : 'Available'}
        </span>
      </header>
      <h3 className="cf-title">{challenge.title}</h3>
      {challenge.showMeta !== false && (
        <p className="cf-meta">
          <span className="chip">{challenge.category}</span>
          <span className="chip chip-ghost">{challenge.difficulty}</span>
        </p>
      )}
      <p className="cf-desc">{challenge.description.split('\n')[0]}</p>
      {sticker && <SafeImg className="cf-sticker" src={sticker.src} alt="" loading="lazy" />}
      <footer className="cf-foot">
        {locked ? (
          <span className="cf-note">Solve {requiresTitles.join(', ')} first.</span>
        ) : (
          <a className={`btn ${solved ? 'btn-ghost' : 'btn-primary'}`} href={`#/challenge/${challenge.id}`} aria-label={`${solved ? 'Review' : 'Open'} ${challenge.title}`}>
            {solved ? 'Review' : 'Open challenge'}
          </a>
        )}
      </footer>
    </article>
  );
}

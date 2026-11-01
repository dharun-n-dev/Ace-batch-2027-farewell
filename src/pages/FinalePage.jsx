import { useEffect } from 'react';
import { site } from '../data/site.js';
import { seniors } from '../data/seniors.js';
import { getSticker } from '../data/stickers.js';
import { useProgress } from '../hooks/useProgress.jsx';
import SafeImg from '../components/SafeImg.jsx';

// The emotional climax: the vault doors part, all five stickers appear, then the two destinations.
export default function FinalePage() {
  const { markFinaleSeen } = useProgress();
  useEffect(() => { markFinaleSeen(); }, [markFinaleSeen]);
  const d = site.destinations;

  return (
    <section className="page finale">
      <div className="doors" aria-hidden="true"><i /><i /></div>

      <header className="finale-head">
        <p className="orn" aria-hidden="true">✦ &nbsp;·&nbsp; ✦ &nbsp;·&nbsp; ✦</p>
        <h1 className="h1 shimmer">{site.finale.title}</h1>
        <p className="finale-sub mono">{site.finale.subtitle}</p>
      </header>

      <ul className="finale-row" aria-label="The five creators">
        {seniors.map((s, i) => {
          const st = getSticker(s.stickerId);
          return (
            <li key={s.id} className={`finale-card fc-${i + 1}`} style={{ '--i': i }}>
              <SafeImg src={st?.src} alt={`Sticker of ${s.name}`} label={s.stickerId} />
              <span>{s.name}</span>
            </li>
          );
        })}
      </ul>

      <p className="finale-quote">{site.finale.quote}</p>

      <div className="dest-grid">
        <article className="paper dest">
          <h2 className="h2">{d.archive.title}</h2>
          <p>{d.archive.text}</p>
          <a className="btn btn-primary" href="#/archive">{d.archive.button}</a>
        </article>
        <article className="paper dest">
          <h2 className="h2">{d.vault.title}</h2>
          <p>{d.vault.text}</p>
          <a className="btn btn-primary" href="#/vault">{d.vault.button}</a>
        </article>
      </div>
    </section>
  );
}

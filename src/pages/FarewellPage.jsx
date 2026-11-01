import { site } from '../data/site.js';
import { seniors } from '../data/seniors.js';
import { getSticker } from '../data/stickers.js';
import { getPhotoSrc } from '../data/gallery.js';
import SafeImg from '../components/SafeImg.jsx';

export default function FarewellPage() {
  const f = site.farewell;
  const photo = f.photo ? getPhotoSrc(f.photo) : null;
  return (
    <section className="page farewell">
      {photo && (
        <figure className="hero-photo polaroid">
          <div className="photo-frame"><SafeImg src={photo} alt="The whole team together" label={f.photo} /></div>
          {f.photoCaption && <figcaption>{f.photoCaption}</figcaption>}
        </figure>
      )}

      <p className="orn" aria-hidden="true">✦ &nbsp;·&nbsp; ✦ &nbsp;·&nbsp; ✦</p>
      <h1 className="farewell-msg">{f.message}</h1>
      <p className="farewell-para">{f.paragraph}</p>

      <ul className="grid-seniors" aria-label="Messages for each senior">
        {seniors.map((s) => (
          <li key={s.id} className="paper senior-card">
            <SafeImg src={getSticker(s.stickerId)?.src} alt={`Sticker of ${s.name}`} label={s.stickerId} loading="lazy" />
            <h2 className="h3">{s.name}</h2>
            {s.message && <p>{s.message}</p>}
          </li>
        ))}
      </ul>

      <div className="closing">
        <div className="rule" aria-hidden="true" />
        <p className="closing-top mono">{f.closingTop}</p>
        <p className="closing-bottom">{f.closingBottom}</p>
      </div>
      <div className="row-wrap center-row">
        <a className="btn btn-ghost" href="#/archive">Back to the archive</a>
        <a className="btn btn-ghost" href="#/vault">Back to the vault</a>
      </div>
    </section>
  );
}

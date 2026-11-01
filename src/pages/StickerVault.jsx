import { useState } from 'react';
import { stickers } from '../data/stickers.js';
import { getSenior } from '../data/seniors.js';
import StickerCard from '../components/StickerCard.jsx';
import Lightbox from '../components/Lightbox.jsx';
import SafeImg from '../components/SafeImg.jsx';
import { SpeakerIcon } from '../components/Icons.jsx';
import useSound from '../hooks/useSound.js';
import { pickRandomIndex } from '../utils/randomSelection.js';
import { prettyId } from '../utils/assetHelpers.js';

const ownerName = (s) => (s.owner ? getSenior(s.owner)?.name : null);

export default function StickerVault() {
  const [open, setOpen] = useState(-1);
  const [summoned, setSummoned] = useState(false);
  const { muted, toggle, play } = useSound();

  const summon = () => {
    const i = pickRandomIndex(stickers.length, open);
    setSummoned(true); setOpen(i);
    play(stickers[i]?.soundSrc); // user-initiated click, so playback is allowed
  };

  return (
    <section className="page wide">
      <header className="page-head">
        <p className="kicker">Sticker vault</p>
        <h1 className="h1">The Ultimate Sticker Vault</h1>
        <p className="lede">Five legends. Countless reactions. An unreasonable amount of chaos.</p>
        <div className="row-wrap center-row">
          <button type="button" className="btn btn-primary" onClick={summon} disabled={!stickers.length}>SUMMON A RANDOM STICKER</button>
          <span className="mono muted">{stickers.length} stickers</span>
        </div>
      </header>

      {stickers.length === 0 ? (
        <div className="empty paper">
          <h2 className="h2">The vault is empty</h2>
          <p>Add sticker files to <code>src/assets/stickers/</code> and they will appear here automatically.</p>
        </div>
      ) : (
        <div className="sticker-grid">
          {stickers.map((s, i) => (
            <StickerCard key={s.id} sticker={s} ownerName={ownerName(s)} onOpen={() => { setSummoned(false); setOpen(i); }} />
          ))}
        </div>
      )}

      {open >= 0 && stickers[open] && (
        <Lightbox
          items={stickers} index={open} onClose={() => setOpen(-1)} onIndex={(i) => { setSummoned(false); setOpen(i); }}
          label="Sticker viewer" variant={summoned ? 'found' : ''}
          renderItem={(s) => <div className={`lb-sticker ${summoned ? 'found-card' : ''}`}><SafeImg src={s.src} alt={`Sticker ${prettyId(s.id)}`} label={s.file} /></div>}
          renderCaption={(s) => (
            <div className="lb-sticker-cap">
              <span className="mono">{prettyId(s.id)}</span>
              {ownerName(s) && <strong>{ownerName(s)}</strong>}
              {s.caption && <em>{s.caption}</em>}
              {s.soundSrc && (
                <button type="button" className="btn btn-ghost btn-sm" onClick={() => { if (muted) toggle(); play(s.soundSrc); }}><SpeakerIcon /> Play sound</button>
              )}
            </div>
          )}
        />
      )}
    </section>
  );
}

import SafeImg from './SafeImg.jsx';
import { SpeakerIcon } from './Icons.jsx';
import useSound from '../hooks/useSound.js';
import { prettyId } from '../utils/assetHelpers.js';

export default function StickerCard({ sticker, ownerName, onOpen }) {
  const { muted, toggle, play } = useSound();
  return (
    <article className="sticker-card">
      <button type="button" className="sticker-btn" onClick={onOpen} aria-label={`Enlarge sticker ${prettyId(sticker.id)}${ownerName ? `, ${ownerName}` : ''}`}>
        <SafeImg src={sticker.src} alt="" loading="lazy" label={sticker.file} />
      </button>
      <div className="sticker-meta">
        <span className="mono sticker-no">{prettyId(sticker.id)}</span>
        {ownerName && <strong className="sticker-owner">{ownerName}</strong>}
        {sticker.caption && <em className="sticker-cap">{sticker.caption}</em>}
      </div>
      {sticker.soundSrc && (
        <button type="button" className="icon-btn" onClick={() => { if (muted) toggle(); play(sticker.soundSrc); }} aria-label={`Play sound for sticker ${prettyId(sticker.id)}`}>
          <SpeakerIcon />
        </button>
      )}
    </article>
  );
}

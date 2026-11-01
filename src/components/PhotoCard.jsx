import SafeImg from './SafeImg.jsx';
import { PlayIcon } from './Icons.jsx';

// Cream photo mount; every 5th card is a Polaroid for gentle variety.
export default function PhotoCard({ item, index, onOpen }) {
  const polaroid = index % 5 === 2;
  return (
    <figure className={`photo ${polaroid ? 'polaroid' : 'mount'}`}>
      <button type="button" className="photo-btn" onClick={() => onOpen(index)} aria-label={`Open ${item.type === 'video' ? 'video' : 'photograph'}: ${item.alt}`}>
        <div className="photo-frame">
          {item.type === 'video' ? (
            <div className="vid-thumb">
              <video src={`${item.src}#t=0.1`} preload="metadata" muted playsInline />
              <span className="play-badge"><PlayIcon width={22} height={22} /></span>
            </div>
          ) : (
            <SafeImg src={item.src} alt={item.alt} loading="lazy" label={item.file} />
          )}
        </div>
      </button>
      {(item.caption || item.date) && (
        <figcaption>{item.caption}{item.date && <span className="photo-date mono">{item.date}</span>}</figcaption>
      )}
    </figure>
  );
}

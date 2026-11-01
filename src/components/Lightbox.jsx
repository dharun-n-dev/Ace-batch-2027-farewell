import { useEffect, useRef } from 'react';
import Modal from './Modal.jsx';
import { ChevronIcon } from './Icons.jsx';

// Generic viewer used by the photo gallery and the sticker vault.
// Arrow keys, Escape, on-screen buttons and swipe all work.
export default function Lightbox({ items, index, onClose, onIndex, renderItem, renderCaption, label = 'Viewer', variant = '' }) {
  const item = items[index];
  const touch = useRef(null);
  const n = items.length;
  const prev = () => onIndex((index - 1 + n) % n);
  const next = () => onIndex((index + 1) % n);

  useEffect(() => {
    const k = (e) => {
      if (e.key === 'ArrowLeft') { e.preventDefault(); prev(); }
      if (e.key === 'ArrowRight') { e.preventDefault(); next(); }
    };
    document.addEventListener('keydown', k);
    return () => document.removeEventListener('keydown', k);
  });

  if (!item) return null;
  return (
    <Modal onClose={onClose} label={label} className={`lightbox ${variant}`}>
      <div
        className="lb-body"
        onTouchStart={(e) => { touch.current = e.touches[0].clientX; }}
        onTouchEnd={(e) => {
          if (touch.current == null) return;
          const dx = e.changedTouches[0].clientX - touch.current;
          touch.current = null;
          if (Math.abs(dx) > 50) (dx > 0 ? prev : next)();
        }}
      >
        {n > 1 && <button type="button" className="lb-nav lb-prev" onClick={prev} aria-label="Previous"><ChevronIcon dir="left" width={22} height={22} /></button>}
        <div className="lb-content" key={item.id}>{renderItem(item)}</div>
        {n > 1 && <button type="button" className="lb-nav lb-next" onClick={next} aria-label="Next"><ChevronIcon width={22} height={22} /></button>}
      </div>
      <div className="lb-foot" aria-live="polite">
        <div className="lb-cap">{renderCaption?.(item)}</div>
        <span className="mono lb-count">{index + 1} / {n}</span>
      </div>
    </Modal>
  );
}

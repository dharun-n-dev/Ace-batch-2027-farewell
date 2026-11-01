import { useMemo, useState } from 'react';
import { gallery } from '../data/gallery.js';
import PhotoCard from '../components/PhotoCard.jsx';
import Lightbox from '../components/Lightbox.jsx';
import SafeImg from '../components/SafeImg.jsx';
import { pickRandomIndex } from '../utils/randomSelection.js';

export default function MemoryArchive() {
  const categories = useMemo(() => [...new Set(gallery.map((g) => g.category).filter(Boolean))], []);
  const [cat, setCat] = useState('All');
  const [open, setOpen] = useState(-1);
  const [found, setFound] = useState(false);

  const items = useMemo(() => (cat === 'All' ? gallery : gallery.filter((g) => g.category === cat)), [cat]);

  const openAt = (i) => { setFound(false); setOpen(i); };
  const randomMemory = () => { setFound(true); setOpen(pickRandomIndex(items.length, open)); };

  return (
    <section className="page wide">
      <header className="page-head">
        <p className="kicker">Memory archive</p>
        <h1 className="h1">The Memory Archive</h1>
        <p className="lede">Every event. Every photograph. Every moment worth remembering.</p>
        <div className="row-wrap center-row">
          <button type="button" className="btn btn-primary" onClick={randomMemory} disabled={!items.length}>RECOVER A RANDOM MEMORY</button>
          <span className="mono muted">{items.length} {items.length === 1 ? 'memory' : 'memories'}</span>
        </div>
        {categories.length > 0 && (
          <div className="filters" role="group" aria-label="Filter by category">
            {['All', ...categories].map((c) => (
              <button key={c} type="button" className={`chip chip-btn ${cat === c ? 'on' : ''}`} aria-pressed={cat === c} onClick={() => setCat(c)}>{c}</button>
            ))}
          </div>
        )}
      </header>

      {items.length === 0 ? (
        <div className="empty paper">
          <h2 className="h2">The archive is waiting for photographs</h2>
          <p>Add image files to <code>src/assets/photos/</code> and they will appear here automatically.</p>
        </div>
      ) : (
        <div className="masonry">
          {items.map((it, i) => <PhotoCard key={it.id} item={it} index={i} onOpen={openAt} />)}
        </div>
      )}

      {open >= 0 && items[open] && (
        <Lightbox
          items={items} index={open} onClose={() => setOpen(-1)} onIndex={(i) => { setFound(false); setOpen(i); }}
          label="Photograph viewer" variant={found ? 'found' : ''}
          renderItem={(it) => it.type === 'video'
            ? <video className="lb-media" src={it.src} controls autoPlay playsInline />
            : <div className={found ? 'found-polaroid' : 'lb-plain'}><SafeImg className="lb-media" src={it.src} alt={it.alt} label={it.file} /></div>}
          renderCaption={(it) => (it.caption || it.date) ? <p>{it.caption} {it.date && <span className="mono muted">{it.date}</span>}</p> : null}
        />
      )}
    </section>
  );
}

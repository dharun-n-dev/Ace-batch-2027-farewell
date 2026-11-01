import { useEffect, useState } from 'react';
import { site } from '../data/site.js';
import { useProgress } from '../hooks/useProgress.jsx';
import SoundControl from './SoundControl.jsx';
import { LockIcon, MenuIcon, CloseIcon } from './Icons.jsx';

const ITEMS = [
  { key: 'home', label: 'Home', to: '/' },
  { key: 'challenges', label: 'Challenges', to: '/challenges' },
  { key: 'archive', label: 'Memory Archive', to: '/archive', lock: true },
  { key: 'vault', label: 'Sticker Vault', to: '/vault', lock: true },
  { key: 'farewell', label: 'Farewell', to: '/farewell', lock: true },
];

export default function Navbar({ current }) {
  const { unlocked, count, total } = useProgress();
  const [open, setOpen] = useState(false);
  useEffect(() => setOpen(false), [current]);

  return (
    <header className="nav">
      <div className="nav-inner">
        <a className="brand" href="#/" aria-label={`${site.title}: home`}>
          <span aria-hidden="true">✦</span> {site.title}
        </a>
        <button type="button" className="nav-burger" aria-expanded={open} aria-controls="nav-links" onClick={() => setOpen((o) => !o)}>
          {open ? <CloseIcon /> : <MenuIcon />}<span className="sr-only">Menu</span>
        </button>
        <nav id="nav-links" className={`nav-links ${open ? 'open' : ''}`} aria-label="Main">
          {ITEMS.map((it) => {
            const locked = it.lock && !unlocked;
            return (
              <a key={it.key} href={`#${it.to}`} className={`nav-link ${current === it.key ? 'active' : ''} ${locked ? 'is-locked' : ''}`} aria-current={current === it.key ? 'page' : undefined}>
                {it.label}
                {locked && (<><LockIcon width={13} height={13} /><span className="sr-only"> (locked)</span></>)}
              </a>
            );
          })}
        </nav>
        <div className="nav-tools">
          <span className="mono nav-count" title="Challenges completed">{count}/{total}</span>
          <SoundControl compact />
        </div>
      </div>
    </header>
  );
}

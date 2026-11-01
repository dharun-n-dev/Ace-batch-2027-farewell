import { useEffect, useRef, useState } from 'react';
import Modal from './Modal.jsx';
import SafeImg from './SafeImg.jsx';
import SoundControl from './SoundControl.jsx';
import { SpeakerIcon } from './Icons.jsx';
import useSound from '../hooks/useSound.js';
import useReducedMotion from '../hooks/useReducedMotion.js';
import { getSticker } from '../data/stickers.js';
import { audioFiles } from '../data/assets.js';

// The five reveal "frames". All share the same identity, differ in how the sticker arrives.
export function RevealFrame({ style, src, name, id }) {
  const img = <SafeImg className="rv-img" src={src} alt={`Sticker of ${name}`} label={id} />;
  switch (style) {
    case 'polaroid':
      return <div className="rv rv-polaroid"><div className="rv-photo">{img}</div><div className="rv-cap">{name}</div></div>;
    case 'stamp':
      return <div className="rv rv-stamp"><div className="rv-doc">{img}</div><div className="rv-stampmark" aria-hidden="true">RECOVERED</div></div>;
    case 'glitch':
      return <div className="rv rv-glitch">{img}</div>;
    case 'scrapbook':
      return <div className="rv rv-scrap"><i className="tape" aria-hidden="true" />{img}</div>;
    default:
      return <div className="rv rv-file"><div className="rv-filehead" aria-hidden="true"><span>Classified</span><span>Recovered file</span></div>{img}</div>;
  }
}

// Stages: 0 flag accepted → 1 recovering identity → 2 sticker → 3 identity → 4 solved (+ buttons)
const STAGE_MS = [1100, 1300, 1200, 1100];

export default function StickerReveal({ senior, challenge, isFinal, onClose, onReturn }) {
  const reduced = useReducedMotion();
  const { muted, play, stop, toggle } = useSound();
  const [run, setRun] = useState(0);
  const [stage, setStage] = useState(0);
  const played = useRef(false);

  const sticker = getSticker(senior.stickerId);
  const soundSrc = (senior.sound && audioFiles[senior.sound]) || sticker?.soundSrc || null;

  useEffect(() => {
    setStage(0); played.current = false;
    let t = 0;
    const timers = STAGE_MS.map((ms, i) => { t += reduced ? 250 : ms; return setTimeout(() => setStage(i + 1), t); });
    return () => timers.forEach(clearTimeout);
  }, [run, reduced]);

  useEffect(() => { if (stage >= 2 && !played.current) { played.current = true; play(soundSrc); } }, [stage, soundSrc, play]);
  useEffect(() => () => stop(), [stop]);

  const replaySound = () => { if (muted) toggle(); play(soundSrc); };

  return (
    <Modal onClose={onClose} label={`${challenge.title} solved`} className="reveal" dismissOnBackdrop={false}>
      <div className="rv-top"><SoundControl compact />{stage < 4 && <button type="button" className="btn btn-ghost btn-sm" onClick={() => setStage(4)}>Skip</button>}</div>

      <div className="rv-text" aria-live="polite">
        {stage === 0 && (<div key="s0" className="rv-line"><p className="rv-big mono">FLAG ACCEPTED</p><p className="rv-sub">MEMORY RECOVERED SUCCESSFULLY.</p></div>)}
        {stage === 1 && (<div key="s1" className="rv-line"><p className="rv-sub glitch-text">Recovering the creator's identity...</p><div className="decrypt" aria-hidden="true"><i /></div></div>)}
        {stage >= 3 && (<div key="s3" className="rv-line"><p className="rv-kicker mono">IDENTITY RECOVERED!</p><p className="rv-name">{senior.name}</p><p className="rv-caption">{senior.caption}</p></div>)}
      </div>

      {stage >= 2 && (
        <div className="rv-stage" key={run}>
          <RevealFrame style={senior.revealStyle} src={sticker?.src} name={senior.name} id={senior.stickerId} />
        </div>
      )}

      {stage >= 4 && (
        <div className="rv-done" key={`d${run}`}>
          <p className="rv-solved mono">CHALLENGE SOLVED</p>
          <div className="rv-actions">
            <button type="button" className="btn btn-primary" onClick={onReturn} data-autofocus>{isFinal ? 'Unlock the archive' : 'Return to challenges'}</button>
            <button type="button" className="btn btn-ghost" onClick={() => setRun((r) => r + 1)}>Replay reveal</button>
            {soundSrc && (
              <button type="button" className="btn btn-ghost" onClick={replaySound}><SpeakerIcon /> {muted ? 'Unmute and replay' : 'Replay sound'}</button>
            )}
          </div>
        </div>
      )}
    </Modal>
  );
}

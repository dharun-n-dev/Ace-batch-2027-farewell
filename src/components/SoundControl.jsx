import useSound from '../hooks/useSound.js';
import { MutedIcon, SpeakerIcon } from './Icons.jsx';

export default function SoundControl({ compact = false }) {
  const { muted, toggle } = useSound();
  return (
    <button type="button" className="sound-toggle" onClick={toggle} aria-pressed={!muted} aria-label={muted ? 'Sound is off. Turn sound on' : 'Sound is on. Turn sound off'} title={muted ? 'Sound off' : 'Sound on'}>
      {muted ? <MutedIcon /> : <SpeakerIcon />}
      {!compact && <span>{muted ? 'Sound off' : 'Sound on'}</span>}
    </button>
  );
}

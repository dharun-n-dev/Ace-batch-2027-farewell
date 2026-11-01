// One shared audio player: only one sound at a time, a mute switch remembered for the browser session,
// and graceful failure if the file is missing or the browser blocks playback.
import { useSyncExternalStore } from 'react';

const KEY = 'operation-farewell:muted';
let muted = false;
try { muted = sessionStorage.getItem(KEY) === '1'; } catch { /* ignore */ }
let current = null;
const subs = new Set();
const emit = () => subs.forEach((f) => f());

export function stopSound() {
  if (current) { try { current.pause(); current.currentTime = 0; } catch { /* ignore */ } current = null; }
}
export function playSound(src) {
  stopSound();
  if (!src || muted) return false;
  try {
    const a = new Audio(src);
    current = a;
    a.addEventListener('ended', () => { if (current === a) current = null; });
    a.addEventListener('error', () => { if (current === a) current = null; });
    a.play().catch(() => { if (current === a) current = null; }); // autoplay blocked / unsupported: stay silent
    return true;
  } catch { return false; }
}
export function toggleMute() {
  muted = !muted;
  try { sessionStorage.setItem(KEY, muted ? '1' : '0'); } catch { /* ignore */ }
  if (muted) stopSound();
  emit();
}
const subscribe = (f) => { subs.add(f); return () => subs.delete(f); };

export default function useSound() {
  const m = useSyncExternalStore(subscribe, () => muted, () => false);
  return { muted: m, play: playSound, stop: stopSound, toggle: toggleMute };
}

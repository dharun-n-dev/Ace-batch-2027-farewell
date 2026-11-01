import { useEffect, useState } from 'react';
const Q = '(prefers-reduced-motion: reduce)';
export default function useReducedMotion() {
  const [r, setR] = useState(() => (typeof window !== 'undefined' && window.matchMedia ? window.matchMedia(Q).matches : false));
  useEffect(() => {
    if (!window.matchMedia) return;
    const m = window.matchMedia(Q);
    const h = () => setR(m.matches);
    m.addEventListener?.('change', h);
    return () => m.removeEventListener?.('change', h);
  }, []);
  return r;
}

// Progress lives in localStorage only (this browser, this device). No accounts, no server.
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { site } from '../data/site.js';
import { challenges } from '../data/challenges.js';

const Ctx = createContext(null);
const empty = { solved: [], unlocked: false, finaleSeen: false };

function load() {
  try {
    const raw = localStorage.getItem(site.storageKey);
    if (!raw) return empty;
    const p = JSON.parse(raw);
    const ids = new Set(challenges.map((c) => c.id));
    const solved = (Array.isArray(p.solved) ? p.solved : []).filter((id) => ids.has(id));
    return { solved, unlocked: !!p.unlocked || solved.length >= challenges.length, finaleSeen: !!p.finaleSeen };
  } catch { return empty; }
}

export function ProgressProvider({ children }) {
  const [state, setState] = useState(load);

  useEffect(() => {
    try { localStorage.setItem(site.storageKey, JSON.stringify(state)); } catch { /* private mode etc. */ }
  }, [state]);

  const solve = useCallback((id) => {
    setState((s) => {
      if (s.solved.includes(id)) return s;
      const solved = [...s.solved, id];
      return { ...s, solved, unlocked: s.unlocked || solved.length >= challenges.length };
    });
  }, []);
  const markFinaleSeen = useCallback(() => setState((s) => (s.finaleSeen ? s : { ...s, finaleSeen: true })), []);
  const reset = useCallback(() => setState(empty), []);

  const value = useMemo(() => ({
    solved: state.solved,
    count: state.solved.length,
    total: challenges.length,
    unlocked: state.unlocked,
    finaleSeen: state.finaleSeen,
    isSolved: (id) => state.solved.includes(id),
    solve, markFinaleSeen, reset,
  }), [state, solve, markFinaleSeen, reset]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export const useProgress = () => useContext(Ctx);

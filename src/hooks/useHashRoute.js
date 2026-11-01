// Tiny hash router ("#/challenges"). Works on any static host with no server config.
import { useEffect, useState } from 'react';
const read = () => window.location.hash.replace(/^#/, '') || '/';
export const go = (path) => { window.location.hash = path; };
export default function useHashRoute() {
  const [path, setPath] = useState(read);
  useEffect(() => {
    const on = () => setPath(read());
    window.addEventListener('hashchange', on);
    return () => window.removeEventListener('hashchange', on);
  }, []);
  return path;
}

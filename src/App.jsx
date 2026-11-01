import { useEffect, useRef } from 'react';
import useHashRoute from './hooks/useHashRoute.js';
import { useProgress } from './hooks/useProgress.jsx';
import Navbar from './components/Navbar.jsx';
import LandingPage from './pages/LandingPage.jsx';
import ChallengeDashboard from './pages/ChallengeDashboard.jsx';
import ChallengePage from './pages/ChallengePage.jsx';
import FinalePage from './pages/FinalePage.jsx';
import MemoryArchive from './pages/MemoryArchive.jsx';
import StickerVault from './pages/StickerVault.jsx';
import FarewellPage from './pages/FarewellPage.jsx';

const GATED = ['archive', 'vault', 'farewell', 'finale'];

function Locked() {
  const { count, total } = useProgress();
  return (
    <section className="page narrow center">
      <p className="orn" aria-hidden="true">✦</p>
      <h1 className="h1">This part of the archive is sealed</h1>
      <p className="lede">Solve all five challenges to open it. You have recovered {count} of {total} so far.</p>
      <a className="btn btn-primary" href="#/challenges">Go to the challenges</a>
    </section>
  );
}

export default function App() {
  const path = useHashRoute();
  const { unlocked } = useProgress();
  const mainRef = useRef(null);
  const first = useRef(true);
  const [seg, id] = path.split('/').filter(Boolean);

  useEffect(() => {
    if (first.current) { first.current = false; return; }
    window.scrollTo(0, 0);
    mainRef.current?.focus({ preventScroll: true });
  }, [path]);

  let page;
  if (GATED.includes(seg) && !unlocked) page = <Locked />;
  else if (seg === 'challenges') page = <ChallengeDashboard />;
  else if (seg === 'challenge') page = <ChallengePage id={id} key={id} />;
  else if (seg === 'finale') page = <FinalePage />;
  else if (seg === 'archive') page = <MemoryArchive />;
  else if (seg === 'vault') page = <StickerVault />;
  else if (seg === 'farewell') page = <FarewellPage />;
  else page = <LandingPage />;

  const current = !seg ? 'home' : seg === 'challenge' ? 'challenges' : seg;

  return (
    <>
      <a className="skip-link" href="#main" onClick={(e) => { e.preventDefault(); mainRef.current?.focus(); }}>Skip to content</a>
      <Navbar current={current} />
      <main id="main" ref={mainRef} tabIndex={-1}>{page}</main>
      <footer className="foot">
        <span aria-hidden="true">✦</span> Progress is saved in this browser only.
      </footer>
    </>
  );
}

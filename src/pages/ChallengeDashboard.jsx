import { useState } from 'react';
import { site } from '../data/site.js';
import { challenges, getChallenge } from '../data/challenges.js';
import { useProgress } from '../hooks/useProgress.jsx';
import ChallengeCard from '../components/ChallengeCard.jsx';
import ProgressBar from '../components/ProgressBar.jsx';
import Modal from '../components/Modal.jsx';

export default function ChallengeDashboard() {
  const { count, total, isSolved, unlocked, reset } = useProgress();
  const [confirm, setConfirm] = useState(false);

  return (
    <section className="page">
      <header className="page-head">
        <p className="kicker">{site.dashboardKicker}</p>
        <h1 className="h1">Five case files</h1>
        <p className="lede">{site.dashboardLabel}</p>
        <div className="counter">
          <p className="mono counter-text">CHALLENGES COMPLETED: {count}/{total}</p>
          <ProgressBar value={count} max={total} />
        </div>
      </header>

      {unlocked && (
        <div className="unlocked-panel paper">
          <p className="h-small">The archive is open</p>
          <div className="row-wrap">
            <a className="btn btn-primary" href="#/archive">Open gallery</a>
            <a className="btn btn-primary" href="#/vault">Open sticker vault</a>
            <a className="btn btn-ghost" href="#/farewell">Read the farewell</a>
            <a className="btn btn-ghost" href="#/finale">Replay the finale</a>
          </div>
        </div>
      )}

      <div className="grid-cards">
        {challenges.map((c) => {
          const missing = (c.requires || []).filter((id) => !isSolved(id));
          return (
            <ChallengeCard
              key={c.id}
              challenge={c}
              solved={isSolved(c.id)}
              locked={missing.length > 0}
              requiresTitles={missing.map((id) => getChallenge(id)?.title || id)}
            />
          );
        })}
      </div>

      <div className="reset-zone">
        <button type="button" className="link-btn" onClick={() => setConfirm(true)}>Reset my progress</button>
      </div>

      {confirm && (
        <Modal onClose={() => setConfirm(false)} label="Reset progress" className="confirm">
          <h2 className="h2">Reset all progress?</h2>
          <p>This clears solved challenges and the unlocked archive. Your progress is saved only in this browser on this device (localStorage), so it does not sync between devices and resetting here affects nothing else.</p>
          <div className="row-wrap">
            <button type="button" className="btn btn-ghost" onClick={() => setConfirm(false)} data-autofocus>Keep my progress</button>
            <button type="button" className="btn btn-danger" onClick={() => { reset(); setConfirm(false); }}>Reset progress</button>
          </div>
        </Modal>
      )}
    </section>
  );
}

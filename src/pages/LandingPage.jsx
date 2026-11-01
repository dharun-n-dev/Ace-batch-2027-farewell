import { site } from '../data/site.js';
import { useProgress } from '../hooks/useProgress.jsx';

export default function LandingPage() {
  const { count, total, unlocked } = useProgress();
  return (
    <section className="landing">
      <div className="invite">
        <p className="orn" aria-hidden="true">✦ &nbsp;·&nbsp; ✦ &nbsp;·&nbsp; ✦</p>
        <p className="kicker">{site.dashboardKicker}</p>
        <h1 className="title">{site.title}</h1>
        <p className="tagline">{site.tagline}</p>
        <div className="rule" aria-hidden="true" />
        <p className="intro">{site.intro}</p>
        <a className="btn btn-emboss" href="#/challenges">BEGIN THE MISSION</a>
        {count > 0 && (
          <p className="landing-progress mono">
            {unlocked ? 'Archive unlocked' : `${count} of ${total} memories recovered`}
          </p>
        )}
      </div>
    </section>
  );
}

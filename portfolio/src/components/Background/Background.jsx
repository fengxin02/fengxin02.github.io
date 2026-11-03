import Section from '../Section/Section';
import { background } from '../../data/content';
import './Background.css';

export default function Background() {
  return (
    <Section id="background" title="Background">
      <div className="background-grid">
        {background.map((b) => (
          <div key={b.title} className="background-card">
            <h3 className="bento-title-small">{b.title}</h3>
            {b.lines.map((line) => (
              <p key={line} className="background-line">{line}</p>
            ))}
          </div>
        ))}
      </div>
    </Section>
  );
}

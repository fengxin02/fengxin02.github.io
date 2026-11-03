import Section from '../Section/Section';
import { projects } from '../../data/content';
import './Projects.css';

export default function Projects() {
  return (
    <Section id="projects" title="Projects">
      <div className="project-grid">
        {projects.map((p, i) => (
          <article key={p.title} className={`project-card ${i === 0 ? 'featured' : ''}`}>
            <h3 className="project-title">{p.title}</h3>
            <p className="project-text">{p.description}</p>
            <div className="tech-tags">
              {p.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
            <div className="project-links">
              {p.links.map((link) => (
                <a key={link.url} href={link.url} target="_blank" rel="noopener noreferrer">
                  {link.label} →
                </a>
              ))}
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}

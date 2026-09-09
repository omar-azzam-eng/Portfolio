import { MapPin } from 'lucide-react';
import { education, languages } from '../data/portfolio';
import { Reveal } from '../ui/Reveal';
import { SectionTitle } from '../ui/SectionTitle';

const TITLE_ID = 'education-title';

export function EducationSection() {
  return (
    <section id="education" className="section education-section" aria-labelledby={TITLE_ID}>
      <SectionTitle id={TITLE_ID} number="05" eyebrow="Education & Languages" title="Technical roots." />
      <div className="education-grid">
        <Reveal className="education-card main-card">
          <span className="card-code">EDU / 01</span>
          <time>{education.period}</time>
          <p>{education.institution}</p>
          <h3>{education.degree}</h3>
          <small><MapPin size={15} aria-hidden="true" /> {education.location}</small>
        </Reveal>
        <div className="language-stack">
          {languages.map((language, index) => (
            <Reveal key={language.name} className="education-card" delay={index * 0.06}>
              <span className="card-code">LANG / {String(index + 1).padStart(2, '0')}</span>
              <h3>{language.name}</h3>
              <p>{language.level}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

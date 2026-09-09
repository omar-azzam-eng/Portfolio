import { ExperienceItem } from '../components/ExperienceItem';
import { experiences } from '../data/portfolio';
import { SectionTitle } from '../ui/SectionTitle';

const TITLE_ID = 'experience-title';

export function ExperienceSection() {
  return (
    <section id="experience" className="section experience-section" aria-labelledby={TITLE_ID}>
      <SectionTitle id={TITLE_ID} number="03" eyebrow="Experience" title="Built in real environments." />
      <div className="timeline" aria-label="Career timeline">
        {experiences.map((experience, index) => (
          <ExperienceItem key={`${experience.company}-${experience.role}`} experience={experience} index={index} />
        ))}
      </div>
    </section>
  );
}

import { SkillConstellation } from '../components/SkillConstellation';
import { skillGroups } from '../data/portfolio';
import { SectionTitle } from '../ui/SectionTitle';

const TITLE_ID = 'skills-title';

export function SkillsSection() {
  return (
    <section id="skills" className="section skills-section" aria-labelledby={TITLE_ID}>
      <SectionTitle id={TITLE_ID} number="04" eyebrow="Technology Constellation" title="A stack built in layers." />
      <div className="skill-groups">
        {skillGroups.map((group, index) => <SkillConstellation key={group.title} group={group} index={index} />)}
      </div>
    </section>
  );
}

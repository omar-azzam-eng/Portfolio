import { ProjectCard } from '../components/ProjectCard';
import { projects } from '../data/portfolio';
import { SectionTitle } from '../ui/SectionTitle';

const TITLE_ID = 'work-title';

export function WorkSection() {
  return (
    <section id="work" className="section work-section" aria-labelledby={TITLE_ID}>
      <SectionTitle id={TITLE_ID} number="01" eyebrow="Selected Work" title="Systems, not screenshots." />
      <p className="section-lede">
        Each project is presented through the system it solves: data moving through APIs, services, databases, and models.
      </p>
      <div className="projects">
        {projects.map((project, index) => <ProjectCard key={project.title} project={project} index={index} />)}
      </div>
    </section>
  );
}

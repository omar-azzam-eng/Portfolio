import { ProjectCard } from '../components/ProjectCard';
import { projects } from '../data/portfolio';
import { SectionTitle } from '../ui/SectionTitle';

const TITLE_ID = 'work-title';

export function WorkSection() {
  return (
    <section id="work" className="section work-section" aria-labelledby={TITLE_ID}>
      <div className="identity-title-wrap">
        <SectionTitle
          id={TITLE_ID}
          number="01"
          eyebrow="Projects"
          title="Building Scalable & Intelligent Systems"
        />
      </div>
      <div className="projects">
        {projects.map((project, index) => (
          <ProjectCard key={project.title} project={project} index={index} />
        ))}
      </div>
    </section>
  );
}

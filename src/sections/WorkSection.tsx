import { ProjectCard } from '../components/ProjectCard';
import { projects } from '../data/portfolio';

const TITLE_ID = 'work-title';

export function WorkSection() {
  return (
    <section id="work" className="section work-section" aria-labelledby={TITLE_ID}>
      <div className="projects">
        {projects.map((project, index) => (
          <ProjectCard key={project.title} project={project} index={index} />
        ))}
      </div>
    </section>
  );
}

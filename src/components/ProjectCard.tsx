import { motion, useReducedMotion } from 'framer-motion';
import { REVEAL_TRANSITION, VIEWPORT_DEEP } from '../constants/motion';
import type { Project } from '../types/portfolio';
import { ProjectVisual } from './ProjectVisual';

interface ProjectCardProps {
  readonly project: Project;
  readonly index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.article
      className={`project-story ${index % 2 === 1 ? 'project-story-reverse' : ''}`}
      initial={reduceMotion ? false : { opacity: 0, y: 28 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={VIEWPORT_DEEP}
      transition={REVEAL_TRANSITION}
    >
      <div className="project-copy">
        <div className="project-topline">
          <span>{project.index}</span>
          <span>{project.type}</span>
          <time>{project.period}</time>
        </div>

        <h3>{project.title}</h3>

        <div className="project-narrative">
          <p className="project-label">System brief</p>
          <p className="project-description">{project.description}</p>
        </div>

        <div className="project-narrative">
          <p className="project-label">Engineering notes</p>
          <ul className="project-points">
            {project.points.map((point) => <li key={point}>{point}</li>)}
          </ul>
        </div>

        <div className="project-stack-block">
          <p className="project-label">Stack</p>
          <ul className="tags" aria-label={`${project.title} technologies`}>
            {project.stack.map((technology) => <li key={technology}>{technology}</li>)}
          </ul>
        </div>
      </div>
      <ProjectVisual project={project} />
    </motion.article>
  );
}

import { motion, useReducedMotion } from 'framer-motion';
import { VIEWPORT_ONCE } from '../constants/motion';
import type { Experience } from '../types/portfolio';

interface ExperienceItemProps {
  readonly experience: Experience;
  readonly index: number;
}

export function ExperienceItem({ experience, index }: ExperienceItemProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.article
      className="timeline-item"
      initial={reduceMotion ? false : { opacity: 0, x: index % 2 === 0 ? -28 : 28 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, x: 0 }}
      viewport={VIEWPORT_ONCE}
      transition={{ delay: reduceMotion ? 0 : index * 0.08 }}
    >
      <div className="timeline-node" aria-hidden="true"><span>{String(index + 1).padStart(2, '0')}</span></div>
      <div className="timeline-meta">
        <time>{experience.period}</time>
        <span>{experience.location}</span>
      </div>
      <div className="timeline-content">
        <p className="company">{experience.company}</p>
        <h3>{experience.role}</h3>
        <ul>
          {experience.points.map((point) => <li key={point}>{point}</li>)}
        </ul>
      </div>
    </motion.article>
  );
}

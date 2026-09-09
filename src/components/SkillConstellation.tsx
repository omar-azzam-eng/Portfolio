import { motion, useReducedMotion } from 'framer-motion';
import { useState } from 'react';
import type { SkillGroup } from '../types/portfolio';

interface SkillConstellationProps {
  readonly group: SkillGroup;
  readonly index: number;
}

export function SkillConstellation({ group, index }: SkillConstellationProps) {
  const reduceMotion = useReducedMotion();
  const [activeSkill, setActiveSkill] = useState(group.skills[0]);

  return (
    <motion.article
      className="skill-group"
      initial={reduceMotion ? false : { opacity: 0, y: 28 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ delay: index * 0.06 }}
    >
      <header>
        <span>{String(index + 1).padStart(2, '0')}</span>
        <h3>{group.title}</h3>
        <p>{group.description}</p>
      </header>

      <div className="constellation-shell skill-grid-shell">
        <ul className="skill-grid" aria-label={`${group.title} skills`}>
          {group.skills.map((skill) => {
            const isActive = activeSkill === skill;
            return (
              <li key={skill}>
                <motion.button
                  type="button"
                  className={isActive ? 'skill-node is-active' : 'skill-node'}
                  aria-pressed={isActive}
                  onClick={() => setActiveSkill(skill)}
                  onMouseEnter={() => setActiveSkill(skill)}
                  onFocus={() => setActiveSkill(skill)}
                  whileTap={reduceMotion ? undefined : { scale: 0.96 }}
                >
                  <span>{skill}</span>
                  <i aria-hidden="true" />
                </motion.button>
              </li>
            );
          })}
        </ul>
        <div className="constellation-status" aria-live="polite">
          <span>ACTIVE SKILL</span>
          <strong>{activeSkill}</strong>
        </div>
      </div>
    </motion.article>
  );
}

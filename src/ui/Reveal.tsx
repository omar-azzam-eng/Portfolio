import { motion, useReducedMotion } from 'framer-motion';
import type { PropsWithChildren } from 'react';
import { REVEAL_TRANSITION, VIEWPORT_ONCE } from '../constants/motion';

interface RevealProps extends PropsWithChildren {
  readonly className?: string;
  readonly delay?: number;
  readonly distance?: number;
}

export function Reveal({ children, className, delay = 0, distance = 28 }: RevealProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: distance }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={VIEWPORT_ONCE}
      transition={{ ...REVEAL_TRANSITION, delay }}
    >
      {children}
    </motion.div>
  );
}

import type { Transition, ViewportOptions } from 'framer-motion';

export const VIEWPORT_ONCE: ViewportOptions = {
  once: true,
  margin: '-80px',
};

export const VIEWPORT_DEEP: ViewportOptions = {
  once: true,
  margin: '-100px',
};

export const REVEAL_TRANSITION: Transition = {
  duration: 0.55,
  ease: [0.22, 1, 0.36, 1],
};

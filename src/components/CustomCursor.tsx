import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';
import { useEffect, useState } from 'react';

interface CursorMeta {
  readonly label: string;
  readonly active: boolean;
}

const DEFAULT_META: CursorMeta = { label: '', active: false };

export function CustomCursor() {
  const reduceMotion = useReducedMotion();
  const pointerX = useMotionValue(-100);
  const pointerY = useMotionValue(-100);
  const x = useSpring(pointerX, { stiffness: 700, damping: 45, mass: 0.15 });
  const y = useSpring(pointerY, { stiffness: 700, damping: 45, mass: 0.15 });
  const [meta, setMeta] = useState<CursorMeta>(DEFAULT_META);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const media = window.matchMedia('(pointer: fine)');
    const sync = () => setEnabled(media.matches && !reduceMotion);
    sync();
    media.addEventListener('change', sync);
    return () => media.removeEventListener('change', sync);
  }, [reduceMotion]);

  useEffect(() => {
    if (!enabled) return undefined;

    let previousLabel = '';
    let previousActive = false;

    const handleMove = (event: MouseEvent) => {
      pointerX.set(event.clientX);
      pointerY.set(event.clientY);

      const target = event.target instanceof Element ? event.target.closest<HTMLElement>('[data-cursor]') : null;
      const label = target?.dataset.cursor ?? '';
      const active = Boolean(target);

      if (label !== previousLabel || active !== previousActive) {
        previousLabel = label;
        previousActive = active;
        setMeta({ label, active });
      }
    };

    const handleLeave = () => {
      pointerX.set(-100);
      pointerY.set(-100);
      previousLabel = '';
      previousActive = false;
      setMeta(DEFAULT_META);
    };

    window.addEventListener('mousemove', handleMove, { passive: true });
    document.documentElement.addEventListener('mouseleave', handleLeave);

    return () => {
      window.removeEventListener('mousemove', handleMove);
      document.documentElement.removeEventListener('mouseleave', handleLeave);
    };
  }, [enabled, pointerX, pointerY]);

  if (!enabled) return null;

  return (
    <motion.div
      className={`custom-cursor ${meta.active ? 'is-active' : ''}`}
      style={{ x, y }}
      animate={{ scale: meta.active ? 1 : 0.45 }}
      transition={{ duration: 0.16, ease: 'easeOut' }}
      aria-hidden="true"
    >
      <span>{meta.label}</span>
    </motion.div>
  );
}

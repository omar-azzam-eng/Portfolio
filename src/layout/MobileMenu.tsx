import { ChevronRight, X } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { NAVIGATION_ITEMS } from '../constants/navigation';

interface MobileMenuProps {
  readonly onClose: () => void;
}

const FOCUSABLE_SELECTOR = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function MobileMenu({ onClose }: MobileMenuProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
        return;
      }

      if (event.key !== 'Tab' || !dialogRef.current) return;

      const focusable = Array.from(dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR));
      const first = focusable[0];
      const last = focusable.at(-1);

      if (!first || !last) return;

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <motion.div
      ref={dialogRef}
      id="mobile-navigation"
      className="mobile-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Site navigation"
      initial={reduceMotion ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={reduceMotion ? undefined : { opacity: 0 }}
      transition={{ duration: reduceMotion ? 0 : 0.2 }}
    >
      <button ref={closeButtonRef} type="button" onClick={onClose} aria-label="Close menu">
        <X aria-hidden="true" />
      </button>
      <nav aria-label="Mobile navigation">
        {NAVIGATION_ITEMS.map((item, index) => (
          <motion.a
            key={item.href}
            href={item.href}
            onClick={onClose}
            initial={reduceMotion ? false : { x: 24, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: reduceMotion ? 0 : index * 0.04, duration: 0.28 }}
          >
            {item.label}
            <ChevronRight aria-hidden="true" />
          </motion.a>
        ))}
      </nav>
    </motion.div>
  );
}

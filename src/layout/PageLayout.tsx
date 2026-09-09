import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion';
import { useState } from 'react';
import { useBodyScrollLock } from '../hooks/useBodyScrollLock';
import { MobileMenu } from './MobileMenu';
import { SiteHeader } from './SiteHeader';
import { CustomCursor } from '../components/CustomCursor';
import type { PropsWithChildren } from 'react';

export function PageLayout({ children }: PropsWithChildren) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 28,
    restDelta: 0.001,
  });

  useBodyScrollLock(isMenuOpen);

  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <motion.div className="scroll-progress" style={{ scaleX }} aria-hidden="true" />
      <CustomCursor />
      <SiteHeader isMenuOpen={isMenuOpen} onOpenMenu={() => setIsMenuOpen(true)} />
      <AnimatePresence>
        {isMenuOpen ? <MobileMenu onClose={() => setIsMenuOpen(false)} /> : null}
      </AnimatePresence>
      <main id="main-content">{children}</main>
    </>
  );
}

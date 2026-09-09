import { Menu } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { NAVIGATION_ITEMS } from '../constants/navigation';
import { useActiveSection } from '../hooks/useActiveSection';

interface SiteHeaderProps {
  readonly isMenuOpen: boolean;
  readonly onOpenMenu: () => void;
}

export function SiteHeader({ isMenuOpen, onOpenMenu }: SiteHeaderProps) {
  const activeSection = useActiveSection();
  const [isScrolled, setIsScrolled] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const wasMenuOpen = useRef(false);

  useEffect(() => {
    const syncScrollState = () => setIsScrolled(window.scrollY > 28);
    syncScrollState();
    window.addEventListener('scroll', syncScrollState, { passive: true });
    return () => window.removeEventListener('scroll', syncScrollState);
  }, []);

  useEffect(() => {
    if (wasMenuOpen.current && !isMenuOpen) menuButtonRef.current?.focus();
    wasMenuOpen.current = isMenuOpen;
  }, [isMenuOpen]);

  return (
    <header className={`site-header ${isScrolled ? 'is-scrolled' : ''}`}>
      <a className="brand" href="#top" aria-label="Omar Azzam home">
        <span aria-hidden="true">OA</span>
        <small>
          BACKEND
          <br />
          DEVELOPER
        </small>
      </a>

      <nav className="desktop-nav" aria-label="Primary navigation">
        {NAVIGATION_ITEMS.map((item) => {
          const sectionId = item.href.replace('#', '');
          const isActive = sectionId === activeSection;
          return (
            <a key={item.href} href={item.href} className={isActive ? 'is-active' : undefined} aria-current={isActive ? 'location' : undefined}>
              {item.label}
            </a>
          );
        })}
      </nav>

      <button
        ref={menuButtonRef}
        className="menu-button"
        type="button"
        onClick={onOpenMenu}
        aria-label="Open menu"
        aria-expanded={isMenuOpen}
        aria-controls="mobile-navigation"
      >
        <Menu size={22} aria-hidden="true" />
      </button>
    </header>
  );
}

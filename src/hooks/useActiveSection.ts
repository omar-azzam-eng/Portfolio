import { useEffect, useState } from 'react';
import { NAVIGATION_ITEMS } from '../constants/navigation';

const SECTION_IDS = NAVIGATION_ITEMS.map((item) => item.href.replace('#', ''));

export function useActiveSection() {
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const sections = SECTION_IDS.map((id) => document.getElementById(id)).filter(
      (section): section is HTMLElement => section !== null,
    );

    if (sections.length === 0) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visibleEntry?.target.id) setActiveSection(visibleEntry.target.id);
      },
      { rootMargin: '-28% 0px -58% 0px', threshold: [0, 0.15, 0.35, 0.6] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return activeSection;
}

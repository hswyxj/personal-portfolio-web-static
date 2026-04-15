import { useEffect } from 'react';

export function useScrollReveal() {
  useEffect(() => {
    if (typeof window === 'undefined' || typeof IntersectionObserver === 'undefined' || window.matchMedia('(max-width: 767px)').matches) {
      document.querySelectorAll('main section').forEach((section) => {
        section.classList.add('is-visible');
      });
      return;
    }

    const sections = Array.from(document.querySelectorAll('main section'));
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting || entry.intersectionRatio > 0) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: '0px 0px -40px 0px',
        threshold: 0.03,
      },
    );

    sections.forEach((section) => {
      section.classList.add('reveal-item');
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);
}

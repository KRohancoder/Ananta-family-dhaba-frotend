import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/** Resets scroll position on every route change, like a traditional multi-page site. */
export function useScrollToTop(): void {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [pathname]);
}

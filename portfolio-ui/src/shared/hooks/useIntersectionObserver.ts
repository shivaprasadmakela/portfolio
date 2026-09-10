import { useEffect, useState, type RefObject } from 'react';

interface Options extends IntersectionObserverInit {
  freezeOnceVisible?: boolean;
}

export function useIntersectionObserver(
  elementRef: RefObject<Element | null>,
  {
    threshold = 0,
    root = null,
    rootMargin = '0%',
    freezeOnceVisible = false,
  }: Options
): IntersectionObserverEntry | undefined {
  const [entry, setEntry] = useState<IntersectionObserverEntry>();

  const frozen = entry?.isIntersecting && freezeOnceVisible;

  // threshold may be an array; serialise it once so the dependency is a stable
  // primitive the linter can check, instead of a new reference every render.
  const thresholdKey = JSON.stringify(threshold);

  useEffect(() => {
    const node = elementRef?.current;
    const hasIOSupport = !!window.IntersectionObserver;

    if (!hasIOSupport || frozen || !node) return;

    const observer = new IntersectionObserver(
      ([newEntry]) => setEntry(newEntry),
      { threshold: JSON.parse(thresholdKey) as number | number[], root, rootMargin }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [elementRef, thresholdKey, root, rootMargin, frozen]);

  return entry;
}

export default useIntersectionObserver;

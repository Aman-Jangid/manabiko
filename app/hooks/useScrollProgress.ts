import { useState, useCallback, useEffect, RefObject } from "react";

export function useScrollProgress(ref: RefObject<HTMLElement | null>) {
  const [scrollProgress, setScrollProgress] = useState(0);

  const updateScrollProgress = useCallback(() => {
    if (!ref.current) return;

    const { scrollTop, scrollHeight, clientHeight } = ref.current;
    const scrollableDistance = scrollHeight - clientHeight;

    if (scrollableDistance > 0) {
      const progress = (scrollTop / scrollableDistance) * 100;
      setScrollProgress(progress);
    }
  }, [ref]);

  useEffect(() => {
    const element = ref.current;
    if (element) {
      element.addEventListener("scroll", updateScrollProgress);
      updateScrollProgress(); // Initial calculation
    }

    return () => {
      if (element) {
        element.removeEventListener("scroll", updateScrollProgress);
      }
    };
  }, [ref, updateScrollProgress]);

  return scrollProgress;
}

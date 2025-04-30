import { useCallback, useEffect, useState } from "react";

export function useResponsive() {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  const updateMediaQuery = useCallback(() => {
    const width = window.innerWidth;
    setIsMobile(width < 640);
    setIsTablet(width >= 640 && width < 1024);
    setIsDesktop(width >= 1024);
  }, []);

  useEffect(() => {
    updateMediaQuery();
    window.addEventListener("resize", updateMediaQuery);
    return () => {
      window.removeEventListener("resize", updateMediaQuery);
    };
  }, [updateMediaQuery]);

  return { isMobile, isTablet, isDesktop };
}

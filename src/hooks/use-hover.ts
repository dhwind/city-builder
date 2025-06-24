'use client';

import { RefObject, useEffect, useState } from 'react';

const useHover = <T extends HTMLElement = HTMLElement>(
  elementRef: RefObject<T | null>,
): boolean => {
  const [isHovered, setIsHovered] = useState<boolean>(false);

  useEffect(() => {
    const element = elementRef ? elementRef.current : null;

    if (!element) return;

    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);

    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mouseenter', handleMouseEnter);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [elementRef]);

  return isHovered;
};

export { useHover };

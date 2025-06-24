'use client';

import { isMobile, isTablet, isDesktop } from 'react-device-detect';

const useDeviceDetection = () => {
  return {
    isMobile,
    isTablet,
    isDesktop,
  };
};

export { useDeviceDetection };

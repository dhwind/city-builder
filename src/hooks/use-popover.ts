'use client';

import { useState } from 'react';

const usePopover = () => {
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [coordinates, setCoordinates] = useState({ x: 0, y: 0 });

  const handlePopoverTrigger = (event: React.MouseEvent<HTMLDivElement>) => {
    setCoordinates({ x: event.clientX, y: event.clientY });
    setPopoverOpen(true);
  };

  const handlePopoverClose = () => {
    setPopoverOpen(false);
  };

  return {
    popoverOpen,
    coordinates,
    handlePopoverTrigger,
    handlePopoverClose,
    setPopoverOpen,
  };
};

export { usePopover };

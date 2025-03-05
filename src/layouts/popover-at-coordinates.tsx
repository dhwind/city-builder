import React, { ReactNode, useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import {
  Popover,
  PopoverAnchor,
  PopoverContent,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';

type ComponentProps = {
  open: boolean;
  coordinates: {
    x: number;
    y: number;
  };
  children: ReactNode;
  setPopoverOpen: (open: boolean) => void;
};

const PopoverAtCoordinates: React.FC<ComponentProps> = ({
  open,
  coordinates,
  children,
  setPopoverOpen,
}) => {
  const triggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (triggerRef.current) {
      triggerRef.current.style.left = `${coordinates.x}px`;
      triggerRef.current.style.top = `${coordinates.y}px`;
    }
  }, [coordinates.x, coordinates.y]);

  return (
    <Popover open={open} onOpenChange={setPopoverOpen}>
      <PopoverAnchor ref={triggerRef} style={{ position: 'fixed' }} />
      <PopoverContent>
        <div className="flex justify-between gap-x-1">
          {children}
          <Button
            variant="ghost"
            className="!h-auto !p-2 rounded"
            onClick={e => {
              e.stopPropagation();
              setPopoverOpen(false);
            }}
          >
            <X size={16} />
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default PopoverAtCoordinates;

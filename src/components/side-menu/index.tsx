'use client';

import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import LanguageSelector from '@/components/language-selector';
import { BuildingsCardsList } from '@/features/builder/components';
import { cn } from '@/lib/utils';
import { useState } from 'react';

const SideMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };
  return (
    <>
      <Button
        variant="ghost"
        onClick={handleOpen}
        className="p-2 !h-auto !w-auto"
      >
        <Menu className="min-w-8 min-h-8" size={32} />
      </Button>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 bg-opacity-50 z-80 md:hidden"
          onClick={handleClose}
        />
      )}
      <div
        className={cn(
          'fixed top-0 left-0 h-full w-90 bg-white shadow-lg overflow-y-auto transform transition-transform duration-300 z-100 md:hidden',
          isOpen ? 'translate-x-0' : '-translate-x-full',
        )}
      >
        <div className="py-4 h-full flex flex-col">
          <div className=" px-4 flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold">Menu</h2>
            <Button
              variant="ghost"
              onClick={handleClose}
              className="p-2 h-auto"
            >
              <X className="min-w-8 min-h-8" size={32} />
            </Button>
          </div>

          <div className="mb-6 px-4">
            <LanguageSelector />
          </div>

          <div className="flex-1">
            <BuildingsCardsList />
          </div>
        </div>
      </div>
    </>
  );
};

export default SideMenu;

'use client';

import Image from 'next/image';
import Link from 'next/link';
import logoSrc from '@/assets/logo.svg';
import logoSrcMobile from '@/assets/logo-icon.svg';
import LanguageSelector from '@/components/language-selector';
import SideMenu from '@/components/side-menu';
import { useDeviceDetection } from '@/hooks';

const Header: React.FC = () => {
  const { isMobile } = useDeviceDetection();

  return (
    <>
      <header className="w-full bg-gray-100 p-3 flex justify-center items-center md:px-12">
        <div className="w-full max-w-screen-2xl flex items-center gap-x-4 md:justify-between">
          {isMobile ? <SideMenu /> : null}
          <Link href="/">
            {isMobile ? (
              <Image
                src={logoSrcMobile}
                alt="logo"
                width={50}
                height={50}
                priority
              />
            ) : (
              <Image
                src={logoSrc}
                alt="logo"
                width={200}
                height={54}
                priority
              />
            )}
          </Link>
          {isMobile ? null : <LanguageSelector />}
        </div>
      </header>
    </>
  );
};

export default Header;

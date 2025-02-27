import Image from 'next/image';
import Link from 'next/link';
import logoSrc from '@/assets/logo.svg';

const Header: React.FC = () => {
  return (
    <header className="w-full bg-gray-100 p-3 flex justify-center items-center md:px-12">
      <div className="w-full max-w-screen-2xl flex">
        <Link href="/about">
          <Image src={logoSrc} alt="logo" width={200} height={100} />
        </Link>
      </div>
    </header>
  );
};

export default Header;

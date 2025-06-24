import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import LoaderLayout from '@/layouts/loader';

type DynamicImageProps = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
};

const DynamicImage: React.FC<DynamicImageProps> = ({
  src,
  alt,
  width,
  height,
  className,
}) => {
  const [image, setImage] = useState('');

  useEffect(() => {
    if (!src) return;
    import(`@/assets/${src}`).then(setImage);
  }, [src]);

  return (
    <LoaderLayout isLoading={!image || !alt}>
      <Image
        className={className}
        style={{
          minWidth: width,
          minHeight: height,
        }}
        src={image}
        alt={alt}
        width={width}
        height={height}
      />
    </LoaderLayout>
  );
};

export default DynamicImage;

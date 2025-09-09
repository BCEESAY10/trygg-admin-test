import { useState } from 'react';

import Image from 'next/image';

interface SafeImageProps {
  src: string | null | undefined;
  alt: string;
  width: number;
  height: number;
  className?: string;
  fallback?: string;
}

export default function SafeImage({
  src,
  alt,
  width,
  height,
  className,
  fallback = '/user-placeholder.avif',
}: SafeImageProps) {
  const [imgSrc, setImgSrc] = useState(src ?? fallback);

  return (
    <Image
      src={imgSrc}
      alt={alt}
      width={width}
      height={height}
      className={className}
      style={{ objectFit: 'cover', borderRadius: '50%' }}
      onError={() => setImgSrc(fallback)}
    />
  );
}

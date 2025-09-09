import { useState } from "react";
import Image from "next/image";
import type { ImageProps } from "next/image";

interface AvatarImageProps extends Omit<ImageProps, "src" | "alt"> {
  src: string;
  alt?: string;
  fallbackSrc?: string;
  className?: string;
}

const AvatarImage = ({
  src,
  alt = "Avatar",
  width = 32,
  height = 32,
  fallbackSrc = "/fallback-avatar.png",
  className,
  style,
  ...rest
}: AvatarImageProps) => {
  const [imgSrc, setImgSrc] = useState<string>(src);

  return (
    <div><Image /></div>
  );
};

export default AvatarImage;

/**
 * Optimized Image Component for Chakra Hearts Visual Novel
 * Automatically serves WebP when supported, falls back to original format
 */

import React from "react";

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
  onLoad?: () => void;
  onError?: () => void;
}

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className,
  style,
  onLoad,
  onError,
}) => {
  // Convert PNG path to WebP path
  const webpSrc = src
    .replace(/\.(png|jpg|jpeg)$/i, ".webp")
    .replace("/backgrounds/", "/optimized/webp/")
    .replace("/characters/", "/optimized/webp/");

  return (
    <picture className={className} style={style}>
      <source srcSet={webpSrc} type="image/webp" />
      <img
        src={src}
        alt={alt}
        onLoad={onLoad}
        onError={onError}
        loading="lazy"
      />
    </picture>
  );
};

export default OptimizedImage;

/**
 * Optimized Image Hook - Separate file for Fast Refresh compatibility
 */

import React from "react";

export const useOptimizedImage = (originalSrc: string) => {
  const [imageSrc, setImageSrc] = React.useState(originalSrc);
  const [isWebPSupported, setIsWebPSupported] = React.useState(false);

  React.useEffect(() => {
    // Check WebP support
    const checkWebPSupport = () => {
      const canvas = document.createElement("canvas");
      canvas.width = 1;
      canvas.height = 1;
      return canvas.toDataURL("image/webp").indexOf("data:image/webp") === 0;
    };

    const webpSupported = checkWebPSupport();
    setIsWebPSupported(webpSupported);

    if (webpSupported) {
      const webpSrc = originalSrc
        .replace(/\.(png|jpg|jpeg)$/i, ".webp")
        .replace("/backgrounds/", "/optimized/webp/")
        .replace("/characters/", "/optimized/webp/");

      // Test if WebP file exists
      const img = new Image();
      img.onload = () => setImageSrc(webpSrc);
      img.onerror = () => setImageSrc(originalSrc);
      img.src = webpSrc;
    } else {
      setImageSrc(originalSrc);
    }
  }, [originalSrc]);

  return { imageSrc, isWebPSupported };
};

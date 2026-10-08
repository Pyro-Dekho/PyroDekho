"use client";

import { useState } from "react";
import Image from "next/image";
import { cloudinaryLoader } from "@/utils/optimizeImage";

function ProductImageZoom({ src, alt }) {
  const [zoom, setZoom] = useState({ active: false, x: 50, y: 50 });

  const handleZoomMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setZoom({
      active: true,
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  return (
    <div
      className="pd-image"
      onMouseMove={handleZoomMove}
      onMouseLeave={() => setZoom((z) => ({ ...z, active: false }))}
    >
      {src && (
        <Image
          loader={cloudinaryLoader}
          src={src}
          alt={alt}
          width={1000}
          height={800}
          sizes="(max-width: 900px) 100vw, 50vw"
          priority
          style={
            zoom.active
              ? {
                  transform: "scale(1.8)",
                  transformOrigin: `${zoom.x}% ${zoom.y}%`,
                }
              : undefined
          }
        />
      )}
    </div>
  );
}

export default ProductImageZoom;

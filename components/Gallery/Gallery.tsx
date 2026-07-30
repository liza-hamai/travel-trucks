"use client";

import { useState } from "react";
import Image from "next/image";
import type { CamperGalleryImage } from "@/types/camper";
import css from "./Gallery.module.css";

interface GalleryProps {
  images: CamperGalleryImage[];
  alt: string;
}

export default function Gallery({ images, alt }: GalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (images.length === 0) return null;

  const activeImage = images[activeIndex];

  return (
    <div className={css.gallery}>
      <div className={css.main}>
        <Image
          src={activeImage.original}
          alt={alt}
          fill
          sizes="640px"
          className={css.mainImage}
          priority
        />
      </div>

      <ul className={css.thumbs}>
        {images.map((image, index) => (
          <li key={image.id}>
            <button
              type="button"
              className={`${css.thumb} ${
                index === activeIndex ? css.active : ""
              }`}
              onClick={() => setActiveIndex(index)}
            >
              <Image
                src={image.thumb}
                alt={alt}
                fill
                sizes="150px"
                className={css.thumbImage}
              />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
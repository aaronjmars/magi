import React, { useState } from "react";
import Image from "next/image";
import styles from "./Hit.module.css";
import { track } from "@vercel/analytics";

const Hit = ({ hit, instance }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleClick = (image_url) => {
    setSelectedImage(image_url);
    if (window.umami) {
      window.umami.track("ImageClick");
    }
  };

  const handleClose = (e) => {
    e.stopPropagation();
    setSelectedImage(null);
  };

  const handleRecast = (e) => {
    e.stopPropagation();
    track("Recasted");
  };

  return (
    <div
      onClick={() => handleClick(hit.image_url)}
      className={styles.hitContainer}
    >
      {hit && (
        <Image
          src={hit.image_url}
          alt={`${hit.author_username} ${hit.cast_caption}`}
          width={200}
          height={200}
          className={styles.hitImage}
          priority
          placeholder="blur"
          blurDataURL={hit.image_blur}
        />
      )}
      {selectedImage && (
        <div onClick={handleClose} className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <Image
              src={selectedImage}
              alt="Selected"
              layout="fill"
              objectFit="contain"
              style={{ zIndex: 1 }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Hit;

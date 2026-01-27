import { useState } from "react";
import styles from "./TopBanner.module.css";

const TopBanner = ({ instance }) => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className={styles.banner}>
      <a
        href={`https://infinitememes.lol/`}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.link}
      >
        Generate infinite memes with AI ✨
      </a>
      <button
        onClick={() => setIsVisible(false)}
        className={styles.closeButton}
      >
        &times;
      </button>
    </div>
  );
};

export default TopBanner;

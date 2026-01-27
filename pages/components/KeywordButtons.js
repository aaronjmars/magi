import React, { useState, useEffect } from "react";
import styles from "./KeywordButtons.module.css";

const searchPlaceholders = [
  "gm",
  "Meme",
  "Elon",
  "Cartoon",
  "Twitter",
  "Dog",
  "Pepe",
  "Anime",
  "SpongeBob",
  "Computer",
  "Cat",
  "Simpson",
  "Weekend",
  "Job",
  "Crypto",
];

const KeywordButtons = ({ instance }) => {
  const [keywords, setKeywords] = useState([]);

  useEffect(() => {
    const randomKeywords = [...searchPlaceholders]
      .sort(() => 0.5 - Math.random())
      .slice(0, 5);
    setKeywords(randomKeywords);
  }, []);

  const getHref = (keyword) => {
    if (instance === "degen") {
      return `https://magi.lol/degen?search=${keyword}`;
    }
    return `https://magi.lol/?search=${keyword}`;
  };

  return (
    <div className={styles.keywordButtonsContainer}>
      {keywords.map((keyword, index) => (
        <a href={getHref(keyword)} key={index} className={styles.keywordButton} data-umami-event={'KeywordClick'}>
          {keyword}
        </a>
      ))}
    </div>
  );
};

export default KeywordButtons;

import React, { useState, useEffect } from "react";

interface TypingAnimationProps {
  text: string;
}

const TypingAnimation: React.FC<TypingAnimationProps> = ({ text }) => {
  const [displayedText, setDisplayedText] = useState<string>("");

  useEffect(() => {
    let currentIndex = 0;

    const intervalId = setInterval(() => {
      if (currentIndex < text.length) {
        setDisplayedText((prev) => prev + text[currentIndex]);
        currentIndex++;
      } else {
        clearInterval(intervalId);
      }
    }, 2);

    return () => clearInterval(intervalId);
  }, [text]);

  return <p className="text-white">{displayedText}</p>;
};

export default TypingAnimation;

// components/EnhancedLevelOne.tsx
'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

const EnhancedLevelOne = () => {
  const [position, setPosition] = useState({ top: '50%', left: '50%' });
  const [clickCount, setClickCount] = useState(0);
  const MAX_CLICKS = 10;

  const updateScore = async () => {
    try {
      const response = await fetch("/api/score", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!response.ok) {
        console.error("Failed to update score");
      }
    } catch (error) {
      console.error("Error updating score:", error);
    }
  };

  const handleClick = async (e) => {
    moveButton(e);
    setClickCount(prev => prev + 1);
    await updateScore();
  };

  const moveButton = (e) => {
    const button = e.currentTarget;
    const boundingBox = button.getBoundingClientRect();

    // Make the movement more erratic based on click count
    const range = 100 + (clickCount * 20);
    const offsetX = (Math.random() - 0.5) * range * 2;
    const offsetY = (Math.random() - 0.5) * range * 2;

    const newLeft = Math.min(
      window.innerWidth - boundingBox.width,
      Math.max(0, boundingBox.left + offsetX)
    );
    const newTop = Math.min(
      window.innerHeight - boundingBox.height,
      Math.max(0, boundingBox.top + offsetY)
    );

    setPosition({
      left: newLeft,
      top: newTop,
    });
  };

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-black">
      {/* Score Display */}
      <div className="absolute top-4 left-4 text-white text-xl">
        Clicks: {clickCount}/{MAX_CLICKS}
      </div>

      {/* Bouncing Button */}
      <motion.div
        className="absolute cursor-pointer select-none rounded-xl bg-blue-500 p-4 font-bold text-white shadow-lg"
        style={{
          top: position.top,
          left: position.left,
        }}
        animate={{
          scale: [1, 1.1, 1],
          transition: { duration: 0.5, repeat: Infinity }
        }}
        onMouseEnter={(e) => moveButton(e)}
        onClick={handleClick}
        whileTap={{ scale: 0.9 }}
      >
        Click Me!
      </motion.div>
    </div>
  );
};

export default EnhancedLevelOne;
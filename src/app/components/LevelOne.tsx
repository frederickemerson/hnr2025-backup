"use client";

import React, { useState, MouseEvent } from "react";

type Position = {
  top: string | number;
  left: string | number;
};

const LevelOne: React.FC = () => {
  const [position, setPosition] = useState<Position>({
    top: "50%",
    left: "50%",
  });

  const [isClicked, setIsClicked] = useState(false); // State for button color

  // Function to call the PUT API to update the score
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
        return;
      }
    } catch (error) {
      console.error("Error updating score:", error);
    }
  };

  const handleClick = async (e: MouseEvent<HTMLDivElement>) => {
    moveButton(e);
    setIsClicked(true); // Change button color

    setTimeout(() => {
      setIsClicked(false);
    }, 300);
    await updateScore();
  };

  const moveButton = (e: MouseEvent<HTMLDivElement>) => {
    if (typeof window === "undefined") return;

    const button = e.currentTarget;
    const boundingBox = button.getBoundingClientRect();

    const offsetX = Math.random() * 200 - 100; // Random offset for X
    const offsetY = Math.random() * 200 - 100; // Random offset for Y

    // Calculate new position ensuring it stays within the viewport
    const newLeft = Math.min(
      window.innerWidth - boundingBox.width,
      Math.max(0, boundingBox.left + offsetX),
    );
    const newTop = Math.min(
      window.innerHeight - boundingBox.height,
      Math.max(0, boundingBox.top + offsetY),
    );

    setPosition({
      left: newLeft,
      top: newTop,
    });
  };

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-black">
      {/* Bouncing Button */}
      <div
        className={`absolute animate-bounce cursor-pointer select-none rounded-xl p-2 font-bold text-black shadow-md transition-all focus:outline-none focus:ring-2 ${
          isClicked ? "bg-green-500" : "bg-blue-500 hover:bg-blue-600"
        }`}
        style={{
          top: position.top,
          left: position.left,
        }}
        onMouseEnter={(e) => moveButton(e)}
        onClick={(e) => handleClick(e)}
      >
        Submit
      </div>
    </div>
  );
};

export default LevelOne;

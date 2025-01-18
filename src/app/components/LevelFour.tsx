"use client";

import React, { useState, useEffect } from "react";

const mazeLayout = [
  ["#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#"],
  ["#", " ", " ", " ", " ", " ", " ", "#", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
  ["#", " ", "#", " ", "#", "#", " ", "#", " ", "#", " ", "#", "#", " ", " ", " ", " ", "#"],
  ["#", " ", "#", " ", " ", " ", " ", "#", " ", "#", " ", " ", "#", "#", "#", " ", " ", "#"],
  ["#", " ", "#", " ", "#", "#", " ", " ", " ", " ", " ", " ", "#", " ", "#", "#", " ", "#"],
  ["#", "#", "#", "#", "#", "#", "#", "#", " ", "#", "#", "#", "#", "#", " ", "#", "#", "#"],
  ["#", " ", "#", " ", " ", " ", " ", "#", " ", " ", " ", " ", "#", " ", " ", " ", "#", "#"],
  ["#", " ", "#", "#", "#", " ", " ", "#", "#", "#", "#", " ", " ", "#", " ", "#", "#", "#"],
  ["#", " ", "#", " ", " ", "#", " ", "#", " ", " ", " ", " ", "#", " ", " ", "#", " ", "#"],
  ["#", " ", "#", " ", "#", "#", " ", "#", " ", " ", "#", "#", "#", " ", "#", "#", " ", "#"],
  ["#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#"],
  ["#", " ", " ", " ", " ", " ", "#", "#", "#", "#", "#", "#", "#", " ", " ", " ", " ", "#"],
  ["#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#"],
  ["#", " ", " ", "#", "#", "#", "#", "#", "#", "#", " ", "#", " ", " ", "#", "#", "#", "#"],
  ["#", " ", "#", "#", " ", " ", "#", " ", "#", " ", " ", " ", " ", "#", "#", " ", " ", "#"],
  ["#", " ", "#", " ", "#", " ", " ", "#", " ", " ", " ", "#", " ", " ", " ", " ", " ", "#"],
  ["#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#"],
];

const MazeGame = () => {
  const [cursorPosition, setCursorPosition] = useState({ x: 1, y: 1 });
  const [isGameOver, setIsGameOver] = useState(false);
  const [hasWon, setHasWon] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    const mazeElement = document.getElementById("maze");
    if (mazeElement) {
      const bounds = mazeElement.getBoundingClientRect();
      const x = Math.floor((e.clientX - bounds.left) / 30); // Update to 30px per grid cell
      const y = Math.floor((e.clientY - bounds.top) / 30);

      if (mazeLayout[y] && mazeLayout[y][x] === " ") {
        setCursorPosition({ x, y });
      } else if (mazeLayout[y] && mazeLayout[y][x] === "#") {
        setIsGameOver(true);
      }

      // Check if user has reached the goal (end of the maze)
      if (x === 6 && y === 7) {
        setHasWon(true);
      }
    }
  };

  const resetGame = () => {
    setCursorPosition({ x: 1, y: 1 });
    setIsGameOver(false);
    setHasWon(false);
  };

  useEffect(() => {
    if (isGameOver) {
      setTimeout(() => {
        alert("Game Over! You hit the wall.");
        resetGame();
      }, 100);
    }
  }, [isGameOver]);

  return (
    <div>
      <div
        id="maze"
        className="relative grid"
        onMouseMove={handleMouseMove}
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${mazeLayout[0].length}, 30px)`, // Dynamically set column count
          gridTemplateRows: `repeat(${mazeLayout.length}, 30px)`, // Dynamically set row count
          position: "relative",
        }}
      >
        {mazeLayout.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              className={`w-8 h-8 ${cell === "#" ? "bg-black" : "bg-white"}`} // Update size to w-8 and h-8 for 30px per grid cell
              style={{
                position: "relative",
                // Removed the border to make the cells blend seamlessly
              }}
            >
              {hasWon && rowIndex === 7 && colIndex === 6 && (
                <div className="absolute inset-0 bg-green-500 opacity-50">
                  <div className="flex items-center justify-center text-white">
                    You Win!
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {isGameOver && (
        <div className="mt-4 text-center">
          <button onClick={resetGame} className="bg-red-500 text-white py-2 px-4 rounded">
            Try Again
          </button>
        </div>
      )}
    </div>
  );
};

export default MazeGame;

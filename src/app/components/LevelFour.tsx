"use client";

import React, { useState, useEffect } from "react";
import { Finger_Paint } from "next/font/google";
import { motion } from "framer-motion";

const fp = Finger_Paint({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

// Function to generate a valid maze layout using Recursive Division
const generateMaze = (rows: number, cols: number): string[][] => {
  const maze = Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => "#"),
  );

  const carvePath = (x: number, y: number) => {
    const directions = [
      [0, 2], // Down
      [0, -2], // Up
      [2, 0], // Right
      [-2, 0], // Left
    ];

    // Shuffle directions for randomness
    for (const [dx, dy] of directions.sort(() => Math.random() - 0.5)) {
      const nx = x + dx;
      const ny = y + dy;

      if (
        nx > 0 &&
        ny > 0 &&
        nx < rows - 1 &&
        ny < cols - 1 &&
        maze[nx][ny] === "#"
      ) {
        maze[nx - dx / 2][ny - dy / 2] = " "; // Remove wall between cells
        maze[nx][ny] = " "; // Carve path
        carvePath(nx, ny); // Recurse
      }
    }
  };

  maze[1][1] = " "; // Start point, ensure it's empty
  maze[0][1] = " "; // Create a blank tile just above the start point
  carvePath(1, 1);
  maze[rows - 2][cols - 2] = " "; // End point

  return maze;
};

const MazeGame = () => {
  const [mazeLayout, setMazeLayout] = useState<string[][]>([]); // Initialize empty maze

  useEffect(() => {
    const rows = 15; // Number of rows in the maze
    const cols = 15; // Number of columns in the maze
    setMazeLayout(generateMaze(rows, cols)); // Generate and set the maze layout
  }, []);

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
      if (x === mazeLayout[0].length - 2 && y === mazeLayout.length - 2) {
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
    <div className="flex min-h-screen items-center justify-center">
      {!isGameOver && !hasWon && (
        <div
          id="maze"
          className="relative grid"
          onMouseMove={handleMouseMove}
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${mazeLayout[0]?.length}, 30px)`, // Dynamically set column count
            gridTemplateRows: `repeat(${mazeLayout.length}, 30px)`, // Dynamically set row count
            position: "relative",
          }}
        >
          {mazeLayout.map((row, rowIndex) =>
            row.map((cell, colIndex) => {
              // Determine the cell's background color
              let cellClass = "bg-white"; // Default to white (path)

              if (cell === "#") {
                cellClass = "bg-yellow-500"; // Wall, now yellow
              }

              // Mark the start and end cells with special colors
              if (rowIndex === 0 && colIndex === 1) {
                cellClass = "bg-green-500"; // Starting cell (green)
              } else if (
                rowIndex === mazeLayout.length - 2 &&
                colIndex === mazeLayout[0].length - 2
              ) {
                cellClass = "bg-red-500"; // Ending cell (red)
              }

              return (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  className={`h-8 w-8 ${cellClass}`} // Update size to w-8 and h-8 for 30px per grid cell
                  style={{
                    position: "relative",
                    // Removed the border to make the cells blend seamlessly
                  }}
                ></div>
              );
            }),
          )}
        </div>
      )}

      {isGameOver && !hasWon && (
        <div className="text-center text-2xl text-white">
          <span className={fp.className}>Press enter to try again</span>
        </div>
      )}

      {hasWon && (
        <div className="text-center text-2xl text-white">
          <span className={fp.className}>Congrats! You won!</span>
        </div>
      )}
    </div>
  );
};

export default MazeGame;

import React, { useState, useEffect } from "react";
import { Finger_Paint } from "next/font/google";
import Scary from "../assets/scary.png";

const fp = Finger_Paint({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

// Function to generate a valid maze layout using Recursive Division
const generateMaze = (rows, cols) => {
  const maze = Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => "#")
  );

  const carvePath = (x, y) => {
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
  const [mazeLayout, setMazeLayout] = useState([]); // Initialize empty maze
  const [cursorPosition, setCursorPosition] = useState({ x: 1, y: 1 });
  const [isGameOver, setIsGameOver] = useState(false);
  const [hasWon, setHasWon] = useState(false);
  const [timer, setTimer] = useState(30); // Set the initial timer to 30 seconds
  const [showImage, setShowImage] = useState(false); // Track if the image should be shown
  const [audioPlayed, setAudioPlayed] = useState(false); // Track if the audio was played

  const specialPoint = { x: 5, y: 5 }; // Define the special point coordinates

  useEffect(() => {
    const rows = 15; // Number of rows in the maze
    const cols = 15; // Number of columns in the maze
    setMazeLayout(generateMaze(rows, cols));
  }, []);

  // Timer effect: counts down every second
  useEffect(() => {
    if (timer <= 0) {
      setIsGameOver(true);
    } else if (!isGameOver && !hasWon) {
      const timerId = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(timerId);
    }
  }, [timer, isGameOver, hasWon]);

  const handleMouseMove = (e) => {
    const mazeElement = document.getElementById("maze");
    if (mazeElement) {
      const bounds = mazeElement.getBoundingClientRect();
      const x = Math.floor((e.clientX - bounds.left) / 30); // Update to 30px per grid cell
      const y = Math.floor((e.clientY - bounds.top) / 30);

      if (mazeLayout[y] && mazeLayout[y][x] === " ") {
        setCursorPosition({ x, y });

        // Check if user reached the special point
        if (x === specialPoint.x && y === specialPoint.y) {
          setShowImage(true);
        }
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
    setTimer(30); // Reset the timer to 30 seconds
    setShowImage(false); // Hide the image
    setAudioPlayed(false); // Reset audio state
  };

  useEffect(() => {
    if (isGameOver) {
      setTimeout(() => {
        resetGame();
      }, 100);
    }
  }, [isGameOver]);

  // Play audio when image is shown and user interacts with the game
  const playAudio = () => {
    if (!audioPlayed) {
      const audio = new Audio("/scary.mp3");
      audio.play();
      setAudioPlayed(true); // Set to true to prevent replaying
    }
  };

  useEffect(() => {
    if (showImage) {
      playAudio(); // Play audio when the image is shown
    }
  }, [showImage]);

  return (
    <div className="relative flex min-h-screen items-center justify-center">
      {!isGameOver && !hasWon && (
        <div
          className={`absolute left-4 top-4 text-xl ${
            timer < 10 ? "text-red-500" : "text-white"
          }`}
        >
          <span className={fp.className}>Time Remaining: {timer}s</span>
        </div>
      )}

      {!isGameOver && !hasWon && (
        <div
          id="maze"
          className="relative grid"
          onMouseMove={handleMouseMove}
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${mazeLayout[0]?.length}, 30px)`,
            gridTemplateRows: `repeat(${mazeLayout.length}, 30px)`,
            position: "relative",
          }}
        >
          {mazeLayout.map((row, rowIndex) =>
            row.map((cell, colIndex) => {
              let cellClass = "bg-white";

              if (cell === "#") {
                cellClass = "bg-yellow-500";
              }

              if (rowIndex === 0 && colIndex === 1) {
                cellClass = "bg-green-500";
              } else if (
                rowIndex === mazeLayout.length - 2 &&
                colIndex === mazeLayout[0].length - 2
              ) {
                cellClass = "bg-gradient-to-r from-black via-white to-black";
              }

              if (rowIndex === specialPoint.y && colIndex === specialPoint.x) {
                cellClass = "bg-blue-500";
              }

              return (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  className={`h-8 w-8 ${cellClass}`}
                ></div>
              );
            })
          )}

          {showImage && (
            <img
              src={Scary.src}
              alt="Scary!"
              className="absolute inset-0 w-full h-full object-cover z-50"
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100vw",
                height: "100vh",
              }}
            />
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

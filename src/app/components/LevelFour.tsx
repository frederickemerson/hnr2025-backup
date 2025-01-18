import React, { useState, useEffect } from "react";
import { Finger_Paint } from "next/font/google";
import Scary from "../assets/scary.png";
import { motion, AnimatePresence } from "framer-motion";
import {useRouter} from "next/navigation";

const fp = Finger_Paint({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

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
  const [mazeLayout, setMazeLayout] = useState([]); 
  const [cursorPosition, setCursorPosition] = useState({ x: 1, y: 1 });
  const [isGameOver, setIsGameOver] = useState(false);
  const [hasWon, setHasWon] = useState(false);
  const [timer, setTimer] = useState(30);
  const [showImage, setShowImage] = useState(false);
  const [audioPlayed, setAudioPlayed] = useState(false);
  const [gameStarted, setGameStarted] = useState(false); // Track if the game has started
  const specialPoint = { x: 5, y: 5 };

  const router = useRouter();

  useEffect(() => {
    const rows = 15;
    const cols = 15;
    setMazeLayout(generateMaze(rows, cols));
  }, []);

  useEffect(() => {
    if (timer <= 0) {
      setIsGameOver(true);
    } else if (!isGameOver && !hasWon && gameStarted) {
      const timerId = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(timerId);
    }
  }, [timer, isGameOver, hasWon, gameStarted]);

  const handleMouseMove = (e) => {
    if (!gameStarted) return; // Prevent interaction until the game starts

    const mazeElement = document.getElementById("maze");
    if (mazeElement) {
      const bounds = mazeElement.getBoundingClientRect();
      const x = Math.floor((e.clientX - bounds.left) / 30);
      const y = Math.floor((e.clientY - bounds.top) / 30);

      if (mazeLayout[y] && mazeLayout[y][x] === " ") {
        setCursorPosition({ x, y });

        if (x === specialPoint.x && y === specialPoint.y && !audioPlayed) {
          setShowImage(true);
          playAudio(); // Play audio when the cursor reaches the special point
        }
      } else if (mazeLayout[y] && mazeLayout[y][x] === "#") {
        setIsGameOver(true);
      }

      if (x === mazeLayout[0].length - 2 && y === mazeLayout.length - 2) {
        setHasWon(true);
        const timer = setTimeout(() => {
          router.push('/level/5');
        }, 2000);
        return () => clearTimeout(timer);
      }
    }
  };

  const resetGame = () => {
    setCursorPosition({ x: 1, y: 1 });
    setIsGameOver(false);
    setHasWon(false);
    setTimer(30);
    setShowImage(false);
    setAudioPlayed(false);
  };

  useEffect(() => {
    if (isGameOver) {
      setTimeout(() => {
        resetGame();
      }, 100);
    }
  }, [isGameOver]);

  const playAudio = () => {
    if (!audioPlayed) {
      const audio = new Audio("/scary.mp3");
      audio.play();
      setAudioPlayed(true); // Ensure audio is played only once
    }
  };

  const startGame = () => {
    setGameStarted(true); // Allow game interaction
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center">
      {!gameStarted && (
        <div
          className="absolute top-4 text-center text-xl text-white"
          onClick={startGame} // Start the game on click
        >
          <span className={fp.className}>Click to Start</span>
        </div>
      )}

      {!isGameOver && !hasWon && gameStarted && (
        <div
          className={`absolute left-4 top-4 text-xl ${timer < 10 ? "text-red-500" : "text-white"}`}
        >
          <span className={fp.className}>Time Remaining: {timer}s</span>
        </div>
      )}

      {!isGameOver && !hasWon && gameStarted && (
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
              return (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  className={`h-8 w-8 ${cellClass}`}
                ></div>
              );
            })
          )}

         
        </div>
      )}

      {isGameOver && !hasWon && (
        <div className="text-center text-2xl text-white">
          <span className={fp.className}>Press enter to try again</span>
        </div>
      )}

      <AnimatePresence>
        {hasWon && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50"
            style={{ zIndex: 10002 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="text-6xl font-bold text-white text-center"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", damping: 10 }}
            >
              <div>Level Complete! 🎉</div>
              <motion.div 
                className="text-2xl mt-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                Loading next challenge...
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      
    </div>
  );
};

export default MazeGame;
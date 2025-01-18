import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function Home() {
  const [dots, setDots] = useState([]);
  const [score, setScore] = useState(0);
  const [misses, setMisses] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);

  const getRandomSpeed = () => 2 + Math.random() * 3;

  const restartGame = () => {
    setDots([]);
    setScore(0);
    setMisses(0);
    setIsGameOver(false);
  };

  useEffect(() => {
    if (misses >= 5) {
      setIsGameOver(true);
    }
  }, [misses]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isGameOver) {
        setDots((prev) => [
          ...prev,
          {
            id: Date.now(),
            speed: getRandomSpeed(),
            hit: false,
            color: Math.random() > 0.5 ? "bg-blue-500" : "bg-purple-500"
          },
        ]);
      }
    }, 1200);

    return () => clearInterval(interval);
  }, [isGameOver]);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (isGameOver && e.code === "Space") {
        e.preventDefault();
        restartGame();
        return;
      }

      if (e.code === "Space" && !isGameOver) {
        e.preventDefault();
        const targetZone = { start: 0.75, end: 0.85 };
        
        const dotInZone = dots.find(dot => {
          if (dot.hit) return false;
          const element = document.getElementById(`dot-${dot.id}`);
          if (!element) return false;
          const rect = element.getBoundingClientRect();
          const container = document.getElementById('game-container');
          if (!container) return false;
          const containerRect = container.getBoundingClientRect();
          const position = (rect.left - containerRect.left) / containerRect.width;
          return position >= targetZone.start && position <= targetZone.end;
        });

        if (dotInZone) {
          setDots(prev => prev.map(dot =>
            dot.id === dotInZone.id ? { ...dot, hit: true } : dot
          ));
          setScore(prev => prev + 100);
        } else {
          setMisses(prev => prev + 1);
        }
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [dots, isGameOver]);

  useEffect(() => {
    const cleanup = setInterval(() => {
      if (!isGameOver) {
        setDots(prev => prev.filter(dot => {
          const element = document.getElementById(`dot-${dot.id}`);
          if (!element) return false;
          const rect = element.getBoundingClientRect();
          if (rect.left > window.innerWidth) return false;
          if (!dot.hit && rect.right < 0) {
            setMisses(prev => prev + 1);
            return false;
          }
          return true;
        }));
      }
    }, 1000);
    
    return () => clearInterval(cleanup);
  }, [isGameOver]);

  return (
    <div className="relative w-full h-screen bg-gray-900 flex flex-col items-center justify-center">
      <div className="absolute top-4 flex flex-col items-center gap-2">
        <div className="text-white text-4xl font-bold">Score: {score}</div>
        <div className="text-red-500 text-xl">Misses: {misses}/5</div>
      </div>

      <div id="game-container" className="relative w-full max-w-3xl h-32 bg-gray-800 rounded-lg overflow-hidden">
        <div className="absolute right-32 top-0 h-full w-20 bg-green-500/20 border-l-2 border-r-2 border-green-500">
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-green-500 text-sm font-bold">SPACE</span>
          </div>
        </div>
        
        {dots.map((dot) =>
          dot.hit ? null : (
            <motion.div
              id={`dot-${dot.id}`}
              key={dot.id}
              className={`absolute top-1/2 -translate-y-1/2 w-8 h-8 rounded-full ${dot.color}`}
              initial={{ left: "-40px" }}
              animate={{ left: "calc(100% + 40px)" }}
              transition={{ duration: dot.speed, ease: "linear" }}
            />
          )
        )}

        {isGameOver && (
          <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center">
            <div className="text-white text-2xl font-bold mb-4">Game Over!</div>
            <div className="text-white mb-4">Final Score: {score}</div>
            <div className="text-green-500">Press SPACE to restart</div>
          </div>
        )}
      </div>

      <div className="mt-8 text-gray-400 text-center">
        Press SPACE when dots reach the green zone!
        <br />
        <span className="text-sm">Different colored dots move at different speeds</span>
        <br />
        <span className="text-red-400 text-sm">Game ends after 5 misses</span>
      </div>
    </div>
  );
}
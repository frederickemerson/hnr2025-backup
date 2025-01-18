import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function Home() {
  const [dots, setDots] = useState([]);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => [
        ...prev,
        { id: Date.now(), position: 0, hit: false },
      ]);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleClick = (id) => {
    setDots((prev) =>
      prev.map((dot) =>
        dot.id === id && !dot.hit ? { ...dot, hit: true } : dot
      )
    );
    setScore((prev) => prev + 1);
  };

  return (
    <div className="relative w-full h-screen bg-gray-900 flex flex-col items-center justify-center">
      {/* Score Display */}
      <div className="absolute top-4 text-white text-4xl font-bold">
        Score: {score}
      </div>

      {/* Game Area */}
      <div className="relative w-full max-w-3xl h-32 bg-gray-800 rounded-lg overflow-hidden">
        {/* Target Zone */}
        <div className="absolute right-24 top-0 h-full w-20 bg-red-500/20 border-l-2 border-r-2 border-red-500" />
        
        {/* Dots */}
        {dots.map((dot) =>
          dot.hit ? null : (
            <motion.button
              key={dot.id}
              className="absolute top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-blue-500 hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
              initial={{ left: "-40px" }}
              animate={{ left: "calc(100% + 40px)" }}
              transition={{ duration: 4, ease: "linear" }}
              onClick={() => handleClick(dot.id)}
            />
          )
        )}
      </div>

      {/* Instructions */}
      <div className="mt-8 text-gray-400 text-center">
        Click the dots when they reach the red zone!
      </div>
    </div>
  );
}
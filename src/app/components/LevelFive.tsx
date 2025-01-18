import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

export default function Home() {
  const [dots, setDots] = useState([]);
  const [successfulHits, setSuccessfulHits] = useState(0);
  const [misses, setMisses] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [keyPressed, setKeyPressed] = useState("");
  const [dotSpawnInterval, setDotSpawnInterval] = useState(1200);
  const [showSuccess, setShowSuccess] = useState(false);

  const router = useRouter()

  const HITS_TO_COMPLETE = 10;
  const VALID_KEYS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'];

  const getRandomKey = () => {
    return VALID_KEYS[Math.floor(Math.random() * VALID_KEYS.length)];
  };

  const getRandomSpeed = () => {
    return 2 + Math.random() * 3;
  };

  const TARGET_ZONE = { start: 0.75, end: 0.85 };

  const restartGame = () => {
    setDots([]);
    setMisses(0);
    setIsGameOver(false);
    setDotSpawnInterval(1200);
    setSuccessfulHits(0);
    setShowSuccess(false);
  };

  const completeLevel = () => {
    setShowSuccess(true);
    setDots([]); // Clear existing dots when showing success
    setTimeout(() => {
      router.push('/level/7') // Refresh to start next level
    }, 2000);
  };

  const isDotInZone = (dot) => {
    const element = document.getElementById(`dot-${dot.id}`);
    if (!element) return false;
    
    const container = document.getElementById('game-container');
    if (!container) return false;
    
    const containerRect = container.getBoundingClientRect();
    const rect = element.getBoundingClientRect();
    const position = (rect.left - containerRect.left) / containerRect.width;
    
    return position >= TARGET_ZONE.start && position <= TARGET_ZONE.end;
  };

  useEffect(() => {
    if (successfulHits >= HITS_TO_COMPLETE) {
      completeLevel();
    }
  }, [successfulHits]);

  useEffect(() => {
    if (misses >= 3) {
      setIsGameOver(true);
    }
  }, [misses]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isGameOver && !showSuccess) {
        setDots((prev) => [
          ...prev,
          {
            id: Date.now(),
            speed: getRandomSpeed(),
            hit: false,
            key: getRandomKey(),
            color: Math.random() > 0.7 
              ? "bg-red-500"
              : Math.random() > 0.5 
                ? "bg-blue-500" 
                : "bg-purple-500"
          },
        ]);
      }
    }, dotSpawnInterval);

    return () => clearInterval(interval);
  }, [isGameOver, dotSpawnInterval, showSuccess]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      const key = e.key.toLowerCase();
      if (VALID_KEYS.includes(key)) {
        e.preventDefault();
        setKeyPressed(key);

        if (!isGameOver && !showSuccess) {
          const dotsInZone = dots.filter(dot => 
            !dot.hit && isDotInZone(dot) && dot.key === key
          );
          
          if (dotsInZone.length > 0) {
            const targetDot = dotsInZone[0];
            setDots(prev => prev.map(dot =>
              dot.id === targetDot.id ? { ...dot, hit: true } : dot
            ));
            setSuccessfulHits(prev => prev + 1);
          } else {
            setMisses(prev => prev + 1);
          }
        }
      }
    };

    const handleKeyUp = (e) => {
      const key = e.key.toLowerCase();
      if (VALID_KEYS.includes(key)) {
        e.preventDefault();
        setKeyPressed("");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [dots, isGameOver, showSuccess]);

  useEffect(() => {
    const cleanup = setInterval(() => {
      if (!isGameOver && !showSuccess) {
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
  }, [isGameOver, showSuccess]);

  return (
    <div className="relative w-full h-screen bg-black flex flex-col items-center justify-center overflow-hidden">
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50"
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

      <div className="absolute inset-x-0 top-12 flex justify-center">
        <div className="text-4xl font-bold text-white">
          Prove you're'nt not a human
        </div>
      </div>

      <div id="game-container" className="relative w-full max-w-3xl h-32 bg-gray-800 rounded-lg overflow-hidden">
        <div className={`absolute right-32 top-0 h-full w-20 
          ${keyPressed ? 'bg-green-500/40' : 'bg-green-500/20'} 
          border-l-2 border-r-2 border-green-500 transition-colors`}>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-green-500 text-sm font-bold">TARGET</span>
          </div>
        </div>
        
        {dots.map((dot) =>
          dot.hit ? null : (
            <motion.div
              id={`dot-${dot.id}`}
              key={dot.id}
              className={`absolute top-1/2 -translate-y-1/2 w-8 h-8 rounded-full ${dot.color} 
                flex items-center justify-center text-white font-bold`}
              initial={{ left: "-40px" }}
              animate={{ left: "calc(100% + 40px)" }}
              transition={{ duration: dot.speed, ease: "linear" }}
            >
              {dot.key}
            </motion.div>
          )
        )}

        <AnimatePresence>
          {isGameOver && (
            <motion.div
              className="absolute inset-0 bg-black/80 flex items-center justify-center z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onAnimationComplete={() => {
                setTimeout(() => {
                  restartGame();
                }, 1000);
              }}
            >
              <motion.div
                className="text-4xl text-white font-bold"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", damping: 8 }}
              >
                Try Again
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="absolute inset-x-0 bottom-12">
        <div className="flex flex-col items-center gap-4">
          <div className="flex justify-center items-center gap-8">
            <div className="text-white text-2xl font-bold">{successfulHits}/{HITS_TO_COMPLETE}</div>
            <div className="text-red-500 text-2xl font-bold">{misses}/3</div>
          </div>
          <div className="text-gray-400 opacity-50">
            Press keys 1-9 and A-F
          </div>
        </div>
      </div>
    </div>
  );
}
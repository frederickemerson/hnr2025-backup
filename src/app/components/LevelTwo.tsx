import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

const CursorGame = () => {
  const router = useRouter();
  const [tabSize, setTabSize] = useState(150);
  const [fakeCursors, setFakeCursors] = useState([]);
  const [clicks, setClicks] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [tabPos, setTabPos] = useState({ x: window.innerWidth/2, y: window.innerHeight/2 });
  const [particles, setParticles] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const TARGET_CLICKS = 5;
  const INITIAL_CURSORS = 4;
  const MAX_OFFSET = 500; // Increased range
  const BASE_SPIN_DURATION = 2;

  // Calculate progress percentage
  const progressPercentage = (clicks / TARGET_CLICKS) * 100;

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    // Initialize with INITIAL_CURSORS cursors
    generateCursors(INITIAL_CURSORS);
  }, []);

  const generateCursors = (count) => {
    const newCursors = [];
    for (let i = 0; i < count; i++) {
      newCursors.push({
        offsetX: (Math.random() - 0.5) * MAX_OFFSET,
        offsetY: (Math.random() - 0.5) * MAX_OFFSET,
        spinDuration: BASE_SPIN_DURATION + (Math.random() * 2 - 1),
        initialRotation: Math.random() * 360,
        amplitude: Math.random() * 50 + 25, // Random movement amplitude
        frequency: Math.random() * 2 + 0.5, // Random movement frequency
        phase: Math.random() * Math.PI * 2, // Random phase offset
      });
    }
    setFakeCursors(newCursors);
  };

  useEffect(() => {
    if (clicks >= TARGET_CLICKS) {
      setShowSuccess(true);
      const timer = setTimeout(() => {
        router.push('/level/3');
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [clicks, router]);

  const createParticles = (x, y) => {
    const newParticles = Array.from({ length: 12 }).map((_, i) => ({
      id: Date.now() + i,
      x,
      y,
      angle: (Math.PI * 2 * i) / 12,
      velocity: 8 + Math.random() * 8,
    }));
    setParticles(prev => [...prev, ...newParticles]);
    setTimeout(() => {
      setParticles(prev => prev.filter(p => !newParticles.includes(p)));
    }, 1000);
  };

  const handleClick = (e) => {
    if (clicks >= TARGET_CLICKS) return;

    createParticles(e.clientX, e.clientY);
    setClicks(prev => prev + 1);
    
    // Double the number of cursors with each click
    const newCursorCount = fakeCursors.length * 2;
    generateCursors(newCursorCount);
    
    // Shrink tab more aggressively
    setTabSize(prev => Math.max(prev * 0.3, 15));
    
    // More erratic tab movement
    setTabPos({
      x: Math.random() * (window.innerWidth - 100),
      y: Math.random() * (window.innerHeight - 100)
    });
  };

  useEffect(() => {
    document.body.style.cursor = 'none';
    return () => {
      document.body.style.cursor = 'default';
    };
  }, []);

  // Custom hook for cursor movement animation
  const useCursorAnimation = (cursor, index) => {
    const time = Date.now() * 0.001;
    const xOffset = cursor.offsetX + Math.sin(time * cursor.frequency + cursor.phase) * cursor.amplitude;
    const yOffset = cursor.offsetY + Math.cos(time * cursor.frequency + cursor.phase) * cursor.amplitude;
    
    return {
      x: mousePos.x + xOffset,
      y: mousePos.y + yOffset
    };
  };

  const Cursor = ({ cursor, index }) => {
    const pos = useCursorAnimation(cursor, index);
    
    return (
      <motion.div 
        className="absolute pointer-events-none select-none"
        style={{ 
          left: pos.x, 
          top: pos.y,
          zIndex: 9999,
        }}
        animate={{
          rotate: [cursor.initialRotation, cursor.initialRotation + 360],
          scale: [0.9, 1.1],
        }}
        transition={{
          rotate: {
            duration: cursor.spinDuration,
            repeat: Infinity,
            ease: "linear",
          },
          scale: {
            duration: 0.8 + Math.random() * 0.4,
            repeat: Infinity,
            repeatType: "reverse",
          }
        }}
      >
        <svg 
          width="24" 
          height="24" 
          viewBox="0 0 20 20"
        >
          <motion.path
            d="M3.5,0 L3.5,14 L7,10.5 L10.5,15 L13,13.5 L9.5,9 L13.5,9 L3.5,0"
            fill="white"
            stroke="black"
            strokeWidth="1"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
        </svg>
      </motion.div>
    );
  };

  return (
    <div className="relative w-full h-screen bg-gradient-to-b from-gray-50 to-gray-100 overflow-hidden">
      {/* Progress Bar */}
      <motion.div
        className="absolute top-0 left-0 h-2 bg-blue-500"
        initial={{ width: 0 }}
        animate={{ width: `${progressPercentage}%` }}
        transition={{ duration: 0.3 }}
      />

      {/* Particles */}
      <AnimatePresence>
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute w-2 h-2 bg-blue-400 rounded-full"
            initial={{
              x: particle.x,
              y: particle.y,
              opacity: 1,
              scale: 1,
            }}
            animate={{
              x: particle.x + Math.cos(particle.angle) * particle.velocity * 50,
              y: particle.y + Math.sin(particle.angle) * particle.velocity * 50,
              opacity: 0,
              scale: 0,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
        ))}
      </AnimatePresence>

      {/* Real cursor */}
      <Cursor cursor={{
        offsetX: 0,
        offsetY: 0,
        spinDuration: BASE_SPIN_DURATION,
        initialRotation: 0,
        amplitude: 0,
        frequency: 0,
        phase: 0
      }} />
      
      {/* Fake cursors */}
      {fakeCursors.map((cursor, index) => (
        <Cursor
          key={index}
          cursor={cursor}
          index={index}
        />
      ))}

      {/* Tab with erratic movement */}
      <motion.button
        onClick={handleClick}
        className="absolute bg-white rounded-t-lg shadow-md overflow-hidden cursor-pointer"
        style={{
          left: tabPos.x,
          top: tabPos.y,
          width: `${tabSize}px`,
          height: `${Math.max(tabSize * 0.4, 15)}px`,
          zIndex: 10001,
        }}
        animate={{
          scale: [1, 1.05, 1],
          rotate: [0, Math.random() * 10 - 5],
          boxShadow: [
            "0 4px 6px rgba(0,0,0,0.1)",
            "0 8px 12px rgba(0,0,0,0.2)",
            "0 4px 6px rgba(0,0,0,0.1)",
          ],
        }}
        transition={{ duration: 0.8, repeat: Infinity }}
      >
        <motion.div 
          className="flex items-center h-full px-2 bg-gray-100 hover:bg-gray-200"
          whileHover={{ backgroundColor: "rgb(229, 231, 235)" }}
        >
          <motion.div 
            className="w-2 h-2 rounded-full bg-gray-400 mr-1"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          />
          <div 
            className="truncate text-gray-700"
            style={{ fontSize: `${Math.max(tabSize * 0.2, 8)}px` }}
          >
            {clicks >= TARGET_CLICKS ? "Completed!" : "Click me!"}
          </div>
        </motion.div>
      </motion.button>

      {/* Counter */}
      <motion.div 
        className="absolute top-4 right-4 text-lg font-bold text-gray-700"
        style={{ zIndex: 10001 }}
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 0.3 }}
        key={clicks}
      >
        {clicks >= TARGET_CLICKS ? 
          "Loading next level..." : 
          `Cursors: ${fakeCursors.length} | Clicks left: ${TARGET_CLICKS - clicks}`}
      </motion.div>

      {/* Success Animation */}
      <AnimatePresence>
        {showSuccess && (
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

export default CursorGame;
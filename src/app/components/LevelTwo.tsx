import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const CursorGame = () => {
  const router = useRouter();
  const [tabSize, setTabSize] = useState(150);
  const [fakeCursors, setFakeCursors] = useState([]);
  const [clicks, setClicks] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [tabPos, setTabPos] = useState({ x: window.innerWidth/2, y: window.innerHeight/2 });
  const TARGET_CLICKS = 5;
  const SHRINK_FACTOR = 0.4;
  const TOTAL_CURSORS = 5;
  const MAX_OFFSET = 400;

  // Track mouse position
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Initialize cursors
  useEffect(() => {
    const initialCursors = [];
    for (let i = 0; i < TOTAL_CURSORS - 1; i++) {
      initialCursors.push({
        offsetX: (Math.random() - 0.5) * MAX_OFFSET,
        offsetY: (Math.random() - 0.5) * MAX_OFFSET
      });
    }
    setFakeCursors(initialCursors);
  }, []);

  useEffect(() => {
    if (clicks >= TARGET_CLICKS) {
      const timer = setTimeout(() => {
        router.push('/level/3');
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [clicks, router]);

  const handleClick = () => {
    if (clicks >= TARGET_CLICKS) return;

    setClicks(prev => prev + 1);
    setTabSize(prev => Math.max(prev * SHRINK_FACTOR, 20));
    
    // Double cursors with new random positions
    setFakeCursors(prev => [
      ...prev,
      ...prev.map(() => ({
        offsetX: (Math.random() - 0.5) * MAX_OFFSET,
        offsetY: (Math.random() - 0.5) * MAX_OFFSET
      }))
    ]);

    // Move tab
    setTabPos({
      x: Math.random() * (window.innerWidth - 200) + 100,
      y: Math.random() * (window.innerHeight - 200) + 100
    });
  };

  // Hide system cursor
  useEffect(() => {
    document.body.style.cursor = 'none';
    return () => {
      document.body.style.cursor = 'default';
    };
  }, []);

  const Cursor = ({ x, y }) => (
    <div 
      className="absolute pointer-events-none select-none" 
      style={{ 
        left: x, 
        top: y,
        filter: 'drop-shadow(0 1px 1px rgba(0,0,0,0.1))',
        zIndex: 9999
      }}
    >
      <svg 
        width="20" 
        height="20" 
        viewBox="0 0 20 20"
        style={{ transform: 'rotate(-15deg)' }}
      >
        <path
          d="M3.5,0 L3.5,14 L7,10.5 L10.5,15 L13,13.5 L9.5,9 L13.5,9 L3.5,0"
          fill="white"
          stroke="black"
          strokeWidth="1"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );

  return (
    <div className="relative w-full h-screen bg-gray-50 overflow-hidden">
      {/* Real cursor */}
      <Cursor x={mousePos.x} y={mousePos.y} />
      
      {/* Fake cursors */}
      {fakeCursors.map((cursor, index) => (
        <Cursor
          key={index}
          x={mousePos.x + cursor.offsetX}
          y={mousePos.y + cursor.offsetY}
        />
      ))}

      {/* Tab */}
      <div
        onClick={handleClick}
        className="absolute bg-white rounded-t-lg shadow-md overflow-hidden transition-all duration-300"
        style={{
          left: tabPos.x,
          top: tabPos.y,
          transform: 'translate(-50%, -50%)',
          width: `${tabSize}px`,
          height: `${Math.max(tabSize * 0.4, 15)}px`,
        }}
      >
        <div className="flex items-center h-full px-2 bg-gray-100 hover:bg-gray-200">
          <div className="w-2 h-2 rounded-full bg-gray-400 mr-1" />
          <div 
            className="truncate text-gray-700"
            style={{ fontSize: `${Math.max(tabSize * 0.2, 8)}px` }}
          >
            {clicks >= TARGET_CLICKS ? "Completed!" : "Click me!"}
          </div>
        </div>
      </div>

      {/* Counter */}
      <div className="absolute top-4 right-4 text-lg font-bold text-gray-700">
        {clicks >= TARGET_CLICKS ? 
          "Loading next level..." : 
          `Clicks left: ${TARGET_CLICKS - clicks}`}
      </div>
    </div>
  );
};

export default CursorGame;
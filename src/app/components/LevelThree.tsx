import React, { useEffect, useState } from "react";

// Helper function to generate random position and z-index
const generateRandomPosition = (width: number, height: number) => {
  const x = Math.random() * (window.innerWidth - width);
  const y = Math.random() * (window.innerHeight - height);
  const zIndex = Math.floor(Math.random() * 1000); // Random z-index for layering effect
  return { x, y, zIndex };
};

export default function LevelThree() {
  const [avocados, setAvocados] = useState<
    { x: number; y: number; zIndex: number; isReal: boolean; isAnnoying: boolean; id: number }[]
  >([]);
  const [dragging, setDragging] = useState<{ id: number | null; offsetX: number; offsetY: number }>({
    id: null,
    offsetX: 0,
    offsetY: 0,
  });

  const buttonWidth = 100;
  const buttonHeight = 50;

  useEffect(() => {
    const avocadoArray = [];
    for (let i = 0; i < 200; i++) {
      const { x, y, zIndex } = generateRandomPosition(buttonWidth, buttonHeight);
      avocadoArray.push({
        x,
        y,
        zIndex,
        isReal: i === 199, // Make the last button real
        isAnnoying: i !== 199 && Math.random() < 0.2, // 20% chance for annoying fake buttons
        id: i,
      });
    }
    setAvocados(avocadoArray);
  }, []);

  const handleMouseDown = (e: React.MouseEvent, id: number, x: number, y: number) => {
    setDragging({
      id,
      offsetX: e.clientX - x,
      offsetY: e.clientY - y,
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (dragging.id === null) return;

    const newAvocados = [...avocados];
    const index = newAvocados.findIndex((avocado) => avocado.id === dragging.id);
    if (index === -1) return;

    const newAvocado = { ...newAvocados[index] };
    newAvocado.x = e.clientX - dragging.offsetX;
    newAvocado.y = e.clientY - dragging.offsetY;

    newAvocados[index] = newAvocado;
    setAvocados(newAvocados);
  };

  const handleMouseUp = () => {
    setDragging({ id: null, offsetX: 0, offsetY: 0 });
  };

  const handleButtonClick = (isReal: boolean, isAnnoying: boolean) => {
    if (isReal) {
      console.log("REAL");
    } else {
      console.log("FAKE");
      if (isAnnoying) {
        alert("You just clicked a very annoying button! Congrats!");
      }
    }
  };

  return (
    <div
      className="relative w-screen h-screen bg-gray-100 overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      {avocados.map((avocado) => (
        <button
          key={avocado.id}
          className={`absolute text-sm font-bold bg-yellow-400 hover:bg-yellow-500 text-center rounded shadow-lg transition-transform duration-300 ease-in-out 
            cursor-pointer opacity-80`}
          style={{
            top: avocado.y,
            left: avocado.x,
            width: `${buttonWidth}px`,
            height: `${buttonHeight}px`,
            zIndex: avocado.zIndex,
          }}
          onMouseDown={(e) => handleMouseDown(e, avocado.id, avocado.x, avocado.y)}
          onClick={() => handleButtonClick(avocado.isReal, avocado.isAnnoying)}
        >
          Click
        </button>
      ))}
    </div>
  );
}

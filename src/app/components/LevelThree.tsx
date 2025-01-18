import React, { useEffect, useState } from "react";

// Helper function to generate random position and z-index
const generateRandomPosition = (width: number, height: number) => {
  const x = Math.random() * (window.innerWidth - width);
  const y = Math.random() * (window.innerHeight - height);
  const zIndex = Math.floor(Math.random() * 1000); // Random z-index for layering effect
  return { x, y, zIndex };
};

export default function LevelThree() {
  const [buttons, setButtons] = useState<
    {
      x: number;
      y: number;
      zIndex: number;
      isReal: boolean;
      isAnnoying: boolean;
      id: number;
    }[]
  >([]);
  const [dragging, setDragging] = useState<{
    id: number | null;
    offsetX: number;
    offsetY: number;
  }>({
    id: null,
    offsetX: 0,
    offsetY: 0,
  });
  const [key, setKey] = useState(0); // State to trigger rerender

  const buttonWidth = 100;
  const buttonHeight = 50;

  useEffect(() => {
    const buttonArray = [];
    for (let i = 0; i < 200; i++) {
      const { x, y, zIndex } = generateRandomPosition(
        buttonWidth,
        buttonHeight,
      );
      buttonArray.push({
        x,
        y,
        zIndex,
        isReal: i === 199, // Make the last button real
        isAnnoying: i !== 199 && Math.random() < 0.2, // 20% chance for annoying fake buttons
        id: i,
      });
    }
    setButtons(buttonArray);
  }, [key]); // Regenerate buttons when `key` changes

  const handleMouseDown = (
    e: React.MouseEvent,
    id: number,
    x: number,
    y: number,
  ) => {
    setDragging({
      id,
      offsetX: e.clientX - x,
      offsetY: e.clientY - y,
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (dragging.id === null) return;

    const newButtons = [...buttons];
    const index = newButtons.findIndex(
      (buttonItem) => buttonItem.id === dragging.id,
    );
    if (index === -1) return;

    const newButton = { ...newButtons[index] };
    newButton.x = e.clientX - dragging.offsetX;
    newButton.y = e.clientY - dragging.offsetY;

    newButtons[index] = newButton;
    setButtons(newButtons);
  };

  const handleMouseUp = () => {
    setDragging({ id: null, offsetX: 0, offsetY: 0 });
  };

  const handleButtonClick = (
    id: number,
    isReal: boolean,
    isAnnoying: boolean,
  ) => {
    if (isReal) {
      console.log("REAL");
      setKey((prevKey) => prevKey + 1); // Increment key to trigger rerender
    } else {
      console.log("FAKE");
      if (isAnnoying) {
        alert("You just clicked a very annoying button! Congrats!");
      }
    }

    // Remove the button from the state
    setButtons((prevButtons) =>
      prevButtons.filter((button) => button.id !== id),
    );
  };

  return (
    <div
      className="relative h-screen w-screen overflow-hidden bg-gray-100"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      {buttons.map((buttonItem) => (
        <button
          key={buttonItem.id}
          className={`absolute cursor-pointer rounded ${
            buttonItem.isReal ? "bg-green-400" : "bg-yellow-400"
          } select-none text-center text-sm font-bold opacity-80 shadow-lg transition-transform duration-300 ease-in-out hover:bg-yellow-500`}
          style={{
            top: buttonItem.y,
            left: buttonItem.x,
            width: `${buttonWidth}px`,
            height: `${buttonHeight}px`,
            zIndex: buttonItem.zIndex,
          }}
          onMouseDown={(e) =>
            handleMouseDown(e, buttonItem.id, buttonItem.x, buttonItem.y)
          }
          onClick={() =>
            handleButtonClick(
              buttonItem.id,
              buttonItem.isReal,
              buttonItem.isAnnoying,
            )
          }
        >
          {buttonItem.isReal ? "click" : "Click"}
        </button>
      ))}
    </div>
  );
}

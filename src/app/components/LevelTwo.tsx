import { useState, useEffect } from "react";
import Avocado from "./assets/avocado.png";
import Image from "next/image";

export default function CursorMultiply() {
  const [cursors, setCursors] = useState<{ x: number; y: number }[]>([]);
  const [realCursor, setRealCursor] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  // Track the mouse movement for the real cursor
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setRealCursor({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Cleanup on component unmount
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const handleClick = (event: React.MouseEvent) => {
    // Get the position of the click
    const newCursor = { x: event.clientX, y: event.clientY };
    console.log("Mouse is clicked");
    // Add the new cursor at the click location
    setCursors((prevCursors) => [...prevCursors, newCursor]);
  };

  return (
    <div
      style={{
        position: "relative",
        height: "100vh",
        overflow: "hidden",
      }}
      onClick={handleClick}
    >
      {/* Avocado Image */}
      <Image
        src={Avocado}
        alt="Avocado"
        style={{
          width: "150px",
          height: "150px",
          cursor: "pointer",
          display: "block",
          margin: "0 auto",
        }}
      />

      {/* Display Real Cursor */}
      <div
        style={{
          position: "absolute",
          top: realCursor.y - 10,
          left: realCursor.x - 10,
          width: "20px",
          height: "20px",
          backgroundColor: "rgba(0, 0, 0, 0.5)", // Default cursor appearance
          borderRadius: "50%",
          pointerEvents: "none", // Prevent interaction with cursors
          zIndex: 9999,
        }}
      />

      {/* Display Duplicated Cursors */}
      {cursors.map((cursor, index) => (
        <div
          key={index}
          style={{
            position: "absolute",
            top: cursor.y - 10, // Offset for cursor center
            left: cursor.x - 10, // Offset for cursor center
            width: "20px",
            height: "20px",
            backgroundColor: "rgba(0, 0, 0, 0.5)", // Default cursor appearance
            borderRadius: "50%",
            pointerEvents: "none", // Prevent interaction with cursors
            zIndex: 9999, // Ensure the custom cursor stays on top
            transition: "top 0.1s, left 0.1s", // Smooth movement of cursors
          }}
        />
      ))}
    </div>
  );
}

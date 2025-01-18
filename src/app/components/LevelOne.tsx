"use client";

import React, { useState, useEffect, MouseEvent } from "react";
import Avocado from "../assets/avocado_bounce.png";
import Image from "next/image";

type Position = {
  top: string | number;
  left: string | number;
};

type MousePosition = {
  x: number;
  y: number;
};

const LevelOne: React.FC = () => {
  const [position, setPosition] = useState<Position>({
    top: "50%",
    left: "50%",
  });
  const [mousePosition, setMousePosition] = useState<MousePosition>({
    x: 0,
    y: 0,
  });
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isGreen, setIsGreen] = useState<boolean>(false);

  const spotlightRadius = 100;
  const imageHeight = 100;
  const imageWidth = 100;

  useEffect(() => {
    // Ensure window-related operations only run in the browser
    if (typeof window !== "undefined") {
      setMousePosition({
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
      });
    }

    const toggleVisibility = () => {
      setIsVisible((prev) => !prev);
    };

    toggleVisibility();

    const timer = setInterval(() => {
      toggleVisibility();
    }, 4000); // Toggle every 4 seconds

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (isVisible) {
      const hideTimer = setTimeout(() => {
        setIsVisible(false);
      }, 1000); // Hide after 1 second

      return () => clearTimeout(hideTimer);
    }
  }, [isVisible]);

  const handleClick = (e: MouseEvent<HTMLImageElement>) => {
    setIsGreen(true);
    moveButton(e);

    setTimeout(() => {
      setIsGreen(false);
    }, 300);
  };

  const moveButton = (e: MouseEvent<HTMLImageElement>) => {
    if (typeof window === "undefined") return;

    const button = e.currentTarget;
    const boundingBox = button.getBoundingClientRect();

    const offsetX = Math.random() * 200 - 100; // Random offset for X
    const offsetY = Math.random() * 200 - 100; // Random offset for Y

    // Calculate new position ensuring it stays within the viewport
    const newLeft = Math.min(
      window.innerWidth - boundingBox.width,
      Math.max(0, boundingBox.left + offsetX),
    );
    const newTop = Math.min(
      window.innerHeight - boundingBox.height,
      Math.max(0, boundingBox.top + offsetY),
    );

    setPosition({
      left: newLeft,
      top: newTop,
    });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    setMousePosition({
      x: e.clientX,
      y: e.clientY,
    });
  };

  const inSpotlight = (): boolean => {
    const imgX =
      (typeof position.left === "number"
        ? position.left
        : parseFloat(position.left)) +
      imageWidth / 2;
    const imgY =
      (typeof position.top === "number"
        ? position.top
        : parseFloat(position.top)) +
      imageHeight / 2;
    const distance = Math.sqrt(
      Math.pow(imgX - mousePosition.x, 2) + Math.pow(imgY - mousePosition.y, 2),
    );
    return distance <= spotlightRadius + 10;
  };

  // Update spotlight position on window resize to keep it in the center initially
  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleResize = () => {
      setMousePosition({
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
      });
    };
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      className="relative h-screen w-screen overflow-hidden bg-black"
      onMouseMove={handleMouseMove}
    >
      {/* Spotlight Effect */}
      <div
        className={`pointer-events-none absolute inset-0 transition-all duration-300 ease-in-out ${
          isGreen ? "bg-green-400" : "bg-white"
        }`}
        style={{
          clipPath: `circle(${spotlightRadius}px at ${mousePosition.x}px ${mousePosition.y}px)`,
          boxShadow: "0 0 40px rgba(0, 0, 0, 0.5)", // Subtle shadow to create depth
          transition:
            "clip-path 0.1s ease, background 0.1s ease-in-out, box-shadow 0.1s ease-in-out",
        }}
      ></div>

      {/* Bouncing Image */}
      {(inSpotlight() || isVisible) && (
        <Image
          src={Avocado}
          alt="Avocado"
          className="absolute animate-bounce cursor-pointer select-none rounded-full"
          style={{
            top: position.top,
            left: position.left,
            height: imageHeight,
            width: imageWidth,
          }}
          onMouseEnter={moveButton}
          onClick={handleClick}
        />
      )}
    </div>
  );
};

export default LevelOne;

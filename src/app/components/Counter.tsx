"use client";

import React, { useState } from "react";

const Counter: React.FC = () => {
  const [count, setCount] = useState<number>(0);
  const [animationCount, setAnimationCount] = useState<
    "initial" | "goUp" | "waitDown"
  >("initial");

  // Function to call the PUT API to update the score
  const updateScore = async () => {
    try {
      const response = await fetch("/api/score", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!response.ok) {
        console.error("Failed to update score");
        return;
      }
    } catch (error) {
      console.error("Error updating score:", error);
    }
  };

  const handleCountIncrement = async () => {
    // 1. Old number goes up
    setTimeout(() => setAnimationCount("goUp"), 0);
    // 2. Incrementing the counter
    setTimeout(() => setCount(count + 1), 100);
    // 3. New number waits down
    setTimeout(() => setAnimationCount("waitDown"), 100);
    // 4. New number stays in the middle
    setTimeout(() => setAnimationCount("initial"), 200);
    await updateScore();
  };

  {
    /*Adapted from: https://erikmartinjordan.com/animation-counter*/
  }
  return (
    <div className="flex items-center justify-center font-ClockFont">
      <div className="text-center font-ClockFont">
        <span
          className={`inline-flex transform font-ClockFont text-6xl font-semibold text-green-400 transition-all duration-200 ease-in-out ${
            animationCount === "goUp"
              ? "translate-y-[-20px] opacity-0"
              : animationCount === "waitDown"
                ? "translate-y-[20px] opacity-0"
                : "translate-y-0 opacity-100"
          }`}
        >
          {count}
        </span>
        {/* Increment Button */}
        <div className="mt-6">
          <button
            onClick={handleCountIncrement}
            className="rounded-xl bg-blue-500 px-6 py-3 font-bold text-white shadow-md transition-all hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            Increment
          </button>
        </div>
      </div>
    </div>
  );
};

export default Counter;

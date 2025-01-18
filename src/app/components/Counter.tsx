"use client";

import React, { useState } from "react";

const Counter: React.FC = () => {
  const [count, setCount] = useState<number>(0);
  const [animationCount, setAnimationCount] = useState<
    "initial" | "goUp" | "waitDown"
  >("initial");

  const handleCountIncrement = () => {
    // 1. Old number goes up
    setTimeout(() => setAnimationCount("goUp"), 0);
    // 2. Incrementing the counter
    setTimeout(() => setCount(count + 1), 100);
    // 3. New number waits down
    setTimeout(() => setAnimationCount("waitDown"), 100);
    // 4. New number stays in the middle
    setTimeout(() => setAnimationCount("initial"), 200);
  };

  {
    /*Adapted from: https://erikmartinjordan.com/animation-counter*/
  }
  return (
    <div className="font-ClockFont flex items-center justify-center">
      <div className="font-ClockFont text-center">
        <span
          className={`font-ClockFont inline-flex transform text-6xl font-semibold text-green-400 transition-all duration-200 ease-in-out ${
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

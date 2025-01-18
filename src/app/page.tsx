"use client";

import LevelOne from "./LevelOne";
import LevelTwo from "./LevelTwo";
import LevelThree from "./LevelThree";
import Counter from "./Counter";
import React, { useState } from "react";

export default function HomePage() {
  const [showLevelOne, setShowLevelOne] = useState<boolean>(false);
  const [showLevelTwo, setShowLevelTwo] = useState<boolean>(false);
  const [showLevelThree, setShowLevelThree] = useState<boolean>(false);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
        <Counter />
        <button
          onClick={() => setShowLevelOne((prev) => !prev)}
          className="rounded-xl bg-blue-500 px-6 py-3 font-bold text-white shadow-md transition-all hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          {showLevelOne ? "Hide Level One" : "Show Level One"}
        </button>
        <button
          onClick={() => setShowLevelTwo((prev) => !prev)}
          className="rounded-xl bg-blue-500 px-6 py-3 font-bold text-white shadow-md transition-all hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          {showLevelTwo ? "Hide Level Two" : "Show Level Two"}
        </button>
        <button
          onClick={() => setShowLevelThree((prev) => !prev)}
          className="rounded-xl bg-blue-500 px-6 py-3 font-bold text-white shadow-md transition-all hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          {showLevelThree ? "Hide Level Three" : "Show Level Three"}
        </button>
        {showLevelOne && <LevelOne />}
        {showLevelTwo && <LevelTwo />}
        {showLevelThree && <LevelThree />}
      </div>
    </main>
  );
}

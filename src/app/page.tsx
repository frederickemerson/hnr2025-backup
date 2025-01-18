"use client";

import LevelOne from "./LevelOne";
import React, { useState } from "react";

export default function HomePage() {
  const [showLevelOne, setShowLevelOne] = useState<boolean>(false);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
        <button onClick={() => setShowLevelOne((prev) => !prev)}>
          {showLevelOne ? "Hide Level One" : "Show Level One"}
        </button>
        {showLevelOne && <LevelOne />}
      </div>
    </main>
  );
}

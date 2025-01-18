"use client";

import LevelOne from "../components/LevelOne";
import LevelTwo from "../components/LevelTwo";
import LevelThree from "../components/LevelThree";
import LevelFour from "../components/LevelFour";
import Counter from "../components/Counter";
import React, { useState } from "react";

export default function HomePage() {

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
        <Counter />
        
      </div>
    </main>
  );
}

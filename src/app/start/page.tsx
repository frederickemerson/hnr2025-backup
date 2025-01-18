'use client'

<<<<<<< HEAD
import LevelOne from "../components/LevelOne";
import LevelTwo from "../components/LevelTwo";
import LevelThree from "../components/LevelThree";
import LevelFour from "../components/LevelFour";
import LevelFive from "../components/LevelFive";
import Counter from "../components/Counter";
import React, { useState } from "react";

export default function HomePage() {
  const [showLevelOne, setShowLevelOne] = useState<boolean>(false);
  const [showLevelTwo, setShowLevelTwo] = useState<boolean>(false);
  const [showLevelThree, setShowLevelThree] = useState<boolean>(false);
  const [showLevelFour, setShowLevelFour] = useState<boolean>(false);
  const [showLevelFive, setShowLevelFive] = useState<boolean>(false);

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
        <button
          onClick={() => setShowLevelFour((prev) => !prev)}
          className="rounded-xl bg-blue-500 px-6 py-3 font-bold text-white shadow-md transition-all hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          {showLevelFour ? "Hide Level Four" : "Show Level Four"}
        </button>
        <button
          onClick={() => setShowLevelFive((prev) => !prev)}
          className="rounded-xl bg-blue-500 px-6 py-3 font-bold text-white shadow-md transition-all hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          {showLevelFive ? "Hide Level Five" : "Show Level Five"}
        </button>
        {showLevelOne && <LevelOne />}
        {showLevelTwo && <LevelTwo />}
        {showLevelThree && <LevelThree />}
        {showLevelFour && <LevelFour />}
        {showLevelFive && <LevelFive />}
      </div>
    </main>
=======
import React from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Counter from '../components/Counter';

// Page wrapper component for transitions
const PageTransition = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="w-full"
    >
      {children}
    </motion.div>
  );
};

export default function HomePage() {
  const router = useRouter();

  const navigateToLevel = (level) => {
    router.push(`/level/${level}`);
  };

  return (
    <PageTransition>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
          <Counter />
          <div className="grid grid-cols-2 gap-8">
            {[1, 2, 3, 4].map((level) => (
              <motion.button
                key={level}
                onClick={() => navigateToLevel(level)}
                className="rounded-xl bg-blue-500 px-6 py-3 font-bold text-white shadow-md transition-all hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Level {level}
              </motion.button>
            ))}
          </div>
        </div>
      </main>
    </PageTransition>
>>>>>>> 603c90a7530ce2523c6b355b011d3954241ae304
  );
}
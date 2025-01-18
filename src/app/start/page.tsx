"use client";

import React from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Counter from "../components/Counter";

interface PageTransitionProps {
  children: React.ReactNode;
}

const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
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

const HomePage: React.FC = () => {
  const router = useRouter();

  const navigateToLevel = (level: number) => {
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
  );

};

export default HomePage;
}


'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {Caesar_Dressing} from 'next/font/google'

// Import level components
import LevelOne from '~/app/components/LevelOne';
import LevelTwo from '~/app/components/LevelTwo';
import LevelThree from '~/app/components/LevelThree';
import LevelFour from '~/app/components/LevelFour';
import LevelFive from '~/app/components/LevelFive';
import LevelSeven from "~/app/components/LevelSeven";

const cd = Caesar_Dressing({
    subsets: ['latin'],
    weight: '400',
    display: 'swap'
})

const LevelPage = () => {
  const params = useParams();
  const router = useRouter();
  const levelId = params.id as string;
  const [showTransition, setShowTransition] = useState(true);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    // Reset states when level changes
    setShowTransition(true);
    setIsCompleted(false);

    // Show transition screen for 3 seconds
    const timer = setTimeout(() => {
      setShowTransition(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [levelId]);

  const handleLevelComplete = () => {
    setIsCompleted(true);
    if (parseInt(levelId) < 4) {
      // Progress to next level
      const nextLevel = parseInt(levelId) + 1;
      router.push(`/level/${nextLevel}`);
    } else {
      // Handle game completion
      router.push('/completion');
    }
  };

  const getLevelComponent = () => {
    const props = { onComplete: handleLevelComplete };
    
    switch (levelId) {
      case '1':
        return <LevelOne  />;
      case '2':
        return <LevelTwo  />;
      case '3':
        return <LevelThree />;
      case '4':
        return <LevelFour />;
      case '5':
        return <LevelFive />;
      case "7":
        return <LevelSeven />;
      default:
        return <div className="text-white text-center">Level not found</div>;
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-black">
      <AnimatePresence mode="wait">
        {showTransition ? (
          <motion.div
            key="transition"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 z-50 flex items-center justify-center"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-center"
            >
              <h1 className="text-6xl font-bold text-white"> <span className={cd.className}>Day {levelId}</span></h1>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="h-full w-full"
          >
            {getLevelComponent()}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LevelPage;
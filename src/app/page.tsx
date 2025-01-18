"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Finger_Paint, Wellfleet } from "next/font/google";
import { motion, AnimatePresence } from "framer-motion";

const fp = Finger_Paint({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const wf = Wellfleet({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const SignUpLanding = () => {
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleKeyPress = () => {
        router.push("/start");
      };

      window.addEventListener("keydown", handleKeyPress);
      return () => window.removeEventListener("keydown", handleKeyPress);
    }
  }, [router]);

  const handleClick = () => {
    router.push("/start");
  };

  // Variants for title animation
  const titleVariants = {
    initial: {
      y: -100,
      opacity: 0,
      scale: 0.5,
    },
    animate: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        bounce: 0.5,
        duration: 1.2,
      },
    },
    hover: {
      scale: 1.1,
      transition: {
        type: "spring",
        bounce: 0.6,
        duration: 0.4,
      },
    },
  };

  // Variants for prompt text animation
  const promptVariants = {
    initial: {
      opacity: 0,
      scale: 0.8,
    },
    animate: {
      opacity: [0.5, 1, 0.5], // Multiple opacity values for pulsing
      scale: [0.95, 1.05, 0.95], // Multiple scale values for breathing effect
      transition: {
        repeat: Infinity,
        duration: 2,
        ease: "easeInOut",
      },
    },
  };

  // Background pattern animation
  const patternVariants = {
    initial: {
      scale: 1.1,
      opacity: 0,
    },
    animate: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 1.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div
      className="relative min-h-screen w-full cursor-pointer"
      onClick={handleClick}
      initial="initial"
      animate="animate"
      whileHover="hover"
    >
      {/* Animated Background */}
      <motion.div className="absolute inset-0" variants={patternVariants}>
        <Image
          src="/sp.svg"
          alt="Background pattern"
          fill
          priority
          className="object-cover"
          style={{
            filter: "brightness(100)",
            opacity: 1,
          }}
        />
      </motion.div>

      {/* Animated Content */}
      <div
        className="absolute z-10 mt-[-15vh] flex w-full flex-col items-center"
        style={{ top: "50%" }}
      >
        <motion.h1
          className="mb-8 text-center text-8xl font-bold"
          variants={titleVariants}
          drag
          dragConstraints={{
            top: -10,
            left: -10,
            right: 10,
            bottom: 10,
          }}
          whileDrag={{ scale: 1.2 }}
        >
          <span className={wf.className}>Sign Up!</span>
        </motion.h1>

        <motion.p className="text-center text-2xl" variants={promptVariants}>
          <span className={fp.className}>Press &lt;any&gt; to start</span>
        </motion.p>

        {/* Floating particles */}
        <motion.div
          className="absolute h-4 w-4 rounded-full bg-purple-500"
          animate={{
            x: [-20, 20],
            y: [-20, 20],
            opacity: [0.2, 0.5, 0.2],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          style={{ left: "30%", top: "40%" }}
        />
        <motion.div
          className="absolute h-3 w-3 rounded-full bg-pink-500"
          animate={{
            x: [20, -20],
            y: [20, -20],
            opacity: [0.3, 0.6, 0.3],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          style={{ right: "35%", bottom: "45%" }}
        />
        <motion.div
          className="absolute h-2 w-2 rounded-full bg-blue-500"
          animate={{
            x: [-10, 10],
            y: [-10, 10],
            opacity: [0.2, 0.4, 0.2],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          style={{ right: "40%", top: "35%" }}
        />
      </div>
    </motion.div>
  );
};

export default SignUpLanding;

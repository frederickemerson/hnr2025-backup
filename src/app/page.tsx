"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Finger_Paint, Wellfleet } from "next/font/google";
import { motion, AnimatePresence } from "framer-motion";
import ParticleSystem from "./components/ParticleSystem";

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

interface MenuItem {
  title: string;
  path: string;
  isResign?: boolean;
}

const menuItems: MenuItem[] = [
  { title: "Start Quest", path: "/start" },
  { title: "Resign (Quit)", path: "/", isResign: true },
];

const SignUpLanding: React.FC = () => {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleKeyPress = (event: KeyboardEvent) => {
        setIsMenuOpen(true);
      };

      window.addEventListener("keydown", handleKeyPress);
      
      // Add initial animation trigger
      setTimeout(() => setIsInitialLoad(false), 100);
      
      return () => window.removeEventListener("keydown", handleKeyPress);
    }
  }, []);

  const handleMenuClick = (item: MenuItem) => {
    if (item.isResign) {
      setIsMenuOpen(false);
    } else {
      router.push(item.path);
    }
  };

  const pageVariants = {
    initial: {
      scale: 1.2,
      opacity: 0,
      y: -100,
    },
    animate: {
      scale: 1,
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 100,
        mass: 1,
        duration: 0.8,
      },
    },
  };

  const sidebarVariants = {
    closed: {
      x: "-100%",
      opacity: 0,
      scale: 0.8,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40,
      },
    },
    open: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    closed: {
      x: -20,
      opacity: 0,
      scale: 0.8,
      rotate: -10,
    },
    open: {
      x: 0,
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40,
      },
    },
    hover: {
      scale: 1.1,
      rotate: [0, -2, 2, -2, 0],
      y: [-2, 2, -2, 2, -2],
      transition: {
        rotate: {
          repeat: Infinity,
          repeatType: "reverse",
          duration: 0.3,
        },
        y: {
          repeat: Infinity,
          repeatType: "reverse",
          duration: 0.2,
        },
        scale: {
          type: "spring",
          stiffness: 400,
          damping: 10,
        },
      },
    },
  };

  return (
    <motion.div 
      className="relative min-h-screen w-full overflow-hidden"
      variants={pageVariants}
      initial="initial"
      animate="animate"
    >
      <ParticleSystem />
      
      <div
        className="absolute inset-0 transition-all duration-500"
        style={{
          filter: isMenuOpen ? "blur(8px)" : "none",
        }}
      >
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
      </div>

      {!isMenuOpen && (
        <motion.div
          className="absolute z-10 mt-[-15vh] flex w-full flex-col items-center"
          style={{ top: "50%" }}
          initial={{ scale: 0.5, y: -100, opacity: 0 }}
          animate={{ 
            scale: 1, 
            y: 0, 
            opacity: 1,
            transition: {
              type: "spring",
              stiffness: 200,
              damping: 20,
              mass: 1,
            }
          }}
        >
          <motion.h1
            className="mb-8 text-center text-8xl font-bold text-black"
            animate={{ 
              y: [0, -10, 0],
              scale: [1, 1.02, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          >
            <span className={wf.className}>SIGN UP !</span>
          </motion.h1>
          <motion.p
            className="text-center text-2xl text-black"
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: 1,
              y: [0, -5, 0],
            }}
            transition={{ 
              opacity: { delay: 0.5 },
              y: {
                duration: 1.5,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
              }
            }}
          >
            <span className={fp.className}>Press &lt;any&gt; to not end</span>
          </motion.p>
        </motion.div>
      )}

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed left-0 top-0 flex h-full w-[30%] flex-col items-center justify-center bg-white"
            variants={sidebarVariants}
            initial="closed"
            animate="open"
            exit="closed"
            style={{
              borderRadius: "0 30px 30px 0",
              boxShadow: "6px 6px 0 rgba(128, 128, 128, 0.3)",
              border: "4px solid white",
            }}
          >
            <div className="flex w-full flex-col items-center px-8">
              <motion.h2
                className="mb-12 text-center text-6xl font-bold tracking-wide text-black"
                variants={itemVariants}
              >
                MENU
              </motion.h2>
              <div className="flex w-full flex-col items-center space-y-8">
                {menuItems.map((item, index) => (
                  <motion.div
                    key={index}
                    className="relative w-full"
                    variants={itemVariants}
                    whileHover="hover"
                    custom={index}
                  >
                    <div
                      className="relative text-center"
                      onMouseEnter={() => setHoveredItem(index)}
                      onMouseLeave={() => setHoveredItem(null)}
                    >
                      <button
                        className={`${fp.className} relative text-2xl text-black transition-all duration-300`}
                        onClick={() => handleMenuClick(item)}
                      >
                        {item.title}
                        <motion.div
                          className="absolute -bottom-2 left-0 h-0.5 w-full origin-left bg-black"
                          initial={{ scaleX: 0 }}
                          animate={{
                            scaleX: hoveredItem === index ? 1 : 0,
                          }}
                          transition={{
                            type: "spring",
                            stiffness: 400,
                            damping: 40,
                          }}
                        />
                      </button>
                      {hoveredItem === index && (
                        <motion.div
                          className="absolute -left-4 top-1/2 h-2 w-2 rounded-full bg-black"
                          layoutId="menuDot"
                          initial={{ scale: 0 }}
                          animate={{ 
                            scale: 1,
                            y: [-2, 2, -2],
                          }}
                          exit={{ scale: 0 }}
                          transition={{
                            type: "spring",
                            stiffness: 400,
                            damping: 40,
                            y: {
                              repeat: Infinity,
                              duration: 0.5,
                            },
                          }}
                        />
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default SignUpLanding;
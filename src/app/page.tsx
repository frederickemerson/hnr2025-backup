"use client";

import React, { useState, useEffect } from "react";
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

const menuItems = [
  { title: "Start Quest", path: "/start" },
  { title: "Office Settings", path: "/settings" },
  { title: "Leaderboard", path: "/leaderboard" },
  { title: "Resign (Quit)", path: "/", isResign: true },
];

const SignUpLanding = () => {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);

  const handleKeyPress = () => {
    setIsMenuOpen(true);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleKeyPress = () => {
        setIsMenuOpen(true);
      };

      window.addEventListener("keydown", handleKeyPress);
      return () => window.removeEventListener("keydown", handleKeyPress);
    }
  }, []);

  const createUser = async () => {
    try {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        console.error("Failed to create user");
        return;
      }
      router.push("/start");
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  const handleMenuClick = (item) => {
    if (item.isResign) {
      setIsMenuOpen(false);
    } else {
      if (item.title === "Start Quest") {
        createUser();
      } else {
        router.push(item.path);
      }
    }
  };

  // Sidebar animation variants
  const sidebarVariants = {
    closed: {
      x: "-100%",
      opacity: 0,
    },
    open: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        staggerChildren: 0.1,
      },
    },
  };

  // Menu item animation variants
  const itemVariants = {
    closed: {
      x: -20,
      opacity: 0,
    },
    open: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
  };

  return (
    <div className="relative min-h-screen w-full">
      {/* Background Image with conditional blur */}
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

      {/* Main Content */}
      {!isMenuOpen && (
        <div
          className="absolute z-10 mt-[-15vh] flex w-full flex-col items-center"
          style={{ top: "50%" }}
        >
          <motion.h1
            className="mb-8 text-center text-8xl font-bold text-black"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <span className={wf.className}>SIGN UP !</span>
          </motion.h1>
          <motion.p
            className="text-center text-2xl text-black"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <span className={fp.className}>Press &lt;any&gt; to start</span>
          </motion.p>
        </div>
      )}

      {/* Sidebar Menu with updated design */}
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
            {/* Centered content container */}
            <div className="flex w-full flex-col items-center px-8">
              <motion.h2
                className={`mb-12 text-center text-6xl font-bold tracking-wide text-black`}
                variants={itemVariants}
              >
                MENU
              </motion.h2>
              <div className="flex w-full flex-col items-center space-y-8">
                {menuItems.map((item, index) => (
                  <div key={index} className="relative w-full">
                    <motion.div
                      className="relative text-center"
                      variants={itemVariants}
                      onHoverStart={() => setHoveredItem(index)}
                      onHoverEnd={() => setHoveredItem(null)}
                    >
                      <button
                        className={`${fp.className} text-2xl text-black transition-colors hover:text-gray-600`}
                        onClick={() => handleMenuClick(item)}
                      >
                        {item.title}
                      </button>
                      {hoveredItem === index && (
                        <motion.div
                          className="absolute -left-4 top-1/2 h-2 w-2 rounded-full bg-black"
                          layoutId="menuDot"
                          transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 30,
                          }}
                        />
                      )}
                      <motion.div
                        className="absolute -bottom-2 left-0 h-0.5 w-full origin-left bg-black"
                        initial={{ scaleX: 0 }}
                        animate={{
                          scaleX: hoveredItem === index ? 1 : 0,
                        }}
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 30,
                        }}
                      />
                    </motion.div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SignUpLanding;

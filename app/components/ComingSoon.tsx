"use client";

import { motion } from "framer-motion";
import { Home, Coffee, Code, Zap, ArrowLeft } from "lucide-react";
import { useState, useEffect } from "react";
import ChaosBackground from "./ChaosBackground";

const funnyMessages = [
  "Still cooking this page... 🍳",
  "My code is compiling... ⏳",
  "Adding more caffeine to the code ☕",
  "Teaching AI to design this page 🤖",
  "Converting coffee to code... ⚡",
  "This pixel is shy, needs time 🎨",
  "Debugging in production... just kidding! 😄",
  "Convincing the server to work harder 💪",
  "Making it pixel perfect... literally 🔍",
  "Charging the creativity batteries 🔋",
];

export default function ComingSoon() {
  const [message, setMessage] = useState(funnyMessages[0]);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Rotate messages
    const messageInterval = setInterval(() => {
      setMessage(funnyMessages[Math.floor(Math.random() * funnyMessages.length)]);
    }, 3000);

    // Fake progress bar
    const progressInterval = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 0 : prev + 1));
    }, 50);

    return () => {
      clearInterval(messageInterval);
      clearInterval(progressInterval);
    };
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut" as const,
      },
    },
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center overflow-hidden relative"
      style={{ backgroundColor: "var(--color-primary-bg)" }}
    >
      {/* Background */}
      <ChaosBackground />

      {/* Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
      >
        {/* Status Code */}
        <motion.div variants={itemVariants} className="mb-6">
          <motion.div
            className="inline-block px-4 py-2 rounded-lg"
            style={{
              backgroundColor: "var(--color-accent)",
              color: "var(--color-primary-text)",
            }}
            animate={{
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <span className="font-bold text-sm">STATUS: 418 - I'M A TEAPOT</span>
          </motion.div>
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          variants={itemVariants}
          className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6"
          style={{ color: "var(--color-heading)" }}
        >
          COMING SOON
        </motion.h1>

        {/* Subheading */}
        <motion.h2
          variants={itemVariants}
          className="text-2xl sm:text-3xl font-semibold mb-4"
          style={{ color: "var(--color-primary-text)" }}
        >
          Great things take time
        </motion.h2>

        {/* Funny rotating message */}
        <motion.div variants={itemVariants} className="mb-8">
          <motion.p
            key={message}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-lg sm:text-xl"
            style={{ color: "var(--color-primary-text-60)" }}
          >
            {message}
          </motion.p>
        </motion.div>

        {/* Progress Bar */}
        <motion.div variants={itemVariants} className="mb-8">
          <div
            className="w-full h-2 rounded-full overflow-hidden"
            style={{ backgroundColor: "var(--color-primary-text-10)" }}
          >
            <motion.div
              className="h-full rounded-full"
              style={{
                backgroundColor: "var(--color-accent)",
                width: `${progress}%`,
              }}
              transition={{ duration: 0.1 }}
            />
          </div>
          <p
            className="text-sm mt-2"
            style={{ color: "var(--color-primary-text-40)" }}
          >
            {progress}% complete... or maybe not 🤷‍♂️
          </p>
        </motion.div>


        {/* CTA Button */}
        <motion.div variants={itemVariants}>
          <motion.a
            href="/"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-lg"
            style={{
              backgroundColor: "var(--color-accent)",
              color: "var(--color-primary-text)",
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeft size={20} />
            <span>Back to Home</span>
          </motion.a>
        </motion.div>

        {/* Footer Text */}
        <motion.div variants={itemVariants} className="mt-12">
          <p
            className="text-sm"
            style={{ color: "var(--color-primary-text-40)" }}
          >
            Meanwhile, feel free to explore the homepage or grab a coffee ☕
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}

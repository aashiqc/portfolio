"use client";

import { motion } from "framer-motion";
import { Download, ArrowRight, Code2, Sparkles } from "lucide-react";
import ChaosBackground from "./ChaosBackground";

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const,
      },
    },
  };

  const floatingAnimation = {
    y: [0, -15, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut" as const,
    },
  };

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ backgroundColor: "var(--color-primary-bg)" }}
    >
      {/* Topographic Contour Background */}
      <ChaosBackground />

      {/* Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-32"
      >
        {/* Badge */}
        <motion.div variants={itemVariants} className="flex justify-center mb-8">
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full"
            style={{
              backgroundColor: "var(--color-primary-text-05)",
              border: "1px solid var(--color-primary-text-10)",
            }}
            whileHover={{ scale: 1.05 }}
          >
            <Sparkles
              className="w-4 h-4"
              style={{ color: "var(--color-secondary-yellow)" }}
            />
            <span
              className="text-sm font-medium"
              style={{ color: "var(--color-primary-text-80)" }}
            >
              Hooray! You found me
            </span>
          </motion.div>
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          variants={itemVariants}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 text-center"
          style={{ color: "var(--color-heading)" }}
        >
          Hi, I'm{" "}
          <motion.span
            className="relative inline-block"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <span
              className="relative inline-block"
              style={{
                color: "var(--color-secondary-yellow)",
                textShadow: "0 0 40px rgba(178, 199, 59, 0.3)",
              }}
            >
              Ashiq
            </span>
          </motion.span>
        </motion.h1>

        {/* Subtitle */}
        <motion.div variants={itemVariants} className="mb-8 text-center">
          <motion.h2
            className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-6"
            style={{ color: "var(--color-primary-text)" }}
          >
            Software Engineer
          </motion.h2>
          <motion.p
            className="text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed mb-4"
            style={{ color: "var(--color-primary-text-80)" }}
          >
            Product Developer focused on building things that matter. From complex backend systems to seamless user experiences, I deliver technical solutions that drive real-world impact.
          </motion.p>
          {/* <motion.p
            className="text-base sm:text-lg max-w-2xl mx-auto leading-relaxed"
            style={{ color: "var(--color-primary-text-60)" }}
          >
            From complex backend systems to seamless user experiences,
            I deliver technical solutions that drive real-world impact.
          </motion.p> */}
        </motion.div>

  

        {/* CTA Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          {/* Download CV Button */}
          <motion.a
            href="/cv.pdf"
            download
            className="group relative inline-flex items-center gap-2 px-8 py-4 font-semibold rounded-full overflow-hidden"
            style={{
              backgroundColor: "var(--color-accent)",
              color: "var(--color-primary-text)",
            }}
            whileHover={{
              scale: 1.05,
            }}
            whileTap={{ scale: 0.95 }}
          >
            <Download className="w-5 h-5 relative z-10" />
            <span className="relative z-10">Download CV</span>
          </motion.a>

          {/* View Work Button */}
          <motion.a
            href="/coming-soon"
            className="group inline-flex items-center gap-2 px-8 py-4 font-semibold rounded-full border-2 transition-colors"
            style={{
              backgroundColor: "transparent",
              color: "var(--color-primary-text)",
              borderColor: "var(--color-primary-text-20)",
            }}
            whileHover={{
              scale: 1.05,
              borderColor: "var(--color-primary-text-40)",
            }}
            whileTap={{ scale: 0.95 }}
          >
            <span>View My Work</span>
            <motion.div
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ArrowRight className="w-5 h-5" />
            </motion.div>
          </motion.a>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          variants={itemVariants}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 rounded-full border-2 flex justify-center pt-2"
            style={{ borderColor: "var(--color-primary-text-20)" }}
          >
            <motion.div
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: "var(--color-primary-text)" }}
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}

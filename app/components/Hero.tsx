"use client";

import { motion } from "framer-motion";
import { Download, ArrowRight, Code2, Sparkles } from "lucide-react";

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
    y: [0, -20, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut" as const,
    },
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Animated Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:4rem_4rem]" />

      {/* Gradient Orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.5, 0.3, 0.5],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center"
      >
        {/* Badge */}
        <motion.div variants={itemVariants} className="flex justify-center mb-8">
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm"
            whileHover={{ scale: 1.05 }}
          >
            <Sparkles className="w-4 h-4 text-white" />
            <span className="text-sm text-white/80">Available for work</span>
          </motion.div>
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          variants={itemVariants}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-6"
        >
          Hi, I'm{" "}
          <motion.span
            className="relative inline-block"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <span
              className="relative inline-block bg-clip-text text-transparent"
              style={{
                backgroundImage: `
                  linear-gradient(
                    90deg,
                    #667eea 0%,
                    #764ba2 15%,
                    #f093fb 30%,
                    #4facfe 45%,
                    #00f2fe 60%,
                    #43e97b 75%,
                    #38f9d7 90%,
                    #667eea 100%
                  )
                `,
                backgroundSize: "300% 100%",
                animation: "liquidFlow 4s ease-in-out infinite",
                filter: "brightness(1.2) contrast(1.1)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Ashiq
            </span>

            {/* Animated Style Tag */}
            <style dangerouslySetInnerHTML={{
              __html: `
                @keyframes liquidFlow {
                  0%, 100% {
                    background-position: 0% 50%;
                    filter: brightness(1.2) contrast(1.1) hue-rotate(0deg);
                  }
                  25% {
                    background-position: 50% 50%;
                    filter: brightness(1.3) contrast(1.15) hue-rotate(10deg);
                  }
                  50% {
                    background-position: 100% 50%;
                    filter: brightness(1.4) contrast(1.2) hue-rotate(0deg);
                  }
                  75% {
                    background-position: 50% 50%;
                    filter: brightness(1.3) contrast(1.15) hue-rotate(-10deg);
                  }
                }
              `
            }} />
          </motion.span>
        </motion.h1>

        {/* Subtitle with Typing Effect */}
        <motion.div variants={itemVariants} className="mb-8">
          <motion.h2 className="text-2xl sm:text-3xl md:text-4xl text-white/80 font-medium mb-4">
            Software Engineer
          </motion.h2>
          <motion.p className="text-lg sm:text-xl text-white/60 max-w-2xl mx-auto leading-relaxed">
            I craft beautiful, functional, and user-centric digital experiences
            that make a difference. Specialized in React, Node.js, and modern web
            technologies.
          </motion.p>
        </motion.div>

        {/* Floating Icon */}
        <motion.div
          variants={itemVariants}
          animate={floatingAnimation}
          className="flex justify-center mb-12"
        >
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
            <Code2 className="w-12 h-12 text-white" />
          </div>
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
            className="group relative inline-flex items-center gap-2 px-8 py-4 bg-white text-black font-semibold rounded-full overflow-hidden"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-gray-100 to-white"
              initial={{ x: "-100%" }}
              whileHover={{ x: "100%" }}
              transition={{ duration: 0.5 }}
            />
            <Download className="w-5 h-5 relative z-10" />
            <span className="relative z-10">Download CV</span>
          </motion.a>

          {/* View Work Button */}
          <motion.a
            href="#projects"
            className="group inline-flex items-center gap-2 px-8 py-4 bg-transparent text-white font-semibold rounded-full border-2 border-white/20 hover:border-white/40 transition-colors"
            whileHover={{ scale: 1.05 }}
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
            className="w-6 h-10 rounded-full border-2 border-white/20 flex justify-center pt-2"
          >
            <motion.div
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1.5 h-1.5 bg-white rounded-full"
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}

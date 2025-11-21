"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigation } from "react-router";

export default function NavigationLoader() {
  const navigation = useNavigation();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (navigation.state === "loading") {
      setIsVisible(true);
    } else {
      // Delay hiding to show completion
      const timer = setTimeout(() => setIsVisible(false), 300);
      return () => clearTimeout(timer);
    }
  }, [navigation.state]);

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ scaleX: 0 }}
      animate={{
        scaleX: navigation.state === "loading" ? [0, 0.5, 0.8, 0.95] : 1,
      }}
      transition={{
        duration: navigation.state === "loading" ? 2 : 0.3,
        ease: "easeInOut",
      }}
      className="fixed top-0 left-0 right-0 h-1 z-[9998] origin-left"
      style={{ backgroundColor: "var(--color-accent)" }}
    />
  );
}

"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

export default function PageLoader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Shorter load time for snappier feel
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1800);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white text-ink-primary font-display"
        >
          {/* Hedgehog Style Loader */}
          <div className="relative flex flex-col items-center gap-6">

            {/* Visual */}
            <div className="relative w-24 h-24 bg-orange-500 rounded-2xl border-4 border-black shadow-[8px_8px_0px_0px_black] flex items-center justify-center animate-bounce">
              <span className="text-4xl font-black text-white">A</span>
            </div>

            {/* Text */}
            <div className="flex flex-col items-center gap-2">
              <h2 className="text-2xl font-black uppercase tracking-tight">Ashiq</h2>
              <div className="flex items-center gap-2 text-sm font-bold bg-yellow-300 border-2 border-black px-3 py-1 rounded-full shadow-[2px_2px_0px_0px_black]">
                <Loader2 className="w-4 h-4 animate-spin" />
                BOOTING SYSTEM...
              </div>
            </div>

          </div>

        </motion.div>
      )}
    </AnimatePresence>
  );
}

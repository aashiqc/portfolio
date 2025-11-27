"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Github, Linkedin, Mail } from "lucide-react";
import { useState, useEffect } from "react";
import GitHubProfileCard from "./GitHubProfileCard";
import LinkedInProfileCard from "./LinkedInProfileCard";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showGitHubCard, setShowGitHubCard] = useState(false);
  const [showLinkedInCard, setShowLinkedInCard] = useState(false);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const menuVariants = {
    closed: {
      opacity: 0,
      x: "100%",
      transition: {
        duration: 0.4,
        ease: [0.43, 0.13, 0.23, 0.96] as [number, number, number, number],
      },
    },
    open: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.4,
        ease: [0.43, 0.13, 0.23, 0.96] as [number, number, number, number],
      },
    },
  };

  const backdropVariants = {
    closed: {
      opacity: 0,
      transition: {
        duration: 0.3,
      },
    },
    open: {
      opacity: 1,
      transition: {
        duration: 0.3,
      },
    },
  };

  const navItems = [
    { name: "About", href: "/coming-soon" },
    { name: "Projects", href: "/coming-soon" },
    { name: "Experience", href: "/coming-soon" },
    { name: "Contact", href: "/contact" },
  ];

  const socialLinks = [
    { icon: Github, href: "https://github.com/aashiqc", label: "GitHub" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/ashiq-c-07aa48186/", label: "LinkedIn" },
    { icon: Mail, href: "mailto:muhmdashiqc@gmail.com", label: "Email" },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          backgroundColor: "transparent",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <motion.a
              href="/"
              className="text-xl font-bold transition-colors relative z-50"
              style={{ color: isOpen ? "var(--color-primary-text)" : "var(--color-heading)" }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Ashiq
            </motion.a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  className="text-sm font-medium transition-colors"
                  style={{ color: "var(--color-primary-text-80)" }}
                  whileHover={{
                    y: -2,
                    color: "var(--color-primary-text)",
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item.name}
                </motion.a>
              ))}
            </div>

            {/* Social Links - Desktop */}
            <div className="hidden md:flex items-center space-x-4">
              {socialLinks.map((social) => {
                const isGitHub = social.label === "GitHub";
                const isLinkedIn = social.label === "LinkedIn";

                return (
                  <div key={social.label} className="relative">
                    <motion.a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="transition-colors block"
                      style={{ color: "var(--color-primary-text-60)" }}
                      whileHover={{
                        scale: 1.1,
                        y: -2,
                        color: "var(--color-secondary-yellow)",
                      }}
                      whileTap={{ scale: 0.9 }}
                      aria-label={social.label}
                      onMouseEnter={() => {
                        if (isGitHub) setShowGitHubCard(true);
                        if (isLinkedIn) setShowLinkedInCard(true);
                      }}
                      onMouseLeave={() => {
                        if (isGitHub) setShowGitHubCard(false);
                        if (isLinkedIn) setShowLinkedInCard(false);
                      }}
                    >
                      <social.icon size={20} />
                    </motion.a>

                    {isGitHub && (
                      <GitHubProfileCard
                        username="aashiqc"
                        isVisible={showGitHubCard}
                      />
                    )}

                    {isLinkedIn && (
                      <LinkedInProfileCard isVisible={showLinkedInCard} />
                    )}
                  </div>
                );
              })}
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 relative z-50"
              style={{ color: isOpen ? "var(--color-primary-text)" : "var(--color-primary-text)" }}
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X size={28} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu size={28} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Full Screen Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              variants={backdropVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="fixed inset-0 z-40 md:hidden"
              style={{
                backgroundColor: "rgba(40, 44, 32, 0.3)",
              }}
              onClick={() => setIsOpen(false)}
            />

            {/* Full Screen Menu */}
            <motion.div
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="fixed top-0 right-0 bottom-0 left-0 z-40 md:hidden"
              style={{
                backgroundColor: "var(--color-accent)",
              }}
            >
              {/* Menu Content */}
              <div className="flex flex-col items-center justify-center h-full px-8">
                {/* Navigation Items */}
                <div className="space-y-8 text-center mb-12">
                  {navItems.map((item, index) => (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        delay: index * 0.1 + 0.2,
                        duration: 0.4,
                      }}
                    >
                      <motion.a
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className="block text-4xl font-bold transition-colors"
                        style={{ color: "var(--color-primary-text)" }}
                        whileHover={{
                          scale: 1.1,
                          color: "var(--color-secondary-bg)",
                        }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {item.name}
                      </motion.a>
                    </motion.div>
                  ))}
                </div>

                {/* Social Links - Mobile */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: navItems.length * 0.1 + 0.3,
                    duration: 0.4,
                  }}
                  className="flex items-center justify-center gap-8"
                >
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="transition-colors"
                      style={{ color: "var(--color-primary-text)" }}
                      whileHover={{
                        scale: 1.2,
                        color: "var(--color-secondary-bg)",
                      }}
                      whileTap={{ scale: 0.9 }}
                      aria-label={social.label}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{
                        delay: navItems.length * 0.1 + 0.4 + index * 0.05,
                        duration: 0.3,
                      }}
                    >
                      <social.icon size={28} />
                    </motion.a>
                  ))}
                </motion.div>

                {/* Footer Text */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{
                    delay: navItems.length * 0.1 + 0.6,
                    duration: 0.4,
                  }}
                  className="absolute bottom-8 text-center"
                  style={{ color: "var(--color-primary-text-60)" }}
                >
                  <p className="text-sm font-medium">Available for work</p>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

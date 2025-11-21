"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, MapPin } from "lucide-react";

interface LinkedInProfileCardProps {
  isVisible: boolean;
}

export default function LinkedInProfileCard({
  isVisible,
}: LinkedInProfileCardProps) {
  const profileData = {
    name: "Ashiq C",
    title: "Software Engineer",
    location: "Ernakulam, Kerala, India",
    headline: "Building innovative products",
    followers: "1,139",
    connections: "500+",
    profileUrl: "https://www.linkedin.com/in/ashiq-c-07aa48186/",
    photoUrl: "/linkedinphoto.jpeg",
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="absolute top-full mt-2 right-0 z-50"
          style={{ pointerEvents: "none" }}
        >
          <div
            className="rounded-lg p-4 w-80"
            style={{
              backgroundColor: "var(--color-primary-bg)",
              border: "2px solid var(--color-primary-text-10)",
              boxShadow: "0 4px 20px rgba(40, 44, 32, 0.15)",
            }}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              {/* Header */}
              <div className="flex items-start gap-3 mb-3">
                <img
                  src={profileData.photoUrl}
                  alt={profileData.name}
                  className="w-16 h-16 rounded-full object-cover"
                  style={{ border: "2px solid var(--color-accent)" }}
                />
                <div className="flex-1 min-w-0">
                  <h3
                    className="font-bold text-base truncate"
                    style={{ color: "var(--color-heading)" }}
                  >
                    {profileData.name}
                  </h3>
                  <p
                    className="text-sm truncate"
                    style={{ color: "var(--color-primary-text-60)" }}
                  >
                    {profileData.title}
                  </p>
                </div>
                <a
                  href={profileData.profileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-shrink-0"
                  style={{
                    color: "var(--color-primary-text-60)",
                    pointerEvents: "auto",
                  }}
                >
                  <ExternalLink size={16} />
                </a>
              </div>

              {/* Headline */}
              <p
                className="text-sm mb-3 line-clamp-2"
                style={{ color: "var(--color-primary-text-80)" }}
              >
                {profileData.headline}
              </p>

              {/* Location */}
              <div className="flex items-center gap-2 mb-3">
                <MapPin
                  size={14}
                  style={{ color: "var(--color-primary-text-60)" }}
                />
                <span
                  className="text-xs"
                  style={{ color: "var(--color-primary-text-60)" }}
                >
                  {profileData.location}
                </span>
              </div>

              {/* Stats */}
              <div
                className="grid grid-cols-2 gap-3 pt-3"
                style={{ borderTop: "1px solid var(--color-primary-text-10)" }}
              >
                <div>
                  <p
                    className="text-sm font-bold"
                    style={{ color: "var(--color-heading)" }}
                  >
                    {profileData.followers}
                  </p>
                  <p
                    className="text-xs"
                    style={{ color: "var(--color-primary-text-60)" }}
                  >
                    Followers
                  </p>
                </div>
                <div>
                  <p
                    className="text-sm font-bold"
                    style={{ color: "var(--color-heading)" }}
                  >
                    {profileData.connections}
                  </p>
                  <p
                    className="text-xs"
                    style={{ color: "var(--color-primary-text-60)" }}
                  >
                    Connections
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

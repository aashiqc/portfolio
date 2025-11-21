"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { MapPin, Users, GitFork, Star, ExternalLink } from "lucide-react";

interface GitHubProfile {
  avatar_url: string;
  name: string;
  login: string;
  bio: string;
  location: string;
  company: string;
  public_repos: number;
  followers: number;
  following: number;
  html_url: string;
}

interface GitHubProfileCardProps {
  username: string;
  isVisible: boolean;
}

export default function GitHubProfileCard({
  username,
  isVisible,
}: GitHubProfileCardProps) {
  const [profile, setProfile] = useState<GitHubProfile | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (isVisible && !profile) {
      fetchGitHubProfile();
    }
  }, [isVisible]);

  const fetchGitHubProfile = async () => {
    setLoading(true);
    setError(false);

    try {
      const response = await fetch(
        `https://api.github.com/users/${username}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch profile");
      }

      const data = await response.json();
      setProfile(data);
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
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
            {loading && (
              <div className="flex items-center justify-center py-8">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-6 h-6 border-2 border-t-transparent rounded-full"
                  style={{ borderColor: "var(--color-accent)" }}
                />
              </div>
            )}

            {error && (
              <div className="py-4 text-center">
                <p
                  className="text-sm"
                  style={{ color: "var(--color-primary-text-60)" }}
                >
                  Failed to load profile
                </p>
              </div>
            )}

            {profile && !loading && !error && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                {/* Header */}
                <div className="flex items-start gap-3 mb-3">
                  <img
                    src={profile.avatar_url}
                    alt={profile.name}
                    className="w-16 h-16 rounded-full"
                    style={{ border: "2px solid var(--color-accent)" }}
                  />
                  <div className="flex-1 min-w-0">
                    <h3
                      className="font-bold text-base truncate"
                      style={{ color: "var(--color-heading)" }}
                    >
                      {profile.name}
                    </h3>
                    <p
                      className="text-sm truncate"
                      style={{ color: "var(--color-primary-text-60)" }}
                    >
                      @{profile.login}
                    </p>
                  </div>
                  <a
                    href={profile.html_url}
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

                {/* Bio */}
                {profile.bio && (
                  <p
                    className="text-sm mb-3 line-clamp-2"
                    style={{ color: "var(--color-primary-text-80)" }}
                  >
                    {profile.bio}
                  </p>
                )}

                {/* Location & Company */}
                <div className="flex flex-wrap gap-3 mb-3">
                  {profile.location && (
                    <div className="flex items-center gap-1">
                      <MapPin
                        size={14}
                        style={{ color: "var(--color-primary-text-60)" }}
                      />
                      <span
                        className="text-xs"
                        style={{ color: "var(--color-primary-text-60)" }}
                      >
                        {profile.location}
                      </span>
                    </div>
                  )}
                  {profile.company && (
                    <div className="flex items-center gap-1">
                      <span
                        className="text-xs"
                        style={{ color: "var(--color-primary-text-60)" }}
                      >
                        {profile.company}
                      </span>
                    </div>
                  )}
                </div>

                {/* Stats */}
                <div
                  className="grid grid-cols-3 gap-2 pt-3"
                  style={{ borderTop: "1px solid var(--color-primary-text-10)" }}
                >
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <GitFork
                        size={12}
                        style={{ color: "var(--color-accent)" }}
                      />
                      <p
                        className="text-sm font-bold"
                        style={{ color: "var(--color-heading)" }}
                      >
                        {profile.public_repos}
                      </p>
                    </div>
                    <p
                      className="text-xs"
                      style={{ color: "var(--color-primary-text-60)" }}
                    >
                      Repos
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <Users
                        size={12}
                        style={{ color: "var(--color-accent)" }}
                      />
                      <p
                        className="text-sm font-bold"
                        style={{ color: "var(--color-heading)" }}
                      >
                        {profile.followers}
                      </p>
                    </div>
                    <p
                      className="text-xs"
                      style={{ color: "var(--color-primary-text-60)" }}
                    >
                      Followers
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <Star size={12} style={{ color: "var(--color-accent)" }} />
                      <p
                        className="text-sm font-bold"
                        style={{ color: "var(--color-heading)" }}
                      >
                        {profile.following}
                      </p>
                    </div>
                    <p
                      className="text-xs"
                      style={{ color: "var(--color-primary-text-60)" }}
                    >
                      Following
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

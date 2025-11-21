"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, Github, Linkedin } from "lucide-react";
import { Form, useActionData, useNavigation } from "react-router";
import { useEffect, useRef } from "react";

export default function Contact() {
  const actionData = useActionData<{ success: boolean; message: string }>();
  const navigation = useNavigation();
  const formRef = useRef<HTMLFormElement>(null);
  const isSubmitting = navigation.state === "submitting";

  useEffect(() => {
    if (actionData?.success && formRef.current) {
      formRef.current.reset();
    }
  }, [actionData]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "muhmdashiqc@gmail.com",
      href: "mailto:muhmdashiqc@gmail.com",
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+91 8592021020",
      href: "tel:+918592021020",
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Ernakulam, Kerala, India",
      href: null,
    },
  ];

  const socialLinks = [
    {
      icon: Github,
      label: "GitHub",
      href: "https://github.com/aashiqc",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/ashiq-c-07aa48186/",
    },
  ];

  return (
    <section
      className="min-h-screen py-16 px-4 flex items-center"
      style={{ backgroundColor: "var(--color-primary-bg)" }}
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-6xl mx-auto w-full"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mb-8">
          <motion.h1
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3"
            style={{ color: "var(--color-heading)" }}
          >
            Let's Work{" "}
            <span style={{ color: "var(--color-secondary-yellow)" }}>
              Together
            </span>
          </motion.h1>
          <motion.p
            className="text-sm md:text-base max-w-2xl mx-auto"
            style={{ color: "var(--color-primary-text-80)" }}
          >
            Have a project in mind or just want to chat? Drop me a message.
          </motion.p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Form */}
          <motion.div variants={itemVariants}>
            <h2
              className="text-xl md:text-2xl font-bold mb-4"
              style={{ color: "var(--color-heading)" }}
            >
              Send a Message
            </h2>

            {/* Success/Error Message */}
            {actionData && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 rounded-lg mb-4"
                style={{
                  backgroundColor: actionData.success
                    ? "var(--color-accent)"
                    : "#ff4444",
                  color: actionData.success
                    ? "var(--color-primary-text)"
                    : "#fff",
                }}
              >
                <p className="text-sm font-medium">{actionData.message}</p>
              </motion.div>
            )}

            <Form ref={formRef} method="post" className="space-y-4">
              {/* Name Field */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-xs font-medium mb-1"
                  style={{ color: "var(--color-primary-text)" }}
                >
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  disabled={isSubmitting}
                  className="w-full px-3 py-2 rounded-lg border-2 transition-colors focus:outline-none text-sm"
                  style={{
                    backgroundColor: "var(--color-primary-bg)",
                    borderColor: "var(--color-primary-text-20)",
                    color: "var(--color-primary-text)",
                  }}
                  placeholder="John Doe"
                />
              </div>

              {/* Email Field */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-xs font-medium mb-1"
                  style={{ color: "var(--color-primary-text)" }}
                >
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  disabled={isSubmitting}
                  className="w-full px-3 py-2 rounded-lg border-2 transition-colors focus:outline-none text-sm"
                  style={{
                    backgroundColor: "var(--color-primary-bg)",
                    borderColor: "var(--color-primary-text-20)",
                    color: "var(--color-primary-text)",
                  }}
                  placeholder="john@example.com"
                />
              </div>

              {/* Subject Field */}
              <div>
                <label
                  htmlFor="subject"
                  className="block text-xs font-medium mb-1"
                  style={{ color: "var(--color-primary-text)" }}
                >
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  required
                  disabled={isSubmitting}
                  className="w-full px-3 py-2 rounded-lg border-2 transition-colors focus:outline-none text-sm"
                  style={{
                    backgroundColor: "var(--color-primary-bg)",
                    borderColor: "var(--color-primary-text-20)",
                    color: "var(--color-primary-text)",
                  }}
                  placeholder="Project Inquiry"
                />
              </div>

              {/* Message Field */}
              <div>
                <label
                  htmlFor="message"
                  className="block text-xs font-medium mb-1"
                  style={{ color: "var(--color-primary-text)" }}
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  disabled={isSubmitting}
                  rows={3}
                  className="w-full px-3 py-2 rounded-lg border-2 transition-colors focus:outline-none resize-none text-sm"
                  style={{
                    backgroundColor: "var(--color-primary-bg)",
                    borderColor: "var(--color-primary-text-20)",
                    color: "var(--color-primary-text)",
                  }}
                  placeholder="Tell me about your project..."
                />
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 font-semibold rounded-full text-sm"
                style={{
                  backgroundColor: isSubmitting
                    ? "var(--color-primary-text-20)"
                    : "var(--color-accent)",
                  color: "var(--color-primary-text)",
                  cursor: isSubmitting ? "not-allowed" : "pointer",
                }}
                whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                whileTap={!isSubmitting ? { scale: 0.98 } : {}}
              >
                <span>{isSubmitting ? "Sending..." : "Send Message"}</span>
                <Send className="w-4 h-4" />
              </motion.button>
            </Form>
          </motion.div>

          {/* Contact Info */}
          <motion.div variants={itemVariants} className="space-y-8">
            <div>
              <h2
                className="text-xl md:text-2xl font-bold mb-4"
                style={{ color: "var(--color-heading)" }}
              >
                Get in Touch
              </h2>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "var(--color-primary-text-80)" }}
              >
                Feel free to reach out through any of these channels. I'm always
                open to discussing new projects, creative ideas, or
                opportunities to collaborate.
              </p>
            </div>

            {/* Contact Details */}
            <div className="space-y-3">
              {contactInfo.map((item, index) => (
                <motion.div
                  key={index}
                  className="flex items-start gap-3 py-1"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <div
                    className="p-2.5 rounded-lg"
                    style={{
                      backgroundColor: "var(--color-primary-text-05)",
                    }}
                  >
                    <item.icon
                      className="w-5 h-5"
                      style={{ color: "var(--color-secondary-yellow)" }}
                    />
                  </div>
                  <div className="flex-1">
                    <h3
                      className="text-xs font-semibold mb-1"
                      style={{ color: "var(--color-primary-text-60)" }}
                    >
                      {item.label}
                    </h3>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="text-sm hover:underline block"
                        style={{ color: "var(--color-primary-text)" }}
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p
                        className="text-sm"
                        style={{ color: "var(--color-primary-text)" }}
                      >
                        {item.value}
                      </p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Social Links */}
            <div className="pt-2">
              <h3
                className="text-base font-semibold mb-2"
                style={{ color: "var(--color-heading)" }}
              >
                Connect on Social
              </h3>
              <div className="flex gap-3 mb-6">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-lg border-2 transition-colors"
                    style={{
                      borderColor: "var(--color-primary-text-20)",
                      color: "var(--color-primary-text)",
                    }}
                    whileHover={{
                      scale: 1.1,
                      borderColor: "var(--color-secondary-yellow)",
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <social.icon className="w-6 h-6" />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

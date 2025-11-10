import type { Route } from "./+types/home";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";

export function meta({}: Route.MetaArgs) {
  const title = "Ashiq - Software Engineer";
  const description = "Muhammed Ashiq (Ashiq C) - Professional Software Engineer specializing in web development, React, Node.js, and modern technologies. Expert in building scalable web applications, frontend development, and full-stack solutions. Available for hire.";
  const keywords = "Ashiq, Muhammed Ashiq, Ashiq C, Software Engineer, Web Developer, React Developer, Node.js Developer, Full Stack Developer, Frontend Developer, Backend Developer, JavaScript Expert, Web Application Development, Freelance Developer, Software Development, Portfolio";
  const url = "https://ashiq.dev";
  const image = "https://ashiq.dev/og-image.svg";

  return [
    { title },
    { name: "description", content: description },
    { name: "keywords", content: keywords },

    // Author and copyright
    { name: "author", content: "Muhammed Ashiq (Ashiq C)" },
    { name: "copyright", content: "Muhammed Ashiq" },
    { name: "robots", content: "index, follow" },
    { name: "googlebot", content: "index, follow" },

    // Open Graph / Facebook
    { property: "og:type", content: "website" },
    { property: "og:url", content: url },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:image", content: image },
    { property: "og:site_name", content: "Ashiq - Software Engineer" },

    // Twitter Card
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:url", content: url },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: image },

    // Additional SEO
    { name: "linkedin:profile", content: "https://www.linkedin.com/in/ashiq-c-07aa48186/" },
    { name: "theme-color", content: "#000000" },
    { name: "msapplication-TileColor", content: "#000000" },
  ];
}

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
    </>
  );
}

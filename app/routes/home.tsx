import type { Route } from "./+types/home";
import MacOSDesktop from "../components/MacOSDesktop";

export function meta({}: Route.MetaArgs) {
  const title = "Ashiq C - Software Engineer | Building Innovative Products";
  const description = "Ashiq C is a Software Engineer from Kerala, India, specializing in React, Node.js, and modern web technologies. Building innovative products with cutting-edge solutions. 1,139 followers on LinkedIn. Open to opportunities.";
  const keywords = "Ashiq C, Software Engineer, Web Developer, React Developer, Node.js Developer, Full Stack Developer, JavaScript Expert, Kerala Developer, India, Ernakulam, Frontend Developer, Backend Developer, Modern Web Technologies, Innovative Products, Web Application Development, Portfolio, Available for Hire, aashiqc";
  const url = "https://ashiq.dev";
  const image = "https://ashiq.dev/og-image.png";
  const author = "Ashiq C";

  return [
    { title },
    { name: "description", content: description },
    { name: "keywords", content: keywords },

    // Author and copyright
    { name: "author", content: author },
    { name: "creator", content: author },
    { name: "publisher", content: author },
    { name: "copyright", content: `© ${new Date().getFullYear()} ${author}. All rights reserved.` },

    // SEO
    { name: "robots", content: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" },
    { name: "googlebot", content: "index, follow" },
    { name: "bingbot", content: "index, follow" },
    { name: "language", content: "English" },
    { name: "rating", content: "General" },
    { name: "revisit-after", content: "7 days" },

    // Open Graph / Facebook
    { property: "og:type", content: "website" },
    { property: "og:url", content: url },
    { property: "og:site_name", content: "Ashiq C - Software Engineer" },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:image", content: image },
    { property: "og:image:width", content: "1200" },
    { property: "og:image:height", content: "630" },
    { property: "og:image:type", content: "image/png" },
    { property: "og:locale", content: "en_US" },

    // Twitter Card
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:site", content: "@aashiqc" },
    { name: "twitter:creator", content: "@aashiqc" },
    { name: "twitter:url", content: url },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: image },

    // Additional Social Links
    { property: "profile:username", content: "aashiqc" },
    { name: "github:username", content: "aashiqc" },

    // Mobile
    { name: "theme-color", content: "#FCFCFA" },
    { name: "msapplication-TileColor", content: "#FCFCFA" },
    { name: "apple-mobile-web-app-capable", content: "yes" },
    { name: "apple-mobile-web-app-status-bar-style", content: "default" },
    { name: "apple-mobile-web-app-title", content: "Ashiq C" },
    { name: "format-detection", content: "telephone=no" },

    // Geo Tags
    { name: "geo.region", content: "IN-KL" },
    { name: "geo.placename", content: "Ernakulam, Kerala" },
    { name: "geo.position", content: "9.9312;76.2673" },
    { name: "ICBM", content: "9.9312, 76.2673" },
  ];
}

export default function Home() {
  return <MacOSDesktop />;
}

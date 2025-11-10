import type { Route } from "./+types/home";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Portfolio - Full Stack Developer" },
    { name: "description", content: "Full Stack Developer specializing in React, Node.js, and modern web technologies. Available for freelance work and collaborations." },
    { name: "keywords", content: "Full Stack Developer, React, Node.js, Web Development, Portfolio" },
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

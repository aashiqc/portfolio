import { useRef, useState, useEffect } from 'react';
import { Github, ExternalLink, Star } from 'lucide-react';
import gsap from 'gsap';

interface Project {
  title: string;
  desc: string;
  tags: string[];
  stars: number;
  forks: number;
  color: string;
}

const projects: Project[] = [
  {
    title: "Neon_Genesis",
    desc: "A futuristic component library for React. Built with tailwind-merge and cva for maximum flexibility.",
    tags: ["React", "TypeScript", "Tailwind"],
    stars: 128,
    forks: 45,
    color: "bg-purple-100"
  },
  {
    title: "Void_Terminal",
    desc: "Browser-based terminal emulator with file system capabilities and command history.",
    tags: ["Term.js", "Recoil", "Node"],
    stars: 89,
    forks: 12,
    color: "bg-blue-100"
  },
  {
    title: "Cyber_Board",
    desc: "Kanban board for cyberpunk enthusiasts. Features real-time collaboration via WebSockets.",
    tags: ["Socket.io", "Express", "Redis"],
    stars: 256,
    forks: 67,
    color: "bg-green-100"
  },
  {
    title: "Neural_Chat",
    desc: "AI-powered chat interface with memory and context awareness. Simulates a digital consciousness.",
    tags: ["OpenAI", "Next.js", "Edge"],
    stars: 312,
    forks: 89,
    color: "bg-orange-100"
  }
];

export default function ProjectsTab() {
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".project-card",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: "out" }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="p-6 md:p-8 h-full overflow-y-auto bg-paper">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-8">
        {projects.map((project, i) => (
          <div
            key={i}
            className="project-card relative group flex flex-col justify-between p-6 rounded-xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-all bg-white"
          >
            {/* Top Decor Line */}
            <div className={`absolute top-0 left-0 w-full h-2 border-b-2 border-black rounded-t-lg ${project.color}`}></div>

            <div>
              <div className="flex items-start justify-between mb-4 mt-2">
                <h3 className="font-black text-xl text-ink-primary tracking-tight">{project.title}</h3>
                <div className="flex items-center gap-2">
                  <div className="flex items-center text-xs font-mono font-bold bg-yellow-100 px-2 py-1 rounded border border-black">
                    <Star size={12} className="mr-1" /> {project.stars}
                  </div>
                </div>
              </div>

              <p className="text-ink-secondary text-sm font-medium leading-relaxed mb-6">
                {project.desc}
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                {project.tags.map(tag => (
                  <span key={tag} className="text-xs font-bold font-mono text-ink-secondary bg-gray-100 px-2 py-1 rounded border border-black/10">
                    #{tag.toUpperCase()}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3 mt-auto pt-4 border-t-2 border-dashed border-gray-200">
              <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-black text-white font-bold text-sm rounded border-2 border-black hover:bg-gray-800 transition-colors">
                <Github size={16} /> Code
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-white text-black font-bold text-sm rounded border-2 border-black hover:bg-orange-50 transition-colors">
                <ExternalLink size={16} /> Demo
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

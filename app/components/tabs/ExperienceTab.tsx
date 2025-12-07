import { useRef, useState, useEffect } from 'react';
import { Briefcase, Calendar, Building } from 'lucide-react';
import gsap from 'gsap';

const experiences = [
  {
    role: "Senior Systems Architect",
    company: "Cyberdyne Systems",
    period: "2023 - Present",
    desc: "Architecting the neural net backbone for next-gen AI constructs. Optimizing latency for distributed consciousness.",
    skills: ["System Design", "Rust", "Distributed Systems"]
  },
  {
    role: "Full Stack Operator",
    company: "Tyrell Corp",
    period: "2021 - 2023",
    desc: "Developed the memory implant interface. Reduced rejection rates by 40% through enhanced UI/UX patterns.",
    skills: ["React", "GraphQL", "Neuro-Link API"]
  },
  {
    role: "Frontend Engineer",
    company: "Massive Dynamic",
    period: "2019 - 2021",
    desc: "Built the primary dashboard for global observation metrics. Implemented real-time data visualization.",
    skills: ["D3.js", "Vue", "WebSockets"]
  }
];

export default function ExperienceTab() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".exp-card",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: "out" }
      );
      gsap.fromTo(".timeline-line", { scaleY: 0 }, { scaleY: 1, duration: 1, ease: 'power2.inOut' });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="p-8 h-full overflow-y-auto bg-paper">
      <div className="max-w-3xl mx-auto relative pl-6">

        {/* Timeline Line (Solid Heavy Line) */}
        <div className="timeline-line absolute left-0 top-0 bottom-0 w-1 bg-black/10 origin-top rounded-full"></div>

        <div className="flex flex-col gap-10">
          {experiences.map((exp, i) => (
            <div key={i} className="exp-card relative pl-8">
              {/* Connector Dot */}
              <div className="absolute left-[-29px] top-6 w-6 h-6 bg-white border-4 border-black rounded-full z-10"></div>

              {/* Card */}
              <div className="bg-white border-2 border-black rounded-lg p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 transition-transform">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-4">
                  <div>
                    <h3 className="font-black text-lg text-ink-primary">{exp.role}</h3>
                    <div className="flex items-center gap-2 text-ink-secondary font-bold text-sm">
                      <Building size={14} />
                      <span>{exp.company}</span>
                    </div>
                  </div>
                  <div className="px-3 py-1 bg-gray-100 border border-black rounded-full text-xs font-mono font-bold flex items-center gap-2 w-fit">
                    <Calendar size={12} />
                    {exp.period}
                  </div>
                </div>

                <p className="text-ink-secondary text-sm leading-relaxed mb-4 font-medium border-l-2 border-yellow-400 pl-3">
                  {exp.desc}
                </p>

                <div className="flex flex-wrap gap-2">
                  {exp.skills.map(s => (
                    <span key={s} className="px-2 py-0.5 bg-orange-50 text-orange-700 border border-orange-200 rounded text-[10px] uppercase font-bold tracking-wide">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

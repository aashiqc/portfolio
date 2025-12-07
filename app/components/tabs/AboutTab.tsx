import { useEffect, useRef, useState } from 'react';
import { User, Code, Heart, Zap, Terminal } from 'lucide-react';
import gsap from 'gsap';

export default function AboutTab() {
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".iso-card",
        { opacity: 0, y: 30 }, // Simple slide up
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: "out" }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="p-8 h-full overflow-y-auto bg-paper">

      {/* Isometric Grid Layout */}
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 pt-4">

        {/* Left Column: Isometric Identity Card */}
        <div className="flex flex-col gap-6">
          <div className="iso-card relative group perspective-[1000px]">
            {/* Simulated 3D Card using CSS Transforms */}
            <div className="relative bg-white border-2 border-black rounded-xl p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-transform duration-300 md:group-hover:-rotate-y-12 md:group-hover:rotate-x-12 transform-style-3d">

              {/* Header */}
              <div className="flex items-center justify-between mb-6 border-b-2 border-black/10 pb-4">
                <div className="w-16 h-16 bg-white rounded-full border-2 border-black overflow-hidden shadow-[2px_2px_0_0_black]">
                  <img src="/myprofileimage.png" alt="Ashiq" className="w-full h-full object-cover" />
                </div>
                <div className="flex flex-col text-right">
                  <span className="font-bold text-2xl text-ink-primary">Ashiq</span>
                  <span className="font-mono text-sm text-ink-secondary">FULL_STACK.DEV</span>
                </div>
              </div>

              {/* Bio */}
              <p className="text-ink-secondary leading-relaxed font-medium mb-6">
                I build pixel-perfect digital experiences. Obsessed with performance, clean code, and designs that feel physical. Currently porting reality to the web.
              </p>

              {/* Tag Cloud */}
              <div className="flex flex-wrap gap-2">
                {['React', 'Next.js', 'TypeScript', 'Node.js'].map(tech => (
                  <span key={tech} className="px-2 py-1 bg-yellow-300 border border-black rounded text-xs font-bold shadow-[2px_2px_0_0_black]">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Background Decor to enhance depth */}
            <div className="absolute inset-0 bg-blue-500 rounded-xl border-2 border-black -z-10 translate-x-4 translate-y-4"></div>
          </div>

          {/* "Stats" Card */}
          <div className="iso-card bg-white border-2 border-black rounded-xl p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Zap className="text-yellow-500 fill-yellow-500" />
              <span className="font-bold">Availability</span>
            </div>
            <span className="px-3 py-1 bg-green-100 text-green-800 border border-green-800 rounded-full text-xs font-bold">
              OPEN TO WORK
            </span>
          </div>
        </div>

        {/* Right Column: "Blueprint" Skills */}
        <div className="flex flex-col gap-6">
          <div className="iso-card bg-paper-dark border-2 border-black rounded-xl p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-2 opacity-10">
              <Code size={120} />
            </div>

            <h3 className="text-xl font-black border-b-2 border-black pb-2 mb-4 flex items-center gap-2">
              <Terminal size={20} />
              CORE_STACK
            </h3>

            <ul className="space-y-3">
              {[
                { label: 'Frontend Architecture', val: '95%' },
                { label: 'Performance Engineering', val: '90%' },
                { label: 'UI/UX Polish', val: '100%' },
                { label: 'Backend Systems', val: '85%' }
              ].map((skill, i) => (
                <li key={i} className="group">
                  <div className="flex justify-between text-sm font-bold mb-1">
                    <span>{skill.label}</span>
                    <span className="font-mono">{skill.val}</span>
                  </div>
                  <div className="h-3 w-full bg-white border border-black rounded-full overflow-hidden relative">
                    <div
                      className="h-full bg-orange-500 border-r border-black"
                      style={{ width: skill.val }}
                    ></div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="iso-card bg-white border-2 border-black rounded-xl p-6 flex flex-col items-center text-center">
            <Heart className="text-red-500 fill-red-500 mb-2 animate-pulse" size={32} />
            <h4 className="font-bold text-lg">Built with Passion</h4>
            <p className="text-sm text-gray-500 mt-1">Every pixel crafted by hand.</p>
          </div>
        </div>

      </div>
    </div>
  );
}

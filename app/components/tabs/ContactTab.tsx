import { useRef, useState, useEffect } from 'react';
import { Mail, Send, Github, Linkedin, Twitter } from 'lucide-react';
import gsap from 'gsap';

export default function ContactTab() {
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".contact-anim",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: "out" }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="p-8 h-full bg-paper flex items-center justify-center overflow-y-auto">
      <div className="max-w-md w-full">

        {/* Isometric Envelope Card */}
        <div className="contact-anim bg-white border-2 border-black rounded-xl p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden">

          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-yellow-300 rounded-full border-2 border-black flex items-center justify-center mx-auto mb-4 shadow-[2px_2px_0px_0px_black]">
              <Mail size={32} className="text-black" />
            </div>
            <h2 className="text-2xl font-black text-ink-primary mb-2">Drop a Line</h2>
            <p className="text-ink-secondary text-sm font-medium">available for freelance & coffee</p>
          </div>

          {/* Form */}
          <form className="flex flex-col gap-4 relative z-10" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label className="block text-xs font-bold uppercase mb-1 ml-1">Email</label>
              <input
                type="email"
                placeholder="you@company.com"
                className="w-full bg-gray-50 border-2 border-black rounded p-3 text-sm focus:outline-none focus:shadow-[4px_4px_0px_0px_#F54E00] focus:border-orange-600 transition-all font-medium"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase mb-1 ml-1">Message</label>
              <textarea
                rows={4}
                placeholder="Let's build something chaotic..."
                className="w-full bg-gray-50 border-2 border-black rounded p-3 text-sm focus:outline-none focus:shadow-[4px_4px_0px_0px_#F54E00] focus:border-orange-600 transition-all font-medium resize-none"
              />
            </div>
            <button className="hog-button bg-black text-white py-3 rounded mt-2 hover:bg-gray-800 flex items-center justify-center gap-2 group">
              Send Transmission <Send size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          {/* Decorative Stamps */}
          <div className="absolute top-[-20px] left-[-20px] w-20 h-20 bg-blue-100 rounded-full opacity-50 blur-xl"></div>
          <div className="absolute bottom-[-20px] right-[-20px] w-32 h-32 bg-orange-100 rounded-full opacity-50 blur-xl"></div>
        </div>

        {/* Social Links */}
        <div className="flex justify-center gap-4 mt-8 contact-anim">
          {[Github, Linkedin, Twitter].map((Icon, i) => (
            <a key={i} href="#" className="w-10 h-10 bg-white border-2 border-black rounded flex items-center justify-center hover:translate-y-[-2px] hover:shadow-[4px_4px_0px_0px_black] transition-all">
              <Icon size={20} />
            </a>
          ))}
        </div>

      </div>
    </div>
  );
}

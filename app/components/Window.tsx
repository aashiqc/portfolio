import { useRef, useEffect, useState, memo } from 'react';
import gsap from 'gsap';
import AboutTab from './tabs/AboutTab';
import ProjectsTab from './tabs/ProjectsTab';
import ExperienceTab from './tabs/ExperienceTab';
import ContactTab from './tabs/ContactTab';
import BlogsTab from './tabs/BlogsTab';

interface WindowProps {
  id: string;
  title: string;
  section: string;
  zIndex: number;
  onClose: () => void;
  onMinimize: () => void;
  onFocus: () => void;
}

const sectionComponents: Record<string, React.ComponentType> = {
  about: AboutTab,
  projects: ProjectsTab,
  blogs: BlogsTab,
  experience: ExperienceTab,
  contact: ContactTab,
};

const Window = ({ id, title, section, zIndex, onClose, onMinimize, onFocus }: WindowProps) => {
  const windowRef = useRef<HTMLDivElement>(null);
  const [isMaximized, setIsMaximized] = useState(false);

  // DA VINCI PRINCIPLE: Simplicity is the ultimate sophistication.
  // We handle animation and interaction cleanly without fighting the DOM.

  useEffect(() => {
    if (!windowRef.current) return;

    // Use GSAP Context for perfect React cleanup
    const ctx = gsap.context(() => {

      // 1. Initial State: Centered exactly
      gsap.set(windowRef.current, {
        xPercent: -50,
        yPercent: -50,
        scale: 0,
        opacity: 0,
        transformOrigin: "center center" // Pop from dead center
      });

      // 2. Entrance Animation: "The Pop"
      gsap.to(windowRef.current, {
        scale: 1,
        opacity: 1,
        duration: 0.5,
        ease: "back.out(1.2)", // Playful but controlled
        overwrite: true // Ensure nothing fights this
      });

      // 3. Draggable Logic
      // Dynamically import to ensure client-side execution
      import('gsap/Draggable').then((module) => {
        const Draggable = module.Draggable;
        gsap.registerPlugin(Draggable);

        Draggable.create(windowRef.current, {
          type: 'x,y',
          bounds: 'body',
          trigger: '.window-drag-handle', // Scoped selector
          inertia: true,
          edgeResistance: 0.65,
          onPress: () => onFocus(),
        });
      });

    }, windowRef); // Scope to ref

    return () => ctx.revert(); // Perfect cleanup
  }, []);

  // Elegant Exit
  const handleClose = () => {
    if (!windowRef.current) return onFocus(); // Safety

    // Fast, satisfying dismiss
    gsap.to(windowRef.current, {
      scale: 0.8,
      opacity: 0,
      duration: 0.15,
      ease: "power2.in",
      onComplete: onClose
    });
  };

  const handleMinimize = () => {
    if (!windowRef.current) return;

    // Genie Effect Simulation
    gsap.to(windowRef.current, {
      scale: 0,
      opacity: 0,
      yPercent: 100,
      duration: 0.3,
      ease: "power2.in",
      onComplete: onMinimize
    });
  };

  const handleMaximize = () => {
    if (!windowRef.current) return;

    const targetState = isMaximized ?
      // RESTORE
      {
        width: 'min(90vw, 1000px)',
        height: 'min(85vh, 700px)',
        top: '50%',
        left: '50%',
        xPercent: -50,
        yPercent: -50,
        borderRadius: '12px'
      } :
      // MAXIMIZE
      {
        width: '100vw',
        height: 'calc(100vh - 80px)', // Space for Dock
        top: 0,
        left: 0,
        xPercent: 0,
        yPercent: 0,
        borderRadius: '0px'
      };

    gsap.to(windowRef.current, targetState as any);
    setIsMaximized(!isMaximized);
  };

  const SectionComponent = sectionComponents[section] || AboutTab;

  return (
    <div
      ref={windowRef}
      className="fixed flex flex-col bg-white border border-border shadow-[8px_8px_0px_0px_rgba(0,0,0,0.1)] rounded-xl overflow-hidden"
      // Initial CSS state: Centered. GSAP takes over immediately.
      style={{
        width: 'min(90vw, 1000px)',
        height: 'min(85vh, 700px)',
        top: '50%',
        left: '50%',
        zIndex
      }}
      onMouseDown={onFocus}
      onTouchStart={onFocus}
    >
      {/* Header / Drag Handle */}
      <div
        className="window-drag-handle h-12 flex items-center justify-between px-4 select-none bg-white border-b border-border cursor-grab active:cursor-grabbing"
        onDoubleClick={handleMaximize}
      >
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-orange-500 border border-black shadow-[1px_1px_0_0_black]"></div>
          <span className="font-bold text-sm text-ink-primary tracking-tight">{title}</span>
        </div>

        {/* Window Controls - Brutalist Traffic Lights */}
        <div className="flex items-center gap-3 z-10">
          {/* Minimize */}
          <button
            onClick={(e) => { e.stopPropagation(); handleMinimize(); }}
            className="w-6 h-6 flex items-center justify-center bg-yellow-300 border-2 border-black hover:bg-yellow-400 shadow-[2px_2px_0_0_black] active:translate-y-0.5 active:shadow-none transition-all"
            title="Minimize"
          >
            <div className="w-3 h-1 bg-black"></div>
          </button>

          {/* Maximize/Restore */}
          <button
            onClick={(e) => { e.stopPropagation(); handleMaximize(); }}
            className="w-6 h-6 flex items-center justify-center bg-green-300 border-2 border-black hover:bg-green-400 shadow-[2px_2px_0_0_black] active:translate-y-0.5 active:shadow-none transition-all"
            title="Maximize"
          >
            <div className="w-2 h-2 border-2 border-black"></div>
          </button>

          {/* Close */}
          <button
            onClick={(e) => { e.stopPropagation(); handleClose(); }}
            className="w-6 h-6 flex items-center justify-center bg-red-400 border-2 border-black hover:bg-red-500 shadow-[2px_2px_0_0_black] active:translate-y-0.5 active:shadow-none transition-all group"
            title="Close"
          >
            <div className="relative w-3 h-3">
              <div className="absolute top-1/2 left-0 w-full h-1 bg-black rotate-45 transform origin-center"></div>
              <div className="absolute top-1/2 left-0 w-full h-1 bg-black -rotate-45 transform origin-center"></div>
            </div>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 relative bg-paper overflow-hidden">
        <div className="absolute inset-0 overflow-auto">
          <SectionComponent />
        </div>
      </div>
    </div>
  );
}

export default memo(Window, (prev, next) => prev.zIndex === next.zIndex && prev.id === next.id);

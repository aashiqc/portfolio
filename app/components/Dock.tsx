import { useRef, useEffect, useState } from 'react';
import { User, Briefcase, Code2, Mail, Github, Linkedin, Terminal, FolderOpen } from 'lucide-react';
import gsap from 'gsap';

interface DockProps {
  onItemClick: (id: string) => void;
  openWindows: string[];
}

interface DockItem {
  id: string;
  icon: React.ElementType;
  label: string;
  bgColor: string; // New: Specific background color for each item
}

const dockItems: DockItem[] = [
  { id: 'about', icon: User, label: 'About', bgColor: 'bg-red-400' },
  { id: 'projects', icon: Code2, label: 'Projects', bgColor: 'bg-yellow-400' },
  { id: 'experience', icon: Briefcase, label: 'Experience', bgColor: 'bg-blue-400' },
  { id: 'contact', icon: Mail, label: 'Contact', bgColor: 'bg-green-400' },
];

const socialItems = [
  { id: 'github', icon: Github, label: 'Git', bgColor: 'bg-gray-800', url: 'https://github.com/aashiqc', iconColor: 'text-white' },
];

export default function Dock({ onItemClick, openWindows }: DockProps) {
  const dockRef = useRef<HTMLDivElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<string | null>(null);

  const handleSocialClick = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 rounded-2xl border-2 border-black bg-white px-2 py-2 shadow-[4px_4px_0px_0px_black] flex items-end gap-2 md:gap-3 transition-all"
    >
      {/* Dock Items */}
      {dockItems.map((item) => {
        const Icon = item.icon;
        const isOpen = openWindows.includes(item.id);
        const isHovered = hoveredIndex === item.id;

        return (
          <div
            key={item.id}
            className="group relative flex flex-col items-center"
            onMouseEnter={() => setHoveredIndex(item.id)}
            onMouseLeave={() => setHoveredIndex(null)}
            onClick={() => onItemClick(item.id)}
          >
            {/* Label Tooltip (Pop up) */}
            {isHovered && (
              <div className="absolute -top-12 bg-black text-white text-xs font-bold px-3 py-1.5 rounded-lg border-2 border-black whitespace-nowrap shadow-[4px_4px_0px_0px_rgba(255,165,0,1)] animate-in slide-in-from-bottom-2 fade-in duration-200">
                {item.label}
              </div>
            )}

            {/* Icon Box */}
            <div
              className={`
                        w-12 h-12 md:w-14 md:h-14 flex items-center justify-center rounded-xl border-2 border-black transition-all duration-300 cursor-pointer
                        ${item.bgColor} 
                        ${isHovered ? 'translate-y-[-10px] scale-110 shadow-[4px_4px_0px_0px_black] rotate-[-3deg]' : 'shadow-[2px_2px_0px_0px_black]'}
                        ${isOpen ? 'ring-2 ring-offset-2 ring-black' : ''}
                    `}
            >
              <Icon
                className={`w-6 h-6 md:w-7 md:h-7 text-black transition-transform ${isHovered ? 'scale-110' : ''} drop-shadow-sm`}
                strokeWidth={2.5}
              />
            </div>
          </div>
        );
      })}

      {/* Separator - Dashed Line */}
      <div className="w-0.5 h-10 border-l-2 border-dashed border-black/20 mx-1 md:mx-2 self-center"></div>

      {/* Socials */}
      {socialItems.map((item) => {
        const Icon = item.icon;
        const isHovered = hoveredIndex === item.id;
        return (
          <div
            key={item.id}
            onMouseEnter={() => setHoveredIndex(item.id)}
            onMouseLeave={() => setHoveredIndex(null)}
            className={`
                        w-12 h-12 md:w-14 md:h-14 flex items-center justify-center rounded-xl border-2 border-black cursor-pointer transition-all duration-300
                        ${item.bgColor}
                        ${isHovered ? 'translate-y-[-10px] scale-110 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rotate-[3deg]' : 'shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'}
                    `}
            onClick={() => handleSocialClick(item.url)}
          >
            <Icon className={`w-6 h-6 ${item.iconColor}`} strokeWidth={2.5} />
          </div>
        )
      })}
    </div>
  );
}

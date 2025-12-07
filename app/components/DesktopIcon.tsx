import { useRef, useEffect } from "react";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";

// Register GSAP plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(Draggable);
}

interface DesktopIconProps {
  id: string;
  label: string;
  iconUrl?: string; // New prop for custom image URLs
  onClick: () => void;
}

export default function DesktopIcon({ id, label, iconUrl, onClick }: DesktopIconProps) {
  const iconRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!iconRef.current) return;

    // Make icon draggable
    const draggableInstance = Draggable.create(iconRef.current, {
      type: "x,y",
      bounds: "body",
      inertia: true,
      onClick: function () {
        onClick(); // Trigger click on drag release/click
      },
      onDragStart: function () {
        gsap.to(iconRef.current, { scale: 1.1, duration: 0.2 });
      },
      onDragEnd: function () {
        gsap.to(iconRef.current, { scale: 1, duration: 0.2 });
      }
    });

    return () => {
      draggableInstance[0].kill();
    };
  }, [onClick]);

  const handleMouseEnter = () => {
    if (iconRef.current) {
      gsap.to(iconRef.current, {
        scale: 1.05,
        duration: 0.2,
        ease: "back.out(1.7)",
      });
    }
  };

  const handleMouseLeave = () => {
    if (iconRef.current) {
      gsap.to(iconRef.current, {
        scale: 1,
        duration: 0.2,
        ease: "power2.out",
      });
    }
  };

  return (
    <div
      ref={iconRef}
      className="flex flex-col items-center gap-0.5 w-20 cursor-pointer group select-none absolute"
      // Click handled by Draggable or explicitly if needed, but Draggable takes precedence
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Icon: Custom PNG Image */}
      <div className="relative w-12 h-12 flex items-center justify-center">
        {iconUrl ? (
          <img
            src={iconUrl}
            alt={label}
            className="w-full h-full object-contain drop-shadow-md"
            draggable={false}
          />
        ) : (
          /* Fallback if no URL provided (though we expect one) */
          <div className="w-full h-full bg-yellow-400 rounded-lg border-2 border-black" />
        )}
      </div>

      {/* Label */}
      <span
        className="font-bold text-xs text-ink-primary bg-white/40 backdrop-blur-[2px] px-1.5 py-0.5 rounded-sm border border-transparent group-hover:bg-white group-hover:border-black/10 transition-all text-center leading-tight shadow-sm"
      >
        {label}
      </span>
    </div>
  );
}

import { useState, useEffect } from 'react';
import { User, Code2, Briefcase, Mail, Wifi, Battery, Search, Command, Cpu, BookOpen } from 'lucide-react';
import Dock from './Dock';
import Window from './Window';
import ChaosBackground from './ChaosBackground';
import DesktopIcon from './DesktopIcon';

interface WindowState {
  id: string;
  title: string;
  section: string;
  zIndex: number;
}

const sections = [
  { id: 'about', title: 'About', icon: User, color: 'text-neon-cyan', img: 'https://res.cloudinary.com/dmukukwp6/image/upload/folder_af7d0524aa.png' },
  { id: 'projects', title: 'Projects', icon: Code2, color: 'text-neon-pink', img: 'https://res.cloudinary.com/dmukukwp6/image/upload/spreadsheet_2d556ac08a.png' },
  { id: 'blogs', title: 'Blog', icon: BookOpen, color: 'text-purple-400', img: 'https://res.cloudinary.com/dmukukwp6/image/upload/document_001e7ec29a.png' },
  { id: 'experience', title: 'Experience', icon: Briefcase, color: 'text-neon-green', img: 'https://res.cloudinary.com/dmukukwp6/image/upload/spreadsheet_2d556ac08a.png' },
  { id: 'contact', title: 'Contact', icon: Mail, color: 'text-white', img: 'https://res.cloudinary.com/dmukukwp6/image/upload/invite_8454a37bed.png' },
];

export default function AetherDesktop() {
  const [openWindows, setOpenWindows] = useState<WindowState[]>([]);
  const [maxZIndex, setMaxZIndex] = useState(100);
  const [time, setTime] = useState(new Date());

  // System Stats State
  const [batteryLevel, setBatteryLevel] = useState<number | null>(null);
  const [isCharging, setIsCharging] = useState(false);
  const [networkType, setNetworkType] = useState('NET');
  const [cpuUsage, setCpuUsage] = useState(34);
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    // 1. Time Loop
    const timer = setInterval(() => setTime(new Date()), 1000);

    // 2. Battery API with debouncing
    if ('getBattery' in navigator) {
      let lastBattery = 0;
      (navigator as any).getBattery().then((battery: any) => {
        const level = Math.floor(battery.level * 100);
        setBatteryLevel(level);
        setIsCharging(battery.charging);
        lastBattery = level;

        // Debounce: only update if change > 1%
        battery.addEventListener('levelchange', () => {
          const newLevel = Math.floor(battery.level * 100);
          if (Math.abs(newLevel - lastBattery) > 1) {
            setBatteryLevel(newLevel);
            lastBattery = newLevel;
          }
        });
        battery.addEventListener('chargingchange', () => setIsCharging(battery.charging));
      });
    }

    // 3. Network Stickiness
    const updateNetwork = () => {
      setIsOnline(navigator.onLine);
      // @ts-ignore
      const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
      if (connection) {
        setNetworkType(connection.effectiveType ? connection.effectiveType.toUpperCase() : 'WIFI');
      }
    };
    window.addEventListener('online', updateNetwork);
    window.addEventListener('offline', updateNetwork);
    updateNetwork();

    // 4. CPU Simulation - Throttled to 5s (still feels live)
    const cpuInterval = setInterval(() => {
      setCpuUsage(prev => {
        const change = Math.floor(Math.random() * 10) - 5;
        const newVal = prev + change;
        return Math.min(Math.max(newVal, 12), 90);
      });
    }, 5000); // Increased from 2s to 5s (60% reduction)

    return () => {
      clearInterval(timer);
      clearInterval(cpuInterval);
      window.removeEventListener('online', updateNetwork);
      window.removeEventListener('offline', updateNetwork);
    };
  }, []);

  const handleDockItemClick = (id: string) => {
    // Spike CPU on interaction
    setCpuUsage(prev => Math.min(prev + 15, 99));

    const existingWindow = openWindows.find((w) => w.section === id);

    if (existingWindow) {
      bringToFront(existingWindow.id);
    } else {
      const section = sections.find((s) => s.id === id);
      if (section) {
        const newWindow: WindowState = {
          id: `${id}-${Date.now()}`,
          title: section.title,
          section: id,
          zIndex: maxZIndex + 1,
        };
        setOpenWindows((prev) => [...prev, newWindow]);
        setMaxZIndex((prev) => prev + 1);
      }
    }
  };

  const handleDesktopIconClick = (id: string) => {
    handleDockItemClick(id);
  };

  const bringToFront = (windowId: string) => {
    setOpenWindows((prev) =>
      prev.map((w) => (w.id === windowId ? { ...w, zIndex: maxZIndex + 1 } : w))
    );
    setMaxZIndex((prev) => prev + 1);
  };

  const handleCloseWindow = (windowId: string) => {
    setOpenWindows((prev) => prev.filter((w) => w.id !== windowId));
  };

  const handleMinimizeWindow = (windowId: string) => {
    setOpenWindows((prev) => prev.filter((w) => w.id !== windowId));
  };

  // Tech-style date format
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { hour12: true, hour: 'numeric', minute: '2-digit' });
  };

  // Responsive Grid State
  const [itemsPerCol, setItemsPerCol] = useState(6);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setItemsPerCol(4);
      } else if (width < 1024) {
        setItemsPerCol(5);
      } else {
        setItemsPerCol(6);
      }
    };

    // Set initial value
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="relative h-screen w-screen overflow-hidden select-none  text-ink font-display">
      {/* Background is now theme-oriented (warm tan) */}

      {/* workbench Header */}
      <div className="absolute top-0 left-0 w-full h-14 border-b-2 border-black bg-white z-40 flex items-center justify-between px-4 md:px-6">
        {/* Branding */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-white rounded-full border-2 border-black overflow-hidden shadow-[2px_2px_0_0_black]">
            <img src="/myprofileimage.png" alt="Ashiq" className="w-full h-full object-cover" />
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-black text-lg tracking-tight uppercase">Ashiq</span>
            <span className="text-[10px] font-mono font-bold text-ink-secondary">FULL_STACK_DEV</span>
          </div>
        </div>

        {/* System Tray (Real Elements) */}
        <div className="flex items-center gap-3 md:gap-6">

          {/* CPU Monitor */}
          <div className="hidden md:flex items-center gap-2 font-mono text-xs font-bold border-2 border-black bg-white px-2 py-1 shadow-[2px_2px_0_0_black]">
            <Cpu size={14} className={cpuUsage > 80 ? 'text-red-500 animate-pulse' : 'text-ink-primary'} />
            <span>CPU: {cpuUsage}%</span>
          </div>

          {/* Network Status */}
          <div className="flex items-center gap-2 font-bold text-xs text-ink-primary">
            <div className={`w-2 h-2 rounded-full ${isOnline ? 'bg-green-500' : 'bg-red-500'} animate-pulse`}></div>
            <Wifi size={16} />
            <span className="hidden md:inline">{networkType}</span>
          </div>

          {/* Battery */}
          <div className="flex items-center gap-2 font-bold text-xs text-ink-primary">
            <Battery size={16} className={isCharging ? 'fill-green-400' : ''} />
            <span className="hidden md:inline">{batteryLevel !== null ? `${batteryLevel}%` : '100%'}</span>
          </div>

          {/* Time */}
          <div className="flex items-center gap-2 font-mono text-sm font-bold bg-black text-white px-3 py-1 border-2 border-transparent">
            {formatTime(time)}
          </div>
        </div>
      </div>

      {/* Main Workspace Area (Icons) */}
      <div className="absolute bg-paper inset-0 pt-20 pb-24 px-4 md:px-8 z-10 overflow-hidden" id="desktop-area">
        {/* Desktop Icons - OS Grid Layout (Top-Left, Vertical Flow) */}
        {sections.map((section, index) => {
          // Grid Configuration
          const startX = 24;
          const startY = 80; // Below header
          const gapY = 110;
          const gapX = 100;

          const col = Math.floor(index / itemsPerCol);
          const row = index % itemsPerCol;

          const left = startX + (col * gapX);
          const top = startY + (row * gapY);

          return (
            <div
              key={section.id}
              style={{
                position: 'absolute',
                left: `${left}px`,
                top: `${top}px`
              }}
            >
              <DesktopIcon
                id={section.id}
                label={section.title}
                iconUrl={section.img}
                onClick={() => handleDockItemClick(section.id)}
              />
            </div>
          );
        })}

        {/* Resume Icon (Placed next in grid) */}
        <div
          style={{
            position: 'absolute',
            left: `${24 + (Math.floor(sections.length / itemsPerCol) * 100)}px`,
            top: `${80 + ((sections.length % itemsPerCol) * 110)}px`
          }}
        >
          <DesktopIcon
            id="resume"
            label="RESUME.DAT"
            iconUrl="https://res.cloudinary.com/dmukukwp6/image/upload/document_001e7ec29a.png"
            onClick={() => window.open('/resume.pdf', '_blank')}
          />
        </div>
      </div>


      {/* Main Content Layer */}
      {openWindows.map((window) => (
        <Window
          key={window.id}
          id={window.id}
          title={window.title}
          section={window.section}
          zIndex={window.zIndex}
          onClose={() => handleCloseWindow(window.id)}
          onMinimize={() => handleMinimizeWindow(window.id)}
          onFocus={() => bringToFront(window.id)}
        />
      ))}

      {/* Command Bar (Dock) */}
      <Dock
        onItemClick={handleDockItemClick}
        openWindows={openWindows.map((w) => w.section)}
      />

      {/* Context Menu Blocker */}
      <div
        className="absolute inset-0 z-0"
        onContextMenu={(e) => e.preventDefault()}
      ></div>
    </div>
  );
}

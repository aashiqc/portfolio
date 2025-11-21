"use client";

import { useEffect, useRef } from "react";

/**
 * Configuration for the contour map
 */
const CONFIG = {
  lineColor: "#e5e7eb",
  lineOpacity: 1.0,
  lineWidth: 1.0,
  bgColor: "#FCFCFA",

  gridSize: 10,

  // Noise Settings
  noiseScale: 0.0015,
  speed: 0.002,

  elevationLevels: 10,

  // Cursor Effect
  cursorInfluenceRadius: 200,
  cursorRepelStrength: 0.8,
};

/**
 * Simplex Noise 3D Implementation
 * Provides smooth 3D noise for morphing animation
 */
class SimplexNoise {
  private grad3: number[][];
  private perm: Uint8Array;

  constructor() {
    this.grad3 = [
      [1, 1, 0],
      [-1, 1, 0],
      [1, -1, 0],
      [-1, -1, 0],
      [1, 0, 1],
      [-1, 0, 1],
      [1, 0, -1],
      [-1, 0, -1],
      [0, 1, 1],
      [0, -1, 1],
      [0, 1, -1],
      [0, -1, -1],
    ];

    const p = new Uint8Array(256);
    for (let i = 0; i < 256; i++) p[i] = i;
    for (let i = 255; i > 0; i--) {
      const r = Math.floor(Math.random() * (i + 1));
      [p[i], p[r]] = [p[r], p[i]];
    }

    this.perm = new Uint8Array(512);
    for (let i = 0; i < 512; i++) this.perm[i] = p[i & 255];
  }

  private dot(g: number[], x: number, y: number, z: number): number {
    return g[0] * x + g[1] * y + g[2] * z;
  }

  noise3D(xin: number, yin: number, zin: number): number {
    let n0, n1, n2, n3;

    const F3 = 1.0 / 3.0;
    const s = (xin + yin + zin) * F3;
    const i = Math.floor(xin + s);
    const j = Math.floor(yin + s);
    const k = Math.floor(zin + s);

    const G3 = 1.0 / 6.0;
    const t = (i + j + k) * G3;
    const X0 = i - t;
    const Y0 = j - t;
    const Z0 = k - t;

    const x0 = xin - X0;
    const y0 = yin - Y0;
    const z0 = zin - Z0;

    let i1, j1, k1;
    let i2, j2, k2;

    if (x0 >= y0) {
      if (y0 >= z0) {
        i1 = 1;
        j1 = 0;
        k1 = 0;
        i2 = 1;
        j2 = 1;
        k2 = 0;
      } else if (x0 >= z0) {
        i1 = 1;
        j1 = 0;
        k1 = 0;
        i2 = 1;
        j2 = 0;
        k2 = 1;
      } else {
        i1 = 0;
        j1 = 0;
        k1 = 1;
        i2 = 1;
        j2 = 0;
        k2 = 1;
      }
    } else {
      if (y0 < z0) {
        i1 = 0;
        j1 = 0;
        k1 = 1;
        i2 = 0;
        j2 = 1;
        k2 = 1;
      } else if (x0 < z0) {
        i1 = 0;
        j1 = 1;
        k1 = 0;
        i2 = 0;
        j2 = 1;
        k2 = 1;
      } else {
        i1 = 0;
        j1 = 1;
        k1 = 0;
        i2 = 1;
        j2 = 1;
        k2 = 0;
      }
    }

    const x1 = x0 - i1 + G3;
    const y1 = y0 - j1 + G3;
    const z1 = z0 - k1 + G3;
    const x2 = x0 - i2 + 2.0 * G3;
    const y2 = y0 - j2 + 2.0 * G3;
    const z2 = z0 - k2 + 2.0 * G3;
    const x3 = x0 - 1.0 + 3.0 * G3;
    const y3 = y0 - 1.0 + 3.0 * G3;
    const z3 = z0 - 1.0 + 3.0 * G3;

    const ii = i & 255;
    const jj = j & 255;
    const kk = k & 255;

    let t0 = 0.6 - x0 * x0 - y0 * y0 - z0 * z0;
    if (t0 < 0) n0 = 0.0;
    else {
      t0 *= t0;
      n0 =
        t0 *
        t0 *
        this.dot(
          this.grad3[this.perm[ii + this.perm[jj + this.perm[kk]]] % 12],
          x0,
          y0,
          z0
        );
    }

    let t1 = 0.6 - x1 * x1 - y1 * y1 - z1 * z1;
    if (t1 < 0) n1 = 0.0;
    else {
      t1 *= t1;
      n1 =
        t1 *
        t1 *
        this.dot(
          this.grad3[
            this.perm[ii + i1 + this.perm[jj + j1 + this.perm[kk + k1]]] % 12
          ],
          x1,
          y1,
          z1
        );
    }

    let t2 = 0.6 - x2 * x2 - y2 * y2 - z2 * z2;
    if (t2 < 0) n2 = 0.0;
    else {
      t2 *= t2;
      n2 =
        t2 *
        t2 *
        this.dot(
          this.grad3[
            this.perm[ii + i2 + this.perm[jj + j2 + this.perm[kk + k2]]] % 12
          ],
          x2,
          y2,
          z2
        );
    }

    let t3 = 0.6 - x3 * x3 - y3 * y3 - z3 * z3;
    if (t3 < 0) n3 = 0.0;
    else {
      t3 *= t3;
      n3 =
        t3 *
        t3 *
        this.dot(
          this.grad3[
            this.perm[ii + 1 + this.perm[jj + 1 + this.perm[kk + 1]]] % 12
          ],
          x3,
          y3,
          z3
        );
    }

    return 32.0 * (n0 + n1 + n2 + n3);
  }
}

export default function ChaosBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationIdRef = useRef<number>(0);
  const noiseRef = useRef<SimplexNoise | null>(null);
  const timeRef = useRef(0);
  const gridRef = useRef<Float32Array | null>(null);
  const dimensionsRef = useRef({ cols: 0, rows: 0 });
  const mouseRef = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Initialize noise generator
    noiseRef.current = new SimplexNoise();

    // Set canvas size
    const setCanvasSize = () => {
      const dpr = window.devicePixelRatio || 1;
      const width = window.innerWidth;
      const height = window.innerHeight;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);

      // Calculate grid dimensions
      const cols = Math.ceil(width / CONFIG.gridSize) + 1;
      const rows = Math.ceil(height / CONFIG.gridSize) + 1;
      dimensionsRef.current = { cols, rows };
      gridRef.current = new Float32Array(cols * rows);
    };

    setCanvasSize();

    // Interpolation helper
    const invLerp = (val1: number, val2: number, target: number): number => {
      if (Math.abs(val2 - val1) < 0.00001) return 0.5;
      return (target - val1) / (val2 - val1);
    };

    // Animation loop
    const draw = () => {
      animationIdRef.current = requestAnimationFrame(draw);

      const width = window.innerWidth;
      const height = window.innerHeight;
      const { cols, rows } = dimensionsRef.current;
      const grid = gridRef.current;
      const noise = noiseRef.current;

      if (!grid || !noise) return;

      // Clear canvas
      ctx.fillStyle = CONFIG.bgColor;
      ctx.fillRect(0, 0, width, height);

      timeRef.current += CONFIG.speed;

      // Calculate noise field with cursor influence
      const mouseX = mouseRef.current.x;
      const mouseY = mouseRef.current.y;

      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const sx = x * CONFIG.gridSize;
          const sy = y * CONFIG.gridSize;

          let n = noise.noise3D(
            sx * CONFIG.noiseScale,
            sy * CONFIG.noiseScale,
            timeRef.current
          );

          // Apply cursor repel effect
          const dx = sx - mouseX;
          const dy = sy - mouseY;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < CONFIG.cursorInfluenceRadius && distance > 0.1) {
            // Calculate repel force - stronger closer to cursor
            const force =
              (1 - distance / CONFIG.cursorInfluenceRadius) *
              CONFIG.cursorRepelStrength;
            // Push the noise value away from cursor
            // Using normalized direction vector for smooth repel
            const repelEffect = force * Math.exp(-distance / 100);
            n -= repelEffect;
          }

          grid[y * cols + x] = n;
        }
      }

      // Draw contours using marching squares
      ctx.strokeStyle = CONFIG.lineColor;
      ctx.lineWidth = CONFIG.lineWidth;
      ctx.lineCap = "round";
      ctx.globalAlpha = CONFIG.lineOpacity;

      const startLevel = -0.7;
      const endLevel = 0.7;
      const range = endLevel - startLevel;

      for (let l = 0; l < CONFIG.elevationLevels; l++) {
        const threshold =
          startLevel + (l / (CONFIG.elevationLevels - 1)) * range;

        ctx.beginPath();

        for (let y = 0; y < rows - 1; y++) {
          for (let x = 0; x < cols - 1; x++) {
            const i = y * cols + x;
            const valA = grid[i];
            const valB = grid[i + 1];
            const valC = grid[i + cols + 1];
            const valD = grid[i + cols];

            let state = 0;
            if (valA >= threshold) state |= 8;
            if (valB >= threshold) state |= 4;
            if (valC >= threshold) state |= 2;
            if (valD >= threshold) state |= 1;

            if (state === 0 || state === 15) continue;

            // Interpolation points
            const t = threshold;
            const xTop =
              x * CONFIG.gridSize +
              invLerp(valA, valB, t) * CONFIG.gridSize;
            const yTop = y * CONFIG.gridSize;
            const xRight = (x + 1) * CONFIG.gridSize;
            const yRight =
              y * CONFIG.gridSize +
              invLerp(valB, valC, t) * CONFIG.gridSize;
            const xBottom =
              x * CONFIG.gridSize +
              invLerp(valD, valC, t) * CONFIG.gridSize;
            const yBottom = (y + 1) * CONFIG.gridSize;
            const xLeft = x * CONFIG.gridSize;
            const yLeft =
              y * CONFIG.gridSize +
              invLerp(valA, valD, t) * CONFIG.gridSize;

            // Draw line segments based on marching squares state
            switch (state) {
              case 1:
                ctx.moveTo(xLeft, yLeft);
                ctx.lineTo(xBottom, yBottom);
                break;
              case 2:
                ctx.moveTo(xBottom, yBottom);
                ctx.lineTo(xRight, yRight);
                break;
              case 3:
                ctx.moveTo(xLeft, yLeft);
                ctx.lineTo(xRight, yRight);
                break;
              case 4:
                ctx.moveTo(xTop, yTop);
                ctx.lineTo(xRight, yRight);
                break;
              case 5:
                ctx.moveTo(xLeft, yLeft);
                ctx.lineTo(xTop, yTop);
                ctx.moveTo(xBottom, yBottom);
                ctx.lineTo(xRight, yRight);
                break;
              case 6:
                ctx.moveTo(xTop, yTop);
                ctx.lineTo(xBottom, yBottom);
                break;
              case 7:
                ctx.moveTo(xLeft, yLeft);
                ctx.lineTo(xTop, yTop);
                break;
              case 8:
                ctx.moveTo(xLeft, yLeft);
                ctx.lineTo(xTop, yTop);
                break;
              case 9:
                ctx.moveTo(xTop, yTop);
                ctx.lineTo(xBottom, yBottom);
                break;
              case 10:
                ctx.moveTo(xLeft, yLeft);
                ctx.lineTo(xBottom, yBottom);
                ctx.moveTo(xTop, yTop);
                ctx.lineTo(xRight, yRight);
                break;
              case 11:
                ctx.moveTo(xTop, yTop);
                ctx.lineTo(xRight, yRight);
                break;
              case 12:
                ctx.moveTo(xLeft, yLeft);
                ctx.lineTo(xRight, yRight);
                break;
              case 13:
                ctx.moveTo(xBottom, yBottom);
                ctx.lineTo(xRight, yRight);
                break;
              case 14:
                ctx.moveTo(xLeft, yLeft);
                ctx.lineTo(xBottom, yBottom);
                break;
            }
          }
        }
        ctx.stroke();
      }
    };

    // Mouse handlers
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };

    // Touch handlers for mobile
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mouseRef.current = {
          x: e.touches[0].clientX,
          y: e.touches[0].clientY,
        };
      }
    };

    const handleTouchEnd = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };

    // Resize handler
    const handleResize = () => {
      // Reset the scale before resizing
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      setCanvasSize();
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchend", handleTouchEnd);

    // Start animation
    draw();

    // Cleanup
    return () => {
      cancelAnimationFrame(animationIdRef.current);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ pointerEvents: "auto" }}
    />
  );
}

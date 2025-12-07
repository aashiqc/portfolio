"use client";

import { useEffect, useRef } from "react";

/**
 * Configuration for the contour map - Performance Optimized
 */
const CONFIG = {
  lineColor: "#e5e7eb",
  lineOpacity: 1.0,
  lineWidth: 1.0,
  bgColor: "#050505",

  // Optimized: Increased from 15 to 20 (44% fewer calculations, still fluid)
  gridSize: 20,

  // Noise Settings: "Liquid" feel
  noiseScale: 0.001,
  speed: 0.002,

  // Optimized: 8 levels still looks great
  elevationLevels: 8,

  // Cursor Effect
  cursorInfluenceRadius: 300,
  cursorRepelStrength: 0.8,

  // Performance: 30fps indistinguishable for background motion (50% savings)
  targetFPS: 30
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
  return (
    <div
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{
        backgroundImage: `radial-gradient(#E4E4E7 1px, transparent 1px)`,
        backgroundSize: '24px 24px'
      }}
    />
  );
}

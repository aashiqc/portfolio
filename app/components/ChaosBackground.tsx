"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/addons/postprocessing/UnrealBloomPass.js";

const CONFIG = {
  particleCount: 20000,
  particleSize: 0.1,
  flowSpeed: 0.005,
  turbulence: 0.2,
  spreadRadius: 30,
  bloomStrength: 0.8,
  bloomRadius: 0.4,
  bloomThreshold: 0.1,
  cameraOrbitSpeed: 0.00005,
  baseColor1: new THREE.Color(0x00aaff),
  baseColor2: new THREE.Color(0xaa00ff),
  // Cursor effect settings
  cursorInfluenceRadius: 15,
  cursorRepelStrength: 1.5,
  cursorColor: new THREE.Color(0x00ffff),
};

export default function ChaosBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const animationIdRef = useRef<number>(0);
  const mouseRef = useRef({ x: 0, y: 0, active: false });

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;

    // Scene Setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x000000, 0.02);

    const camera = new THREE.PerspectiveCamera(
      75,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 50);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Particle System
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(CONFIG.particleCount * 3);
    const colors = new Float32Array(CONFIG.particleCount * 3);
    const originalPositions = new Float32Array(CONFIG.particleCount * 3);

    for (let i = 0; i < CONFIG.particleCount; i++) {
      const x = (Math.random() - 0.5) * CONFIG.spreadRadius * 2;
      const y = (Math.random() - 0.5) * CONFIG.spreadRadius * 2;
      const z = (Math.random() - 0.5) * CONFIG.spreadRadius * 2;

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      originalPositions[i * 3] = x;
      originalPositions[i * 3 + 1] = y;
      originalPositions[i * 3 + 2] = z;

      const color = new THREE.Color().lerpColors(
        CONFIG.baseColor1,
        CONFIG.baseColor2,
        Math.random()
      );
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: CONFIG.particleSize,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      transparent: true,
      opacity: 0.9,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // Post-Processing
    const renderScene = new RenderPass(scene, camera);
    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(container.clientWidth, container.clientHeight),
      CONFIG.bloomStrength,
      CONFIG.bloomRadius,
      CONFIG.bloomThreshold
    );

    const composer = new EffectComposer(renderer);
    composer.addPass(renderScene);
    composer.addPass(bloomPass);

    // Mouse tracking
    const mouse3D = new THREE.Vector3();
    const raycaster = new THREE.Raycaster();
    const mouseNDC = new THREE.Vector2();

    function handleMouseMove(event: MouseEvent) {
      const rect = container.getBoundingClientRect();
      mouseNDC.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouseNDC.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
      mouseRef.current.active = true;

      // Project mouse to 3D space at z=0
      raycaster.setFromCamera(mouseNDC, camera);
      const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
      raycaster.ray.intersectPlane(plane, mouse3D);
      mouseRef.current.x = mouse3D.x;
      mouseRef.current.y = mouse3D.y;
    }

    function handleMouseLeave() {
      mouseRef.current.active = false;
    }

    // Use window for smooth tracking across entire viewport
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    // Perlin Noise Function
    function getPerlinNoise(x: number, y: number, z: number, timeOffset: number) {
      const scale = 0.1;
      let noise =
        Math.sin(x * scale + timeOffset) +
        Math.cos(y * scale * 0.8 + timeOffset) +
        Math.sin(z * scale * 1.2 + timeOffset);
      noise += Math.sin((x + y) * scale * 0.5 + timeOffset * 0.7);
      noise += Math.cos((y + z) * scale * 0.6 + timeOffset * 0.9);
      return noise / 5;
    }

    // Animation Loop
    const clock = new THREE.Clock();

    function animate() {
      animationIdRef.current = requestAnimationFrame(animate);

      const delta = clock.getDelta();
      const elapsedTime = clock.getElapsedTime();

      const positionsArray = particles.geometry.attributes.position
        .array as Float32Array;
      const colorsArray = particles.geometry.attributes.color
        .array as Float32Array;

      for (let i = 0; i < CONFIG.particleCount; i++) {
        const idx = i * 3;
        let x = positionsArray[idx];
        let y = positionsArray[idx + 1];
        let z = positionsArray[idx + 2];

        // Apply flow along Z-axis
        z += CONFIG.flowSpeed * delta * 100;

        // Add turbulence
        const turbulenceX =
          getPerlinNoise(x, y, z, elapsedTime * 0.5) * CONFIG.turbulence;
        const turbulenceY =
          getPerlinNoise(y, z, x, elapsedTime * 0.6) * CONFIG.turbulence;

        x += turbulenceX * delta * 100;
        y += turbulenceY * delta * 100;

        // Loop particles
        if (z > CONFIG.spreadRadius) {
          z = -CONFIG.spreadRadius;
          x = originalPositions[idx];
          y = originalPositions[idx + 1];
        }

        // Cursor interaction - repel particles
        let cursorInfluence = 0;
        if (mouseRef.current.active) {
          const dx = x - mouseRef.current.x;
          const dy = y - mouseRef.current.y;
          const distToCursor = Math.sqrt(dx * dx + dy * dy);

          if (distToCursor < CONFIG.cursorInfluenceRadius && distToCursor > 0.1) {
            const force =
              (1 - distToCursor / CONFIG.cursorInfluenceRadius) *
              CONFIG.cursorRepelStrength;
            x += (dx / distToCursor) * force;
            y += (dy / distToCursor) * force;
            cursorInfluence = force * 2;
          }
        }

        positionsArray[idx] = x;
        positionsArray[idx + 1] = y;
        positionsArray[idx + 2] = z;

        // Dynamic color mixing
        const timeColorFactor =
          Math.sin(elapsedTime * 0.1 + i * 0.001) * 0.5 + 0.5;
        let mixedColor = new THREE.Color().lerpColors(
          CONFIG.baseColor1,
          CONFIG.baseColor2,
          timeColorFactor
        );

        // Brighten particles near cursor
        if (cursorInfluence > 0) {
          mixedColor = mixedColor.lerp(CONFIG.cursorColor, cursorInfluence);
        }

        colorsArray[idx] = mixedColor.r;
        colorsArray[idx + 1] = mixedColor.g;
        colorsArray[idx + 2] = mixedColor.b;
      }

      particles.geometry.attributes.position.needsUpdate = true;
      particles.geometry.attributes.color.needsUpdate = true;

      // Subtle camera orbit
      camera.position.x = Math.sin(elapsedTime * CONFIG.cameraOrbitSpeed) * 50;
      camera.position.z = Math.cos(elapsedTime * CONFIG.cameraOrbitSpeed) * 50;
      camera.lookAt(scene.position);

      composer.render();
    }

    // Resize Handler
    function handleResize() {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
      composer.setSize(container.clientWidth, container.clientHeight);
    }

    window.addEventListener("resize", handleResize);
    animate();

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationIdRef.current);

      if (rendererRef.current) {
        rendererRef.current.dispose();
        container.removeChild(rendererRef.current.domElement);
      }

      geometry.dispose();
      material.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full z-0"
      style={{ pointerEvents: "none" }}
    />
  );
}

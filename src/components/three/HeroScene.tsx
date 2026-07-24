import { useCallback, useRef } from "react";
import * as THREE from "three";

/**
 * 4D Hypercube / Interstellar Tesseract background visualization.
 * Projects a 16-vertex, 32-edge 4D hypercube into 3D space with continuous
 * 4D plane rotations (X-W, Y-W, Z-W) and perspective projection, creating
 * the iconic morphing tesseract geometry from Interstellar.
 */
export default function HeroScene() {
  const cleanupRef = useRef<() => void>();

  const canvasRef = useCallback((canvas: HTMLCanvasElement | null) => {
    if (!canvas) {
      cleanupRef.current?.();
      cleanupRef.current = undefined;
      return;
    }

    const parent = canvas.parentElement;
    if (!parent) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    } catch {
      return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.z = 6.5;

    // 1. Build 4D Tesseract Vertices (16 vertices) & Edges (32 edges)
    const base4DVertices: [number, number, number, number][] = [];
    for (let i = 0; i < 16; i++) {
      const x = i & 1 ? 1 : -1;
      const y = i & 2 ? 1 : -1;
      const z = i & 4 ? 1 : -1;
      const w = i & 8 ? 1 : -1;
      base4DVertices.push([x, y, z, w]);
    }

    const primaryEdges: [number, number][] = [];
    for (let i = 0; i < 16; i++) {
      for (let j = i + 1; j < 16; j++) {
        // Connect vertices differing by exactly one coordinate bit (Hamming dist = 1)
        const diff = i ^ j;
        if (diff === 1 || diff === 2 || diff === 4 || diff === 8) {
          primaryEdges.push([i, j]);
        }
      }
    }

    // Secondary timeline / internal lattice lines for Interstellar multi-dimensional feel
    const gridEdges: [number, number][] = [];
    // Intermediate 4D points for internal grid lines across hypercube faces
    const internalVertices: [number, number, number, number][] = [];
    for (let i = 0; i < 16; i++) {
      const v = base4DVertices[i];
      internalVertices.push([v[0] * 0.5, v[1] * 0.5, v[2] * 0.5, v[3] * 0.5]);
    }
    for (let i = 0; i < 16; i++) {
      for (let j = i + 1; j < 16; j++) {
        const diff = i ^ j;
        if (diff === 1 || diff === 2 || diff === 4 || diff === 8) {
          gridEdges.push([i, j]);
        }
      }
    }

    // Primary Tesseract Geometry (32 edges = 64 vertices = 192 floats)
    const mainPositions = new Float32Array(primaryEdges.length * 2 * 3);
    const mainGeometry = new THREE.BufferGeometry();
    mainGeometry.setAttribute("position", new THREE.BufferAttribute(mainPositions, 3));
    const mainMaterial = new THREE.LineBasicMaterial({
      color: 0xc8ff4d,
      transparent: true,
      opacity: 0.65,
      linewidth: 1.5,
    });
    const mainShape = new THREE.LineSegments(mainGeometry, mainMaterial);
    scene.add(mainShape);

    // Inner Grid Geometry (Translucent white lattice)
    const gridPositions = new Float32Array(gridEdges.length * 2 * 3);
    const gridGeometry = new THREE.BufferGeometry();
    gridGeometry.setAttribute("position", new THREE.BufferAttribute(gridPositions, 3));
    const gridMaterial = new THREE.LineBasicMaterial({
      color: 0xf3f1ea,
      transparent: true,
      opacity: 0.22,
    });
    const gridShape = new THREE.LineSegments(gridGeometry, gridMaterial);
    scene.add(gridShape);

    // Background cosmic particle field
    const particleCount = 240;
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 18;
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 18;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    const particlesGeometry = new THREE.BufferGeometry();
    particlesGeometry.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));
    const particlesMaterial = new THREE.PointsMaterial({
      color: 0xf3f1ea,
      size: 0.018,
      transparent: true,
      opacity: 0.35,
    });
    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    // Mouse interaction & Scroll Boost
    let targetX = 0;
    let targetY = 0;
    const handlePointerMove = (e: PointerEvent) => {
      targetX = (e.clientX / window.innerWidth - 0.5) * 2;
      targetY = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("pointermove", handlePointerMove);

    let scrollBoost = 0;
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      scrollBoost = Math.min(scrollBoost + Math.abs(currentScrollY - lastScrollY) * 0.02, 3);
      lastScrollY = currentScrollY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    const resize = () => {
      const { clientWidth, clientHeight } = parent;
      if (clientWidth === 0 || clientHeight === 0) return;
      renderer.setSize(clientWidth, clientHeight);
      camera.aspect = clientWidth / clientHeight;
      camera.updateProjectionMatrix();
    };
    resize();
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(parent);

    let isVisible = true;
    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0 },
    );
    intersectionObserver.observe(parent);

    const clock = new THREE.Clock();
    let frameId = 0;
    let currentX = 0;
    let currentY = 0;

    // 4D Rotation Angles
    let angleXW = 0;
    let angleYW = 0;
    let angleZW = 0;
    let particlesRotY = 0;

    // 4D Projection helper function
    const project4Dto3D = (
      v4: [number, number, number, number],
      aXW: number,
      aYW: number,
      aZW: number,
      scaleFactor = 1.35,
    ): [number, number, number] => {
      let [x, y, z, w] = v4;

      // 1. Rotate in X-W plane
      const cosXW = Math.cos(aXW);
      const sinXW = Math.sin(aXW);
      const x1 = x * cosXW - w * sinXW;
      const w1 = x * sinXW + w * cosXW;

      // 2. Rotate in Y-W plane
      const cosYW = Math.cos(aYW);
      const sinYW = Math.sin(aYW);
      const y2 = y * cosYW - w1 * sinYW;
      const w2 = y * sinYW + w1 * cosYW;

      // 3. Rotate in Z-W plane
      const cosZW = Math.cos(aZW);
      const sinZW = Math.sin(aZW);
      const z3 = z * cosZW - w2 * sinZW;
      const w3 = z * sinZW + w2 * cosZW;

      // 4. Perspective projection from 4D to 3D
      const distance = 2.6;
      const projScale = distance / (distance - w3);

      return [x1 * projScale * scaleFactor, y2 * projScale * scaleFactor, z3 * projScale * scaleFactor];
    };

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      if (!isVisible) return;

      const delta = clock.getDelta();

      currentX += (targetX - currentX) * 0.04;
      currentY += (targetY - currentY) * 0.04;

      scrollBoost += (0 - scrollBoost) * 0.05;
      const speed = 1 + scrollBoost;

      // Increment 4D plane rotation angles
      angleXW += delta * 0.35 * speed;
      angleYW += delta * 0.22 * speed;
      angleZW += delta * 0.15 * speed;

      // Project primary 4D Tesseract
      const posAttr = mainGeometry.attributes.position as THREE.BufferAttribute;
      const positionsArr = posAttr.array as Float32Array;

      let idx = 0;
      for (let i = 0; i < primaryEdges.length; i++) {
        const [i1, i2] = primaryEdges[i];
        const p1 = project4Dto3D(base4DVertices[i1], angleXW, angleYW, angleZW, 1.35);
        const p2 = project4Dto3D(base4DVertices[i2], angleXW, angleYW, angleZW, 1.35);

        positionsArr[idx++] = p1[0];
        positionsArr[idx++] = p1[1];
        positionsArr[idx++] = p1[2];

        positionsArr[idx++] = p2[0];
        positionsArr[idx++] = p2[1];
        positionsArr[idx++] = p2[2];
      }
      posAttr.needsUpdate = true;

      // Project secondary inner lattice grid
      const gridPosAttr = gridGeometry.attributes.position as THREE.BufferAttribute;
      const gridPositionsArr = gridPosAttr.array as Float32Array;

      let gIdx = 0;
      for (let i = 0; i < gridEdges.length; i++) {
        const [i1, i2] = gridEdges[i];
        const p1 = project4Dto3D(internalVertices[i1], angleXW * 0.8, angleYW * 0.8, angleZW * 0.8, 1.2);
        const p2 = project4Dto3D(internalVertices[i2], angleXW * 0.8, angleYW * 0.8, angleZW * 0.8, 1.2);

        gridPositionsArr[gIdx++] = p1[0];
        gridPositionsArr[gIdx++] = p1[1];
        gridPositionsArr[gIdx++] = p1[2];

        gridPositionsArr[gIdx++] = p2[0];
        gridPositionsArr[gIdx++] = p2[1];
        gridPositionsArr[gIdx++] = p2[2];
      }
      gridPosAttr.needsUpdate = true;

      // Interactive 3D scene tilt from cursor
      mainShape.rotation.y = currentX * 0.4;
      mainShape.rotation.x = currentY * 0.3;
      gridShape.rotation.y = currentX * 0.4;
      gridShape.rotation.x = currentY * 0.3;

      particlesRotY -= delta * 0.015 * speed;
      particles.rotation.y = particlesRotY;

      renderer.render(scene, camera);
    };
    animate();

    cleanupRef.current = () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("scroll", handleScroll);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      mainGeometry.dispose();
      mainMaterial.dispose();
      gridGeometry.dispose();
      gridMaterial.dispose();
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0 h-full w-full" />;
}

import { useCallback, useRef } from "react";
import * as THREE from "three";

/**
 * Subtle Three.js background for the hero: a rotating wireframe icosahedron
 * with a smaller counter-rotating inner shape, a light particle field with
 * faint constellation lines, reacting to pointer position and speeding up
 * briefly on scroll. Mounted and torn down entirely through the canvas ref
 * callback.
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
      // WebGL unavailable/disabled (older browsers, some sandboxed or GPU-less
      // environments), fail silently and keep the plain dark background.
      return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.z = 6.5;

    const geometry = new THREE.IcosahedronGeometry(2.3, 1);
    const wireframe = new THREE.WireframeGeometry(geometry);
    const material = new THREE.LineBasicMaterial({ color: 0xc8ff4d, transparent: true, opacity: 0.45 });
    const shape = new THREE.LineSegments(wireframe, material);
    scene.add(shape);

    // Smaller inner shape, opposite rotation direction, adds depth without
    // competing with the main wireframe for attention.
    const innerGeometry = new THREE.IcosahedronGeometry(1.1, 0);
    const innerWireframe = new THREE.WireframeGeometry(innerGeometry);
    const innerMaterial = new THREE.LineBasicMaterial({ color: 0xf3f1ea, transparent: true, opacity: 0.18 });
    const innerShape = new THREE.LineSegments(innerWireframe, innerMaterial);
    scene.add(innerShape);

    const particleCount = 220;
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 16;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 16;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 8;
    }
    const particlesGeometry = new THREE.BufferGeometry();
    particlesGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const particlesMaterial = new THREE.PointsMaterial({
      color: 0xf3f1ea,
      size: 0.018,
      transparent: true,
      opacity: 0.35,
    });
    const particles = new THREE.Points(particlesGeometry, particlesMaterial);

    // Faint constellation lines between nearby particles, computed once
    // since the particles never move relative to each other (only the
    // group as a whole rotates).
    const maxDistance = 2;
    const linePositions: number[] = [];
    for (let i = 0; i < particleCount; i++) {
      for (let j = i + 1; j < particleCount; j++) {
        const dx = positions[i * 3] - positions[j * 3];
        const dy = positions[i * 3 + 1] - positions[j * 3 + 1];
        const dz = positions[i * 3 + 2] - positions[j * 3 + 2];
        if (dx * dx + dy * dy + dz * dz < maxDistance * maxDistance) {
          linePositions.push(positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2]);
          linePositions.push(positions[j * 3], positions[j * 3 + 1], positions[j * 3 + 2]);
        }
      }
    }
    const linesGeometry = new THREE.BufferGeometry();
    linesGeometry.setAttribute("position", new THREE.Float32BufferAttribute(linePositions, 3));
    const linesMaterial = new THREE.LineBasicMaterial({ color: 0xf3f1ea, transparent: true, opacity: 0.06 });
    const constellationLines = new THREE.LineSegments(linesGeometry, linesMaterial);

    const particlesGroup = new THREE.Group();
    particlesGroup.add(particles, constellationLines);
    scene.add(particlesGroup);

    let targetX = 0;
    let targetY = 0;
    const handlePointerMove = (e: PointerEvent) => {
      targetX = (e.clientX / window.innerWidth - 0.5) * 2;
      targetY = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("pointermove", handlePointerMove);

    // Scrolling briefly speeds up the rotation, then it eases back to its
    // normal pace.
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
    let outerRotY = 0;
    let outerRotX = 0;
    let innerRotY = 0;
    let innerRotX = 0;
    let particlesRotY = 0;

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      if (!isVisible) return;

      const delta = clock.getDelta();

      currentX += (targetX - currentX) * 0.03;
      currentY += (targetY - currentY) * 0.03;

      scrollBoost += (0 - scrollBoost) * 0.05;
      const speed = 1 + scrollBoost;

      outerRotY += delta * 0.1 * speed;
      outerRotX += delta * 0.06 * speed;
      shape.rotation.y = outerRotY + currentX * 0.4;
      shape.rotation.x = outerRotX + currentY * 0.3;

      innerRotY -= delta * 0.16 * speed;
      innerRotX -= delta * 0.1 * speed;
      innerShape.rotation.y = innerRotY;
      innerShape.rotation.x = innerRotX;

      particlesRotY -= delta * 0.015 * speed;
      particlesGroup.rotation.y = particlesRotY;

      renderer.render(scene, camera);
    };
    animate();

    cleanupRef.current = () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("scroll", handleScroll);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      geometry.dispose();
      wireframe.dispose();
      material.dispose();
      innerGeometry.dispose();
      innerWireframe.dispose();
      innerMaterial.dispose();
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      linesGeometry.dispose();
      linesMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0 h-full w-full" />;
}

import { useEffect, useRef } from 'react';

export default function ThreeDBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Particle nodes definition
    interface Particle {
      x: number;
      y: number;
      z: number;
      baseX: number;
      baseY: number;
      baseZ: number;
      color: string;
      size: number;
    }

    const particles: Particle[] = [];
    const particleCount = Math.min(140, Math.floor((width * height) / 10000));
    const sphereRadius = Math.min(width, height) * 0.38;

    // Generate coordinates on a 3D Sphere geometry for orbital neural network effect
    for (let i = 0; i < particleCount; i++) {
      const theta = Math.acos(Math.random() * 2 - 1); // 0 to PI
      const phi = Math.random() * Math.PI * 2; // 0 to 2PI

      // Spherical to Cartesian coordinates
      const x = sphereRadius * Math.sin(theta) * Math.cos(phi);
      const y = sphereRadius * Math.sin(theta) * Math.sin(phi);
      const z = sphereRadius * Math.cos(theta);

      particles.push({
        x,
        y,
        z,
        baseX: x,
        baseY: y,
        baseZ: z,
        size: Math.random() * 1.5 + 1.0,
        color: i % 4 === 0 ? 'rgba(13, 148, 136, 0.7)' : i % 4 === 1 ? 'rgba(109, 40, 217, 0.6)' : 'rgba(255, 255, 255, 0.4)',
      });
    }

    // Interactivity state
    const mouse = {
      x: 0,
      y: 0,
      targetX: 0,
      targetY: 0,
      isMoving: false,
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = (e.clientX - width / 2) * 0.4;
      mouse.targetY = (e.clientY - height / 2) * 0.4;
    };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);

    // Orbital constants
    let angleX = 0.0016;
    let angleY = 0.0022;

    const rotateX = (p: Particle, angle: number) => {
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);
      const y1 = p.y * cos - p.z * sin;
      const z1 = p.z * cos + p.y * sin;
      p.y = y1;
      p.z = z1;
    };

    const rotateY = (p: Particle, angle: number) => {
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);
      const x1 = p.x * cos - p.z * sin;
      const z1 = p.z * cos + p.x * sin;
      p.x = x1;
      p.z = z1;
    };

    // Render loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Interpolate mouse movement to prevent jarring snap-backs
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      const focalLength = 320;
      const centerX = width / 2;
      const centerY = height / 2;

      // Rotate all nodes in 3D frame
      particles.forEach((p) => {
        rotateX(p, angleX);
        rotateY(p, angleY);
      });

      // Render projected connection lines
      ctx.lineWidth = 0.75;
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        // Don't connect points lying too far visually
        const zScale1 = focalLength / (focalLength + p1.z + 180);
        const screenX1 = p1.x * zScale1 + centerX + mouse.x * (zScale1 * 0.8);
        const screenY1 = p1.y * zScale1 + centerY + mouse.y * (zScale1 * 0.8);

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist3D = Math.hypot(p1.x - p2.x, p1.y - p2.y, p1.z - p2.z);

          // If close in physical sphere space
          if (dist3D < sphereRadius * 0.6) {
            const zScale2 = focalLength / (focalLength + p2.z + 180);
            const screenX2 = p2.x * zScale2 + centerX + mouse.x * (zScale2 * 0.8);
            const screenY2 = p2.y * zScale2 + centerY + mouse.y * (zScale2 * 0.8);

            // Distance based alpha
            const alpha = (1 - dist3D / (sphereRadius * 0.6)) * 0.18 * zScale1;
            ctx.strokeStyle = i % 2 === 0 ? `rgba(13, 148, 136, ${alpha})` : `rgba(109, 40, 217, ${alpha})`;
            ctx.beginPath();
            ctx.moveTo(screenX1, screenY1);
            ctx.lineTo(screenX2, screenY2);
            ctx.stroke();
          }
        }
      }

      // Draw particle nodes
      particles.forEach((p) => {
        const zScale = focalLength / (focalLength + p.z + 180);
        const screenX = p.x * zScale + centerX + mouse.x * (zScale * 0.8);
        const screenY = p.y * zScale + centerY + mouse.y * (zScale * 0.8);

        // Alpha values driven by Z-depth perspective
        const alpha = Math.max(0.1, zScale * 0.8);
        ctx.fillStyle = p.color.replace(')', `, ${alpha})`).replace('0.7', '1.0').replace('0.6', '1.0');
        ctx.beginPath();
        ctx.arc(screenX, screenY, p.size * zScale * 1.5, 0, Math.PI * 2);
        ctx.fill();

        // Subtly halo aura around active cyan points
        if (p.color.includes('13, 148, 136')) {
          ctx.fillStyle = `rgba(13, 148, 136, ${alpha * 0.15})`;
          ctx.beginPath();
          ctx.arc(screenX, screenY, p.size * zScale * 4.5, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      id="neon-neural-canvas"
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0 h-full w-full bg-gray-950 block"
    />
  );
}

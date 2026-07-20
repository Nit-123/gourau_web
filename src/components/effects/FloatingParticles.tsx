import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  alpha: number;
  pulseSpeed: number;
  pulseDir: number;
}

export const FloatingParticles: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    const maxParticles = 40;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    const createParticle = (randomY = false): Particle => {
      const size = Math.random() * 3 + 1.5; // 1.5px to 4.5px
      return {
        x: Math.random() * canvas.width,
        y: randomY ? Math.random() * canvas.height : canvas.height + 20,
        size,
        speedY: -(Math.random() * 0.4 + 0.15), // Drifting slowly upwards
        speedX: (Math.random() - 0.5) * 0.25, // Slight horizontal sway
        alpha: Math.random() * 0.4 + 0.1, // Initial transparency
        pulseSpeed: Math.random() * 0.01 + 0.005,
        pulseDir: Math.random() > 0.5 ? 1 : -1
      };
    };

    // Initialize particles across the entire height initially
    for (let i = 0; i < maxParticles; i++) {
      particles.push(createParticle(true));
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p, index) => {
        // Update positions
        p.y += p.speedY;
        p.x += p.speedX;

        // Opacity pulsing
        p.alpha += p.pulseSpeed * p.pulseDir;
        if (p.alpha > 0.6) {
          p.alpha = 0.6;
          p.pulseDir = -1;
        } else if (p.alpha < 0.1) {
          p.alpha = 0.1;
          p.pulseDir = 1;
        }

        // Draw particle (glowing pink bokeh)
        ctx.beginPath();
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 2.5);
        gradient.addColorStop(0, `rgba(211, 82, 113, ${p.alpha})`);
        gradient.addColorStop(0.4, `rgba(229, 176, 185, ${p.alpha * 0.4})`);
        gradient.addColorStop(1, 'rgba(211, 82, 113, 0)');
        
        ctx.fillStyle = gradient;
        ctx.arc(p.x, p.y, p.size * 2.5, 0, Math.PI * 2);
        ctx.fill();

        // Recycle if goes offscreen (at the top) or exits horizontally
        if (p.y < -20 || p.x < -20 || p.x > canvas.width + 20) {
          particles[index] = createParticle(false);
        }
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 w-full h-full pointer-events-none -z-5"
    />
  );
};

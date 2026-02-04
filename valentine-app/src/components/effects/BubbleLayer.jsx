import { useEffect, useRef } from "react";

export default function BubbleLayer() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const bubbles = [];
    const BUBBLE_COUNT = 30;

    class Bubble {
      constructor() {
        this.radius = Math.random() * 20 + 15; // random size
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 1.2;
        this.vy = (Math.random() - 0.5) * 1.2;
        this.color = `hsla(${Math.random() * 360}, 70%, 80%, 0.4)`; // subtle rainbow hue

        this.maxSpeed = Math.sqrt(this.vx ** 2 + this.vy ** 2) * 2; // 2x limit
      }

      draw() {
        const gradient = ctx.createRadialGradient(
          this.x,
          this.y,
          this.radius * 0.1,
          this.x,
          this.y,
          this.radius
        );
        gradient.addColorStop(0, "rgba(255,255,255,0.9)");
        gradient.addColorStop(0.6, this.color);
        gradient.addColorStop(1, "rgba(255,255,255,0)");

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        // soft glow stroke
        ctx.strokeStyle = "rgba(255,255,255,0.25)";
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      move() {
        this.x += this.vx;
        this.y += this.vy;

        // bounce off walls
        if (this.x < this.radius || this.x > canvas.width - this.radius)
          this.vx *= -1;
        if (this.y < this.radius || this.y > canvas.height - this.radius)
          this.vy *= -1;
      }
    }

    // create bubbles
    for (let i = 0; i < BUBBLE_COUNT; i++) {
      bubbles.push(new Bubble());
    }

    // collision detection
    function detectCollisions() {
      for (let i = 0; i < bubbles.length; i++) {
        for (let j = i + 1; j < bubbles.length; j++) {
          const b1 = bubbles[i];
          const b2 = bubbles[j];

          const dx = b1.x - b2.x;
          const dy = b1.y - b2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < b1.radius + b2.radius) {
            // elastic collision with slight speed boost
            const angle = Math.atan2(dy, dx);
            const speed1 = Math.sqrt(b1.vx ** 2 + b1.vy ** 2);
            const speed2 = Math.sqrt(b2.vx ** 2 + b2.vy ** 2);

            const vx1 = speed2 * Math.cos(angle) * 1.05;
            const vy1 = speed2 * Math.sin(angle) * 1.05;
            const vx2 = speed1 * Math.cos(angle + Math.PI) * 1.05;
            const vy2 = speed1 * Math.sin(angle + Math.PI) * 1.05;

            b1.vx = vx1;
            b1.vy = vy1;
            b2.vx = vx2;
            b2.vy = vy2;

            // ⚡ NO SHRINK! radius remains the same
          }
        }
      }
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      bubbles.forEach((b) => {
        b.move();
        b.draw();
      });

      detectCollisions();
      requestAnimationFrame(animate);
    }

    animate();

    window.addEventListener("resize", () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    });
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: 1,
        pointerEvents: "none",
      }}
    />
  );
}

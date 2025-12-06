import { useEffect, useRef } from "react";

interface LiveECGSignalProps {
  className?: string;
  color?: string;
  speed?: number;
}

export const LiveECGSignal = ({ 
  className = "", 
  color = "hsl(197, 100%, 45%)",
  speed = 2
}: LiveECGSignalProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * 2;
      canvas.height = rect.height * 2;
      ctx.scale(2, 2);
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // ECG pattern data (one heartbeat cycle)
    const ecgPattern = [
      0, 0, 0, 0, 0, 0, 0, 0, // flat
      0, 0.1, 0.2, 0.1, 0, -0.1, 0, // P wave
      0, 0, 0, // flat
      0, 0.1, -0.3, // Q
      1.2, // R peak
      -0.4, 0.1, // S
      0, 0, 0, 0, // flat
      0.15, 0.25, 0.3, 0.3, 0.25, 0.15, // T wave
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, // flat
    ];

    let offset = 0;
    const patternWidth = ecgPattern.length;
    
    const draw = () => {
      const width = canvas.width / 2;
      const height = canvas.height / 2;
      const centerY = height / 2;
      const amplitude = height * 0.35;

      // Clear canvas with fade effect
      ctx.fillStyle = "rgba(29, 35, 46, 0.15)";
      ctx.fillRect(0, 0, width, height);

      // Draw grid lines (subtle)
      ctx.strokeStyle = "rgba(255, 255, 255, 0.03)";
      ctx.lineWidth = 0.5;
      for (let y = 0; y < height; y += 20) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }
      for (let x = 0; x < width; x += 20) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      // Draw ECG line
      ctx.beginPath();
      ctx.strokeStyle = color;
      ctx.lineWidth = 2;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      // Add glow effect
      ctx.shadowColor = color;
      ctx.shadowBlur = 8;

      for (let x = 0; x < width; x++) {
        const patternIndex = Math.floor((x + offset) % patternWidth);
        const value = ecgPattern[patternIndex] || 0;
        const y = centerY - value * amplitude;
        
        if (x === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.stroke();

      // Draw leading dot
      const leadX = width - 10;
      const leadPatternIndex = Math.floor((leadX + offset) % patternWidth);
      const leadValue = ecgPattern[leadPatternIndex] || 0;
      const leadY = centerY - leadValue * amplitude;

      ctx.beginPath();
      ctx.arc(leadX, leadY, 4, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.shadowBlur = 15;
      ctx.fill();

      // Reset shadow
      ctx.shadowBlur = 0;

      offset += speed;
      animationRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [color, speed]);

  return (
    <canvas
      ref={canvasRef}
      className={`w-full ${className}`}
      style={{ background: "transparent" }}
    />
  );
};

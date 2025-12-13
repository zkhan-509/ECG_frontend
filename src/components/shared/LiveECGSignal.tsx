
import { useEffect, useRef } from "react";

interface LiveECGSignalProps {
  className?: string;
  color?: string;
  speed?: number;
  lineWidth?: number;
}

export const LiveECGSignal = ({ 
  className = "", 
  color = "hsl(197, 100%, 45%)",
  speed = 0.5,
  lineWidth = 2.5
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

    // Realistic ECG pattern data (one complete PQRST cycle)
    const ecgPattern = [
      // Baseline (isoelectric line)
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      // P wave (atrial depolarization) - smooth dome shape
      0.02, 0.05, 0.08, 0.12, 0.15, 0.18, 0.20, 0.21, 0.21, 0.20,
      0.18, 0.15, 0.12, 0.08, 0.05, 0.02,
      // PR segment (flat)
      0, 0, 0, 0, 0, 0, 0, 0,
      // Q wave (small negative deflection)
      -0.02, -0.05, -0.08, -0.10,
      // R wave (sharp positive spike)
      -0.05, 0.10, 0.35, 0.65, 0.90, 1.0, 0.90, 0.65, 0.35, 0.10,
      // S wave (negative deflection after R)
      -0.15, -0.25, -0.20, -0.12, -0.05,
      // ST segment (return to baseline)
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      // T wave (ventricular repolarization) - rounded dome
      0.02, 0.05, 0.10, 0.15, 0.20, 0.24, 0.27, 0.29, 0.30, 0.30,
      0.29, 0.27, 0.24, 0.20, 0.15, 0.10, 0.05, 0.02,
      // Baseline before next beat
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
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

      // Draw ECG line with smooth interpolation
      ctx.beginPath();
      ctx.strokeStyle = color;
      ctx.lineWidth = lineWidth;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      // Add subtle glow effect
      ctx.shadowColor = color;
      ctx.shadowBlur = 12;

      // Smooth interpolation between points
      const getInterpolatedValue = (pos: number) => {
        const index = Math.floor(pos) % patternWidth;
        const nextIndex = (index + 1) % patternWidth;
        const fraction = pos - Math.floor(pos);
        const current = ecgPattern[index] || 0;
        const next = ecgPattern[nextIndex] || 0;
        // Smooth cubic interpolation
        const t = fraction * fraction * (3 - 2 * fraction);
        return current + (next - current) * t;
      };

      for (let x = 0; x < width; x++) {
        const pos = (x * 0.5 + offset) % patternWidth;
        const value = getInterpolatedValue(pos);
        const y = centerY - value * amplitude;
        
        if (x === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.stroke();

      // Draw leading dot with pulse effect
      const leadX = width - 5;
      const leadPos = (leadX * 0.5 + offset) % patternWidth;
      const leadValue = getInterpolatedValue(leadPos);
      const leadY = centerY - leadValue * amplitude;

      // Outer glow
      ctx.beginPath();
      ctx.arc(leadX, leadY, 8, 0, Math.PI * 2);
      ctx.fillStyle = color.replace(")", ", 0.3)").replace("hsl", "hsla");
      ctx.shadowBlur = 20;
      ctx.fill();

      // Inner dot
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

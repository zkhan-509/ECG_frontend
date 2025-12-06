import { useEffect, useRef } from "react";

interface ECGWaveformProps {
  className?: string;
  animated?: boolean;
  color?: string;
}

export const ECGWaveform = ({ 
  className = "", 
  animated = true,
  color = "hsl(197, 100%, 45%)"
}: ECGWaveformProps) => {
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    if (animated && pathRef.current) {
      const length = pathRef.current.getTotalLength();
      pathRef.current.style.strokeDasharray = `${length}`;
      pathRef.current.style.strokeDashoffset = `${length}`;
      pathRef.current.style.animation = "ecg-draw 3s ease-in-out forwards";
    }
  }, [animated]);

  // ECG-like waveform path
  const ecgPath = `
    M 0 50 
    L 30 50 
    L 35 50 
    L 40 45 
    L 45 55 
    L 50 50 
    L 60 50 
    L 65 50 
    L 70 20 
    L 75 80 
    L 80 35 
    L 85 50 
    L 100 50
    L 130 50 
    L 135 50 
    L 140 45 
    L 145 55 
    L 150 50 
    L 160 50 
    L 165 50 
    L 170 20 
    L 175 80 
    L 180 35 
    L 185 50 
    L 200 50
    L 230 50 
    L 235 50 
    L 240 45 
    L 245 55 
    L 250 50 
    L 260 50 
    L 265 50 
    L 270 20 
    L 275 80 
    L 280 35 
    L 285 50 
    L 300 50
  `;

  return (
    <svg 
      viewBox="0 0 300 100" 
      className={`w-full h-auto ${className}`}
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id="ecgGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={color} stopOpacity="0.8" />
          <stop offset="50%" stopColor={color} stopOpacity="1" />
          <stop offset="100%" stopColor={color} stopOpacity="0.8" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <path
        ref={pathRef}
        d={ecgPath}
        fill="none"
        stroke="url(#ecgGradient)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        filter="url(#glow)"
        className="ecg-line"
      />
    </svg>
  );
};

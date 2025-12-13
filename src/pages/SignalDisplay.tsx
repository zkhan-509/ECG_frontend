
import { useLocation } from "react-router-dom";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { MedicalCard } from "@/components/shared/MedicalCard";
import { InfoItem } from "@/components/shared/InfoItem";
import { Button } from "@/components/ui/button";
import {
  Activity,
  Download,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Info,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { signalInfo } from "@/utils/data/signalDisplayData";

const SignalDisplay = () => {
  const location = useLocation();
  const userType = location.pathname.includes("doctor") ? "doctor" : "patient";
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [zoom, setZoom] = useState(1);

  // Generate realistic ECG data
  const generateECGData = () => {
    const data: number[] = [];
    const samplingRate = 360;
    const duration = 10;
    const totalSamples = samplingRate * duration;

    for (let i = 0; i < totalSamples; i++) {
      const t = i / samplingRate;
      const beatPhase = (t % 0.8) / 0.8;

      let voltage = 0;

      if (beatPhase >= 0.0 && beatPhase < 0.1) {
        voltage = 0.15 * Math.sin(Math.PI * beatPhase / 0.1);
      } else if (beatPhase >= 0.1 && beatPhase < 0.16) {
        voltage = 0;
      } else if (beatPhase >= 0.16 && beatPhase < 0.18) {
        voltage = -0.1 * Math.sin(Math.PI * (beatPhase - 0.16) / 0.02);
      } else if (beatPhase >= 0.18 && beatPhase < 0.22) {
        voltage = 1.0 * Math.sin(Math.PI * (beatPhase - 0.18) / 0.04);
      } else if (beatPhase >= 0.22 && beatPhase < 0.26) {
        voltage = -0.2 * Math.sin(Math.PI * (beatPhase - 0.22) / 0.04);
      } else if (beatPhase >= 0.26 && beatPhase < 0.35) {
        voltage = 0;
      } else if (beatPhase >= 0.35 && beatPhase < 0.55) {
        voltage = 0.3 * Math.sin(Math.PI * (beatPhase - 0.35) / 0.2);
      } else {
        voltage = 0;
      }

      voltage += (Math.random() - 0.5) * 0.02;
      data.push(voltage);
    }
    return data;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const data = generateECGData();
    
    canvas.width = canvas.offsetWidth * 2;
    canvas.height = canvas.offsetHeight * 2;
    ctx.scale(2, 2);

    const width = canvas.offsetWidth;
    const height = canvas.offsetHeight;

    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, width, height);

    ctx.strokeStyle = "rgba(0, 168, 232, 0.1)";
    ctx.lineWidth = 0.5;

    for (let x = 0; x < width; x += 10) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    for (let y = 0; y < height; y += 10) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    ctx.strokeStyle = "rgba(0, 168, 232, 0.25)";
    ctx.lineWidth = 1;
    for (let x = 0; x < width; x += 50) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    for (let y = 0; y < height; y += 50) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    ctx.beginPath();
    ctx.strokeStyle = "#00a8e8";
    ctx.lineWidth = 2;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    const samplesPerPixel = data.length / (width * zoom);
    const centerY = height / 2;
    const amplitude = height / 3;

    for (let x = 0; x < width * zoom; x++) {
      const sampleIndex = Math.floor(x * samplesPerPixel);
      const voltage = data[sampleIndex] || 0;
      const y = centerY - voltage * amplitude;

      if (x === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }
    ctx.stroke();

    ctx.shadowColor = "#00a8e8";
    ctx.shadowBlur = 10;
    ctx.stroke();
  }, [zoom]);

  return (
    <DashboardLayout userType={userType}>
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-foreground mb-2">
          ECG Signal Visualization
        </h1>
        <p className="text-muted">
          View and analyze the raw ECG waveform data
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main Signal Display */}
        <MedicalCard className="lg:col-span-3">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-primary/10">
                <Activity className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h2 className="font-display text-xl font-semibold text-card-foreground">
                  Raw ECG Waveform
                </h2>
                <p className="text-sm text-muted-foreground">
                  Patient ID: PAT-12345 | Recording: 10 seconds
                </p>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setZoom(Math.max(0.5, zoom - 0.25))}
              >
                <ZoomOut className="w-4 h-4" />
              </Button>
              <span className="text-sm text-muted-foreground min-w-[4rem] text-center">
                {Math.round(zoom * 100)}%
              </span>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setZoom(Math.min(3, zoom + 0.25))}
              >
                <ZoomIn className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Maximize2 className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* ECG Canvas */}
          <div className="relative bg-white rounded-xl overflow-hidden" style={{ height: "400px" }}>
            <canvas
              ref={canvasRef}
              className="w-full h-full"
              style={{ width: "100%", height: "100%" }}
            />
            
            {/* Axis Labels */}
            <div className="absolute left-2 top-1/2 -translate-y-1/2 -rotate-90 text-xs text-muted-foreground">
              Voltage (mV)
            </div>
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-xs text-muted-foreground">
              Time (seconds)
            </div>
          </div>

          {/* Download Button */}
          <div className="mt-6 flex justify-end">
            <Button variant="medical">
              <Download className="w-4 h-4 mr-2" />
              Download ECG Data
            </Button>
          </div>
        </MedicalCard>

        {/* Signal Info */}
        <div className="space-y-6">
          <MedicalCard>
            <h2 className="font-display text-lg font-semibold text-card-foreground mb-4">
              Signal Information
            </h2>
            <div className="space-y-4">
              {signalInfo.map((item, index) => (
                <InfoItem key={index} label={item.label} value={item.value} />
              ))}
            </div>
          </MedicalCard>

          <MedicalCard>
            <div className="flex items-center gap-2 mb-4">
              <Info className="w-5 h-5 text-primary" />
              <h2 className="font-display text-lg font-semibold text-card-foreground">
                About ECG
              </h2>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              This ECG visualization shows the electrical activity of your heart over time.
              The characteristic waves (P, QRS, T) represent different phases of the cardiac cycle.
            </p>
          </MedicalCard>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SignalDisplay;

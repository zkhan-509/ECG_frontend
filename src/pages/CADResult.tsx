import { useLocation } from "react-router-dom";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { MedicalCard } from "@/components/shared/MedicalCard";
import { ECGWaveform } from "@/components/shared/ECGWaveform";
import { Button } from "@/components/ui/button";
import {
  Heart,
  Download,
  AlertTriangle,
  CheckCircle,
  Activity,
  TrendingUp,
  FileText,
} from "lucide-react";

interface ResultProps {
  isCADDetected?: boolean;
}

const CADResult = ({ isCADDetected = false }: ResultProps) => {
  const location = useLocation();
  const userType = location.pathname.includes("doctor") ? "doctor" : "patient";

  const confidence = isCADDetected ? 87.3 : 97.8;

  return (
    <DashboardLayout userType={userType}>
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-foreground mb-2">
          CAD Detection Result
        </h1>
        <p className="text-muted">
          Coronary Artery Disease classification based on ECG analysis
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Result Card */}
        <MedicalCard className="lg:col-span-2">
          {/* Alert Banner for CAD */}
          {isCADDetected && (
            <div className="mb-6 p-4 rounded-xl bg-destructive/10 border border-destructive/30 flex items-center gap-3">
              <AlertTriangle className="w-6 h-6 text-destructive" />
              <div>
                <p className="font-semibold text-destructive">Attention Required</p>
                <p className="text-sm text-muted-foreground">
                  CAD indicators detected. Please consult with a cardiologist.
                </p>
              </div>
            </div>
          )}

          {/* Result Display */}
          <div className="text-center py-8">
            <div className={`inline-flex items-center justify-center w-32 h-32 rounded-full mb-6 ${
              isCADDetected 
                ? "bg-destructive/10 border-4 border-destructive/30" 
                : "bg-accent/10 border-4 border-accent/30"
            }`}>
              {isCADDetected ? (
                <AlertTriangle className="w-16 h-16 text-destructive" />
              ) : (
                <CheckCircle className="w-16 h-16 text-accent" />
              )}
            </div>

            <h2 className={`font-display text-4xl font-bold mb-2 ${
              isCADDetected ? "text-destructive" : "text-accent"
            }`}>
              {isCADDetected ? "CAD Detected" : "Normal"}
            </h2>
            <p className="text-muted-foreground mb-6">
              {isCADDetected 
                ? "Coronary Artery Disease indicators found in ECG signal"
                : "No significant CAD indicators detected in ECG signal"
              }
            </p>

            {/* Confidence Meter */}
            <div className="max-w-md mx-auto mb-8">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-muted-foreground">Confidence Level</span>
                <span className={`font-bold ${isCADDetected ? "text-destructive" : "text-accent"}`}>
                  {confidence}%
                </span>
              </div>
              <div className="h-4 bg-muted/30 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-1000 ${
                    isCADDetected 
                      ? "bg-gradient-to-r from-destructive to-orange-500" 
                      : "bg-gradient-to-r from-accent to-primary"
                  }`}
                  style={{ width: `${confidence}%` }}
                />
              </div>
            </div>
          </div>

          {/* ECG Thumbnail */}
          <div className="p-6 bg-gradient-to-br from-primary/5 to-accent/5 rounded-xl mb-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-primary" />
                <span className="font-medium text-card-foreground">Analyzed ECG Signal</span>
              </div>
              <span className="text-sm text-muted-foreground">PAT-12345</span>
            </div>
            <ECGWaveform className="h-20" />
          </div>

          {/* Download Button */}
          <Button variant="medical" size="lg" className="w-full">
            <Download className="w-5 h-5 mr-2" />
            Download Result as PDF
          </Button>
        </MedicalCard>

        {/* Side Panel */}
        <div className="space-y-6">
          {/* Analysis Details */}
          <MedicalCard>
            <h2 className="font-display text-lg font-semibold text-card-foreground mb-4">
              Analysis Details
            </h2>
            <div className="space-y-4">
              {[
                { label: "Model Version", value: "v2.4.1" },
                { label: "Analysis Time", value: "2.3 seconds" },
                { label: "ECG Duration", value: "10 seconds" },
                { label: "Features Analyzed", value: "48" },
              ].map((item, index) => (
                <div key={index} className="flex justify-between items-center py-2 border-b border-muted/20 last:border-0">
                  <span className="text-sm text-muted-foreground">{item.label}</span>
                  <span className="text-sm font-medium text-card-foreground">{item.value}</span>
                </div>
              ))}
            </div>
          </MedicalCard>

          {/* Risk Factors */}
          <MedicalCard>
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-5 h-5 text-primary" />
              <h2 className="font-display text-lg font-semibold text-card-foreground">
                Key Indicators
              </h2>
            </div>
            <div className="space-y-3">
              {[
                { name: "ST Depression", value: isCADDetected ? "Detected" : "Normal", alert: isCADDetected },
                { name: "T Wave Inversion", value: isCADDetected ? "Present" : "Absent", alert: isCADDetected },
                { name: "QRS Duration", value: "Normal", alert: false },
                { name: "Heart Rate", value: "75 BPM", alert: false },
              ].map((item, index) => (
                <div key={index} className="flex justify-between items-center p-2 rounded-lg bg-muted/10">
                  <span className="text-sm text-muted-foreground">{item.name}</span>
                  <span className={`text-sm font-medium ${
                    item.alert ? "text-destructive" : "text-accent"
                  }`}>
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </MedicalCard>

          {/* Recommendations */}
          <MedicalCard>
            <div className="flex items-center gap-2 mb-4">
              <FileText className="w-5 h-5 text-primary" />
              <h2 className="font-display text-lg font-semibold text-card-foreground">
                Recommendations
              </h2>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {isCADDetected 
                ? "Based on the analysis, we recommend scheduling a consultation with a cardiologist for further evaluation and potential diagnostic tests."
                : "Your ECG shows normal patterns. Continue maintaining a healthy lifestyle with regular exercise and balanced diet."
              }
            </p>
          </MedicalCard>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CADResult;

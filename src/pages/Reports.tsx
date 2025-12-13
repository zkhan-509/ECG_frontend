import { useLocation } from "react-router-dom";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { MedicalCard } from "@/components/shared/MedicalCard";
import { ECGWaveform } from "@/components/shared/ECGWaveform";

import { Button } from "@/components/ui/button";
import {
  FileText,
  Download,
  User,
  Activity,
  Heart,
  CheckCircle,
  Printer,
} from "lucide-react";
import { defaultPatientInfo, detailedAnalysis, patientInfoFields, recommendations } from "@/utils/data/reportData";
import { QuickStatCard } from "@/components/shared/QuickStarCard";


const ecgStats = [
  { value: "75", label: "Heart Rate (BPM)" },
  { value: "Normal", label: "Sinus Rhythm" },
  { value: "10 sec", label: "Recording Duration" },
];

const Reports = () => {
  const location = useLocation();
  const userType = location.pathname.includes("doctor") ? "doctor" : "patient";

  const getPatientFieldValue = (field: typeof patientInfoFields[0]) => {
    if ('value' in field) return field.value;
    const value = defaultPatientInfo[field.key];
    const suffix = 'suffix' in field ? field.suffix : '';
    return `${value}${suffix}`;
  };

  return (
    <DashboardLayout userType={userType}>
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold text-foreground mb-2">
            Medical Report
          </h1>
          <p className="text-muted">
            Comprehensive ECG analysis and CAD detection report
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Printer className="w-4 h-4 mr-2" />
            Print
          </Button>
          <Button variant="medical">
            <Download className="w-4 h-4 mr-2" />
            Download PDF
          </Button>
        </div>
      </div>

      {/* Report Content */}
      <MedicalCard className="max-w-4xl mx-auto">
        {/* Report Header */}
        <div className="border-b border-muted/30 pb-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="font-display text-2xl font-bold text-card-foreground">
                  CAD Detection Report
                </h2>
                <p className="text-muted-foreground">
                  Coronary Artery Disease Screening
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Report ID</p>
              <p className="font-mono font-medium text-card-foreground">
                RPT-2024-{defaultPatientInfo.id}
              </p>
            </div>
          </div>
        </div>

        {/* Patient Information */}
        <div className="mb-8">
          <h3 className="font-display text-lg font-semibold text-card-foreground mb-4 flex items-center gap-2">
            <User className="w-5 h-5 text-primary" />
            Patient Information
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {patientInfoFields.map((field, index) => (
              <div key={index} className="p-3 rounded-xl bg-muted/10">
                <p className="text-xs text-muted-foreground mb-1">{field.label}</p>
                <p className="font-medium text-card-foreground">{getPatientFieldValue(field)}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ECG Summary */}
        <div className="mb-8">
          <h3 className="font-display text-lg font-semibold text-card-foreground mb-4 flex items-center gap-2">
            <Activity className="w-5 h-5 text-primary" />
            ECG Summary
          </h3>
          <div className="p-6 bg-gradient-to-br from-primary/5 to-accent/5 rounded-xl mb-4">
            <ECGWaveform className="h-24" />
          </div>
          <div className="grid grid-cols-3 gap-4">
            {ecgStats.map((stat, index) => (
              <QuickStatCard key={index} value={stat.value} label={stat.label} />
            ))}
          </div>
        </div>

        {/* Classification Result */}
        <div className="mb-8">
          <h3 className="font-display text-lg font-semibold text-card-foreground mb-4 flex items-center gap-2">
            <FileText className="w-5 h-5 text-primary" />
            CAD Classification Result
          </h3>
          <div className="p-6 rounded-xl bg-accent/10 border border-accent/30">
            <div className="flex items-center gap-4 mb-4">
              <CheckCircle className="w-12 h-12 text-accent" />
              <div>
                <p className="text-2xl font-bold text-accent">Normal</p>
                <p className="text-muted-foreground">No CAD indicators detected</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Confidence:</span>
              <div className="flex-1 h-3 bg-muted/30 rounded-full overflow-hidden">
                <div className="h-full w-[97.8%] bg-gradient-to-r from-accent to-primary rounded-full" />
              </div>
              <span className="text-sm font-bold text-accent">97.8%</span>
            </div>
          </div>
        </div>

        {/* Detailed Analysis */}
        <div className="mb-8">
          <h3 className="font-display text-lg font-semibold text-card-foreground mb-4">
            Detailed Analysis
          </h3>
          <div className="space-y-3">
            {detailedAnalysis.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-xl bg-muted/10">
                <div>
                  <p className="font-medium text-card-foreground">{item.parameter}</p>
                  <p className="text-sm text-muted-foreground">{item.finding}</p>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-accent/10 text-accent">
                  Normal
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recommendations */}
        <div className="mb-8">
          <h3 className="font-display text-lg font-semibold text-card-foreground mb-4">
            Recommendations
          </h3>
          <div className="p-4 rounded-xl bg-muted/10">
            <ul className="space-y-2 text-sm text-muted-foreground">
              {recommendations.map((item, index) => (
                <li key={index}>• {item}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Signature */}
        <div className="border-t border-muted/30 pt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Analyzed by</p>
              <p className="font-medium text-card-foreground">AI-Powered CAD Detection System v2.4.1</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Verified by</p>
              <p className="font-medium text-card-foreground">{defaultPatientInfo.doctor}</p>
            </div>
          </div>
        </div>
      </MedicalCard>
    </DashboardLayout>
  );
};

export default Reports;
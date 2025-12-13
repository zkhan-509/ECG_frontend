import { AnalysisDetail } from "../types";


export const analysisDetails: AnalysisDetail[] = [
  { label: "Model Version", value: "v2.4.1" },
  { label: "Analysis Time", value: "2.3 seconds" },
  { label: "ECG Duration", value: "10 seconds" },
  { label: "Features Analyzed", value: "48" },
];

export const getKeyIndicators = (isCADDetected: boolean) => [
  { name: "ST Depression", value: isCADDetected ? "Detected" : "Normal", alert: isCADDetected },
  { name: "T Wave Inversion", value: isCADDetected ? "Present" : "Absent", alert: isCADDetected },
  { name: "QRS Duration", value: "Normal", alert: false },
  { name: "Heart Rate", value: "75 BPM", alert: false },
];

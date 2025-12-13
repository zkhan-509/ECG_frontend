import { ECGParameter, PatientInfo } from "../types";


export const defaultPatientInfo: PatientInfo = {
  name: "John Doe",
  id: "PAT-12345",
  age: 45,
  gender: "Male",
  bloodType: "O+",
  date: "December 3, 2024",
  doctor: "Dr. Sarah Smith",
};

export const patientInfoFields = [
  { label: "Patient Name", key: "name" as const },
  { label: "Patient ID", key: "id" as const },
  { label: "Age", key: "age" as const, suffix: " years" },
  { label: "Gender", key: "gender" as const },
  { label: "Blood Type", key: "bloodType" as const },
  { label: "Examination Date", key: "date" as const },
  { label: "Attending Doctor", key: "doctor" as const },
  { label: "Department", value: "Cardiology" },
];

export const detailedAnalysis: ECGParameter[] = [
  { parameter: "P Wave", finding: "Normal morphology and duration", status: "normal" },
  { parameter: "PR Interval", finding: "120-200ms (Normal range)", status: "normal" },
  { parameter: "QRS Complex", finding: "Normal duration and axis", status: "normal" },
  { parameter: "ST Segment", finding: "No significant elevation or depression", status: "normal" },
  { parameter: "T Wave", finding: "Upright in leads I, II, V5-V6", status: "normal" },
  { parameter: "QT Interval", finding: "Within normal limits", status: "normal" },
];

export const recommendations: string[] = [
  "Continue regular cardiovascular health monitoring",
  "Maintain a balanced diet low in saturated fats",
  "Engage in regular physical activity (30 min/day)",
  "Schedule follow-up ECG in 12 months",
  "Consult physician if experiencing chest pain or shortness of breath",
];

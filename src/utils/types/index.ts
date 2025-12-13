
// User types
export type UserRole = "doctor" | "patient" | null;

// CAD Result types
export type ResultProps = {
  isCADDetected?: boolean;
};

// History types
export type HistoryRecord = {
  id: string;
  date: string;
  patient: string;
  patientId: string;
  result: string;
  confidence: number;
};

// Patient types
export type RecentPatient = {
  id: string;
  name: string;
  date: string;
  status: string;
  risk: "high" | "low";
};

// Patient Info types
export type PatientInfo = {
  name: string;
  id: string;
  age: number;
  gender: string;
  bloodType: string;
  date: string;
  doctor: string;
};

// Feature types
export type Feature = {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  color: "primary" | "accent";
};

// Analysis Detail types
export type AnalysisDetail = {
  label: string;
  value: string;
};

// Key Indicator types
export type KeyIndicator = {
  name: string;
  value: string;
  alert: boolean;
};

// ECG Parameter types
export type ECGParameter = {
  parameter: string;
  finding: string;
  status: string;
};

// Signal Info types
export type SignalInfo = {
  label: string;
  value: string;
};

// Form Field types
export type FormField = {
  label: string;
  type: string;
  placeholder: string;
  icon: React.ComponentType<{ className?: string }>;
  value: string;
  onChange: (value: string) => void;
};

// Quick Stat types
export type QuickStat = {
  label: string;
  value: string;
  isAccent?: boolean;
};

// File Requirement types
export type FileRequirement = string;

// Alert types
export type Alert = {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  variant: "destructive" | "warning";
};

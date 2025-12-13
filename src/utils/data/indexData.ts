
import { Zap, Shield, Activity } from "lucide-react";
import { Feature } from "../types";

export const features: Feature[] = [
  {
    icon: Zap,
    title: "Fast Analysis",
    description: "Get CAD detection results in seconds with our optimized ML model",
    color: "primary",
  },
  {
    icon: Shield,
    title: "97.8% Accuracy",
    description: "Highly accurate detection powered by deep learning algorithms",
    color: "accent",
  },
  {
    icon: Activity,
    title: "Real-time Monitoring",
    description: "Upload and analyze ECG signals instantly with visual feedback",
    color: "primary",
  },
];

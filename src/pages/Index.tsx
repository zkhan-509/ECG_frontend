
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MedicalCard } from "@/components/shared/MedicalCard";
import { ECGWaveform } from "@/components/shared/ECGWaveform";
import { LiveECGSignal } from "@/components/shared/LiveECGSignal";
import { Heart, Stethoscope, User, Activity } from "lucide-react";
import { features } from "@/utils/data/indexData";

const navLinks = [
  { to: "/doctor/login", label: "Doctor Login", variant: "ghost" as const },
  { to: "/patient/login", label: "Patient Login", variant: "outline" as const },
];

const portalButtons = [
  { to: "/doctor/login", label: "Doctor Portal", icon: Stethoscope, variant: "medical" as const },
  { to: "/patient/login", label: "Patient Portal", icon: User, variant: "success" as const },
];

const Index = () => {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
      </div>

      {/* ECG Background */}
      <div className="absolute inset-0 opacity-5">
        {[1/4, 1/2, 3/4].map((position, index) => (
          <div key={index} className="absolute left-0 right-0" style={{ top: `${position * 100}%` }}>
            <ECGWaveform className="h-20" />
          </div>
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4 py-12">
        {/* Header */}
        <nav className="flex items-center justify-between mb-16">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="font-display font-bold text-xl text-foreground">CAD Detect</h1>
              <p className="text-xs text-muted">ECG Analysis System</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            {navLinks.map((link) => (
              <Link key={link.to} to={link.to}>
                <Button variant={link.variant}>{link.label}</Button>
              </Link>
            ))}
          </div>
        </nav>

        {/* Hero Section */}
        <div className="text-center max-w-4xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            <Activity className="w-4 h-4" />
            AI-Powered Heart Health Analysis
          </div>
          
          <h1 className="font-display text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
            Coronary Artery Disease
            <span className="block bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Detection System</span>
          </h1>
          
          <p className="text-lg text-muted max-w-2xl mx-auto mb-10">
            Advanced ECG signal analysis powered by machine learning for early detection of coronary artery disease. 
            Accurate, fast, and reliable cardiovascular health monitoring.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {portalButtons.map((button) => (
              <Link key={button.to} to={button.to}>
                <Button variant={button.variant} size="xl" className="min-w-[200px]">
                  <button.icon className="w-5 h-5 mr-2" />
                  {button.label}
                </Button>
              </Link>
            ))}
          </div>
        </div>

        {/* ECG Animation Display */}
        <div className="max-w-4xl mx-auto mb-20">
          <MedicalCard className="p-8 bg-background/80 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-accent animate-pulse" />
                <span className="text-sm font-medium text-card-foreground">Live ECG Analysis Demo</span>
              </div>
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <span>HR: <span className="text-primary font-semibold">72 BPM</span></span>
                <span>Lead: <span className="text-accent font-semibold">II</span></span>
              </div>
            </div>
            <LiveECGSignal className="h-40" color="hsl(197, 100%, 50%)" speed={1.5} />
          </MedicalCard>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-20">
          {features.map((feature, index) => (
            <MedicalCard key={index} className="text-center">
              <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl mb-4 ${
                feature.color === "primary" ? "bg-primary/10" : "bg-accent/10"
              }`}>
                <feature.icon className={`w-7 h-7 ${
                  feature.color === "primary" ? "text-primary" : "text-accent"
                }`} />
              </div>
              <h3 className="font-display text-lg font-semibold text-card-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {feature.description}
              </p>
            </MedicalCard>
          ))}
        </div>

        {/* Footer */}
        <footer className="text-center py-8 border-t border-border/30">
          <p className="text-sm text-muted">
            © 2024 CAD Detection System | Final Year Project | All rights reserved
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Index;

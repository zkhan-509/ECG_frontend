import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MedicalCard } from "@/components/shared/MedicalCard";
import { ECGWaveform } from "@/components/shared/ECGWaveform";
import { FormInput } from "@/components/shared/FormInput";
import { Heart, Mail, Lock, User, ArrowRight } from "lucide-react";
import { toast } from "sonner";

const formFields = [
  { label: "Patient ID or Email", type: "text", placeholder: "PAT-12345 or email@example.com", icon: Mail, key: "identifier" as const },
  { label: "Password", type: "password", placeholder: "••••••••", icon: Lock, key: "password" as const },
];

const PatientLogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ identifier: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    setTimeout(() => {
      toast.success("Welcome back!");
      navigate("/patient/dashboard");
      setIsLoading(false);
    }, 1500);
  };

  const updateField = (key: keyof typeof formData) => (value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -right-20 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 -left-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
      </div>

      {/* ECG Lines Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/3 left-0 right-0">
          <ECGWaveform className="h-16" color="hsl(161, 95%, 43%)" />
        </div>
        <div className="absolute top-2/3 left-0 right-0">
          <ECGWaveform className="h-16" color="hsl(161, 95%, 43%)" />
        </div>
      </div>

      <div className="w-full max-w-md relative z-10 animate-fade-in">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-accent to-accent/60 shadow-glow-success mb-4">
            <Heart className="w-10 h-10 text-white" />
          </div>
          <h1 className="font-display text-3xl font-bold text-foreground mb-2">
            CAD Detection System
          </h1>
          <p className="text-muted text-sm">
            Your Heart Health Monitoring Portal
          </p>
        </div>

        {/* Login Card */}
        <MedicalCard className="p-8" hover={false}>
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-xl bg-accent/10">
              <User className="w-6 h-6 text-accent" />
            </div>
            <div>
              <h2 className="font-display text-xl font-semibold text-card-foreground">
                Patient Login
              </h2>
              <p className="text-sm text-muted-foreground">
                Access your health records
              </p>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            {formFields.map((field) => (
              <FormInput
                key={field.key}
                label={field.label}
                type={field.type}
                placeholder={field.placeholder}
                icon={field.icon}
                value={formData[field.key]}
                onChange={updateField(field.key)}
              />
            ))}

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-muted accent-accent"
                />
                <span className="text-muted-foreground">Remember me</span>
              </label>
              <Link to="/forgot-password" className="text-accent hover:underline">
                Forgot password?
              </Link>
            </div>

            <Button
              type="submit"
              variant="success"
              size="lg"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Signing in...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  Sign In
                  <ArrowRight className="w-5 h-5" />
                </span>
              )}
            </Button>
          </form>

          <div className="mt-6 pt-6 border-t border-muted/30 text-center space-y-2">
            <p className="text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-accent font-medium hover:underline"
              >
                Sign up
              </Link>
            </p>
            <p className="text-sm text-muted-foreground">
              Are you a doctor?{" "}
              <Link
                to="/doctor/login"
                className="text-primary font-medium hover:underline"
              >
                Login here
              </Link>
            </p>
          </div>
        </MedicalCard>

        {/* Footer */}
        <p className="text-center text-xs text-muted mt-6">
          © 2024 CAD Detection System. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default PatientLogin;
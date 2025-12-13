
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MedicalCard } from "@/components/shared/MedicalCard";
import { ECGWaveform } from "@/components/shared/ECGWaveform";
import { FormInput } from "@/components/shared/FormInput";
import { Heart, Mail, Lock, User, Stethoscope, ArrowRight, UserPlus } from "lucide-react";
import { toast } from "sonner";
import { validatePassword, validatePasswordMatch } from "@/utils/validation";
import type { UserRole } from "@/utils/types";

const roleOptions = [
  { role: "doctor" as const, icon: Stethoscope, title: "I'm a Doctor", description: "Medical professional account", color: "primary" },
  { role: "patient" as const, icon: User, title: "I'm a Patient", description: "Personal health account", color: "accent" },
];

const Signup = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState<UserRole>(null);
  const [formData, setFormData] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const [isLoading, setIsLoading] = useState(false);

  const isDoctor = role === "doctor";
  const accentColor = isDoctor ? "primary" : "accent";

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validatePasswordMatch(formData.password, formData.confirmPassword)) return;
    if (!validatePassword(formData.password)) return;

    setIsLoading(true);
    
    setTimeout(() => {
      toast.success("Account created successfully!");
      if (role === "doctor") {
        navigate("/doctor/login");
      } else {
        navigate("/patient/login");
      }
      setIsLoading(false);
    }, 1500);
  };

  const updateField = (key: keyof typeof formData) => (value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const getFormFields = () => [
    { label: "Full Name", type: "text", placeholder: isDoctor ? "Dr. John Smith" : "John Smith", icon: User, key: "name" as const },
    { label: "Email Address", type: "email", placeholder: isDoctor ? "doctor@hospital.com" : "patient@email.com", icon: Mail, key: "email" as const },
    { label: "Password", type: "password", placeholder: "••••••••", icon: Lock, key: "password" as const },
    { label: "Confirm Password", type: "password", placeholder: "••••••••", icon: Lock, key: "confirmPassword" as const },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className={`absolute top-1/4 -left-20 w-96 h-96 ${isDoctor ? "bg-primary/10" : "bg-accent/10"} rounded-full blur-3xl animate-pulse`} />
        <div className={`absolute bottom-1/4 -right-20 w-96 h-96 ${isDoctor ? "bg-accent/10" : "bg-primary/10"} rounded-full blur-3xl animate-pulse`} style={{ animationDelay: "1s" }} />
      </div>

      {/* ECG Lines Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/3 left-0 right-0">
          <ECGWaveform className="h-16" color={isDoctor ? "hsl(197, 100%, 45%)" : "hsl(161, 95%, 43%)"} />
        </div>
        <div className="absolute top-2/3 left-0 right-0">
          <ECGWaveform className="h-16" color={isDoctor ? "hsl(197, 100%, 45%)" : "hsl(161, 95%, 43%)"} />
        </div>
      </div>

      <div className="w-full max-w-md relative z-10 animate-fade-in">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br ${isDoctor ? "from-primary to-primary/60 shadow-glow" : "from-accent to-accent/60 shadow-glow-success"} mb-4`}>
            <Heart className="w-10 h-10 text-white" />
          </div>
          <h1 className="font-display text-3xl font-bold text-foreground mb-2">
            Create Account
          </h1>
          <p className="text-muted text-sm">
            Join CAD Detection System
          </p>
        </div>

        {/* Signup Card */}
        <MedicalCard className="p-8" hover={false}>
          {!role ? (
            // Role Selection
            <>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-xl bg-primary/10">
                  <UserPlus className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h2 className="font-display text-xl font-semibold text-card-foreground">
                    Choose Account Type
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Select your role to continue
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {roleOptions.map((option) => (
                  <button
                    key={option.role}
                    onClick={() => setRole(option.role)}
                    className={`w-full p-6 rounded-2xl border-2 border-muted/30 bg-card hover:border-${option.color} hover:bg-${option.color}/5 transition-all duration-300 group`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-xl bg-${option.color}/10 group-hover:bg-${option.color}/20 transition-colors`}>
                        <option.icon className={`w-8 h-8 text-${option.color}`} />
                      </div>
                      <div className="text-left">
                        <h3 className="font-display text-lg font-semibold text-card-foreground">
                          {option.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {option.description}
                        </p>
                      </div>
                      <ArrowRight className={`w-5 h-5 text-muted-foreground ml-auto group-hover:text-${option.color} transition-colors`} />
                    </div>
                  </button>
                ))}
              </div>
            </>
          ) : (
            // Signup Form
            <>
              <div className="flex items-center gap-3 mb-6">
                <button
                  onClick={() => setRole(null)}
                  className="p-2 rounded-xl bg-muted/10 hover:bg-muted/20 transition-colors"
                >
                  <ArrowRight className="w-5 h-5 text-muted-foreground rotate-180" />
                </button>
                <div className={`p-2 rounded-xl ${isDoctor ? "bg-primary/10" : "bg-accent/10"}`}>
                  {isDoctor ? (
                    <Stethoscope className="w-6 h-6 text-primary" />
                  ) : (
                    <User className="w-6 h-6 text-accent" />
                  )}
                </div>
                <div>
                  <h2 className="font-display text-xl font-semibold text-card-foreground">
                    {isDoctor ? "Doctor" : "Patient"} Registration
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Fill in your details
                  </p>
                </div>
              </div>

              <form onSubmit={handleSignup} className="space-y-4">
                {getFormFields().map((field) => (
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

                <Button
                  type="submit"
                  variant={isDoctor ? "medical" : "success"}
                  size="lg"
                  className="w-full"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Creating Account...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      Create Account
                      <ArrowRight className="w-5 h-5" />
                    </span>
                  )}
                </Button>
              </form>
            </>
          )}

          <div className="mt-6 pt-6 border-t border-muted/30 text-center">
            <p className="text-sm text-muted-foreground">
              Already have an account?{" "}
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

export default Signup;

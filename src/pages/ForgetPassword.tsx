import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MedicalCard } from "@/components/shared/MedicalCard";
import { ECGWaveform } from "@/components/shared/ECGWaveform";
import { FormInput } from "@/components/shared/FormInput";
import { Heart, Mail, ArrowLeft, Send, CheckCircle } from "lucide-react";
import { toast } from "sonner";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    setTimeout(() => {
      setIsSubmitted(true);
      toast.success("Password reset link sent!");
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
      </div>

      {/* ECG Lines Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/3 left-0 right-0">
          <ECGWaveform className="h-16" />
        </div>
        <div className="absolute top-2/3 left-0 right-0">
          <ECGWaveform className="h-16" />
        </div>
      </div>

      <div className="w-full max-w-md relative z-10 animate-fade-in">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-primary/60 shadow-glow mb-4">
            <Heart className="w-10 h-10 text-white" />
          </div>
          <h1 className="font-display text-3xl font-bold text-foreground mb-2">
            Reset Password
          </h1>
          <p className="text-muted text-sm">
            We'll send you a link to reset your password
          </p>
        </div>

        {/* Reset Card */}
        <MedicalCard className="p-8" hover={false}>
          {!isSubmitted ? (
            <>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-xl bg-primary/10">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h2 className="font-display text-xl font-semibold text-card-foreground">
                    Forgot Password
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Enter your registered email
                  </p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <FormInput
                  label="Email Address"
                  type="email"
                  placeholder="your@email.com"
                  icon={Mail}
                  value={email}
                  onChange={setEmail}
                />

                <Button
                  type="submit"
                  variant="medical"
                  size="lg"
                  className="w-full"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      Send Reset Link
                      <Send className="w-5 h-5" />
                    </span>
                  )}
                </Button>
              </form>
            </>
          ) : (
            <div className="text-center py-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/10 mb-4">
                <CheckCircle className="w-8 h-8 text-accent" />
              </div>
              <h3 className="font-display text-xl font-semibold text-card-foreground mb-2">
                Check Your Email
              </h3>
              <p className="text-muted-foreground text-sm mb-4">
                We've sent a password reset link to <strong>{email}</strong>
              </p>
              <p className="text-muted-foreground text-xs">
                Didn't receive the email? Check your spam folder or{" "}
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="text-primary hover:underline"
                >
                  try again
                </button>
              </p>
            </div>
          )}

          <div className="mt-6 pt-6 border-t border-muted/30 text-center">
            <Link
              to="/doctor/login"
              className="inline-flex items-center gap-2 text-sm text-primary font-medium hover:underline"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Login
            </Link>
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

export default ForgotPassword;
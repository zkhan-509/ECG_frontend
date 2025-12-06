import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { MedicalCard } from "@/components/shared/MedicalCard";
import { LiveECGSignal } from "@/components/shared/LiveECGSignal";
import {
  Heart,
  Activity,
  Calendar,
  FileText,
  ArrowRight,
  CheckCircle,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const PatientDashboard = () => {
  return (
    <DashboardLayout userType="patient">
      {/* Welcome Section */}
      <div className="mb-8">
        <MedicalCard className="bg-gradient-to-br from-card via-card to-accent/5 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent to-accent/60 flex items-center justify-center">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="font-display text-2xl font-bold text-card-foreground">
                  Welcome, John Doe
                </h1>
                <p className="text-muted-foreground">
                  Patient ID: PAT-12345
                </p>
              </div>
            </div>
            <p className="text-muted-foreground max-w-lg">
              Monitor your heart health and view your ECG analysis results. Your health is our priority.
            </p>
          </div>
        </MedicalCard>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Last ECG Upload */}
        <MedicalCard className="lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display text-xl font-semibold text-card-foreground">
              Your Latest ECG
            </h2>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="w-4 h-4" />
              Dec 3, 2024
            </div>
          </div>

          {/* ECG Visualization */}
          <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-xl p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                <span className="text-sm font-medium text-card-foreground">
                  ECG Signal Recording
                </span>
              </div>
              <span className="text-xs text-muted-foreground">
                Lead II • <span className="text-accent font-semibold">Live</span>
              </span>
            </div>
            <LiveECGSignal className="h-36" color="hsl(161, 95%, 43%)" speed={1.5} />
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-4 rounded-xl bg-muted/20">
              <p className="text-2xl font-bold text-card-foreground">72</p>
              <p className="text-xs text-muted-foreground">Heart Rate (BPM)</p>
            </div>
            <div className="text-center p-4 rounded-xl bg-muted/20">
              <p className="text-2xl font-bold text-card-foreground">Normal</p>
              <p className="text-xs text-muted-foreground">Rhythm</p>
            </div>
            <div className="text-center p-4 rounded-xl bg-muted/20">
              <p className="text-2xl font-bold text-accent">97.8%</p>
              <p className="text-xs text-muted-foreground">Confidence</p>
            </div>
          </div>
        </MedicalCard>

        {/* Side Panel */}
        <div className="space-y-6">
          {/* Latest Result */}
          <MedicalCard>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-xl bg-accent/10">
                <CheckCircle className="w-6 h-6 text-accent" />
              </div>
              <h2 className="font-display text-lg font-semibold text-card-foreground">
                Latest Result
              </h2>
            </div>
            
            <div className="p-4 rounded-xl bg-accent/10 border border-accent/20 mb-4">
              <p className="text-2xl font-bold text-accent text-center mb-1">
                Normal
              </p>
              <p className="text-sm text-center text-muted-foreground">
                No CAD indicators detected
              </p>
            </div>

            <Link to="/patient/result">
              <Button variant="outline" className="w-full">
                View Full Report
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </MedicalCard>

          {/* Quick Actions */}
          <MedicalCard>
            <h2 className="font-display text-lg font-semibold text-card-foreground mb-4">
              Quick Actions
            </h2>
            <div className="space-y-3">
              <Link to="/patient/upload">
                <Button variant="success" className="w-full justify-start">
                  <Activity className="w-5 h-5 mr-2" />
                  Upload New ECG
                </Button>
              </Link>
              <Link to="/patient/reports">
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="w-5 h-5 mr-2" />
                  My Reports
                </Button>
              </Link>
            </div>
          </MedicalCard>

          {/* Upcoming */}
          <MedicalCard>
            <h2 className="font-display text-lg font-semibold text-card-foreground mb-4">
              Reminders
            </h2>
            <div className="flex items-start gap-3 p-3 rounded-xl bg-primary/10 border border-primary/20">
              <Clock className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-card-foreground">
                  Next Check-up
                </p>
                <p className="text-xs text-muted-foreground">
                  Schedule recommended in 2 weeks
                </p>
              </div>
            </div>
          </MedicalCard>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default PatientDashboard;

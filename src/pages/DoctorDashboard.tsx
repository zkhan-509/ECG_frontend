
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { StatCard } from "@/components/shared/StatCard";
import { MedicalCard } from "@/components/shared/MedicalCard";
import { LiveECGSignal } from "@/components/shared/LiveECGSignal";
import {
  Activity,
  FileHeart,
  AlertTriangle,
  TrendingUp,
  Clock,
  User,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { recentPatients } from "@/utils/data/doctorDashboardData";

const statsConfig = [
  {
    title: "Total ECGs Analyzed",
    value: "1,284",
    subtitle: "This month",
    icon: Activity,
    trend: { value: 12, positive: true },
    variant: "primary" as const,
  },
  {
    title: "CAD Detected",
    value: "89",
    subtitle: "Requires attention",
    icon: FileHeart,
    trend: { value: 8, positive: false },
    variant: "warning" as const,
  },
  {
    title: "Detection Accuracy",
    value: "97.8%",
    subtitle: "ML Model performance",
    icon: TrendingUp,
    variant: "success" as const,
  },
  {
    title: "Pending Reviews",
    value: "12",
    subtitle: "Awaiting analysis",
    icon: AlertTriangle,
    variant: "default" as const,
  },
];

const quickActions = [
  { to: "/doctor/upload", label: "Upload New ECG", icon: Activity, variant: "medical" as const },
  { to: "/doctor/reports", label: "Generate Report", icon: FileHeart, variant: "outline" as const },
];

const tableHeaders = ["Patient", "Date", "Result", "Action"];

const DoctorDashboard = () => {
  return (
    <DashboardLayout userType="doctor">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-foreground mb-2">
          Welcome back, Dr. Smith
        </h1>
        <p className="text-muted">
          Here's your ECG analysis overview for today
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statsConfig.map((stat, index) => (
          <StatCard
            key={index}
            title={stat.title}
            value={stat.value}
            subtitle={stat.subtitle}
            icon={stat.icon}
            trend={stat.trend}
            variant={stat.variant}
          />
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent ECG Activity */}
        <MedicalCard className="lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display text-xl font-semibold text-card-foreground">
              Recent ECG Analysis
            </h2>
            <Link to="/doctor/history">
              <Button variant="ghost" size="sm">
                View All
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>

          {/* ECG Preview */}
          <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-xl p-4 mb-6">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span className="text-sm font-medium text-card-foreground">
                  Latest Signal - PAT-001
                </span>
              </div>
              <span className="text-xs text-muted-foreground">
                HR: <span className="text-primary font-semibold">78 BPM</span>
              </span>
            </div>
            <LiveECGSignal className="h-28" color="hsl(197, 100%, 50%)" speed={1.2} />
          </div>

          {/* Recent Patients Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-muted/30">
                  {tableHeaders.map((header, index) => (
                    <th
                      key={header}
                      className={`py-3 px-4 text-sm font-medium text-muted-foreground ${
                        index === tableHeaders.length - 1 ? "text-right" : "text-left"
                      }`}
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {recentPatients.map((patient) => (
                  <tr
                    key={patient.id}
                    className="border-b border-muted/20 hover:bg-muted/10 transition-colors"
                  >
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                          <User className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium text-card-foreground">
                            {patient.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {patient.id}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="w-4 h-4" />
                        {patient.date}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                          patient.risk === "high"
                            ? "bg-destructive/10 text-destructive"
                            : "bg-accent/10 text-accent"
                        }`}
                      >
                        {patient.status}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <Button variant="ghost" size="sm">
                        View
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </MedicalCard>

        {/* Quick Actions & Alerts */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <MedicalCard>
            <h2 className="font-display text-xl font-semibold text-card-foreground mb-4">
              Quick Actions
            </h2>
            <div className="space-y-3">
              {quickActions.map((action) => (
                <Link key={action.to} to={action.to}>
                  <Button variant={action.variant} className="w-full justify-start">
                    <action.icon className="w-5 h-5 mr-2" />
                    {action.label}
                  </Button>
                </Link>
              ))}
            </div>
          </MedicalCard>

          {/* Alerts */}
          <MedicalCard>
            <h2 className="font-display text-xl font-semibold text-card-foreground mb-4">
              Critical Alerts
            </h2>
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 rounded-xl bg-destructive/10 border border-destructive/20">
                <AlertTriangle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-card-foreground">
                    High Risk Patient
                  </p>
                  <p className="text-xs text-muted-foreground">
                    PAT-001 shows elevated CAD indicators
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 rounded-xl bg-yellow-500/10 border border-yellow-500/20">
                <Clock className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-card-foreground">
                    Pending Review
                  </p>
                  <p className="text-xs text-muted-foreground">
                    3 ECGs awaiting your analysis
                  </p>
                </div>
              </div>
            </div>
          </MedicalCard>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DoctorDashboard;

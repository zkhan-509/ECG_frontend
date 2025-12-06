import { cn } from "@/lib/utils";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  Home,
  Upload,
  Activity,
  FileHeart,
  FileText,
  History,
  LogOut,
  Heart,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";
import { ECGWaveform } from "../shared/ECGWaveform";

interface SidebarProps {
  userType: "doctor" | "patient";
}

const doctorMenuItems = [
  { icon: Home, label: "Dashboard", path: "/doctor/dashboard" },
  { icon: Upload, label: "Upload ECG", path: "/doctor/upload" },
  { icon: Activity, label: "Signal Display", path: "/doctor/signal" },
  { icon: FileHeart, label: "CAD Result", path: "/doctor/result" },
  { icon: FileText, label: "Reports", path: "/doctor/reports" },
  { icon: History, label: "History", path: "/doctor/history" },
];

const patientMenuItems = [
  { icon: Home, label: "Dashboard", path: "/patient/dashboard" },
  { icon: Upload, label: "Upload My ECG", path: "/patient/upload" },
  { icon: Activity, label: "My Signal", path: "/patient/signal" },
  { icon: FileHeart, label: "My Results", path: "/patient/result" },
  { icon: FileText, label: "My Reports", path: "/patient/reports" },
  { icon: History, label: "History", path: "/patient/history" },
];

export const Sidebar = ({ userType }: SidebarProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const menuItems = userType === "doctor" ? doctorMenuItems : patientMenuItems;

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-xl bg-sidebar text-sidebar-foreground"
        onClick={() => setIsMobileOpen(!isMobileOpen)}
      >
        {isMobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Overlay */}
      {isMobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed lg:static inset-y-0 left-0 z-40 flex flex-col bg-sidebar border-r border-sidebar-border transition-all duration-300",
          isCollapsed ? "w-20" : "w-64",
          isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        {/* Logo Section */}
        <div className="p-6 border-b border-sidebar-border">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <div className="absolute -bottom-1 -right-1 w-3 h-3 rounded-full bg-accent animate-pulse" />
            </div>
            {!isCollapsed && (
              <div className="animate-fade-in">
                <h1 className="font-display font-bold text-lg text-sidebar-foreground">
                  CAD Detect
                </h1>
                <p className="text-xs text-sidebar-foreground/60">ECG Analysis</p>
              </div>
            )}
          </div>
        </div>

        {/* ECG Animation */}
        {!isCollapsed && (
          <div className="px-4 py-3 border-b border-sidebar-border">
            <ECGWaveform className="h-8 opacity-60" />
          </div>
        )}

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {menuItems.map((item, index) => {
            const isActive = location.pathname === item.path;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setIsMobileOpen(false)}
                className={cn(
                  "sidebar-item",
                  isActive && "active",
                  "animate-slide-in"
                )}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <item.icon className="w-5 h-5 flex-shrink-0" />
                {!isCollapsed && <span>{item.label}</span>}
              </NavLink>
            );
          })}
        </nav>

        {/* User Info & Logout */}
        <div className="p-4 border-t border-sidebar-border">
          <div className={cn(
            "flex items-center gap-3 mb-4 p-3 rounded-xl bg-sidebar-accent/50",
            isCollapsed && "justify-center"
          )}>
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-semibold">
              {userType === "doctor" ? "Dr" : "P"}
            </div>
            {!isCollapsed && (
              <div className="animate-fade-in">
                <p className="text-sm font-medium text-sidebar-foreground">
                  {userType === "doctor" ? "Dr. Smith" : "John Doe"}
                </p>
                <p className="text-xs text-sidebar-foreground/60 capitalize">
                  {userType}
                </p>
              </div>
            )}
          </div>
          
          <button
            onClick={handleLogout}
            className={cn(
              "sidebar-item w-full text-destructive hover:bg-destructive/10",
              isCollapsed && "justify-center"
            )}
          >
            <LogOut className="w-5 h-5" />
            {!isCollapsed && <span>Logout</span>}
          </button>
        </div>

        {/* Collapse Button (Desktop Only) */}
        <button
          className="hidden lg:flex absolute -right-3 top-20 w-6 h-6 rounded-full bg-primary text-primary-foreground items-center justify-center shadow-lg hover:scale-110 transition-transform"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {isCollapsed ? "→" : "←"}
        </button>
      </aside>
    </>
  );
};

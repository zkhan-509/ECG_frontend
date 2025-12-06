import { ReactNode } from "react";
import { Sidebar } from "./Sidebar";

interface DashboardLayoutProps {
  children: ReactNode;
  userType: "doctor" | "patient";
}

export const DashboardLayout = ({ children, userType }: DashboardLayoutProps) => {
  return (
    <div className="min-h-screen flex w-full">
      <Sidebar userType={userType} />
      <main className="flex-1 p-4 lg:p-8 overflow-auto lg:ml-0 pt-16 lg:pt-8">
        <div className="max-w-7xl mx-auto animate-fade-in">
          {children}
        </div>
      </main>
    </div>
  );
};

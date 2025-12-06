import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface MedicalCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export const MedicalCard = ({ children, className, hover = true }: MedicalCardProps) => {
  return (
    <div
      className={cn(
        "bg-card text-card-foreground rounded-2xl p-6 shadow-medical transition-all duration-300",
        hover && "hover:shadow-medical-hover hover:-translate-y-1",
        className
      )}
    >
      {children}
    </div>
  );
};

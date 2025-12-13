
import { Input } from "@/components/ui/input";
import { LucideIcon } from "lucide-react";

type FormInputProps = {
  label: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  icon: LucideIcon;
  required?: boolean;
  className?: string;
};

export const FormInput = ({
  label,
  type,
  placeholder,
  value,
  onChange,
  icon: Icon,
  required = true,
  className = "",
}: FormInputProps) => {
  return (
    <div className={`space-y-2 ${className}`}>
      <label className="text-sm font-medium text-card-foreground">
        {label}
      </label>
      <div className="relative">
        <Icon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <Input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="pl-12 bg-card border-muted/50 text-card-foreground"
          required={required}
        />
      </div>
    </div>
  );
};

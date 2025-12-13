
import { toast } from "sonner";

// Password validation
export const validatePassword = (password: string): boolean => {
  if (password.length < 6) {
    toast.error("Password must be at least 6 characters!");
    return false;
  }
  return true;
};

// Password match validation
export const validatePasswordMatch = (password: string, confirmPassword: string): boolean => {
  if (password !== confirmPassword) {
    toast.error("Passwords do not match!");
    return false;
  }
  return true;
};

// File validation for ECG upload
export const validateECGFile = (file: File, allowedFormats: string[], maxSizeMB: number = 50): boolean => {
  const extension = "." + file.name.split(".").pop()?.toLowerCase();
  
  if (!allowedFormats.includes(extension)) {
    toast.error(`Invalid file format. Please upload ${allowedFormats.join(", ")} files.`);
    return false;
  }
  
  if (file.size > maxSizeMB * 1024 * 1024) {
    toast.error(`File size exceeds ${maxSizeMB}MB limit.`);
    return false;
  }
  
  return true;
};

// Email validation
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    toast.error("Please enter a valid email address!");
    return false;
  }
  return true;
};

// Required field validation
export const validateRequired = (value: string, fieldName: string): boolean => {
  if (!value.trim()) {
    toast.error(`${fieldName} is required!`);
    return false;
  }
  return true;
};

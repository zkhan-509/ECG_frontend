import { useState, useCallback } from "react";
import { useLocation } from "react-router-dom";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { MedicalCard } from "@/components/shared/MedicalCard";
import { Button } from "@/components/ui/button";
import {
  Upload,
  File,
  X,
  CheckCircle,
  AlertCircle,
  FileText,
} from "lucide-react";
import { toast } from "sonner";

const UploadECG = () => {
  const location = useLocation();
  const userType = location.pathname.includes("doctor") ? "doctor" : "patient";
  
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const allowedFormats = [".csv", ".mat", ".txt"];

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const validateFile = (file: File) => {
    const extension = "." + file.name.split(".").pop()?.toLowerCase();
    if (!allowedFormats.includes(extension)) {
      toast.error(`Invalid file format. Please upload ${allowedFormats.join(", ")} files.`);
      return false;
    }
    if (file.size > 50 * 1024 * 1024) {
      toast.error("File size exceeds 50MB limit.");
      return false;
    }
    return true;
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && validateFile(droppedFile)) {
      setFile(droppedFile);
    }
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && validateFile(selectedFile)) {
      setFile(selectedFile);
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    
    setIsUploading(true);
    setUploadProgress(0);

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          toast.success("ECG file uploaded successfully!");
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const removeFile = () => {
    setFile(null);
    setUploadProgress(0);
  };

  return (
    <DashboardLayout userType={userType}>
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-foreground mb-2">
          Upload ECG Signal
        </h1>
        <p className="text-muted">
          Upload your ECG file for coronary artery disease analysis
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upload Section */}
        <MedicalCard className="lg:col-span-2">
          <h2 className="font-display text-xl font-semibold text-card-foreground mb-6">
            ECG File Upload
          </h2>

          {/* Drag & Drop Zone */}
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`relative border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300 ${
              isDragging
                ? "border-primary bg-primary/5"
                : "border-muted/50 hover:border-primary/50 hover:bg-primary/5"
            }`}
          >
            <input
              type="file"
              accept=".csv,.mat,.txt"
              onChange={handleFileSelect}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            
            <div className="flex flex-col items-center">
              <div className={`w-20 h-20 rounded-2xl flex items-center justify-center mb-4 transition-colors ${
                isDragging ? "bg-primary/20" : "bg-primary/10"
              }`}>
                <Upload className={`w-10 h-10 ${isDragging ? "text-primary" : "text-primary/60"}`} />
              </div>
              <h3 className="font-display text-lg font-semibold text-card-foreground mb-2">
                Drag & Drop your ECG file here
              </h3>
              <p className="text-muted-foreground mb-4">
                or click to browse from your computer
              </p>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <FileText className="w-4 h-4" />
                <span>Supported formats: CSV, MAT, TXT (Max 50MB)</span>
              </div>
            </div>
          </div>

          {/* Selected File */}
          {file && (
            <div className="mt-6 p-4 rounded-xl bg-muted/10 border border-muted/30">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <File className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-card-foreground">{file.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {(file.size / 1024).toFixed(2)} KB
                    </p>
                  </div>
                </div>
                {!isUploading && uploadProgress === 0 && (
                  <button
                    onClick={removeFile}
                    className="p-2 rounded-lg hover:bg-destructive/10 text-destructive transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
                {uploadProgress === 100 && (
                  <CheckCircle className="w-6 h-6 text-accent" />
                )}
              </div>

              {/* Progress Bar */}
              {(isUploading || uploadProgress > 0) && uploadProgress < 100 && (
                <div className="mt-4">
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-muted-foreground">Uploading...</span>
                    <span className="text-primary font-medium">{uploadProgress}%</span>
                  </div>
                  <div className="h-2 bg-muted/30 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Upload Button */}
          {file && uploadProgress === 0 && (
            <Button
              variant="medical"
              size="lg"
              className="w-full mt-6"
              onClick={handleUpload}
              disabled={isUploading}
            >
              <Upload className="w-5 h-5 mr-2" />
              Start Analysis
            </Button>
          )}

          {uploadProgress === 100 && (
            <Button
              variant="success"
              size="lg"
              className="w-full mt-6"
            >
              <CheckCircle className="w-5 h-5 mr-2" />
              View Results
            </Button>
          )}
        </MedicalCard>

        {/* Instructions */}
        <div className="space-y-6">
          <MedicalCard>
            <h2 className="font-display text-lg font-semibold text-card-foreground mb-4">
              File Requirements
            </h2>
            <ul className="space-y-3">
              {[
                "CSV files with time-voltage columns",
                "MAT files from MATLAB",
                "TXT files with ECG data",
                "Sampling rate: 360 Hz recommended",
                "Duration: 10-30 seconds",
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <CheckCircle className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </MedicalCard>

          <MedicalCard>
            <h2 className="font-display text-lg font-semibold text-card-foreground mb-4">
              Important Notes
            </h2>
            <div className="space-y-3">
              <div className="flex items-start gap-2 p-3 rounded-xl bg-yellow-500/10 border border-yellow-500/20">
                <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-muted-foreground">
                  Ensure ECG data is from a properly calibrated device for accurate results.
                </p>
              </div>
            </div>
          </MedicalCard>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default UploadECG;

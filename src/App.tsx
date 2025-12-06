import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import Index from "./pages/Index";
import DoctorLogin from "./pages/DoctorLogin";
import PatientLogin from "./pages/PatientLogin";
import DoctorDashboard from "./pages/DoctorDashboard";
import PatientDashboard from "./pages/PatientDashboard";
import UploadECG from "./pages/UploadECG";
import SignalDisplay from "./pages/SignalDisplay";
import CADResult from "./pages/CADResult";
import Reports from "./pages/Reports";
import History from "./pages/History";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Landing Page */}
          <Route path="/" element={<Index />} />
          
          {/* Auth Routes */}
          <Route path="/doctor/login" element={<DoctorLogin />} />
          <Route path="/patient/login" element={<PatientLogin />} />
          
          {/* Doctor Routes */}
          <Route path="/doctor/dashboard" element={<DoctorDashboard />} />
          <Route path="/doctor/upload" element={<UploadECG />} />
          <Route path="/doctor/signal" element={<SignalDisplay />} />
          <Route path="/doctor/result" element={<CADResult />} />
          <Route path="/doctor/reports" element={<Reports />} />
          <Route path="/doctor/history" element={<History />} />
          
          {/* Patient Routes */}
          <Route path="/patient/dashboard" element={<PatientDashboard />} />
          <Route path="/patient/upload" element={<UploadECG />} />
          <Route path="/patient/signal" element={<SignalDisplay />} />
          <Route path="/patient/result" element={<CADResult />} />
          <Route path="/patient/reports" element={<Reports />} />
          <Route path="/patient/history" element={<History />} />
          
          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

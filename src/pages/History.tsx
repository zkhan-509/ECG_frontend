import { useState } from "react";
import { useLocation } from "react-router-dom";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { MedicalCard } from "@/components/shared/MedicalCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Search,
  Download,
  Eye,
  Calendar,
  Filter,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const historyData = [
  { id: "ECG-001", date: "Dec 3, 2024", patient: "John Doe", patientId: "PAT-12345", result: "Normal", confidence: 97.8 },
  { id: "ECG-002", date: "Dec 2, 2024", patient: "Emily Davis", patientId: "PAT-12346", result: "CAD Detected", confidence: 89.2 },
  { id: "ECG-003", date: "Dec 2, 2024", patient: "Michael Brown", patientId: "PAT-12347", result: "Normal", confidence: 95.4 },
  { id: "ECG-004", date: "Dec 1, 2024", patient: "Sarah Wilson", patientId: "PAT-12348", result: "CAD Detected", confidence: 87.6 },
  { id: "ECG-005", date: "Nov 30, 2024", patient: "James Taylor", patientId: "PAT-12349", result: "Normal", confidence: 99.1 },
  { id: "ECG-006", date: "Nov 29, 2024", patient: "Lisa Anderson", patientId: "PAT-12350", result: "Normal", confidence: 96.3 },
  { id: "ECG-007", date: "Nov 28, 2024", patient: "Robert Martin", patientId: "PAT-12351", result: "CAD Detected", confidence: 91.8 },
  { id: "ECG-008", date: "Nov 27, 2024", patient: "Jennifer Lee", patientId: "PAT-12352", result: "Normal", confidence: 98.2 },
];

const History = () => {
  const location = useLocation();
  const userType = location.pathname.includes("doctor") ? "doctor" : "patient";
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredData = historyData.filter(
    (item) =>
      item.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.patientId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardLayout userType={userType}>
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-foreground mb-2">
          Analysis History
        </h1>
        <p className="text-muted">
          View all past ECG analyses and detection results
        </p>
      </div>

      <MedicalCard>
        {/* Search and Filter Bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search by patient name, ID, or ECG ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 bg-card border-muted/30 text-card-foreground"
            />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Date Range
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="w-4 h-4" />
              Filter
            </Button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-muted/30">
                <th className="text-left py-4 px-4 text-sm font-semibold text-muted-foreground">
                  ECG ID
                </th>
                <th className="text-left py-4 px-4 text-sm font-semibold text-muted-foreground">
                  Date
                </th>
                {userType === "doctor" && (
                  <th className="text-left py-4 px-4 text-sm font-semibold text-muted-foreground">
                    Patient
                  </th>
                )}
                <th className="text-left py-4 px-4 text-sm font-semibold text-muted-foreground">
                  Result
                </th>
                <th className="text-left py-4 px-4 text-sm font-semibold text-muted-foreground">
                  Confidence
                </th>
                <th className="text-right py-4 px-4 text-sm font-semibold text-muted-foreground">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item, index) => (
                <tr
                  key={item.id}
                  className="border-b border-muted/20 hover:bg-muted/5 transition-colors animate-fade-in"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <td className="py-4 px-4">
                    <span className="font-mono text-sm font-medium text-card-foreground">
                      {item.id}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      {item.date}
                    </div>
                  </td>
                  {userType === "doctor" && (
                    <td className="py-4 px-4">
                      <div>
                        <p className="font-medium text-card-foreground text-sm">
                          {item.patient}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {item.patientId}
                        </p>
                      </div>
                    </td>
                  )}
                  <td className="py-4 px-4">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                        item.result === "CAD Detected"
                          ? "bg-destructive/10 text-destructive"
                          : "bg-accent/10 text-accent"
                      }`}
                    >
                      {item.result}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-2 bg-muted/30 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            item.result === "CAD Detected"
                              ? "bg-destructive"
                              : "bg-accent"
                          }`}
                          style={{ width: `${item.confidence}%` }}
                        />
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {item.confidence}%
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between mt-6 pt-6 border-t border-muted/30">
          <p className="text-sm text-muted-foreground">
            Showing {filteredData.length} of {historyData.length} results
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <span className="px-4 py-2 text-sm text-muted-foreground">
              Page {currentPage}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </MedicalCard>
    </DashboardLayout>
  );
};

export default History;

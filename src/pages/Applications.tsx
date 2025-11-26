import { useState, useEffect } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, ArrowRight } from "lucide-react";
import { api } from "@/services/api";
import { toast } from "sonner";

const Applications = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadApplications();
  }, []);

  const loadApplications = async () => {
    try {
      const data = await api.getApplications();
      setApplications(data);
    } catch (error) {
      toast.error("Failed to load applications");
      console.error("Error loading applications:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Job Applications</h1>
          <p className="text-muted-foreground">Manage and review submitted applications</p>
        </div>
        
        {/* Filter Section */}
        <div className="bg-card border border-border rounded-lg p-6 space-y-4">
          <div>
            <h3 className="font-semibold mb-2">Filter Applications</h3>
            <p className="text-sm text-muted-foreground">Select a job to see related applications</p>
          </div>
          
          <Input placeholder="Select a job to filter applications" />
        </div>
        
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search applications..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        
        {/* Applications Table */}
        <div className="border border-border rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr className="border-b border-border">
                <th className="text-left p-4 font-medium">Job Position</th>
                <th className="text-left p-4 font-medium">Candidate</th>
                <th className="text-left p-4 font-medium">Match Score</th>
                <th className="text-left p-4 font-medium">Interview Status</th>
                <th className="text-left p-4 font-medium">Status</th>
                <th className="text-left p-4 font-medium">Applied Date</th>
                <th className="text-right p-4 font-medium"></th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-muted-foreground">
                    Loading applications...
                  </td>
                </tr>
              ) : applications.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-muted-foreground">
                    No applications found.
                  </td>
                </tr>
              ) : (
                applications.map((app) => (
                <tr key={app.id} className="border-b border-border hover:bg-muted/30 transition-colors">
                  <td className="p-4">
                    <div>
                      <div className="font-medium">{app.jobPosition}</div>
                      <div className="text-sm text-muted-foreground">{app.company}</div>
                    </div>
                  </td>
                  <td className="p-4">{app.candidate}</td>
                  <td className="p-4">
                    {app.matchScore === "N/A" ? (
                      <span className="text-muted-foreground">{app.matchScore}</span>
                    ) : (
                      <Badge 
                        variant={
                          parseInt(app.matchScore) > 30 ? "default" : "destructive"
                        }
                        className="text-xs"
                      >
                        {app.matchScore}
                      </Badge>
                    )}
                  </td>
                  <td className="p-4">
                    <Badge 
                      variant={app.interviewStatus === "In Progress" ? "default" : "secondary"}
                      className="text-xs"
                    >
                      {app.interviewStatus}
                    </Badge>
                  </td>
                  <td className="p-4">
                    <Badge 
                      variant={
                        app.status === "Rejected" ? "destructive" : "default"
                      }
                      className="text-xs"
                    >
                      {app.status}
                    </Badge>
                  </td>
                  <td className="p-4 text-muted-foreground">{app.appliedDate}</td>
                  <td className="p-4">
                    <Button variant="ghost" size="sm">
                      View Details
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </td>
                </tr>
              )))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Applications;

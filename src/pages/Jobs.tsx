import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { mockJobs } from "@/data/mockData";
import { Search, Plus, Link2, Eye, Edit, Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const Jobs = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleCreateJob = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Job created successfully!");
    setIsDialogOpen(false);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Job Management</h1>
            <p className="text-muted-foreground">Manage your job listings</p>
          </div>
          
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Create Job
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create New Job</DialogTitle>
                <p className="text-sm text-muted-foreground">Fill in the details to create a new job posting.</p>
              </DialogHeader>
              <form onSubmit={handleCreateJob} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Job Title</Label>
                    <Input placeholder="e.g. Software Engineer" />
                  </div>
                  <div className="space-y-2">
                    <Label>Company Name</Label>
                    <Input placeholder="e.g. Acme Inc." />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Skills</Label>
                    <Input placeholder="Select skills" />
                  </div>
                  <div className="space-y-2">
                    <Label>Location</Label>
                    <Input placeholder="Select location" />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Salary (Optional)</Label>
                    <Input placeholder="e.g. $80,000 - $100,000" />
                  </div>
                  <div className="space-y-2">
                    <Label>Expiry Date</Label>
                    <Input type="date" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Interview Duration</Label>
                  <Input placeholder="Select interview duration" />
                  <p className="text-xs text-muted-foreground">
                    Set the maximum duration for the AI interview session (required)
                  </p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label>Job Description</Label>
                    <Button type="button" variant="outline" size="sm">Generate with AI</Button>
                  </div>
                  <textarea 
                    className="w-full min-h-[150px] rounded-md border border-input bg-background px-3 py-2 text-sm"
                    placeholder="Enter job description or generate with AI"
                  />
                  <p className="text-xs text-muted-foreground">
                    You can manually enter the job description or use AI to generate one based on the job title, company, and role.
                  </p>
                </div>
                
                <div className="flex gap-3 justify-end">
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">Create Job</Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
        
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search jobs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        
        {/* Jobs Table */}
        <div className="border border-border rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr className="border-b border-border">
                <th className="text-left p-4 font-medium">Job Title</th>
                <th className="text-left p-4 font-medium">Company</th>
                <th className="text-left p-4 font-medium">Skills</th>
                <th className="text-left p-4 font-medium">Location</th>
                <th className="text-left p-4 font-medium">Expiry Date</th>
                <th className="text-left p-4 font-medium">Status</th>
                <th className="text-right p-4 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {mockJobs.map((job) => (
                <tr key={job.id} className="border-b border-border hover:bg-muted/30 transition-colors">
                  <td className="p-4">{job.title}</td>
                  <td className="p-4 text-muted-foreground">{job.company}</td>
                  <td className="p-4">
                    <div className="flex gap-1 flex-wrap">
                      {job.skills.map((skill, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </td>
                  <td className="p-4 text-muted-foreground">{job.location}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <span className="text-sm">{job.expiryDate}</span>
                      {job.expired && (
                        <Badge variant="destructive" className="text-xs">Expired</Badge>
                      )}
                    </div>
                  </td>
                  <td className="p-4">
                    <Badge variant="outline" className="text-xs">{job.status}</Badge>
                  </td>
                  <td className="p-4">
                    <div className="flex gap-2 justify-end">
                      <Button size="icon" variant="ghost">
                        <Link2 className="w-4 h-4" />
                      </Button>
                      <Button size="icon" variant="ghost">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button size="icon" variant="ghost">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button size="icon" variant="ghost">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="flex justify-between items-center text-sm text-muted-foreground">
          <span>Page 1 of 3</span>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled>Previous</Button>
            <Button variant="outline" size="sm">Next</Button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Jobs;

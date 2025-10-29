import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockStats } from "@/data/mockData";
import { Briefcase, Users, TrendingUp, ExternalLink } from "lucide-react";

const Dashboard = () => {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <h1 className="text-3xl font-bold">Recruiter Dashboard</h1>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">My Jobs</CardTitle>
              <div className="flex gap-2">
                <Briefcase className="w-4 h-4 text-muted-foreground" />
                <ExternalLink className="w-4 h-4 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{mockStats.myJobs}</div>
              <p className="text-sm text-muted-foreground mt-1">Active job listings you've posted</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Applications</CardTitle>
              <div className="flex gap-2">
                <Users className="w-4 h-4 text-muted-foreground" />
                <ExternalLink className="w-4 h-4 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{mockStats.totalApplications}</div>
              <p className="text-sm text-muted-foreground mt-1">Applications to your job listings</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Acceptance Rate</CardTitle>
              <div className="flex gap-2">
                <TrendingUp className="w-4 h-4 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{mockStats.acceptanceRate}%</div>
              <p className="text-sm text-muted-foreground mt-1">Percentage of applications accepted</p>
            </CardContent>
          </Card>
        </div>
        
        {/* Applications by Status Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Applications by Status</CardTitle>
            <p className="text-sm text-muted-foreground">Distribution of applications to your job listings</p>
          </CardHeader>
          <CardContent className="h-[400px] flex items-center justify-center text-muted-foreground">
            Chart visualization would go here
          </CardContent>
        </Card>
        
        {/* Recent Applications */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Applications</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-center py-8">No recent applications</p>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;

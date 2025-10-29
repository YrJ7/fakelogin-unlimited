import { Home, Briefcase, Users, User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

const Sidebar = () => {
  const location = useLocation();

  const navItems = [
    { icon: Home, label: "Dashboard", path: "/dashboard" },
    { icon: Briefcase, label: "Jobs", path: "/jobs" },
    { icon: Users, label: "Applications", path: "/applications" },
    { icon: User, label: "Profile", path: "/profile" },
  ];

  return (
    <aside className="w-16 bg-card border-r border-border flex flex-col items-center py-6 gap-6">
      <Link to="/dashboard" className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-primary-foreground font-bold text-xl">
        iZ
      </Link>
      
      <nav className="flex flex-col gap-4 mt-8">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "w-10 h-10 rounded-lg flex items-center justify-center transition-colors",
                isActive 
                  ? "bg-primary text-primary-foreground" 
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
              title={item.label}
            >
              <Icon className="w-5 h-5" />
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;

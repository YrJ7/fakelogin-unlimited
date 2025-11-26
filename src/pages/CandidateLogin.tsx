import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { api } from "@/services/api";

const CandidateLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error("Please enter email and password");
      return;
    }

    try {
      const result = isRegistering 
        ? await api.register(email, password)
        : await api.login(email, password);
      
      if (result.error) {
        toast.error(result.error);
        return;
      }

      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userRole", "candidate");
      localStorage.setItem("user", JSON.stringify(result.user));
      toast.success(isRegistering ? "Registration successful!" : "Login successful!");
      navigate("/"); // Navigate to candidate dashboard/landing
    } catch (error) {
      toast.error(isRegistering ? "Registration failed" : "Login failed");
      console.error("Auth error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="bg-card border border-border rounded-2xl p-8">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center">
              <span className="text-2xl font-bold text-primary-foreground">iZ</span>
            </div>
          </div>
          
          <h1 className="text-2xl font-bold text-center mb-2">
            {isRegistering ? "Register as Candidate" : "Login as Candidate"}
          </h1>
          <p className="text-center text-muted-foreground mb-8">
            {isRegistering 
              ? "Create your account to start applying for jobs"
              : "Enter your credentials to access your applications"
            }
          </p>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-background"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-background"
              />
            </div>
            
            <Button type="submit" className="w-full" size="lg">
              {isRegistering ? "Register" : "Login"}
            </Button>
          </form>
          
          <div className="mt-6 text-center space-y-2">
            <p className="text-sm text-muted-foreground">
              {isRegistering ? "Already have an account?" : "Don't have an account?"}{" "}
              <button 
                onClick={() => setIsRegistering(!isRegistering)}
                className="text-foreground underline hover:text-primary transition-colors"
              >
                {isRegistering ? "Login" : "Register"}
              </button>
            </p>
            <p className="text-sm text-muted-foreground">
              Are you a recruiter?{" "}
              <button 
                onClick={() => navigate("/login")}
                className="text-foreground underline hover:text-primary transition-colors"
              >
                Login as recruiter
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidateLogin;
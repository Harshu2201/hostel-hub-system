
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/components/ui/use-toast";
import { Eye, EyeOff, LogIn } from 'lucide-react';

type LoginFormProps = {
  portalType: 'student' | 'mess' | 'admin';
};

const portalDetails = {
  student: {
    title: "Student Portal",
    description: "Access your hostel services and information",
    color: "btn-student",
    route: "/student",
  },
  mess: {
    title: "Mess Management Portal",
    description: "Track meals and manage mess operations",
    color: "btn-mess",
    route: "/mess",
  },
  admin: {
    title: "Hostel Admin Portal",
    description: "Manage hostel operations and student records",
    color: "btn-admin",
    route: "/admin",
  },
};

const LoginForm: React.FC<LoginFormProps> = ({ portalType }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const portal = portalDetails[portalType];
  
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      // For demo purposes, accept any non-empty credentials
      if (username && password) {
        // Store user info in localStorage
        localStorage.setItem('hostelHubUser', JSON.stringify({
          username,
          role: portalType,
          isLoggedIn: true
        }));
        
        toast({
          title: "Login successful",
          description: `Welcome to the ${portal.title}`,
        });
        
        // Navigate to the appropriate dashboard
        navigate(portal.route);
      } else {
        toast({
          variant: "destructive",
          title: "Login failed",
          description: "Please enter valid credentials",
        });
      }
      setIsLoading(false);
    }, 1000);
  };
  
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  
  return (
    <Card className="w-full max-w-md animate-fade-up">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">{portal.title}</CardTitle>
        <CardDescription>{portal.description}</CardDescription>
      </CardHeader>
      <form onSubmit={handleLogin}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="username" className="text-sm font-medium">Username</label>
            <Input
              id="username"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="form-input"
              disabled={isLoading}
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium">Password</label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="form-input pr-10"
                disabled={isLoading}
              />
              <button 
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                onClick={togglePasswordVisibility}
                tabIndex={-1}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
          
          <div className="flex justify-end">
            <a href="#" className="text-sm text-primary hover:underline">
              Forgot password?
            </a>
          </div>
        </CardContent>
        
        <CardFooter className="flex flex-col gap-4">
          <Button 
            type="submit" 
            className={`w-full ${portal.color} flex items-center justify-center gap-2`}
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-white"></div>
            ) : (
              <>
                <LogIn size={18} />
                <span>Login</span>
              </>
            )}
          </Button>
          
          {portalType === 'student' && (
            <div className="text-sm text-center">
              <span className="text-muted-foreground">Don't have an account?</span>{" "}
              <a href="/register" className="text-primary hover:underline">
                Register now
              </a>
            </div>
          )}
        </CardFooter>
      </form>
    </Card>
  );
};

export default LoginForm;

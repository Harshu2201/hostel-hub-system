
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/components/ui/use-toast";
import { Mail } from 'lucide-react';

const ForgotPasswordForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Email sent",
        description: "If your email is registered, you'll receive password reset instructions.",
      });
      
      setIsSubmitted(true);
      setIsLoading(false);
    }, 1500);
  };
  
  return (
    <Card className="w-full max-w-md animate-fade-up">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Reset Password</CardTitle>
        <CardDescription>
          {isSubmitted 
            ? "Please check your email for reset instructions" 
            : "Enter your email to receive password reset instructions"
          }
        </CardDescription>
      </CardHeader>
      
      {!isSubmitted ? (
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">Email Address</label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your registered email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="form-input"
                disabled={isLoading}
              />
            </div>
          </CardContent>
          
          <CardFooter className="flex flex-col gap-4">
            <Button 
              type="submit" 
              className="w-full btn-primary flex items-center justify-center gap-2"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-white"></div>
              ) : (
                <>
                  <Mail size={18} />
                  <span>Send Reset Link</span>
                </>
              )}
            </Button>
            
            <div className="text-sm text-center">
              <a href="/" className="text-primary hover:underline">
                Back to Login
              </a>
            </div>
          </CardFooter>
        </form>
      ) : (
        <CardFooter className="flex flex-col gap-4 pt-2">
          <p className="text-center text-muted-foreground mb-4">
            We've sent an email with instructions to reset your password.
            Please check your inbox and spam folders.
          </p>
          
          <Button 
            type="button" 
            className="w-full btn-primary"
            onClick={() => navigate('/')}
          >
            Return to Login
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default ForgotPasswordForm;


import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthLayout from '@/components/layout/AuthLayout';
import LoginForm from '@/components/auth/LoginForm';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { InfoIcon } from 'lucide-react';

const Index: React.FC = () => {
  const [activePortal, setActivePortal] = useState<'student' | 'mess' | 'admin'>('student');
  const navigate = useNavigate();
  
  // Check if user is already logged in
  useEffect(() => {
    const userString = localStorage.getItem('hostelHubUser');
    if (userString) {
      const user = JSON.parse(userString);
      if (user.isLoggedIn) {
        navigate(`/${user.role}`);
      }
    }
  }, [navigate]);
  
  return (
    <AuthLayout>
      <div className="space-y-6">
        <Card className="bg-muted/50 border-dashed mb-4">
          <CardContent className="flex items-center gap-3 p-3">
            <InfoIcon className="h-5 w-5 text-primary" />
            <p className="text-sm text-muted-foreground">
              For demo purposes, click the "Use Demo Login" button to automatically fill in credentials for each portal.
            </p>
          </CardContent>
        </Card>
        
        <Tabs value={activePortal} onValueChange={(value) => setActivePortal(value as 'student' | 'mess' | 'admin')}>
          <TabsList className="grid grid-cols-3 mb-6">
            <TabsTrigger value="student">Student</TabsTrigger>
            <TabsTrigger value="mess">Mess</TabsTrigger>
            <TabsTrigger value="admin">Admin</TabsTrigger>
          </TabsList>
          
          <TabsContent value="student" className="space-y-4">
            <LoginForm portalType="student" />
          </TabsContent>
          
          <TabsContent value="mess" className="space-y-4">
            <LoginForm portalType="mess" />
          </TabsContent>
          
          <TabsContent value="admin" className="space-y-4">
            <LoginForm portalType="admin" />
          </TabsContent>
        </Tabs>
      </div>
    </AuthLayout>
  );
};

export default Index;


import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthLayout from '@/components/layout/AuthLayout';
import LoginForm from '@/components/auth/LoginForm';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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

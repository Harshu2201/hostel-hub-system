
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import MessMenu from '@/components/student/MessMenu';

const MessMenuPage: React.FC = () => {
  return (
    <DashboardLayout portalType="student">
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Hostel Mess Menu</h1>
        <MessMenu />
      </div>
    </DashboardLayout>
  );
};

export default MessMenuPage;


import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import OutpassRequestForm from '@/components/student/OutpassRequestForm';
import OutpassRequestList from '@/components/student/OutpassRequestList';

const OutpassPage: React.FC = () => {
  return (
    <DashboardLayout portalType="student">
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Outpass Requests</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <OutpassRequestForm />
          <OutpassRequestList />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default OutpassPage;


import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import OutpassApproval from '@/components/admin/OutpassApproval';

const OutpassApprovalPage: React.FC = () => {
  return (
    <DashboardLayout portalType="admin">
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Outpass Approval</h1>
        <OutpassApproval />
      </div>
    </DashboardLayout>
  );
};

export default OutpassApprovalPage;

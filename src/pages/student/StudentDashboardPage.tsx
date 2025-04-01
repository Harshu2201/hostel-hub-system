
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import StudentDashboard from '@/components/student/StudentDashboard';

const StudentDashboardPage: React.FC = () => {
  return (
    <DashboardLayout portalType="student">
      <StudentDashboard />
    </DashboardLayout>
  );
};

export default StudentDashboardPage;


import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import MealTracking from '@/components/mess/MealTracking';

const MealTrackingPage: React.FC = () => {
  return (
    <DashboardLayout portalType="mess">
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Meal Tracking</h1>
        <MealTracking />
      </div>
    </DashboardLayout>
  );
};

export default MealTrackingPage;

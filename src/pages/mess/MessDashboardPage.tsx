
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { UserCheck, Utensils, ClipboardList } from 'lucide-react';
import { format } from 'date-fns';

const MessDashboardPage: React.FC = () => {
  // Get student data for analytics
  const getStudents = () => {
    const storedStudents = localStorage.getItem('hostelStudents');
    if (storedStudents) {
      return JSON.parse(storedStudents);
    }
    return [];
  };
  
  const students = getStudents();
  
  // Calculate attendance stats
  const breakfastAttendance = students.filter((s: any) => s.breakfast).length;
  const lunchAttendance = students.filter((s: any) => s.lunch).length;
  const dinnerAttendance = students.filter((s: any) => s.dinner).length;
  
  return (
    <DashboardLayout portalType="mess">
      <div className="space-y-6">
        {/* Header section */}
        <section className="bg-gradient-to-r from-mess to-gray-700 text-white p-6 rounded-lg shadow-md">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h1 className="text-2xl font-bold">Mess Management Dashboard</h1>
              <p className="mt-2">{format(new Date(), 'EEEE, MMMM d, yyyy')}</p>
            </div>
          </div>
        </section>
        
        {/* Stats cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div className="space-y-0.5">
                <CardTitle className="text-sm font-medium">Breakfast Attendance</CardTitle>
                <CardDescription>Today's count</CardDescription>
              </div>
              <UserCheck className="h-8 w-8 text-mess" />
            </CardHeader>
            <CardContent className="py-4">
              <div className="text-3xl font-bold">
                {breakfastAttendance} <span className="text-muted-foreground text-xl">/ {students.length}</span>
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                {Math.round((breakfastAttendance / students.length) * 100) || 0}% attendance rate
              </div>
              <div className="mt-4 h-2 bg-muted rounded-full overflow-hidden">
                <div 
                  className="h-full bg-mess" 
                  style={{ width: `${(breakfastAttendance / students.length) * 100}%` }}
                ></div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div className="space-y-0.5">
                <CardTitle className="text-sm font-medium">Lunch Attendance</CardTitle>
                <CardDescription>Today's count</CardDescription>
              </div>
              <Utensils className="h-8 w-8 text-mess" />
            </CardHeader>
            <CardContent className="py-4">
              <div className="text-3xl font-bold">
                {lunchAttendance} <span className="text-muted-foreground text-xl">/ {students.length}</span>
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                {Math.round((lunchAttendance / students.length) * 100) || 0}% attendance rate
              </div>
              <div className="mt-4 h-2 bg-muted rounded-full overflow-hidden">
                <div 
                  className="h-full bg-mess" 
                  style={{ width: `${(lunchAttendance / students.length) * 100}%` }}
                ></div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div className="space-y-0.5">
                <CardTitle className="text-sm font-medium">Dinner Attendance</CardTitle>
                <CardDescription>Today's count</CardDescription>
              </div>
              <ClipboardList className="h-8 w-8 text-mess" />
            </CardHeader>
            <CardContent className="py-4">
              <div className="text-3xl font-bold">
                {dinnerAttendance} <span className="text-muted-foreground text-xl">/ {students.length}</span>
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                {Math.round((dinnerAttendance / students.length) * 100) || 0}% attendance rate
              </div>
              <div className="mt-4 h-2 bg-muted rounded-full overflow-hidden">
                <div 
                  className="h-full bg-mess" 
                  style={{ width: `${(dinnerAttendance / students.length) * 100}%` }}
                ></div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Additional content */}
        <div className="grid grid-cols-1 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Today's Menu</CardTitle>
              <CardDescription>Meals scheduled for today</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Breakfast */}
                <div>
                  <h3 className="font-semibold text-mess mb-2">Breakfast (7:30 AM - 9:00 AM)</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-muted p-3 rounded-md text-center">Idli</div>
                    <div className="bg-muted p-3 rounded-md text-center">Sambar</div>
                    <div className="bg-muted p-3 rounded-md text-center">Coconut Chutney</div>
                    <div className="bg-muted p-3 rounded-md text-center">Tea/Coffee</div>
                  </div>
                </div>
                
                {/* Lunch */}
                <div>
                  <h3 className="font-semibold text-mess mb-2">Lunch (12:30 PM - 2:00 PM)</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-muted p-3 rounded-md text-center">Rice</div>
                    <div className="bg-muted p-3 rounded-md text-center">Dal</div>
                    <div className="bg-muted p-3 rounded-md text-center">Mixed Vegetables</div>
                    <div className="bg-muted p-3 rounded-md text-center">Curd</div>
                  </div>
                </div>
                
                {/* Dinner */}
                <div>
                  <h3 className="font-semibold text-mess mb-2">Dinner (7:30 PM - 9:00 PM)</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-muted p-3 rounded-md text-center">Chapati</div>
                    <div className="bg-muted p-3 rounded-md text-center">Paneer Butter Masala</div>
                    <div className="bg-muted p-3 rounded-md text-center">Jeera Rice</div>
                    <div className="bg-muted p-3 rounded-md text-center">Fruit Custard</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default MessDashboardPage;

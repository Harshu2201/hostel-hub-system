
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, FileCheck, AlertCircle, Calendar } from 'lucide-react';

const AdminDashboardPage: React.FC = () => {
  // Get outpass requests for analytics
  const getOutpassRequests = () => {
    const storedRequests = localStorage.getItem('outpassRequests');
    if (storedRequests) {
      return JSON.parse(storedRequests);
    }
    return [];
  };
  
  const outpassRequests = getOutpassRequests();
  const pendingRequests = outpassRequests.filter((req: any) => req.status === 'pending').length;
  
  return (
    <DashboardLayout portalType="admin">
      <div className="space-y-6">
        {/* Header section */}
        <section className="bg-gradient-to-r from-admin to-yellow-700 text-white p-6 rounded-lg shadow-md">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h1 className="text-2xl font-bold">Hostel Administration Dashboard</h1>
              <p className="mt-2">Manage hostel operations and student records</p>
            </div>
          </div>
        </section>
        
        {/* Stats cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div className="space-y-0.5">
                <CardTitle className="text-sm font-medium">Total Students</CardTitle>
                <CardDescription>Hostel residents</CardDescription>
              </div>
              <Users className="h-8 w-8 text-admin" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">120</div>
              <p className="text-xs text-muted-foreground">86% occupancy rate</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div className="space-y-0.5">
                <CardTitle className="text-sm font-medium">Pending Outpass</CardTitle>
                <CardDescription>Awaiting approval</CardDescription>
              </div>
              <FileCheck className="h-8 w-8 text-admin" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{pendingRequests}</div>
              <p className="text-xs text-muted-foreground">
                {pendingRequests > 0 ? "Requires your attention" : "All caught up!"}
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div className="space-y-0.5">
                <CardTitle className="text-sm font-medium">Complaints</CardTitle>
                <CardDescription>Unresolved issues</CardDescription>
              </div>
              <AlertCircle className="h-8 w-8 text-admin" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">5</div>
              <p className="text-xs text-muted-foreground">2 high priority</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div className="space-y-0.5">
                <CardTitle className="text-sm font-medium">Events</CardTitle>
                <CardDescription>This month</CardDescription>
              </div>
              <Calendar className="h-8 w-8 text-admin" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">Next: Cultural Night (May 15)</p>
            </CardContent>
          </Card>
        </div>
        
        {/* Additional content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Outpass Requests</CardTitle>
              <CardDescription>Latest student outpass requests</CardDescription>
            </CardHeader>
            <CardContent>
              {outpassRequests.length > 0 ? (
                <div className="space-y-4">
                  {outpassRequests.slice(0, 3).map((request: any, index: number) => (
                    <div key={index} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                      <div>
                        <p className="font-medium">{request.studentId}</p>
                        <p className="text-sm text-muted-foreground">{request.destination}</p>
                      </div>
                      <div className={`px-2 py-1 rounded text-xs ${
                        request.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        request.status === 'approved' ? 'bg-green-100 text-green-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-muted-foreground py-4">No outpass requests yet</p>
              )}
              
              <div className="mt-4">
                <a href="/admin/outpass" className="text-sm text-admin hover:underline">
                  View all requests →
                </a>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Recent Complaints</CardTitle>
              <CardDescription>Student reported issues</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <p className="font-medium">Water Leakage</p>
                    <p className="text-sm text-muted-foreground">Room B-204, Reported by Rahul Sharma</p>
                  </div>
                  <div className="px-2 py-1 bg-red-100 text-red-800 rounded text-xs">
                    High Priority
                  </div>
                </div>
                
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <p className="font-medium">Broken Fan</p>
                    <p className="text-sm text-muted-foreground">Room A-105, Reported by Priya Patel</p>
                  </div>
                  <div className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded text-xs">
                    Medium Priority
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Wi-Fi Connectivity</p>
                    <p className="text-sm text-muted-foreground">Block C, Reported by Aakash Singh</p>
                  </div>
                  <div className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded text-xs">
                    Medium Priority
                  </div>
                </div>
              </div>
              
              <div className="mt-4">
                <a href="/admin/complaints" className="text-sm text-admin hover:underline">
                  View all complaints →
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboardPage;

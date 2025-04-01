
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Clock, Home, User, Bell, FileText } from 'lucide-react';
import { format } from 'date-fns';

const StudentDashboard: React.FC = () => {
  const currentUser = JSON.parse(localStorage.getItem('hostelHubUser') || '{}');
  
  return (
    <div className="grid gap-6">
      {/* Welcome section */}
      <section className="bg-gradient-to-r from-student to-blue-500 text-white p-6 rounded-lg shadow-md">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h1 className="text-2xl font-bold">Welcome, {currentUser.fullName || currentUser.username}!</h1>
            <p className="mt-2">{format(new Date(), 'EEEE, MMMM d, yyyy')}</p>
          </div>
          <div className="mt-4 md:mt-0 flex items-center">
            <Clock className="mr-2" />
            <span>{format(new Date(), 'h:mm a')}</span>
          </div>
        </div>
      </section>
      
      {/* Quick info cards */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="portal-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <Home className="mr-2 h-4 w-4 text-student" />
              Room Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">A-204</p>
            <p className="text-sm text-muted-foreground">Block A, Second Floor</p>
          </CardContent>
        </Card>
        
        <Card className="portal-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <User className="mr-2 h-4 w-4 text-student" />
              Warden
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">Dr. Sharma</p>
            <p className="text-sm text-muted-foreground">Contact: +91 9876543210</p>
          </CardContent>
        </Card>
        
        <Card className="portal-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <Bell className="mr-2 h-4 w-4 text-student" />
              Pending Requests
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">2</p>
            <p className="text-sm text-muted-foreground">Outpass requests awaiting approval</p>
          </CardContent>
        </Card>
        
        <Card className="portal-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <Calendar className="mr-2 h-4 w-4 text-student" />
              Upcoming Events
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">3</p>
            <p className="text-sm text-muted-foreground">Events in the next 7 days</p>
          </CardContent>
        </Card>
      </section>
      
      {/* Important notices and announcements */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Notices & Announcements</h2>
        <div className="bg-white rounded-lg shadow-sm border p-4 space-y-4">
          <div className="border-l-4 border-student pl-4 py-2 animate-fade-in">
            <div className="flex justify-between">
              <h3 className="font-medium">Hostel Maintenance Schedule</h3>
              <span className="text-xs text-muted-foreground">Today</span>
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              Water supply will be disrupted from 2 PM to 5 PM due to tank cleaning.
            </p>
          </div>
          
          <div className="border-l-4 border-yellow-500 pl-4 py-2 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <div className="flex justify-between">
              <h3 className="font-medium">Cultural Night</h3>
              <span className="text-xs text-muted-foreground">Yesterday</span>
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              Annual cultural night will be held on May 15th. All students are encouraged to participate.
            </p>
          </div>
          
          <div className="border-l-4 border-blue-500 pl-4 py-2 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="flex justify-between">
              <h3 className="font-medium">Exam Schedule Released</h3>
              <span className="text-xs text-muted-foreground">2 days ago</span>
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              End semester examination schedule has been released. Check with your department for details.
            </p>
          </div>
        </div>
      </section>
      
      {/* Timetable section */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Today's Timetable</h2>
          <a href="#" className="text-student hover:underline text-sm">View Full Schedule</a>
        </div>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">
              Monday
            </CardTitle>
            <CardDescription>Your class schedule for today</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="bg-muted text-muted-foreground p-2 rounded text-sm text-center w-24 mr-4">
                  <div className="font-medium">9:30 AM</div>
                  <div className="text-xs">11:00 AM</div>
                </div>
                <div>
                  <h3 className="font-medium">Database Management Systems</h3>
                  <p className="text-sm text-muted-foreground">Room 302, CS Block</p>
                  <p className="text-sm flex items-center mt-1">
                    <FileText className="h-3 w-3 mr-1" />
                    <span>Assignment Due</span>
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-muted text-muted-foreground p-2 rounded text-sm text-center w-24 mr-4">
                  <div className="font-medium">11:15 AM</div>
                  <div className="text-xs">12:45 PM</div>
                </div>
                <div>
                  <h3 className="font-medium">Computer Networks</h3>
                  <p className="text-sm text-muted-foreground">Room 405, CS Block</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-muted text-muted-foreground p-2 rounded text-sm text-center w-24 mr-4">
                  <div className="font-medium">2:00 PM</div>
                  <div className="text-xs">5:00 PM</div>
                </div>
                <div>
                  <h3 className="font-medium">Database Lab</h3>
                  <p className="text-sm text-muted-foreground">Lab 2, CS Block</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default StudentDashboard;

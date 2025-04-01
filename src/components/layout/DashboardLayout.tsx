
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Calendar, Home, Settings, User, LogOut, Bell, Menu } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";

type DashboardLayoutProps = {
  children: React.ReactNode;
  portalType: 'student' | 'mess' | 'admin';
};

const portalConfig = {
  student: {
    title: 'Student Portal',
    color: 'bg-student hover:bg-student-hover',
    links: [
      { name: 'Dashboard', icon: <Home size={20} />, path: '/student' },
      { name: 'Outpass', icon: <Calendar size={20} />, path: '/student/outpass' },
      { name: 'Mess Menu', icon: <Calendar size={20} />, path: '/student/mess-menu' },
      { name: 'Profile', icon: <User size={20} />, path: '/student/profile' },
      { name: 'Settings', icon: <Settings size={20} />, path: '/student/settings' },
    ]
  },
  mess: {
    title: 'Mess Management',
    color: 'bg-mess hover:bg-mess-hover',
    links: [
      { name: 'Dashboard', icon: <Home size={20} />, path: '/mess' },
      { name: 'Meal Tracking', icon: <Calendar size={20} />, path: '/mess/tracking' },
      { name: 'Reports', icon: <Calendar size={20} />, path: '/mess/reports' },
      { name: 'Settings', icon: <Settings size={20} />, path: '/mess/settings' },
    ]
  },
  admin: {
    title: 'Hostel Administration',
    color: 'bg-admin hover:bg-admin-hover',
    links: [
      { name: 'Dashboard', icon: <Home size={20} />, path: '/admin' },
      { name: 'Student Management', icon: <User size={20} />, path: '/admin/students' },
      { name: 'Outpass Requests', icon: <Calendar size={20} />, path: '/admin/outpass' },
      { name: 'Complaints', icon: <Bell size={20} />, path: '/admin/complaints' },
      { name: 'Settings', icon: <Settings size={20} />, path: '/admin/settings' },
    ]
  }
};

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children, portalType }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const portal = portalConfig[portalType];
  
  // Check if user is logged in
  useEffect(() => {
    const userString = localStorage.getItem('hostelHubUser');
    if (!userString) {
      toast({
        variant: "destructive",
        title: "Access denied",
        description: "Please login to continue",
      });
      navigate('/');
      return;
    }
    
    const user = JSON.parse(userString);
    if (!user.isLoggedIn || user.role !== portalType) {
      toast({
        variant: "destructive",
        title: "Access denied",
        description: "You don't have permission to access this portal",
      });
      navigate('/');
    }
    
    // Check screen size for responsive layout
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      setSidebarOpen(window.innerWidth >= 768);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [navigate, portalType, toast]);
  
  const handleLogout = () => {
    localStorage.removeItem('hostelHubUser');
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
    navigate('/');
  };
  
  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } fixed inset-y-0 z-50 flex h-full w-64 flex-col bg-white border-r border-border transition-transform duration-300 ease-in-out md:relative md:translate-x-0`}
      >
        <div className={`h-16 flex items-center justify-center border-b ${portal.color} text-white`}>
          <h2 className="text-lg font-semibold">{portal.title}</h2>
        </div>
        
        <nav className="flex-1 overflow-y-auto p-4">
          <ul className="space-y-2">
            {portal.links.map((link, i) => (
              <li key={i}>
                <a
                  href={link.path}
                  className="flex items-center gap-3 rounded-md px-3 py-2 text-gray-700 hover:bg-muted transition-colors"
                >
                  {link.icon}
                  <span>{link.name}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
        
        <div className="border-t p-4">
          <Button
            variant="outline"
            className="w-full flex items-center justify-center gap-2 text-gray-700"
            onClick={handleLogout}
          >
            <LogOut size={18} />
            <span>Log out</span>
          </Button>
        </div>
      </aside>
      
      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="h-16 border-b bg-white flex items-center justify-between px-4">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <Menu size={24} />
          </Button>
          
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon">
              <Bell size={20} />
            </Button>
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center text-sm font-medium">
                {localStorage.getItem('hostelHubUser') ? JSON.parse(localStorage.getItem('hostelHubUser')!).username.charAt(0).toUpperCase() : 'U'}
              </div>
              <span className="text-sm font-medium hidden md:block">
                {localStorage.getItem('hostelHubUser') ? JSON.parse(localStorage.getItem('hostelHubUser')!).username : 'User'}
              </span>
            </div>
          </div>
        </header>
        
        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-6 bg-muted/30">
          {children}
        </main>
      </div>
      
      {/* Backdrop for mobile */}
      {sidebarOpen && isMobile && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default DashboardLayout;

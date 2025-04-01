
import React from 'react';

type AuthLayoutProps = {
  children: React.ReactNode;
};

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Hero section with background image */}
      <div 
        className="relative flex-1 hidden md:flex flex-col items-center justify-center bg-cover bg-center p-8"
        style={{ 
          backgroundImage: 'url("https://images.app.goo.gl/Wv1vedmLfKB5hT5R7")',
          backgroundImage: 'url("https://res.cloudinary.com/dcprvbern/image/upload/v1684293054/hostel-building_cmd1se.jpg")'
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/70 to-primary/30"></div>
        
        <div className="relative z-10 flex flex-col items-center text-center text-white max-w-md">
          <h1 className="text-4xl font-bold mb-4 drop-shadow-lg">Hostel Hub Management System</h1>
          <p className="text-lg mb-8 drop-shadow">
            Your comprehensive solution for efficient hostel management and seamless student experience
          </p>
          <div className="grid grid-cols-3 gap-6 w-full">
            <div className="bg-white/20 backdrop-blur-sm p-4 rounded-lg">
              <h3 className="font-bold mb-1">Students</h3>
              <p className="text-sm">Access services and manage requests</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm p-4 rounded-lg">
              <h3 className="font-bold mb-1">Mess</h3>
              <p className="text-sm">Manage meals and attendance</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm p-4 rounded-lg">
              <h3 className="font-bold mb-1">Admin</h3>
              <p className="text-sm">Oversee all hostel operations</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Form section */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 md:p-12 bg-gradient-to-b from-background to-muted">
        <div className="w-full max-w-md">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;

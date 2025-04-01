
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Auth Pages
import Index from "./pages/Index";
import RegisterPage from "./pages/RegisterPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import NotFound from "./pages/NotFound";

// Student Pages
import StudentDashboardPage from "./pages/student/StudentDashboardPage";
import OutpassPage from "./pages/student/OutpassPage";
import MessMenuPage from "./pages/student/MessMenuPage";

// Mess Management Pages
import MessDashboardPage from "./pages/mess/MessDashboardPage";
import MealTrackingPage from "./pages/mess/MealTrackingPage";

// Admin Pages
import AdminDashboardPage from "./pages/admin/AdminDashboardPage";
import OutpassApprovalPage from "./pages/admin/OutpassApprovalPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Auth Routes */}
          <Route path="/" element={<Index />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          
          {/* Student Routes */}
          <Route path="/student" element={<StudentDashboardPage />} />
          <Route path="/student/outpass" element={<OutpassPage />} />
          <Route path="/student/mess-menu" element={<MessMenuPage />} />
          
          {/* Mess Management Routes */}
          <Route path="/mess" element={<MessDashboardPage />} />
          <Route path="/mess/tracking" element={<MealTrackingPage />} />
          
          {/* Admin Routes */}
          <Route path="/admin" element={<AdminDashboardPage />} />
          <Route path="/admin/outpass" element={<OutpassApprovalPage />} />
          
          {/* 404 Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

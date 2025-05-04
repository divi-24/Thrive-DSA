import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { AnimatePresence } from "framer-motion";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";
import Platform from "./pages/Platform";
import Social from "./pages/Social";
import Notes from "./pages/Notes";
import Solutions from "./pages/Solutions";
import Profile from "./pages/Profile";
import Dashboard from './pages/Dashboard';
import Leaderboard from './pages/Leaderboard';
import SolutionNew from './pages/SolutionNew';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner position="top-right" closeButton theme="dark" />
        <BrowserRouter>
          <AuthProvider>
            <AnimatePresence mode="wait" initial={false}>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/platform/:platform" element={<Platform />} />
                <Route path="/social" element={<Social />} />
                <Route path="/notes" element={<Notes />} />
                <Route path="/solutions" element={<Solutions />} />
                <Route path="/solutions/new" element={<SolutionNew />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/leaderboard" element={<Leaderboard />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </AnimatePresence>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;

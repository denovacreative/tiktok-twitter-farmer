
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ScreenMirrorPage from "./pages/ScreenMirrorPage";
import DevicesPage from "./pages/Devices";
import AccountPage from "./pages/Account";
import StatisticsPage from "./pages/Statistics";
import HelpPage from "./pages/Help";
import DeviceControlPage from "./pages/DeviceControlPage";
import Settings from "./pages/Settings"; // Import the Settings component

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/devices" element={<DevicesPage />} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/statistics" element={<StatisticsPage />} />
          <Route path="/help" element={<HelpPage />} />
          <Route path="/device/:deviceId/mirror" element={<ScreenMirrorPage />} />
          <Route path="/device/:deviceId/control" element={<DeviceControlPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

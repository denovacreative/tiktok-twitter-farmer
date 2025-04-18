import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, Power, RefreshCw, Smartphone, Zap, WifiOff, Settings, PlayCircle, PauseCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import AppHeader from '@/components/AppHeader';
import { toast } from '@/hooks/use-toast';
import AutomatedTasks from '@/components/device/AutomatedTasks';

// Komponen untuk tombol kontrol
const ControlButton = ({ icon, label, onClick, variant = "outline" }: { 
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  variant?: "outline" | "secondary" | "destructive" | "default";
}) => (
  <Button 
    variant={variant} 
    className="flex-1 flex-col h-auto py-4"
    onClick={onClick}
  >
    <div className="flex flex-col items-center gap-2">
      {icon}
      <span className="text-xs">{label}</span>
    </div>
  </Button>
);

const DeviceControlPage = () => {
  const { deviceId } = useParams();
  const navigate = useNavigate();
  
  // Dummy data untuk demo - pada implementasi nyata, ini akan diambil dari API/state
  const device = {
    id: deviceId,
    name: `Device ${deviceId?.split('-').pop()}`,
    platform: deviceId?.split('-')[0] || 'unknown',
    status: Math.random() > 0.3 ? 'online' : 'offline',
    uptime: Math.floor(Math.random() * 48) + 1,
    lastActive: new Date().toISOString(),
    tasks: Math.floor(Math.random() * 100),
    performanceScore: Math.floor(Math.random() * 100),
    ip: `192.168.1.${Math.floor(Math.random() * 255)}`,
    battery: Math.floor(Math.random() * 100),
  };

  const platformName = device.platform === 'tiktok' ? 'TikTok' : 
                       device.platform === 'twitter' ? 'Twitter' : 
                       device.platform.charAt(0).toUpperCase() + device.platform.slice(1);
  
  const handleControl = (action: string) => {
    toast({
      title: `${action} ${device.name}`,
      description: `Perintah ${action} sedang diproses`,
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <AppHeader />
      
      <main className="container mx-auto px-4 py-6">
        <div className="flex items-center mb-6">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <div className="ml-2">
            <h1 className="text-2xl font-bold">{device.name}</h1>
            <p className="text-muted-foreground">{platformName} Device Control</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Device Control</CardTitle>
              <CardDescription>Kontrol dan automasi perangkat</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                <ControlButton 
                  icon={<Power className="h-6 w-6" />} 
                  label="Power"
                  onClick={() => handleControl("Power Toggle")}
                  variant="default"
                />
                <ControlButton 
                  icon={<RefreshCw className="h-6 w-6" />} 
                  label="Restart"
                  onClick={() => handleControl("Restart")}
                />
                <ControlButton 
                  icon={<Zap className="h-6 w-6" />} 
                  label="Boost"
                  onClick={() => handleControl("Performance Boost")}
                />
                <ControlButton 
                  icon={<WifiOff className="h-6 w-6" />} 
                  label="Network"
                  onClick={() => handleControl("Network Toggle")}
                />
                <ControlButton 
                  icon={<Settings className="h-6 w-6" />} 
                  label="Settings"
                  onClick={() => handleControl("Settings")}
                />
                <ControlButton 
                  icon={<Smartphone className="h-6 w-6" />} 
                  label="Apps"
                  onClick={() => handleControl("Open Apps")}
                />
                <ControlButton 
                  icon={<PlayCircle className="h-6 w-6" />} 
                  label="Start Tasks"
                  onClick={() => handleControl("Start Tasks")}
                />
                <ControlButton 
                  icon={<PauseCircle className="h-6 w-6" />} 
                  label="Pause Tasks"
                  onClick={() => handleControl("Pause Tasks")}
                />
              </div>
              
              <Separator className="my-6" />
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Scheduled Tasks</h3>
                <p className="text-sm text-muted-foreground">
                  Task automation akan tersedia dalam update mendatang.
                </p>
                <Button className="w-full" variant="outline" disabled>
                  Configure Scheduled Tasks
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Device Info</CardTitle>
              <CardDescription>Status dan informasi perangkat</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-2">
                  <div className="text-sm font-medium">Status</div>
                  <div className="text-sm text-right">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      device.status === 'online' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {device.status}
                    </span>
                  </div>
                  <div className="text-sm font-medium">IP Address</div>
                  <div className="text-sm text-right">{device.ip}</div>
                  <div className="text-sm font-medium">Battery</div>
                  <div className="text-sm text-right">{device.battery}%</div>
                  <div className="text-sm font-medium">Uptime</div>
                  <div className="text-sm text-right">{device.uptime} hours</div>
                  <div className="text-sm font-medium">Last Active</div>
                  <div className="text-sm text-right">
                    {new Date(device.lastActive).toLocaleString('id-ID', {
                      hour: '2-digit',
                      minute: '2-digit',
                      day: '2-digit',
                      month: '2-digit',
                    })}
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" size="sm" onClick={() => navigate(`/device/${deviceId}/mirror`)}>
                Screen Mirror
              </Button>
              <Button variant="secondary" size="sm" onClick={() => navigate(`/devices`)}>
                Back to Devices
              </Button>
            </CardFooter>
          </Card>
          
          <div className="md:col-span-3">
            <AutomatedTasks deviceId={deviceId || ''} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default DeviceControlPage;

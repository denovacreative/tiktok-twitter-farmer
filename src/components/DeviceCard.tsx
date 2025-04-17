
import React from 'react';
import { Smartphone, Battery, Clock, Wifi, WifiOff, MoreVertical, MonitorSmartphone, Gamepad2 } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useNavigate } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { toast } from '@/hooks/use-toast';

interface Device {
  id: string;
  name: string;
  platform: string;
  status: 'online' | 'offline';
  uptime: number;
  lastActive: string;
  tasks: number;
  performanceScore: number;
  ip: string;
  battery: number;
}

interface DeviceCardProps {
  device: Device;
}

const DeviceCard: React.FC<DeviceCardProps> = ({ device }) => {
  const navigate = useNavigate();
  
  const formatTime = (date: string) => {
    return new Date(date).toLocaleTimeString('id-ID', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };
  
  const handleAction = (action: string) => {
    toast({
      title: `${action} ${device.name}`,
      description: "Fitur ini akan segera tersedia",
    });
  };

  const handleScreenMirror = () => {
    navigate(`/device/${device.id}/mirror`);
  };

  const handleControl = () => {
    navigate(`/device/${device.id}/control`);
  };

  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case 'tiktok': return 'bg-pink-500';
      case 'twitter': return 'bg-blue-500';
      default: return 'bg-purple-500';
    }
  };

  const statusColor = device.status === 'online' 
    ? getPlatformColor(device.platform)
    : 'bg-gray-400';

  const batteryColor = 
    device.battery > 70 ? 'bg-green-500' : 
    device.battery > 30 ? 'bg-yellow-500' : 
    'bg-red-500';

  const getPlatformName = (platform: string) => {
    switch (platform) {
      case 'tiktok': return 'TikTok';
      case 'twitter': return 'Twitter';
      default: return platform.charAt(0).toUpperCase() + platform.slice(1);
    }
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader className="p-4 pb-0 flex flex-row justify-between items-start space-y-0">
        <div className="flex flex-col space-y-1.5">
          <div className="flex items-center space-x-2">
            <div className={`h-2 w-2 rounded-full ${statusColor}`} />
            <span className="font-medium text-sm">
              {device.name}
            </span>
          </div>
          <div className="flex items-center space-x-1 text-xs text-muted-foreground">
            <Smartphone className="h-3 w-3" />
            <span>{device.ip}</span>
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreVertical className="h-4 w-4" />
              <span className="sr-only">Menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Opsi Perangkat</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleScreenMirror}>
              <MonitorSmartphone className="h-4 w-4 mr-2" />
              Screen Mirror
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleControl}>
              <Gamepad2 className="h-4 w-4 mr-2" />
              Control Panel
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleAction("Restart")}>Restart</DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleAction("Settings")}>Pengaturan</DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleAction("Details")}>Lihat Detail</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-500" onClick={() => handleAction("Delete")}>
              Hapus
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent className="p-4">
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="flex flex-col">
            <span className="text-muted-foreground">Status</span>
            <div className="flex items-center space-x-1 mt-1">
              {device.status === 'online' ? (
                <Wifi className="h-3 w-3 text-green-500" />
              ) : (
                <WifiOff className="h-3 w-3 text-red-500" />
              )}
              <span className="capitalize">{device.status}</span>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-muted-foreground">Uptime</span>
            <div className="flex items-center space-x-1 mt-1">
              <Clock className="h-3 w-3" />
              <span>{device.uptime}h</span>
            </div>
          </div>
          <div className="flex flex-col mt-2">
            <span className="text-muted-foreground">Last Active</span>
            <span>{formatTime(device.lastActive)}</span>
          </div>
          <div className="flex flex-col mt-2">
            <span className="text-muted-foreground">Tasks</span>
            <span>{device.tasks}</span>
          </div>
        </div>
        
        <div className="mt-4 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">Performance</span>
            <span>{device.performanceScore}%</span>
          </div>
          <Progress value={device.performanceScore} />
          
          <div className="flex items-center justify-between text-xs mt-2">
            <div className="flex items-center space-x-1">
              <Battery className="h-3 w-3" />
              <span className="text-muted-foreground">Battery</span>
            </div>
            <span>{device.battery}%</span>
          </div>
          <Progress value={device.battery} className={batteryColor} />
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <div className="w-full flex space-x-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="w-1/2 text-xs"
            onClick={handleControl}
          >
            <Gamepad2 className="h-3 w-3 mr-1" />
            Control
          </Button>
          <Button 
            variant="default" 
            size="sm" 
            className="w-1/2 text-xs"
            onClick={handleScreenMirror}
          >
            <MonitorSmartphone className="h-3 w-3 mr-1" />
            Mirror
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default DeviceCard;

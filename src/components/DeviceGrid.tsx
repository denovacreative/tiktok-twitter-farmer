
import React from 'react';
import { DownloadCloud, RefreshCw, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import DeviceCard from '@/components/DeviceCard';

// Data dummy untuk perangkat
const generateDevices = (platformId: string, count: number) => {
  return Array.from({ length: count }, (_, i) => ({
    id: `${platformId}-device-${i + 1}`,
    name: `${platformId === 'tiktok' ? 'TikTok' : 'Twitter'} Phone ${i + 1}`,
    platform: platformId,
    status: Math.random() > 0.3 ? 'online' as const : 'offline' as const,
    uptime: Math.floor(Math.random() * 48) + 1,
    lastActive: new Date(Date.now() - Math.floor(Math.random() * 60 * 60 * 1000)).toISOString(),
    tasks: Math.floor(Math.random() * 100),
    performanceScore: Math.floor(Math.random() * 100),
    ip: `192.168.1.${Math.floor(Math.random() * 255)}`,
    battery: Math.floor(Math.random() * 100),
  }));
};

interface DeviceGridProps {
  platformId: string;
}

const DeviceGrid: React.FC<DeviceGridProps> = ({ platformId }) => {
  const devices = generateDevices(platformId, platformId === 'tiktok' ? 12 : 8);
  
  return (
    <div className="space-y-4">
      <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
        <div className="flex items-center space-x-2">
          <h2 className="text-lg font-semibold">
            {platformId === 'tiktok' ? 'TikTok' : 'Twitter'} Devices
          </h2>
          <span className="rounded-full bg-muted px-2 py-1 text-xs">
            {devices.filter((d) => d.status === 'online').length}/{devices.length} online
          </span>
        </div>
        <div className="flex flex-col space-y-2 sm:flex-row sm:space-x-2 sm:space-y-0">
          <Input 
            placeholder="Cari perangkat..." 
            className="h-8 w-full sm:w-[200px]" 
          />
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" className="h-8 px-2">
              <Filter className="h-3.5 w-3.5 mr-2" />
              Filter
            </Button>
            <Button variant="outline" size="sm" className="h-8 w-8 px-0">
              <RefreshCw className="h-3.5 w-3.5" />
              <span className="sr-only">Refresh</span>
            </Button>
            <Button variant="outline" size="sm" className="h-8 w-8 px-0">
              <DownloadCloud className="h-3.5 w-3.5" />
              <span className="sr-only">Export</span>
            </Button>
          </div>
        </div>
      </div>
      
      <Separator />
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {devices.map((device) => (
          <DeviceCard key={device.id} device={device} />
        ))}
      </div>
    </div>
  );
};

export default DeviceGrid;

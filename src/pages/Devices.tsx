
import React, { useState } from 'react';
import { BarChart3, Smartphone, Settings, PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from '@/hooks/use-toast';
import AppHeader from '@/components/AppHeader';
import DeviceGrid from '@/components/DeviceGrid';
import AddDeviceDialog from '@/components/AddDeviceDialog';
import AddPlatformDialog from '@/components/AddPlatformDialog';
import { Link } from 'react-router-dom';

// Data awal untuk platform
const initialPlatforms = [
  { id: 'tiktok', name: 'TikTok', color: 'bg-pink-500', devices: 12, online: 8 },
  { id: 'twitter', name: 'Twitter', color: 'bg-blue-500', devices: 8, online: 5 },
];

const DevicesPage = () => {
  const [platforms, setPlatforms] = useState(initialPlatforms);
  const [selectedPlatform, setSelectedPlatform] = useState(platforms[0].id);
  const [devices, setDevices] = useState<any[]>([]);

  const handleAddPlatform = (newPlatform: any) => {
    setPlatforms([...platforms, newPlatform]);
    toast({
      title: "Platform berhasil ditambahkan",
      description: `Platform ${newPlatform.name} telah ditambahkan ke sistem`,
    });
  };

  const handleAddDevice = (newDevice: any) => {
    setDevices([...devices, newDevice]);
    
    // Update platform device count
    setPlatforms(platforms.map(platform => {
      if (platform.id === newDevice.platform) {
        return {
          ...platform,
          devices: platform.devices + 1,
          online: newDevice.status === 'online' ? platform.online + 1 : platform.online
        };
      }
      return platform;
    }));

    toast({
      title: "Perangkat berhasil ditambahkan",
      description: `Perangkat ${newDevice.name} telah ditambahkan ke sistem`,
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <AppHeader />
      
      <main className="container mx-auto px-4 py-6">
        <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0 mb-6">
          <div>
            <h1 className="text-2xl font-bold">Perangkat</h1>
            <p className="text-muted-foreground">
              Kelola semua perangkat phone farm Anda
            </p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" asChild>
              <Link to="/statistics">
                <BarChart3 className="h-4 w-4 mr-2" />
                Statistik
              </Link>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <Link to="/account">
                <Settings className="h-4 w-4 mr-2" />
                Pengaturan
              </Link>
            </Button>
            <AddPlatformDialog onAddPlatform={handleAddPlatform} />
            <AddDeviceDialog platforms={platforms} onAddDevice={handleAddDevice} />
          </div>
        </div>

        <Tabs value={selectedPlatform} onValueChange={setSelectedPlatform} className="mb-8">
          <TabsList>
            {platforms.map((platform) => (
              <TabsTrigger key={platform.id} value={platform.id}>
                {platform.name}
              </TabsTrigger>
            ))}
          </TabsList>
          {platforms.map((platform) => (
            <TabsContent key={platform.id} value={platform.id}>
              <DeviceGrid 
                platformId={platform.id} 
                customDevices={devices.filter(d => d.platform === platform.id)} 
              />
            </TabsContent>
          ))}
        </Tabs>
      </main>
    </div>
  );
};

export default DevicesPage;

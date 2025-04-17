
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PlusCircle, Settings, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import AppHeader from '@/components/AppHeader';
import DeviceGrid from '@/components/DeviceGrid';
import AddDeviceDialog from '@/components/AddDeviceDialog';
import AddPlatformDialog from '@/components/AddPlatformDialog';

// Data awal untuk platform
const initialPlatforms = [
  { id: 'tiktok', name: 'TikTok', color: 'bg-pink-500', devices: 12, online: 8 },
  { id: 'twitter', name: 'Twitter', color: 'bg-blue-500', devices: 8, online: 5 },
];

const Index = () => {
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
            <h1 className="text-2xl font-bold">Phone Farm Dashboard</h1>
            <p className="text-muted-foreground">
              Kelola dan pantau perangkat phone farm Anda
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {platforms.map((platform) => (
            <Card key={platform.id} className="shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">{platform.name}</CardTitle>
                <CardDescription>
                  {platform.online} dari {platform.devices} perangkat online
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Status</p>
                    <div className="flex items-center">
                      <div className={`${platform.color} h-2 w-2 rounded-full mr-2`}></div>
                      <span className="text-sm">Aktif</span>
                    </div>
                  </div>
                  <div className="text-2xl font-bold">{Math.round((platform.online / platform.devices) * 100) || 0}%</div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="ghost" size="sm" className="w-full" onClick={() => setSelectedPlatform(platform.id)}>
                  Lihat Detail
                </Button>
              </CardFooter>
            </Card>
          ))}
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

export default Index;


import React, { useState, useEffect } from 'react';
import { BarChart3, Smartphone, Settings, PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from '@/hooks/use-toast';
import AppHeader from '@/components/AppHeader';
import DeviceGrid from '@/components/DeviceGrid';
import AddDeviceDialog from '@/components/AddDeviceDialog';
import AddPlatformDialog from '@/components/AddPlatformDialog';
import { Link } from 'react-router-dom';
import { fetchPlatforms, fetchDevices, addPlatform, addDevice } from '@/services/apiService';

const DevicesPage = () => {
  const [platforms, setPlatforms] = useState<any[]>([]);
  const [selectedPlatform, setSelectedPlatform] = useState<string>('');
  const [devices, setDevices] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Memuat data platform dan perangkat dari API
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const platformsResponse = await fetchPlatforms();
        
        if (platformsResponse.success && platformsResponse.data) {
          setPlatforms(platformsResponse.data);
          
          if (platformsResponse.data.length > 0) {
            setSelectedPlatform(platformsResponse.data[0].id);
          }
        } else {
          toast({
            title: "Gagal memuat data platform",
            description: platformsResponse.error || "Terjadi kesalahan pada server",
            variant: "destructive",
          });
          // Gunakan data dummy jika API gagal
          setPlatforms([
            { id: 'tiktok', name: 'TikTok', color: 'bg-pink-500', devices: 12, online: 8 },
            { id: 'twitter', name: 'Twitter', color: 'bg-blue-500', devices: 8, online: 5 },
          ]);
          setSelectedPlatform('tiktok');
        }

        const devicesResponse = await fetchDevices();
        
        if (devicesResponse.success && devicesResponse.data) {
          setDevices(devicesResponse.data);
        }
      } catch (error) {
        toast({
          title: "Gagal terhubung ke server",
          description: "Menggunakan data contoh untuk sementara waktu",
          variant: "destructive",
        });
        
        // Gunakan data dummy jika API gagal
        setPlatforms([
          { id: 'tiktok', name: 'TikTok', color: 'bg-pink-500', devices: 12, online: 8 },
          { id: 'twitter', name: 'Twitter', color: 'bg-blue-500', devices: 8, online: 5 },
        ]);
        setSelectedPlatform('tiktok');
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const handleAddPlatform = async (newPlatform: any) => {
    try {
      const response = await addPlatform(newPlatform);
      
      if (response.success && response.data) {
        setPlatforms([...platforms, response.data]);
        
        toast({
          title: "Platform berhasil ditambahkan",
          description: `Platform ${newPlatform.name} telah ditambahkan ke sistem`,
        });
      } else {
        toast({
          title: "Gagal menambahkan platform",
          description: response.error || "Terjadi kesalahan pada server",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error adding platform:", error);
      toast({
        title: "Gagal menambahkan platform",
        description: "Terjadi kesalahan jaringan",
        variant: "destructive",
      });
    }
  };

  const handleAddDevice = async (newDevice: any) => {
    try {
      const response = await addDevice(newDevice);
      
      if (response.success && response.data) {
        setDevices([...devices, response.data]);
        
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
      } else {
        toast({
          title: "Gagal menambahkan perangkat",
          description: response.error || "Terjadi kesalahan pada server",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error adding device:", error);
      toast({
        title: "Gagal menambahkan perangkat",
        description: "Terjadi kesalahan jaringan",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
        <AppHeader />
        <main className="container mx-auto px-4 py-6">
          <div className="flex justify-center items-center h-64">
            <p className="text-muted-foreground">Memuat data...</p>
          </div>
        </main>
      </div>
    );
  }

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

        {platforms.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Tidak ada platform yang tersedia</p>
            <p className="text-sm text-muted-foreground mt-1">Klik "Platform Baru" untuk menambahkan platform</p>
          </div>
        ) : (
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
        )}
      </main>
    </div>
  );
};

export default DevicesPage;

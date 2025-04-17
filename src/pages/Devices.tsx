
import React, { useState } from 'react';
import { BarChart3, Smartphone, Settings, PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from '@/hooks/use-toast';
import AppHeader from '@/components/AppHeader';
import DeviceGrid from '@/components/DeviceGrid';

// Dummy data untuk platform
const PLATFORMS = [
  { id: 'tiktok', name: 'TikTok', color: 'bg-pink-500', devices: 12, online: 8 },
  { id: 'twitter', name: 'Twitter', color: 'bg-blue-500', devices: 8, online: 5 },
];

const DevicesPage = () => {
  const [selectedPlatform, setSelectedPlatform] = useState(PLATFORMS[0].id);

  const handleAddDevice = () => {
    toast({
      title: "Fitur akan datang",
      description: "Fungsi untuk menambahkan perangkat akan segera tersedia",
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
            <Button variant="outline" size="sm">
              <BarChart3 className="h-4 w-4 mr-2" />
              Statistik
            </Button>
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4 mr-2" />
              Pengaturan
            </Button>
            <Button size="sm" onClick={handleAddDevice}>
              <PlusCircle className="h-4 w-4 mr-2" />
              Tambah Perangkat
            </Button>
          </div>
        </div>

        <Tabs value={selectedPlatform} onValueChange={setSelectedPlatform} className="mb-8">
          <TabsList>
            {PLATFORMS.map((platform) => (
              <TabsTrigger key={platform.id} value={platform.id}>
                {platform.name}
              </TabsTrigger>
            ))}
          </TabsList>
          {PLATFORMS.map((platform) => (
            <TabsContent key={platform.id} value={platform.id}>
              <DeviceGrid platformId={platform.id} />
            </TabsContent>
          ))}
        </Tabs>
      </main>
    </div>
  );
};

export default DevicesPage;

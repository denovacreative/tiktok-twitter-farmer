
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Smartphone, Maximize2, Minimize2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ScreenMirror from '@/components/ScreenMirror';
import AppHeader from '@/components/AppHeader';

const ScreenMirrorPage = () => {
  const { deviceId } = useParams<{ deviceId: string }>();
  const navigate = useNavigate();
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [deviceInfo, setDeviceInfo] = useState<{
    id: string;
    name: string;
    platform: string;
    status: 'online' | 'offline';
    ipAddress: string;
  } | null>(null);

  useEffect(() => {
    // Simulasi fetch data perangkat
    const fetchDeviceInfo = () => {
      const platformId = deviceId?.split('-')[0];
      const deviceNumber = deviceId?.split('-')[2];
      
      setDeviceInfo({
        id: deviceId || '',
        name: `${platformId === 'tiktok' ? 'TikTok' : 'Twitter'} Phone ${deviceNumber}`,
        platform: platformId || '',
        status: 'online',
        ipAddress: `192.168.1.${Math.floor(Math.random() * 255)}`,
      });
    };

    if (deviceId) {
      fetchDeviceInfo();
    }
  }, [deviceId]);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => {
        setIsFullscreen(true);
      }).catch(err => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().then(() => {
          setIsFullscreen(false);
        }).catch(err => {
          console.error(`Error attempting to exit fullscreen: ${err.message}`);
        });
      }
    }
  };

  // Deteksi perubahan status fullscreen
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  if (!deviceInfo) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
        <AppHeader />
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" onClick={() => navigate('/')}>
              <ArrowLeft className="h-4 w-4 mr-1" />
              Kembali
            </Button>
          </div>
          <div className="mt-10 flex justify-center">
            <p>Loading device information...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      {!isFullscreen && <AppHeader />}
      <main className={`container mx-auto px-4 ${isFullscreen ? 'py-2' : 'py-6'}`}>
        {!isFullscreen && (
          <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between mb-6">
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm" onClick={() => navigate('/')}>
                <ArrowLeft className="h-4 w-4 mr-1" />
                Kembali
              </Button>
              <h1 className="text-2xl font-bold ml-2">Screen Mirroring</h1>
            </div>
          </div>
        )}

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
          <div className="flex items-center space-x-2">
            <Smartphone className="h-5 w-5" />
            <span className="font-medium">{deviceInfo.name}</span>
            <div className={`h-2 w-2 rounded-full ${deviceInfo.platform === 'tiktok' ? 'bg-pink-500' : 'bg-blue-500'}`} />
            <span className="text-sm text-muted-foreground">({deviceInfo.platform})</span>
          </div>
          <div className="flex mt-2 md:mt-0">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={toggleFullscreen}
            >
              {isFullscreen ? (
                <>
                  <Minimize2 className="h-4 w-4 mr-1" />
                  Exit Fullscreen
                </>
              ) : (
                <>
                  <Maximize2 className="h-4 w-4 mr-1" />
                  Fullscreen
                </>
              )}
            </Button>
          </div>
        </div>

        <Separator className="mb-4" />

        <Tabs defaultValue="mirror" className="mb-8">
          <TabsList>
            <TabsTrigger value="mirror">Mirror</TabsTrigger>
            <TabsTrigger value="control">Control</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          <TabsContent value="mirror">
            <div className="mb-4">
              <ScreenMirror deviceId={deviceInfo.id} deviceName={deviceInfo.name} />
            </div>
          </TabsContent>
          <TabsContent value="control">
            <div className="p-8 bg-muted rounded-md text-center">
              <p className="text-muted-foreground">
                Fitur kontrol interaktif akan segera hadir. Gunakan tab Mirror untuk melihat layar perangkat.
              </p>
            </div>
          </TabsContent>
          <TabsContent value="settings">
            <div className="p-8 bg-muted rounded-md text-center">
              <p className="text-muted-foreground">
                Pengaturan mirroring akan segera hadir. Saat ini gunakan konfigurasi default.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default ScreenMirrorPage;

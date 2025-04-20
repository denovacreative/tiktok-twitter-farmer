
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { RefreshCw, Download, ArrowDown } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { API_ENDPOINTS } from '@/config/api';

const VersionSettings = () => {
  const [currentVersion, setCurrentVersion] = useState('1.0.0');
  const [latestVersion, setLatestVersion] = useState<string | null>(null);
  const [checkingUpdate, setCheckingUpdate] = useState(false);
  const [updateAvailable, setUpdateAvailable] = useState(false);
  const [updateProgress, setUpdateProgress] = useState(0);
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateNotes, setUpdateNotes] = useState<string | null>(null);

  useEffect(() => {
    fetchCurrentVersion();
  }, []);

  const fetchCurrentVersion = async () => {
    try {
      // Fetch current version from the backend
      const response = await fetch(API_ENDPOINTS.CHECK_VERSION);
      const data = await response.json();
      if (data.version) {
        setCurrentVersion(data.version);
      }
    } catch (error) {
      console.error('Error fetching version:', error);
    }
  };

  const checkForUpdates = async () => {
    setCheckingUpdate(true);
    try {
      // Check GitHub for updates
      const response = await fetch(API_ENDPOINTS.CHECK_UPDATE);
      const data = await response.json();
      
      if (data.hasUpdate) {
        setLatestVersion(data.latestVersion);
        setUpdateAvailable(true);
        setUpdateNotes(data.releaseNotes || null);
        
        toast({
          title: "Pembaruan Tersedia",
          description: `Versi baru ${data.latestVersion} tersedia untuk diunduh`,
        });
      } else {
        setUpdateAvailable(false);
        toast({
          title: "Tidak Ada Pembaruan",
          description: "Aplikasi Anda sudah menggunakan versi terbaru",
        });
      }
    } catch (error) {
      toast({
        title: "Gagal Memeriksa Pembaruan",
        description: "Terjadi kesalahan saat memeriksa pembaruan",
        variant: "destructive",
      });
    } finally {
      setCheckingUpdate(false);
    }
  };

  const installUpdate = async () => {
    setIsUpdating(true);
    setUpdateProgress(0);
    
    try {
      // Simulate update progress for UX
      const interval = setInterval(() => {
        setUpdateProgress((prev) => {
          if (prev >= 95) {
            clearInterval(interval);
            return 95;
          }
          return prev + 5;
        });
      }, 300);
      
      // Start the update
      const response = await fetch(API_ENDPOINTS.INSTALL_UPDATE, {
        method: 'POST',
      });
      
      clearInterval(interval);
      
      if (response.ok) {
        setUpdateProgress(100);
        setTimeout(() => {
          setIsUpdating(false);
          setUpdateAvailable(false);
          setCurrentVersion(latestVersion || currentVersion);
          toast({
            title: "Berhasil",
            description: "Aplikasi berhasil diperbarui. Restart diperlukan untuk menerapkan perubahan.",
          });
        }, 500);
      } else {
        throw new Error('Failed to install update');
      }
    } catch (error) {
      setIsUpdating(false);
      toast({
        title: "Gagal",
        description: "Gagal menginstal pembaruan",
        variant: "destructive",
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Versi Aplikasi</CardTitle>
        <CardDescription>Kelola versi dan pembaruan aplikasi dari GitHub</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>Versi Saat Ini</Label>
          <Input value={currentVersion} readOnly />
        </div>
        
        {updateAvailable && latestVersion && (
          <div className="space-y-2">
            <Label>Versi Terbaru Tersedia</Label>
            <div className="flex items-center space-x-2">
              <Input value={latestVersion} readOnly className="flex-1" />
              <Button 
                onClick={installUpdate} 
                disabled={isUpdating}
                className="whitespace-nowrap"
              >
                {isUpdating ? (
                  <span className="flex items-center">
                    <ArrowDown className="h-4 w-4 mr-2 animate-bounce" />
                    Mengunduh...
                  </span>
                ) : (
                  <span className="flex items-center">
                    <Download className="h-4 w-4 mr-2" />
                    Instal Update
                  </span>
                )}
              </Button>
            </div>
            
            {updateNotes && (
              <div className="mt-2 rounded-md bg-muted p-3 text-sm">
                <Label className="mb-1 block">Catatan Rilis:</Label>
                <p className="text-muted-foreground whitespace-pre-line">{updateNotes}</p>
              </div>
            )}
          </div>
        )}
        
        {isUpdating && (
          <div className="space-y-2">
            <Label>Progres Pembaruan</Label>
            <Progress value={updateProgress} className="h-2" />
            <p className="text-xs text-muted-foreground">Mengunduh dan menginstal pembaruan ({updateProgress}%)</p>
          </div>
        )}
        
        <Button 
          onClick={checkForUpdates} 
          disabled={checkingUpdate || isUpdating}
          variant="outline"
          className="w-full"
        >
          <RefreshCw className={`h-4 w-4 mr-2 ${checkingUpdate ? "animate-spin" : ""}`} />
          {checkingUpdate ? 'Memeriksa...' : 'Periksa Pembaruan dari GitHub'}
        </Button>
      </CardContent>
    </Card>
  );
};

export default VersionSettings;

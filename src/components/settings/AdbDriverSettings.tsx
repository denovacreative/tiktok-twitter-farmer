
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Wrench, Usb, ArrowDown, Download } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { API_ENDPOINTS } from '@/config/api';

const AdbDriverSettings = () => {
  const [driverStatus, setDriverStatus] = useState<'checking' | 'installed' | 'not_installed'>('checking');
  const [installProgress, setInstallProgress] = useState(0);
  const [isInstalling, setIsInstalling] = useState(false);

  useEffect(() => {
    checkDriverStatus();
  }, []);

  const checkDriverStatus = async () => {
    setDriverStatus('checking');
    try {
      const response = await fetch(`${API_ENDPOINTS.CHECK_ADB_DRIVER}`);
      const data = await response.json();
      setDriverStatus(data.installed ? 'installed' : 'not_installed');
    } catch (error) {
      console.error('Error checking driver status:', error);
      setDriverStatus('not_installed');
      toast({
        title: "Kesalahan",
        description: "Tidak dapat memeriksa status driver ADB",
        variant: "destructive",
      });
    }
  };

  const installDriver = async () => {
    setIsInstalling(true);
    setInstallProgress(0);
    
    try {
      // Simulate installation progress
      const interval = setInterval(() => {
        setInstallProgress((prev) => {
          if (prev >= 95) {
            clearInterval(interval);
            return 95;
          }
          return prev + 5;
        });
      }, 300);

      // Actual installation call
      const response = await fetch(`${API_ENDPOINTS.INSTALL_ADB_DRIVER}`, {
        method: 'POST',
      });
      
      clearInterval(interval);
      
      if (response.ok) {
        setInstallProgress(100);
        setTimeout(() => {
          setDriverStatus('installed');
          setIsInstalling(false);
          toast({
            title: "Berhasil",
            description: "Driver ADB berhasil diinstal",
          });
        }, 500);
      } else {
        throw new Error('Failed to install driver');
      }
    } catch (error) {
      setIsInstalling(false);
      setInstallProgress(0);
      toast({
        title: "Gagal",
        description: "Gagal menginstal driver ADB",
        variant: "destructive",
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>ADB Driver</CardTitle>
        <CardDescription>Kelola driver Android Debug Bridge untuk koneksi perangkat</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label>Status Driver</Label>
            <div className="text-sm">
              {driverStatus === 'checking' && "Memeriksa status driver..."}
              {driverStatus === 'installed' && 
                <span className="text-green-600 font-medium flex items-center">
                  <Usb className="h-4 w-4 mr-1" /> 
                  Driver ADB terinstal
                </span>
              }
              {driverStatus === 'not_installed' && 
                <span className="text-red-600 font-medium flex items-center">
                  <Wrench className="h-4 w-4 mr-1" /> 
                  Driver ADB tidak terinstal
                </span>
              }
            </div>
          </div>
          <Button 
            onClick={driverStatus === 'installed' ? checkDriverStatus : installDriver}
            disabled={isInstalling || driverStatus === 'checking'}
            variant={driverStatus === 'installed' ? "outline" : "default"}
          >
            {driverStatus === 'installed' ? "Periksa Ulang" : isInstalling ? "Menginstall..." : "Instal Driver ADB"}
          </Button>
        </div>

        {isInstalling && (
          <div className="space-y-2">
            <Label>Progres Instalasi</Label>
            <Progress value={installProgress} className="h-2" />
            <p className="text-xs text-muted-foreground">Mengunduh dan menginstal driver ({installProgress}%)</p>
          </div>
        )}

        <div className="rounded-md bg-muted p-4 text-sm">
          <p className="text-muted-foreground">
            Driver ADB diperlukan untuk mendeteksi dan mengelola perangkat Android. 
            Pastikan perangkat terhubung dalam mode USB debugging.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdbDriverSettings;

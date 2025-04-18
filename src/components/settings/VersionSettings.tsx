
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';

const VersionSettings = () => {
  const currentVersion = '1.0.0'; // Ini akan diambil dari backend nantinya
  const [checkingUpdate, setCheckingUpdate] = React.useState(false);

  const checkForUpdates = async () => {
    setCheckingUpdate(true);
    try {
      // Implementasi pengecekan update dari backend Rust
      const response = await fetch('http://127.0.0.1:8000/api/check-update');
      const data = await response.json();
      
      if (data.hasUpdate) {
        toast({
          title: "Pembaruan Tersedia",
          description: `Versi baru ${data.latestVersion} tersedia untuk diunduh`,
        });
      } else {
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

  return (
    <Card>
      <CardHeader>
        <CardTitle>Versi Aplikasi</CardTitle>
        <CardDescription>Kelola versi dan pembaruan aplikasi</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>Versi Saat Ini</Label>
          <Input value={currentVersion} readOnly />
        </div>
        <Button 
          onClick={checkForUpdates} 
          disabled={checkingUpdate}
        >
          {checkingUpdate ? 'Memeriksa...' : 'Periksa Pembaruan'}
        </Button>
      </CardContent>
    </Card>
  );
};

export default VersionSettings;

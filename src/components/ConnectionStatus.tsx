
import React, { useState, useEffect } from 'react';
import { Wifi, WifiOff } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const API_URL = "http://localhost:3000/api/status"; // Ganti dengan URL endpoint status backend Anda

const ConnectionStatus: React.FC = () => {
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [isChecking, setIsChecking] = useState<boolean>(true);

  // Periksa koneksi ke backend
  const checkConnection = async () => {
    try {
      setIsChecking(true);
      const response = await fetch(API_URL, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      // Jika berhasil terhubung, status akan menjadi "Connected"
      if (response.ok) {
        setIsConnected(true);
      } else {
        setIsConnected(false);
      }
    } catch (error) {
      console.error("Connection check error:", error);
      setIsConnected(false);
    } finally {
      setIsChecking(false);
    }
  };

  // Periksa koneksi saat komponen dimuat
  useEffect(() => {
    checkConnection();

    // Set interval untuk memeriksa koneksi secara berkala
    const intervalId = setInterval(checkConnection, 30000); // Periksa setiap 30 detik

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  // Tampilkan notifikasi saat status koneksi berubah
  useEffect(() => {
    if (!isChecking) {
      if (isConnected) {
        toast({
          title: "Terhubung ke Server",
          description: "Aplikasi berhasil terhubung ke server backend",
        });
      } else {
        toast({
          title: "Koneksi Terputus",
          description: "Tidak dapat terhubung ke server backend. Data mungkin tidak terbarui.",
          variant: "destructive",
        });
      }
    }
  }, [isConnected, isChecking]);

  return (
    <div className="flex items-center space-x-1">
      {isConnected ? (
        <>
          <Wifi className="h-4 w-4 text-green-500" />
          <span className="text-xs text-green-500">Terhubung</span>
        </>
      ) : (
        <>
          <WifiOff className="h-4 w-4 text-red-500" />
          <span className="text-xs text-red-500">Terputus</span>
        </>
      )}
      <button 
        onClick={checkConnection} 
        className="text-xs underline ml-1 text-muted-foreground"
        disabled={isChecking}
      >
        {isChecking ? 'Memeriksa...' : 'Periksa'}
      </button>
    </div>
  );
};

export default ConnectionStatus;

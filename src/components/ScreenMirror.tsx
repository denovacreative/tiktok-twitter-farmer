
import React, { useState, useEffect } from 'react';
import { Play, Pause, RefreshCw, Smartphone, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { toast } from '@/hooks/use-toast';

interface ScreenMirrorProps {
  deviceId: string;
  deviceName: string;
}

const ScreenMirror: React.FC<ScreenMirrorProps> = ({ deviceId, deviceName }) => {
  const [isStreaming, setIsStreaming] = useState(false);
  const [connectionQuality, setConnectionQuality] = useState(85);
  const [isLoading, setIsLoading] = useState(false);

  // Simulate connection quality fluctuation
  useEffect(() => {
    const interval = setInterval(() => {
      if (isStreaming) {
        setConnectionQuality(prev => {
          const fluctuation = Math.random() * 10 - 5; // -5 to +5
          const newQuality = Math.max(40, Math.min(100, prev + fluctuation));
          return Math.floor(newQuality);
        });
      }
    }, 3000);
    
    return () => clearInterval(interval);
  }, [isStreaming]);

  const handleStartStream = () => {
    setIsLoading(true);
    // Simulasi koneksi
    setTimeout(() => {
      setIsStreaming(true);
      setIsLoading(false);
      toast({
        title: "Streaming dimulai",
        description: `Terhubung ke ${deviceName}`,
      });
    }, 1500);
  };

  const handleStopStream = () => {
    setIsStreaming(false);
    toast({
      title: "Streaming dihentikan",
      description: `Terputus dari ${deviceName}`,
    });
  };

  const handleRefreshConnection = () => {
    setIsLoading(true);
    setIsStreaming(false);
    
    setTimeout(() => {
      setIsStreaming(true);
      setIsLoading(false);
      setConnectionQuality(Math.floor(Math.random() * 30) + 70); // 70-100
      toast({
        title: "Koneksi disegarkan",
        description: "Kualitas streaming ditingkatkan",
      });
    }, 2000);
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-medium flex items-center">
          <Smartphone className="h-5 w-5 mr-2" />
          {deviceName}
        </CardTitle>
        <div className="flex items-center space-x-2">
          <div className="text-xs text-muted-foreground">
            ID: {deviceId}
          </div>
          <div className="text-xs flex items-center">
            Kualitas: 
            <span className={`ml-1 font-medium ${
              connectionQuality > 70 ? 'text-green-500' : 
              connectionQuality > 50 ? 'text-yellow-500' : 
              'text-red-500'
            }`}>
              {connectionQuality}%
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="relative bg-black rounded-md aspect-[16/9] w-full overflow-hidden">
          {isStreaming ? (
            <div className="w-full h-full">
              {/* Placeholder untuk stream video */}
              <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-white mb-2">Live Preview</p>
                  <p className="text-gray-400 text-sm">Streaming dari {deviceName}</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="w-full h-full bg-gray-800 flex items-center justify-center">
              <div className="text-center">
                <Smartphone className="w-16 h-16 mx-auto text-gray-500 mb-2" />
                <p className="text-gray-400">Preview tidak tersedia</p>
                <p className="text-gray-500 text-sm mt-1">Klik tombol Play untuk memulai</p>
              </div>
            </div>
          )}
          
          {isLoading && (
            <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
              <div className="text-center">
                <RefreshCw className="w-8 h-8 mx-auto text-white mb-2 animate-spin" />
                <p className="text-white">Menghubungkan...</p>
              </div>
            </div>
          )}
        </div>
        
        <div className="flex space-x-2 justify-between">
          <div className="space-y-1 w-1/2">
            <div className="text-xs">Kualitas Koneksi</div>
            <Progress 
              value={connectionQuality} 
              className={`h-2 ${
                connectionQuality > 70 ? 'bg-green-500' : 
                connectionQuality > 50 ? 'bg-yellow-500' : 
                'bg-red-500'
              }`} 
            />
          </div>
          <div className="flex space-x-2">
            {!isStreaming ? (
              <Button 
                variant="default" 
                size="sm" 
                onClick={handleStartStream}
                disabled={isLoading}
              >
                <Play className="h-4 w-4 mr-1" />
                Mulai Streaming
              </Button>
            ) : (
              <>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={handleRefreshConnection}
                  disabled={isLoading}
                >
                  <RefreshCw className="h-4 w-4 mr-1" />
                  Refresh
                </Button>
                <Button 
                  variant="destructive" 
                  size="sm"
                  onClick={handleStopStream}
                  disabled={isLoading}
                >
                  <Pause className="h-4 w-4 mr-1" />
                  Stop
                </Button>
              </>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ScreenMirror;

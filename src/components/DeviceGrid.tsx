
import React, { useState } from 'react';
import { DownloadCloud, RefreshCw, Filter, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import DeviceCard from '@/components/DeviceCard';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';

// Data dummy untuk perangkat
const generateDevices = (platformId: string, count: number) => {
  return Array.from({ length: count }, (_, i) => ({
    id: `${platformId}-device-${i + 1}`,
    name: `${platformId === 'tiktok' ? 'TikTok' : 'Twitter'} Phone ${i + 1}`,
    platform: platformId,
    status: Math.random() > 0.3 ? 'online' as const : 'offline' as const,
    uptime: Math.floor(Math.random() * 48) + 1,
    lastActive: new Date(Date.now() - Math.floor(Math.random() * 60 * 60 * 1000)).toISOString(),
    tasks: Math.floor(Math.random() * 100),
    performanceScore: Math.floor(Math.random() * 100),
    ip: `192.168.1.${Math.floor(Math.random() * 255)}`,
    battery: Math.floor(Math.random() * 100),
  }));
};

interface DeviceGridProps {
  platformId: string;
  customDevices?: any[];
}

type FilterOption = 'all' | 'online' | 'offline' | 'low-battery' | 'high-performance';

const DeviceGrid: React.FC<DeviceGridProps> = ({ platformId, customDevices = [] }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilters, setSelectedFilters] = useState<FilterOption[]>(['all']);
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  // Gabungkan perangkat yang di-generate dengan perangkat kustom
  const generatedDevices = generateDevices(
    platformId, 
    platformId === 'tiktok' ? 12 : (platformId === 'twitter' ? 8 : 0)
  );
  
  const allDevices = [...generatedDevices, ...customDevices.filter(d => d.platform === platformId)];
  
  // Filter perangkat berdasarkan pencarian dan filter yang dipilih
  const filteredDevices = allDevices.filter(device => {
    // Pencarian berdasarkan nama atau IP
    const matchesSearch = 
      device.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      device.ip.includes(searchTerm);
    
    if (!matchesSearch) return false;
    
    // Jika 'all' dipilih, tampilkan semua perangkat yang cocok dengan pencarian
    if (selectedFilters.includes('all')) return true;
    
    // Filter berdasarkan status
    if (selectedFilters.includes('online') && device.status === 'online') return true;
    if (selectedFilters.includes('offline') && device.status === 'offline') return true;
    
    // Filter berdasarkan baterai rendah (< 30%)
    if (selectedFilters.includes('low-battery') && device.battery < 30) return true;
    
    // Filter berdasarkan performa tinggi (> 70%)
    if (selectedFilters.includes('high-performance') && device.performanceScore > 70) return true;
    
    return false;
  });
  
  const platformName = platformId === 'tiktok' ? 'TikTok' : 
                      platformId === 'twitter' ? 'Twitter' : 
                      platformId.charAt(0).toUpperCase() + platformId.slice(1);
  
  const handleFilterChange = (filter: FilterOption) => {
    setSelectedFilters(current => {
      // Jika memilih 'all', hapus filter lain
      if (filter === 'all') return ['all'];
      
      // Jika memilih filter lain, hapus 'all'
      const withoutAll = current.filter(f => f !== 'all');
      
      // Toggle filter yang dipilih
      if (withoutAll.includes(filter)) {
        const result = withoutAll.filter(f => f !== filter);
        // Jika tidak ada filter yang dipilih, kembalikan ke 'all'
        return result.length === 0 ? ['all'] : result;
      } else {
        return [...withoutAll, filter];
      }
    });
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    // Simulasi refresh data
    setTimeout(() => {
      setIsRefreshing(false);
    }, 800);
  };

  const handleExport = () => {
    const dataStr = JSON.stringify(filteredDevices, null, 2);
    const dataUri = `data:application/json;charset=utf-8,${encodeURIComponent(dataStr)}`;
    
    const exportFileDefaultName = `${platformName.toLowerCase()}-devices.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };
  
  return (
    <div className="space-y-4">
      <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
        <div className="flex items-center space-x-2">
          <h2 className="text-lg font-semibold">
            {platformName} Devices
          </h2>
          <span className="rounded-full bg-muted px-2 py-1 text-xs">
            {filteredDevices.filter((d) => d.status === 'online').length}/{filteredDevices.length} online
          </span>
        </div>
        <div className="flex flex-col space-y-2 sm:flex-row sm:space-x-2 sm:space-y-0">
          <Input 
            placeholder="Cari perangkat..." 
            className="h-8 w-full sm:w-[200px]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="flex space-x-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-8">
                  <Filter className="h-3.5 w-3.5 mr-2" />
                  Filter
                  {selectedFilters.length > 0 && selectedFilters[0] !== 'all' && (
                    <Badge variant="secondary" className="ml-2 px-1 py-0 h-5">
                      {selectedFilters.length}
                    </Badge>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px]">
                <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
                <DropdownMenuCheckboxItem
                  checked={selectedFilters.includes('all')}
                  onCheckedChange={() => handleFilterChange('all')}
                >
                  All Devices
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={selectedFilters.includes('online')}
                  onCheckedChange={() => handleFilterChange('online')}
                >
                  Online
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={selectedFilters.includes('offline')}
                  onCheckedChange={() => handleFilterChange('offline')}
                >
                  Offline
                </DropdownMenuCheckboxItem>
                <DropdownMenuSeparator />
                <DropdownMenuLabel>Filter by Condition</DropdownMenuLabel>
                <DropdownMenuCheckboxItem
                  checked={selectedFilters.includes('low-battery')}
                  onCheckedChange={() => handleFilterChange('low-battery')}
                >
                  Low Battery (&lt;30%)
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={selectedFilters.includes('high-performance')}
                  onCheckedChange={() => handleFilterChange('high-performance')}
                >
                  High Performance (&gt;70%)
                </DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button 
              variant="outline" 
              size="sm" 
              className="h-8 w-8 px-0"
              onClick={handleRefresh}
              disabled={isRefreshing}
            >
              <RefreshCw className={`h-3.5 w-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
              <span className="sr-only">Refresh</span>
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="h-8 w-8 px-0"
              onClick={handleExport}
            >
              <DownloadCloud className="h-3.5 w-3.5" />
              <span className="sr-only">Export</span>
            </Button>
          </div>
        </div>
      </div>
      
      <Separator />
      
      {filteredDevices.length === 0 ? (
        <div className="py-12 text-center">
          <p className="text-muted-foreground">Tidak ada perangkat yang ditemukan.</p>
          <p className="text-sm text-muted-foreground mt-1">Coba ubah pencarian atau filter Anda.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredDevices.map((device) => (
            <DeviceCard key={device.id} device={device} />
          ))}
        </div>
      )}
    </div>
  );
};

export default DeviceGrid;

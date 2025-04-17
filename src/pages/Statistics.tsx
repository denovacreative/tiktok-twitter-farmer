
import React from 'react';
import { Calendar, BarChart2, PieChart, ArrowUpRight, ArrowDownRight, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LineChart, Line, BarChart, Bar, PieChart as RechartsPC, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppHeader from '@/components/AppHeader';

// Data untuk grafik
const deviceActivityData = [
  { name: 'Senin', tiktok: 40, twitter: 24 },
  { name: 'Selasa', tiktok: 30, twitter: 28 },
  { name: 'Rabu', tiktok: 45, twitter: 30 },
  { name: 'Kamis', tiktok: 50, twitter: 32 },
  { name: 'Jumat', tiktok: 55, twitter: 35 },
  { name: 'Sabtu', tiktok: 60, twitter: 40 },
  { name: 'Minggu', tiktok: 65, twitter: 45 },
];

const platformDistributionData = [
  { name: 'TikTok', value: 65 },
  { name: 'Twitter', value: 35 },
];

const COLORS = ['#ff5c8e', '#1d9bf0'];

const performanceData = [
  { name: 'Hari 1', performance: 78 },
  { name: 'Hari 2', performance: 80 },
  { name: 'Hari 3', performance: 85 },
  { name: 'Hari 4', performance: 82 },
  { name: 'Hari 5', performance: 88 },
  { name: 'Hari 6', performance: 90 },
  { name: 'Hari 7', performance: 92 },
];

const StatisticsPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <AppHeader />
      
      <main className="container mx-auto px-4 py-6">
        <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0 mb-6">
          <div>
            <h1 className="text-2xl font-bold">Statistik</h1>
            <p className="text-muted-foreground">
              Analisis kinerja dan aktivitas perangkat Anda
            </p>
          </div>
          <div className="flex space-x-2">
            <Select defaultValue="week">
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Pilih periode" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="day">Hari Ini</SelectItem>
                <SelectItem value="week">Minggu Ini</SelectItem>
                <SelectItem value="month">Bulan Ini</SelectItem>
                <SelectItem value="year">Tahun Ini</SelectItem>
              </SelectContent>
            </Select>
            <Button size="sm" variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Ekspor
            </Button>
          </div>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Perangkat</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">20</div>
              <p className="text-xs text-muted-foreground">+3 dari bulan lalu</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Perangkat Aktif</CardTitle>
              <BarChart2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">13</div>
              <div className="text-xs flex items-center text-green-500">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                <span>+15% dari kemarin</span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Rata-rata Uptime</CardTitle>
              <PieChart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">18.5 jam</div>
              <div className="text-xs flex items-center text-red-500">
                <ArrowDownRight className="h-3 w-3 mr-1" />
                <span>-2% dari kemarin</span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Kesehatan Perangkat</CardTitle>
              <BarChart2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">92%</div>
              <div className="text-xs flex items-center text-green-500">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                <span>+3% dari minggu lalu</span>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="activity" className="space-y-4">
          <TabsList>
            <TabsTrigger value="activity">Aktivitas Perangkat</TabsTrigger>
            <TabsTrigger value="performance">Kinerja</TabsTrigger>
            <TabsTrigger value="distribution">Distribusi Platform</TabsTrigger>
          </TabsList>
          <TabsContent value="activity" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Aktivitas Perangkat Harian</CardTitle>
                <CardDescription>
                  Jumlah perangkat aktif berdasarkan platform
                </CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={deviceActivityData}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="tiktok" name="TikTok" fill="#ff5c8e" />
                    <Bar dataKey="twitter" name="Twitter" fill="#1d9bf0" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="performance" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Kinerja Rata-rata</CardTitle>
                <CardDescription>
                  Persentase kinerja seluruh perangkat
                </CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={performanceData}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="performance"
                      stroke="#8884d8"
                      activeDot={{ r: 8 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="distribution" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Distribusi Platform</CardTitle>
                <CardDescription>
                  Persebaran perangkat berdasarkan platform
                </CardDescription>
              </CardHeader>
              <CardContent className="h-[300px] flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsPC>
                    <Pie
                      data={platformDistributionData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      fill="#8884d8"
                      paddingAngle={5}
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {platformDistributionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </RechartsPC>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default StatisticsPage;

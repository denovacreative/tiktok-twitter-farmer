
import React from 'react';
import { User, Mail, Phone, Lock, MapPin, Shield, Key, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';
import AppHeader from '@/components/AppHeader';

const AccountPage = () => {
  const handleSave = () => {
    toast({
      title: "Perubahan disimpan",
      description: "Detail akun Anda telah diperbarui",
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <AppHeader />
      
      <main className="container mx-auto px-4 py-6">
        <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0 mb-6">
          <div>
            <h1 className="text-2xl font-bold">Akun Saya</h1>
            <p className="text-muted-foreground">
              Kelola informasi dan keamanan akun Anda
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Informasi Pribadi</CardTitle>
                <CardDescription>Perbarui informasi profil Anda</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nama</Label>
                    <div className="flex">
                      <User className="w-4 h-4 mr-2 mt-3 text-muted-foreground" />
                      <Input id="name" defaultValue="John Doe" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="flex">
                      <Mail className="w-4 h-4 mr-2 mt-3 text-muted-foreground" />
                      <Input id="email" type="email" defaultValue="john.doe@example.com" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Nomor Telepon</Label>
                    <div className="flex">
                      <Phone className="w-4 h-4 mr-2 mt-3 text-muted-foreground" />
                      <Input id="phone" defaultValue="+62 812 3456 7890" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address">Alamat</Label>
                    <div className="flex">
                      <MapPin className="w-4 h-4 mr-2 mt-3 text-muted-foreground" />
                      <Input id="address" defaultValue="Jakarta, Indonesia" />
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSave}>Simpan Perubahan</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Keamanan</CardTitle>
                <CardDescription>Kelola kata sandi dan pengaturan keamanan</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="current-password">Kata Sandi Saat Ini</Label>
                  <div className="flex">
                    <Lock className="w-4 h-4 mr-2 mt-3 text-muted-foreground" />
                    <Input id="current-password" type="password" defaultValue="********" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-password">Kata Sandi Baru</Label>
                  <div className="flex">
                    <Key className="w-4 h-4 mr-2 mt-3 text-muted-foreground" />
                    <Input id="new-password" type="password" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Konfirmasi Kata Sandi Baru</Label>
                  <div className="flex">
                    <Key className="w-4 h-4 mr-2 mt-3 text-muted-foreground" />
                    <Input id="confirm-password" type="password" />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={() => toast({
                  title: "Kata sandi diperbarui",
                  description: "Kata sandi Anda telah berhasil diubah"
                })}>Perbarui Kata Sandi</Button>
              </CardFooter>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Preferensi</CardTitle>
                <CardDescription>Sesuaikan pengalaman pengguna Anda</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="text-sm font-medium">Notifikasi Email</div>
                    <div className="text-xs text-muted-foreground">Terima pembaruan melalui email</div>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => toast({
                    title: "Preferensi disimpan",
                    description: "Pengaturan notifikasi email telah diperbarui"
                  })}>
                    Aktif
                  </Button>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="text-sm font-medium">Tema</div>
                    <div className="text-xs text-muted-foreground">Pilih tampilan yang Anda sukai</div>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => toast({
                    title: "Tema diubah",
                    description: "Tema aplikasi telah diperbarui"
                  })}>
                    Auto
                  </Button>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="text-sm font-medium">Bahasa</div>
                    <div className="text-xs text-muted-foreground">Pilih bahasa aplikasi</div>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => toast({
                    title: "Bahasa diubah",
                    description: "Bahasa aplikasi telah diperbarui"
                  })}>
                    Indonesia
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Status Akun</CardTitle>
                <CardDescription>Informasi mengenai akun Anda</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Shield className="w-4 h-4 text-green-500" />
                  <span className="text-sm">Akun Terverifikasi</span>
                </div>
                <div className="text-sm text-muted-foreground">
                  <p className="mb-2">Bergabung pada: 15 April 2023</p>
                  <p>Paket: Premium</p>
                </div>
                <Button variant="outline" className="w-full" size="sm">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Lihat Detail Paket
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AccountPage;

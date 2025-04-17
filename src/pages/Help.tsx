
import React from 'react';
import { Search, MessageCircle, FileQuestion, FileText, HelpCircle, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { toast } from '@/hooks/use-toast';
import AppHeader from '@/components/AppHeader';

const HelpPage = () => {
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Pencarian",
      description: "Hasil pencarian akan segera ditampilkan",
    });
  };

  const faqItems = [
    {
      question: "Bagaimana cara menambahkan perangkat baru?",
      answer: "Untuk menambahkan perangkat baru, klik tombol 'Tambah Perangkat' yang terletak di bagian atas halaman Perangkat. Kemudian ikuti langkah-langkah yang ditampilkan untuk mengatur perangkat baru Anda."
    },
    {
      question: "Bagaimana cara melihat layar perangkat saya?",
      answer: "Untuk melihat layar perangkat, buka halaman Perangkat, temukan perangkat yang ingin Anda lihat, dan klik tombol 'Mirror' pada kartu perangkat. Ini akan membuka fitur Screen Mirroring yang memungkinkan Anda melihat dan mengontrol perangkat dari jarak jauh."
    },
    {
      question: "Apa yang harus dilakukan jika perangkat offline?",
      answer: "Jika perangkat Anda offline, periksa koneksi internet pada perangkat tersebut. Pastikan perangkat terhubung ke jaringan Wi-Fi atau data seluler. Jika masalah berlanjut, coba restart perangkat atau periksa pengaturan pada tab 'Settings' dari detail perangkat."
    },
    {
      question: "Bagaimana cara mengoptimalkan kinerja perangkat?",
      answer: "Untuk mengoptimalkan kinerja perangkat, pastikan perangkat memiliki baterai yang cukup, koneksi internet yang stabil, dan telah diupdate ke versi terbaru. Anda juga dapat memeriksa halaman Statistik untuk memantau kinerja dan mengidentifikasi masalah potensial."
    },
    {
      question: "Apakah ada batasan jumlah perangkat yang bisa saya kelola?",
      answer: "Jumlah perangkat yang dapat Anda kelola tergantung pada paket langganan Anda. Paket Basic memungkinkan hingga 5 perangkat, Premium hingga 20 perangkat, dan Enterprise untuk lebih dari 20 perangkat. Untuk meningkatkan paket, kunjungi halaman Akun."
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <AppHeader />
      
      <main className="container mx-auto px-4 py-6">
        <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0 mb-6">
          <div>
            <h1 className="text-2xl font-bold">Bantuan</h1>
            <p className="text-muted-foreground">
              Temukan jawaban untuk pertanyaan Anda
            </p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              <MessageCircle className="h-4 w-4 mr-2" />
              Hubungi Dukungan
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="col-span-1 md:col-span-3">
            <CardHeader>
              <CardTitle>Pencarian</CardTitle>
              <CardDescription>Cari jawaban untuk pertanyaan Anda</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSearch} className="flex w-full max-w-lg items-center space-x-2">
                <Input 
                  type="text" 
                  placeholder="Cari pertanyaan atau kata kunci..." 
                  className="flex-1"
                />
                <Button type="submit">
                  <Search className="h-4 w-4 mr-2" />
                  Cari
                </Button>
              </form>
            </CardContent>
          </Card>

          <div className="md:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Pertanyaan yang Sering Diajukan</CardTitle>
                <CardDescription>Jawaban untuk pertanyaan umum</CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {faqItems.map((item, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                      <AccordionTrigger>{item.question}</AccordionTrigger>
                      <AccordionContent>
                        {item.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  <FileQuestion className="h-4 w-4 mr-2" />
                  Lihat Lebih Banyak FAQ
                </Button>
              </CardFooter>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Kontak Dukungan</CardTitle>
                <CardDescription>Dapatkan bantuan dari tim kami</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Button variant="outline" className="w-full" onClick={() => toast({
                    title: "Live Chat",
                    description: "Menghubungkan ke agen dukungan...",
                  })}>
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Live Chat
                  </Button>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" className="w-full" onClick={() => toast({
                    title: "Email Support",
                    description: "Mengarahkan ke formulir email...",
                  })}>
                    <FileText className="h-4 w-4 mr-2" />
                    Email Support
                  </Button>
                </div>
                <Separator />
                <div className="pt-2">
                  <p className="text-sm text-muted-foreground mb-2">Jam Operasional Dukungan:</p>
                  <p className="text-sm">Senin - Jumat: 08:00 - 20:00 WIB</p>
                  <p className="text-sm">Sabtu: 09:00 - 15:00 WIB</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Sumber Daya</CardTitle>
                <CardDescription>Panduan dan dokumentasi</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button variant="outline" className="w-full justify-start" onClick={() => toast({
                  title: "Dokumentasi",
                  description: "Membuka dokumentasi...",
                })}>
                  <FileText className="h-4 w-4 mr-2" />
                  Dokumentasi Pengguna
                </Button>
                <Button variant="outline" className="w-full justify-start" onClick={() => toast({
                  title: "Video Tutorial",
                  description: "Mengarahkan ke kanal YouTube...",
                })}>
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Video Tutorial
                </Button>
                <Button variant="outline" className="w-full justify-start" onClick={() => toast({
                  title: "Pemecahan Masalah",
                  description: "Membuka panduan pemecahan masalah...",
                })}>
                  <HelpCircle className="h-4 w-4 mr-2" />
                  Pemecahan Masalah
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HelpPage;

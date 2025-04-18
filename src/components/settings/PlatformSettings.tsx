
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';

const PlatformSettings = () => {
  const [apiKey, setApiKey] = React.useState('');
  const [saving, setSaving] = React.useState(false);

  const savePlatformSettings = async () => {
    setSaving(true);
    try {
      // Implementasi penyimpanan ke backend Rust
      await fetch('http://127.0.0.1:8000/api/platform-settings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ apiKey }),
      });

      toast({
        title: "Berhasil",
        description: "Pengaturan platform berhasil disimpan",
      });
    } catch (error) {
      toast({
        title: "Gagal",
        description: "Terjadi kesalahan saat menyimpan pengaturan",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Pengaturan Platform</CardTitle>
        <CardDescription>Konfigurasi API dan pengaturan platform</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>API Key Platform</Label>
          <Input
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="Masukkan API key platform"
          />
        </div>
        <Button 
          onClick={savePlatformSettings} 
          disabled={saving || !apiKey}
        >
          {saving ? 'Menyimpan...' : 'Simpan Pengaturan'}
        </Button>
      </CardContent>
    </Card>
  );
};

export default PlatformSettings;

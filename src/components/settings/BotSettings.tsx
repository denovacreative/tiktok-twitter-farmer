
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { toast } from '@/hooks/use-toast';

const BotSettings = () => {
  const [enabled, setEnabled] = React.useState(false);
  const [targetAccount, setTargetAccount] = React.useState('');
  const [commentTemplate, setCommentTemplate] = React.useState('');
  const [saving, setSaving] = React.useState(false);

  const saveBotSettings = async () => {
    setSaving(true);
    try {
      // Implementasi penyimpanan ke backend Rust
      await fetch('http://127.0.0.1:8000/api/bot-settings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          enabled,
          targetAccount,
          commentTemplate,
        }),
      });

      toast({
        title: "Berhasil",
        description: "Pengaturan bot berhasil disimpan",
      });
    } catch (error) {
      toast({
        title: "Gagal",
        description: "Terjadi kesalahan saat menyimpan pengaturan bot",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Pengaturan Bot AI</CardTitle>
        <CardDescription>Konfigurasi bot komentar otomatis</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <Label>Aktifkan Bot AI</Label>
          <Switch
            checked={enabled}
            onCheckedChange={setEnabled}
          />
        </div>
        <div className="space-y-2">
          <Label>Akun Target</Label>
          <Input
            value={targetAccount}
            onChange={(e) => setTargetAccount(e.target.value)}
            placeholder="Username akun target"
          />
        </div>
        <div className="space-y-2">
          <Label>Template Komentar</Label>
          <Textarea
            value={commentTemplate}
            onChange={(e) => setCommentTemplate(e.target.value)}
            placeholder="Template komentar yang akan digenerate oleh AI"
            rows={4}
          />
        </div>
        <Button 
          onClick={saveBotSettings} 
          disabled={saving || !targetAccount || !commentTemplate}
        >
          {saving ? 'Menyimpan...' : 'Simpan Pengaturan Bot'}
        </Button>
      </CardContent>
    </Card>
  );
};

export default BotSettings;

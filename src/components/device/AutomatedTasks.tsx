
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { MessageSquareText, Send, Bot } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface AutomatedTasksProps {
  deviceId: string;
}

const AutomatedTasks = ({ deviceId }: AutomatedTasksProps) => {
  const [commentEnabled, setCommentEnabled] = React.useState(false);
  const [messageEnabled, setMessageEnabled] = React.useState(false);
  const [targetAccount, setTargetAccount] = React.useState('');
  const [customPrompt, setCustomPrompt] = React.useState('');

  const handleStartTask = async (taskType: 'comment' | 'message') => {
    try {
      // Implementasi nanti akan terhubung ke backend Rust
      const response = await fetch(`http://127.0.0.1:8000/api/devices/${deviceId}/tasks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: taskType,
          targetAccount,
          customPrompt,
          enabled: taskType === 'comment' ? commentEnabled : messageEnabled
        }),
      });

      if (response.ok) {
        toast({
          title: "Berhasil",
          description: `Task ${taskType} berhasil diaktifkan`,
        });
      }
    } catch (error) {
      toast({
        title: "Gagal",
        description: "Terjadi kesalahan saat mengaktifkan task",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>Automated Tasks</CardTitle>
        <CardDescription>Konfigurasi tugas otomatis untuk perangkat</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Comment Task */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">Komentar Otomatis</Label>
                <p className="text-sm text-muted-foreground">
                  Aktifkan bot untuk memberikan komentar otomatis
                </p>
              </div>
              <Switch
                checked={commentEnabled}
                onCheckedChange={setCommentEnabled}
              />
            </div>
            {commentEnabled && (
              <div className="space-y-4 border-l-2 pl-4">
                <div className="space-y-2">
                  <Label>Target Akun</Label>
                  <Input
                    value={targetAccount}
                    onChange={(e) => setTargetAccount(e.target.value)}
                    placeholder="Username akun target"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Custom Prompt untuk AI</Label>
                  <Textarea
                    value={customPrompt}
                    onChange={(e) => setCustomPrompt(e.target.value)}
                    placeholder="Berikan instruksi untuk AI dalam menghasilkan komentar"
                    rows={3}
                  />
                </div>
                <Button 
                  onClick={() => handleStartTask('comment')}
                  className="w-full"
                >
                  <MessageSquareText className="mr-2 h-4 w-4" />
                  Mulai Task Komentar
                </Button>
              </div>
            )}
          </div>

          {/* Message Task */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">Pesan Otomatis</Label>
                <p className="text-sm text-muted-foreground">
                  Aktifkan bot untuk mengirim pesan otomatis
                </p>
              </div>
              <Switch
                checked={messageEnabled}
                onCheckedChange={setMessageEnabled}
              />
            </div>
            {messageEnabled && (
              <div className="space-y-4 border-l-2 pl-4">
                <div className="space-y-2">
                  <Label>Target Akun</Label>
                  <Input
                    value={targetAccount}
                    onChange={(e) => setTargetAccount(e.target.value)}
                    placeholder="Username akun target"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Custom Prompt untuk AI</Label>
                  <Textarea
                    value={customPrompt}
                    onChange={(e) => setCustomPrompt(e.target.value)}
                    placeholder="Berikan instruksi untuk AI dalam menghasilkan pesan"
                    rows={3}
                  />
                </div>
                <Button 
                  onClick={() => handleStartTask('message')}
                  className="w-full"
                >
                  <Send className="mr-2 h-4 w-4" />
                  Mulai Task Pesan
                </Button>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AutomatedTasks;

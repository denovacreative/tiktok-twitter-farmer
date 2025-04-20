
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MessageSquareText, Send, Bot, ThumbsUp, UserPlus, Video, Eye } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { API_ENDPOINTS } from '@/config/api';

interface AutomatedTasksProps {
  deviceId: string;
}

const AutomatedTasks = ({ deviceId }: AutomatedTasksProps) => {
  const [activeTab, setActiveTab] = useState('comment');
  
  // Comment task state
  const [commentEnabled, setCommentEnabled] = useState(false);
  const [commentTarget, setCommentTarget] = useState('');
  const [commentPrompt, setCommentPrompt] = useState('');
  const [commentFrequency, setCommentFrequency] = useState('medium');
  
  // Message task state
  const [messageEnabled, setMessageEnabled] = useState(false);
  const [messageTarget, setMessageTarget] = useState('');
  const [messagePrompt, setMessagePrompt] = useState('');
  
  // Like task state
  const [likeEnabled, setLikeEnabled] = useState(false);
  const [likeTarget, setLikeTarget] = useState('');
  const [likeFrequency, setLikeFrequency] = useState('medium');
  
  // Follow task state
  const [followEnabled, setFollowEnabled] = useState(false);
  const [followTarget, setFollowTarget] = useState('');
  const [followLimit, setFollowLimit] = useState('20');
  
  // View task state
  const [viewEnabled, setViewEnabled] = useState(false);
  const [viewTarget, setViewTarget] = useState('');
  const [viewDuration, setViewDuration] = useState('medium');

  const frequencyOptions = {
    slow: 'Lambat (1-3x/jam)',
    medium: 'Sedang (5-10x/jam)',
    fast: 'Cepat (15-20x/jam)'
  };
  
  const durationOptions = {
    short: 'Pendek (10-30 detik)',
    medium: 'Sedang (1-3 menit)',
    long: 'Panjang (5-10 menit)'
  };

  const handleStartTask = async (taskType: string) => {
    let taskData = {};
    
    switch (taskType) {
      case 'comment':
        taskData = {
          type: 'comment',
          targetAccount: commentTarget,
          customPrompt: commentPrompt,
          frequency: commentFrequency,
          enabled: commentEnabled
        };
        break;
      case 'message':
        taskData = {
          type: 'message',
          targetAccount: messageTarget,
          customPrompt: messagePrompt,
          enabled: messageEnabled
        };
        break;
      case 'like':
        taskData = {
          type: 'like',
          targetAccount: likeTarget,
          frequency: likeFrequency,
          enabled: likeEnabled
        };
        break;
      case 'follow':
        taskData = {
          type: 'follow',
          targetAccount: followTarget,
          limit: parseInt(followLimit),
          enabled: followEnabled
        };
        break;
      case 'view':
        taskData = {
          type: 'view',
          targetAccount: viewTarget,
          duration: viewDuration,
          enabled: viewEnabled
        };
        break;
    }
    
    try {
      const response = await fetch(`${API_ENDPOINTS.DEVICE_TASKS(deviceId)}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(taskData),
      });

      if (response.ok) {
        toast({
          title: "Berhasil",
          description: `Task ${taskType} berhasil diaktifkan`,
        });
      } else {
        throw new Error('Failed to start task');
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
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid grid-cols-5 w-full">
            <TabsTrigger value="comment">
              <MessageSquareText className="h-4 w-4 mr-2" />
              Komentar
            </TabsTrigger>
            <TabsTrigger value="message">
              <Send className="h-4 w-4 mr-2" />
              Pesan
            </TabsTrigger>
            <TabsTrigger value="like">
              <ThumbsUp className="h-4 w-4 mr-2" />
              Like
            </TabsTrigger>
            <TabsTrigger value="follow">
              <UserPlus className="h-4 w-4 mr-2" />
              Follow
            </TabsTrigger>
            <TabsTrigger value="view">
              <Eye className="h-4 w-4 mr-2" />
              Views
            </TabsTrigger>
          </TabsList>
          
          {/* Comment Task */}
          <TabsContent value="comment" className="space-y-4">
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
                    value={commentTarget}
                    onChange={(e) => setCommentTarget(e.target.value)}
                    placeholder="Username akun target"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Frekuensi Komentar</Label>
                  <Select value={commentFrequency} onValueChange={setCommentFrequency}>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih frekuensi" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="slow">{frequencyOptions.slow}</SelectItem>
                      <SelectItem value="medium">{frequencyOptions.medium}</SelectItem>
                      <SelectItem value="fast">{frequencyOptions.fast}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Custom Prompt untuk AI</Label>
                  <Textarea
                    value={commentPrompt}
                    onChange={(e) => setCommentPrompt(e.target.value)}
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
          </TabsContent>
          
          {/* Message Task */}
          <TabsContent value="message" className="space-y-4">
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
                    value={messageTarget}
                    onChange={(e) => setMessageTarget(e.target.value)}
                    placeholder="Username akun target"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Custom Prompt untuk AI</Label>
                  <Textarea
                    value={messagePrompt}
                    onChange={(e) => setMessagePrompt(e.target.value)}
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
          </TabsContent>
          
          {/* Like Task */}
          <TabsContent value="like" className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">Like Otomatis</Label>
                <p className="text-sm text-muted-foreground">
                  Aktifkan bot untuk memberikan like otomatis
                </p>
              </div>
              <Switch
                checked={likeEnabled}
                onCheckedChange={setLikeEnabled}
              />
            </div>
            
            {likeEnabled && (
              <div className="space-y-4 border-l-2 pl-4">
                <div className="space-y-2">
                  <Label>Target Akun</Label>
                  <Input
                    value={likeTarget}
                    onChange={(e) => setLikeTarget(e.target.value)}
                    placeholder="Username akun target"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Frekuensi Like</Label>
                  <Select value={likeFrequency} onValueChange={setLikeFrequency}>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih frekuensi" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="slow">{frequencyOptions.slow}</SelectItem>
                      <SelectItem value="medium">{frequencyOptions.medium}</SelectItem>
                      <SelectItem value="fast">{frequencyOptions.fast}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button 
                  onClick={() => handleStartTask('like')}
                  className="w-full"
                >
                  <ThumbsUp className="mr-2 h-4 w-4" />
                  Mulai Task Like
                </Button>
              </div>
            )}
          </TabsContent>
          
          {/* Follow Task */}
          <TabsContent value="follow" className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">Follow Otomatis</Label>
                <p className="text-sm text-muted-foreground">
                  Aktifkan bot untuk follow akun secara otomatis
                </p>
              </div>
              <Switch
                checked={followEnabled}
                onCheckedChange={setFollowEnabled}
              />
            </div>
            
            {followEnabled && (
              <div className="space-y-4 border-l-2 pl-4">
                <div className="space-y-2">
                  <Label>Target Akun atau Hashtag</Label>
                  <Input
                    value={followTarget}
                    onChange={(e) => setFollowTarget(e.target.value)}
                    placeholder="Username akun atau #hashtag"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Batas Follow Per Hari</Label>
                  <Input
                    type="number"
                    value={followLimit}
                    onChange={(e) => setFollowLimit(e.target.value)}
                    placeholder="Jumlah maksimum follow per hari"
                  />
                </div>
                <Button 
                  onClick={() => handleStartTask('follow')}
                  className="w-full"
                >
                  <UserPlus className="mr-2 h-4 w-4" />
                  Mulai Task Follow
                </Button>
              </div>
            )}
          </TabsContent>
          
          {/* View Task */}
          <TabsContent value="view" className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">View Otomatis</Label>
                <p className="text-sm text-muted-foreground">
                  Aktifkan bot untuk menonton konten secara otomatis
                </p>
              </div>
              <Switch
                checked={viewEnabled}
                onCheckedChange={setViewEnabled}
              />
            </div>
            
            {viewEnabled && (
              <div className="space-y-4 border-l-2 pl-4">
                <div className="space-y-2">
                  <Label>Target Akun atau Hashtag</Label>
                  <Input
                    value={viewTarget}
                    onChange={(e) => setViewTarget(e.target.value)}
                    placeholder="Username akun atau #hashtag"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Durasi Menonton</Label>
                  <Select value={viewDuration} onValueChange={setViewDuration}>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih durasi" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="short">{durationOptions.short}</SelectItem>
                      <SelectItem value="medium">{durationOptions.medium}</SelectItem>
                      <SelectItem value="long">{durationOptions.long}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button 
                  onClick={() => handleStartTask('view')}
                  className="w-full"
                >
                  <Eye className="mr-2 h-4 w-4" />
                  Mulai Task Views
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default AutomatedTasks;

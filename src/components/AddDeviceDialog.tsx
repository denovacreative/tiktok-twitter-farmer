
import React from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PlusCircle } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface Platform {
  id: string;
  name: string;
}

interface AddDeviceFormValues {
  name: string;
  platform: string;
  ip: string;
}

interface AddDeviceDialogProps {
  platforms: Platform[];
  onAddDevice: (device: any) => void;
}

const AddDeviceDialog = ({ platforms, onAddDevice }: AddDeviceDialogProps) => {
  const [open, setOpen] = React.useState(false);
  const { register, handleSubmit, setValue, watch, reset, formState: { errors } } = useForm<AddDeviceFormValues>({
    defaultValues: {
      platform: platforms.length > 0 ? platforms[0].id : '',
    }
  });

  const watchPlatform = watch('platform');

  const onSubmit = (data: AddDeviceFormValues) => {
    // Create new device with form data
    const newDevice = {
      id: `${data.platform}-device-${Date.now()}`,
      name: data.name,
      platform: data.platform,
      status: 'offline',
      uptime: 0,
      lastActive: new Date().toISOString(),
      tasks: 0,
      performanceScore: 0,
      ip: data.ip,
      battery: 100,
    };

    onAddDevice(newDevice);
    toast({
      title: "Perangkat ditambahkan",
      description: `Perangkat ${data.name} berhasil ditambahkan`,
    });
    reset();
    setOpen(false);
  };

  const handlePlatformChange = (value: string) => {
    setValue('platform', value);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm">
          <PlusCircle className="h-4 w-4 mr-2" />
          Tambah Perangkat
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>Tambah Perangkat Baru</DialogTitle>
            <DialogDescription>
              Tambahkan perangkat baru ke dalam phone farm Anda.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="platform">Platform</Label>
              <Select 
                value={watchPlatform} 
                onValueChange={handlePlatformChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Pilih platform" />
                </SelectTrigger>
                <SelectContent>
                  {platforms.map((platform) => (
                    <SelectItem key={platform.id} value={platform.id}>
                      {platform.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {!watchPlatform && (
                <p className="text-sm text-red-500">Pilih platform terlebih dahulu</p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="name">Nama Perangkat</Label>
              <Input
                id="name"
                placeholder="Contoh: Phone 1, Tablet 2, dll"
                {...register("name", { required: "Nama perangkat wajib diisi" })}
              />
              {errors.name && (
                <p className="text-sm text-red-500">{errors.name.message}</p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="ip">IP Address</Label>
              <Input
                id="ip"
                placeholder="Contoh: 192.168.1.100"
                {...register("ip", { 
                  required: "IP Address wajib diisi",
                  pattern: {
                    value: /^(\d{1,3}\.){3}\d{1,3}$/,
                    message: "Format IP Address tidak valid"
                  }
                })}
              />
              {errors.ip && (
                <p className="text-sm text-red-500">{errors.ip.message}</p>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={!watchPlatform}>Tambah Perangkat</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddDeviceDialog;

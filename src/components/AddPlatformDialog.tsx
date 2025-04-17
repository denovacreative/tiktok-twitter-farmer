
import React from 'react';
import { useForm } from 'react-hook-form';
import { Plus } from 'lucide-react';
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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';

interface AddPlatformFormValues {
  name: string;
  color: string;
}

interface AddPlatformDialogProps {
  onAddPlatform: (platform: { id: string; name: string; color: string; devices: number; online: number }) => void;
}

const AddPlatformDialog = ({ onAddPlatform }: AddPlatformDialogProps) => {
  const [open, setOpen] = React.useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<AddPlatformFormValues>();

  const onSubmit = (data: AddPlatformFormValues) => {
    // Create new platform with the form data
    const newPlatform = {
      id: data.name.toLowerCase().replace(/\s+/g, '-'),
      name: data.name,
      color: data.color || 'bg-gray-500',
      devices: 0,
      online: 0,
    };

    onAddPlatform(newPlatform);
    toast({
      title: "Platform ditambahkan",
      description: `Platform ${data.name} berhasil ditambahkan`,
    });
    reset();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Platform Baru
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>Tambah Platform Baru</DialogTitle>
            <DialogDescription>
              Tambahkan platform social media atau aplikasi baru untuk phone farm Anda.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Nama Platform</Label>
              <Input
                id="name"
                placeholder="Contoh: Instagram, Facebook, dll"
                {...register("name", { required: "Nama platform wajib diisi" })}
              />
              {errors.name && (
                <p className="text-sm text-red-500">{errors.name.message}</p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="color">Warna (Kode HEX)</Label>
              <div className="flex gap-2">
                <Input
                  id="color"
                  placeholder="contoh: bg-pink-500"
                  {...register("color")}
                />
                <div className="flex items-center">
                  <div className="w-6 h-6 rounded-full bg-pink-500"></div>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Tambah Platform</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddPlatformDialog;

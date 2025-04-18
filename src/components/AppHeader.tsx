import React from 'react';
import { Link } from 'react-router-dom';
import { Bell, Menu, User, LogOut, Settings, Smartphone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Import komponen ConnectionStatus
import ConnectionStatus from './ConnectionStatus';

const AppHeader = () => {
  return (
    <header className="border-b">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <Link to="/">
            <div className="flex items-center gap-2">
              <Smartphone className="h-6 w-6" />
              <span className="text-lg font-semibold">Phone Farm</span>
            </div>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-sm font-medium transition-colors hover:text-primary">
              Dashboard
            </Link>
            <Link to="/devices" className="text-sm font-medium transition-colors hover:text-primary">
              Perangkat
            </Link>
            <Link to="/statistics" className="text-sm font-medium transition-colors hover:text-primary">
              Statistik
            </Link>
            <Link to="/help" className="text-sm font-medium transition-colors hover:text-primary">
              Bantuan
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          {/* Tambahkan komponen ConnectionStatus */}
          <ConnectionStatus />
          
          <div className="relative">
            <Button variant="outline" size="icon">
              <Bell className="h-5 w-5" />
              <span className="sr-only">Notifikasi</span>
            </Button>
            <div className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500" />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link to="/account">
                  <User className="mr-2 h-4 w-4" />
                  <span>Profil</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/settings">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Pengaturan</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Keluar</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;

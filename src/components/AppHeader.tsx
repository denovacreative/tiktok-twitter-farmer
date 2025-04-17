
import React, { useState } from 'react';
import { Bell, Moon, Sun, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useIsMobile } from '@/hooks/use-mobile';

const AppHeader = () => {
  const [darkMode, setDarkMode] = useState(false);
  const isMobile = useIsMobile();

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  const navItems = [
    { name: 'Dashboard', href: '/' },
    { name: 'Perangkat', href: '#' },
    { name: 'Akun', href: '#' },
    { name: 'Statistik', href: '#' },
    { name: 'Bantuan', href: '#' },
  ];

  return (
    <header className="sticky top-0 z-30 w-full border-b bg-background">
      <div className="container flex h-16 items-center px-4">
        <div className="flex items-center space-x-4">
          {isMobile && (
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <nav className="grid gap-6 text-lg font-medium">
                  {navItems.map((item, index) => (
                    <a
                      key={index}
                      href={item.href}
                      className="flex w-full items-center rounded-md px-3 py-2 hover:bg-muted"
                    >
                      {item.name}
                    </a>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          )}
          <a className="flex items-center space-x-2" href="/">
            <span className="font-bold text-xl">PhoneFarm</span>
          </a>
          {!isMobile && (
            <nav className="flex items-center space-x-4 lg:space-x-6 ml-6">
              {navItems.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  className="text-sm font-medium transition-colors hover:text-primary"
                >
                  {item.name}
                </a>
              ))}
            </nav>
          )}
        </div>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
            <span className="sr-only">Notifikasi</span>
          </Button>
          <Button variant="ghost" size="icon" onClick={toggleDarkMode}>
            {darkMode ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
            <span className="sr-only">Toggle tema</span>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;

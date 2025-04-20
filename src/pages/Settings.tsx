
import React from 'react';
import AppHeader from '@/components/AppHeader';
import VersionSettings from '@/components/settings/VersionSettings';
import PlatformSettings from '@/components/settings/PlatformSettings';
import BotSettings from '@/components/settings/BotSettings';
import AdbDriverSettings from '@/components/settings/AdbDriverSettings';

const Settings = () => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <AppHeader />
      <main className="container mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold mb-6">Pengaturan Aplikasi</h1>
        <div className="grid gap-6">
          <VersionSettings />
          <AdbDriverSettings />
          <PlatformSettings />
          <BotSettings />
        </div>
      </main>
    </div>
  );
};

export default Settings;

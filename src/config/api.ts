
/**
 * Konfigurasi API untuk backend Rust
 */

// URL dasar untuk backend Rust
export const API_BASE_URL = "http://127.0.0.1:8000/api";

// URL untuk memeriksa status koneksi
export const API_STATUS_URL = `${API_BASE_URL}/status`;

// Timeout untuk request API (dalam milidetik)
export const API_TIMEOUT = 10000;

// Header default untuk request API
export const DEFAULT_HEADERS = {
  "Content-Type": "application/json",
  "Accept": "application/json"
};

// Endpoint API
export const API_ENDPOINTS = {
  // Auth
  LOGIN: "/auth/login",
  LOGOUT: "/auth/logout",
  
  // Platforms
  PLATFORMS: "/platforms",
  PLATFORM_BY_ID: (id: string) => `/platforms/${id}`,
  
  // Devices
  DEVICES: "/devices",
  DEVICE_BY_ID: (id: string) => `/devices/${id}`,
  DEVICE_STATUS: (id: string) => `/devices/${id}/status`,
  
  // Statistics
  STATISTICS: "/statistics",
  
  // Settings
  CHECK_VERSION: "/version",
  CHECK_UPDATE: "/check-update",
  INSTALL_UPDATE: "/install-update",
  PLATFORM_SETTINGS: "/platform-settings",
  BOT_SETTINGS: "/bot-settings",
  SAVE_BOT_SETTINGS: "/bot-settings/save",
  
  // ADB Driver
  CHECK_ADB_DRIVER: "/adb/status",
  INSTALL_ADB_DRIVER: "/adb/install",
  
  // Tasks
  DEVICE_TASKS: (deviceId: string) => `/devices/${deviceId}/tasks`,
  TASK_STATUS: (deviceId: string, taskId: string) => `/devices/${deviceId}/tasks/${taskId}`,
  START_TASK: (deviceId: string) => `/devices/${deviceId}/tasks/start`,
  STOP_TASK: (deviceId: string) => `/devices/${deviceId}/tasks/stop`,
};

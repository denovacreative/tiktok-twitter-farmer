/**
 * Service untuk menghubungkan aplikasi dengan backend API Rust
 */

const API_BASE_URL = "http://127.0.0.1:8000/api"; // URL untuk backend Rust

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

/**
 * Fungsi untuk melakukan fetch ke API Rust
 */
async function fetchApi<T>(
  endpoint: string,
  method: "GET" | "POST" | "PUT" | "DELETE" = "GET",
  body?: any
): Promise<ApiResponse<T>> {
  try {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
      "Accept": "application/json"
    };

    // Tambahkan token autentikasi jika tersedia
    const token = localStorage.getItem("auth_token");
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: data.message || "Terjadi kesalahan pada server Rust",
      };
    }

    return {
      success: true,
      data: data as T,
    };
  } catch (error) {
    console.error("API Error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Terjadi kesalahan jaringan",
    };
  }
}

/**
 * Fungsi untuk mengambil daftar platform dari API
 */
export async function fetchPlatforms() {
  return fetchApi<any[]>("/platforms");
}

/**
 * Fungsi untuk mengambil daftar perangkat dari API
 */
export async function fetchDevices(platformId?: string) {
  const endpoint = platformId ? `/devices?platformId=${platformId}` : "/devices";
  return fetchApi<any[]>(endpoint);
}

/**
 * Fungsi untuk menambahkan platform baru
 */
export async function addPlatform(platformData: any) {
  return fetchApi<any>("/platforms", "POST", platformData);
}

/**
 * Fungsi untuk menambahkan perangkat baru
 */
export async function addDevice(deviceData: any) {
  return fetchApi<any>("/devices", "POST", deviceData);
}

/**
 * Fungsi untuk memperbarui status perangkat
 */
export async function updateDeviceStatus(deviceId: string, status: "online" | "offline") {
  return fetchApi<any>(`/devices/${deviceId}/status`, "PUT", { status });
}

/**
 * Fungsi untuk mendapatkan status server backend Rust
 */
export async function checkServerStatus() {
  return fetchApi<{ status: string }>("/status");
}

/**
 * Fungsi untuk login
 */
export async function login(username: string, password: string) {
  const response = await fetchApi<{ token: string; user: any }>("/auth/login", "POST", {
    username,
    password,
  });

  if (response.success && response.data?.token) {
    localStorage.setItem("auth_token", response.data.token);
  }

  return response;
}

/**
 * Fungsi untuk logout
 */
export function logout() {
  localStorage.removeItem("auth_token");
}

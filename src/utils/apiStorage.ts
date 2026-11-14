/**
 * Production Persistent Server Asset & Content Synchronization with Role-Based Access Control
 * Guarantees every product image, uploaded file, and content edit
 * is managed with draft staging, preview, and owner-only publishing to live website.
 */

import { AuthUser } from '../types';

export interface ServerSyncResult {
  success: boolean;
  syncedCount?: number;
  products?: any[];
  updatedAt?: number;
}

const AUTH_TOKEN_KEY = 'sds_admin_session_token';

export function getAuthToken(): string | null {
  try {
    return localStorage.getItem(AUTH_TOKEN_KEY) || sessionStorage.getItem(AUTH_TOKEN_KEY);
  } catch {
    return null;
  }
}

export function setAuthToken(token: string, persist = true) {
  try {
    if (persist) {
      localStorage.setItem(AUTH_TOKEN_KEY, token);
    } else {
      sessionStorage.setItem(AUTH_TOKEN_KEY, token);
    }
  } catch {
    // ignore
  }
}

export function clearAuthToken() {
  try {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    sessionStorage.removeItem(AUTH_TOKEN_KEY);
  } catch {
    // ignore
  }
}

/**
 * Authentication Endpoints
 */
export async function loginAdminUser(
  email: string,
  passwordOrPin: string
): Promise<{ success: boolean; user?: AuthUser; token?: string; error?: string }> {
  try {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password: passwordOrPin }),
    });

    const data = await res.json();
    if (!res.ok || !data.success) {
      return { success: false, error: data.error || 'Login failed' };
    }

    if (data.token) {
      setAuthToken(data.token, true);
    }

    return {
      success: true,
      user: data.user,
      token: data.token,
    };
  } catch (err: any) {
    return { success: false, error: err.message || 'Network error during login' };
  }
}

export async function fetchCurrentAuthUser(): Promise<AuthUser | null> {
  const token = getAuthToken();
  if (!token) return null;

  try {
    const res = await fetch('/api/auth/me', {
      headers: {
        Authorization: `Bearer ${token}`,
        'Cache-Control': 'no-cache',
      },
    });
    if (!res.ok) {
      clearAuthToken();
      return null;
    }
    const data = await res.json();
    if (data.authenticated && data.user) {
      return data.user;
    }
    clearAuthToken();
  } catch {
    // ignore
  }
  return null;
}

export async function logoutAdminUser(): Promise<void> {
  const token = getAuthToken();
  if (token) {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch {
      // ignore
    }
    clearAuthToken();
  }
}

export async function fetchAdminUsers(): Promise<AuthUser[]> {
  const token = getAuthToken();
  if (!token) return [];
  try {
    const res = await fetch('/api/auth/users', {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) return [];
    const data = await res.json();
    return data.users || [];
  } catch {
    return [];
  }
}

export async function addAdminUser(user: {
  email: string;
  role: 'owner' | 'editor';
  name: string;
  password: string;
}): Promise<boolean> {
  const token = getAuthToken();
  if (!token) return false;
  try {
    const res = await fetch('/api/auth/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(user),
    });
    return res.ok;
  } catch {
    return false;
  }
}

/**
 * Uploads an image or document directly to the server's persistent disk.
 * Protected: requires Owner or Editor login.
 */
export async function uploadFileToServer(
  fileOrDataUrl: File | Blob | string,
  filename?: string,
  folder: 'products' | 'documents' = 'products'
): Promise<string> {
  let dataUrl = '';

  if (typeof fileOrDataUrl === 'string') {
    dataUrl = fileOrDataUrl;
  } else {
    dataUrl = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target?.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(fileOrDataUrl);
    });
  }

  // If it's already an absolute or relative HTTP/HTTPS URL, no need to re-upload
  if (
    dataUrl.startsWith('http://') ||
    dataUrl.startsWith('https://') ||
    dataUrl.startsWith('/uploads/') ||
    dataUrl.startsWith('/images/')
  ) {
    return dataUrl;
  }

  const token = getAuthToken();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  try {
    const res = await fetch('/api/upload', {
      method: 'POST',
      headers,
      body: JSON.stringify({
        dataUrl,
        filename,
        folder,
      }),
    });

    if (!res.ok) {
      throw new Error(`Server upload responded with HTTP ${res.status}`);
    }

    const json = await res.json();
    if (json.success && json.url) {
      return json.url;
    }
    throw new Error(json.error || 'Upload failed');
  } catch (err) {
    console.warn('[apiStorage] Server upload failed, falling back to data URL:', err);
    return dataUrl;
  }
}

/**
 * Loads published site content (public).
 */
export async function fetchServerContent(): Promise<any | null> {
  try {
    const res = await fetch('/api/content', {
      method: 'GET',
      headers: {
        'Cache-Control': 'no-cache',
        Pragma: 'no-cache',
      },
    });

    if (!res.ok) return null;
    const json = await res.json();
    if (json.success && json.data) {
      return json.data;
    }
  } catch (err) {
    console.warn('[apiStorage] Could not fetch server content:', err);
  }
  return null;
}

/**
 * Loads draft content (Admin/Editor only).
 */
export async function fetchDraftServerContent(): Promise<{
  data: any | null;
  hasUnpublishedChanges: boolean;
  publishedAt: number;
} | null> {
  const token = getAuthToken();
  if (!token) return null;

  try {
    const res = await fetch('/api/content/draft', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Cache-Control': 'no-cache',
      },
    });

    if (!res.ok) return null;
    const json = await res.json();
    if (json.success && json.data) {
      return {
        data: json.data,
        hasUnpublishedChanges: Boolean(json.hasUnpublishedChanges),
        publishedAt: json.publishedAt || 0,
      };
    }
  } catch (err) {
    console.warn('[apiStorage] Could not fetch draft content:', err);
  }
  return null;
}

/**
 * Persists draft content to server (Admin/Editor only).
 */
export async function persistDraftToServer(content: Record<string, any>): Promise<boolean> {
  const token = getAuthToken();
  if (!token) return false;

  try {
    const res = await fetch('/api/content/draft', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(content),
    });

    if (!res.ok) return false;
    const json = await res.json();
    return Boolean(json.success);
  } catch (err) {
    console.error('[apiStorage] Failed to persist draft to server:', err);
    return false;
  }
}

/**
 * Publishes draft content to live website (Owner only).
 */
export async function publishDraftToLive(): Promise<{ success: boolean; message?: string }> {
  const token = getAuthToken();
  if (!token) return { success: false, message: 'Unauthorized' };

  try {
    const res = await fetch('/api/content/publish', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    const json = await res.json();
    if (!res.ok || !json.success) {
      return { success: false, message: json.error || 'Publish failed' };
    }
    return { success: true, message: json.message };
  } catch (err: any) {
    return { success: false, message: err.message || 'Publish network error' };
  }
}

/**
 * Discards draft changes and resets to live published content.
 */
export async function discardDraftChanges(): Promise<boolean> {
  const token = getAuthToken();
  if (!token) return false;

  try {
    const res = await fetch('/api/content/discard', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.ok;
  } catch {
    return false;
  }
}

/**
 * Backward-compatible helper that routes to draft if authenticated, or returns false if not.
 */
export async function persistContentToServer(content: Record<string, any>): Promise<boolean> {
  return persistDraftToServer(content);
}

/**
 * Automatic Laptop-to-Server Sync Migration (Protected)
 */
export async function syncLocalImagesToServer(
  syncImageMap: Record<string, { mainImage: string; galleryImages: string[] }>,
  localProducts?: any[]
): Promise<ServerSyncResult> {
  const token = getAuthToken();
  if (!token) return { success: false };

  let hasLocalBase64 = false;
  if (syncImageMap && typeof syncImageMap === 'object') {
    for (const val of Object.values(syncImageMap)) {
      if (val && typeof val === 'object') {
        if (val.mainImage && val.mainImage.startsWith('data:image/')) {
          hasLocalBase64 = true;
          break;
        }
        if (
          Array.isArray(val.galleryImages) &&
          val.galleryImages.some((img) => img && img.startsWith('data:image/'))
        ) {
          hasLocalBase64 = true;
          break;
        }
      }
    }
  }

  if (Array.isArray(localProducts)) {
    for (const p of localProducts) {
      if (p.mainImage && p.mainImage.startsWith('data:image/')) {
        hasLocalBase64 = true;
        break;
      }
    }
  }

  if (!hasLocalBase64) {
    return { success: true, syncedCount: 0 };
  }

  try {
    const res = await fetch('/api/sync-local', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        syncImageMap,
        localProducts,
      }),
    });

    if (!res.ok) {
      throw new Error(`Sync failed with HTTP ${res.status}`);
    }

    const data = await res.json();
    return data;
  } catch (err) {
    console.warn('[apiStorage] Error during sync-local:', err);
    return { success: false };
  }
}

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { AuthUser, AdminViewMode } from '../types';
import {
  fetchCurrentAuthUser,
  loginAdminUser,
  logoutAdminUser,
  publishDraftToLive,
  discardDraftChanges,
  fetchDraftServerContent,
  getAuthToken,
} from '../utils/apiStorage';

interface AuthContextType {
  currentUser: AuthUser | null;
  isAuthenticated: boolean;
  isOwner: boolean;
  isEditor: boolean;
  canEdit: boolean;
  adminViewMode: AdminViewMode;
  setAdminViewMode: (mode: AdminViewMode) => void;
  hasUnpublishedChanges: boolean;
  setHasUnpublishedChanges: React.Dispatch<React.SetStateAction<boolean>>;
  loginModalOpen: boolean;
  setLoginModalOpen: (open: boolean) => void;
  login: (email: string, passwordOrPin: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  publishToLive: () => Promise<{ success: boolean; message?: string }>;
  discardDraft: () => Promise<boolean>;
  refreshDraftStatus: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(null);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);
  const [adminViewMode, setAdminViewModeState] = useState<AdminViewMode>('published');
  const [hasUnpublishedChanges, setHasUnpublishedChanges] = useState<boolean>(false);
  const [loginModalOpen, setLoginModalOpen] = useState<boolean>(false);

  // Check auth session on boot
  useEffect(() => {
    let isMounted = true;
    fetchCurrentAuthUser()
      .then((user) => {
        if (!isMounted) return;
        if (user) {
          setCurrentUser(user);
          // If logged in as admin, default to edit mode
          setAdminViewModeState('edit');
        } else {
          setCurrentUser(null);
          setAdminViewModeState('published');
        }
      })
      .catch(() => {})
      .finally(() => {
        if (isMounted) setIsLoadingAuth(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const refreshDraftStatus = useCallback(async () => {
    if (!getAuthToken()) {
      setHasUnpublishedChanges(false);
      return;
    }
    const res = await fetchDraftServerContent();
    if (res) {
      setHasUnpublishedChanges(res.hasUnpublishedChanges);
    }
  }, []);

  useEffect(() => {
    if (currentUser) {
      refreshDraftStatus();
    }
  }, [currentUser, refreshDraftStatus]);

  const login = async (email: string, passwordOrPin: string) => {
    const res = await loginAdminUser(email, passwordOrPin);
    if (res.success && res.user) {
      setCurrentUser(res.user);
      setAdminViewModeState('edit');
      setLoginModalOpen(false);
      await refreshDraftStatus();
      return { success: true };
    }
    return { success: false, error: res.error || 'Login failed' };
  };

  const logout = async () => {
    await logoutAdminUser();
    setCurrentUser(null);
    setAdminViewModeState('published');
    setHasUnpublishedChanges(false);
  };

  const publishToLive = async () => {
    const res = await publishDraftToLive();
    if (res.success) {
      setHasUnpublishedChanges(false);
    }
    return res;
  };

  const discardDraft = async () => {
    const ok = await discardDraftChanges();
    if (ok) {
      setHasUnpublishedChanges(false);
    }
    return ok;
  };

  const isOwner = currentUser?.role === 'owner';
  const isEditor = currentUser?.role === 'editor' || isOwner;

  // Editing controls are only enabled if authenticated as Owner/Editor AND in 'edit' view mode
  const canEdit = Boolean(isEditor && adminViewMode === 'edit');

  const setAdminViewMode = (mode: AdminViewMode) => {
    if (!currentUser && mode !== 'published') {
      setLoginModalOpen(true);
      return;
    }
    setAdminViewModeState(mode);
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isAuthenticated: Boolean(currentUser),
        isOwner,
        isEditor,
        canEdit,
        adminViewMode,
        setAdminViewMode,
        hasUnpublishedChanges,
        setHasUnpublishedChanges,
        loginModalOpen,
        setLoginModalOpen,
        login,
        logout,
        publishToLive,
        discardDraft,
        refreshDraftStatus,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const defaultAuthContext: AuthContextType = {
  currentUser: null,
  isAuthenticated: false,
  isOwner: false,
  isEditor: false,
  canEdit: false,
  adminViewMode: 'published',
  setAdminViewMode: () => {},
  hasUnpublishedChanges: false,
  setHasUnpublishedChanges: () => {},
  loginModalOpen: false,
  setLoginModalOpen: () => {},
  login: async () => ({ success: false, error: 'AuthProvider not initialized' }),
  logout: async () => {},
  publishToLive: async () => ({ success: false, message: 'AuthProvider not initialized' }),
  discardDraft: async () => false,
  refreshDraftStatus: async () => {},
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    console.warn('useAuth called outside of AuthProvider, returning fallback unauthenticated state');
    return defaultAuthContext;
  }
  return context;
};

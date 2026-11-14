import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import {
  ShieldCheck,
  Eye,
  Edit3,
  Globe,
  UploadCloud,
  RotateCcw,
  LogOut,
  Users,
  CheckCircle2,
  AlertTriangle,
  Loader2,
  X,
} from 'lucide-react';
import { fetchAdminUsers, addAdminUser } from '../utils/apiStorage';
import { AuthUser } from '../types';

export const AdminControlBar: React.FC = () => {
  const {
    currentUser,
    isAuthenticated,
    isOwner,
    adminViewMode,
    setAdminViewMode,
    hasUnpublishedChanges,
    publishToLive,
    discardDraft,
    logout,
  } = useAuth();

  const [isPublishing, setIsPublishing] = useState(false);
  const [publishMessage, setPublishMessage] = useState<string | null>(null);
  const [showUsersModal, setShowUsersModal] = useState(false);
  const [usersList, setUsersList] = useState<AuthUser[]>([]);
  const [newEmail, setNewEmail] = useState('');
  const [newRole, setNewRole] = useState<'editor' | 'owner'>('editor');
  const [newName, setNewName] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [userMsg, setUserMsg] = useState<string | null>(null);

  if (!isAuthenticated || !currentUser) {
    return null;
  }

  const handlePublish = async () => {
    if (!isOwner) {
      alert('Only the Owner account has permission to publish changes to the live website.');
      return;
    }
    const confirmed = window.confirm(
      'Publish all draft changes to the live public website now?\n\nOnce published, all visitors across all devices will immediately see the updated content.'
    );
    if (!confirmed) return;

    try {
      setIsPublishing(true);
      const res = await publishToLive();
      if (res.success) {
        setPublishMessage('✓ Successfully published to live website! All devices now load the updated version.');
        setTimeout(() => setPublishMessage(null), 5000);
      } else {
        alert(`Publish failed: ${res.message || 'Unknown error'}`);
      }
    } finally {
      setIsPublishing(false);
    }
  };

  const handleDiscard = async () => {
    const confirmed = window.confirm(
      'Are you sure you want to discard your draft changes?\n\nThis will reset your draft to match the live published website.'
    );
    if (!confirmed) return;

    const ok = await discardDraft();
    if (ok) {
      window.location.reload();
    } else {
      alert('Failed to discard draft.');
    }
  };

  const openUsersModal = async () => {
    setShowUsersModal(true);
    const users = await fetchAdminUsers();
    setUsersList(users);
  };

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEmail || !newPassword) return;

    const ok = await addAdminUser({
      email: newEmail.trim().toLowerCase(),
      role: newRole,
      name: newName.trim() || 'Staff Editor',
      password: newPassword.trim(),
    });

    if (ok) {
      setUserMsg(`✓ User ${newEmail} created successfully with role ${newRole}`);
      setNewEmail('');
      setNewPassword('');
      setNewName('');
      const users = await fetchAdminUsers();
      setUsersList(users);
      setTimeout(() => setUserMsg(null), 3500);
    } else {
      alert('Failed to add user.');
    }
  };

  return (
    <>
      {/* Sticky Top Admin Dock */}
      <div className="bg-[#292321] text-[#F3E7DA] border-b border-[#D8BFA8]/30 px-3 sm:px-6 py-2 sticky top-0 z-50 shadow-xl backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2.5 text-xs font-tech">
          {/* User Identity & Publication Status */}
          <div className="flex flex-wrap items-center gap-2.5">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#5B1018] border border-[#D8BFA8]/30 text-[#F3E7DA] font-bold uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5 text-[#D8BFA8]" />
              <span>{isOwner ? 'OWNER / ADMIN' : 'EDITOR'}</span>
            </div>

            <span className="text-[11px] text-[#D8BFA8] font-mono hidden sm:inline">
              {currentUser.email}
            </span>

            {/* Status indicator */}
            {hasUnpublishedChanges ? (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#5B1018]/80 text-[#F3E7DA] border border-[#D8BFA8]/40 text-[10px] uppercase font-bold tracking-wider">
                <AlertTriangle className="w-3 h-3 text-[#D8BFA8]" />
                <span>Draft edits pending (Not published)</span>
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#3A312E] text-[#F3E7DA] border border-[#D8BFA8]/30 text-[10px] uppercase font-bold tracking-wider">
                <CheckCircle2 className="w-3 h-3 text-[#D8BFA8]" />
                <span>Published & live</span>
              </span>
            )}

            {publishMessage && (
              <span className="text-[11px] text-[#D8BFA8] font-bold ml-2">
                {publishMessage}
              </span>
            )}
          </div>

          {/* Mode Switcher & Publishing Controls */}
          <div className="flex flex-wrap items-center gap-2">
            {/* View Mode Buttons */}
            <div className="inline-flex items-center rounded-sm bg-[#1E1918] border border-[#D8BFA8]/25 p-0.5">
              <button
                type="button"
                onClick={() => setAdminViewMode('edit')}
                className={`px-2.5 py-1 rounded-xs uppercase tracking-wider font-bold text-[11px] flex items-center gap-1 transition-all ${
                  adminViewMode === 'edit'
                    ? 'bg-[#5B1018] text-[#F3E7DA] shadow-sm'
                    : 'text-[#D8BFA8] hover:text-white'
                }`}
                title="Edit products, images, categories, and site settings"
              >
                <Edit3 className="w-3 h-3" />
                <span>Edit Mode</span>
              </button>

              <button
                type="button"
                onClick={() => setAdminViewMode('preview')}
                className={`px-2.5 py-1 rounded-xs uppercase tracking-wider font-bold text-[11px] flex items-center gap-1 transition-all ${
                  adminViewMode === 'preview'
                    ? 'bg-[#F3E7DA] text-[#292321] shadow-sm'
                    : 'text-[#D8BFA8] hover:text-white'
                }`}
                title="Preview draft website exactly as public visitors will see it without edit buttons"
              >
                <Eye className="w-3 h-3" />
                <span>Preview Mode</span>
              </button>

              <button
                type="button"
                onClick={() => setAdminViewMode('published')}
                className={`px-2.5 py-1 rounded-xs uppercase tracking-wider font-bold text-[11px] flex items-center gap-1 transition-all ${
                  adminViewMode === 'published'
                    ? 'bg-[#D8BFA8] text-[#292321] shadow-sm'
                    : 'text-[#D8BFA8] hover:text-white'
                }`}
                title="View the currently published live site"
              >
                <Globe className="w-3 h-3" />
                <span>Live View</span>
              </button>
            </div>

            {/* Owner: Publish Button */}
            {isOwner && (
              <button
                type="button"
                onClick={handlePublish}
                disabled={isPublishing}
                className="px-3.5 py-1 rounded-sm bg-[#5B1018] hover:bg-[#440B11] text-[#F3E7DA] border border-[#D8BFA8]/30 font-bold uppercase tracking-wider text-[11px] flex items-center gap-1.5 shadow-md transition-all active:scale-95 disabled:opacity-50"
                title="Publish draft changes to live website for all visitors across all devices"
              >
                {isPublishing ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <UploadCloud className="w-3.5 h-3.5" />
                )}
                <span>PUBLISH TO LIVE</span>
              </button>
            )}

            {/* Discard Draft Button */}
            {hasUnpublishedChanges && (
              <button
                type="button"
                onClick={handleDiscard}
                className="px-2 py-1 rounded-sm bg-[#3A312E] hover:bg-[#4D423E] text-[#F3E7DA] font-medium text-[10px] uppercase tracking-wider border border-[#D8BFA8]/25 flex items-center gap-1 transition-colors"
                title="Discard pending draft changes and revert to live published version"
              >
                <RotateCcw className="w-2.5 h-2.5" />
                <span>Revert</span>
              </button>
            )}

            {/* Manage Users (Owner Only) */}
            {isOwner && (
              <button
                type="button"
                onClick={openUsersModal}
                className="px-2 py-1 rounded-sm bg-[#3A312E] hover:bg-[#4D423E] text-[#F3E7DA] font-medium text-[10px] uppercase tracking-wider border border-[#D8BFA8]/25 flex items-center gap-1 transition-colors"
                title="Manage editor permissions"
              >
                <Users className="w-3 h-3 text-[#D8BFA8]" />
                <span>Permissions</span>
              </button>
            )}

            {/* Logout */}
            <button
              type="button"
              onClick={logout}
              className="px-2 py-1 rounded-sm bg-[#3A312E] hover:bg-[#5B1018] text-[#D8BFA8] hover:text-[#F3E7DA] font-medium text-[10px] uppercase tracking-wider border border-[#D8BFA8]/25 flex items-center gap-1 transition-colors"
              title="Sign out of Admin Portal"
            >
              <LogOut className="w-2.5 h-2.5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* Permissions / Users Modal */}
      {showUsersModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#292321]/75 backdrop-blur-sm animate-fade-in font-tech">
          <div className="bg-[#FAF4EE] border border-[#D8BFA8] rounded-sm max-w-xl w-full p-6 text-[#292321] shadow-2xl relative">
            <button
              onClick={() => setShowUsersModal(false)}
              className="absolute top-4 right-4 p-1.5 text-[#5A4F4B] hover:text-[#5B1018] transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2 mb-2">
              <ShieldCheck className="w-5 h-5 text-[#5B1018]" />
              <h3 className="text-base font-bold uppercase tracking-wider text-[#292321]">
                Role-Based Access Control & Editor Permissions
              </h3>
            </div>
            <p className="text-xs text-[#4D423E] mb-6">
              Only authorized staff accounts can edit products, descriptions, or upload files. Visitors without an account have read-only access to published content.
            </p>

            {userMsg && (
              <div className="p-3 mb-4 rounded bg-[#E9D9C8] border border-[#5B1018]/30 text-[#5B1018] text-xs font-bold">
                {userMsg}
              </div>
            )}

            {/* Add New Editor Form */}
            <form onSubmit={handleCreateUser} className="p-4 bg-[#F3E7DA] border border-[#D8BFA8] rounded-sm mb-6 space-y-3">
              <div className="text-xs font-bold uppercase tracking-wider text-[#5B1018]">
                Grant Editing Access to Staff / Editor
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-[10px] text-[#4D423E] uppercase mb-1">Staff Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Sales Team / Content Editor"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    className="w-full px-2.5 py-1.5 bg-white border border-[#D8BFA8] rounded text-xs text-[#292321] placeholder:text-[#B8B8B3] focus:outline-none focus:border-[#5B1018]"
                  />
                </div>
                <div>
                  <label className="block text-[10px] text-[#4D423E] uppercase mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="editor@company.com"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    className="w-full px-2.5 py-1.5 bg-white border border-[#D8BFA8] rounded text-xs text-[#292321] placeholder:text-[#B8B8B3] focus:outline-none focus:border-[#5B1018]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-[10px] text-[#4D423E] uppercase mb-1">Role</label>
                  <select
                    value={newRole}
                    onChange={(e) => setNewRole(e.target.value as any)}
                    className="w-full px-2.5 py-1.5 bg-white border border-[#D8BFA8] rounded text-xs text-[#292321] focus:outline-none focus:border-[#5B1018]"
                  >
                    <option value="editor">Editor (Can edit drafts & photos)</option>
                    <option value="owner">Owner / Admin (Can publish & manage users)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] text-[#4D423E] uppercase mb-1">Password or PIN</label>
                  <input
                    type="text"
                    required
                    placeholder="Set temporary password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full px-2.5 py-1.5 bg-white border border-[#D8BFA8] rounded text-xs text-[#292321] placeholder:text-[#B8B8B3] font-mono focus:outline-none focus:border-[#5B1018]"
                  />
                </div>
              </div>

              <div className="flex justify-end pt-1">
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-[#5B1018] hover:bg-[#440B11] text-[#F3E7DA] font-bold uppercase tracking-wider text-xs rounded-sm transition-colors shadow-sm"
                >
                  Grant Access
                </button>
              </div>
            </form>

            {/* Existing Accounts List */}
            <div className="space-y-2">
              <div className="text-xs font-bold uppercase tracking-wider text-[#4D423E]">
                Configured Authorized Accounts
              </div>
              <div className="divide-y divide-[#D8BFA8] border border-[#D8BFA8] rounded-sm bg-white max-h-48 overflow-y-auto">
                {usersList.map((u, i) => (
                  <div key={i} className="p-2.5 flex items-center justify-between text-xs">
                    <div>
                      <div className="font-bold text-[#292321] flex items-center gap-1.5">
                        <span>{u.name}</span>
                        <span
                          className={`px-1.5 py-0.2 rounded text-[9px] uppercase font-bold ${
                            u.role === 'owner'
                              ? 'bg-[#5B1018] text-[#F3E7DA]'
                              : 'bg-[#E9D9C8] text-[#292321]'
                          }`}
                        >
                          {u.role}
                        </span>
                      </div>
                      <div className="text-[11px] text-[#5A4F4B] font-mono">{u.email}</div>
                    </div>
                    <span className="text-[10px] text-[#5B1018] font-tech font-bold uppercase">Active</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={() => setShowUsersModal(false)}
                className="px-4 py-2 bg-[#292321] hover:bg-[#5B1018] text-[#F3E7DA] rounded-sm text-xs uppercase tracking-wider transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

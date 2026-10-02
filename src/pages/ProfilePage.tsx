import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { userService } from '../services/userService';
import { User } from '../types/user';
import { ProfileHeader } from '../components/profile/ProfileHeader';
import { ProfileOverview } from '../components/profile/ProfileOverview';
import { ProfileActivity } from '../components/profile/ProfileActivity';
import { ProfileBadges } from '../components/profile/ProfileBadges';
import { ProfileStats } from '../components/profile/ProfileStats';
import { LayoutGrid, History, Award, BarChart3, ArrowLeft, UserCheck } from 'lucide-react';

interface ProfilePageProps {
  selectedUserId?: string | null;
  onClearSelectedUser?: () => void;
  onNavigateToBadges?: () => void;
}

export const ProfilePage: React.FC<ProfilePageProps> = ({
  selectedUserId,
  onClearSelectedUser,
  onNavigateToBadges,
}) => {
  const { currentUser } = useAuth();
  const [profileUser, setProfileUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'activity' | 'badges' | 'stats'>('overview');
  const [loading, setLoading] = useState(true);

  const targetId = selectedUserId || currentUser?.id;
  const isOwner = currentUser?.id === targetId;

  useEffect(() => {
    if (!targetId) return;
    setLoading(true);
    userService.getUserById(targetId).then((u) => {
      setProfileUser(u);
      setLoading(false);
    });
  }, [targetId]);

  if (loading || !profileUser) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center font-mono text-xs text-slate-500">
        Loading player profile dossier...
      </div>
    );
  }

  const tabs: { id: 'overview' | 'activity' | 'badges' | 'stats'; label: string; icon: React.ReactNode }[] = [
    { id: 'overview', label: 'Overview', icon: <LayoutGrid className="w-4 h-4" /> },
    { id: 'activity', label: 'Activity Log', icon: <History className="w-4 h-4" /> },
    { id: 'badges', label: 'Badges & Trophies', icon: <Award className="w-4 h-4" /> },
    { id: 'stats', label: 'Statistics', icon: <BarChart3 className="w-4 h-4" /> },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Return button if viewing another student */}
      {!isOwner && onClearSelectedUser && (
        <button
          onClick={onClearSelectedUser}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-cz-dark-900 hover:bg-cz-dark-850 text-slate-300 border border-cz-dark-800 text-xs font-mono transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to My Profile</span>
        </button>
      )}

      {/* Profile Header */}
      <ProfileHeader user={profileUser} isOwner={isOwner} />

      {/* Section Tabs */}
      <div className="flex items-center gap-2 border-b border-cz-dark-800 pb-2 overflow-x-auto">
        {tabs.map((t) => {
          const isActive = activeTab === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-bold tracking-wide transition-all whitespace-nowrap ${
                isActive
                  ? 'bg-cz-dark-900 text-cz-orange border border-cz-orange/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-cz-dark-900/40'
              }`}
            >
              {t.icon}
              <span>{t.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Panels */}
      <div>
        {activeTab === 'overview' && (
          <ProfileOverview
            user={profileUser}
            onNavigateToBadges={() => setActiveTab('badges')}
          />
        )}
        {activeTab === 'activity' && <ProfileActivity userId={profileUser.id} />}
        {activeTab === 'badges' && <ProfileBadges userId={profileUser.id} />}
        {activeTab === 'stats' && <ProfileStats user={profileUser} />}
      </div>
    </div>
  );
};

import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Badge, BadgeCategory, BadgeRarity } from '../types/badge';
import { badgeService } from '../services/badgeService';
import { Award, PlusCircle, CheckCircle2, Lock, ShieldCheck, Sparkles } from 'lucide-react';
import { Modal } from '../components/common/Modal';

export const BadgesPage: React.FC = () => {
  const { currentUser, refreshUser, triggerCelebration } = useAuth();
  const [allBadges, setAllBadges] = useState<Badge[]>([]);
  const [filterCat, setFilterCat] = useState<string>('all');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // New badge form state
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [icon, setIcon] = useState('🐺');
  const [category, setCategory] = useState<BadgeCategory>('milestone');
  const [rarity, setRarity] = useState<BadgeRarity>('Rare');
  const [xpReward, setXpReward] = useState(20);
  const [reqDesc, setReqDesc] = useState('Solve 5 Graph problems');
  const [reqProgress, setReqProgress] = useState(5);

  const loadBadges = async () => {
    const list = await badgeService.getAllBadges();
    setAllBadges(list);
  };

  useEffect(() => {
    loadBadges();
  }, []);

  const handleCreateBadge = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return;

    const newBadge: Badge = {
      id: `badge-${Date.now()}`,
      name,
      description,
      icon,
      category,
      rarity,
      xpReward,
      requirementDescription: reqDesc,
      progressRequired: reqProgress,
    };

    await badgeService.createBadge(newBadge);
    await loadBadges();
    triggerCelebration();
    setIsCreateModalOpen(false);
    // Reset form
    setName('');
    setDescription('');
  };

  const earnedSet = new Set(currentUser?.badgesEarned || []);

  const filtered = filterCat === 'all'
    ? allBadges
    : allBadges.filter((b) => b.category === filterCat);

  const getRarityBadge = (rarity: string) => {
    switch (rarity) {
      case 'Common':
        return 'text-slate-300 border-slate-700 bg-slate-800/40';
      case 'Rare':
        return 'text-blue-400 border-blue-500/30 bg-blue-950/40';
      case 'Epic':
        return 'text-purple-400 border-purple-500/30 bg-purple-950/40';
      case 'Legendary':
        return 'text-amber-400 border-amber-500/40 bg-amber-950/40 shadow-[0_0_8px_rgba(245,158,11,0.2)]';
      default:
        return 'text-slate-400 border-slate-700 bg-slate-800/40';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-cz-dark-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-xs font-mono text-cz-gold mb-2">
            <Award className="w-3.5 h-3.5" />
            <span>ACHIEVEMENTS SYSTEM</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black font-display text-slate-100">
            CODEZILLA BADGES & TROPHIES
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 font-mono">
            Unlock achievements through verified LeetCode milestones, streaks, and speed bounties.
          </p>
        </div>

        {/* Admin Action for Extensibility */}
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-cz-dark-900 hover:bg-cz-dark-850 text-cz-orange border border-cz-orange/40 font-mono text-xs font-bold transition-all shadow-sm"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Admin: Add Custom Badge</span>
        </button>
      </div>

      {/* Categories Filter Bar */}
      <div className="flex flex-wrap items-center gap-2 p-1.5 bg-cz-dark-900 border border-cz-dark-800 rounded-2xl">
        {[
          { id: 'all', label: 'All Badges' },
          { id: 'milestone', label: 'Milestones' },
          { id: 'streak', label: 'Streaks & Consistency' },
          { id: 'difficulty', label: 'Difficulty (Medium / Hard)' },
          { id: 'speed', label: 'Speed & Sprints' },
          { id: 'special', label: 'Special & Night' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setFilterCat(tab.id)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-semibold transition-all ${
              filterCat === tab.id
                ? 'bg-cz-dark-800 text-cz-orange border border-cz-orange/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Badges Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((badge) => {
          const isUnlocked = earnedSet.has(badge.id);

          return (
            <div
              key={badge.id}
              className={`rounded-2xl p-6 border transition-all duration-300 relative overflow-hidden flex flex-col justify-between ${
                isUnlocked
                  ? 'bg-gradient-to-br from-cz-dark-900 via-cz-dark-850 to-cz-dark-900 border-cz-orange/50 shadow-card hover:border-cz-orange'
                  : 'bg-cz-dark-950/80 border-cz-dark-800 opacity-80 hover:opacity-100 hover:border-cz-dark-700'
              }`}
            >
              <div>
                <div className="flex items-start justify-between mb-4">
                  <div
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl border ${
                      isUnlocked
                        ? 'bg-cz-dark-950 border-cz-orange/50 shadow-[0_0_15px_rgba(255,107,0,0.3)]'
                        : 'bg-cz-dark-950 border-cz-dark-800 grayscale'
                    }`}
                  >
                    {badge.icon}
                  </div>

                  <div className="flex flex-col items-end gap-1.5 font-mono">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold border ${getRarityBadge(
                        badge.rarity
                      )}`}
                    >
                      {badge.rarity}
                    </span>
                    <span className="text-xs text-cz-gold font-bold">
                      +{badge.xpReward} XP
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 mb-1.5">
                  <h3 className="font-bold text-base text-slate-100">{badge.name}</h3>
                  {isUnlocked && (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  )}
                </div>

                <p className="text-xs text-slate-400 leading-relaxed font-sans mb-4">
                  {badge.description}
                </p>
              </div>

              <div className="pt-3 border-t border-cz-dark-800/80 flex items-center justify-between text-[11px] font-mono">
                <span className="text-slate-400">{badge.requirementDescription}</span>
                {isUnlocked ? (
                  <span className="px-2 py-0.5 rounded bg-emerald-950/70 border border-emerald-500/30 text-emerald-400 font-bold">
                    UNLOCKED
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-slate-500">
                    <Lock className="w-3 h-3" /> Locked
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Admin Create Badge Modal */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Admin: Create Custom Codezilla Badge"
        maxWidth="md"
      >
        <form onSubmit={handleCreateBadge} className="space-y-4">
          <p className="text-xs text-slate-400">
            Codezilla supports dynamic administrator badge creation. New badges are immediately accessible to student profiles and scoring.
          </p>

          <div>
            <label className="block text-xs font-mono text-slate-300 mb-1">
              Badge Name
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Graph Grandmaster"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-cz-dark-950 border border-cz-dark-750 focus:border-cz-orange rounded-xl px-3 py-2 text-xs text-slate-100"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1">
                Badge Icon (Emoji / Symbol)
              </label>
              <input
                type="text"
                required
                value={icon}
                onChange={(e) => setIcon(e.target.value)}
                className="w-full bg-cz-dark-950 border border-cz-dark-750 focus:border-cz-orange rounded-xl px-3 py-2 text-xs text-slate-100 text-center text-lg"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1">
                Rarity Tier
              </label>
              <select
                value={rarity}
                onChange={(e) => setRarity(e.target.value as BadgeRarity)}
                className="w-full bg-cz-dark-950 border border-cz-dark-750 text-xs font-mono text-slate-100 rounded-xl px-3 py-2"
              >
                <option value="Common">Common</option>
                <option value="Rare">Rare</option>
                <option value="Epic">Epic</option>
                <option value="Legendary">Legendary</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as BadgeCategory)}
                className="w-full bg-cz-dark-950 border border-cz-dark-750 text-xs font-mono text-slate-100 rounded-xl px-3 py-2"
              >
                <option value="milestone">Milestone</option>
                <option value="streak">Streak</option>
                <option value="difficulty">Difficulty</option>
                <option value="speed">Speed</option>
                <option value="special">Special</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1">
                XP Reward
              </label>
              <input
                type="number"
                min="5"
                max="100"
                value={xpReward}
                onChange={(e) => setXpReward(parseInt(e.target.value, 10))}
                className="w-full bg-cz-dark-950 border border-cz-dark-750 text-xs font-mono text-slate-100 rounded-xl px-3 py-2"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-300 mb-1">
              Description
            </label>
            <textarea
              rows={2}
              required
              placeholder="e.g. Mastered shortest path and union-find algorithms."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-cz-dark-950 border border-cz-dark-750 focus:border-cz-orange rounded-xl px-3 py-2 text-xs text-slate-100"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-300 mb-1">
              Requirement Description
            </label>
            <input
              type="text"
              required
              value={reqDesc}
              onChange={(e) => setReqDesc(e.target.value)}
              className="w-full bg-cz-dark-950 border border-cz-dark-750 focus:border-cz-orange rounded-xl px-3 py-2 text-xs text-slate-100"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2.5 bg-cz-orange hover:bg-cz-orange-hover text-cz-dark-950 font-bold font-mono text-xs rounded-xl shadow-cz-orange transition-all"
          >
            Publish Badge to Arena 🦊
          </button>
        </form>
      </Modal>
    </div>
  );
};

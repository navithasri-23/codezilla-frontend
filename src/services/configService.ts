import { ProblemDifficulty } from '../types/submission';
import { LevelInfo } from '../types/user';

export interface PointSettings {
  easyXp: number;
  mediumXp: number;
  hardXp: number;
  dailyMissionBonusXp: number;
  weeklyStreakBonusXp: number;
}

const DEFAULT_POINT_SETTINGS: PointSettings = {
  easyXp: 2,
  mediumXp: 3,
  hardXp: 4,
  dailyMissionBonusXp: 2,
  weeklyStreakBonusXp: 5,
};

export const LEVEL_TIERS: LevelInfo[] = [
  { level: 1, title: 'Rookie Fox', minXp: 0, maxXp: 25, icon: '🦊', color: '#94A3B8' },
  { level: 2, title: 'Code Explorer', minXp: 25, maxXp: 70, icon: '🧭', color: '#60A5FA' },
  { level: 3, title: 'Debugger', minXp: 70, maxXp: 140, icon: '⚡', color: '#818CF8' },
  { level: 4, title: 'Problem Hunter', minXp: 140, maxXp: 250, icon: '🎯', color: '#F59E0B' },
  { level: 5, title: 'Code Ninja', minXp: 250, maxXp: 400, icon: '🥷', color: '#EC4899' },
  { level: 6, title: 'Algorithm Beast', minXp: 400, maxXp: 600, icon: '🐺', color: '#A855F7' },
  { level: 7, title: 'Apex Codezilla', minXp: 600, maxXp: 1000, icon: '👑', color: '#FF6B00' },
];

class ConfigService {
  private settings: PointSettings = { ...DEFAULT_POINT_SETTINGS };

  constructor() {
    this.loadSettings();
  }

  private loadSettings() {
    try {
      const stored = localStorage.getItem('codezilla_point_settings');
      if (stored) {
        this.settings = { ...DEFAULT_POINT_SETTINGS, ...JSON.parse(stored) };
      }
    } catch {
      this.settings = { ...DEFAULT_POINT_SETTINGS };
    }
  }

  public getPointSettings(): PointSettings {
    return { ...this.settings };
  }

  public updatePointSettings(newSettings: Partial<PointSettings>): PointSettings {
    this.settings = { ...this.settings, ...newSettings };
    try {
      localStorage.setItem('codezilla_point_settings', JSON.stringify(this.settings));
    } catch {
      // ignore
    }
    return { ...this.settings };
  }

  public getXpForDifficulty(difficulty: ProblemDifficulty): number {
    switch (difficulty) {
      case 'Easy':
        return this.settings.easyXp;
      case 'Medium':
        return this.settings.mediumXp;
      case 'Hard':
        return this.settings.hardXp;
      default:
        return 2;
    }
  }

  public getLevelInfo(xp: number): {
    currentLevel: LevelInfo;
    nextLevel: LevelInfo | null;
    currentLevelXp: number;
    neededLevelXp: number;
    progressPercentage: number;
  } {
    let current = LEVEL_TIERS[0];
    let next: LevelInfo | null = LEVEL_TIERS[1];

    for (let i = 0; i < LEVEL_TIERS.length; i++) {
      if (xp >= LEVEL_TIERS[i].minXp) {
        current = LEVEL_TIERS[i];
        next = i + 1 < LEVEL_TIERS.length ? LEVEL_TIERS[i + 1] : null;
      }
    }

    if (!next) {
      return {
        currentLevel: current,
        nextLevel: null,
        currentLevelXp: xp - current.minXp,
        neededLevelXp: 0,
        progressPercentage: 100,
      };
    }

    const range = next.minXp - current.minXp;
    const progressIntoLevel = Math.max(0, xp - current.minXp);
    const progressPercentage = Math.min(100, Math.round((progressIntoLevel / range) * 100));

    return {
      currentLevel: current,
      nextLevel: next,
      currentLevelXp: progressIntoLevel,
      neededLevelXp: range,
      progressPercentage,
    };
  }
}

export const configService = new ConfigService();

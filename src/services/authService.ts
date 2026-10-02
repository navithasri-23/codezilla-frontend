import { MOCK_USERS } from '../data/mockUsers';
import { User, StudentYear } from '../types/user';

export interface IAuthService {
  getCurrentUser(): Promise<User | null>;
  login(email: string): Promise<User>;
  signup(data: {
    fullName: string;
    email: string;
    username: string;
    year: StudentYear;
    leetcodeUsername: string;
  }): Promise<User>;
  loginWithGoogle(): Promise<User>;
  logout(): Promise<void>;
  switchUser(userId: string): Promise<User>;
}

class AuthService implements IAuthService {
  private currentUserId: string = 'user-1'; // Default: Arjun Sharma

  constructor() {
    const saved = localStorage.getItem('codezilla_current_user_id');
    if (saved && MOCK_USERS.some(u => u.id === saved)) {
      this.currentUserId = saved;
    }
  }

  async getCurrentUser(): Promise<User | null> {
    const user = MOCK_USERS.find(u => u.id === this.currentUserId) || MOCK_USERS[0];
    return user ? { ...user } : null;
  }

  async login(email: string): Promise<User> {
    const found = MOCK_USERS.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (found) {
      this.currentUserId = found.id;
      localStorage.setItem('codezilla_current_user_id', found.id);
      return { ...found };
    }
    // Fallback to primary demo user
    this.currentUserId = MOCK_USERS[0].id;
    localStorage.setItem('codezilla_current_user_id', this.currentUserId);
    return { ...MOCK_USERS[0] };
  }

  async signup(data: {
    fullName: string;
    email: string;
    username: string;
    year: StudentYear;
    leetcodeUsername: string;
  }): Promise<User> {
    const newUser: User = {
      id: `user-${Date.now()}`,
      username: data.username.toLowerCase().replace(/\s+/g, '_'),
      fullName: data.fullName,
      email: data.email,
      avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${data.username}`,
      year: data.year,
      leetcodeUsername: data.leetcodeUsername,
      isLeetcodeVerified: true,
      joinedDate: new Date().toISOString().split('T')[0],
      badgesEarned: ['fox-initiate'],
      stats: {
        lifetimeXp: 5,
        weeklyXp: 5,
        lifetimeSolved: 1,
        weeklySolved: 1,
        easySolved: 1,
        mediumSolved: 0,
        hardSolved: 0,
        currentStreak: 1,
        longestStreak: 1,
        weeklyRank: MOCK_USERS.length + 1,
        bestWeeklyRank: MOCK_USERS.length + 1,
      },
    };

    MOCK_USERS.push(newUser);
    this.currentUserId = newUser.id;
    localStorage.setItem('codezilla_current_user_id', newUser.id);
    return { ...newUser };
  }

  async loginWithGoogle(): Promise<User> {
    // Mock OAuth popup flow
    this.currentUserId = MOCK_USERS[0].id;
    localStorage.setItem('codezilla_current_user_id', this.currentUserId);
    return { ...MOCK_USERS[0] };
  }

  async logout(): Promise<void> {
    localStorage.removeItem('codezilla_current_user_id');
  }

  async switchUser(userId: string): Promise<User> {
    const user = MOCK_USERS.find(u => u.id === userId);
    if (!user) throw new Error('User not found');
    this.currentUserId = userId;
    localStorage.setItem('codezilla_current_user_id', userId);
    return { ...user };
  }
}

export const authService = new AuthService();

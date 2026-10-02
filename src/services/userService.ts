import { MOCK_USERS } from '../data/mockUsers';
import { User, StudentYear } from '../types/user';

export interface IUserService {
  getUserById(id: string): Promise<User | null>;
  getAllUsers(): Promise<User[]>;
  getUsersByYear(year: StudentYear): Promise<User[]>;
  updateProfile(id: string, updates: Partial<User>): Promise<User>;
  linkLeetcode(id: string, leetcodeUsername: string): Promise<User>;
}

class UserService implements IUserService {
  async getUserById(id: string): Promise<User | null> {
    const user = MOCK_USERS.find(u => u.id === id);
    return user ? { ...user } : null;
  }

  async getAllUsers(): Promise<User[]> {
    return [...MOCK_USERS];
  }

  async getUsersByYear(year: StudentYear): Promise<User[]> {
    return MOCK_USERS.filter(u => u.year === year);
  }

  async updateProfile(id: string, updates: Partial<User>): Promise<User> {
    const index = MOCK_USERS.findIndex(u => u.id === id);
    if (index === -1) throw new Error('User not found');
    MOCK_USERS[index] = { ...MOCK_USERS[index], ...updates };
    return { ...MOCK_USERS[index] };
  }

  async linkLeetcode(id: string, leetcodeUsername: string): Promise<User> {
    return this.updateProfile(id, {
      leetcodeUsername,
      isLeetcodeVerified: true,
    });
  }
}

export const userService = new UserService();

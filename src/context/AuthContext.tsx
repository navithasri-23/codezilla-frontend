import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, StudentYear } from '../types/user';
import { authService } from '../services/authService';
import confetti from 'canvas-confetti';

interface AuthContextType {
  currentUser: User | null;
  isLoading: boolean;
  login: (email: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  signup: (data: {
    fullName: string;
    email: string;
    username: string;
    year: StudentYear;
    leetcodeUsername: string;
  }) => Promise<void>;
  logout: () => Promise<void>;
  switchUser: (userId: string) => Promise<void>;
  refreshUser: () => Promise<void>;
  triggerCelebration: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const user = await authService.getCurrentUser();
      setCurrentUser(user);
    } catch (err) {
      console.error('Failed to load current user', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const triggerCelebration = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#FF6B00', '#FBBF24', '#6366F1', '#ffffff'],
    });
  };

  const login = async (email: string) => {
    setIsLoading(true);
    const user = await authService.login(email);
    setCurrentUser(user);
    setIsLoading(false);
    triggerCelebration();
  };

  const loginWithGoogle = async () => {
    setIsLoading(true);
    const user = await authService.loginWithGoogle();
    setCurrentUser(user);
    setIsLoading(false);
    triggerCelebration();
  };

  const signup = async (data: {
    fullName: string;
    email: string;
    username: string;
    year: StudentYear;
    leetcodeUsername: string;
  }) => {
    setIsLoading(true);
    const user = await authService.signup(data);
    setCurrentUser(user);
    setIsLoading(false);
    triggerCelebration();
  };

  const logout = async () => {
    await authService.logout();
    setCurrentUser(null);
  };

  const switchUser = async (userId: string) => {
    setIsLoading(true);
    const user = await authService.switchUser(userId);
    setCurrentUser(user);
    setIsLoading(false);
  };

  const refreshUser = async () => {
    const user = await authService.getCurrentUser();
    setCurrentUser(user);
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isLoading,
        login,
        loginWithGoogle,
        signup,
        logout,
        switchUser,
        refreshUser,
        triggerCelebration,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};

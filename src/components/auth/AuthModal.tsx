import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { useAuth } from '../../context/AuthContext';
import { FoxMascot } from '../common/FoxMascot';
import { StudentYear } from '../../types/user';
import { MOCK_USERS } from '../../data/mockUsers';
import { Check, ShieldCheck, UserCheck, Sparkles, ExternalLink } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'login' | 'signup';
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  initialMode = 'login',
}) => {
  const { login, signup, loginWithGoogle, switchUser } = useAuth();
  const [mode, setMode] = useState<'login' | 'signup'>(initialMode);

  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [year, setYear] = useState<StudentYear>('Second Year');
  const [leetcodeUsername, setLeetcodeUsername] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleGoogleAuth = async () => {
    try {
      setIsSubmitting(true);
      await loginWithGoogle();
      onClose();
    } catch {
      setError('Google authentication failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      if (mode === 'login') {
        if (!email) {
          setError('Please provide an email address');
          setIsSubmitting(false);
          return;
        }
        await login(email);
      } else {
        if (!fullName || !email || !username || !leetcodeUsername) {
          setError('Please complete all required fields');
          setIsSubmitting(false);
          return;
        }
        await signup({
          fullName,
          email,
          username,
          year,
          leetcodeUsername,
        });
      }
      onClose();
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || 'Authentication error');
      } else {
        setError('Authentication error');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDemoSwitch = async (userId: string) => {
    await switchUser(userId);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={
        <div className="flex items-center gap-2">
          <FoxMascot mood="smart" size="sm" />
          <span>{mode === 'login' ? 'Enter Codezilla Arena' : 'Join the Coding Club'}</span>
        </div>
      }
      maxWidth="md"
    >
      <div className="space-y-5">
        {/* Mode Toggle Tabs */}
        <div className="grid grid-cols-2 p-1 bg-cz-dark-950 rounded-xl border border-cz-dark-800">
          <button
            type="button"
            onClick={() => setMode('login')}
            className={`py-2 text-sm font-semibold rounded-lg transition-all ${
              mode === 'login'
                ? 'bg-cz-dark-800 text-cz-orange shadow-sm border border-cz-orange/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => setMode('signup')}
            className={`py-2 text-sm font-semibold rounded-lg transition-all ${
              mode === 'signup'
                ? 'bg-cz-dark-800 text-cz-orange shadow-sm border border-cz-orange/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Create Account
          </button>
        </div>

        {error && (
          <div className="p-3 bg-red-950/40 border border-red-500/30 text-red-300 text-xs rounded-lg">
            {error}
          </div>
        )}

        {/* Continue with Google */}
        <button
          type="button"
          onClick={handleGoogleAuth}
          disabled={isSubmitting}
          className="w-full flex items-center justify-center gap-3 py-2.5 px-4 bg-cz-dark-800 hover:bg-cz-dark-750 text-slate-100 border border-cz-dark-700 rounded-xl font-medium text-sm transition-all hover:border-slate-500 active:scale-[0.99]"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
            />
          </svg>
          <span>Continue with Google</span>
        </button>

        <div className="flex items-center gap-3">
          <div className="h-px bg-cz-dark-800 flex-1" />
          <span className="text-xs text-slate-500 uppercase tracking-widest font-mono">
            Or with student credentials
          </span>
          <div className="h-px bg-cz-dark-800 flex-1" />
        </div>

        {/* Regular Auth Form */}
        <form onSubmit={handleSubmit} className="space-y-3.5">
          {mode === 'signup' && (
            <>
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Arjun Sharma"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-cz-dark-950 border border-cz-dark-750 focus:border-cz-orange rounded-xl px-3.5 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-cz-orange"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Username
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="arjun_codes"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full bg-cz-dark-950 border border-cz-dark-750 focus:border-cz-orange rounded-xl px-3.5 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-cz-orange"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    College Year
                  </label>
                  <select
                    value={year}
                    onChange={(e) => setYear(e.target.value as StudentYear)}
                    className="w-full bg-cz-dark-950 border border-cz-dark-750 focus:border-cz-orange rounded-xl px-3.5 py-2 text-sm text-slate-100 focus:outline-none focus:ring-1 focus:ring-cz-orange"
                  >
                    <option value="First Year">First Year</option>
                    <option value="Second Year">Second Year</option>
                    <option value="Third Year">Third Year</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1 flex items-center justify-between">
                  <span>LeetCode Username</span>
                  <span className="text-[11px] text-cz-orange flex items-center gap-1 font-mono">
                    <ShieldCheck className="w-3 h-3" /> External verification
                  </span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    placeholder="e.g. arjun_algo"
                    value={leetcodeUsername}
                    onChange={(e) => setLeetcodeUsername(e.target.value)}
                    className="w-full bg-cz-dark-950 border border-cz-dark-750 focus:border-cz-orange rounded-xl pl-3.5 pr-10 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-cz-orange"
                  />
                  {leetcodeUsername.length > 2 && (
                    <span className="absolute right-3 top-2.5 text-emerald-400">
                      <Check className="w-4 h-4" />
                    </span>
                  )}
                </div>
              </div>
            </>
          )}

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              College Email
            </label>
            <input
              type="email"
              required
              placeholder="student@college.edu"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-cz-dark-950 border border-cz-dark-750 focus:border-cz-orange rounded-xl px-3.5 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-cz-orange"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-cz-dark-950 border border-cz-dark-750 focus:border-cz-orange rounded-xl px-3.5 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-cz-orange"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full mt-2 py-3 bg-gradient-to-r from-cz-orange to-cz-orange-hover hover:from-cz-orange-hover hover:to-cz-orange text-cz-dark-950 font-bold rounded-xl shadow-cz-orange transition-all duration-200 active:scale-[0.98] flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>{mode === 'login' ? 'Enter Dashboard' : 'Join Codezilla Club'}</span>
          </button>
        </form>

        {/* Demo Fast Switcher */}
        <div className="pt-3 border-t border-cz-dark-800">
          <div className="text-xs font-mono text-slate-400 mb-2 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <UserCheck className="w-3.5 h-3.5 text-cz-purple-neon" />
              <span>Quick Test as Existing Student:</span>
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {MOCK_USERS.slice(0, 3).map((u) => (
              <button
                key={u.id}
                type="button"
                onClick={() => handleDemoSwitch(u.id)}
                className="text-left p-2 rounded-lg bg-cz-dark-950 hover:bg-cz-dark-800 border border-cz-dark-800 hover:border-cz-orange/50 transition-all text-xs group"
              >
                <div className="font-semibold text-slate-200 group-hover:text-cz-orange truncate">
                  {u.fullName.split(' ')[0]}
                </div>
                <div className="text-[10px] text-slate-400 truncate">
                  {u.year.split(' ')[0]} Yr • {u.stats.weeklyXp} XP
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </Modal>
  );
};

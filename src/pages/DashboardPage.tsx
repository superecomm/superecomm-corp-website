import { useState, useEffect, type FC } from 'react';
import { Loader2, AlertCircle, Zap, Calendar, Award, ExternalLink, Copy, Check, LogOut } from 'lucide-react';
import { auth, db } from '../config/firebase';
import { onAuthStateChanged, signOut, type User } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import type { UserProfile } from '../types/grid';

interface DashboardPageProps {
  darkMode: boolean;
  onNavigate: (page: string) => void;
}

// Helper to format relative time
const getRelativeTime = (date: Date): string => {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};

export const DashboardPage: FC<DashboardPageProps> = ({ darkMode, onNavigate }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [copiedGridId, setCopiedGridId] = useState(false);
  const [accountCreatedDate, setAccountCreatedDate] = useState<Date | null>(null);
  const [loggingOut, setLoggingOut] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        await loadUserProfile(currentUser.uid);
      } else {
        // Not logged in, redirect to reserve page
        onNavigate('reserve');
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [onNavigate]);

  const loadUserProfile = async (uid: string) => {
    try {
      const userDoc = await getDoc(doc(db, 'users', uid));
      
      if (userDoc.exists()) {
        const profile = userDoc.data() as UserProfile;
        setUserProfile(profile);
        
        // Get account creation date - handle both Timestamp and Date
        if (profile.createdAt) {
          const createdAt = profile.createdAt instanceof Date 
            ? profile.createdAt 
            : (profile.createdAt as any).toDate();
          setAccountCreatedDate(createdAt);
        } else if (profile.gridAccount?.reservedAt) {
          const reservedAt = profile.gridAccount.reservedAt instanceof Date 
            ? profile.gridAccount.reservedAt 
            : (profile.gridAccount.reservedAt as any).toDate();
          setAccountCreatedDate(reservedAt);
        }
      } else {
        setError('User profile not found');
      }
    } catch (err: any) {
      console.error('Error loading user profile:', err);
      setError(err.message || 'Failed to load profile');
    }
  };

  const copyGridId = async () => {
    if (userProfile?.gridAccount?.displayId) {
      await navigator.clipboard.writeText(userProfile.gridAccount.displayId);
      setCopiedGridId(true);
      setTimeout(() => setCopiedGridId(false), 2000);
    }
  };

  const handleLogout = async () => {
    try {
      setLoggingOut(true);
      await signOut(auth);
      onNavigate('home');
    } catch (error) {
      console.error('Error logging out:', error);
      setError('Failed to log out');
    } finally {
      setLoggingOut(false);
    }
  };

  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${
        darkMode ? 'bg-gray-950' : 'bg-white'
      }`}>
        <div className="text-center">
          <Loader2 className={`w-12 h-12 animate-spin mx-auto mb-4 ${
            darkMode ? 'text-blue-400' : 'text-blue-600'
          }`} />
          <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
            Loading your dashboard...
          </p>
        </div>
      </div>
    );
  }

  if (!user || !userProfile) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${
        darkMode ? 'bg-gray-950' : 'bg-white'
      }`}>
        <div className="max-w-md mx-auto text-center p-8">
          <AlertCircle className={`w-16 h-16 mx-auto mb-4 ${
            darkMode ? 'text-red-400' : 'text-red-600'
          }`} />
          <h2 className={`text-2xl font-semibold mb-2 ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Access Denied
          </h2>
          <p className={`mb-6 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            {error || 'Please reserve your AI Grid Layer account first'}
          </p>
          <button
            onClick={() => onNavigate('reserve')}
            className={`px-6 py-3 rounded-lg font-medium ${
              darkMode
                ? 'bg-blue-600 hover:bg-blue-500 text-white'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            Reserve Account
          </button>
        </div>
      </div>
    );
  }

  const hasReservation = userProfile.reservation?.paid === true;
  const hasGridAccount = !!userProfile.gridAccount;

  const firstName = userProfile?.displayName?.split(' ')[0] || 'there';

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-950' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
        
        {/* Header */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className={`text-3xl sm:text-4xl font-light mb-2 ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Welcome back, {firstName}
            </h1>
            <p className={`text-sm ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
              {user.email} {accountCreatedDate && `• Member since ${accountCreatedDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}`}
            </p>
          </div>
          <button
            onClick={handleLogout}
            disabled={loggingOut}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors self-start sm:self-auto ${
              darkMode
                ? 'bg-gray-800 hover:bg-gray-700 text-gray-300 border border-gray-700'
                : 'bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 shadow-sm'
            } disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {loggingOut ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Logging out...
              </>
            ) : (
              <>
                <LogOut className="w-4 h-4" />
                Logout
              </>
            )}
          </button>
        </div>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          
          {/* Grid Account Card - Spans 2 columns on large screens */}
          {hasGridAccount && userProfile.gridAccount && (
            <div className={`lg:col-span-2 p-6 rounded-xl border ${
              darkMode ? 'border-gray-800 bg-gray-900/50' : 'border-gray-200 bg-white shadow-sm'
            }`}>
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-3">
                  <Award className={`w-6 h-6 ${darkMode ? 'text-yellow-400' : 'text-yellow-600'}`} />
                  <div>
                    <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                      {userProfile.gridAccount.edition}
                    </p>
                    <h2 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      Founding Member
                    </h2>
                  </div>
                </div>
                <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                  hasReservation
                    ? darkMode ? 'bg-green-500/20 text-green-400' : 'bg-green-100 text-green-700'
                    : darkMode ? 'bg-yellow-500/20 text-yellow-400' : 'bg-yellow-100 text-yellow-700'
                }`}>
                  {hasReservation ? 'Confirmed' : 'Pending'}
                </div>
              </div>

              <div className={`p-4 rounded-lg mb-4 ${
                darkMode ? 'bg-gray-800/50' : 'bg-gray-50'
              }`}>
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className={`text-xs mb-1 ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                      Grid Account ID
                    </p>
                    <p className={`text-lg font-mono font-bold ${
                      darkMode ? 'text-blue-400' : 'text-blue-600'
                    }`}>
                      {userProfile.gridAccount.displayId}
                    </p>
                  </div>
                  <button
                    onClick={copyGridId}
                    className={`p-2 rounded-lg transition-colors ${
                      darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'
                    }`}
                    title="Copy Grid ID"
                  >
                    {copiedGridId ? (
                      <Check className={`w-5 h-5 ${darkMode ? 'text-green-400' : 'text-green-600'}`} />
                    ) : (
                      <Copy className={`w-5 h-5 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`} />
                    )}
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div>
                  <p className={`text-xs mb-1 ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                    Tier
                  </p>
                  <p className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {userProfile.gridAccount.tier}
                  </p>
                </div>
                <div>
                  <p className={`text-xs mb-1 ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                    Region
                  </p>
                  <p className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {userProfile.gridAccount.country}-{userProfile.gridAccount.region}
                  </p>
                </div>
                <div>
                  <p className={`text-xs mb-1 ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                    Reserved
                  </p>
                  <p className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {accountCreatedDate ? getRelativeTime(accountCreatedDate) : 'Recently'}
                  </p>
                </div>
                <div>
                  <p className={`text-xs mb-1 ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                    Credit
                  </p>
                  <p className={`text-sm font-medium ${darkMode ? 'text-green-400' : 'text-green-600'}`}>
                    {hasReservation ? '$10.00' : '$0.00'}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Status Card */}
          <div className={`p-6 rounded-xl border ${
            darkMode ? 'border-gray-800 bg-gray-900/50' : 'border-gray-200 bg-white shadow-sm'
          }`}>
            <h3 className={`text-sm font-medium mb-4 ${
              darkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Account Status
            </h3>
            <div className="space-y-3">
              {!userProfile.gridAccount?.activated && (
                <div className={`p-3 rounded-lg ${
                  darkMode ? 'bg-blue-500/10 border border-blue-500/20' : 'bg-blue-50 border border-blue-200'
                }`}>
                  <div className="flex items-start gap-2">
                    <Calendar className={`w-4 h-4 mt-0.5 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                    <div>
                      <p className={`text-xs font-medium ${darkMode ? 'text-blue-400' : 'text-blue-700'}`}>
                        Pre-Launch Member
                      </p>
                      <p className={`text-xs mt-1 ${darkMode ? 'text-blue-300/80' : 'text-blue-600/80'}`}>
                        You'll be notified when metering goes live
                      </p>
                    </div>
                  </div>
                </div>
              )}
              {hasReservation && (
                <div className={`p-3 rounded-lg ${
                  darkMode ? 'bg-green-500/10 border border-green-500/20' : 'bg-green-50 border border-green-200'
                }`}>
                  <div className="flex items-start gap-2">
                    <Check className={`w-4 h-4 mt-0.5 ${darkMode ? 'text-green-400' : 'text-green-600'}`} />
                    <div>
                      <p className={`text-xs font-medium ${darkMode ? 'text-green-400' : 'text-green-700'}`}>
                        Reservation Active
                      </p>
                      <p className={`text-xs mt-1 ${darkMode ? 'text-green-300/80' : 'text-green-600/80'}`}>
                        $10 refundable credit reserved
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* No Grid Account Yet */}
        {!hasGridAccount && (
          <div className={`mb-6 p-6 rounded-xl border text-center ${
            darkMode ? 'border-yellow-500/30 bg-yellow-500/10' : 'border-yellow-200 bg-yellow-50'
          }`}>
            <AlertCircle className={`w-10 h-10 mx-auto mb-3 ${
              darkMode ? 'text-yellow-400' : 'text-yellow-600'
            }`} />
            <h3 className={`text-lg font-semibold mb-2 ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>
              No Grid Account Yet
            </h3>
            <p className={`text-sm mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Reserve your AI Grid Layer account to get your unique Grid ID
            </p>
            <button
              onClick={() => onNavigate('reserve')}
              className={`px-5 py-2 rounded-lg text-sm font-medium ${
                darkMode
                  ? 'bg-blue-600 hover:bg-blue-500 text-white'
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
            >
              Reserve for $10
            </button>
          </div>
        )}

        {/* Activity Timeline & Coming Soon Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          
          {/* Recent Activity */}
          <div className={`p-6 rounded-xl border ${
            darkMode ? 'border-gray-800 bg-gray-900/50' : 'border-gray-200 bg-white shadow-sm'
          }`}>
            <h3 className={`text-lg font-semibold mb-4 ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Updates & News
            </h3>
            
            <div className="space-y-4">
              {/* Dynamic user activity */}
              {accountCreatedDate && (
                <div className="flex gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    darkMode ? 'bg-green-500/20' : 'bg-green-100'
                  }`}>
                    <Check className={`w-4 h-4 ${darkMode ? 'text-green-400' : 'text-green-600'}`} />
                  </div>
                  <div className="flex-1">
                    <p className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      Welcome to AI Grid Layer
                    </p>
                    <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {hasReservation 
                        ? 'Reservation confirmed. Your $10 will convert to AI credit when metering launches.'
                        : 'Account created successfully.'
                      }
                    </p>
                    <p className={`text-xs mt-1 ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                      {getRelativeTime(accountCreatedDate)}
                    </p>
                  </div>
                </div>
              )}

              <div className="flex gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  darkMode ? 'bg-blue-500/20' : 'bg-blue-100'
                }`}>
                  <Zap className={`w-4 h-4 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                </div>
                <div className="flex-1">
                  <p className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    Grid Infrastructure Development
                  </p>
                  <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    We're building the core aiWh metering architecture and multi-model orchestration system.
                  </p>
                  <p className={`text-xs mt-1 ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                    Ongoing
                  </p>
                </div>
              </div>

              <a
                href="https://twitter.com/plusailabs"
                target="_blank"
                rel="noopener noreferrer"
                className={`flex gap-3 p-3 rounded-lg transition-colors ${
                  darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-50'
                }`}
              >
                <ExternalLink className={`w-5 h-5 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                <div className="flex-1">
                  <p className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    Follow Our Progress
                  </p>
                  <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Get real-time updates on X/Twitter
                  </p>
                </div>
              </a>
            </div>
          </div>

          {/* Coming Soon Features */}
          <div className={`p-6 rounded-xl border ${
            darkMode ? 'border-blue-500/30 bg-blue-500/5' : 'border-blue-200 bg-blue-50/50 shadow-sm'
          }`}>
            <div className="flex items-center gap-2 mb-4">
              <Zap className={`w-5 h-5 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
              <h3 className={`text-lg font-semibold ${darkMode ? 'text-blue-400' : 'text-blue-900'}`}>
                Coming Soon to Your Dashboard
              </h3>
            </div>
            
            <ul className={`space-y-3 text-sm ${darkMode ? 'text-blue-300' : 'text-blue-800'}`}>
              <li className="flex items-start gap-2">
                <span className={darkMode ? 'text-blue-500' : 'text-blue-600'}>•</span>
                <span>Real-time aiWh usage tracking</span>
              </li>
              <li className="flex items-start gap-2">
                <span className={darkMode ? 'text-blue-500' : 'text-blue-600'}>•</span>
                <span>Direct access to 1000+ AI models</span>
              </li>
              <li className="flex items-start gap-2">
                <span className={darkMode ? 'text-blue-500' : 'text-blue-600'}>•</span>
                <span>Usage history and analytics</span>
              </li>
              <li className="flex items-start gap-2">
                <span className={darkMode ? 'text-blue-500' : 'text-blue-600'}>•</span>
                <span>Billing and payment management</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Quick Actions Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <button
            onClick={() => onNavigate('home')}
            className={`flex items-center justify-between p-4 rounded-xl border transition-all hover:scale-[1.02] ${
              darkMode
                ? 'border-gray-800 bg-gray-900/50 hover:border-gray-700'
                : 'border-gray-200 bg-white hover:border-gray-300 shadow-sm'
            }`}
          >
            <span className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Homepage
            </span>
            <ExternalLink className={`w-4 h-4 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
          </button>
          
          <button
            onClick={() => onNavigate('support')}
            className={`flex items-center justify-between p-4 rounded-xl border transition-all hover:scale-[1.02] ${
              darkMode
                ? 'border-gray-800 bg-gray-900/50 hover:border-gray-700'
                : 'border-gray-200 bg-white hover:border-gray-300 shadow-sm'
            }`}
          >
            <span className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Support
            </span>
            <ExternalLink className={`w-4 h-4 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
          </button>

          <a
            href="https://twitter.com/plusailabs"
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center justify-between p-4 rounded-xl border transition-all hover:scale-[1.02] ${
              darkMode
                ? 'border-gray-800 bg-gray-900/50 hover:border-gray-700'
                : 'border-gray-200 bg-white hover:border-gray-300 shadow-sm'
            }`}
          >
            <span className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Follow on X/Twitter
            </span>
            <ExternalLink className={`w-4 h-4 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;


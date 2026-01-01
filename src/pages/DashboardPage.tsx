import { useState, useEffect, type FC } from 'react';
import { Loader2, AlertCircle, Zap, Calendar, Award, ExternalLink, Copy, Check } from 'lucide-react';
import { auth, db } from '../config/firebase';
import { onAuthStateChanged, type User } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import type { UserProfile } from '../types/grid';

interface DashboardPageProps {
  darkMode: boolean;
  onNavigate: (page: string) => void;
}

interface Announcement {
  id: string;
  title: string;
  date: string;
  content: string;
  type: 'update' | 'feature' | 'announcement';
}

// Stub announcements - in production, fetch from Firestore
const ANNOUNCEMENTS: Announcement[] = [
  {
    id: '1',
    title: 'Welcome to the AI Grid Layer',
    date: '2025-01-01',
    content: 'Thank you for being a Founding Member! Your reservation is confirmed and will convert to $10 in AI usage credit when metering launches.',
    type: 'announcement'
  },
  {
    id: '2',
    title: 'Grid Infrastructure Development',
    date: '2025-01-01',
    content: 'We\'re building the core aiWh metering architecture and multi-model orchestration system. Follow our progress on LinkedIn and Twitter.',
    type: 'update'
  },
  {
    id: '3',
    title: 'Upcoming: AI Model Access',
    date: '2025-01-01',
    content: 'Soon you\'ll have access to 1000+ AI models through a single interface. We\'ll notify you when early access launches.',
    type: 'feature'
  }
];

export const DashboardPage: FC<DashboardPageProps> = ({ darkMode, onNavigate }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [copiedGridId, setCopiedGridId] = useState(false);

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
        setUserProfile(userDoc.data() as UserProfile);
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

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'update':
        return darkMode ? 'text-blue-400' : 'text-blue-600';
      case 'feature':
        return darkMode ? 'text-purple-400' : 'text-purple-600';
      case 'announcement':
        return darkMode ? 'text-green-400' : 'text-green-600';
      default:
        return darkMode ? 'text-gray-400' : 'text-gray-600';
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

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-950' : 'bg-white'}`}>
      <div className="max-w-6xl mx-auto px-6 py-24">
        
        {/* Header */}
        <div className="mb-12">
          <h1 className={`text-4xl md:text-5xl font-light mb-4 ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Welcome to AI Grid Layer
          </h1>
          <p className={`text-lg ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            {user.email}
          </p>
        </div>

        {/* Grid Account Card */}
        {hasGridAccount && userProfile.gridAccount && (
          <div className={`mb-8 p-8 rounded-lg border ${
            darkMode ? 'border-gray-700 bg-gray-900/50' : 'border-gray-200 bg-white'
          }`}>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <Award className={`w-8 h-8 ${darkMode ? 'text-yellow-400' : 'text-yellow-600'}`} />
                  <div>
                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {userProfile.gridAccount.edition}
                    </p>
                    <p className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      Founding Member
                    </p>
                  </div>
                </div>

                <div className={`inline-flex items-center gap-3 px-4 py-2 rounded-lg ${
                  darkMode ? 'bg-gray-800' : 'bg-gray-100'
                }`}>
                  <div>
                    <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                      Grid Account ID
                    </p>
                    <p className={`text-2xl font-mono font-bold ${
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

              <div className="flex flex-col gap-4">
                <div className={`px-4 py-3 rounded-lg ${
                  hasReservation
                    ? darkMode ? 'bg-green-500/20 border border-green-500/30' : 'bg-green-50 border border-green-200'
                    : darkMode ? 'bg-yellow-500/20 border border-yellow-500/30' : 'bg-yellow-50 border border-yellow-200'
                }`}>
                  <p className={`text-sm font-semibold ${
                    hasReservation
                      ? darkMode ? 'text-green-400' : 'text-green-700'
                      : darkMode ? 'text-yellow-400' : 'text-yellow-700'
                  }`}>
                    {hasReservation ? '✓ Reservation Confirmed' : 'Pending Reservation'}
                  </p>
                  <p className={`text-xs ${
                    hasReservation
                      ? darkMode ? 'text-green-300' : 'text-green-600'
                      : darkMode ? 'text-yellow-300' : 'text-yellow-600'
                  }`}>
                    {hasReservation ? '$10 refundable • Converts to credit' : 'Complete reservation to activate'}
                  </p>
                </div>

                {!userProfile.gridAccount.activated && (
                  <div className={`px-4 py-3 rounded-lg ${
                    darkMode ? 'bg-blue-500/20 border border-blue-500/30' : 'bg-blue-50 border border-blue-200'
                  }`}>
                    <p className={`text-sm font-semibold ${
                      darkMode ? 'text-blue-400' : 'text-blue-700'
                    }`}>
                      ⏳ Metering Not Yet Active
                    </p>
                    <p className={`text-xs ${
                      darkMode ? 'text-blue-300' : 'text-blue-600'
                    }`}>
                      You'll be notified when aiWh metering launches
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Grid Details */}
            <div className="mt-6 pt-6 border-t border-gray-700/50 grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                  Tier
                </p>
                <p className={`text-sm font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {userProfile.gridAccount.tier}
                </p>
              </div>
              <div>
                <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                  Region
                </p>
                <p className={`text-sm font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {userProfile.gridAccount.country}-{userProfile.gridAccount.region}
                </p>
              </div>
              <div>
                <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                  Reserved
                </p>
                <p className={`text-sm font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {userProfile.gridAccount.reservedAt instanceof Date 
                    ? userProfile.gridAccount.reservedAt.toLocaleDateString()
                    : 'Recently'}
                </p>
              </div>
              <div>
                <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                  Status
                </p>
                <p className={`text-sm font-semibold ${
                  userProfile.gridAccount.activated
                    ? darkMode ? 'text-green-400' : 'text-green-600'
                    : darkMode ? 'text-yellow-400' : 'text-yellow-600'
                }`}>
                  {userProfile.gridAccount.activated ? 'Active' : 'Reserved'}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* No Grid Account Yet */}
        {!hasGridAccount && (
          <div className={`mb-8 p-8 rounded-lg border text-center ${
            darkMode ? 'border-yellow-500/30 bg-yellow-500/10' : 'border-yellow-200 bg-yellow-50'
          }`}>
            <AlertCircle className={`w-12 h-12 mx-auto mb-4 ${
              darkMode ? 'text-yellow-400' : 'text-yellow-600'
            }`} />
            <h3 className={`text-xl font-semibold mb-2 ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>
              No Grid Account Yet
            </h3>
            <p className={`mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Reserve your AI Grid Layer account to get your unique Grid ID
            </p>
            <button
              onClick={() => onNavigate('reserve')}
              className={`px-6 py-3 rounded-lg font-medium ${
                darkMode
                  ? 'bg-blue-600 hover:bg-blue-500 text-white'
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
            >
              Reserve for $10
            </button>
          </div>
        )}

        {/* Updates & News */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className={`text-2xl font-semibold ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Updates & News
            </h2>
          </div>

          <div className="space-y-4">
            {ANNOUNCEMENTS.map((announcement) => (
              <div
                key={announcement.id}
                className={`p-6 rounded-lg border ${
                  darkMode ? 'border-gray-700 bg-gray-900/50' : 'border-gray-200 bg-white'
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className={`text-lg font-semibold mb-1 ${
                      darkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      {announcement.title}
                    </h3>
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className={`w-4 h-4 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                      <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                        {new Date(announcement.date).toLocaleDateString()}
                      </span>
                      <span className={`ml-2 px-2 py-0.5 rounded text-xs font-medium ${getTypeColor(announcement.type)}`}>
                        {announcement.type}
                      </span>
                    </div>
                  </div>
                </div>
                <p className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                  {announcement.content}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div className={`p-6 rounded-lg border ${
          darkMode ? 'border-gray-700 bg-gray-900/50' : 'border-gray-200 bg-white'
        }`}>
          <h3 className={`text-lg font-semibold mb-4 ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Quick Links
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              onClick={() => onNavigate('home')}
              className={`flex items-center justify-between p-4 rounded-lg border transition-colors ${
                darkMode
                  ? 'border-gray-700 hover:bg-gray-800'
                  : 'border-gray-200 hover:bg-gray-50'
              }`}
            >
              <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                Homepage
              </span>
              <ExternalLink className={`w-4 h-4 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
            </button>
            
            <button
              onClick={() => onNavigate('support')}
              className={`flex items-center justify-between p-4 rounded-lg border transition-colors ${
                darkMode
                  ? 'border-gray-700 hover:bg-gray-800'
                  : 'border-gray-200 hover:bg-gray-50'
              }`}
            >
              <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                Support
              </span>
              <ExternalLink className={`w-4 h-4 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
            </button>

            <a
              href="https://twitter.com/plusailabs"
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center justify-between p-4 rounded-lg border transition-colors ${
                darkMode
                  ? 'border-gray-700 hover:bg-gray-800'
                  : 'border-gray-200 hover:bg-gray-50'
              }`}
            >
              <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                Follow on X/Twitter
              </span>
              <ExternalLink className={`w-4 h-4 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
            </a>
          </div>
        </div>

        {/* Coming Soon Features */}
        <div className={`mt-8 p-6 rounded-lg border ${
          darkMode ? 'border-blue-500/30 bg-blue-500/10' : 'border-blue-200 bg-blue-50'
        }`}>
          <div className="flex items-start gap-3">
            <Zap className={`w-6 h-6 mt-0.5 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
            <div>
              <h4 className={`font-semibold mb-1 ${darkMode ? 'text-blue-400' : 'text-blue-900'}`}>
                Coming Soon to Your Dashboard
              </h4>
              <ul className={`text-sm space-y-1 ${darkMode ? 'text-blue-300' : 'text-blue-800'}`}>
                <li>• Real-time aiWh usage tracking</li>
                <li>• Direct access to 1000+ AI models</li>
                <li>• Usage history and analytics</li>
                <li>• Billing and payment management</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;


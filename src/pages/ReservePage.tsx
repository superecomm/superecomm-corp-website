import { useState, useEffect, type FC } from 'react';
import { 
  Check, Loader2, AlertCircle, Sparkles, Award, Zap, 
  Brain, Clock, TrendingUp, Shield, Smartphone,
  Coffee, Briefcase, Home as HomeIcon, Globe, X
} from 'lucide-react';
import { auth, db } from '../config/firebase';
import { 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  type User 
} from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { createGridAccountForUser, userHasReservation } from '../lib/grid/account';
import { simulatePaymentSuccess } from '../lib/payment/stripe';
import { logEmailToConsole } from '../lib/email/service';
import type { UserProfile, Reservation } from '../types/grid';

// Import marketing images
import marketingImage23 from '../assets/marketing-images/marketing-image23.jpg';
import marketingImage24 from '../assets/marketing-images/marketing-image24.jpg';
import marketingImage27 from '../assets/marketing-images/marketing-image27.jpg';
import marketingImage29 from '../assets/marketing-images/marketing-image29.jpg';
import marketingImage34 from '../assets/marketing-images/marketing-image34.jpg';

interface ReservePageProps {
  darkMode: boolean;
  onNavigateToDashboard: () => void;
}

type ReservationStep = 'landing' | 'processing' | 'success';

export const ReservePage: FC<ReservePageProps> = ({ darkMode, onNavigateToDashboard }) => {
  const [user, setUser] = useState<User | null>(null);
  const [step, setStep] = useState<ReservationStep>('landing');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [gridAccountId, setGridAccountId] = useState<string>('');
  const [alreadyReserved, setAlreadyReserved] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);

  // Auth form state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [isSignUp, setIsSignUp] = useState(true);

  // Check auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      
      if (currentUser) {
        // Check if user already has a reservation
        const hasReservation = await userHasReservation(currentUser.uid);
        if (hasReservation) {
          setAlreadyReserved(true);
          setStep('success');
          
          // Get their grid account ID
          const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
          if (userDoc.exists() && userDoc.data().gridAccount) {
            setGridAccountId(userDoc.data().gridAccount.displayId);
          }
        }
      }
    });

    return () => unsubscribe();
  }, []);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (isSignUp) {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        
        // Create user profile in Firestore
        const userProfile: Partial<UserProfile> = {
          uid: userCredential.user.uid,
          email: userCredential.user.email!,
          displayName: displayName || undefined,
          createdAt: serverTimestamp() as any,
          emailPreferences: {
            productUpdates: true,
            marketing: true
          }
        };
        
        await setDoc(doc(db, 'users', userCredential.user.uid), userProfile);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      
      // Close modal after successful auth
      setShowAuthModal(false);
    } catch (err: any) {
      setError(err.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  const handleReservation = async () => {
    if (!user) {
      setShowAuthModal(true);
      return;
    }
    
    setLoading(true);
    setError('');
    setStep('processing');

    try {
      // Simulate Stripe payment (replace with real Stripe in production)
      const paymentResult = await simulatePaymentSuccess(user.uid, 1000); // $10 in cents

      if (!paymentResult.success) {
        throw new Error('Payment failed');
      }

      // Create grid account
      const gridResult = await createGridAccountForUser(user.uid);

      if (!gridResult.success) {
        throw new Error(gridResult.error || 'Failed to create grid account');
      }

      // Update user with reservation info
      const reservation: Reservation = {
        paid: true,
        amount: 10,
        stripePaymentId: paymentResult.paymentId,
        refundable: true,
        createdAt: serverTimestamp() as any
      };

      await setDoc(doc(db, 'users', user.uid), {
        reservation,
        updatedAt: serverTimestamp()
      }, { merge: true });

      // Log confirmation email to console
      logEmailToConsole({
        toEmail: user.email!,
        displayName: displayName || user.displayName || undefined,
        gridAccountId: gridResult.gridAccountId,
        amount: 1000,
        reservedAt: new Date()
      });

      setGridAccountId(gridResult.gridAccountId);
      setStep('success');

    } catch (err: any) {
      setError(err.message || 'Reservation failed');
      setStep('landing');
    } finally {
      setLoading(false);
    }
  };

  const getShareText = () => {
    return `I'm getting AI on tap. 💧🤖

Just reserved my AI Grid Layer account:
${gridAccountId}

AI as a utility, metered like power and water.
Reserve yours here: https://superecomm.com/reserve`;
  };

  const copyShareText = () => {
    navigator.clipboard.writeText(getShareText());
    alert('Share text copied to clipboard!');
  };

  const shareOnTwitter = () => {
    const text = encodeURIComponent(getShareText());
    window.open(`https://twitter.com/intent/tweet?text=${text}`, '_blank');
  };

  const shareOnLinkedIn = () => {
    const url = encodeURIComponent('https://superecomm.com/reserve');
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank');
  };

  if (step === 'processing') {
    return (
      <div className={`min-h-screen flex items-center justify-center ${darkMode ? 'bg-gray-950' : 'bg-white'}`}>
        <div className="text-center py-16">
          <Loader2 className={`w-20 h-20 animate-spin mx-auto mb-6 ${
            darkMode ? 'text-blue-400' : 'text-blue-600'
          }`} strokeWidth={1.5} />
          <h2 className={`text-3xl font-light mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Creating Your AI Grid Layer Account
          </h2>
          <p className={`text-lg ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Generating your unique Grid ID...
          </p>
        </div>
      </div>
    );
  }

  if (step === 'success' && gridAccountId) {
    return (
      <div className={`min-h-screen ${darkMode ? 'bg-gray-950' : 'bg-white'}`}>
        <div className="max-w-4xl mx-auto px-6 py-24">
          <div className="text-center mb-12">
            <div className={`w-24 h-24 rounded-full mx-auto mb-8 flex items-center justify-center ${
              darkMode ? 'bg-green-500/20' : 'bg-green-100'
            }`}>
              <Check className={`w-14 h-14 ${darkMode ? 'text-green-400' : 'text-green-600'}`} strokeWidth={2} />
            </div>

            <h1 className={`text-5xl md:text-6xl font-light mb-6 ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>
              {alreadyReserved ? 'You\'re Already In' : 'Welcome to the Grid'}
            </h1>

            <div className={`inline-block px-8 py-4 rounded-xl mb-8 ${
              darkMode ? 'bg-gray-900 border-2 border-gray-700' : 'bg-gray-50 border-2 border-gray-200'
            }`}>
              <p className={`text-xs uppercase tracking-wider mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Your AI Grid Account ID
              </p>
              <p className={`text-4xl font-mono font-bold ${
                darkMode ? 'text-blue-400' : 'text-blue-600'
              }`}>
                {gridAccountId}
              </p>
            </div>

            {!alreadyReserved && (
              <p className={`text-xl mb-12 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                🎉 You're now a Founding Member
              </p>
            )}
          </div>

          {/* Share Section */}
          <div className={`max-w-2xl mx-auto mb-12 p-8 rounded-xl border ${
            darkMode ? 'border-gray-800 bg-gray-900/50' : 'border-gray-200 bg-gray-50'
          }`}>
            <h3 className={`text-2xl font-semibold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Spread the Word
            </h3>

            <div className={`p-4 rounded-lg mb-6 font-mono text-sm leading-relaxed ${
              darkMode ? 'bg-gray-800 text-gray-300' : 'bg-white text-gray-700 border border-gray-200'
            }`}>
              {getShareText()}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button
                onClick={copyShareText}
                className={`py-3 px-4 rounded-lg border transition-all hover:scale-105 ${
                  darkMode
                    ? 'border-gray-700 hover:bg-gray-800 text-gray-300'
                    : 'border-gray-300 hover:bg-white text-gray-700 hover:shadow-md'
                }`}
              >
                Copy Text
              </button>
              <button
                onClick={shareOnTwitter}
                className={`py-3 px-4 rounded-lg transition-all hover:scale-105 ${
                  darkMode
                    ? 'bg-blue-600 hover:bg-blue-500 text-white'
                    : 'bg-blue-500 hover:bg-blue-600 text-white shadow-md'
                }`}
              >
                Share on 𝕏
              </button>
              <button
                onClick={shareOnLinkedIn}
                className={`py-3 px-4 rounded-lg transition-all hover:scale-105 ${
                  darkMode
                    ? 'bg-blue-700 hover:bg-blue-600 text-white'
                    : 'bg-blue-600 hover:bg-blue-700 text-white shadow-md'
                }`}
              >
                LinkedIn
              </button>
            </div>
          </div>

          {/* Dashboard CTA */}
          <div className="text-center">
            <button
              onClick={onNavigateToDashboard}
              className={`px-12 py-4 rounded-lg text-lg font-semibold transition-all hover:scale-105 ${
                darkMode
                  ? 'bg-blue-600 hover:bg-blue-500 text-white'
                  : 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg'
              }`}
            >
              Go to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Landing page (Tesla-style layout)
  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-950' : 'bg-white'}`}>
      
      {/* Hero Section - Image + Pricing Card */}
      <section className="relative min-h-screen flex items-center">
        <div className="absolute inset-0 overflow-hidden">
          <img 
            src={marketingImage23} 
            alt="AI Grid Layer in action"
            className="w-full h-full object-cover opacity-70"
          />
          <div className={`absolute inset-0 ${
            darkMode 
              ? 'bg-gradient-to-r from-gray-950 via-gray-950/90 to-gray-950/70' 
              : 'bg-gradient-to-r from-white via-white/90 to-white/70'
          }`} />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Hero Text */}
          <div>
            <h1 className={`text-6xl md:text-7xl font-light mb-6 leading-tight ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>
              AI on Tap
            </h1>
            <p className={`text-2xl md:text-3xl font-light mb-8 ${
              darkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Like electricity.<br />Like water.<br />Always there.
            </p>
            <div className="flex items-baseline gap-4 mb-12">
              <div>
                <p className={`text-5xl font-light ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  1000<span className="text-3xl">+</span>
                </p>
                <p className={`text-sm uppercase tracking-wider ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  AI Models
                </p>
              </div>
              <div className={`w-px h-12 ${darkMode ? 'bg-gray-700' : 'bg-gray-300'}`} />
              <div>
                <p className={`text-5xl font-light ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  1<span className="text-3xl">x</span>
                </p>
                <p className={`text-sm uppercase tracking-wider ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Account
                </p>
              </div>
              <div className={`w-px h-12 ${darkMode ? 'bg-gray-700' : 'bg-gray-300'}`} />
              <div>
                <p className={`text-5xl font-light ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  ∞
                </p>
                <p className={`text-sm uppercase tracking-wider ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Possibilities
                </p>
              </div>
            </div>
          </div>

          {/* Right: Pricing Card (Tesla-style) */}
          <div className={`p-8 rounded-2xl border backdrop-blur-sm ${
            darkMode 
              ? 'bg-gray-900/90 border-gray-800' 
              : 'bg-white/90 border-gray-200 shadow-2xl'
          }`}>
            <h2 className={`text-3xl font-light mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Reserve Your AI Grid Layer Account
            </h2>

            {/* What's Included */}
            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                  darkMode ? 'bg-blue-500/20' : 'bg-blue-50'
                }`}>
                  <Sparkles className={`w-5 h-5 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} strokeWidth={2.5} />
                </div>
                <div>
                  <p className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    Unique AI Grid ID
                  </p>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Your personal AI utility account number
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                  darkMode ? 'bg-purple-500/20' : 'bg-purple-50'
                }`}>
                  <Award className={`w-5 h-5 ${darkMode ? 'text-purple-400' : 'text-purple-600'}`} strokeWidth={2.5} />
                </div>
                <div>
                  <p className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    Founding Member Status
                  </p>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Be among the first on the AI Grid
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                  darkMode ? 'bg-green-500/20' : 'bg-green-50'
                }`}>
                  <Zap className={`w-5 h-5 ${darkMode ? 'text-green-400' : 'text-green-600'}`} strokeWidth={2.5} />
                </div>
                <div>
                  <p className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    $10 Usage Credit
                  </p>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Converts to aiWh credit when metering launches
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                  darkMode ? 'bg-orange-500/20' : 'bg-orange-50'
                }`}>
                  <Shield className={`w-5 h-5 ${darkMode ? 'text-orange-400' : 'text-orange-600'}`} strokeWidth={2.5} />
                </div>
                <div>
                  <p className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    Fully Refundable
                  </p>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    No risk, cancel anytime before launch
                  </p>
                </div>
              </div>
            </div>

            {/* Price */}
            <div className={`py-6 mb-6 border-y ${darkMode ? 'border-gray-800' : 'border-gray-200'}`}>
              <div className="flex justify-between items-baseline mb-2">
                <span className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Reservation Fee
                </span>
                <div className="flex items-baseline gap-1">
                  <span className={`text-5xl font-light ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    $10
                  </span>
                  <span className={`text-lg ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    USD
                  </span>
                </div>
              </div>
              <p className={`text-sm text-right ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                One-time • Refundable
              </p>
            </div>

            {/* CTA Button */}
            <button
              onClick={handleReservation}
              disabled={loading}
              className={`w-full py-4 px-6 rounded-xl text-lg font-semibold transition-all hover:scale-[1.02] ${
                darkMode
                  ? 'bg-blue-600 hover:bg-blue-500 text-white'
                  : 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl'
              } disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100`}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Processing...
                </span>
              ) : (
                'Reserve Now'
              )}
            </button>

            {/* Sign In Link */}
            <div className="mt-4 text-center">
              <button
                onClick={() => setShowAuthModal(true)}
                className={`text-sm ${
                  darkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-600 hover:text-gray-700'
                }`}
              >
                {user ? `Signed in as ${user.email}` : 'Already have an account? Sign in'}
              </button>
            </div>

            {error && (
              <div className="mt-4 p-3 rounded-lg bg-red-500/10 border border-red-500/50 flex items-start gap-2">
                <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-red-500">{error}</span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Day in the Life - Section 1: Morning */}
      <section className={`py-24 border-t ${darkMode ? 'border-gray-900' : 'border-gray-100'}`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="flex items-center gap-3 mb-6">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  darkMode ? 'bg-orange-500/20' : 'bg-orange-50'
                }`}>
                  <Coffee className={`w-7 h-7 ${darkMode ? 'text-orange-400' : 'text-orange-600'}`} strokeWidth={2} />
                </div>
                <h2 className={`text-4xl font-light ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  6:30 AM
                </h2>
              </div>
              <h3 className={`text-3xl font-light mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Your AI Assistant Wakes Before You Do
              </h3>
              <p className={`text-lg leading-relaxed mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                While you sleep, your AI Grid Layer account is already working—analyzing your calendar, 
                preparing summaries, optimizing your schedule. All metered by aiWh, just like your home electricity.
              </p>
              <div className="flex items-center gap-4">
                <Brain className={`w-6 h-6 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  GPT-4, Claude, Gemini working in parallel
                </span>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <img 
                src={marketingImage24}
                alt="Morning AI assistant"
                className="w-full h-[400px] object-cover rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Day in the Life - Section 2: Work */}
      <section className={`py-24 border-t ${darkMode ? 'border-gray-900' : 'border-gray-100'}`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <img 
                src={marketingImage34}
                alt="Working with AI"
                className="w-full h-[400px] object-cover rounded-2xl shadow-2xl"
              />
            </div>
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  darkMode ? 'bg-blue-500/20' : 'bg-blue-50'
                }`}>
                  <Briefcase className={`w-7 h-7 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} strokeWidth={2} />
                </div>
                <h2 className={`text-4xl font-light ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  9:00 AM
                </h2>
              </div>
              <h3 className={`text-3xl font-light mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Seamless Workflow Integration
              </h3>
              <p className={`text-lg leading-relaxed mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                One Grid Account. One bill. Access to 1000+ AI models through your tools—Slack, 
                VS Code, browser extensions. The AI Grid Layer routes to the best model automatically.
              </p>
              <div className="flex items-center gap-4">
                <TrendingUp className={`w-6 h-6 ${darkMode ? 'text-green-400' : 'text-green-600'}`} />
                <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Intelligent model routing saves you time and money
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Day in the Life - Section 3: Anywhere */}
      <section className={`py-24 border-t ${darkMode ? 'border-gray-900' : 'border-gray-100'}`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="flex items-center gap-3 mb-6">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  darkMode ? 'bg-purple-500/20' : 'bg-purple-50'
                }`}>
                  <Smartphone className={`w-7 h-7 ${darkMode ? 'text-purple-400' : 'text-purple-600'}`} strokeWidth={2} />
                </div>
                <h2 className={`text-4xl font-light ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  3:00 PM
                </h2>
              </div>
              <h3 className={`text-3xl font-light mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                AI in Your Pocket
              </h3>
              <p className={`text-lg leading-relaxed mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Mobile, desktop, web—your AI Grid Layer account follows you. Ask questions, 
                generate images, analyze documents. All on one meter, billed once a month.
              </p>
              <div className="flex items-center gap-4">
                <Globe className={`w-6 h-6 ${darkMode ? 'text-purple-400' : 'text-purple-600'}`} />
                <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Works everywhere you work
                </span>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <img 
                src={marketingImage29}
                alt="AI on mobile"
                className="w-full h-[400px] object-cover rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Day in the Life - Section 4: Evening */}
      <section className={`py-24 border-t ${darkMode ? 'border-gray-900' : 'border-gray-100'}`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <img 
                src={marketingImage27}
                alt="AI at home"
                className="w-full h-[400px] object-cover rounded-2xl shadow-2xl"
              />
            </div>
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  darkMode ? 'bg-green-500/20' : 'bg-green-50'
                }`}>
                  <HomeIcon className={`w-7 h-7 ${darkMode ? 'text-green-400' : 'text-green-600'}`} strokeWidth={2} />
                </div>
                <h2 className={`text-4xl font-light ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  7:00 PM
                </h2>
              </div>
              <h3 className={`text-3xl font-light mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Family Time, AI-Enhanced
              </h3>
              <p className={`text-lg leading-relaxed mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Help with homework, recipe suggestions, creative projects. Your family shares the Grid Account,
                and you only pay for what you use—measured in aiWh, the AI Watt Hour.
              </p>
              <div className="flex items-center gap-4">
                <Clock className={`w-6 h-6 ${darkMode ? 'text-orange-400' : 'text-orange-600'}`} />
                <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  24/7 access, metered by the millisecond
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className={`py-32 border-t ${darkMode ? 'border-gray-900 bg-gray-950' : 'border-gray-100 bg-gray-50'}`}>
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className={`text-5xl md:text-6xl font-light mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            This is the AI Utility Grid
          </h2>
          <p className={`text-2xl font-light mb-12 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Reserve your place for $10. Fully refundable.<br />
            Converts to $10 in AI usage credit at launch.
          </p>
          <button
            onClick={handleReservation}
            disabled={loading}
            className={`px-16 py-5 rounded-xl text-xl font-semibold transition-all hover:scale-105 ${
              darkMode
                ? 'bg-blue-600 hover:bg-blue-500 text-white'
                : 'bg-blue-600 hover:bg-blue-700 text-white shadow-2xl hover:shadow-3xl'
            } disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100`}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-3">
                <Loader2 className="w-6 h-6 animate-spin" />
                Processing...
              </span>
            ) : (
              'Reserve Your AI Grid Layer Account'
            )}
          </button>
        </div>
      </section>

      {/* Auth Modal */}
      {showAuthModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/50 backdrop-blur-sm">
          <div className={`max-w-md w-full p-8 rounded-2xl border ${
            darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'
          } relative`}>
            <button
              onClick={() => setShowAuthModal(false)}
              className={`absolute top-4 right-4 p-2 rounded-lg transition-colors ${
                darkMode ? 'hover:bg-gray-800 text-gray-400' : 'hover:bg-gray-100 text-gray-600'
              }`}
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className={`text-2xl font-semibold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              {isSignUp ? 'Create Account' : 'Welcome Back'}
            </h2>

            {error && (
              <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/50 flex items-start gap-2">
                <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-red-500">{error}</span>
              </div>
            )}

            <form onSubmit={handleAuth} className="space-y-4">
              {isSignUp && (
                <div>
                  <label className={`block text-sm font-medium mb-1 ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Name (Optional)
                  </label>
                  <input
                    type="text"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    className={`w-full px-4 py-3 rounded-lg border ${
                      darkMode
                        ? 'bg-gray-800 border-gray-700 text-white focus:border-blue-500'
                        : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
                    } outline-none transition-colors`}
                    placeholder="Your Name"
                  />
                </div>
              )}

              <div>
                <label className={`block text-sm font-medium mb-1 ${
                  darkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className={`w-full px-4 py-3 rounded-lg border ${
                    darkMode
                      ? 'bg-gray-800 border-gray-700 text-white focus:border-blue-500'
                      : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
                  } outline-none transition-colors`}
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label className={`block text-sm font-medium mb-1 ${
                  darkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    darkMode
                      ? 'bg-gray-800 border-gray-700 text-white focus:border-blue-500'
                      : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
                  } outline-none transition-colors`}
                  placeholder="••••••••"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 px-4 rounded-lg font-semibold transition-colors ${
                  darkMode
                    ? 'bg-blue-600 hover:bg-blue-500 text-white'
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                } disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2`}
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    {isSignUp ? 'Creating...' : 'Signing in...'}
                  </>
                ) : (
                  isSignUp ? 'Create Account & Reserve' : 'Sign In'
                )}
              </button>
            </form>

            <div className="mt-4 text-center">
              <button
                onClick={() => {
                  setIsSignUp(!isSignUp);
                  setError('');
                }}
                className={`text-sm ${
                  darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'
                }`}
              >
                {isSignUp ? 'Already have an account? Sign in' : 'Need an account? Sign up'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReservePage;

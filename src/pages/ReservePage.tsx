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
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import type { UserProfile } from '../types/grid';

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
  const [showAuthModal, setShowAuthModal] = useState(false);

  // Auth form state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [isSignUp, setIsSignUp] = useState(true);

  // Countdown state
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  // Check auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  // Countdown timer to February 14, 2026
  useEffect(() => {
    const targetDate = new Date('2026-02-14T00:00:00').getTime();
    
    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = targetDate - now;
      
      if (distance > 0) {
        setCountdown({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
      }
    };
    
    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    
    return () => clearInterval(interval);
  }, []);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      let currentUser: User;
      
      if (isSignUp) {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        currentUser = userCredential.user;
        
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
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        currentUser = userCredential.user;
      }
      
      // Close modal and show success
      setShowAuthModal(false);
      setUser(currentUser);
      setStep('success');
      
    } catch (err: any) {
      setError(err.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  const handleReservation = async () => {
    // Always show the modal to collect information/payment
    setShowAuthModal(true);
    return;
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

  if (step === 'success') {
    return (
      <div className={`min-h-screen ${darkMode ? 'bg-gray-950' : 'bg-white'}`}>
        <div className="max-w-4xl mx-auto px-6 py-24">
          <div className="text-center mb-12">
            <div className={`w-24 h-24 rounded-full mx-auto mb-8 flex items-center justify-center ${
              darkMode ? 'bg-green-500/20' : 'bg-green-100'
            }`}>
              <Check className={`w-14 h-14 ${darkMode ? 'text-green-400' : 'text-green-600'}`} strokeWidth={2} />
            </div>

            <h1 className={`text-4xl md:text-5xl font-light mb-6 ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Thank You for Reserving!
            </h1>

            <p className={`text-lg mb-8 max-w-2xl mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Your AI Grid Layer account reservation has been confirmed. We'll email you at{' '}
              <span className="font-semibold">{user?.email}</span>{' '}
              with the next steps to complete your reservation.
            </p>
          </div>

          {/* Countdown Timer */}
          <div className={`max-w-3xl mx-auto mb-12 p-8 rounded-2xl border ${
            darkMode ? 'bg-gray-900/50 border-gray-800' : 'bg-blue-50 border-blue-200'
          }`}>
            <h2 className={`text-sm font-semibold uppercase tracking-wide text-center mb-6 ${
              darkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Payment Opens In
            </h2>
            <div className="flex justify-center gap-4 md:gap-8">
              <div className="text-center">
                <div className={`text-4xl md:text-6xl font-bold mb-2 ${
                  darkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  {countdown.days}
                </div>
                <div className={`text-xs md:text-sm ${darkMode ? 'text-gray-500' : 'text-gray-600'}`}>
                  DAYS
                </div>
              </div>
              <div className={`text-4xl md:text-6xl font-bold opacity-30 ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                :
              </div>
              <div className="text-center">
                <div className={`text-4xl md:text-6xl font-bold mb-2 ${
                  darkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  {String(countdown.hours).padStart(2, '0')}
                </div>
                <div className={`text-xs md:text-sm ${darkMode ? 'text-gray-500' : 'text-gray-600'}`}>
                  HOURS
                </div>
              </div>
              <div className={`text-4xl md:text-6xl font-bold opacity-30 ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                :
              </div>
              <div className="text-center">
                <div className={`text-4xl md:text-6xl font-bold mb-2 ${
                  darkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  {String(countdown.minutes).padStart(2, '0')}
                </div>
                <div className={`text-xs md:text-sm ${darkMode ? 'text-gray-500' : 'text-gray-600'}`}>
                  MIN
                </div>
              </div>
              <div className={`text-4xl md:text-6xl font-bold opacity-30 ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                :
              </div>
              <div className="text-center">
                <div className={`text-4xl md:text-6xl font-bold mb-2 ${
                  darkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  {String(countdown.seconds).padStart(2, '0')}
                </div>
                <div className={`text-xs md:text-sm ${darkMode ? 'text-gray-500' : 'text-gray-600'}`}>
                  SEC
                </div>
              </div>
            </div>
          </div>

          {/* What Happens Next */}
          <div className={`max-w-2xl mx-auto mb-12 p-6 rounded-xl border ${
            darkMode ? 'bg-gray-800/30 border-gray-700' : 'bg-gray-50 border-gray-200'
          }`}>
            <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              What happens next:
            </h3>
            <div className={`space-y-3 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              <p className="flex items-start">
                <span className="mr-2">•</span>
                <span>You'll receive a confirmation email shortly</span>
              </p>
              <p className="flex items-start">
                <span className="mr-2">•</span>
                <span>On February 14, 2026, you'll be notified to complete your $10 reservation</span>
              </p>
              <p className="flex items-start">
                <span className="mr-2">•</span>
                <span>Your reservation converts to $10 AI usage credit</span>
              </p>
              <p className="flex items-start">
                <span className="mr-2">•</span>
                <span>You'll get early access as a Founding Member</span>
              </p>
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm overflow-y-auto">
          <div className={`max-w-md w-full p-6 rounded-xl border ${
            darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'
          } relative my-4 max-h-[95vh] overflow-y-auto`}>
            <button
              onClick={() => setShowAuthModal(false)}
              className={`absolute top-3 right-3 p-1.5 rounded-lg transition-colors ${
                darkMode ? 'hover:bg-gray-800 text-gray-400' : 'hover:bg-gray-100 text-gray-600'
              }`}
            >
              <X className="w-4 h-4" />
            </button>

            <h2 className={`text-xl font-semibold mb-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              {isSignUp ? 'Complete Your Reservation' : 'Sign In & Reserve'}
            </h2>
            <p className={`text-xs mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              {isSignUp ? 'Account & payment details' : 'Sign in to complete reservation'}
            </p>

            {/* Payment Summary */}
            <div className={`mb-4 p-3 rounded-lg border ${
              darkMode ? 'bg-gray-800/50 border-gray-700' : 'bg-blue-50 border-blue-200'
            }`}>
              <div className="flex justify-between items-center mb-1">
                <span className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  AI Grid Layer
                </span>
                <span className={`text-xl font-bold ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                  $10
                </span>
              </div>
              <div className="flex justify-between text-xs">
                <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Refundable</span>
                <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                  → $10 credit
                </span>
              </div>
            </div>

            {error && (
              <div className="mb-3 p-2 rounded-lg bg-red-500/10 border border-red-500/50 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                <span className="text-xs text-red-500">{error}</span>
              </div>
            )}

            <form onSubmit={handleAuth} className="space-y-3">
              {isSignUp && (
                <div>
                  <label className={`block text-xs font-medium mb-1 ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Name (Optional)
                  </label>
                  <input
                    type="text"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    className={`w-full px-3 py-2 text-sm rounded-lg border ${
                      darkMode
                        ? 'bg-gray-800 border-gray-700 text-white focus:border-blue-500'
                        : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
                    } outline-none transition-colors`}
                    placeholder="Your Name"
                  />
                </div>
              )}

              <div>
                <label className={`block text-xs font-medium mb-1 ${
                  darkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className={`w-full px-3 py-2 text-sm rounded-lg border ${
                    darkMode
                      ? 'bg-gray-800 border-gray-700 text-white focus:border-blue-500'
                      : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
                  } outline-none transition-colors`}
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label className={`block text-xs font-medium mb-1 ${
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
                  className={`w-full px-3 py-2 text-sm rounded-lg border ${
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
                className={`w-full py-2.5 px-4 rounded-lg text-sm font-semibold transition-colors ${
                  darkMode
                    ? 'bg-blue-600 hover:bg-blue-500 text-white'
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                } disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2`}
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  isSignUp ? 'Reserve My Account' : 'Sign In'
                )}
              </button>
              <p className={`text-[10px] text-center mt-1.5 ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                {isSignUp ? 'Charged $10 after creation' : 'Processed after sign in'}
              </p>
            </form>

            <div className="mt-3 text-center">
              <button
                onClick={() => {
                  setIsSignUp(!isSignUp);
                  setError('');
                }}
                className={`text-xs ${
                  darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'
                }`}
              >
                {isSignUp ? 'Have an account? Sign in' : 'Need an account? Sign up'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReservePage;

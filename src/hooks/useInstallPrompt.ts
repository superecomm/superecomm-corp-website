import { useState, useEffect } from 'react';

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

interface InstallPromptState {
  isInstallable: boolean;
  isInstalled: boolean;
  promptInstall: () => Promise<void>;
  dismissPrompt: () => void;
}

/**
 * Hook to manage PWA installation prompt
 * @returns InstallPromptState object with install methods and state
 */
export const useInstallPrompt = (): InstallPromptState => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstallable, setIsInstallable] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Check if app is already installed
    const checkIfInstalled = () => {
      // Check if running in standalone mode (installed PWA)
      const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
      const isIOSStandalone = (window.navigator as any).standalone === true;
      
      if (isStandalone || isIOSStandalone) {
        setIsInstalled(true);
        console.log('[PWA] App is running in installed mode');
      }
    };

    checkIfInstalled();

    // Listen for beforeinstallprompt event
    const handleBeforeInstallPrompt = (e: Event) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      
      const promptEvent = e as BeforeInstallPromptEvent;
      console.log('[PWA] beforeinstallprompt event fired');
      
      // Store the event for later use
      setDeferredPrompt(promptEvent);
      setIsInstallable(true);
      
      // Track in analytics
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'pwa_install_prompt_shown');
      }
    };

    // Listen for successful installation
    const handleAppInstalled = () => {
      console.log('[PWA] App successfully installed');
      setIsInstalled(true);
      setIsInstallable(false);
      setDeferredPrompt(null);
      
      // Track in analytics
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'pwa_installed');
      }
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  // Function to trigger the install prompt
  const promptInstall = async (): Promise<void> => {
    if (!deferredPrompt) {
      console.log('[PWA] No install prompt available');
      return;
    }

    try {
      // Show the install prompt
      await deferredPrompt.prompt();
      
      // Wait for the user's response
      const choiceResult = await deferredPrompt.userChoice;
      
      console.log(`[PWA] User ${choiceResult.outcome} the install prompt`);
      
      // Track user choice in analytics
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'pwa_install_prompt_response', {
          outcome: choiceResult.outcome
        });
      }

      if (choiceResult.outcome === 'accepted') {
        console.log('[PWA] User accepted the install prompt');
      } else {
        console.log('[PWA] User dismissed the install prompt');
      }

      // Clear the prompt
      setDeferredPrompt(null);
      setIsInstallable(false);
    } catch (error) {
      console.error('[PWA] Error showing install prompt:', error);
    }
  };

  // Function to dismiss/hide the prompt
  const dismissPrompt = (): void => {
    console.log('[PWA] Install prompt dismissed by user');
    setIsInstallable(false);
    
    // Store dismissal in localStorage to not show again for a while
    localStorage.setItem('pwa_install_dismissed', Date.now().toString());
    
    // Track dismissal in analytics
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'pwa_install_prompt_dismissed');
    }
  };

  return {
    isInstallable,
    isInstalled,
    promptInstall,
    dismissPrompt,
  };
};

/**
 * Check if install prompt was recently dismissed
 * @param daysToWait Number of days to wait before showing prompt again
 * @returns boolean indicating if prompt should be shown
 */
export const shouldShowInstallPrompt = (daysToWait: number = 7): boolean => {
  const dismissedTimestamp = localStorage.getItem('pwa_install_dismissed');
  
  if (!dismissedTimestamp) {
    return true;
  }

  const dismissedDate = new Date(parseInt(dismissedTimestamp));
  const daysSinceDismissed = (Date.now() - dismissedDate.getTime()) / (1000 * 60 * 60 * 24);
  
  return daysSinceDismissed >= daysToWait;
};

export default useInstallPrompt;


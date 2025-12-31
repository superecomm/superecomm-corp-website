import { useEffect } from "react";
import Home from "./pages/home";
import { OfflineIndicator } from "./components/OfflineIndicator";
import { InstallPromptBanner } from "./components/InstallPrompt";
import { NotificationPermissionBanner } from "./components/NotificationPermission";
import { initializeNotificationListeners } from "./services/notificationService";

export default function App() {
  useEffect(() => {
    // Initialize notification listeners on app load
    initializeNotificationListeners().catch((error) => {
      console.error('Failed to initialize notification listeners:', error);
    });
  }, []);

  return (
    <>
      {/* PWA Features */}
      <OfflineIndicator position="top" showOnlineMessage={true} />
      <InstallPromptBanner autoShow={true} delayMs={5000} />
      <NotificationPermissionBanner autoShow={true} delayMs={10000} />
      
      {/* Main App */}
      <Home />
    </>
  );
}

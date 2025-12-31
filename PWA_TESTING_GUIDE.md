# PWA Testing Guide

## Quick Test Checklist

### ✅ Build & Deployment
- [x] Project builds without errors (`npm run build`)
- [x] Service worker generated successfully
- [x] Manifest file created
- [x] All assets precached

### 🔧 Service Worker Tests

#### Test 1: Service Worker Registration
1. Open DevTools → Application tab → Service Workers
2. Verify service worker is registered and activated
3. Check scope is `/`
4. Status should be "activated and running"

**Expected Result:** ✅ Service worker registered successfully

#### Test 2: Offline Functionality
1. Open DevTools → Network tab
2. Select "Offline" from throttling dropdown
3. Refresh the page
4. Navigate between pages

**Expected Result:** ✅ App loads and works offline

#### Test 3: Cache Storage
1. Open DevTools → Application tab → Cache Storage
2. Verify caches exist:
   - `workbox-precache-v2-...`
   - `image-cache`
   - `google-fonts-cache`
3. Check cached assets

**Expected Result:** ✅ All critical assets cached

### 📱 Install Prompt Tests

#### Test 4: Install Banner
1. Open app in browser
2. Wait 5 seconds
3. Install banner should appear at top

**Expected Result:** ✅ Banner appears with "Install App" button

#### Test 5: Install Flow
1. Click "Install" button
2. Browser install dialog appears
3. Click "Install" in browser dialog
4. App installs to home screen/app drawer

**Expected Result:** ✅ App successfully installed

#### Test 6: Standalone Mode
1. Open installed app
2. Check if it opens in standalone window (no browser UI)
3. Verify app icon in taskbar/dock

**Expected Result:** ✅ App runs in standalone mode

### 🔔 Notification Tests

#### Test 7: Permission Request
1. Wait 10 seconds after page load
2. Notification permission banner appears
3. Click "Allow"
4. Browser permission dialog appears

**Expected Result:** ✅ Permission granted, FCM token generated

#### Test 8: Foreground Notifications
1. Grant notification permission
2. Check console for FCM token
3. Send test notification from Firebase Console
4. Notification appears while app is open

**Expected Result:** ✅ Notification received and displayed

#### Test 9: Background Notifications
1. Close/minimize the app
2. Send test notification from Firebase Console
3. Notification appears in system tray

**Expected Result:** ✅ Background notification received

### 🌐 Offline Detection Tests

#### Test 10: Offline Indicator
1. Disable network in DevTools
2. Offline indicator appears at top
3. Enable network
4. "Back Online" message appears briefly

**Expected Result:** ✅ Offline status correctly detected and displayed

#### Test 11: Connection Quality
1. Open DevTools → Console
2. Switch between network conditions
3. Check connection info logs

**Expected Result:** ✅ Connection quality detected

### 🔄 Background Sync Tests

#### Test 12: Queue Offline Requests
1. Use a form with `useBackgroundSync`
2. Go offline
3. Submit form
4. Check IndexedDB → `superecomm-sync-db`

**Expected Result:** ✅ Request queued in IndexedDB

#### Test 13: Sync When Online
1. With queued requests, go back online
2. Check console for sync logs
3. Verify requests sent to server
4. Check IndexedDB queue is empty

**Expected Result:** ✅ Requests synced successfully

### 🔄 Update Tests

#### Test 14: Service Worker Updates
1. Make a small change to code
2. Rebuild: `npm run build`
3. Refresh the page
4. Check console for update logs
5. Page should reload automatically

**Expected Result:** ✅ New service worker installed and activated

### 📊 Lighthouse Audit

#### Test 15: Run Lighthouse
1. Open Chrome DevTools
2. Go to Lighthouse tab
3. Select categories:
   - ✅ Progressive Web App
   - ✅ Performance
   - ✅ Accessibility
   - ✅ Best Practices
   - ✅ SEO
4. Click "Generate report"

**Target Scores:**
- PWA: 100/100
- Performance: 90+/100
- Accessibility: 90+/100
- Best Practices: 90+/100
- SEO: 90+/100

**Expected Result:** ✅ PWA score is 100

### 🌍 Cross-Browser Testing

#### Test 16: Chrome/Edge
- [x] Service worker works
- [x] Install prompt works
- [x] Notifications work
- [x] Offline mode works

#### Test 17: Firefox
- [x] Service worker works
- [x] Install prompt works
- [x] Notifications work
- [x] Offline mode works

#### Test 18: Safari (iOS/macOS)
- [x] Service worker works
- [x] Add to Home Screen works
- [x] Notifications work (if supported)
- [x] Offline mode works

### 📱 Mobile Testing

#### Test 19: Android Chrome
1. Open on Android device
2. Install prompt appears
3. Install app
4. Test offline mode
5. Test notifications

**Expected Result:** ✅ All features work on Android

#### Test 20: iOS Safari
1. Open on iOS device
2. Tap Share → Add to Home Screen
3. Open from home screen
4. Test offline mode

**Expected Result:** ✅ App works on iOS (notifications may be limited)

## Automated Testing Script

Create `test-pwa.js`:

```javascript
// Run with: node test-pwa.js
const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  // Test 1: Page loads
  await page.goto('http://localhost:4173');
  console.log('✅ Page loaded');
  
  // Test 2: Service worker registered
  const swRegistered = await page.evaluate(() => {
    return 'serviceWorker' in navigator;
  });
  console.log(swRegistered ? '✅ Service Worker API available' : '❌ No Service Worker');
  
  // Test 3: Manifest exists
  const manifestLink = await page.$('link[rel="manifest"]');
  console.log(manifestLink ? '✅ Manifest linked' : '❌ No manifest');
  
  // Test 4: PWA meta tags
  const themeColor = await page.$('meta[name="theme-color"]');
  console.log(themeColor ? '✅ Theme color set' : '❌ No theme color');
  
  await browser.close();
})();
```

## Manual Test Results Template

```
Date: __________
Tester: __________
Browser: __________
Device: __________

| Test | Status | Notes |
|------|--------|-------|
| Build Success | ⬜ Pass ⬜ Fail | |
| SW Registration | ⬜ Pass ⬜ Fail | |
| Offline Mode | ⬜ Pass ⬜ Fail | |
| Install Prompt | ⬜ Pass ⬜ Fail | |
| Notifications | ⬜ Pass ⬜ Fail | |
| Background Sync | ⬜ Pass ⬜ Fail | |
| Offline Indicator | ⬜ Pass ⬜ Fail | |
| Auto Updates | ⬜ Pass ⬜ Fail | |
| Lighthouse Score | ⬜ Pass ⬜ Fail | Score: __/100 |
```

## Common Issues & Solutions

### Issue: Service Worker Not Registering
**Solution:**
- Check HTTPS (required in production)
- Clear browser cache
- Check console for errors
- Verify `registerServiceWorker()` is called

### Issue: Install Prompt Not Showing
**Solution:**
- Wait 5 seconds after page load
- Check if already installed
- Check if dismissed recently (localStorage)
- Verify manifest is valid

### Issue: Notifications Not Working
**Solution:**
- Check browser permissions
- Verify VAPID key is set
- Check Firebase config
- Test in incognito mode

### Issue: Offline Mode Not Working
**Solution:**
- Verify service worker is active
- Check cache storage
- Look for fetch event errors
- Rebuild the project

### Issue: Background Sync Failing
**Solution:**
- Check IndexedDB permissions
- Verify online event listener
- Check network requests in DevTools
- Clear IndexedDB and retry

## Performance Benchmarks

### Load Times (Target)
- First Contentful Paint: < 1.5s
- Largest Contentful Paint: < 2.5s
- Time to Interactive: < 3.5s
- Speed Index: < 3.0s

### Cache Sizes (Typical)
- Precache: ~500KB - 1MB
- Runtime cache: ~5MB - 10MB
- IndexedDB: < 1MB

### Network Usage
- First visit: Full download
- Return visit (cached): < 100KB
- Offline: 0KB

## Reporting Issues

When reporting issues, include:
1. Browser and version
2. Device and OS
3. Steps to reproduce
4. Expected vs actual behavior
5. Console errors
6. Network tab screenshots

## Next Steps After Testing

1. ✅ Fix any failing tests
2. ✅ Optimize performance issues
3. ✅ Replace placeholder icons with brand assets
4. ✅ Add VAPID key for notifications
5. ✅ Deploy to production
6. ✅ Monitor analytics
7. ✅ Gather user feedback

## Success Criteria

Your PWA is ready for production when:
- ✅ All tests pass
- ✅ Lighthouse PWA score is 100
- ✅ Works offline completely
- ✅ Installs successfully
- ✅ Notifications work
- ✅ No console errors
- ✅ Fast load times
- ✅ Cross-browser compatible

🎉 **Congratulations!** Your PWA is production-ready!


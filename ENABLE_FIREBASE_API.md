# 🔧 Enable Firebase Extensions API

## Action Required

Firebase Extensions API needs to be enabled for your project before deploying functions.

### Step 1: Click this link
**https://console.developers.google.com/apis/api/firebaseextensions.googleapis.com/overview?project=superecomm-corp-website**

### Step 2: Click "ENABLE" button

### Step 3: Wait 2-3 minutes for the API to propagate

### Step 4: Deploy functions again
```bash
firebase deploy --only functions
```

---

**Alternative:** You can also enable it from the Firebase Console:
1. Go to: https://console.firebase.google.com/project/superecomm-corp-website/overview
2. Click ⚙️ Project Settings
3. Go to "Service accounts" tab
4. Enable "Firebase Extensions API"

---

After enabling, run:
```bash
firebase deploy --only functions
```


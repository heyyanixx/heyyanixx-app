# HEYYANIXX App — Full Setup Guide

Brand: **HEYYANIXX (Heyy Anish)** — AI Video Editor & Creator, India
Website it is based on: https://heyyanixx.sites.tab.bot/
Style: matte black `#060608`, gold `#e3b65a`, white text, dark mode only.

This folder is the **complete code**:
- `index.html` — the whole app in one file (all 9 screens, no build step needed)
- `manifest.webmanifest` — makes it installable as a PWA
- `sw.js` — offline cache for fast loading on low-end phones

> No phone number is shown anywhere in this app, on purpose.
> No game-company logos are used — gaming identity is text only (Free Fire MAX, Lv. 72, Heroic, guild The Mafia).

## 1. What is inside

Screens:
1. **Home** — name, tagline “AI Video Editor & Creator”, intro video banner, Hire Me / See Work
2. **Work / Portfolio** — grid, filters: Video Edits, AI Cinematic, Thumbnails, Gaming. Tap = full-screen player with sound
3. **Services & Prices (INR)** — Reels ₹499+, Montage ₹999+, AI Cinematic ₹1,499+, AI Image Prompt ₹199+, Photo Retouch ₹299+. Coupon field: `HEYYANI69` = 50% off (prices halve in Services and are noted in Order)
4. **Order / Hire** — name, what you need, budget, deadline, reference upload + details. Sends via `mailto:kranish7900@gmail.com` (pre-filled) or opens Instagram DM profile
5. **Gaming** — Free Fire content, latest reels, YouTube Shorts / channel links to `@smart_anish69`
6. **AI Lab** — AI tools list (text only), free Prompt of the Day (rotates daily, Copy button)
7. **About** — story, skills (Video editing, AI tools, Thumbnails, Coding — BCA AI student), setup: ASUS TUF Gaming A15
8. **Contact & Socials** — Instagram `@heyyy.anixx_`, YouTube `@smart_anish69`, GitHub `heyyanixx`, `lnk.bio/Heyyanixx`, email `kranish7900@gmail.com`
9. **FAQ** — how to order, payment (UPI), delivery time, revisions

Features:
- Bottom navigation + More sheet (Order, AI Lab, About, Contact, FAQ, Admin)
- Push notifications button — uses the browser Notification API for a demo. Real scheduled push needs step 5 below.
- WhatsApp-style chat button — **in-app only**, no phone number. Auto-answers price / UPI / delivery / gaming, with a button to continue on Instagram DM.
- Dark mode only, Hinglish + English copy
- Share app button (`navigator.share`, fallback copy link)
- Share app button (Contact + More). A "Rate on Play Store" button can come back once the app has a Play listing (`PLAY_URL`, `rateApp()` are still in the code).
- Admin panel (More → Admin) — passcode in `index.html` at the top: `ADMIN_PASS`. **Change it before publishing.** Admin can add work, change prices, change the offer banner. In this PWA version data saves in the browser (`localStorage`) on that device only.

## 2. Before you publish — replace these 5 things

Open `index.html` and search for:

1. `ADMIN_PASS` — already changed to a private passcode (Tab sent it to you separately). Change it again any time.
2. Intro video — Home banner currently uses a sample video. Replace its `src` with your own intro MP4 link (upload to Google Drive / YouTube unlisted / your host and use the direct MP4 link).
3. Portfolio media — replace the sample videos / picsum images in `DEFAULT_WORKS` with your real reels, thumbnails and posters.
4. `PLAY_URL = 'https://play.google.com/store'` → replace with your real Play listing URL after step 4.
5. Icons — create `icon-192.png` and `icon-512.png` (gold H on matte black, 192×192 and 512×512, no game logos). Use any free tool: Canva, Figma, or `https://realfavicongenerator.net`. Put both files next to `index.html`.

YouTube Shorts embed (optional, for Gaming):
```html
<iframe width="100%" height="315" src="https://www.youtube.com/embed/VIDEO_ID" frameborder="0" allowfullscreen></iframe>
```
Replace `VIDEO_ID` with the ID after `shorts/` in your Short URL, e.g. `https://youtube.com/shorts/abc123` → `abc123`.

## 3. Run it as a PWA (free, 2 minutes)

Option A — Local test:
```bash
cd heyyanixx-app
python3 -m http.server 8000
# Open http://localhost:8000 on your phone (same Wi-Fi) or on your computer
# In Chrome → ⋮ → Install app / Add to Home Screen
```

Option B — Free hosting (so anyone can install it):
1. Create a free account on Netlify, Vercel, or GitHub Pages.
2. Upload this whole folder (`index.html`, `manifest.webmanifest`, `sw.js`, icons).
3. Open the live link on Android Chrome → Install app. On iPhone Safari → Share → Add to Home Screen.
4. Test on a low-end phone: it is vanilla HTML/CSS/JS (no heavy framework), images lazy-load, and the service worker caches the shell.

HTTPS is required for PWA install + notifications — Netlify/Vercel/GitHub Pages all give HTTPS free.

## 4. Publish to Google Play (Android) — step by step

You cannot upload a plain website directly to Play. Wrap this PWA with **Capacitor** (recommended, free) or use **PWABuilder / Bubblewrap (TWA)**.

### Capacitor route (gives a real Android + iOS app from the same code)

```bash
# 1. You need Node.js 18+ installed. Check:
node -v
npm -v

# 2. In this folder, init Capacitor (one time)
npm init -y
npm install @capacitor/core @capacitor/cli
npx cap init HEYYANIXX com.heyyanixx.app --web-dir=.

# 3. Add Android + iOS platforms
npm install @capacitor/android @capacitor/ios
npx cap add android
npx cap add ios

# 4. Copy your web code into the native projects (repeat after every edit)
npx cap sync

# 5. Open in Android Studio (free, from developer.android.com)
npx cap open android
# In Android Studio: Build → Generate Signed App Bundle / APK
```

Signing (one time, keep this file safe, never share it):
1. Android Studio → Build → Generate Signed Bundle / APK → Android App Bundle → Create new keystore.
2. Save the `.jks` file + passwords somewhere safe (not in the code folder).
3. Build a **Release AAB** (`.aab`), not just an APK — Play requires AAB now.

Google Play Console:
1. Go to https://play.google.com/console — pay the one-time $25 developer fee.
2. Create app → Name: HEYYANIXX, Category: Entertainment / Art & Design, Language: English (add Hindi if you want).
3. App content: fill Privacy Policy (you need a hosted privacy page — put a simple one on your Netlify site: “This app collects no phone numbers, order details are sent only by email/Instagram at your tap”), Content rating questionnaire, Target audience, News app? No, Data safety: no data collected by the app itself except localStorage on device.
4. Upload your Release AAB → Internal testing first → test on your own phone → then Production.
5. Store listing: short description, full description, screenshots (take them from the PWA on a phone — Home, Work, Services, Order), feature graphic 1024×500, icon 512×512.
6. Rollout to Production → review usually takes 1–3 days (sometimes up to 7). Fix any review feedback and resubmit.
7. After it is live, copy the Play URL and paste it into `PLAY_URL` in `index.html`, rebuild (`npx cap sync`), and upload a small update.

### Faster alternative — TWA via PWABuilder
1. Host the PWA on HTTPS (step 3).
2. Go to https://www.pwabuilder.com → enter your URL → Package for Android.
3. Download the package, sign it in Android Studio the same way, upload the AAB to Play Console.

### iOS (App Store) — same code
1. On a Mac: `npx cap open ios` → opens Xcode.
2. Set Bundle ID `com.heyyanixx.app`, Team (Apple Developer account, $99/year), icons + splash.
3. Product → Archive → Distribute to App Store Connect → submit for review in App Store Connect.
4. iOS does not allow a pure TWA like Android — Capacitor is the right route for iOS.

## 5. Real push notifications for new reels & offers

The in-app Notify button is a browser demo only. For real push after Play publishing, pick one:
- **OneSignal (easiest, free tier):** Create a OneSignal app, add its Android SDK in the Capacitor project, then send a push from the OneSignal dashboard whenever you post a reel or offer. No server code needed.
- **Firebase Cloud Messaging (FCM):** Create a Firebase project, add `google-services.json` to `android/app/`, and send pushes from Firebase Console.

In both cases, keep the in-app Notify button as the opt-in, and explain in the Play listing that notifications are only for new reels and offers.

## 6. Admin data for many users (important limit)

Right now Admin saves to `localStorage` on **that one device/browser only**. Visitors will not see your Admin changes unless you edit `DEFAULT_WORKS` / `DEFAULT_SERVICES` in `index.html` and redeploy.

For a true shared Admin (change once, everyone sees it), add a tiny backend later:
- Option 1: Firebase Firestore (free tier) — Admin writes, app reads.
- Option 2: A Google Sheet as a CMS + a small Cloud Function.
Do this only after the Play version is live — do not block launch on it.

## 7. Checklist before launch

- [x] ADMIN_PASS changed
- [ ] Real intro video + real portfolio media replaced
- [ ] Icons 192 + 512 created, no game logos, no phone number anywhere (search the folder for your number before upload)
- [ ] PWA tested on Chrome Android + Safari iPhone, install works
- [ ] Order form tested: email opens pre-filled, Instagram DM opens
- [ ] Coupon HEYYANI69 tested: prices halve
- [ ] Play screenshots + privacy policy page ready
- [ ] Release AAB signed, uploaded to Internal testing, tested on a real phone

Good luck, Anish — chalo, app ko viral karte hain! 🔥


## Changes by Tab (Oct 29, 2026)
- Portfolio now shows only real work: Aroma Restaurant promo (unpaid practice project), brand ads v1 + v2, FF India Short + thumbnail + reel cover, AI edits, Instagram reels, portrait edit. Posters are bundled in `www/assets/` so they load offline; videos stream from heyyanixx.sites.tab.bot.
- Hero banner plays the brand ad v2 (tap for sound).
- Demo Login hidden (code kept, no button) until a real backend exists.
- Admin passcode changed. Skill % bars replaced with skill chips; tools list = tools confirmed on the website.
- Rate button replaced with Share app (no Play listing yet).
- Service worker v3 precaches the app shell + posters.
- APK build applies the HEYYANIXX icon + black splash (resources/android).


## v2.0.0 — HEYYANIXX brand refresh
- **Launcher icon:** original gold "HX" monogram (an H whose crossbar is a play button, plus a spark) on matte black. Android adaptive icon with foreground, background and monochrome (themed icon) layers for every density, in `resources/android/res/mipmap-*`. Play Store icon: `resources/play/play-icon-512.png`.
- **Splash:** Android 12+ system splash (gold mark on #060608) and a centered logo splash for older phones (`drawable/splash.xml` + `splash_logo.png`), so it never stretches.
- **Theme:** black status bar and navigation bar, gold accent (`values/styles.xml`, `values/colors.xml`).
- **Version:** versionName 2.0.0 / versionCode 200, set in the workflow (`APP_VERSION_NAME`, `APP_VERSION_CODE`).
- **In-app UI:** Outfit font (SIL OFL, bundled in `www/fonts`), new header logo, gold buttons, branded loading screen, image loading shimmer, highlighted bottom nav, and a "HEYYANIXX Universe" section with links to the Portfolio, Learn Arcade and ADCA Tools sites.

The workflow removes Capacitor's default icon/splash files and copies `resources/android/res` over `android/app/src/main/res` after `cap sync`.

## v2.1.0 — HEYYANIXX Hub (live sites inside the app + offline games)
- Bottom nav: Home · Games · Learn · Tools · More. Home has big tiles for Games, Learn Arcade, ADCA Tools, Portfolio and Course (coming soon).
- Each tile opens the LIVE website inside the app (HEYYANIXX header with back, reload and open-in-browser), so every website update shows up in the app without a new APK.
- Offline: if there is no internet (or the site does not load in 25 s), Games and Learn Arcade open the copies bundled in `www/offline/arcade` and `www/offline/learn`, with an OFFLINE badge. Tools and Portfolio show a branded "no internet" screen with Retry.
- Android: `server.allowNavigation` = `*.sites.tab.bot`, `@capacitor/app` handles the back button (closes the hub / goes back a screen, exits from Home), and `resources/android/java/.../MainActivity.java` routes new-window links: HEYYANIXX sites open in the hub, everything else (Instagram, YouTube, mail) opens outside the app.
- To refresh the offline copies after a website update: copy the site folder into `www/offline/learn` (or `games/arcade.js` + `arcade.css` into `www/offline/arcade/games`), update the file list in `www/sw.js`, push.

## v2.3.0 — Links + PayPoster tiles

- **Hub:** two new tiles — 🔗 **Links** (https://heyyanixx-links.sites.tab.bot/) and 💸 **PayPoster** (https://heyyanixx-payposter.sites.tab.bot/). Both are online-only: they open inside the app's hub viewer, and without internet show the same "Internet nahi mil raha" screen as Tools/Notes. Links from other HEYYANIXX sites to these two pages also open in their own tiles. Notes AI, Games (offline), Learn (offline), Tools, Portfolio and Course are unchanged.
- **Signing:** same permanent key as v2.2.0, so v2.3.0 installs straight over v2.2.0.
- **Version:** versionName 2.3.0 / versionCode 230. PWA cache `heyyanixx-v10`.

## v2.2.0 — Notes AI tile + permanent signing key
- **Notes AI:** new hub tile that opens HEYYANIXX Notes AI (https://heyyanixx-notes.sites.tab.bot/) live inside the app. Online-only: without internet it shows the same "Internet nahi mil raha" screen with Retry as Tools/Portfolio.
- **In-app links:** links from any HEYYANIXX site to another `*.sites.tab.bot` page (Notes AI, the links page, etc.) open inside the app's hub viewer instead of leaving the app.
- **Signing:** the workflow now signs every APK with one permanent HEYYANIXX key. The keystore and its passwords live ONLY in the repo's GitHub Actions secrets (`HX_KEYSTORE_BASE64`, `HX_KEYSTORE_PASSWORD`, `HX_KEY_ALIAS`, `HX_KEY_PASSWORD`) — never in this repo. From v2.2.0 on, new versions install over the old app without uninstalling. (Going from v2.1 or older to v2.2.0 needs one last uninstall, because those builds used throwaway keys.) If the secrets are missing (e.g. a fork), the build still works with a throwaway debug key.
- **Version:** versionName 2.2.0 / versionCode 220.

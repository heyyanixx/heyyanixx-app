# HEYYANIXX — Cloud APK build (GitHub Actions)

This builds the debug APK on GitHub's machine, because Gradle
cannot run its daemon in Muse's VM (proxy / daemon errors in
v1–v5). Your app code is unchanged — only this workflow was added.

## What is already ready
- App: `index.html`, `www/`, login page, 7 website projects
- Capacitor config: appId `com.heyyanixx.app`, appName `HEYYANIXX`, webDir `www`
- Workflow: `.github/workflows/android.yml`
  - JDK 17 (Temurin), Node 20
  - `npm ci`, `npx cap add android` (if needed), `npx cap sync android`
  - `./gradlew assembleDebug`
  - Uploads artifact named `heyyanixx-debug-apk`

Note: `.gitignore` ignores `android/` and `ios/`, so the workflow
re-creates the Android project in CI. Do not remove that step.

## Steps to run it
1. Create a new GitHub repo (e.g. `heyyanixx-app`) on github.com.
   It can be private — Actions still works.
2. Upload / push this whole `heyyanixx-app` folder to that repo's
   `main` branch, including the hidden `.github/` folder.
   On a PC:
   ```
   cd heyyanixx-app
   git init
   git add .
   git commit -m "HEYYANIXX app with cloud APK build"
   git branch -M main
   git remote add origin https://github.com/<your-username>/heyyanixx-app.git
   git push -u origin main
   ```
3. On GitHub, open the repo > Actions tab.
   - If it did not start automatically, open "Build HEYYANIXX APK"
     > Run workflow > Run workflow.
4. Wait for the green tick (usually a few minutes).
5. Open that run > Artifacts > download `heyyanixx-debug-apk`.
   Unzip it if needed — inside is `app-debug.apk`.
6. Send that APK to your phone, open it, allow "Install unknown apps"
   for your browser/files app if asked, and install.

## If Muse is to push it for you
Muse needs a repo you have already selected for it on the
GitHub installation page, and you need to tell Muse the exact
repo name here. Without that, Muse cannot push to GitHub yet —
use steps 1–2 above on a PC in the meantime.

## This is a debug APK, not a Play Store release
- Debug APKs are for testing on your own phone.
- For Google Play, you need a signed release AAB, app icons
  (192/512 are in this folder as a start), a Play listing,
  and a privacy policy. Do not publish a debug APK to Play.

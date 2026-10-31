/* ============================================================
   ADSENSE SWITCH — the only file you need to edit for ads.
   1) Get approved on Google AdSense (needs your own domain).
   2) Paste your publisher ID in `client` (looks like ca-pub-1234567890123456).
   3) Create 3 display ad units in AdSense and paste their slot IDs below.
   4) Set enabled: true  — and update /ads.txt with the same pub- number.
   While enabled is false, NO ad script is loaded at all.
   Preview where ads will appear: open the site with ?adpreview=1
   ============================================================ */
window.ADS = {
  enabled: false,
  client: 'ca-pub-XXXX',
  slots: {
    top: '0000000000',      // top banner on the home page
    between: '0000000000',  // between sections / between rounds
    end: '0000000000'       // game-over screen
  }
};

# Aqsa Imran — Video Editor Portfolio

Plain HTML / CSS / vanilla JavaScript. No build step, no framework, no npm install needed.

## Folder structure

```
site/
├── index.html            ← all page TEXT (headlines, about, contact info)
├── css/
│   └── styles.css        ← colors, fonts, spacing, logo size
├── js/
│   ├── main.js             ← site behavior — you shouldn't need to touch this
│   └── projects-data.js    ← YOUR VIDEOS — edit this to add/change/reorder videos
├── assets/
│   ├── videos/              ← small/local video files, if you use any (optional now)
│   └── images/
│       ├── logo.png         ← your logo (already wired into the navbar)
│       ├── favicon.png       ← your favicon (original, kept for reference)
│       ├── favicon-32.png    ← auto-resized copy used for the browser tab
│       └── favicon-180.png   ← auto-resized copy used for the Apple touch icon
└── README.md
```

## The most important file: `js/projects-data.js`

This is the only file you need for adding, removing, or swapping videos — for the hero showreel, the "See the Difference" clips, and every project in the "Selected Work" grid.

### Why Google Drive

Your video files are too large to push to GitHub (some are 400+ MB). GitHub repos aren't meant to hold files like that, and most hosts will reject the push. Google Drive solves this: the video stays on Drive, and the site embeds it directly on the page — visitors never get redirected to Drive, they just see the video player right there on your site.

### Adding a video with Google Drive (recommended)

1. Upload the video to Google Drive.
2. Right-click it → **Share** → change **General access** to **"Anyone with the link"**, role **Viewer**.
   *(If you skip this step, the embedded player will show a blank/broken box for visitors — this is the #1 cause of "my video won't play".)*
3. Copy the link Drive gives you. It looks like:
   `https://drive.google.com/file/d/1AbCdEfGhIjKlmNoPQRstuVwxyz/view?usp=sharing`
4. Open `js/projects-data.js` and paste that **whole link** into the `drive:` field of the entry you want, for example:
   ```js
   drive: "https://drive.google.com/file/d/1AbCdEfGhIjKlmNoPQRstuVwxyz/view?usp=sharing",
   file: ""
   ```
   You do **not** need to extract the file ID yourself — the site does that automatically.
5. Leave `file: ""` empty. (If both `drive` and `file` are filled in, Drive is used.)
6. Save, then reload the page.

### Adding a video as a local file instead

Only do this for small files your host can handle:
1. Put the file in `assets/videos/`.
2. Set `file: "assets/videos/your-file.mp4"` and leave `drive: ""` empty.

### The three places you can wire up

At the top of `js/projects-data.js`:
- `HERO_VIDEO` — the big video at the top of the page.
- `COMPARE_RAW` / `COMPARE_FINAL` — the two clips in "See the Difference".

Below that, the `PROJECTS` array — one `{ ... }` block per card in "Selected Work". Copy a block to add a project, delete one to remove it, reorder by cutting and pasting.

### Sizing (`ratioW` / `ratioH`)

Every video entry has `ratioW` and `ratioH` — your video's real pixel width and height. This is what keeps each video box the correct shape without stretching or cropping. Since most of your clips are vertical Reels/TikToks, a safe default is `ratioW: 9, ratioH: 16`. Square → `1, 1`. Horizontal → `16, 9`.

### If a video doesn't load

- **Drive link pasted wrong / file made private again** → the site shows "Video preview unavailable" with an "Open video" button instead of a broken box.
- **Nothing entered at all** → a plain placeholder frame is shown so the layout never breaks.

## Logo and favicon

Your own logo (`logo.png`) and favicon (`favicon.png`) are already wired in — nothing was regenerated.

- **Logo** — shown in the navbar at `assets/images/logo.png`, sized responsively (84px tall on desktop, 68px on tablet, 58px on mobile) so the text in it stays readable. To adjust the size further, edit the `.logo-link img` rule near the top of `css/styles.css`.
- **Favicon** — `favicon-32.png` and `favicon-180.png` are auto-resized copies of your original `favicon.png`, used for the browser tab and Apple touch icon respectively (browsers ignore huge favicon files, so smaller copies load faster). Both are already linked in `index.html`'s `<head>`. To swap the favicon, replace `assets/images/favicon.png` with your new file and regenerate the two resized copies (or just resize them yourself with any image tool).

## Other things to edit

**Your email and social links**
→ `index.html`, the Contact section. Search for `hello@yourname.com` and update it, and delete any link you don't want shown.

**About section text + portrait photo**
→ `index.html`, the About section. Replace the paragraph text, and swap in your photo as described in the comment inside `.about-portrait`.

**Testimonials**
→ `index.html`, the Testimonials section. It's hidden (`style="display:none;"`) until you have real quotes. Delete that attribute and replace the placeholder quotes/names once you have real ones.

**Colors, fonts, spacing**
→ `css/styles.css`, the `:root { ... }` block at the very top.

**Contact form**
→ Currently shows a success message in the browser but isn't connected to anything — no emails are sent yet. Connect it to a free service like Formspree by adding an `action` attribute to the `<form>` tag.

## Deploying

This is a static site — GitHub Pages, Netlify, or Vercel all work by pointing at this folder. Because your videos live on Google Drive rather than in this repo, there's nothing here that will hit GitHub's file-size limits.

/* =========================================================================
   YOUR VIDEOS — THIS IS THE ONLY FILE YOU NEED TO TOUCH TO ADD/CHANGE VIDEOS
   =========================================================================

   You now have TWO ways to give the site a video. Use whichever is easier:

   OPTION A — Google Drive link (recommended if your files are large,
   since big video files can't be pushed to most Git repos):
     1. Upload your video to Google Drive.
     2. Right-click it → Share → change access to
        "Anyone with the link" → Viewer.
     3. Copy the share link Drive gives you (it looks like
        https://drive.google.com/file/d/SOME_LONG_ID/view?usp=sharing).
     4. Paste that whole link into the "drive" field below.
     5. Leave "file" as an empty string: file: ""
     The site automatically turns that link into an embedded, playable
     Google Drive video — nobody needs to click through to Drive itself.

   OPTION B — Local file (only works if the file is small enough to
   upload with the rest of your site, e.g. via FTP or your host's file
   manager):
     1. Put the video inside assets/videos/.
     2. Set "file" to its path, e.g. file: "assets/videos/my-edit.mp4"
     3. Leave "drive" as an empty string: drive: ""

   If BOTH are filled in, the Drive link is used. If BOTH are empty,
   a placeholder frame is shown instead so the site never breaks.

   "ratioW" and "ratioH" control the shape of the video's box on the
   page (so nothing stretches or gets cropped) — use your video's real
   width and height in pixels. Safe defaults if you're not sure:
      - Instagram Reels / TikTok (vertical) → ratioW: 9,  ratioH: 16
      - Square posts                         → ratioW: 1,  ratioH: 1
      - Normal horizontal video               → ratioW: 16, ratioH: 9
   ========================================================================= */


/* ---------- HERO SHOWREEL (the big video at the top of the page) ---------- */
var HERO_VIDEO = {
  drive: "https://drive.google.com/file/d/1sV-F8uuCqLVDZBFBat2OQoge_kO_UkwF/view?usp=drive_link",
  file: "",
  ratioW: 16,
  ratioH: 9
};

/* ---------- "SEE THE DIFFERENCE" SECTION ---------- */
var COMPARE_RAW = {
  drive: "https://drive.google.com/file/d/18IUFAEWG2JlHw1KLsusI2KMu_2qhjbX9/view?usp=drive_link",
  file: "",
  ratioW: 16,
  ratioH: 9
};
var COMPARE_FINAL = {
  drive: "https://drive.google.com/file/d/14l96vOpztJLmGKgMJ7GHLfYQHegLdPee/view?usp=drive_link",
  file: "",
  ratioW: 16,
  ratioH: 9
};


/* ---------- SELECTED WORK GRID ----------
   To add a new project: copy one whole { ... } block (including the
   comma before or after it) and edit the values.
   To remove a project: delete its whole { ... } block.
   To reorder: cut and paste blocks into a different order.
   ------------------------------------------------------------------- */
var PROJECTS = [

  {
    title: "Lyric Edit",
    category: "Lyric Video",
    role: "Editor (personal project)",
    desc: "Lyrics synced to the beat over a trending clip.",
    brief: "A practice edit pairing on-screen lyric text with a trending audio, timed to the beat.",
    what: ["Beat sync", "Text animation", "Pacing", "Captions"],
    deliverables: "9:16, vertical.",
    drive: "https://drive.google.com/file/d/1mA5NOU8mkMqTLRwtawlXgfacnHeSQiiZ/view?usp=drive_linkhttps://drive.google.com/file/d/1mA5NOU8mkMqTLRwtawlXgfacnHeSQiiZ/view?usp=drive_link",
    file: "",
    ratioW: 1438,
    ratioH: 2560
  },

  {
    title: "Masking Transition",
    category: "Transition",
    role: "Editor (personal project)",
    desc: "A masking-technique transition used to blend two clips into one smooth cut.",
    brief: "A practice edit exploring mask transitions — using shapes and motion to hide the cut between two clips.",
    what: ["Masking", "Transitions", "Motion graphics", "Color"],
    deliverables: "9:16, vertical.",
    drive: "https://drive.google.com/file/d/1CywwSg_ULtRoQbJ7SmeHdlCmBfAke8ul/view?usp=drive_link",
    file: "",
    ratioW: 1440,
    ratioH: 2560
  },

  {
    title: "Transition Edit",
    category: "Transition",
    role: "Editor (personal project)",
    desc: "A trending transition edit cut tightly to the beat.",
    brief: "A practice edit built around a popular transition trend, focused on timing the cut exactly to the music.",
    what: ["Beat sync", "Transitions", "Pacing", "Color"],
    deliverables: "3:4, vertical.",
    drive: "https://drive.google.com/file/d/1BVPVDyl5PVQH4jaentQtJUAvBmuVcfAl/view?usp=drive_link",
    file: "",
    ratioW: 1440,
    ratioH: 1920
  },

  {
    title: "Transition Edit II",
    category: "Transition",
    role: "Editor (personal project)",
    desc: "Another take on trending transition cuts, with a different pacing style.",
    brief: "A second practice edit in the same trending-transition style, testing a different rhythm and cut timing.",
    what: ["Beat sync", "Transitions", "Pacing"],
    deliverables: "5:6, vertical.",
    drive: "https://drive.google.com/file/d/11TEd9w-AS4Whi9YWZWQnjRirZh4pLzru/view?usp=drive_link",
    file: "",
    ratioW: 1440,
    ratioH: 1728
  },

  {
    title: "Transition + Lyrics",
    category: "Lyric Video",
    role: "Editor (personal project)",
    desc: "Trending transitions combined with synced lyric text in one edit.",
    brief: "A practice edit combining two techniques at once — transition cuts and lyric text — kept in sync with the audio.",
    what: ["Beat sync", "Transitions", "Text animation", "Captions"],
    deliverables: "1:1, square.",
    drive: "https://drive.google.com/file/d/1kRfyHI2h3WODR2FRgpq-5YhtLcGX8hkp/view?usp=drive_link",
    file: "",
    ratioW: 1440,
    ratioH: 1440
  },

  {
    title: "Full Reel",
    category: "Reel Edit",
    role: "Editor (personal project)",
    desc: "A longer compilation reel showing pacing and transitions across multiple clips.",
    brief: "A longer-form edit stringing several clips together, used as the main showreel in the hero section too.",
    what: ["Story structure", "Pacing", "Transitions", "Color"],
    deliverables: "16:9, horizontal.",
    drive: "",
    file: "",
    ratioW: 2560,
    ratioH: 1440
  }

];

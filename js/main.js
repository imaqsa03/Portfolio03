/* =========================================================
   SITE INTERACTIONS — you shouldn't need to edit this file.
   To change your videos, edit js/projects-data.js.
   To change text, edit index.html.
   ========================================================= */
(function(){

  /* ---------------------------------------------------------
     VIDEO RESOLVER
     Turns a { drive, file, ratioW, ratioH } entry from
     projects-data.js into a ready-to-insert wrapper <div> containing
     either a <video> (local file), an <iframe> (Google Drive link,
     with a small "loading" overlay while it connects), or a graceful
     fallback message if the entry is empty or the Drive link couldn't
     be understood. Drive wins if both drive and file are filled in.
     --------------------------------------------------------- */
  function extractDriveId(url){
    if (!url) return null;
    var m = url.match(/\/d\/([a-zA-Z0-9_-]+)/) || url.match(/[?&]id=([a-zA-Z0-9_-]+)/);
    return m ? m[1] : null;
  }

  function wrapperEl(){
    var d = document.createElement('div');
    d.style.width = '100%';
    d.style.height = '100%';
    d.style.position = 'relative';
    return d;
  }

  function fallbackNode(message, openHref){
    var d = document.createElement('div');
    d.className = 'video-fallback';
    var p = document.createElement('p');
    p.textContent = message;
    d.appendChild(p);
    if (openHref){
      var a = document.createElement('a');
      a.href = openHref;
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      a.textContent = 'Open video';
      d.appendChild(a);
    }
    return d;
  }

  function placeholderNode(label){
    var d = document.createElement('div');
    d.style.width = '100%';
    d.style.height = '100%';
    d.style.display = 'flex';
    d.style.alignItems = 'center';
    d.style.justifyContent = 'center';
    d.style.color = 'var(--text-faint)';
    d.style.fontSize = '13px';
    d.style.background = 'linear-gradient(150deg,#1f2230,#101218)';
    d.textContent = label || 'Add a video in js/projects-data.js';
    return d;
  }

  function buildVideoNode(entry, opts){
    opts = opts || {};
    var wrap = wrapperEl();

    if (!entry || (!(entry.drive && entry.drive.trim()) && !(entry.file && entry.file.trim()))){
      wrap.appendChild(placeholderNode(opts.emptyLabel));
      return wrap;
    }

    if (entry.drive && entry.drive.trim()){
      var id = extractDriveId(entry.drive.trim());
      if (!id){
        wrap.appendChild(fallbackNode('Video preview unavailable.', entry.drive.trim()));
        return wrap;
      }

      function insertDriveIframe(){
        wrap.innerHTML = '';
        var loading = document.createElement('div');
        loading.className = 'video-loading';
        loading.textContent = 'Loading video…';
        wrap.appendChild(loading);

        var iframe = document.createElement('iframe');
        iframe.src = 'https://drive.google.com/file/d/' + id + '/preview';
        iframe.setAttribute('allow', 'autoplay; fullscreen');
        iframe.setAttribute('allowfullscreen', '');
        iframe.style.width = '100%';
        iframe.style.height = '100%';
        iframe.style.border = '0';
        iframe.style.display = 'block';
        iframe.addEventListener('load', function(){ loading.remove(); });
        wrap.appendChild(iframe);
      }

      if (opts.clickToLoad){
        // Don't fetch the (often slow) Drive embed until the visitor actually
        // asks for it — big speed win when several videos are on one page.
        var poster = document.createElement('button');
        poster.type = 'button';
        poster.className = 'video-tap-load';
        poster.innerHTML =
          '<span class="play-btn" aria-hidden="true"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg></span>' +
          '<span class="video-tap-label">Tap to load video</span>';
        poster.addEventListener('click', insertDriveIframe);
        wrap.appendChild(poster);
      } else {
        insertDriveIframe();
      }
      return wrap;
    }

    // Local file
    var v = document.createElement('video');
    v.src = entry.file.trim();
    if (opts.controls) v.controls = true;
    if (opts.muted) v.muted = true;
    if (opts.loop) v.loop = true;
    if (opts.playsInline) v.playsInline = true;
    v.preload = opts.preload || 'metadata';
    v.style.width = '100%';
    v.style.height = '100%';
    v.style.objectFit = opts.objectFit || 'cover';
    v.style.display = 'block';
    v.addEventListener('error', function(){
      wrap.innerHTML = '';
      wrap.appendChild(fallbackNode('Video preview unavailable.'));
    });
    wrap.appendChild(v);
    return wrap;
  }


  // ---- Mobile nav ----
  var hamburger = document.getElementById('hamburgerBtn');
  var panel = document.getElementById('mobilePanel');
  hamburger.addEventListener('click', function(){
    var open = hamburger.getAttribute('aria-expanded') === 'true';
    hamburger.setAttribute('aria-expanded', String(!open));
    panel.classList.toggle('open', !open);
  });
  panel.querySelectorAll('a').forEach(function(a){
    a.addEventListener('click', function(){
      hamburger.setAttribute('aria-expanded', 'false');
      panel.classList.remove('open');
    });
  });

  // ---- Hero showreel ----
  var showreelMedia = document.getElementById('showreelMedia');
  var reelPlay = document.getElementById('reelPlay');
  var heroWrap = buildVideoNode(HERO_VIDEO, {
    muted: true, loop: true, playsInline: true, objectFit: 'contain', preload: 'metadata',
    clickToLoad: true,
    emptyLabel: 'Add your showreel in js/projects-data.js (HERO_VIDEO)'
  });
  showreelMedia.appendChild(heroWrap);
  var heroVideoEl = heroWrap.querySelector('video');
  if (heroVideoEl){
    heroVideoEl.play().catch(function(){});
    reelPlay.addEventListener('click', function(){
      heroVideoEl.muted = false;
      heroVideoEl.controls = true;
      heroVideoEl.play();
      reelPlay.classList.add('hidden');
    });
  } else {
    // Drive embed (or empty state) already has its own controls — ours gets out of the way.
    reelPlay.classList.add('hidden');
  }

  // ---- Raw vs. Final comparison ----
  function fillCompare(containerId, entry, label){
    var wrap = document.getElementById(containerId);
    wrap.style.aspectRatio = entry.ratioW + ' / ' + entry.ratioH;
    wrap.appendChild(buildVideoNode(entry, { controls: true, preload: 'metadata', objectFit: 'cover', clickToLoad: true, emptyLabel: 'Add ' + label + ' in js/projects-data.js' }));
  }
  fillCompare('compareRawMedia', COMPARE_RAW, 'COMPARE_RAW');
  fillCompare('compareFinalMedia', COMPARE_FINAL, 'COMPARE_FINAL');

  // ---- Work grid (built from PROJECTS in projects-data.js) ----
  var grid = document.getElementById('workGrid');

  PROJECTS.forEach(function(p){
    var card = document.createElement('button');
    card.type = 'button';
    card.className = 'work-card';

    var thumb = document.createElement('div');
    thumb.className = 'work-thumb';
    thumb.style.aspectRatio = p.ratioW + ' / ' + p.ratioH;

    var tag = document.createElement('span');
    tag.className = 'work-category-tag';
    tag.textContent = p.category;

    var playIcon = document.createElement('span');
    playIcon.className = 'play-btn';
    playIcon.setAttribute('aria-hidden', 'true');
    playIcon.innerHTML = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>';

    // Grid thumbnails only get a live hover-preview for local files
    // (Drive embeds can't be silently autoplayed on hover), so Drive-linked
    // projects show a placeholder frame in the grid and play in the popup.
    var isDriveEntry = p.drive && p.drive.trim();
    var previewVideo = null;
    if (!isDriveEntry && p.file && p.file.trim()){
      previewVideo = document.createElement('video');
      previewVideo.src = p.file.trim();
      previewVideo.muted = true;
      previewVideo.loop = true;
      previewVideo.playsInline = true;
      previewVideo.preload = 'metadata';
      previewVideo.style.width = '100%';
      previewVideo.style.height = '100%';
      previewVideo.style.objectFit = 'cover';
      previewVideo.style.display = 'block';
      thumb.appendChild(previewVideo);
    } else {
      thumb.appendChild(placeholderNode(isDriveEntry ? 'Drive video — tap to play' : 'Add a video in js/projects-data.js'));
    }

    thumb.appendChild(tag);
    thumb.appendChild(playIcon);

    var body = document.createElement('div');
    body.className = 'work-body';
    body.innerHTML =
      '<h3>' + p.title + '</h3>' +
      '<div class="work-role">' + p.role + '</div>' +
      '<p class="work-desc">' + p.desc + '</p>' +
      '<span class="work-link">View Project →</span>';

    card.appendChild(thumb);
    card.appendChild(body);

    if (previewVideo){
      card.addEventListener('pointerenter', function(e){
        if (e.pointerType === 'mouse') { previewVideo.currentTime = 0; previewVideo.play().catch(function(){}); }
      });
      card.addEventListener('pointerleave', function(e){
        if (e.pointerType === 'mouse') { previewVideo.pause(); previewVideo.currentTime = 0; }
      });
    }

    card.addEventListener('click', function(){ openCase(p); });
    grid.appendChild(card);
  });

  // ---- Case study modal ----
  var modal = document.getElementById('caseModal');
  var csMedia = document.getElementById('csMedia');

  function openCase(p){
    document.getElementById('csTitle').textContent = p.title;
    document.getElementById('csMeta').textContent = p.category + ' — ' + p.role;
    document.getElementById('csBrief').textContent = p.brief;
    document.getElementById('csRole').textContent = p.role + ' on this project.';
    document.getElementById('csDeliverables').textContent = p.deliverables;

    csMedia.innerHTML = '';
    var mediaWrap = document.createElement('div');
    mediaWrap.style.width = '100%';
    mediaWrap.style.maxHeight = '60vh';
    mediaWrap.style.aspectRatio = p.ratioW + ' / ' + p.ratioH;
    mediaWrap.style.margin = '0 auto';
    mediaWrap.style.position = 'relative';

    var closeBtn = document.createElement('button');
    closeBtn.className = 'cs-close';
    closeBtn.setAttribute('aria-label', 'Close case study');
    closeBtn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 6l12 12M18 6L6 18"/></svg>';
    closeBtn.addEventListener('click', function(){ modal.close(); });

    mediaWrap.appendChild(buildVideoNode(p, { controls: true, preload: 'metadata', objectFit: 'contain', emptyLabel: 'Add a video in js/projects-data.js' }));
    csMedia.appendChild(mediaWrap);
    csMedia.appendChild(closeBtn);

    var whatWrap = document.getElementById('csWhat');
    whatWrap.innerHTML = '';
    p.what.forEach(function(w){
      var s = document.createElement('span');
      s.textContent = w;
      whatWrap.appendChild(s);
    });

    if (typeof modal.showModal === 'function') { modal.showModal(); }
  }

  modal.addEventListener('close', function(){
    var v = csMedia.querySelector('video');
    if (v) v.pause();
    csMedia.innerHTML = '';
  });
  modal.addEventListener('click', function(e){
    var rect = modal.getBoundingClientRect();
    var inside = e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom;
    if (!inside) modal.close();
  });

  // ---- Contact form success state (front-end only — no backend wired up) ----
  var form = document.getElementById('contactForm');
  var success = document.getElementById('formSuccess');
  form.addEventListener('submit', function(e){
    e.preventDefault();
    if (!form.checkValidity()) { form.reportValidity(); return; }
    form.classList.add('submitted');
    success.classList.add('show');
  });

})();
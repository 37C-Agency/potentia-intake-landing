/* ============================================================================
   WA Lead Widget  —  a drop-in WhatsApp button that qualifies before it chats.
   ----------------------------------------------------------------------------
   Tap the button -> a small form opens with your questions -> "Open WhatsApp"
   opens WhatsApp with a clean, pre-filled message containing the answers.

   One file. No dependencies. Injects its own styles. Configure with one object.

   Usage:
     <script src="wa-lead-widget.js"></script>
     <script>
       WALeadWidget.init({
         phone: "971500000000",                 // international, digits only
         brand: {
           name: "37 Consult",
           tagline: "We'll reply on WhatsApp in a few minutes",
           avatar: "logo.png",                   // optional image url
           accent: "#1f6f54"                     // optional, defaults to WA green
         },
         intro: "Tell us a little about you and we'll pick up on WhatsApp.",
         fields: [
           { id: "name",     label: "Your name",       type: "text",   placeholder: "Jane Doe", required: true },
           { id: "industry", label: "Industry",        type: "choice", options: ["Dental / Medical","Real estate","Home services","E-commerce","Other"], required: true },
           { id: "revenue",  label: "Monthly revenue", type: "choice", options: ["< AED 50k","AED 50–150k","AED 150–500k","AED 500k+"] }
         ],
         // {{field}} tokens get replaced. *bold* is WhatsApp markdown.
         message:
           "Hey, my name is *{{name}}*.\n\n" +
           "• Industry: {{industry}}\n" +
           "• Monthly revenue: {{revenue}}\n\n" +
           "I'd like to talk about working together.",
         submitLabel: "Open WhatsApp"
       });
     </script>
   ========================================================================== */

(function (global) {
  "use strict";

  var WA_GREEN = "#25D366";
  var WA_HEADER = "#075E54";

  // ---- tiny helpers -------------------------------------------------------
  function el(tag, cls, html) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (html != null) n.innerHTML = html;
    return n;
  }
  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }
  function fill(tpl, data) {
    return tpl.replace(/\{\{\s*(\w+)\s*\}\}/g, function (_, k) {
      return data[k] != null ? data[k] : "";
    });
  }
  function shade(hex, p) {
    var n = parseInt(hex.slice(1), 16),
      r = (n >> 16) & 255, g = (n >> 8) & 255, b = n & 255,
      t = p < 0 ? 0 : 255, a = Math.abs(p) / 100;
    var to = function (c) { return Math.round((t - c) * a + c); };
    return "#" + ((1 << 24) + (to(r) << 16) + (to(g) << 8) + to(b)).toString(16).slice(1);
  }

  var WA_LOGO =
    '<svg viewBox="0 0 32 32" width="26" height="26" aria-hidden="true">' +
    '<path fill="#fff" d="M16 3C9 3 3.5 8.5 3.5 15.5c0 2.4.7 4.7 1.9 6.7L4 29l7-1.8c1.9 1 4 1.6 6.1 1.6 7 0 12.5-5.5 12.5-12.5S23 3 16 3z"/>' +
    '<path fill="' + WA_GREEN + '" d="M16 5.2c5.7 0 10.3 4.6 10.3 10.3S21.7 25.8 16 25.8c-1.9 0-3.8-.5-5.4-1.5l-.4-.2-3.9 1 1-3.8-.3-.4a10.2 10.2 0 0 1-1.6-5.6C5.4 9.8 10 5.2 16 5.2z"/>' +
    '<path fill="#fff" d="M12.3 10.1c-.3-.6-.5-.6-.8-.6h-.7c-.2 0-.6.1-.9.4-.3.3-1.2 1.2-1.2 2.9s1.2 3.3 1.4 3.6c.2.2 2.4 3.8 6 5.3 3 1.2 3.6.9 4.2.9.7-.1 2.1-.9 2.4-1.7.3-.8.3-1.6.2-1.7-.1-.2-.3-.2-.7-.4-.3-.2-2.1-1-2.4-1.2-.3-.1-.6-.2-.8.2-.2.3-.9 1.1-1.1 1.4-.2.2-.4.2-.7.1-.4-.2-1.6-.6-3-1.8-1.1-1-1.9-2.2-2.1-2.6-.2-.3 0-.5.1-.7l.5-.6c.2-.2.2-.3.4-.6.1-.2 0-.4 0-.6-.1-.2-.8-2-1.1-2.7z"/>' +
    "</svg>";

  // ---- styles -------------------------------------------------------------
  function injectStyles(accent) {
    if (document.getElementById("walw-styles")) return;
    var headerDark = shade(accent, -22);
    var accentSoft = shade(accent, 88);
    var css = `
    .walw, .walw * { box-sizing: border-box; }
    .walw {
      --walw-accent: ${accent};
      --walw-header: ${headerDark};
      --walw-soft: ${accentSoft};
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    }
    /* launcher */
    .walw-fab {
      position: fixed; right: 22px; bottom: 22px; z-index: 2147483000;
      width: 60px; height: 60px; border-radius: 50%; border: 0;
      background: ${WA_GREEN}; color: #fff; cursor: pointer;
      display: grid; place-items: center;
      box-shadow: 0 8px 24px rgba(16,80,60,.32), 0 2px 6px rgba(0,0,0,.18);
      transition: transform .22s cubic-bezier(.2,.9,.3,1.4), box-shadow .22s;
      animation: walw-pop .5s cubic-bezier(.2,.9,.3,1.4) both;
    }
    .walw-fab:hover { transform: scale(1.07); box-shadow: 0 12px 30px rgba(16,80,60,.4); }
    .walw-fab:active { transform: scale(.95); }
    .walw-fab svg { width: 30px; height: 30px; }
    .walw-fab .walw-pulse {
      position: absolute; inset: 0; border-radius: 50%;
      animation: walw-ring 2.4s ease-out infinite;
    }
    .walw-badge {
      position: absolute; top: -3px; right: -3px; min-width: 20px; height: 20px;
      padding: 0 5px; border-radius: 10px; background: #ff3b30; color: #fff;
      font-size: 12px; font-weight: 700; display: grid; place-items: center;
      border: 2px solid #fff;
    }
    /* inline button (drop anywhere on a page) */
    .walw-btn {
      display: inline-flex; align-items: center; justify-content:center; gap: 10px;
      background: ${WA_GREEN}; color: #fff; border: 0; cursor: pointer;
      font-family: inherit; font-size: 16px; font-weight: 600; line-height:1;
      padding: 14px 24px; border-radius: 12px; text-decoration: none;
      box-shadow: 0 8px 20px rgba(37,211,102,.32); transition: transform .15s, box-shadow .15s;
    }
    .walw-btn:hover { transform: translateY(-2px); box-shadow: 0 12px 26px rgba(37,211,102,.45); }
    .walw-btn:active { transform: translateY(0); }
    .walw-btn svg { width: 22px; height: 22px; }
    .walw-btn.ghost { background:#fff; color:${WA_HEADER}; border:1.5px solid #d8e0db; box-shadow:none; }
    .walw-btn.ghost:hover { border-color:${WA_GREEN}; }
    /* panel — anchored popover (position set in JS relative to the button) */
    .walw-panel {
      position: fixed; top: 0; left: 0; z-index: 2147483000;
      width: 348px; max-width: calc(100vw - 24px);
      background: #fff; border-radius: 18px; overflow: hidden;
      box-shadow: 0 24px 60px rgba(0,0,0,.26), 0 4px 14px rgba(0,0,0,.14);
      transform-origin: 100% 100%;
      animation: walw-in .26s cubic-bezier(.2,.9,.3,1.2) both;
    }
    .walw-panel.walw-closing { animation: walw-out .16s ease-in both; }
    /* mobile: dock to the bottom as a sheet, ignore anchor */
    .walw-panel.walw-mobile {
      left: 8px !important; right: 8px !important; top: auto !important;
      bottom: 10px !important; width: auto !important; max-width: none !important;
      transform-origin: bottom center !important;
    }
    /* header */
    .walw-head {
      background: var(--walw-header); color: #fff; padding: 16px 16px 17px;
      display: flex; align-items: center; gap: 12px; position: relative;
    }
    .walw-ava {
      width: 44px; height: 44px; border-radius: 50%; flex: 0 0 auto;
      background: rgba(255,255,255,.18); display: grid; place-items: center;
      overflow: hidden; font-weight: 700; font-size: 18px; color:#fff;
    }
    .walw-ava img { width: 100%; height: 100%; object-fit: cover; }
    .walw-meta { line-height: 1.3; min-width: 0; }
    .walw-name { font-weight: 600; font-size: 16px; }
    .walw-status { font-size: 12.5px; opacity: .88; display:flex; align-items:center; gap:6px; margin-top:1px; }
    .walw-dot { width: 9px; height: 9px; border-radius: 50%; background:#7CFCB4; }
    .walw-x {
      margin-left: auto; background: transparent; border: 0; color: #fff;
      width: 30px; height: 30px; border-radius: 50%; cursor: pointer; font-size: 22px; line-height:1;
      opacity: .85; transition: background .15s; align-self:flex-start;
    }
    .walw-x:hover { background: rgba(255,255,255,.15); opacity:1; }
    /* form */
    .walw-form { padding: 16px 16px 6px; max-height: min(560px, calc(100vh - 220px)); overflow-y:auto; }
    .walw-intro { font-size: 14px; color:#56635d; line-height:1.5; margin: 0 2px 16px; }
    .walw-field { margin-bottom: 14px; animation: walw-bub .3s ease both; }
    .walw-field label { display:block; font-size: 12.5px; font-weight:600; color:#3a463f; margin: 0 2px 6px; }
    .walw-field label .req { color:#e0563f; }
    .walw-control {
      width:100%; font-size: 14.5px; color:#16241d; background:#f4f6f4;
      border: 1.5px solid #e2e7e3; border-radius: 11px; padding: 11px 13px;
      outline: none; transition: border-color .15s, box-shadow .15s, background .15s;
      font-family: inherit; -webkit-appearance:none; appearance:none;
    }
    .walw-control:focus { border-color: var(--walw-accent); background:#fff; box-shadow: 0 0 0 3px var(--walw-soft); }
    select.walw-control {
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath fill='%237a857f' d='M1 1l5 5 5-5'/%3E%3C/svg%3E");
      background-repeat:no-repeat; background-position: right 13px center; padding-right: 34px; cursor:pointer;
    }
    textarea.walw-control { resize: vertical; min-height: 70px; line-height:1.45; }
    /* chip choice (optional render) */
    .walw-chips { display:flex; flex-wrap:wrap; gap:7px; }
    .walw-chip {
      font-size: 13px; font-weight: 600; padding: 8px 13px; border-radius: 20px; cursor:pointer;
      background:#f4f6f4; border:1.5px solid #e2e7e3; color:#3a463f; transition: all .14s;
    }
    .walw-chip:hover { border-color: var(--walw-accent); }
    .walw-chip.sel { background: var(--walw-accent); border-color: var(--walw-accent); color:#fff; }
    .walw-err { font-size: 11.5px; color:#e0563f; margin: 5px 2px 0; display:none; }
    .walw-field.invalid .walw-err { display:block; }
    .walw-field.invalid .walw-control { border-color:#e0563f; }
    /* footer / submit */
    .walw-foot { padding: 4px 16px 16px; }
    .walw-submit {
      width:100%; border:0; border-radius: 12px; padding: 14px; cursor:pointer;
      background: ${WA_GREEN}; color:#fff; font-size: 15.5px; font-weight: 700;
      display:flex; align-items:center; justify-content:center; gap:9px;
      box-shadow: 0 8px 20px rgba(37,211,102,.4); transition: transform .15s, box-shadow .15s;
      font-family: inherit;
    }
    .walw-submit:hover { transform: translateY(-2px); box-shadow: 0 12px 26px rgba(37,211,102,.5); }
    .walw-submit:active { transform: translateY(0); }
    .walw-submit:disabled { background:#c4cfc9; color:#fff; box-shadow:none; cursor:not-allowed; transform:none; }
    .walw-gate {
      display:none; font-size:12px; color:#c0563f; text-align:center;
      margin-top:9px; line-height:1.45; animation: walw-bub .25s ease both;
    }
    .walw-priv { text-align:center; font-size: 11px; color:#9aa49e; margin-top: 10px; display:flex; align-items:center; justify-content:center; gap:5px; }
    .walw-mark { display:block; text-align:center; font-size: 10.5px; color:#aab2ad; text-decoration:none; margin-top:7px; }
    .walw-mark:hover { color: var(--walw-accent); }
    /* success */
    .walw-done { padding: 30px 22px 26px; text-align:center; animation: walw-bub .3s ease both; }
    .walw-done .ok { width:58px;height:58px;border-radius:50%;background:var(--walw-soft);display:grid;place-items:center;margin:0 auto 14px; }
    .walw-done h4 { font-size:18px;color:#16241d;margin:0 0 6px; }
    .walw-done p { font-size:14px;color:#56635d;margin:0 0 18px;line-height:1.5; }
    .walw-done.blocked .ok { background:#fdece9; }
    .walw-done .alt {
      display:inline-block; margin-top:4px; font-size:13.5px; font-weight:600;
      color:var(--walw-accent); text-decoration:none;
    }
    .walw-done .alt:hover { text-decoration:underline; }
    /* keyframes */
    @keyframes walw-pop { from { transform: scale(0) rotate(-40deg); opacity:0 } to { transform: scale(1) rotate(0); opacity:1 } }
    @keyframes walw-in  { from { transform: scale(.85) translateY(14px); opacity:0 } to { transform: scale(1) translateY(0); opacity:1 } }
    @keyframes walw-out { to { transform: scale(.9) translateY(10px); opacity:0 } }
    @keyframes walw-bub { from { transform: translateY(8px); opacity:0 } to { transform: translateY(0); opacity:1 } }
    @keyframes walw-ring { 0% { box-shadow:0 0 0 0 rgba(37,211,102,.5) } 70%{ box-shadow:0 0 0 14px rgba(37,211,102,0) } 100%{ box-shadow:0 0 0 0 rgba(37,211,102,0) } }
    @media (max-width: 460px) {
      .walw-panel { right: 8px; left: 8px; width: auto; bottom: 84px; }
      .walw-fab { right: 16px; bottom: 16px; }
    }`;
    var s = el("style");
    s.id = "walw-styles";
    s.textContent = css;
    document.head.appendChild(s);
  }

  // ---- widget -------------------------------------------------------------
  function WALeadWidget() {}

  WALeadWidget.init = function (cfg) {
    if (!cfg || !cfg.phone) { console.error("[WALeadWidget] cfg.phone is required"); return; }
    var brand = cfg.brand || {};
    var accent = brand.accent || WA_HEADER;
    injectStyles(accent);

    var fields = cfg.fields || [];
    var root = el("div", "walw");
    document.body.appendChild(root);

    // launcher: floating bubble (default), or none if you only want inline buttons.
    // cfg.launcher: "fab" (default) | false
    var fab = null;
    if (cfg.launcher !== false && cfg.launcher !== "none") {
      fab = el("button", "walw-fab");
      fab.setAttribute("aria-label", "Chat on WhatsApp");
      fab.innerHTML = '<span class="walw-pulse"></span>' + WA_LOGO + '<span class="walw-badge">1</span>';
      root.appendChild(fab);
      fab.onclick = function () { open ? close() : openPanel(fab); };
    }

    // inline triggers: any element with [data-walw-open], plus an optional cfg.trigger
    // selector. Delegated on document so buttons added later still work. The clicked
    // element becomes the anchor the form pops out from.
    document.addEventListener("click", function (e) {
      var t = e.target.closest("[data-walw-open]" + (cfg.trigger ? "," + cfg.trigger : ""));
      if (t) { e.preventDefault(); open ? close() : openPanel(t); }
    });

    // optional: auto-render a styled WhatsApp button into a container selector
    if (cfg.renderButton) {
      var host = document.querySelector(cfg.renderButton);
      if (host) {
        var b = el("button", "walw-btn" + (cfg.buttonStyle === "ghost" ? " ghost" : ""));
        b.innerHTML = WA_LOGO + " " + esc(cfg.buttonLabel || "Message us on WhatsApp");
        b.setAttribute("data-walw-open", "");
        host.appendChild(b);
      }
    }

    var panel = null, open = false;

    function headerHTML() {
      var initials = (brand.name || "Chat").trim().slice(0, 1).toUpperCase();
      var ava = brand.avatar ? '<img src="' + esc(brand.avatar) + '" alt="">' : initials;
      return '<div class="walw-head">' +
          '<div class="walw-ava">' + ava + "</div>" +
          '<div class="walw-meta">' +
            '<div class="walw-name">' + esc(brand.name || "WhatsApp") + "</div>" +
            '<div class="walw-status"><span class="walw-dot"></span>' +
              esc(brand.tagline || "Online") + "</div>" +
          "</div>" +
          '<button class="walw-x" aria-label="Close">&times;</button>' +
        "</div>";
    }

    function fieldHTML(f, i) {
      var lbl = '<label>' + esc(f.label || f.id) +
        (f.required ? ' <span class="req">*</span>' : "") + "</label>";
      var ctrl;
      if (f.type === "choice" && f.style === "chips") {
        ctrl = '<div class="walw-chips" data-id="' + esc(f.id) + '">' +
          (f.options || []).map(function (o) {
            return '<button type="button" class="walw-chip" data-val="' + esc(o) + '">' + esc(o) + "</button>";
          }).join("") + "</div>";
      } else if (f.type === "choice") {
        ctrl = '<select class="walw-control" data-id="' + esc(f.id) + '">' +
          '<option value="" disabled selected>' + esc(f.placeholder || "Select…") + "</option>" +
          (f.options || []).map(function (o) {
            return '<option value="' + esc(o) + '">' + esc(o) + "</option>";
          }).join("") + "</select>";
      } else if (f.type === "textarea") {
        ctrl = '<textarea class="walw-control" data-id="' + esc(f.id) + '" placeholder="' +
          esc(f.placeholder || "") + '"></textarea>';
      } else {
        var t = f.type === "email" ? "email" : f.type === "tel" ? "tel" : "text";
        ctrl = '<input class="walw-control" type="' + t + '" data-id="' + esc(f.id) +
          '" placeholder="' + esc(f.placeholder || "") + '">';
      }
      return '<div class="walw-field" style="animation-delay:' + (i * 0.04) + 's">' +
        lbl + ctrl + '<div class="walw-err">' + esc(f.error || "Please fill this in") + "</div></div>";
    }

    function buildPanel() {
      panel = el("div", "walw-panel");
      panel.innerHTML =
        headerHTML() +
        '<form class="walw-form" novalidate>' +
          (cfg.intro ? '<p class="walw-intro">' + esc(cfg.intro) + "</p>" : "") +
          fields.map(fieldHTML).join("") +
        "</form>" +
        '<div class="walw-foot">' +
          '<button type="button" class="walw-submit">' + WA_LOGO + " " +
            esc(cfg.submitLabel || "Open WhatsApp") + "</button>" +
          '<div class="walw-gate"></div>' +
          '<div class="walw-priv">' +
            '<svg width="11" height="11" viewBox="0 0 24 24" fill="#9aa49e"><path d="M12 1L3 5v6c0 5.5 3.8 10.7 9 12 5.2-1.3 9-6.5 9-12V5l-9-4z"/></svg>' +
            esc(cfg.privacy || "Your details only go to us on WhatsApp") +
          "</div>" +
          (cfg.watermark ? '<a class="walw-mark" href="' +
            esc(cfg.watermarkUrl || "https://wabutton.io") +
            '" target="_blank" rel="noopener">⚡ Powered by WA Button</a>' : "") +
        "</div>";
      root.appendChild(panel);
      panel.querySelector(".walw-x").onclick = close;

      // chip selection
      panel.querySelectorAll(".walw-chips").forEach(function (grp) {
        grp.addEventListener("click", function (e) {
          var b = e.target.closest(".walw-chip"); if (!b) return;
          grp.querySelectorAll(".walw-chip").forEach(function (c) { c.classList.remove("sel"); });
          b.classList.add("sel"); grp.dataset.val = b.dataset.val;
          grp.closest(".walw-field").classList.remove("invalid");
          updateGate();
        });
      });
      // clear error + re-check the live gate on every change
      panel.querySelectorAll(".walw-control").forEach(function (c) {
        var onChange = function () { c.closest(".walw-field").classList.remove("invalid"); updateGate(); };
        c.addEventListener("input", onChange);
        c.addEventListener("change", onChange);
      });

      panel.querySelector(".walw-submit").onclick = submit;
      updateGate();
    }

    // Read current answers without validating (for the live gate).
    function readData() {
      var data = {};
      fields.forEach(function (f) {
        var node = panel.querySelector('[data-id="' + f.id + '"]');
        if (!node) { data[f.id] = ""; return; }
        data[f.id] = node.classList.contains("walw-chips")
          ? (node.dataset.val || "") : (node.value || "").trim();
      });
      return data;
    }

    // Live filtering (opt-in via cfg.liveGate): the moment a field's chosen answer
    // is in its disqualify list, grey out submit and explain why. Default OFF — by
    // default a disqualifying answer instead routes to the "not a fit" screen on
    // submit (set cfg.liveGate = true to grey the button live instead).
    function updateGate() {
      if (!panel || !cfg.liveGate) return;
      var data = readData(), hit = null;
      for (var i = 0; i < fields.length; i++) {
        var f = fields[i];
        if (f.disqualify && data[f.id] && f.disqualify.indexOf(data[f.id]) !== -1) { hit = f; break; }
      }
      var btn = panel.querySelector(".walw-submit");
      var note = panel.querySelector(".walw-gate");
      btn.disabled = !!hit;
      if (hit) {
        note.textContent = cfg.gateNote || cfg.disqualifyText ||
          "Based on your answer we're probably not the right fit.";
        note.style.display = "block";
      } else {
        note.style.display = "none";
      }
    }

    function collect() {
      var data = {}, ok = true, firstBad = null;
      fields.forEach(function (f) {
        var node = panel.querySelector('[data-id="' + f.id + '"]');
        var v = "";
        if (!node) { data[f.id] = ""; return; }
        if (node.classList.contains("walw-chips")) v = node.dataset.val || "";
        else v = (node.value || "").trim();
        data[f.id] = v;
        var fieldEl = node.closest(".walw-field");
        var bad = f.required && !v;
        if (f.type === "email" && v && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v)) bad = true;
        if (bad) { ok = false; fieldEl.classList.add("invalid"); if (!firstBad) firstBad = fieldEl; }
      });
      if (firstBad) firstBad.scrollIntoView({ behavior: "smooth", block: "center" });
      return ok ? data : null;
    }

    // Returns null if qualified, otherwise a reason string (for logging).
    // A field can list disqualifying option values via field.disqualify: [...].
    // cfg.qualify(data) can return false (or a string reason) to block.
    function disqualifiedReason(data) {
      for (var i = 0; i < fields.length; i++) {
        var f = fields[i];
        if (f.disqualify && f.disqualify.indexOf(data[f.id]) !== -1) {
          return f.id + ":" + data[f.id];
        }
      }
      if (typeof cfg.qualify === "function") {
        var r = cfg.qualify(data);
        if (r === false) return "qualify-fn";
        if (typeof r === "string") return r;
      }
      return null;
    }

    // Fire a lead/conversion event — ONLY for qualified leads, the moment the
    // WhatsApp message is about to send. Auto-detects the trackers on the page
    // (Meta Pixel, GA4, GTM dataLayer, TikTok) and always dispatches a DOM event.
    // Disable the auto-pixels with cfg.lead = false. Tune with cfg.lead = {...}.
    function fireLead(data) {
      // a framework-agnostic event anyone can listen for:
      try { window.dispatchEvent(new CustomEvent("walw:lead", { detail: data })); } catch (e) {}

      var L = cfg.lead;
      if (L === false) return;
      L = L || {};
      var name = L.event || "Lead";
      var payload = { content_name: L.label || brand.name || "WhatsApp Lead" };
      for (var k in data) payload[k] = data[k];
      if (L.value != null) { payload.value = L.value; payload.currency = L.currency || "AED"; }

      try { if (window.fbq) window.fbq("track", name, payload); } catch (e) {}            // Meta Pixel
      try { if (window.gtag) window.gtag("event", L.gaEvent || "generate_lead", payload); } catch (e) {} // GA4
      try { (window.dataLayer = window.dataLayer || []).push(            // Google Tag Manager
        Object.assign({ event: L.dlEvent || "walw_lead" }, payload)); } catch (e) {}
      try { if (window.ttq) window.ttq.track(L.tiktokEvent || "SubmitForm", payload); } catch (e) {} // TikTok
    }

    // Persist the lead to the hosted backend (if running in hosted mode).
    // Fire-and-forget; uses sendBeacon so it survives the window.open navigation.
    // Sent for BOTH paths so the dashboard sees the full funnel, but the SERVER
    // re-runs the gate and decides CRM push + conversion (never trust the client).
    function postBack(status, data, reason) {
      if (!cfg.endpoint) return;
      var body = JSON.stringify({
        widgetId: cfg.widgetId || null, status: status, reason: reason || null,
        data: data, pageUrl: location.href, referrer: document.referrer, ts: Date.now()
      });
      try {
        if (navigator.sendBeacon) {
          navigator.sendBeacon(cfg.endpoint, new Blob([body], { type: "application/json" }));
        } else {
          fetch(cfg.endpoint, { method: "POST", headers: { "Content-Type": "application/json" }, body: body, keepalive: true });
        }
      } catch (e) {}
    }

    function submit() {
      var data = collect();
      if (!data) return;

      var blockedBy = disqualifiedReason(data);
      if (blockedBy) {
        // NOT a lead — no conversion event fires. Logged for funnel analytics only.
        if (typeof cfg.onDisqualify === "function") cfg.onDisqualify(data, blockedBy);
        try { window.dispatchEvent(new CustomEvent("walw:disqualified",
          { detail: { data: data, reason: blockedBy } })); } catch (e) {}
        postBack("disqualified", data, blockedBy);
        showBlocked();
        return;
      }

      // QUALIFIED — the message is about to send, so this counts as a lead.
      var summary = (typeof cfg.message === "function") ? cfg.message(data) : fill(cfg.message || "", data);
      var url = "https://wa.me/" + String(cfg.phone).replace(/\D/g, "") +
        "?text=" + encodeURIComponent(summary);
      if (typeof cfg.onComplete === "function") cfg.onComplete(data);
      fireLead(data);
      postBack("qualified", data);   // saved server-side BEFORE WhatsApp opens
      window.open(url, "_blank", "noopener");
      showDone(url);
    }

    function showBlocked() {
      panel.querySelector(".walw-form").remove();
      panel.querySelector(".walw-foot").remove();
      var done = el("div", "walw-done blocked");
      done.innerHTML =
        '<div class="ok"><svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#e0563f" stroke-width="2.4" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><path d="M12 8v5"/><circle cx="12" cy="16.5" r="0.2" fill="#e0563f" stroke="#e0563f"/></svg></div>' +
        "<h4>" + esc(cfg.disqualifyTitle || "We may not be the right fit") + "</h4>" +
        "<p>" + esc(cfg.disqualifyText ||
          "Thanks for your honesty. Based on your answers we're probably not the best match right now, so we won't take up your time.") + "</p>" +
        (cfg.disqualifyLink
          ? '<a class="alt" href="' + esc(cfg.disqualifyLink) + '" target="_blank" rel="noopener">' +
            esc(cfg.disqualifyLinkLabel || "See other options") + "</a>"
          : "");
      panel.appendChild(done);
      positionPanel();
    }

    function showDone(url) {
      panel.querySelector(".walw-form").remove();
      panel.querySelector(".walw-foot").remove();
      var done = el("div", "walw-done");
      done.innerHTML =
        '<div class="ok"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="' +
          accent + '" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg></div>' +
        "<h4>" + esc(cfg.doneTitle || "You're all set") + "</h4>" +
        "<p>" + esc(cfg.doneText || "WhatsApp is opening with your message ready. Didn't open? Tap below.") + "</p>" +
        '<a class="walw-submit" style="text-decoration:none" href="' + url + '" target="_blank" rel="noopener">' +
          WA_LOGO + " Open WhatsApp</a>";
      panel.appendChild(done);
      positionPanel();
    }

    var currentAnchor = null;

    // Place the panel so it pops out from the button that opened it.
    function positionPanel() {
      if (!panel) return;
      // mobile: dock as a bottom sheet, ignore the anchor
      if (window.innerWidth <= 460) {
        panel.classList.add("walw-mobile");
        return;
      }
      panel.classList.remove("walw-mobile");
      var pad = 12;
      var anchor = currentAnchor || fab;
      var r = anchor
        ? anchor.getBoundingClientRect()
        : { left: window.innerWidth - 80, right: window.innerWidth - 20, top: window.innerHeight - 80, bottom: window.innerHeight - 20, width: 60, height: 60 };
      var pw = panel.offsetWidth, ph = panel.offsetHeight;
      var vw = window.innerWidth, vh = window.innerHeight;

      // horizontal: align the panel's right edge with the button, keep on screen
      var left = r.right - pw;
      if (left < pad) left = r.left;
      if (left + pw > vw - pad) left = vw - pad - pw;
      if (left < pad) left = pad;

      // vertical: prefer above the button; flip below if there's no room
      var top, fromTop = false;
      if (r.top >= ph + pad + 10) {
        top = r.top - ph - 10;
      } else {
        top = r.bottom + 10; fromTop = true;
      }
      if (top + ph > vh - pad) top = vh - pad - ph;
      if (top < pad) top = pad;

      panel.style.left = left + "px";
      panel.style.top = top + "px";
      panel.classList.toggle("from-top", fromTop);

      // grow the panel out of the button: origin = the button's centre
      var cx = Math.max(left + 16, Math.min(r.left + r.width / 2, left + pw - 16));
      panel.style.transformOrigin = (cx - left) + "px " + (fromTop ? "0" : "100%");
    }

    function onReposition() { positionPanel(); }
    function onOutside(e) {
      if (!panel || panel.contains(e.target)) return;
      if (fab && fab.contains(e.target)) return;
      if (e.target.closest("[data-walw-open]" + (cfg.trigger ? "," + cfg.trigger : ""))) return;
      close();
    }

    function openPanel(anchor) {
      if (open) return;
      open = true;
      currentAnchor = anchor || null;
      if (fab) { var badge = fab.querySelector(".walw-badge"); if (badge) badge.remove(); }
      buildPanel();
      positionPanel();
      window.addEventListener("resize", onReposition);
      window.addEventListener("scroll", onReposition, true);
      setTimeout(function () { document.addEventListener("mousedown", onOutside, true); }, 0);
    }
    function close() {
      if (!panel) return;
      window.removeEventListener("resize", onReposition);
      window.removeEventListener("scroll", onReposition, true);
      document.removeEventListener("mousedown", onOutside, true);
      panel.classList.add("walw-closing");
      setTimeout(function () {
        if (panel) panel.remove();
        panel = null; open = false;
      }, 170);
    }

    if (cfg.autoOpen) setTimeout(function () { openPanel(fab); }, cfg.autoOpen === true ? 1200 : cfg.autoOpen);
  };

  global.WALeadWidget = WALeadWidget;
})(window);

# 🚀 Portfolio Engine

A single-page professional portfolio built with **Vanilla HTML5/JavaScript** and **Tailwind CSS**. No build step, no server required — just static files served by **GitHub Pages**. Content lives in plain JSON files you edit directly and commit.

---

## 🍴 Forked this repo? Start here.

This repo currently contains a real person's live portfolio data. If you forked it to make your own, **don't skip this step** — otherwise your site will show someone else's name, bio, certifications, and homelab until you overwrite every field by hand.

```bash
node setup-fork.cjs
```

This one command:
- Backs up the existing data files to a timestamped folder (nothing is lost)
- Resets `identity.json`, `case_studies.json`, `media_links.json`, `projects.json`, and `homelab.json` to blank templates
- Leaves `index.html` and everything else untouched

Run `node setup-fork.cjs --yes` to skip the confirmation prompt (useful in scripts/CI).

After that, fill in `identity.json` at minimum — it's the only file the site truly needs. Everything else (case studies, media links, projects, certifications, awards, homelab) is optional: **sections you leave empty simply don't render.** No placeholder text, no "coming soon" — they disappear.

---

## 🌐 Publishing with GitHub Pages

1. Push your fork to GitHub (or use it directly after forking).
2. In your repo, go to **Settings → Pages**.
3. Under "Build and deployment," set **Source** to "Deploy from a branch," choose the `main` branch and `/ (root)` folder.
4. Save. GitHub will publish your site at `https://<your-username>.github.io/<repo-name>/` within a minute or two.
5. Every time you edit a JSON file and push, GitHub Pages redeploys automatically — no build step needed.

That's it. There's no CMS, no server, no build pipeline required for the live site — `index.html` fetches the JSON files directly at runtime.

---

## 🎨 Visual System & Aesthetic Modes

This engine implements a **dual-axis design system** that separates **Wireframe Layouts** from **Aesthetic Styles**, set via `identity.json`:

### Wireframe Layouts
- **Executive**: High-density leadership impact — metrics, credentials, top-tier case studies.
- **Creative**: Storytelling-first, serif headers, staggered grids, editorial rhythm.
- **Builder**: Tech-forward monospace developer console styling.

### Aesthetic Styles
- **Minimal**: Clean white canvas, Inter typography, high contrast.
- **NexStudio**, **Editorial**, **Rugged**, **Natural**: Additional style variants (see `identity.json` for the full list).

> Note: this open-source build ships with the `executive` layout + `minimal` style enabled; other combinations remain in the codebase for a premium upgrade path. See the "FREE_LAYOUT" / "FREE_STYLE" constants near the top of `index.html`'s script if you want to unlock them for your own fork.

---

## 📁 Project Directory Structure

```
├── templates/                # Blank starter JSON used by setup-fork.cjs
├── setup-fork.cjs             # One-time reset script for new forks
├── identity.json              # Your name, bio, metrics, certifications, awards
├── case_studies.json          # STAR-format case studies
├── media_links.json           # Articles, talks, press
├── projects.json              # Side projects / OSS
├── homelab.json               # Optional homelab section (hidden if empty)
├── assets/avatar.jpg          # Your profile photo
├── index.html                 # Main page & rendering engine (vanilla JS) — this is the entire site
└── public/robots.txt
```

No `package.json`, build tools, or server are required — `index.html` is a self-contained static page that fetches the JSON files at runtime. GitHub Pages just needs to serve these files as-is.

---

## ✍️ Editing Your Content

All content is plain JSON under the repo root. Open in any editor, edit, save, commit, push — GitHub Pages picks it up automatically.

#### `identity.json`
```json
{
  "meta.layout": "executive",
  "meta.style": "minimal",
  "name": "Your Name",
  "title": "Your Title",
  "bio": "A couple sentences about you.",
  "avatar": "assets/avatar.jpg",
  "email": "you@example.com",
  "linkedin": "https://linkedin.com/in/you",
  "github": "https://github.com/you",
  "location": "City, State",
  "metric_1_label": "Systems Designed", "metric_1_val": "150+",
  "metric_2_label": "Uptime Maintained", "metric_2_val": "99.999%",
  "metric_3_label": "Infrastructure Savings", "metric_3_val": "$4.2M",
  "certifications": [
    { "name": "Your Certification", "issuer": "Issuing Org", "year": "2024", "url": "https://verify-link" }
  ],
  "awards": [
    { "name": "Award Name", "issuer": "Org", "year": "2024" }
  ],
  "story_title": "...", "story_text": "...",
  "anecdote_title": "...", "anecdote_text": "..."
}
```
Leave `certifications` or `awards` as empty arrays (`[]`) if you don't have any yet — that section won't render until you add entries.

#### `case_studies.json` / `media_links.json` / `projects.json`
Each is `{ "items": [...] }`. Leave `items` empty to hide that section.

#### `homelab.json`
Fully optional. Leave `"nodes": []` (the default in the template) and the whole homelab section stays hidden. Fill in `nodes` and `services` once you have real infrastructure to show off.

---

## 📈 Recruiter-Facing Features

- **Print-Friendly CSS**: printing or saving to PDF hides floating UI elements and adjusts margins for A4/Letter output.
- **Micro-Telemetry (optional)**: set `tracking_url` in `identity.json` to receive a lightweight beacon when recruiters click your resume/case studies/LinkedIn. Leave it blank to disable — recommended for forks unless you set up your own analytics endpoint.

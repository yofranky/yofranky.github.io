#!/usr/bin/env node
/**
 * setup-fork.cjs
 * ---------------------------------------------------------------
 * Run this ONCE right after forking this repo, before you start
 * customizing it. It replaces the sample/demo content (Franky's
 * real portfolio data) with blank templates so the site starts
 * empty for you — no leftover data from the original owner shows
 * up on your fork.
 *
 * Usage:
 *   node setup-fork.cjs          (interactive, asks before overwriting)
 *   node setup-fork.cjs --yes    (skips confirmation, for CI/scripts)
 *
 * Safe by design:
 *   - Makes a timestamped backup of your current JSON files under
 *     ./backup-before-fork-setup/ before touching anything.
 *   - Only touches the 5 data files below. Never touches index.html,
 *     avatar.jpg, or anything else.
 * ---------------------------------------------------------------
 */
const fs = require('fs');
const path = require('path');
const readline = require('readline');

const ROOT = __dirname;
const FILES = [
  'identity.json',
  'case_studies.json',
  'media_links.json',
  'projects.json',
  'homelab.json',
];

const skipConfirm = process.argv.includes('--yes');

function backupExisting() {
  const stamp = new Date().toISOString().replace(/[:.]/g, '-');
  const backupDir = path.join(ROOT, `backup-before-fork-setup-${stamp}`);
  fs.mkdirSync(backupDir, { recursive: true });
  FILES.forEach((f) => {
    const src = path.join(ROOT, f);
    if (fs.existsSync(src)) {
      fs.copyFileSync(src, path.join(backupDir, f));
    }
  });
  return backupDir;
}

function applyTemplates() {
  FILES.forEach((f) => {
    const templatePath = path.join(ROOT, 'templates', f.replace('.json', '.template.json'));
    const destPath = path.join(ROOT, f);
    if (!fs.existsSync(templatePath)) {
      console.warn(`  ! No template found for ${f}, skipping.`);
      return;
    }
    fs.copyFileSync(templatePath, destPath);
    console.log(`  ✓ Reset ${f}`);
  });
}

function run() {
  console.log('This will replace identity.json, case_studies.json, media_links.json,');
  console.log('projects.json, and homelab.json with blank starter templates.');
  console.log('Your current versions will be backed up first.\n');

  if (skipConfirm) {
    doIt();
    return;
  }

  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  rl.question('Continue? (y/N): ', (answer) => {
    rl.close();
    if (answer.trim().toLowerCase() === 'y') {
      doIt();
    } else {
      console.log('Cancelled. No files were changed.');
    }
  });
}

function doIt() {
  const backupDir = backupExisting();
  console.log(`Backed up existing data to: ${path.relative(ROOT, backupDir)}\n`);
  applyTemplates();
  console.log('\nDone! Your site now starts blank.');
  console.log('Next steps:');
  console.log('  1. Edit identity.json with your name, bio, and links (required — the site needs this one).');
  console.log('  2. Add entries to case_studies.json / media_links.json / projects.json as you have them.');
  console.log('  3. Optionally fill in homelab.json — leave "nodes": [] if you don\'t have a home lab, and that section stays hidden automatically.');
  console.log('  4. Run the site locally (see README) to preview.');
}

run();

---
title: "Branding assets (placeholder)"
description: "Placeholder for favicon, touch icon, and logo. Final art is tracked as WI-07."
nav_exclude: true
---

## Status

This directory is a placeholder. The final favicon, Apple touch icon, and workshop logo are tracked as work item **WI-07** in the implementation plan and will land in a follow-up phase.

## Required files

The site head (`_includes/head_custom.html`) and homepage references expect these files. Drop binaries with these exact names into this directory:

* `favicon.ico` — 16×16 + 32×32 multi-resolution ICO. Wired into `<link rel="icon" type="image/x-icon">`.
* `favicon-32x32.png` — 32×32 PNG. Wired into `<link rel="icon" type="image/png">`.
* `apple-touch-icon.png` — 180×180 PNG. Wired into `<link rel="apple-touch-icon">`.
* `logo-128.png` — 128×128 PNG. Referenced inline from `index.md` and `fr/index.md` via centered `<img>` tag (Phase 2).

## Build impact while empty

GitHub Pages and `bundle exec jekyll build` complete successfully with these files missing. Browsers show three `404` entries in the console for the icon links and no favicon in the tab, but the site renders correctly.

## Removal

Once WI-07 ships the final art, delete `.gitkeep` and this README so the directory contains only the four image binaries.

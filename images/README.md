---
title: Images directory
description: Internal note on the placeholder state of images shipped with this workshop. Not part of the published workshop navigation.
nav_exclude: true
---

## Overview

This folder holds the static image assets the workshop labs reference. The lab markdown uses paths of the form `../images/lab-NN/lab-NN-<descriptor>.png`. The screenshots themselves are produced by the Phase 3 screenshot harness (see [`CONTRIBUTING.md`](../CONTRIBUTING.md)) and committed into the `lab-NN/` subfolders.

## Placeholder state

Phase 2 (English content authoring) created the directory structure (eleven `lab-NN/` subfolders with `.gitkeep` markers) and the Mermaid source for the architecture diagram. The following assets are intentionally **not yet present**:

* `architecture-diagram.png` — the rendered Mermaid diagram. Source lives at [`architecture-diagram.mmd`](architecture-diagram.mmd); see the regeneration commands in the comment header of that file. Tracked as **WI-07** in the planning log.
* `lab-NN/lab-NN-<descriptor>.png` files — produced by `npm run screenshots` (Phase 3 harness) and `npm run screenshots:promote`.

The lab markdown intentionally references these paths today so the labs render with broken-image placeholders until the harness produces the real assets. This is the documented sibling-repo pattern: image references are stable; the asset capture follows on a separate cadence.

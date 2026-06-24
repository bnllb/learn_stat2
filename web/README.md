# learn_stat2 web

A lightweight TypeScript / React visualization app for the `learn_stat2` statistics knowledge graph.

## What it shows

- Knowledge nodes from `../data/nodes.json`
- Upstream / downstream dependencies from `../data/edges.json`
- Plan links from `../data/plans.json`
- Node attributes:
  - module
  - importance
  - mastery
  - eval relevance
  - status
  - tags
  - note path

## Run locally

```bash
cd web
npm install
npm run dev
```

Then open the local Vite URL.

## Build

```bash
cd web
npm run build
npm run preview
```

## Design direction

This MVP intentionally uses a polished dark UI:

- glassmorphism cards
- smooth hover / selection states
- draggable graph nodes
- pan / zoom / minimap / controls
- side detail panel
- module filters
- Eval-core toggle

## Data-first principle

The app is only a visualization layer.

The durable source of truth remains:

```text
../data/nodes.json
../data/edges.json
../data/plans.json
../topic_notes/*.md
../paper_reading/*.md
```

This keeps the project Git-native and easy to extend later with CLI or GitHub-backed editing.

## Next improvements

- Add study log timeline.
- Add paper-to-node mapping page.
- Add node status update workflow.
- Add GitHub Pages deployment.
- Add command-line helpers for changing mastery/status.

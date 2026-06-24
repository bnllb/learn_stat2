# learn_stat2 web

A lightweight TypeScript / React visualization app for the `learn_stat2` statistics knowledge graph.

## Pages

- **Knowledge Graph**: interactive graph of statistics nodes and dependency edges.
- **Study Log**: timeline of learning logs, touched nodes, artifacts, questions, and mastery updates.
- **Paper Map**: maps evaluation papers to statistics nodes and highlights missing knowledge.

## What it reads

- Knowledge nodes from `../data/nodes.json`
- Upstream / downstream dependencies from `../data/edges.json`
- Plan links from `../data/plans.json`
- Study logs from `../data/study_logs.json`
- Paper mappings from `../data/paper_mappings.json`

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

## Deploy

GitHub Pages deployment is handled by:

```text
../.github/workflows/deploy-pages.yml
```

It builds `web/` and publishes `web/dist`.

## Design direction

This MVP intentionally uses a polished dark UI:

- glassmorphism cards
- smooth hover / selection states
- draggable graph nodes
- pan / zoom / minimap / controls
- side detail panel
- module filters
- Eval-core toggle
- timeline cards
- paper-to-node mapping cards

## Data-first principle

The app is only a visualization layer.

The durable source of truth remains:

```text
../data/nodes.json
../data/edges.json
../data/plans.json
../data/study_logs.json
../data/paper_mappings.json
../topic_notes/*.md
../paper_reading/*.md
```

This keeps the project Git-native and easy to extend later with CLI or GitHub-backed editing.

## Next improvements

- Add GitHub-backed editing in the browser.
- Add full paper scan report pages.
- Add topic note markdown rendering.
- Add graph layout presets.
- Add search by work problem.

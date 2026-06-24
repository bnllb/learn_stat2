# learn_stat2

A personal statistics learning system focused on LLM / RL / Agent Evaluation.

This repository combines:

- Markdown notes
- structured knowledge graph data
- study logs
- paper-to-statistics mappings
- an interactive TypeScript web app
- maintenance CLI scripts

## Repository structure

```text
.
├── data/
│   ├── nodes.json              # statistics knowledge nodes
│   ├── edges.json              # prerequisite / related / used_by graph edges
│   ├── plans.json              # structured learning plan
│   ├── study_logs.json         # learning timeline
│   └── paper_mappings.json     # eval papers mapped to stat nodes
├── docs/
│   ├── stat_knowledge_map_v0.1.md
│   └── learning_plan_v0.1.md
├── paper_reading/
├── skills/
├── tools/
│   └── update-node.ts          # CLI for updating node status / mastery
└── web/                        # Vite + React + TypeScript visualization app
```

## Run the website locally

```bash
cd web
npm install
npm run dev
```

Or from repo root:

```bash
npm install
npm run web:dev
```

## Build the website

```bash
npm run web:build
```

## GitHub Pages deployment

The workflow is defined in:

```text
.github/workflows/deploy-pages.yml
```

It builds `web/` and deploys `web/dist` to GitHub Pages on pushes to `main` that touch `web/**`, `data/**`, or the workflow file.

If Pages is not enabled yet, set GitHub repository settings:

```text
Settings → Pages → Build and deployment → Source: GitHub Actions
```

## Update a knowledge node

Install root dependencies once:

```bash
npm install
```

Examples:

```bash
npm run update-node -- confidence_interval --mastery 2 --status understood --log "Finished CI intuition"
```

```bash
npm run update-node -- pass_at_k --mastery 3 --status derived --artifact topic_notes/pass_at_k.md --question "Bootstrap CI for pass@k still unclear"
```

Dry run:

```bash
npm run update-node -- confidence_interval --mastery 3 --dry-run
```

## Data-first principle

The durable source of truth is the JSON / Markdown data in this repo. The website is a visualization layer.

This keeps the project Git-native and makes it easy to add automation later, such as:

- alphaXiv MCP paper scans
- node status updates
- paper-to-node mapping reports
- topic note generation

import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

type Mastery = 0 | 1 | 2 | 3 | 4;
type Status = "unvisited" | "skimmed" | "understood" | "derived" | "applied";

type StatNode = {
  id: string;
  title: string;
  module: string;
  importance: 1 | 2 | 3 | 4 | 5;
  mastery: Mastery;
  evalRelevance: 1 | 2 | 3 | 4 | 5;
  status: Status;
  tags: string[];
  relatedWorkProblems: string[];
  notePath?: string;
  summary: string;
  createdAt: string;
  updatedAt: string;
};

type StudyLog = {
  id: string;
  date: string;
  nodeIds: string[];
  planRef?: string;
  durationMinutes?: number;
  summary: string;
  remainingQuestions: string[];
  artifacts: string[];
  masteryUpdates: Array<{ nodeId: string; before: Mastery; after: Mastery }>;
};

type ParsedArgs = {
  nodeId?: string;
  mastery?: Mastery;
  status?: Status;
  importance?: 1 | 2 | 3 | 4 | 5;
  evalRelevance?: 1 | 2 | 3 | 4 | 5;
  summary?: string;
  notePath?: string;
  addTags: string[];
  removeTags: string[];
  log?: string;
  minutes?: number;
  planRef?: string;
  artifact: string[];
  question: string[];
  dryRun: boolean;
};

const validStatuses = new Set<Status>(["unvisited", "skimmed", "understood", "derived", "applied"]);

function usage(): never {
  console.log(`
Usage:
  npm run update-node -- <node-id> [options]

Options:
  --mastery <0-4>          Set mastery level
  --status <status>        unvisited | skimmed | understood | derived | applied
  --importance <1-5>       Set importance
  --eval <1-5>             Set Eval relevance
  --summary <text>         Replace node summary
  --note <path>            Set notePath
  --tag <tag>              Add tag; can repeat
  --remove-tag <tag>       Remove tag; can repeat
  --log <summary>          Append a study log entry
  --minutes <n>            Study duration for log
  --plan <plan-id>         Link log to plan id
  --artifact <path>        Add artifact to log; can repeat
  --question <text>        Add remaining question to log; can repeat
  --dry-run                Print changes without writing

Examples:
  npm run update-node -- confidence_interval --mastery 2 --status understood --log "Finished CI intuition"
  npm run update-node -- pass_at_k --mastery 3 --status derived --artifact topic_notes/pass_at_k.md
`);
  process.exit(1);
}

function assertIntRange(value: string, min: number, max: number, name: string) {
  const parsed = Number(value);
  if (!Number.isInteger(parsed) || parsed < min || parsed > max) {
    throw new Error(`${name} must be an integer in [${min}, ${max}], got: ${value}`);
  }
  return parsed;
}

function parseArgs(argv: string[]): ParsedArgs {
  const [nodeId, ...rest] = argv;
  if (!nodeId || nodeId === "--help" || nodeId === "-h") usage();

  const args: ParsedArgs = {
    nodeId,
    addTags: [],
    removeTags: [],
    artifact: [],
    question: [],
    dryRun: false,
  };

  for (let i = 0; i < rest.length; i += 1) {
    const key = rest[i];
    const next = () => {
      const value = rest[++i];
      if (!value) throw new Error(`Missing value for ${key}`);
      return value;
    };

    switch (key) {
      case "--mastery":
        args.mastery = assertIntRange(next(), 0, 4, "mastery") as Mastery;
        break;
      case "--status": {
        const status = next() as Status;
        if (!validStatuses.has(status)) throw new Error(`Invalid status: ${status}`);
        args.status = status;
        break;
      }
      case "--importance":
        args.importance = assertIntRange(next(), 1, 5, "importance") as 1 | 2 | 3 | 4 | 5;
        break;
      case "--eval":
        args.evalRelevance = assertIntRange(next(), 1, 5, "eval") as 1 | 2 | 3 | 4 | 5;
        break;
      case "--summary":
        args.summary = next();
        break;
      case "--note":
        args.notePath = next();
        break;
      case "--tag":
        args.addTags.push(next());
        break;
      case "--remove-tag":
        args.removeTags.push(next());
        break;
      case "--log":
        args.log = next();
        break;
      case "--minutes":
        args.minutes = assertIntRange(next(), 0, 100000, "minutes");
        break;
      case "--plan":
        args.planRef = next();
        break;
      case "--artifact":
        args.artifact.push(next());
        break;
      case "--question":
        args.question.push(next());
        break;
      case "--dry-run":
        args.dryRun = true;
        break;
      default:
        throw new Error(`Unknown option: ${key}`);
    }
  }

  return args;
}

function readJson<T>(path: string): T {
  if (!existsSync(path)) throw new Error(`File not found: ${path}`);
  return JSON.parse(readFileSync(path, "utf8")) as T;
}

function writeJson(path: string, value: unknown) {
  writeFileSync(path, `${JSON.stringify(value, null, 2)}\n`, "utf8");
}

function today() {
  return new Date().toISOString().slice(0, 10);
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  const root = process.cwd();
  const nodesPath = resolve(root, "data/nodes.json");
  const logsPath = resolve(root, "data/study_logs.json");

  const nodes = readJson<StatNode[]>(nodesPath);
  const node = nodes.find((item) => item.id === args.nodeId);
  if (!node) {
    const similar = nodes.filter((item) => item.id.includes(args.nodeId ?? "") || item.title.toLowerCase().includes((args.nodeId ?? "").toLowerCase()));
    throw new Error(`Node not found: ${args.nodeId}${similar.length ? `\nSimilar nodes: ${similar.map((item) => item.id).join(", ")}` : ""}`);
  }

  const beforeMastery = node.mastery;

  if (args.mastery !== undefined) node.mastery = args.mastery;
  if (args.status !== undefined) node.status = args.status;
  if (args.importance !== undefined) node.importance = args.importance;
  if (args.evalRelevance !== undefined) node.evalRelevance = args.evalRelevance;
  if (args.summary !== undefined) node.summary = args.summary;
  if (args.notePath !== undefined) node.notePath = args.notePath;

  for (const tag of args.addTags) {
    if (!node.tags.includes(tag)) node.tags.push(tag);
  }
  if (args.removeTags.length > 0) {
    node.tags = node.tags.filter((tag) => !args.removeTags.includes(tag));
  }

  node.updatedAt = today();

  let logs: StudyLog[] | undefined;
  if (args.log) {
    logs = readJson<StudyLog[]>(logsPath);
    logs.push({
      id: `log-${today()}-${node.id}`,
      date: today(),
      nodeIds: [node.id],
      planRef: args.planRef,
      durationMinutes: args.minutes,
      summary: args.log,
      remainingQuestions: args.question,
      artifacts: args.artifact,
      masteryUpdates: beforeMastery === node.mastery ? [] : [{ nodeId: node.id, before: beforeMastery, after: node.mastery }],
    });
  }

  const preview = {
    node,
    logAppended: Boolean(args.log),
    dryRun: args.dryRun,
  };

  if (args.dryRun) {
    console.log(JSON.stringify(preview, null, 2));
    return;
  }

  writeJson(nodesPath, nodes);
  if (logs) writeJson(logsPath, logs);
  console.log(`Updated ${node.id}: mastery=${node.mastery}, status=${node.status}`);
  if (args.log) console.log("Appended study log entry.");
}

try {
  main();
} catch (error) {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
}

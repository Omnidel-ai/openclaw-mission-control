/**
 * Seed demo data so a fresh install has something to look at.
 * Run once with `npm run seed:demo`. Safe to re-run (upserts by id).
 */
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const AGENTS = [
  {
    id: "content-writer",
    name: "Content Writer",
    emoji: "✍️",
    role: "Content",
    status: "working",
    tasksCompleted: 42,
    totalCost: 3.14,
    currentTask: "Drafting 3 tweets about agent workflows",
  },
  {
    id: "research-analyst",
    name: "Research Analyst",
    emoji: "🔎",
    role: "Research",
    status: "idle",
    tasksCompleted: 18,
    totalCost: 1.08,
    currentTask: null,
  },
  {
    id: "growth-scout",
    name: "Growth Scout",
    emoji: "📈",
    role: "Growth",
    status: "online",
    tasksCompleted: 9,
    totalCost: 0.44,
    currentTask: "Scanning for trending topics in your niche",
  },
  {
    id: "inbox-triage",
    name: "Inbox Triage",
    emoji: "📬",
    role: "Ops",
    status: "offline",
    tasksCompleted: 7,
    totalCost: 0.12,
    currentTask: null,
  },
];

const MISSIONS = [
  { agentId: "content-writer", title: "Write teardown of agent stack", status: "active", priority: "high" },
  { agentId: "research-analyst", title: "Pull top 10 videos on AI agents", status: "pending", priority: "medium" },
  { agentId: "growth-scout", title: "Competitor scan: LLM wrapper startups", status: "pending", priority: "low" },
];

const IDEAS = [
  {
    title: "AI agents that audit your inbox for unanswered customer DMs",
    description: "Automated triage + suggested replies in your voice",
    source: "inbox-triage",
    status: "pending",
  },
  {
    title: "Mission Control teardown video (this repo)",
    description: "Show how one dashboard unifies every agent you run",
    source: "growth-scout",
    status: "pending",
  },
  {
    title: "Weekly 'agent standup' digest",
    description: "Every agent reports top 3 accomplishments, blockers, asks",
    source: "content-writer",
    status: "pending",
  },
];

async function main() {
  console.log("Seeding demo data...");

  for (const a of AGENTS) {
    await prisma.agentState.upsert({
      where: { id: a.id },
      create: { ...a, lastActive: new Date() },
      update: { ...a, lastActive: new Date() },
    });
  }
  console.log(`  ${AGENTS.length} agents`);

  const existingMissions = await prisma.mission.count();
  if (existingMissions === 0) {
    for (const m of MISSIONS) {
      await prisma.mission.create({ data: { ...m, description: m.title } });
    }
    console.log(`  ${MISSIONS.length} missions`);
  } else {
    console.log(`  missions: already have ${existingMissions}, skipping`);
  }

  const existingIdeas = await prisma.idea.count();
  if (existingIdeas === 0) {
    for (const i of IDEAS) {
      await prisma.idea.create({ data: i });
    }
    console.log(`  ${IDEAS.length} ideas`);
  } else {
    console.log(`  ideas: already have ${existingIdeas}, skipping`);
  }

  console.log("Done. Open http://localhost:3000 to see the dashboard.");
}

main()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });

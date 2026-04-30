/**
 * Seed OmniDEL / KarmYog / RARE India agents into Mission Control.
 * 9 operational agents as of 2026-04-30.
 * Run: npm run seed:demo
 */
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const AGENTS = [
  {
    id: "maya-wa",
    name: "Maya",
    emoji: "\u{1F4E7}",
    role: "HR & Ops (WhatsApp)",
    status: "offline",
    tasksCompleted: 0,
    totalCost: 0,
    currentTask: null,
  },
  {
    id: "maya-tg",
    name: "Maya",
    emoji: "\u{1F4E7}",
    role: "HR & Ops (Telegram)",
    status: "offline",
    tasksCompleted: 0,
    totalCost: 0,
    currentTask: null,
  },
  {
    id: "sparrow",
    name: "Sparrow",
    emoji: "\u{1F426}",
    role: "EA Shobhana (WhatsApp)",
    status: "offline",
    tasksCompleted: 0,
    totalCost: 0,
    currentTask: null,
  },
  {
    id: "sakhi",
    name: "Sakhi",
    emoji: "\u{1F64F}",
    role: "RARE Ops & Sales (WhatsApp)",
    status: "offline",
    tasksCompleted: 0,
    totalCost: 0,
    currentTask: null,
  },
  {
    id: "kanchan",
    name: "Kanchan",
    emoji: "\u{1F4DD}",
    role: "Business Dev (Telegram)",
    status: "offline",
    tasksCompleted: 0,
    totalCost: 0,
    currentTask: null,
  },
  {
    id: "anto",
    name: "Anto",
    emoji: "\u{1F9E0}",
    role: "Knowledge Agent (Telegram)",
    status: "offline",
    tasksCompleted: 0,
    totalCost: 0,
    currentTask: null,
  },
  {
    id: "pannadi",
    name: "Panna Di",
    emoji: "\u{1F3EA}",
    role: "KarmYog Ops (WhatsApp)",
    status: "offline",
    tasksCompleted: 0,
    totalCost: 0,
    currentTask: null,
  },
  {
    id: "bridges-aarti",
    name: "Aarti",
    emoji: "\u{1F309}",
    role: "Bridges Event (WhatsApp)",
    status: "offline",
    tasksCompleted: 0,
    totalCost: 0,
    currentTask: null,
  },
  {
    id: "bubun",
    name: "Bubun",
    emoji: "\u{1F4AC}",
    role: "Team Comms (WhatsApp)",
    status: "offline",
    tasksCompleted: 0,
    totalCost: 0,
    currentTask: null,
  },
];

async function main() {
  console.log("Seeding OmniDEL Mission Control...");

  for (const a of AGENTS) {
    await prisma.agentState.upsert({
      where: { id: a.id },
      create: { ...a, lastActive: new Date() },
      update: { ...a, lastActive: new Date() },
    });
  }
  console.log(`  ${AGENTS.length} agents seeded`);
  console.log("Done. Open http://localhost:3000 to see the dashboard.");
}

main()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });

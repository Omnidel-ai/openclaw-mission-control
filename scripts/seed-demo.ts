/**
 * Seed OmniDEL / KarmYog / RARE India agents into Mission Control.
 * Top 11 by activity as of 2026-04-30.
 * Run: npm run seed:demo
 */
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const AGENTS = [
  {
    id: "maya",
    name: "Maya",
    emoji: "📧",
    role: "HR & Ops",
    status: "online",
    tasksCompleted: 0,
    totalCost: 0,
    currentTask: null,
  },
  {
    id: "sparrow",
    name: "Sparrow",
    emoji: "🐦",
    role: "EA (Shobhana)",
    status: "online",
    tasksCompleted: 0,
    totalCost: 0,
    currentTask: null,
  },
  {
    id: "bubun",
    name: "Bubun",
    emoji: "💬",
    role: "Team Comms",
    status: "online",
    tasksCompleted: 0,
    totalCost: 0,
    currentTask: null,
  },
  {
    id: "pannadi",
    name: "Panna Di",
    emoji: "🏪",
    role: "KarmYog Ops",
    status: "online",
    tasksCompleted: 0,
    totalCost: 0,
    currentTask: null,
  },
  {
    id: "bridges-aarti",
    name: "Aarti",
    emoji: "🌉",
    role: "Bridges Event",
    status: "idle",
    tasksCompleted: 0,
    totalCost: 0,
    currentTask: null,
  },
  {
    id: "rare-snow-leopard",
    name: "Dorje",
    emoji: "🐆",
    role: "Snow Leopard Lodge",
    status: "idle",
    tasksCompleted: 0,
    totalCost: 0,
    currentTask: null,
  },
  {
    id: "rare-sitla",
    name: "Ravi",
    emoji: "🌿",
    role: "Sitla Estate",
    status: "idle",
    tasksCompleted: 0,
    totalCost: 0,
    currentTask: null,
  },
  {
    id: "rare-sat",
    name: "SAT Concierge",
    emoji: "🏨",
    role: "SAT Hotel",
    status: "idle",
    tasksCompleted: 0,
    totalCost: 0,
    currentTask: null,
  },
  {
    id: "rare-bookrare",
    name: "BookRare",
    emoji: "📖",
    role: "RARE Bookings",
    status: "idle",
    tasksCompleted: 0,
    totalCost: 0,
    currentTask: null,
  },
  {
    id: "rare-lali",
    name: "Lali Concierge",
    emoji: "🌺",
    role: "Lali Hotel",
    status: "idle",
    tasksCompleted: 0,
    totalCost: 0,
    currentTask: null,
  },
  {
    id: "anto",
    name: "Anto",
    emoji: "🧠",
    role: "Knowledge Agent",
    status: "idle",
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

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const AGENTS = [
  { id: "maya", name: "Maya", emoji: "\u{1F4E7}", role: "HR & Ops (WhatsApp + Telegram)", status: "offline", tasksCompleted: 0, totalCost: 0, costToday: 0, costWeek: 0, costMonth: 0, currentTask: null },
  { id: "sparrow", name: "Sparrow", emoji: "\u{1F426}", role: "EA Shobhana (WhatsApp)", status: "offline", tasksCompleted: 0, totalCost: 0, costToday: 0, costWeek: 0, costMonth: 0, currentTask: null },
  { id: "sakhi", name: "Sakhi", emoji: "\u{1F64F}", role: "RARE Ops & Sales (WhatsApp)", status: "offline", tasksCompleted: 0, totalCost: 0, costToday: 0, costWeek: 0, costMonth: 0, currentTask: null },
  { id: "kanchan", name: "Kanchan", emoji: "\u{1F4DD}", role: "Business Dev (Telegram)", status: "offline", tasksCompleted: 0, totalCost: 0, costToday: 0, costWeek: 0, costMonth: 0, currentTask: null },
  { id: "anto", name: "Anto", emoji: "\u{1F9E0}", role: "Knowledge Agent (Telegram)", status: "offline", tasksCompleted: 0, totalCost: 0, costToday: 0, costWeek: 0, costMonth: 0, currentTask: null },
  { id: "pannadi", name: "Panna Di", emoji: "\u{1F3EA}", role: "KarmYog Ops (WhatsApp)", status: "offline", tasksCompleted: 0, totalCost: 0, costToday: 0, costWeek: 0, costMonth: 0, currentTask: null },
  { id: "bridges-aarti", name: "Aarti", emoji: "\u{1F309}", role: "Bridges Event (WhatsApp)", status: "offline", tasksCompleted: 0, totalCost: 0, costToday: 0, costWeek: 0, costMonth: 0, currentTask: null },
  { id: "bubun", name: "Bubun", emoji: "\u{1F4AC}", role: "Team Comms (WhatsApp)", status: "offline", tasksCompleted: 0, totalCost: 0, costToday: 0, costWeek: 0, costMonth: 0, currentTask: null },
];

async function main() {
  console.log("Seeding OmniDEL Mission Control...");
  // Delete old agents not in our list
  const validIds = AGENTS.map(a => a.id);
  await prisma.agentState.deleteMany({ where: { id: { notIn: validIds } } });
  for (const a of AGENTS) {
    await prisma.agentState.upsert({
      where: { id: a.id },
      create: { ...a, lastActive: new Date() },
      update: { ...a, lastActive: new Date() },
    });
  }
  console.log("  " + AGENTS.length + " agents seeded (old records cleaned)");
}

main().then(() => process.exit(0)).catch((e) => { console.error(e); process.exit(1); });

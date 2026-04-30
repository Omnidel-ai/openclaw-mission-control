const fs = require('fs');
const path = require('path');

const base = process.argv[2];

// ---- Fix page.tsx ----
const pagePath = path.join(base, 'src', 'app', 'page.tsx');
let page = fs.readFileSync(pagePath, 'utf8');

// Change 6: Replace Tasks completed KPI with Cost today KPI
page = page.replace(
  `<Kpi icon={<Activity className="w-4 h-4" />} label="Tasks completed" value={s.totalTasks.toLocaleString()} />`,
  '<Kpi icon={<Activity className="w-4 h-4" />} label="Cost today" value={`$${s.agents.reduce((sum: number, a: any) => sum + ((a as any).costToday || 0), 0).toFixed(2)}`} />'
);

// Change 4: Replace simple cost display with cost breakdown
page = page.replace(
  `<div>\${(a.totalCost || 0).toFixed(2)}</div>`,
  `<div className="text-[11px] space-y-0.5">
                <div>Today: \${((a as any).costToday || 0).toFixed(2)}</div>
                <div>7d: \${((a as any).costWeek || 0).toFixed(2)}</div>
                <div>30d: \${((a as any).costMonth || 0).toFixed(2)}</div>
              </div>`
);

// Also remove unused Link import since "View all" link was removed
page = page.replace('import Link from "next/link";\n', '');

fs.writeFileSync(pagePath, page);
console.log('page.tsx updated');

// ---- Fix agents/page.tsx ----
const agentsPath = path.join(base, 'src', 'app', 'agents', 'page.tsx');
let agents = fs.readFileSync(agentsPath, 'utf8');

// Replace the cost cell in agents table
agents = agents.replace(
  `<td className="p-3 text-right">\${a.totalCost.toFixed(2)}</td>`,
  `<td className="p-3 text-right text-[11px]">
                  <div>Today: \${((a as any).costToday || 0).toFixed(2)}</div>
                  <div>7d: \${((a as any).costWeek || 0).toFixed(2)}</div>
                  <div>30d: \${((a as any).costMonth || 0).toFixed(2)}</div>
                </td>`
);

fs.writeFileSync(agentsPath, agents);
console.log('agents/page.tsx updated');

// ---- Fix API route ----
const routePath = path.join(base, 'src', 'app', 'api', 'agents', 'state', 'route.ts');
let route = fs.readFileSync(routePath, 'utf8');

// Add costToday, costWeek, costMonth to destructuring
route = route.replace(
  `    totalCost,
    currentTask,`,
  `    totalCost,
    costToday,
    costWeek,
    costMonth,
    currentTask,`
);

// Add to create block
route = route.replace(
  `      totalCost: Number.isFinite(totalCost) ? Number(totalCost) : 0,
      currentTask: currentTask ? String(currentTask) : null,`,
  `      totalCost: Number.isFinite(totalCost) ? Number(totalCost) : 0,
      costToday: Number.isFinite(costToday) ? Number(costToday) : 0,
      costWeek: Number.isFinite(costWeek) ? Number(costWeek) : 0,
      costMonth: Number.isFinite(costMonth) ? Number(costMonth) : 0,
      currentTask: currentTask ? String(currentTask) : null,`
);

// Add to update block
route = route.replace(
  `      ...(Number.isFinite(totalCost) && { totalCost: Number(totalCost) }),
      ...(currentTask !== undefined && { currentTask: currentTask ? String(currentTask) : null }),`,
  `      ...(Number.isFinite(totalCost) && { totalCost: Number(totalCost) }),
      ...(Number.isFinite(costToday) && { costToday: Number(costToday) }),
      ...(Number.isFinite(costWeek) && { costWeek: Number(costWeek) }),
      ...(Number.isFinite(costMonth) && { costMonth: Number(costMonth) }),
      ...(currentTask !== undefined && { currentTask: currentTask ? String(currentTask) : null }),`
);

fs.writeFileSync(routePath, route);
console.log('API route updated');

// ---- Fix seed file ----
const seedPath = path.join(base, 'scripts', 'seed-demo.ts');
let seed = fs.readFileSync(seedPath, 'utf8');

// Replace the entire AGENTS array with the corrected one
const newAgents = `const AGENTS = [
  {
    id: "maya",
    name: "Maya",
    emoji: "\u{1F4E7}",
    role: "HR & Ops (WhatsApp + Telegram)",
    status: "offline",
    tasksCompleted: 0,
    totalCost: 0,
    costToday: 0,
    costWeek: 0,
    costMonth: 0,
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
    costToday: 0,
    costWeek: 0,
    costMonth: 0,
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
    costToday: 0,
    costWeek: 0,
    costMonth: 0,
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
    costToday: 0,
    costWeek: 0,
    costMonth: 0,
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
    costToday: 0,
    costWeek: 0,
    costMonth: 0,
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
    costToday: 0,
    costWeek: 0,
    costMonth: 0,
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
    costToday: 0,
    costWeek: 0,
    costMonth: 0,
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
    costToday: 0,
    costWeek: 0,
    costMonth: 0,
    currentTask: null,
  },
];`;

// Replace from "const AGENTS = [" to the closing "];"
seed = seed.replace(/const AGENTS = \[[\s\S]*?\];/, newAgents);

// Update the comment at the top
seed = seed.replace(
  ' * 9 operational agents as of 2026-04-30.',
  ' * 8 operational agents as of 2026-04-30.'
);

fs.writeFileSync(seedPath, seed);
console.log('Seed file updated');

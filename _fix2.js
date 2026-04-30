const fs = require('fs');
const path = require('path');

const base = process.argv[2];

// ---- Fix API route ----
const routePath = path.join(base, 'src', 'app', 'api', 'agents', 'state', 'route.ts');
let route = fs.readFileSync(routePath, 'utf8');

// Detect line ending
const eol = route.includes('\r\n') ? '\r\n' : '\n';

// Add costToday, costWeek, costMonth to destructuring
route = route.replace(
  `    totalCost,${eol}    currentTask,`,
  `    totalCost,${eol}    costToday,${eol}    costWeek,${eol}    costMonth,${eol}    currentTask,`
);

// Add to create block
route = route.replace(
  `      totalCost: Number.isFinite(totalCost) ? Number(totalCost) : 0,${eol}      currentTask: currentTask ? String(currentTask) : null,`,
  `      totalCost: Number.isFinite(totalCost) ? Number(totalCost) : 0,${eol}      costToday: Number.isFinite(costToday) ? Number(costToday) : 0,${eol}      costWeek: Number.isFinite(costWeek) ? Number(costWeek) : 0,${eol}      costMonth: Number.isFinite(costMonth) ? Number(costMonth) : 0,${eol}      currentTask: currentTask ? String(currentTask) : null,`
);

// Add to update block
route = route.replace(
  `      ...(Number.isFinite(totalCost) && { totalCost: Number(totalCost) }),${eol}      ...(currentTask !== undefined && { currentTask: currentTask ? String(currentTask) : null }),`,
  `      ...(Number.isFinite(totalCost) && { totalCost: Number(totalCost) }),${eol}      ...(Number.isFinite(costToday) && { costToday: Number(costToday) }),${eol}      ...(Number.isFinite(costWeek) && { costWeek: Number(costWeek) }),${eol}      ...(Number.isFinite(costMonth) && { costMonth: Number(costMonth) }),${eol}      ...(currentTask !== undefined && { currentTask: currentTask ? String(currentTask) : null }),`
);

fs.writeFileSync(routePath, route);
console.log('API route updated');

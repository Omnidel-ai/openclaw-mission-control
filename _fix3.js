const fs = require('fs');
const path = require('path');
const base = process.argv[2];
const pagePath = path.join(base, 'src', 'app', 'page.tsx');
let page = fs.readFileSync(pagePath, 'utf8');

// Fix: add literal $ before the template expression in the Cost today KPI
// Current: value={`${s.agents.reduce...`}
// Target:  value={`$${s.agents.reduce...`}
page = page.replace(
  'label="Cost today" value={`${s.agents.reduce',
  'label="Cost today" value={`$${s.agents.reduce'
);

fs.writeFileSync(pagePath, page);
console.log('KPI dollar sign fixed');

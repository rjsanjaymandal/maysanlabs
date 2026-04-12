import fs from 'fs';
import path from 'path';

const pagesToRefactor = [
  'src/app/engineering',
  'src/app/architecture',
  'src/app/careers',
  'src/app/insights'
];

for (const dir of pagesToRefactor) {
  const pagePath = path.join(dir, 'page.tsx');
  if (!fs.existsSync(pagePath)) continue;

  const content = fs.readFileSync(pagePath, 'utf8');

  if (content.includes('"use client"') || !content.includes('framer-motion')) {
      console.log(`Skipping ${dir} (already client or no framer-motion)`);
      continue;
  }

  // Find metadata export
  const metadataRegex = /export const metadata[^]*?(?=export default)/;
  const match = content.match(metadataRegex);
  const metadataStr = match ? match[0] : '';

  // Remove metadata from client component
  let clientContent = '"use client";\n\n' + content.replace(metadataRegex, '');

  // Name of the component
  const componentMatch = content.match(/export default function\s+([a-zA-Z0-9_]+)/);
  if (!componentMatch) continue;
  
  const componentName = componentMatch[1];
  const clientComponentName = componentName.endsWith('Page') ? componentName.replace('Page', 'Client') : componentName + 'Client';

  // Rename component
  clientContent = clientContent.replace(`export default function ${componentName}`, `export default function ${clientComponentName}`);

  const clientPath = path.join(dir, `${clientComponentName}.tsx`);
  fs.writeFileSync(clientPath, clientContent);

  // Re-write page.tsx
  const newPageContent = `import type { Metadata } from 'next';
import ${clientComponentName} from './${clientComponentName}';

${metadataStr}
export default function ${componentName}() {
  return <${clientComponentName} />;
}
`;

  fs.writeFileSync(pagePath, newPageContent);
  console.log(`Refactored ${dir} -> ${clientComponentName}`);
}

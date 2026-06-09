import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SEO_DATA_PATH = path.join(__dirname, '..', 'src', 'lib', 'seo-landing-data.ts');


const LOCATIONS = [
  'Gurgaon, Haryana, India',
  'Bangalore, Karnataka, India',
  'Mumbai, Maharashtra, India',
  'Delhi, India',
  'Noida, Uttar Pradesh, India',
  'Hyderabad, Telangana, India',
  'Pune, Maharashtra, India',
  'Chennai, Tamil Nadu, India',
  'Kolkata, West Bengal, India',
  'Ahmedabad, Gujarat, India',
  'Jaipur, Rajasthan, India',
  'Chandigarh, India',
  'Indore, Madhya Pradesh, India',
  'Lucknow, Uttar Pradesh, India',
  'Kochi, Kerala, India',
];

const ROLES = [
  { roleName: 'Next.js Developer', techStack: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Vercel', 'Node.js', 'PostgreSQL'] },
  { roleName: 'React Native Developer', techStack: ['React Native', 'Expo', 'TypeScript', 'Redux', 'Zustand', 'iOS/Swift', 'Android/Kotlin'] },
  { roleName: 'MERN Stack Developer', techStack: ['MongoDB', 'Express.js', 'React', 'Node.js', 'TypeScript', 'AWS', 'Docker'] },
  { roleName: 'SaaS Developer', techStack: ['Next.js', 'Node.js', 'PostgreSQL', 'Redis', 'AWS', 'Stripe', 'Docker'] },
  { roleName: 'Custom Software Developer', techStack: ['React', 'Node.js', 'Python', 'PostgreSQL', 'AWS', 'Docker', 'GraphQL'] },
  { roleName: 'Full Stack Developer', techStack: ['React', 'Node.js', 'TypeScript', 'PostgreSQL', 'AWS', 'Docker', 'GraphQL'] },
  { roleName: 'Frontend Developer', techStack: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'Redux', 'Storybook', 'Jest'] },
  { roleName: 'Backend Developer', techStack: ['Node.js', 'Python', 'PostgreSQL', 'Redis', 'AWS', 'Docker', 'Kubernetes'] },
  { roleName: 'Cloud Engineer', techStack: ['AWS', 'GCP', 'Docker', 'Kubernetes', 'Terraform', 'CI/CD', 'Linux'] },
  { roleName: 'DevOps Engineer', techStack: ['Docker', 'Kubernetes', 'Terraform', 'AWS', 'CI/CD', 'Jenkins', 'GitHub Actions'] },
];

function loadExistingPages() {
  const content = fs.readFileSync(SEO_DATA_PATH, 'utf-8');
  const slugMatch = content.match(/slug:\s*"([^"]+)"/g);
  return slugMatch ? slugMatch.map(s => s.replace('slug: "', '').replace('"', '')) : [];
}

function slugify(role, location) {
  const city = location.split(',')[0].toLowerCase().replace(/\s+/g, '-');
  const roleSlug = role.toLowerCase().replace(/\s+/g, '-');
  return `${roleSlug}-${city}`;
}

function generatePageData(role, location) {
  const city = location.split(',')[0];
  const slug = slugify(role.roleName, location);

  return {
    slug,
    roleName: role.roleName,
    title: `Hire Elite ${role.roleName}s in ${city} | Maysan Labs`,
    description: `Hire top-tier ${role.roleName}s in ${city}, India. Maysan Labs delivers high-performance, scalable software solutions for startups and enterprises. Contact us today.`,
    location,
    skills: generateSkills(role.roleName),
    techStack: role.techStack,
    features: [
      { title: 'Enterprise Grade Performance', desc: `Our ${role.roleName}s optimize every layer of your application stack for maximum speed and reliability.` },
      { title: 'Expert Vetted Talent', desc: `Rigorously vetted ${role.roleName}s with proven experience delivering production-grade software.` },
      { title: 'Flexible Engagement Models', desc: 'Full-time dedication, managed squads, or project-based consulting tailored to your needs.' },
    ],
    faqs: [
      { question: `Why hire ${role.roleName}s from Maysan Labs?`, answer: 'Maysan Labs is a specialized software studio. Our engineers write clean, type-safe code following best practices, ensuring your project scales.' },
      { question: 'Do you offer dedicated full-time hiring?', answer: 'Yes, we offer dedicated full-time developers, managed product squads, and time-and-materials project consulting.' },
      { question: `How do you ensure ${role.roleName} quality?`, answer: 'We follow OWASP guidelines, implement security best practices, and conduct regular code reviews to maintain high standards.' },
    ],
  };
}

function generateSkills(roleName) {
  const base = [
    `Expert-level ${roleName} engineering`,
    'Performance optimization & Core Web Vitals',
    'Clean code & testing best practices',
    'Cloud-native deployment & CI/CD',
    'Technical documentation & knowledge transfer',
  ];
  return base;
}

function generatePageEntry(page) {
  const skills = page.skills.map(s => `      "${s.replace(/"/g, '\\"')}"`).join(',\n');
  const techStack = page.techStack.map(t => `"${t}"`).join(', ');
  const features = page.features.map(f =>
    `      {\n        title: "${f.title.replace(/"/g, '\\"')}",\n        desc: "${f.desc.replace(/"/g, '\\"')}",\n      }`
  ).join(',\n');
  const faqs = page.faqs.map(f =>
    `      {\n        question: "${f.question.replace(/"/g, '\\"')}",\n        answer: "${f.answer.replace(/"/g, '\\"')}",\n      }`
  ).join(',\n');

  return `  {
    slug: "${page.slug}",
    roleName: "${page.roleName}",
    title: "${page.title.replace(/"/g, '\\"')}",
    description: "${page.description.replace(/"/g, '\\"')}",
    location: "${page.location}",
    skills: [
${skills}
    ],
    techStack: [${techStack}],
    features: [
${features}
    ],
    faqs: [
${faqs}
    ],
  },`;
}

async function generatePages() {
  const existingSlugs = loadExistingPages();
  const pages = [];

  for (const role of ROLES) {
    for (const location of LOCATIONS) {
      const slug = slugify(role.roleName, location);
      if (!existingSlugs.includes(slug)) {
        pages.push(generatePageData(role, location));
      }
    }
  }

  return pages;
}

function appendToSeoData(pages) {
  if (pages.length === 0) {
    console.log('No new SEO pages to add.');
    return;
  }

  let content = fs.readFileSync(SEO_DATA_PATH, 'utf-8');

  const closingMatch = content.lastIndexOf('];');
  if (closingMatch === -1) {
    console.error('Could not find closing bracket in seo-landing-data.ts');
    return;
  }

  const entries = pages.map(generatePageEntry).join('\n\n');
  const tail = content.slice(0, closingMatch).trimEnd();
  // ensure last entry has a trailing comma before inserting new ones
  const needsComma = tail.endsWith('}') || tail.endsWith('},');
  const sep = needsComma && !tail.endsWith('},') ? ',' : '';

  const insertPoint = content.lastIndexOf('\n', closingMatch - 1);
  const before = content.slice(0, insertPoint + 1);
  const after = content.slice(insertPoint + 1);

  content = before + sep + '\n' + entries + '\n' + after;
  fs.writeFileSync(SEO_DATA_PATH, content, 'utf-8');
  console.log(`Added ${pages.length} new SEO landing page(s) to seo-landing-data.ts`);
}

async function main() {
  console.log('Generating SEO landing pages...');
  const pages = await generatePages();
  appendToSeoData(pages);
  console.log('SEO page generation complete.');
}

main().catch(console.error);
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const BLOG_DATA_PATH = path.join(__dirname, '..', 'src', 'lib', 'blog-data.ts');

const API_KEY = process.env.GEMINI_API_KEY || '';
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

const TARGET_KEYWORDS = [
  'React Architecture', 'Next.js 15 App Router', 'Enterprise SaaS Development',
  'Multi-tenant Databases', 'Server-side Rendering', 'Incremental Static Regeneration',
  'Web Performance Optimization', 'SaaS Scaling Playbook', 'CTO Tech Stack Selection',
  'Digital Transformation for SMEs', 'Serverless APIs', 'Tailwind CSS Design Tokens'
];

const CATEGORIES = [
  'Architecture', 'Strategy', 'Infrastructure', 'Methodology', 'AI & ML',
  'Performance', 'Business', 'Design', 'Transformation', 'Insights'
];

const AUTHORS = [
  'Sanjay Mandal', 'Maysan Architecture Team', 'Maysan Labs Engineering', 'CTO Insights Group'
];

function loadCurrentSlugs(): string[] {
  try {
    const content = fs.readFileSync(BLOG_DATA_PATH, 'utf-8');
    const slugMatch = content.match(/slug:\s*"([^"]+)"/g);
    return slugMatch ? slugMatch.map(s => s.replace('slug: "', '').replace('"', '')) : [];
  } catch (err) {
    console.error('Failed to load current slugs:', err);
    return [];
  }
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
    .slice(0, 80);
}

interface GeneratedPost {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
  category: string;
  readTime: string;
  tags: string[];
}

function generateReadTime(content: string): string {
  const words = content.split(/\s+/).length;
  const mins = Math.max(3, Math.ceil(words / 200));
  return `${mins} min`;
}

function generatePostEntry(post: GeneratedPost): string {
  const tagsString = post.tags.map(t => `"${t}"`).join(', ');
  const escapedContent = post.content.replace(/`/g, '\\`');
  return `  {
    title: "${post.title.replace(/"/g, '\\"')}",
    slug: "${post.slug}",
    excerpt: "${post.excerpt.replace(/"/g, '\\"')}",
    date: "${post.date}",
    author: "${post.author.replace(/"/g, '\\"')}",
    category: "${post.category}",
    readTime: "${post.readTime}",
    tags: [${tagsString}],
    content: \`${escapedContent}\`,
    draft: true,
  },`;
}

async function generateWithGemini(topic: string, category: string): Promise<GeneratedPost> {
  const prompt = `You are a Principal Software Architect at Maysan Labs, writing a technical insights article. 
Write a highly engaging, authoritative blog post about "${topic}" in the "${category}" category.

The article must specifically target professional readers (CTOs, Tech Leads, SaaS founders). It should discuss best practices, performance trade-offs, and enterprise scaling strategies.

Return ONLY a valid raw JSON object (with no markdown wrappers, no \`\`\`json block) containing exactly these keys:
{
  "title": "A clickable, catchy, SEO-optimized title containing keywords",
  "excerpt": "A compelling meta description summarizing the post (max 150 chars)",
  "content": "A full, detailed technical post body with 4 to 5 structured paragraphs. Keep it clean, direct, and practical. No markdown formatting or code snippets in this field, just paragraphs separated by \\n\\n.",
  "tags": ["tag1", "tag2", "tag3"],
  "author": "Choose one of: Sanjay Mandal, Maysan Architecture Team, Maysan Labs Engineering"
}

Requirements:
- Word count: 300 to 450 words.
- Tone: Professional, expert, self-documenting.
- Make sure the JSON is perfectly valid and extractable.`;

  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{
        parts: [{ text: prompt }]
      }]
    })
  });

  if (!response.ok) {
    throw new Error(`Gemini API returned status ${response.status}`);
  }

  const data = await response.json();
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
  
  // Clean up any potential markdown wraps
  const jsonString = text.replace(/```json/i, '').replace(/```/, '').trim();
  const parsed = JSON.parse(jsonString);

  return {
    title: parsed.title || `${topic} in Enterprise Systems`,
    slug: slugify(parsed.title || topic),
    excerpt: parsed.excerpt || `An architectural analysis of ${topic.toLowerCase()}.`,
    content: parsed.content || '',
    date: new Date().toISOString().split('T')[0],
    author: parsed.author || AUTHORS[0],
    category,
    readTime: generateReadTime(parsed.content || ''),
    tags: parsed.tags || [category, 'SaaS', 'Engineering']
  };
}

function generateFallbackTemplate(topic: string, category: string): GeneratedPost {
  const today = new Date().toISOString().split('T')[0];
  const slug = slugify(topic);
  const author = AUTHORS[Math.floor(Math.random() * AUTHORS.length)];
  const title = `${topic}: Building for Scale in 2026`;
  const excerpt = `A deep dive into ${topic.toLowerCase()} outlining best practices for modern enterprise SaaS applications.`;

  const paragraphs = [
    `Building for scale requires addressing ${topic.toLowerCase()} early in the lifecycle. In modern React and Next.js environments, ignoring architectural bottlenecks leads to technical debt that slows down product launches and impacts Core Web Vitals.`,
    `When architecting enterprise SaaS platforms, you must consider tenant isolation, performance budgets, and database efficiency. By separating your concerns and adopting micro-frontends or modular structures, you make the codebase significantly more maintainable.`,
    `We have successfully deployed multiple projects prioritizing ${topic.toLowerCase()}. We found that using Next.js Server Components combined with a edge-rendered database API reduces TTFB (Time to First Byte) by over 40% globally.`,
    `Ultimately, the best architecture is the simplest one that supports your current growth phase while leaving clear paths for future scaling. Choose proven tools, avoid pre-mature optimization, and build modularly.`,
  ];

  const content = paragraphs.join('\n\n');

  return {
    title,
    slug,
    excerpt,
    content,
    date: today,
    author,
    category,
    readTime: generateReadTime(content),
    tags: [category, ...topic.split(' ').filter(w => w.length > 4).slice(0, 3)]
  };
}

async function main() {
  const count = parseInt(process.argv[2] || '1', 10);
  console.log(`[Auto-Blogger] Launching autonomous blog post generator (draft mode)...`);
  
  const existingSlugs = loadCurrentSlugs();
  const newPosts: GeneratedPost[] = [];

  for (let i = 0; i < count; i++) {
    const topic = TARGET_KEYWORDS[Math.floor(Math.random() * TARGET_KEYWORDS.length)];
    const category = CATEGORIES[Math.floor(Math.random() * CATEGORIES.length)];

    console.log(`[Auto-Blogger] Generating post ${i + 1}/${count} on: "${topic}" (${category})`);
    
    let post: GeneratedPost;
    if (API_KEY) {
      try {
        post = await generateWithGemini(topic, category);
        console.log(`[Auto-Blogger] Gemini generation successful: "${post.title}"`);
      } catch (err) {
        const errorMsg = err instanceof Error ? err.message : String(err);
        console.warn(`[Auto-Blogger] Gemini API failed (${errorMsg}). Falling back to template.`);
        post = generateFallbackTemplate(topic, category);
      }
    } else {
      console.log(`[Auto-Blogger] No GEMINI_API_KEY found. Generating via template.`);
      post = generateFallbackTemplate(topic, category);
    }

    if (existingSlugs.includes(post.slug) || newPosts.some(p => p.slug === post.slug)) {
      console.log(`[Auto-Blogger] Duplicate slug detected ("${post.slug}"). Retrying...`);
      i--;
      continue;
    }

    newPosts.push(post);
  }

  if (newPosts.length === 0) {
    console.log('[Auto-Blogger] No new posts generated.');
    return;
  }

  let blogDataContent = fs.readFileSync(BLOG_DATA_PATH, 'utf-8');
  const closingMatch = blogDataContent.lastIndexOf('];');
  if (closingMatch === -1) {
    throw new Error('Could not find closing bracket in blog-data.ts');
  }

  const entries = newPosts.map(generatePostEntry).join('\n\n');
  const insertPoint = blogDataContent.lastIndexOf('\n', closingMatch - 1);
  const before = blogDataContent.slice(0, insertPoint + 1);
  const after = blogDataContent.slice(insertPoint + 1);

  blogDataContent = before + '\n' + entries + '\n' + after;
  fs.writeFileSync(BLOG_DATA_PATH, blogDataContent, 'utf-8');

  console.log(`[Auto-Blogger] Successfully appended ${newPosts.length} post(s) (as drafts) to src/lib/blog-data.ts`);
}

main().catch(console.error);

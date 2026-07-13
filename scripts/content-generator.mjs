import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BLOG_DATA_PATH = path.join(__dirname, '..', 'src', 'data', 'blog.ts');


const API_KEY = process.env.AI_API_KEY || process.env.OPENAI_API_KEY || '';
const API_URL = process.env.AI_API_URL || 'https://api.openai.com/v1/chat/completions';
const AI_MODEL = process.env.AI_MODEL || 'gpt-4o-mini';

const CATEGORIES = [
  'Strategy', 'Infrastructure', 'Methodology', 'AI & ML', 'Security',
  'Performance', 'Business', 'Architecture', 'Design', 'Transformation',
  'Insights', 'Optimization'
];

const TOPIC_SEEDS = [
  'AI automation for small business', 'cloud cost optimization', 'microservices vs monolith',
  'Next.js performance tips', 'React Native cross-platform', 'SaaS pricing strategy',
  'API security best practices', 'DevOps CI/CD pipeline', 'headless CMS benefits',
  'progressive web apps', 'edge computing trends', 'zero trust architecture',
  'web accessibility compliance', 'TypeScript advanced patterns', 'database scaling strategies',
  'mobile app monetization', 'serverless computing', 'blockchain enterprise use',
  'data privacy compliance DPDP', 'JAMstack architecture', 'state management React',
  'GraphQL vs REST', 'agile methodology tips', 'automated testing strategy',
  'cloud migration checklist', 'Kubernetes container orchestration', 'startup tech stack',
  'ecommerce platform comparison', 'real-time applications WebSocket', 'AI chatbot integration'
];

function loadCurrentPosts() {
  const content = fs.readFileSync(BLOG_DATA_PATH, 'utf-8');
  const slugMatch = content.match(/slug:\s*"([^"]+)"/g);
  const slugs = slugMatch ? slugMatch.map(s => s.replace('slug: "', '').replace('"', '')) : [];
  return slugs;
}

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
    .slice(0, 80);
}

function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateReadTime(content) {
  const words = content.split(/\s+/).length;
  const mins = Math.max(2, Math.ceil(words / 200));
  return `${mins} min`;
}

function generatePostEntry(post) {
  const tags = post.tags.map(t => `"${t}"`).join(', ');
  const content = post.content.replace(/`/g, '\\`');
  return `  {
    title: "${post.title.replace(/"/g, '\\"')}",
    slug: "${post.slug}",
    excerpt: "${post.excerpt.replace(/"/g, '\\"')}",
    date: "${post.date}",
    author: "${post.author.replace(/"/g, '\\"')}",
    category: "${post.category}",
    readTime: "${post.readTime}",
    tags: [${tags}],
    content: \`${content}\`,
  },`;
}

async function generateAIPost() {
  if (!API_KEY) {
    console.log('No AI API key found, using template-based generation.');
    return generateTemplatePost();
  }

  const topic = pickRandom(TOPIC_SEEDS);
  const category = pickRandom(CATEGORIES);
  const today = new Date().toISOString().split('T')[0];

  const prompt = `You are a technical content writer for a software development company (Maysan Labs). 
Write a blog post about "${topic}" in the "${category}" category.

Return ONLY valid JSON with these fields:
{
  "title": "SEO-optimized title (max 60 chars)",
  "excerpt": "Compelling meta description (max 155 chars)",
  "content": "Blog post body with 3-5 short paragraphs, plain text, no markdown",
  "tags": ["tag1", "tag2", "tag3"],
  "author": "Maysan Labs Engineering Team"
}

Requirements:
- Title must be clickable and include target keywords
- Content should be practical, actionable, and authoritative
- Keep paragraphs short (2-4 sentences each)
- Total content length: 250-400 words
- Use natural language, avoid fluff
- Focus on business value and technical accuracy`;

  try {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model: AI_MODEL,
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.8,
        max_tokens: 1000,
      }),
    });

    if (!res.ok) {
      console.warn(`AI API returned ${res.status}, falling back to template.`);
      return generateTemplatePost();
    }

    const data = await res.json();
    const text = data.choices?.[0]?.message?.content || '';
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error('No JSON in response');

    const parsed = JSON.parse(jsonMatch[0]);

    return {
      title: parsed.title || `${topic}: A Practical Guide`,
      slug: slugify(parsed.title || topic),
      excerpt: parsed.excerpt || `Learn about ${topic} and how it applies to modern software development.`,
      content: parsed.content || `A detailed guide about ${topic} for engineering teams.`,
      date: today,
      author: parsed.author || 'Maysan Engineering Team',
      category,
      readTime: '4 min',
      tags: parsed.tags?.slice(0, 5) || ['Technology', category],
    };
  } catch (err) {
    console.error('AI generation failed:', err.message);
    return generateTemplatePost();
  }
}

function generateTemplatePost() {
  const topic = pickRandom(TOPIC_SEEDS);
  const category = pickRandom(CATEGORIES);
  const today = new Date().toISOString().split('T')[0];
  const slug = slugify(topic);
  const title = topic.split(' ').map(w => w[0].toUpperCase() + w.slice(1)).join(' ');

  const templates = {
    content: [
      `The landscape of ${topic.toLowerCase()} is evolving rapidly. Companies that adapt early gain a significant competitive advantage in their markets.`,
      `Understanding the core principles behind ${topic.toLowerCase()} helps teams make better architectural decisions. Let's break down what actually matters.`,
      `We've worked with dozens of companies implementing solutions around ${topic.toLowerCase()}. Here are the patterns that consistently deliver results.`,
      `The key is to start small and iterate. Focus on solving one problem well rather than trying to address everything at once.`,
      `As the ecosystem matures, we expect to see more standardized approaches emerge, making it easier for teams to adopt best practices without reinventing the wheel.`,
    ].join('\n\n'),
    excerpt: `A practical guide to ${topic.toLowerCase()} — what works, what doesn't, and how to get started.`,
  };

  return {
    title: `${title}: What You Need to Know`,
    slug,
    excerpt: templates.excerpt,
    content: templates.content,
    date: today,
    author: 'Maysan Engineering Team',
    category,
    readTime: generateReadTime(templates.content),
    tags: [category, ...topic.split(' ').filter(w => w.length > 3).slice(0, 3)],
  };
}

async function generatePosts(count = 1) {
  const existingSlugs = loadCurrentPosts();
  const posts = [];

  for (let i = 0; i < count; i++) {
    const post = await generateAIPost();
    if (!existingSlugs.includes(post.slug) && !posts.some(p => p.slug === post.slug)) {
      posts.push(post);
    } else {
      console.log(`Skipping duplicate slug: ${post.slug}`);
      i--; // retry
      if (i < 0) break;
    }
  }

  return posts;
}

function appendToBlogData(posts) {
  if (posts.length === 0) {
    console.log('No new posts to add.');
    return;
  }

  let content = fs.readFileSync(BLOG_DATA_PATH, 'utf-8');

  // Find the last blog post entry and insert before the closing bracket
  const closingMatch = content.lastIndexOf('];');
  if (closingMatch === -1) {
    console.error('Could not find closing bracket in blog-data.ts');
    return;
  }

  const entries = posts.map(generatePostEntry).join('\n\n');
  const insertPoint = content.lastIndexOf('\n', closingMatch - 1);
  const before = content.slice(0, insertPoint + 1);
  const after = content.slice(insertPoint + 1);

  content = before + '\n' + entries + '\n' + after;
  fs.writeFileSync(BLOG_DATA_PATH, content, 'utf-8');
  console.log(`Added ${posts.length} new post(s) to blog-data.ts`);
}

async function main() {
  const count = parseInt(process.argv[2] || '1', 10);
  console.log(`Generating ${count} blog post(s)...`);
  const posts = await generatePosts(count);
  appendToBlogData(posts);
  console.log('Content generation complete.');
}

main().catch(console.error);

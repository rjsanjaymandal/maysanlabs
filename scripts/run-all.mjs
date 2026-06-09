import { execSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function run(script, label) {
  console.log(`\n═══════════════════════════════════════`);
  console.log(`  ${label}`);
  console.log(`═══════════════════════════════════════\n`);
  try {
    execSync(`node ${script}`, {
      cwd: path.join(__dirname, '..'),
      stdio: 'inherit',
      env: { ...process.env },
    });
    console.log(`✓ ${label} completed successfully.\n`);
  } catch (err) {
    console.error(`✗ ${label} failed:`, err.message);
    process.exitCode = 1;
  }
}

function main() {
  const args = process.argv.slice(2);
  const blogCount = parseInt(args.find(a => !isNaN(parseInt(a))) || '1', 10);
  const skipSeo = args.includes('--skip-seo');
  const skipBlog = args.includes('--skip-blog');
  const skipPing = args.includes('--skip-ping');

  console.log(`
╔══════════════════════════════════════════╗
║     Maysan Labs Autonomous Content       ║
║           Generation Pipeline            ║
╚══════════════════════════════════════════╝
  `);
  console.log(`Blog posts to generate: ${blogCount}`);
  console.log(`Skip SEO pages: ${skipSeo}`);
  console.log(`Skip blog: ${skipBlog}`);
  console.log(`Skip indexing ping: ${skipPing}\n`);

  if (!skipBlog) {
    run('scripts/content-generator.mjs', 'Generating Blog Posts');
  }

  if (!skipSeo) {
    run('scripts/generate-seo-pages.mjs', 'Generating SEO Landing Pages');
  }

  if (!skipPing) {
    console.log('\nPinging search engines...');
    try {
      execSync('node scripts/ping-indexing.js', {
        cwd: path.join(__dirname, '..'),
        stdio: 'inherit',
      });
    } catch {
      console.warn('Ping indexing had issues (non-fatal).');
    }
  }

  console.log(`\n✓ Pipeline complete. Run 'npm run build' to rebuild the site with new content.`);
}

main();
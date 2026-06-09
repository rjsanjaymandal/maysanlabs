const sitemapUrl = 'https://maysanlabs.com/sitemap.xml';
const indexNowKey = 'e5585b73645b4c1aa32be247b925b441';

const urlsToPing = [
  'https://maysanlabs.com/',
  'https://maysanlabs.com/services',
  'https://maysanlabs.com/careers',
  'https://maysanlabs.com/blog',
  'https://maysanlabs.com/products',
  'https://maysanlabs.com/case-studies',
];

async function pingGoogle() {
  try {
    // Google deprecated the old ping endpoint; submit via IndexNow (Google supports it) + direct sitemap submission
    const url = `https://www.google.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}`;
    const res = await fetch(url, { method: 'HEAD' }).catch(() => {});
    if (res && res.ok) {
      console.log('✓ Successfully pinged Google Sitemap Indexing API.');
    } else {
      // Fallback: submit to Google's updated Indexing API via IndexNow protocol (Google also consumes IndexNow)
      const googleIndexNow = await fetch('https://api.indexnow.org/indexnow', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
        body: JSON.stringify({
          host: 'maysanlabs.com',
          key: indexNowKey,
          keyLocation: `https://maysanlabs.com/${indexNowKey}.txt`,
          urlList: [sitemapUrl],
        }),
      });
      if (googleIndexNow.ok) {
        console.log('✓ Submitted sitemap via IndexNow (consumed by Google + Bing).');
      } else {
        console.warn('⚠ Google indexing ping unavailable (non-critical).');
      }
    }
  } catch (e) {
    console.error('✗ Failed to ping Google:', e.message);
  }
}

async function pingIndexNow() {
  try {
    const res = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify({
        host: 'maysanlabs.com',
        key: indexNowKey,
        keyLocation: `https://maysanlabs.com/${indexNowKey}.txt`,
        urlList: urlsToPing,
      }),
    });
    if (res.ok) {
      console.log('✓ Successfully pinged IndexNow API (Bing/Yandex).');
    } else {
      console.warn(`⚠ IndexNow Ping returned status: ${res.status}`);
    }
  } catch (e) {
    console.error('✗ Failed to ping IndexNow:', e.message);
  }
}

async function run() {
  console.log('🚀 Triggering search engine index update pings...');
  await Promise.all([pingGoogle(), pingIndexNow()]);
  console.log('✓ Index update pings complete.');
}

run();

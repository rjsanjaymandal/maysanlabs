'use client';

import { useEffect, useState } from 'react';
import { ExternalLink, RefreshCw, Newspaper } from 'lucide-react';

interface NewsItem {
  title: string;
  source: string;
  url: string;
  published: string;
  category: string;
}

type DevToArticle = { title: string; url: string; published_at: string; tag_list?: string[] };
type HNItem = { title: string; url?: string; objectID: string; created_at: string };
type HNResponse = { hits?: HNItem[] };

const FALLBACK_NEWS: NewsItem[] = [
  { title: 'AI adoption accelerates in enterprise SaaS', source: 'TechCrunch', url: 'https://techcrunch.com', published: '2026-06-09T10:00:00Z', category: 'AI & ML' },
  { title: 'Next.js 16 introduces major performance improvements', source: 'Dev.to', url: 'https://dev.to', published: '2026-06-09T09:00:00Z', category: 'Performance' },
  { title: 'Cloud infrastructure costs rising — here\'s how to optimize', source: 'InfoQ', url: 'https://infoq.com', published: '2026-06-09T08:00:00Z', category: 'Infrastructure' },
];

const RSS_FEEDS = [
  {
    url: 'https://hn.algolia.com/api/v1/search?query=software+development&tags=story&hitsPerPage=8',
    parser: (d: HNResponse) => d.hits?.map((h: HNItem) => ({
      title: h.title, source: 'Hacker News', url: h.url || `https://news.ycombinator.com/item?id=${h.objectID}`, published: h.created_at, category: 'Technology'
    })) || []
  },
  {
    url: 'https://dev.to/api/articles?tag=software&per_page=6',
    parser: (d: DevToArticle[]) => d.map((a: DevToArticle) => ({
      title: a.title, source: 'Dev.to', url: a.url, published: a.published_at, category: a.tag_list?.[0] || 'Development'
    }))
  },
];

const categoryIcons: Record<string, string> = {
  'AI & ML': '🤖', 'Performance': '⚡', 'Infrastructure': '☁️', 'Security': '🔒',
  'Development': '💻', 'Technology': '📡', 'Business': '📊', 'Architecture': '🏗️',
};

export default function TechNewsFeed({ initialNews }: { initialNews?: NewsItem[] } = {}) {
  const [news, setNews] = useState<NewsItem[]>(initialNews || FALLBACK_NEWS);
  const [loading, setLoading] = useState(false);
  const [visibleCount, setVisibleCount] = useState(4);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
 
  const fetchNews = async () => {
    setLoading(true);
    try {
      const results = await Promise.allSettled(
        RSS_FEEDS.map(feed =>
          fetch(feed.url).then(r => r.json()).then(feed.parser)
        )
      );
 
      const items: NewsItem[] = [];
      for (const result of results) {
        if (result.status === 'fulfilled') items.push(...result.value);
      }
 
      if (items.length > 0) {
        items.sort((a, b) => new Date(b.published).getTime() - new Date(a.published).getTime());
        setNews(items.slice(0, 20));
        setLastUpdated(new Date().toLocaleTimeString());
      }
    } catch {
      // keep fallback
    } finally {
      setLoading(false);
    }
  };
 
  useEffect(() => {
    setMounted(true);
    if (!initialNews || initialNews.length === 0) {
      fetchNews();
    }
    const interval = setInterval(fetchNews, 30 * 60 * 1000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!mounted) return null;

  const visibleNews = news.slice(0, visibleCount);

  return (
    <section className="py-16 relative overflow-hidden bg-background">
      <div className="absolute inset-0 bg-grid-pattern pointer-events-none z-0" />
      <div className="container-main relative z-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <span className="badge-section mb-4">
              <Newspaper size={12} />
              <span className="relative flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-primary animate-pulse" />
                Auto-Updating
              </span>
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight">Tech News & Trends</h2>
            <p className="text-sm text-foreground/50 mt-1 max-w-lg">Curated from Hacker News &amp; Dev.to — refreshes automatically every 30 min</p>
          </div>
          <button
            onClick={fetchNews}
            disabled={loading}
            className="inline-flex items-center gap-1.5 text-xs text-foreground/40 hover:text-brand-primary bg-white/30 dark:bg-white/[0.02] border border-gray-200 dark:border-white/[0.06] px-4 py-2 rounded-full hover:border-brand-primary/30 transition-all disabled:opacity-50 shrink-0"
          >
            <RefreshCw size={12} className={loading ? 'animate-spin' : ''} />
            {loading ? 'Loading...' : 'Refresh'}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {visibleNews.map((item, i) => (
            <a
              key={`${item.title}-${i}`}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-start gap-3 p-4 rounded-xl bg-white/50 dark:bg-white/[0.02] border border-gray-100 dark:border-white/[0.06] hover:border-brand-primary/20 hover:shadow-sm transition-all"
            >
              <span className="text-lg shrink-0 mt-0.5">{categoryIcons[item.category] || '📰'}</span>
              <div className="min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-brand-primary/70">{item.source}</span>
                  <span className="text-[10px] text-foreground/30">
                    {new Date(item.published).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </span>
                </div>
                <h3 className="text-sm font-medium text-foreground group-hover:text-brand-primary transition-colors line-clamp-2 leading-snug">
                  {item.title}
                </h3>
              </div>
              <ExternalLink size={14} className="shrink-0 text-foreground/20 group-hover:text-brand-primary/50 mt-1 transition-colors" />
            </a>
          ))}
        </div>

        {visibleCount < news.length && (
          <div className="text-center mt-6">
            <button
              onClick={() => setVisibleCount(prev => Math.min(prev + 4, news.length))}
              className="inline-flex items-center gap-1.5 text-xs text-foreground/40 hover:text-brand-primary bg-white/30 dark:bg-white/[0.02] border border-gray-200 dark:border-white/[0.06] px-5 py-2.5 rounded-full hover:border-brand-primary/30 transition-all"
            >
              Show more ({news.length - visibleCount} remaining)
            </button>
          </div>
        )}

        {lastUpdated && (
          <p className="text-center text-[10px] text-foreground/20 mt-4 flex items-center justify-center gap-1">
            <span className="w-1 h-1 rounded-full bg-emerald-400" />
            Last auto-refreshed: {lastUpdated}
          </p>
        )}
      </div>
    </section>
  );
}
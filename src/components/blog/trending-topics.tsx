'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { TrendingUp, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const TOPIC_POOLS = [
  { label: 'AI Agents', query: 'ai-automation', category: 'AI & ML' },
  { label: 'Edge Computing', query: 'edge-computing', category: 'Infrastructure' },
  { label: 'WebAssembly', query: 'webassembly', category: 'Performance' },
  { label: 'Zero Trust', query: 'zero-trust', category: 'Security' },
  { label: 'Micro Frontends', query: 'micro-frontends', category: 'Architecture' },
  { label: 'Serverless', query: 'serverless', category: 'Infrastructure' },
  { label: 'TypeScript 5.x', query: 'typescript', category: 'Methodology' },
  { label: 'Progressive Web Apps', query: 'pwa', category: 'Performance' },
  { label: 'Jamstack', query: 'jamstack', category: 'Architecture' },
  { label: 'AI SaaS Products', query: 'ai-saas', category: 'AI & ML' },
  { label: 'Cloud Native', query: 'cloud-native', category: 'Infrastructure' },
  { label: 'Cyber Security', query: 'cybersecurity', category: 'Security' },
  { label: 'Web3', query: 'web3', category: 'Strategy' },
  { label: 'Low Code', query: 'low-code', category: 'Methodology' },
  { label: 'FinTech', query: 'fintech', category: 'Business' },
  { label: 'DevSecOps', query: 'devsecops', category: 'Security' },
  { label: 'Kubernetes', query: 'kubernetes', category: 'Infrastructure' },
  { label: 'React Server Components', query: 'react-server-components', category: 'Architecture' },
  { label: 'DPDP Compliance', query: 'dpdp', category: 'Business' },
  { label: 'Mobile First', query: 'mobile-first', category: 'Design' },
];

function seededShuffle<T>(arr: T[], seed: number): T[] {
  const shuffled = [...arr];
  let s = seed;
  for (let i = shuffled.length - 1; i > 0; i--) {
    s = (s * 16807 + 0) % 2147483647;
    const j = s % (i + 1);
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function getHourSeed(): number {
  const now = new Date();
  return now.getFullYear() * 10000 + (now.getMonth() + 1) * 100 + now.getDate() * 100 + now.getHours();
}

export default function TrendingTopics() {
  const [seed, setSeed] = useState(getHourSeed);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const topics = useMemo(() => seededShuffle(TOPIC_POOLS, seed).slice(0, 12), [seed]);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setSeed(getHourSeed());
    }, 60 * 60 * 1000);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, []);

  const catColors: Record<string, string> = {
    'AI & ML': 'bg-orange-500/10 text-orange-500 border-orange-500/20',
    'Infrastructure': 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
    'Architecture': 'bg-cyan-500/10 text-cyan-500 border-cyan-500/20',
    'Security': 'bg-red-500/10 text-red-500 border-red-500/20',
    'Performance': 'bg-cyan-500/10 text-cyan-500 border-cyan-500/20',
    'Methodology': 'bg-rose-500/10 text-rose-500 border-rose-500/20',
    'Business': 'bg-amber-500/10 text-amber-500 border-amber-500/20',
    'Design': 'bg-pink-500/10 text-pink-500 border-pink-500/20',
    'Strategy': 'bg-blue-500/10 text-blue-500 border-blue-500/20',
  };

  return (
    <div className="py-12" key={seed}>
      <div className="container-main max-w-5xl mx-auto px-4 sm:px-6">
        <div className="flex items-center gap-2 mb-6">
          <TrendingUp size={16} className="text-brand-primary" />
          <h3 className="text-xs font-bold uppercase tracking-widest text-foreground/30">
            Trending Topics
          </h3>
          <span className="text-[10px] text-foreground/20 ml-auto">Auto-rotates hourly</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {topics.map((topic) => (
            <Link
              key={`${topic.label}-${seed}`}
              href={`/blog?tag=${topic.query}`}
              className={`group inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${catColors[topic.category] || 'bg-gray-500/10 text-gray-500 border-gray-500/20'}`}
            >
              {topic.label}
              <ArrowRight size={10} className="opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
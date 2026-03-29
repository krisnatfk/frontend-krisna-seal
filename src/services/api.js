// Use relative URL so Vite dev proxy handles CORS; in production, use the full URL
const isDev = import.meta.env.DEV;
const BASE_URL = isDev ? '/api' : 'https://berita-indo-api-next.vercel.app/api';

/**
 * In-memory cache to avoid re-fetching when switching categories back and forth.
 * Cache expires after 5 minutes.
 */
const cache = new Map();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

/**
 * Category-to-endpoint mapping per source.
 * CNN valid:  nasional, internasional, ekonomi, olahraga, teknologi, hiburan
 * Antara valid: terkini, internasional, ekonomi, olahraga, hiburan
 */
const CNN_CATEGORY_MAP = {
  terbaru: 'nasional',
  nasional: 'nasional',
  internasional: 'internasional',
  ekonomi: 'ekonomi',
  olahraga: 'olahraga',
  teknologi: 'teknologi',
  hiburan: 'hiburan',
  'gaya-hidup': 'hiburan',
};

const ANTARA_CATEGORY_MAP = {
  terbaru: 'terkini',
  nasional: 'terkini',
  internasional: 'internasional',
  ekonomi: 'ekonomi',
  olahraga: 'olahraga',
  teknologi: 'ekonomi',
  hiburan: 'hiburan',
  'gaya-hidup': 'hiburan',
};

/**
 * Normalize article from any source into a unified shape.
 */
function normalizeArticle(article, source) {
  let imageUrl = '';
  if (typeof article.image === 'string') {
    imageUrl = article.image;
  } else if (article.image && typeof article.image === 'object') {
    imageUrl = article.image.large || article.image.small || '';
  }

  return {
    title: article.title || '',
    link: article.link || '',
    snippet: article.contentSnippet || article.description || '',
    isoDate: article.isoDate || '',
    imageUrl,
    source,
  };
}

/**
 * Fetch news from a single source with timeout.
 */
async function fetchFromSource(source, category) {
  const map = source === 'cnn-news' ? CNN_CATEGORY_MAP : ANTARA_CATEGORY_MAP;
  const apiCategory = map[category] || category;
  const url = `${BASE_URL}/${source}/${apiCategory}`;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 8000); // 8s timeout

  try {
    const res = await fetch(url, { signal: controller.signal });
    clearTimeout(timeoutId);
    if (!res.ok) throw new Error(`${source}/${apiCategory} returned ${res.status}`);
    const json = await res.json();
    return (json.data || []).map((a) => normalizeArticle(a, source));
  } catch (err) {
    clearTimeout(timeoutId);
    throw err;
  }
}

/**
 * Main entry point. Fetches from CNN and Antara in parallel.
 * Uses in-memory cache for instant revisits.
 */
export async function fetchNews(category = 'terbaru') {
  // Check cache first
  const cached = cache.get(category);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return { data: cached.data, total: cached.data.length };
  }

  const [cnnResult, antaraResult] = await Promise.allSettled([
    fetchFromSource('cnn-news', category),
    fetchFromSource('antara-news', category),
  ]);

  let combined = [];
  if (cnnResult.status === 'fulfilled') combined = combined.concat(cnnResult.value);
  if (antaraResult.status === 'fulfilled') combined = combined.concat(antaraResult.value);

  if (combined.length === 0) {
    const errMsg = cnnResult.reason?.message || antaraResult.reason?.message || 'Unknown error';
    throw new Error(errMsg);
  }

  // Sort by date descending
  combined.sort((a, b) => {
    if (!a.isoDate) return 1;
    if (!b.isoDate) return -1;
    return new Date(b.isoDate) - new Date(a.isoDate);
  });

  // Store in cache
  cache.set(category, { data: combined, timestamp: Date.now() });

  return { data: combined, total: combined.length };
}

/**
 * Prefetch multiple categories in background for instant navigation.
 */
export function prefetchCategories(categories) {
  categories.forEach((cat) => {
    if (!cache.has(cat)) {
      fetchNews(cat).catch(() => {}); // silently prefetch
    }
  });
}

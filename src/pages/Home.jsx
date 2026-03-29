import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchNews, prefetchCategories } from '../services/api';
import Hero from '../components/Hero';
import NewsCard from '../components/NewsCard';
import PopularCard from '../components/PopularCard';
import { Loader2, Search } from 'lucide-react';

const ITEMS_PER_PAGE = 8;

const Home = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const currentCategory = category || 'terbaru';

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);

  const loadNews = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetchNews(currentCategory);
      setData(response.data || []);
    } catch {
      setError('Gagal memuat berita. Silakan coba lagi nanti.');
    } finally {
      setLoading(false);
    }
  }, [currentCategory]);

  useEffect(() => {
    setPage(1);
    setSearchQuery('');
    loadNews();
  }, [loadNews]);

  // Prefetch other categories in the background after initial load
  useEffect(() => {
    if (!loading && data.length > 0) {
      prefetchCategories(['nasional', 'internasional', 'olahraga', 'hiburan', 'ekonomi', 'teknologi']);
    }
  }, [loading, data.length]);

  const handleArticleClick = (article) => {
    navigate('/news/detail', { state: { article, allArticles: data } });
  };

  // Hero articles = first 5
  const heroArticles = data.slice(0, 5);
  // Popular articles = next 3
  const popularArticles = data.slice(5, 8);
  // Recommendation articles = rest, filtered by search
  const restArticles = data.slice(8);
  const filtered = searchQuery
    ? restArticles.filter((a) =>
        a.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : restArticles;

  // Pagination
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginatedArticles = filtered.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pages = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1, 2);
      if (page > 4) pages.push('...');
      const start = Math.max(3, page - 1);
      const end = Math.min(totalPages - 2, page + 1);
      for (let i = start; i <= end; i++) pages.push(i);
      if (page < totalPages - 3) pages.push('...');
      pages.push(totalPages - 1, totalPages);
    }
    return [...new Set(pages)];
  };

  return (
    <div className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12">
      {loading ? (
        <div className="flex flex-col items-center justify-center min-h-[50vh]">
          <Loader2 className="w-8 h-8 animate-spin text-sky-500 mb-3" />
          <p className="text-slate-500 text-sm">Memuat berita...</p>
        </div>
      ) : error ? (
        <div className="flex flex-col items-center justify-center min-h-[50vh]">
          <p className="text-lg font-semibold text-slate-800 mb-2">Oops! Ada masalah.</p>
          <p className="text-slate-500 text-sm mb-4">{error}</p>
          <button
            onClick={loadNews}
            className="bg-sky-500 hover:bg-sky-600 text-white px-5 py-2 rounded-md text-sm font-medium transition-colors"
          >
            Coba Lagi
          </button>
        </div>
      ) : (
        <>
          {/* ===== Hero Section ===== */}
          <Hero articles={heroArticles} onClick={handleArticleClick} />

          {/* ===== Berita Terpopuler ===== */}
          {popularArticles.length > 0 && (
            <section className="mb-14">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-1 h-6 bg-slate-900 rounded-full" />
                <h2 className="text-xl font-bold text-slate-900">Berita Terpopuler</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {popularArticles.map((article, i) => (
                  <PopularCard
                    key={i}
                    article={article}
                    index={i}
                    onClick={handleArticleClick}
                  />
                ))}
              </div>
            </section>
          )}

          {/* ===== Rekomendasi Untuk Anda ===== */}
          <section>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <div className="flex items-center gap-2">
                <div className="w-1 h-6 bg-slate-900 rounded-full" />
                <h2 className="text-xl font-bold text-slate-900">Rekomendasi Untuk Anda</h2>
              </div>
              {/* Search bar matching mockup */}
              <div className="relative w-full sm:w-64">
                <input
                  type="text"
                  placeholder="Cari disini..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setPage(1);
                  }}
                  className="w-full pl-4 pr-10 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent bg-white"
                />
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              </div>
            </div>

            {/* News Grid — 4 columns matching mockup */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-8">
              {paginatedArticles.map((article, i) => (
                <NewsCard key={i} article={article} onClick={handleArticleClick} />
              ))}
            </div>

            {paginatedArticles.length === 0 && (
              <p className="text-center text-slate-500 py-12">
                Tidak ada berita ditemukan.
              </p>
            )}

            {/* Pagination — "Showing 1 to 10 of 97 results" + page numbers matching mockup */}
            {totalPages > 1 && (
              <div className="flex flex-col sm:flex-row items-center justify-between mt-10 gap-4">
                <span className="text-sm text-slate-500">
                  Showing {(page - 1) * ITEMS_PER_PAGE + 1} to{' '}
                  {Math.min(page * ITEMS_PER_PAGE, filtered.length)} of{' '}
                  {filtered.length} results
                </span>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className="px-3 py-1.5 text-sm text-slate-600 hover:bg-slate-100 rounded-md disabled:opacity-30 transition-colors"
                  >
                    ← Previous
                  </button>
                  {getPageNumbers().map((p, idx) =>
                    p === '...' ? (
                      <span key={`dots-${idx}`} className="px-1 text-slate-400 text-sm">…</span>
                    ) : (
                      <button
                        key={p}
                        onClick={() => setPage(p)}
                        className={`w-8 h-8 flex items-center justify-center rounded-md text-sm font-medium transition-colors ${
                          page === p
                            ? 'bg-sky-500 text-white'
                            : 'text-slate-600 hover:bg-slate-100'
                        }`}
                      >
                        {p}
                      </button>
                    )
                  )}
                  <button
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages}
                    className="px-3 py-1.5 text-sm text-slate-600 hover:bg-slate-100 rounded-md disabled:opacity-30 transition-colors"
                  >
                    Next →
                  </button>
                </div>
              </div>
            )}
          </section>
        </>
      )}
    </div>
  );
};

export default Home;

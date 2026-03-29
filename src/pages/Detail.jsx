import React from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { ChevronRight, Calendar, ExternalLink, Home } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { id } from 'date-fns/locale';
import PopularCard from '../components/PopularCard';
import NewsCard from '../components/NewsCard';

const Detail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const article = location.state?.article;
  const allArticles = location.state?.allArticles || [];

  const popularArticles = allArticles
    .filter((a) => a.link !== article?.link)
    .slice(0, 3);

  const relatedArticles = allArticles
    .filter(
      (a) =>
        a.link !== article?.link &&
        !popularArticles.find((p) => p.link === a.link)
    )
    .slice(0, 3);

  const handleArticleClick = (a) => {
    navigate('/news/detail', { state: { article: a, allArticles } });
    window.scrollTo(0, 0);
  };

  if (!article) {
    return (
      <div className="flex-grow flex flex-col items-center justify-center p-6 text-center min-h-[60vh]">
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Berita Tidak Ditemukan</h2>
        <p className="text-slate-500 max-w-md mb-6">
          Halaman tidak ditemukan. Silakan kembali ke beranda.
        </p>
        <Link
          to="/"
          className="bg-sky-500 hover:bg-sky-600 text-white px-5 py-2 rounded-md text-sm font-medium transition-colors"
        >
          Kembali ke Beranda
        </Link>
      </div>
    );
  }

  const sourceName = article.source === 'antara-news' ? 'Antara News' : 'CNN Indonesia';

  return (
    <div className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-12">
      {/* Breadcrumb — matching detail mockup exactly */}
      <nav className="flex items-center text-sm text-slate-500 mb-8 gap-1.5">
        <Link to="/" className="hover:text-sky-500 transition-colors flex items-center gap-1">
          <Home className="w-4 h-4" />
          Beranda
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
        <span className="text-slate-400">Nasional</span>
        <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
        <span className="text-slate-900 font-medium">Detail</span>
      </nav>

      {/* Two-column layout: Article + Sidebar */}
      <div className="flex flex-col lg:flex-row gap-10">
        {/* Left: Article Content */}
        <article className="flex-1 min-w-0">
          {/* Title */}
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 leading-tight mb-3">
            {article.title}
          </h1>

          {/* Source + Date */}
          <div className="flex items-center text-sm gap-2 mb-6">
            <span className="text-sky-500 font-semibold">{sourceName}</span>
            <span className="text-slate-300">•</span>
            <span className="text-slate-500 flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {article.isoDate
                ? format(parseISO(article.isoDate), 'dd MMM yyyy', { locale: id })
                : ''}
            </span>
          </div>

          {/* Featured Image */}
          <div className="w-full aspect-[16/10] rounded-xl overflow-hidden bg-slate-100 mb-2">
            <img
              src={article.imageUrl || 'https://placehold.co/800x500?text=Berita+Kini'}
              alt={article.title}
              className="w-full h-full object-cover"
            />
          </div>
          <p className="text-xs text-slate-400 italic mb-8">
            Sumber gambar: {sourceName}
          </p>

          {/* Article Body */}
          <div className="prose prose-slate max-w-none">
            <p className="text-slate-700 leading-relaxed text-[15px] mb-6">
              {article.snippet}
            </p>

            <div className="bg-sky-50 border border-sky-100 rounded-lg p-5 my-6">
              <p className="text-slate-600 text-sm mb-3">
                Untuk membaca berita secara lengkap, silakan kunjungi sumber aslinya:
              </p>
              <a
                href={article.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 bg-sky-500 hover:bg-sky-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Baca Selengkapnya di {sourceName} <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Comments Section — matching detail mockup */}
          <section className="mt-12 border-t border-slate-200 pt-8">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-1 h-6 bg-slate-900 rounded-full" />
              <h2 className="text-lg font-bold text-slate-900">Komentar</h2>
            </div>
            <div className="flex gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-slate-200 flex-shrink-0 overflow-hidden">
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=User" alt="User" className="w-full h-full" />
              </div>
              <div className="flex-1">
                <textarea
                  placeholder="Apa yang ingin anda tanyakan?"
                  className="w-full border border-slate-200 rounded-lg p-3 text-sm resize-none h-20 focus:outline-none focus:ring-2 focus:ring-sky-400"
                />
                <div className="flex justify-between items-center mt-2">
                  <button className="bg-sky-500 hover:bg-sky-600 text-white px-5 py-1.5 rounded-full text-sm font-medium transition-colors">
                    Kirim
                  </button>
                  <span className="text-xs text-slate-400">0/50</span>
                </div>
              </div>
            </div>

            {/* Sample comments matching mockup */}
            <div className="space-y-5 mt-6">
              <div className="flex gap-3">
                <div className="w-9 h-9 rounded-full bg-slate-200 flex-shrink-0 overflow-hidden">
                  <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Ujang" alt="User" className="w-full h-full" />
                </div>
                <div>
                  <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
                    <span className="font-semibold text-slate-700">UJANG YUSMEIDI S.P., M.Agr.</span>
                    <span>•</span>
                    <span>28 Mar 2024 11:15</span>
                  </div>
                  <p className="text-sm text-slate-600 mb-1">
                    Mohon maaf, apakah sertifikatnya sudah tidak dapat diunduh? Karena saya mau download ada konfirmasi bahwa TOTP aktivasi salah. Bagaimana ya solusinya?
                  </p>
                  <button className="text-sky-500 text-xs font-medium">Balas</button>

                  {/* Nested reply */}
                  <div className="flex gap-3 mt-3 ml-2">
                    <div className="w-8 h-8 rounded-full bg-slate-200 flex-shrink-0 overflow-hidden">
                      <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Dina" alt="User" className="w-full h-full" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
                        <span className="font-semibold text-slate-700">DINA RIKHA RIYANAWATI, S.Pd</span>
                        <span>•</span>
                        <span>28 Mar 2024 11:15</span>
                      </div>
                      <p className="text-sm text-slate-600 mb-1">
                        saya mengunduh sertifikatnya kok juga belumbisa
                      </p>
                      <button className="text-sky-500 text-xs font-medium">Balas</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Comment pagination */}
            <div className="flex items-center justify-between mt-6 pt-4 border-t border-slate-100">
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <span>Item per page</span>
                <select className="border border-slate-200 rounded px-2 py-1 text-sm">
                  <option>5</option>
                  <option>10</option>
                </select>
                <span>of 200</span>
              </div>
              <div className="flex items-center gap-1 text-sm">
                <button className="w-7 h-7 flex items-center justify-center rounded text-slate-400">←</button>
                <button className="w-7 h-7 flex items-center justify-center rounded bg-sky-50 text-sky-500 font-medium">1</button>
                <button className="w-7 h-7 flex items-center justify-center rounded text-slate-500 hover:bg-slate-50">2</button>
                <button className="w-7 h-7 flex items-center justify-center rounded text-slate-400">→</button>
              </div>
            </div>
          </section>

          {/* Berita Terkait — matching detail mockup */}
          {relatedArticles.length > 0 && (
            <section className="mt-12 border-t border-slate-200 pt-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-1 h-6 bg-slate-900 rounded-full" />
                  <h2 className="text-lg font-bold text-slate-900">Berita Terkait</h2>
                </div>
                <Link
                  to="/"
                  className="text-sky-500 text-sm font-medium border border-sky-500 rounded-full px-4 py-1 hover:bg-sky-50 transition-colors"
                >
                  Lihat Semua
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                {relatedArticles.map((a, i) => (
                  <NewsCard key={i} article={a} onClick={handleArticleClick} />
                ))}
              </div>
            </section>
          )}
        </article>

        {/* Right Sidebar: Berita Terpopuler — matching detail mockup */}
        <aside className="w-full lg:w-72 xl:w-80 flex-shrink-0">
          <div className="sticky top-20">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-1 h-6 bg-slate-900 rounded-full" />
              <h2 className="text-lg font-bold text-slate-900">Berita Terpopuler</h2>
            </div>
            <div className="space-y-5">
              {popularArticles.map((a, i) => (
                <PopularCard
                  key={i}
                  article={a}
                  index={i}
                  onClick={handleArticleClick}
                />
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Detail;

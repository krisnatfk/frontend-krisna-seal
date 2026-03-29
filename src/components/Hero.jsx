import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar, ExternalLink } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { id } from 'date-fns/locale';

const Hero = ({ articles, onClick }) => {
  const [current, setCurrent] = useState(0);

  if (!articles || articles.length === 0) return null;

  const heroItems = articles.slice(0, 5);
  const article = heroItems[current];
  const totalPages = heroItems.length;

  const goTo = (idx) => {
    if (idx >= 0 && idx < totalPages) setCurrent(idx);
  };

  return (
    <section className="mb-14">
      {/* Headline label — matching mockup exactly */}
      <div className="mb-5">
        <span className="text-sky-500 text-sm font-semibold">Headline</span>
      </div>

      {/* Two-column layout: Text left, Image right */}
      <div className="flex flex-col md:flex-row gap-8 md:gap-12">
        {/* Left column — text content */}
        <div className="flex-1 min-w-0 flex flex-col justify-center">
          <h1
            className="text-2xl sm:text-3xl md:text-[28px] lg:text-[32px] font-bold text-slate-900 leading-tight mb-4 cursor-pointer hover:text-slate-700 transition-colors"
            onClick={() => onClick(article)}
          >
            {article.title}
          </h1>

          <p className="text-slate-600 text-sm leading-relaxed mb-5 line-clamp-4">
            {article.snippet}
          </p>

          {/* Date — "22 Januari 2024" format matching mockup */}
          <div className="flex items-center text-sm text-slate-500 mb-5">
            <Calendar className="w-4 h-4 mr-2 text-slate-400" />
            <span>
              {article.isoDate
                ? format(parseISO(article.isoDate), 'dd MMMM yyyy', { locale: id })
                : ''}
            </span>
          </div>

          {/* "Baca Selengkapnya" link matching mockup */}
          <button
            onClick={() => onClick(article)}
            className="inline-flex items-center gap-1.5 text-sky-500 text-sm font-medium hover:text-sky-600 transition-colors w-fit"
          >
            Baca Selengkapnya <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Right column — image */}
        <div
          className="w-full md:w-[420px] lg:w-[500px] xl:w-[540px] flex-shrink-0 aspect-[16/10] rounded-xl overflow-hidden bg-slate-100 cursor-pointer"
          onClick={() => onClick(article)}
        >
          <img
            src={article.imageUrl || 'https://placehold.co/540x340?text=Berita+Kini'}
            alt={article.title}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Carousel Pagination — "< 1 dari 5 >" matching mockup */}
      <div className="flex items-center justify-center gap-3 mt-8">
        <button
          onClick={() => goTo(current - 1)}
          disabled={current === 0}
          className="w-8 h-8 flex items-center justify-center rounded-full border border-slate-200 hover:bg-slate-50 disabled:opacity-30 transition-colors"
        >
          <ChevronLeft className="w-4 h-4 text-slate-500" />
        </button>
        <span className="text-sm text-slate-600 font-medium min-w-[60px] text-center">
          {current + 1} <span className="text-slate-400 font-normal">dari</span> {totalPages}
        </span>
        <button
          onClick={() => goTo(current + 1)}
          disabled={current === totalPages - 1}
          className="w-8 h-8 flex items-center justify-center rounded-full border border-slate-200 hover:bg-slate-50 disabled:opacity-30 transition-colors"
        >
          <ChevronRight className="w-4 h-4 text-slate-500" />
        </button>
      </div>
    </section>
  );
};

export default Hero;

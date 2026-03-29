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
    <section className="mb-10 pt-6">
      {/* Two-column layout: Text left, Image right — balanced 50/50 spacing matching Figma */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-start">
        {/* Left column — text content */}
        <div className="flex flex-col justify-start pr-0 md:pr-4 lg:pr-8">
          {/* Headline label — moved down and changed to black */}
          <p className="text-gray-900 text-[13px] font-semibold tracking-wide mb-3">Headline</p>

          <h1
            className="text-2xl sm:text-3xl md:text-[28px] lg:text-[32px] font-bold text-slate-800 leading-snug mb-4 cursor-pointer hover:text-sky-600 transition-colors"
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
          className="w-full aspect-[16/10] rounded-2xl overflow-hidden bg-slate-100 cursor-pointer shadow-sm hover:shadow-md transition-shadow"
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

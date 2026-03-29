import React from 'react';
import { format, parseISO } from 'date-fns';
import { id } from 'date-fns/locale';

const NewsCard = ({ article, onClick }) => {
  if (!article) return null;

  const sourceName = article.source === 'antara-news' ? 'Antara' : 'CNN';
  const categoryColor = article.source === 'antara-news' ? 'text-emerald-600' : 'text-sky-500';

  return (
    <div
      onClick={() => onClick(article)}
      className="group flex flex-col bg-white rounded-lg overflow-hidden cursor-pointer h-full hover:shadow-md transition-shadow duration-300"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
        <img
          src={article.imageUrl || 'https://placehold.co/400x300?text=No+Image'}
          alt={article.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="pt-3 pb-2 flex-1 flex flex-col">
        <h3 className="font-semibold text-slate-900 text-sm leading-snug line-clamp-3 mb-2 group-hover:text-sky-600 transition-colors">
          {article.title}
        </h3>
        <div className="mt-auto flex items-center text-xs gap-1.5">
          <span className={`font-semibold ${categoryColor}`}>{sourceName}</span>
          <span className="text-slate-300">•</span>
          <span className="text-slate-500">
            {article.isoDate
              ? format(parseISO(article.isoDate), 'dd MMM yyyy', { locale: id })
              : ''}
          </span>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;

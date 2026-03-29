import React from 'react';
import { format, parseISO } from 'date-fns';
import { id } from 'date-fns/locale';

const PopularCard = ({ article, index, onClick }) => {
  if (!article) return null;

  const sourceName = article.source === 'antara-news' ? 'Antara' : 'CNN';

  return (
    <div
      onClick={() => onClick(article)}
      className="flex items-start gap-4 cursor-pointer group"
    >
      {/* Thumbnail with ranking badge */}
      <div className="relative w-28 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-slate-100">
        <img
          src={article.imageUrl || 'https://placehold.co/120x80?text=No+Image'}
          alt={article.title}
          loading="lazy"
          className="w-full h-full object-cover"
        />
        {/* Number badge */}
        <div className="absolute top-1.5 left-1.5 w-6 h-6 bg-sky-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
          {index + 1}
        </div>
      </div>

      {/* Text */}
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-semibold text-slate-900 line-clamp-2 group-hover:text-sky-600 transition-colors leading-snug">
          {article.title}
        </h4>
        <div className="flex items-center text-xs gap-1.5 mt-1.5">
          <span className="text-sky-500 font-semibold">{sourceName}</span>
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

export default PopularCard;

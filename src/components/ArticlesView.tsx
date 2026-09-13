import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Article } from '../types';
import { AdBanner } from './AdBanner';
import {
  BookOpen,
  Bookmark,
  BookmarkCheck,
  Clock,
  Share2,
  Search,
  Filter,
  Eye,
  Heart,
  ChevronRight,
  WifiOff,
} from 'lucide-react';

export const ArticlesView: React.FC = () => {
  const {
    articles,
    language,
    t,
    navigate,
    toggleBookmarkArticle,
    isArticleBookmarked,
  } = useApp();

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = articles.filter((art) => {
    const matchesCat = selectedCategory === 'all' || art.category === selectedCategory;
    const title = (art.title[language] || art.title.en).toLowerCase();
    const matchesSearch = !searchQuery || title.includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div id="articles-view" className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Editorial Header */}
      <div className="rounded-3xl bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 p-6 sm:p-10 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 max-w-2xl space-y-3">
          <span className="px-3 py-1 rounded-full bg-black/20 text-white font-bold text-xs uppercase tracking-wider backdrop-blur-xs">
            MyClub Editorial & News
          </span>
          <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
            {t('nav.news')}
          </h1>
          <p className="text-xs sm:text-sm text-white/90 leading-relaxed">
            {language === 'ar'
              ? 'مقالات حصرية في تقنيات الفنون القتالية، التغذية والاستشفاء، تغطيات البطولات وحوارات خاصة مع أبطال ومدربي الشرق الأوسط وشمال إفريقيا.'
              : 'Cutting-edge combat sports breakdown, nutritional protocols, competition analysis, and technique masterclasses with offline sync.'}
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          {[
            { id: 'all', label: language === 'ar' ? 'جميع المقالات' : 'All Topics' },
            { id: 'technique', label: language === 'ar' ? 'التقنيات والتكتيك' : 'Techniques' },
            { id: 'nutrition', label: language === 'ar' ? 'التغذية والاستشفاء' : 'Nutrition' },
            { id: 'competition', label: language === 'ar' ? 'تحليل البطولات' : 'Tournaments' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors whitespace-nowrap cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-amber-500 text-slate-950 shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 rtl:left-auto rtl:right-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t('filter.searchPlaceholder')}
            className="w-full pl-9 pr-3 rtl:pr-9 rtl:pl-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-amber-500 outline-none"
          />
        </div>
      </div>

      {/* Featured Top Article */}
      {filtered.length > 0 && (
        <div
          onClick={() => navigate(`/article/${filtered[0].id}`)}
          className="group relative rounded-3xl overflow-hidden bg-slate-950 text-white shadow-2xl border border-slate-200 dark:border-slate-800 cursor-pointer grid grid-cols-1 lg:grid-cols-12"
        >
          <div className="lg:col-span-7 relative min-h-[260px] sm:min-h-[360px] overflow-hidden">
            <img
              src={filtered[0].coverImage}
              alt={filtered[0].title[language] || filtered[0].title.en}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
          </div>

          <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full text-xs font-black bg-amber-500 text-slate-950 uppercase">
                  Featured Story
                </span>
                <span className="text-xs text-slate-400 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{filtered[0].readTimeMinutes} {t('article.readTime')}</span>
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl font-black text-white group-hover:text-amber-400 transition-colors leading-snug">
                {filtered[0].title[language] || filtered[0].title.en}
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 line-clamp-3">
                {filtered[0].summary[language] || filtered[0].summary.en}
              </p>
            </div>

            <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={filtered[0].author.avatar}
                  alt={filtered[0].author.name}
                  className="w-9 h-9 rounded-full object-cover ring-2 ring-amber-500"
                />
                <div>
                  <div className="font-bold text-xs text-white">{filtered[0].author.name}</div>
                  <div className="text-[10px] text-slate-400">{filtered[0].publishedAt}</div>
                </div>
              </div>

              <span className="text-xs font-bold text-amber-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform rtl:group-hover:-translate-x-1">
                <span>{t('action.readMore')}</span>
                <ChevronRight className="w-4 h-4 rtl:rotate-180" />
              </span>
            </div>
          </div>
        </div>
      )}

      {/* In-feed Ad Banner */}
      <AdBanner type="infeed" />

      {/* Grid of Remaining Articles */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.slice(1).map((art) => {
          const bookmarked = isArticleBookmarked(art.id);
          return (
            <div
              key={art.id}
              onClick={() => navigate(`/article/${art.id}`)}
              className="group rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden cursor-pointer"
            >
              <div className="relative h-48 w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
                <img
                  src={art.coverImage}
                  alt={art.title[language] || art.title.en}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-amber-500 text-slate-950 uppercase">
                    {art.category}
                  </span>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleBookmarkArticle(art.id);
                    }}
                    title={bookmarked ? t('action.saved') : t('action.save')}
                    className={`p-1.5 rounded-full backdrop-blur-md transition-all cursor-pointer ${
                      bookmarked
                        ? 'bg-amber-500 text-slate-950 shadow-md'
                        : 'bg-black/50 text-white hover:bg-black/80'
                    }`}
                  >
                    {bookmarked ? (
                      <BookmarkCheck className="w-4 h-4" />
                    ) : (
                      <Bookmark className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h3 className="font-bold text-base text-slate-900 dark:text-slate-100 group-hover:text-amber-600 transition-colors line-clamp-2">
                    {art.title[language] || art.title.en}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                    {art.summary[language] || art.summary.en}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-400">
                  <div className="flex items-center gap-2">
                    <img
                      src={art.author.avatar}
                      alt={art.author.name}
                      className="w-5 h-5 rounded-full object-cover"
                    />
                    <span className="truncate max-w-[120px]">{art.author.name}</span>
                  </div>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{art.readTimeMinutes} min</span>
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { AdBanner } from './AdBanner';
import {
  ChevronLeft,
  Clock,
  Calendar,
  Share2,
  Bookmark,
  BookmarkCheck,
  CheckCircle2,
  Heart,
  Eye,
  WifiOff,
  Building,
  Tag,
  ArrowRight,
} from 'lucide-react';

interface ArticleDetailViewProps {
  articleId: string;
}

export const ArticleDetailView: React.FC<ArticleDetailViewProps> = ({ articleId }) => {
  const {
    articles,
    clubs,
    language,
    t,
    navigate,
    toggleBookmarkArticle,
    isArticleBookmarked,
  } = useApp();

  const article = articles.find((a) => a.id === articleId || a.slug === articleId) || articles[0];
  const bookmarked = isArticleBookmarked(article.id);
  const [copiedLink, setCopiedLink] = useState(false);
  const [likesCount, setLikesCount] = useState(article.likes);
  const [hasLiked, setHasLiked] = useState(false);

  const relatedArticles = articles
    .filter((a) => a.id !== article.id && a.discipline === article.discipline)
    .slice(0, 2);

  const handleCopyLink = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const handleShareSocial = (platform: 'whatsapp' | 'facebook' | 'twitter') => {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(article.title[language] || article.title.en);

    if (platform === 'whatsapp') {
      window.open(`https://api.whatsapp.com/send?text=${title}%20${url}`, '_blank');
    } else if (platform === 'facebook') {
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
    } else if (platform === 'twitter') {
      window.open(`https://twitter.com/intent/tweet?text=${title}&url=${url}`, '_blank');
    }
  };

  const handleLike = () => {
    if (!hasLiked) {
      setLikesCount((prev) => prev + 1);
      setHasLiked(true);
    } else {
      setLikesCount((prev) => prev - 1);
      setHasLiked(false);
    }
  };

  return (
    <article id={`article-page-${article.id}`} className="max-w-4xl mx-auto px-3 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Breadcrumb & Actions */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate('/articles')}
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-amber-600 dark:hover:text-amber-400 cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4 rtl:rotate-180" />
          <span>{language === 'ar' ? 'العودة إلى المقالات' : 'Back to News & Articles'}</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={() => toggleBookmarkArticle(article.id)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              bookmarked
                ? 'bg-amber-500 text-slate-950 shadow-md'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
            }`}
          >
            {bookmarked ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
            <span>{bookmarked ? t('action.saved') : t('action.save')}</span>
          </button>
        </div>
      </div>

      {/* Offline Storage Notice Banner */}
      {bookmarked && (
        <div className="p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 text-xs text-emerald-800 dark:text-emerald-300 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
            <span>{t('article.offlineNotice')}</span>
          </div>
          <span className="px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-900 text-[10px] font-bold uppercase">
            Offline Ready
          </span>
        </div>
      )}

      {/* Article Header */}
      <header className="space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="px-3 py-1 rounded-full text-xs font-black bg-amber-500 text-slate-950 uppercase tracking-wider">
            {t(`discipline.${article.discipline}`)}
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 uppercase">
            {article.category}
          </span>
          {article.clubId && article.clubName && (
            <button
              onClick={() => navigate(`/club/${article.clubId}`)}
              className="px-3 py-1 rounded-full text-xs font-medium bg-amber-50 dark:bg-amber-950/50 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-900 flex items-center gap-1 hover:underline cursor-pointer"
            >
              <Building className="w-3.5 h-3.5" />
              <span>{article.clubName[language] || article.clubName.en}</span>
            </button>
          )}
        </div>

        <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white leading-tight tracking-tight">
          {article.title[language] || article.title.en}
        </h1>

        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
          {article.summary[language] || article.summary.en}
        </p>

        {/* Author Meta & Social Share Bar */}
        <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img
              src={article.author.avatar}
              alt={article.author.name}
              className="w-11 h-11 rounded-full object-cover ring-2 ring-amber-500/40"
            />
            <div>
              <div className="font-bold text-sm text-slate-900 dark:text-slate-100">
                {article.author.name}
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400">
                {article.author.role} • {article.publishedAt}
              </div>
            </div>
          </div>

          {/* Social Media Share Buttons */}
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-slate-400 mr-1 hidden sm:inline">
              {t('action.share')}:
            </span>
            <button
              onClick={() => handleShareSocial('whatsapp')}
              className="p-2 rounded-xl bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366]/20 transition-colors cursor-pointer"
              title="Share via WhatsApp"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.699c.97.549 1.771.849 2.796.849 3.182 0 5.768-2.587 5.769-5.766.001-3.182-2.585-5.769-5.769-5.769zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.007c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.181-.076.355.101.173.449.741.963 1.201.662.591 1.221.774 1.394.86.174.086.275.072.376-.044.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.203c.043.072.043.419-.101.824z" />
              </svg>
            </button>
            <button
              onClick={() => handleShareSocial('facebook')}
              className="p-2 rounded-xl bg-[#1877F2]/10 text-[#1877F2] hover:bg-[#1877F2]/20 transition-colors cursor-pointer"
              title="Share via Facebook"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </button>
            <button
              onClick={() => handleShareSocial('twitter')}
              className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 cursor-pointer"
              title="Share via X / Twitter"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </button>
            <button
              onClick={handleCopyLink}
              className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 cursor-pointer"
              title="Copy Direct Link"
            >
              <Share2 className="w-4 h-4" />
            </button>
            {copiedLink && (
              <span className="text-xs text-emerald-600 font-bold px-1.5">
                {language === 'ar' ? 'تم النسخ!' : 'Copied!'}
              </span>
            )}
          </div>
        </div>
      </header>

      {/* Hero Image */}
      <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800 aspect-video max-h-[440px] w-full">
        <img
          src={article.coverImage}
          alt={article.title[language] || article.title.en}
          className="w-full h-full object-cover"
        />
      </div>

      {/* In-Article Leaderboard Ad */}
      <AdBanner type="leaderboard" />

      {/* Article Markdown/Rich Body */}
      <div className="prose dark:prose-invert max-w-none text-slate-800 dark:text-slate-200 leading-relaxed space-y-4 text-base sm:text-lg">
        <div className="whitespace-pre-line leading-loose">
          {article.content[language] || article.content.en}
        </div>
      </div>

      {/* Tags */}
      <div className="pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center gap-2">
        <Tag className="w-4 h-4 text-slate-400" />
        {article.tags.map((tag) => (
          <span
            key={tag}
            className="px-3 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold"
          >
            #{tag}
          </span>
        ))}
      </div>

      {/* Like and Engagement bar */}
      <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
        <button
          onClick={handleLike}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            hasLiked
              ? 'bg-rose-500 text-white shadow-md'
              : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100'
          }`}
        >
          <Heart className={`w-4 h-4 ${hasLiked ? 'fill-current' : ''}`} />
          <span>{likesCount} {language === 'ar' ? 'إعجاب' : 'Likes'}</span>
        </button>

        <div className="text-xs text-slate-400 flex items-center gap-1.5">
          <Eye className="w-4 h-4" />
          <span>{article.views + 1} {language === 'ar' ? 'مشاهدة' : 'reads'}</span>
        </div>
      </div>

      {/* Related Articles in Same Discipline */}
      {relatedArticles.length > 0 && (
        <div className="pt-8 space-y-4">
          <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">
            {language === 'ar' ? 'مقالات ذات صلة' : 'Related Combat Articles'}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {relatedArticles.map((rel) => (
              <div
                key={rel.id}
                onClick={() => navigate(`/article/${rel.id}`)}
                className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-amber-500 cursor-pointer transition-all flex gap-3"
              >
                <img
                  src={rel.coverImage}
                  alt={rel.title[language] || rel.title.en}
                  className="w-24 h-20 rounded-xl object-cover shrink-0"
                />
                <div className="flex-1 flex flex-col justify-between">
                  <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-slate-100 line-clamp-2">
                    {rel.title[language] || rel.title.en}
                  </h4>
                  <span className="text-[11px] text-slate-400 flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {rel.readTimeMinutes} min
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </article>
  );
};

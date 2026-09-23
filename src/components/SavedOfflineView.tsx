'use client';
import React, { useState } from 'react';
import { useApp } from '@/lib/app-context';
import { AdBanner } from './AdBanner';
import { useRouter } from 'next/navigation';
import {
  Bookmark,
  BookmarkCheck,
  Trash2,
  Clock,
  Wifi,
  WifiOff,
  CheckCircle2,
  ExternalLink,
  BookOpen,
} from 'lucide-react';

export const SavedOfflineView: React.FC = () => {
  const {
    offlineArticles,
    toggleBookmarkArticle,
    language,
    t,
  } = useApp();
  const router = useRouter();

  const [simulatedOffline, setSimulatedOffline] = useState(false);

  return (
    <div id="saved-offline-view" className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-500">
              <Bookmark className="w-5 h-5" />
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
              {t('nav.saved')}
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            {language === 'ar'
              ? 'المقالات والتقنيات المحفوظة محلياً للمطالعة في أي وقت حتى بدون اتصال بالإنترنت.'
              : 'Cached technical guides and articles synchronized in local storage for zero-connectivity reading.'}
          </p>
        </div>

        {/* Offline Mode Tester Toggle */}
        <button
          onClick={() => setSimulatedOffline(!simulatedOffline)}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
            simulatedOffline
              ? 'bg-rose-500 text-white shadow-md'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
          }`}
        >
          {simulatedOffline ? <WifiOff className="w-4 h-4" /> : <Wifi className="w-4 h-4" />}
          <span>
            {simulatedOffline
              ? (language === 'ar' ? 'وضع عدم الاتصال: مفعّل' : 'Simulating Offline Mode: Active')
              : (language === 'ar' ? 'اختبار وضع عدم الاتصال' : 'Test Offline Mode')}
          </span>
        </button>
      </div>

      {simulatedOffline && (
        <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800 text-xs text-amber-900 dark:text-amber-300 flex items-center gap-2">
          <WifiOff className="w-4 h-4 shrink-0 text-amber-600" />
          <span>
            {language === 'ar'
              ? 'أنت تتصفح حالياً المحتوى المحفوظ محلياً فقط. جميع المقالات المعروضة أدناه متاحة للقراءة بدون اتصال شبكي.'
              : 'You are currently testing offline reading mode. All bookmarked articles below are safely stored in browser storage.'}
          </span>
        </div>
      )}

      {offlineArticles.length === 0 ? (
        <div className="p-12 text-center rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
          <BookOpen className="w-12 h-12 text-slate-400 mx-auto" />
          <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
            {language === 'ar' ? 'لم تقم بحفظ أي مقال حتى الآن' : 'No saved articles yet'}
          </h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            {language === 'ar'
              ? 'اضغط على رمز الحفظ (Bookmark) في أي مقال تقني أو إخباري لتحميله للقراءة بدون اتصال بالإنترنت.'
              : 'Click the bookmark icon on any technique or news article to save it for offline reading on your device.'}
          </p>
          <button
            onClick={() => router.push('/articles')}
            className="px-6 py-2.5 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs shadow-md cursor-pointer"
          >
            {language === 'ar' ? 'استعراض المقالات' : 'Browse Articles'}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {offlineArticles.map((art) => (
            <div
              key={art.id}
              className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col justify-between"
            >
              <div className="relative h-44 w-full bg-slate-800">
                <img
                  src={art.coverImage}
                  alt={art.title[language] || art.title.en}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 px-2 py-0.5 rounded bg-emerald-500 text-white font-bold text-[10px] flex items-center gap-1 shadow-sm">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>{t('action.offlineSaved')}</span>
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <span className="text-[10px] font-bold text-amber-600 dark:text-amber-400 uppercase block mb-1">
                    {art.category}
                  </span>
                  <h4
                    onClick={() => router.push(`/article/${art.id}`)}
                    className="font-bold text-base text-slate-900 dark:text-slate-100 hover:text-amber-600 cursor-pointer line-clamp-2"
                  >
                    {art.title[language] || art.title.en}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mt-1">
                    {art.summary[language] || art.summary.en}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <button
                    onClick={() => router.push(`/article/${art.id}`)}
                    className="px-3.5 py-1.5 rounded-xl bg-slate-900 dark:bg-amber-500 text-white dark:text-slate-950 font-bold text-xs cursor-pointer flex items-center gap-1"
                  >
                    <span>{t('action.readMore')}</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>

                  <button
                    onClick={() => toggleBookmarkArticle(art.id)}
                    className="p-1.5 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded-lg cursor-pointer transition-colors"
                    title="Remove from saved"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <AdBanner type="leaderboard" />
    </div>
  );
};

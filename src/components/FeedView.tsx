'use client';
import React, { useState } from 'react';
import { useApp } from '@/lib/app-context';
import { ClubCard } from './ClubCard';
import { AdBanner } from './AdBanner';
import { useRouter } from 'next/navigation';
import {
  Sparkles,
  Bell,
  CheckCircle2,
  Bookmark,
  Compass,
  ArrowRight,
  Filter,
  Flame,
  Clock,
} from 'lucide-react';

export const FeedView: React.FC = () => {
  const {
    clubs,
    articles,
    competitions,
    watchedClubs,
    notifications,
    language,
    t,
    hasPushPermission,
    requestPushPermission,
  } = useApp();
  const router = useRouter();

  const [pushStatusMessage, setPushStatusMessage] = useState('');

  const watchedClubsList = clubs.filter((c) => watchedClubs.includes(c.id));
  const feedArticles = articles.filter(
    (a) => (a.clubId && watchedClubs.includes(a.clubId)) || a.featured
  );

  const handleEnablePush = async () => {
    const granted = await requestPushPermission();
    if (granted) {
      setPushStatusMessage(t('notif.pushGranted'));
      setTimeout(() => setPushStatusMessage(''), 3000);
    }
  };

  return (
    <div id="personalized-feed-view" className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Feed Hero */}
      <div className="rounded-3xl bg-gradient-to-r from-amber-500 via-orange-500 to-red-600 p-6 sm:p-10 text-slate-950 shadow-xl relative overflow-hidden">
        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-950 text-amber-400 font-extrabold text-xs uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t('nav.feed')}</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-slate-950">
            {language === 'ar' ? 'خلاصتك الرياضية المخصصة' : 'Your Custom Fight Feed'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-900 font-medium leading-relaxed">
            {language === 'ar'
              ? 'تحديثات حصرية وتنبيهات فورية من النوادي والبطولات التي تتابعها، بالإضافة إلى المقالات المختارة وفق اهتماماتك.'
              : 'Real-time updates, schedule adjustments, and tournament brackets streaming from your watched martial arts dojos.'}
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={handleEnablePush}
              className="px-4 py-2 rounded-xl bg-slate-950 hover:bg-slate-900 text-white font-bold text-xs shadow-md flex items-center gap-2 cursor-pointer transition-transform active:scale-95"
            >
              <Bell className="w-4 h-4 text-amber-400" />
              <span>{hasPushPermission ? t('notif.pushGranted') : t('notif.enablePush')}</span>
            </button>
            {pushStatusMessage && (
              <span className="text-xs font-bold text-slate-950 bg-white/70 px-2.5 py-1 rounded-lg">
                {pushStatusMessage}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Watched Clubs Quick Strip */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-lg text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Bookmark className="w-5 h-5 text-amber-500" />
            <span>{language === 'ar' ? 'النوادي التي تتابعها' : 'Watched Clubs'} ({watchedClubsList.length})</span>
          </h3>
          <button
            onClick={() => router.push('/clubs')}
            className="text-xs font-semibold text-amber-600 dark:text-amber-400 hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>{language === 'ar' ? 'استكشف نوادي جديدة' : 'Discover More Clubs'}</span>
            <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
          </button>
        </div>

        {watchedClubsList.length === 0 ? (
          <div className="p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center space-y-3">
            <Compass className="w-12 h-12 text-slate-400 mx-auto" />
            <div className="font-bold text-slate-800 dark:text-slate-200 text-base">
              {language === 'ar' ? 'لم تقم بمتابعة أي نادٍ حتى الآن' : 'You are not watching any clubs yet'}
            </div>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              {language === 'ar'
                ? 'تصفح دليل الأندية واضغط على علامة المتابعة لتلقي تحديثات الحصص والإشعارات الفورية هنا.'
                : 'Browse our MENA directory and bookmark dojos to personalize your news and schedule stream.'}
            </p>
            <button
              onClick={() => router.push('/clubs')}
              className="px-5 py-2.5 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs shadow-md cursor-pointer"
            >
              {language === 'ar' ? 'تصفح دليل الأندية' : 'Browse Clubs'}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {watchedClubsList.map((club) => (
              <ClubCard key={club.id} club={club} />
            ))}
          </div>
        )}
      </div>

      <AdBanner type="leaderboard" />

      {/* Feed Articles Stream */}
      <div className="space-y-4">
        <h3 className="font-bold text-lg text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <Flame className="w-5 h-5 text-orange-500" />
          <span>{language === 'ar' ? 'أحدث المنشورات من الأندية المتابعة' : 'Recent Dojo Posts & Articles'}</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {feedArticles.map((art) => (
            <div
              key={art.id}
              onClick={() => router.push(`/article/${art.id}`)}
              className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-amber-500 transition-all flex flex-col justify-between cursor-pointer space-y-3"
            >
              <div className="flex gap-4">
                <img
                  src={art.coverImage}
                  alt={art.title[language] || art.title.en}
                  className="w-28 h-24 rounded-xl object-cover shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between text-[11px] text-amber-600 dark:text-amber-400 font-bold uppercase mb-1">
                    <span>{art.category}</span>
                    <span className="text-slate-400 font-normal">{art.readTimeMinutes} min</span>
                  </div>
                  <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100 line-clamp-2">
                    {art.title[language] || art.title.en}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mt-1">
                    {art.summary[language] || art.summary.en}
                  </p>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-400">
                <span>By {art.author.name}</span>
                <span className="text-amber-600 font-semibold flex items-center gap-1">
                  <span>{t('action.readMore')}</span>
                  <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

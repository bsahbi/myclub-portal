'use client';
import React, { useState } from 'react';
import { useApp } from '@/lib/app-context';
import { ClubCard } from './ClubCard';
import { AdBanner } from './AdBanner';
import { useRouter } from 'next/navigation';
import {
  Search,
  Trophy,
  Flame,
  Shield,
  Award,
  Video,
  Play,
  ArrowRight,
  Bookmark,
  CheckCircle,
  Users,
  Compass,
  Sparkles,
  MapPin,
  X,
  UserCheck,
  Building,
  ShieldCheck,
  PlusCircle,
  Briefcase,
} from 'lucide-react';

export const HomeView: React.FC = () => {
  const {
    clubs,
    coaches,
    athletes,
    organizers,
    articles,
    competitions,
    setSubscribeModalOpen,
    setActiveDirectoryTab,
    language,
    t,
  } = useApp();
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState('');
  const [activeVideo, setActiveVideo] = useState<{ url: string; title: string } | null>(null);

  const featuredClubs = clubs.slice(0, 3);
  const featuredCoaches = coaches.slice(0, 3);
  const featuredAthletes = athletes.slice(0, 3);
  const liveCompetitions = competitions.filter((c) => c.status === 'live');
  const upcomingCompetitions = competitions.filter((c) => c.status === 'upcoming').slice(0, 2);
  const recentArticles = articles.slice(0, 3);

  const disciplines = [
    { key: 'bjj', name: t('discipline.bjj'), icon: '🥋', count: '38 Dojos' },
    { key: 'karate', name: t('discipline.karate'), icon: '🥊', count: '29 Clubs' },
    { key: 'muaythai', name: t('discipline.muaythai'), icon: '⚔️', count: '18 Gyms' },
    { key: 'taekwondo', name: t('discipline.taekwondo'), icon: '⚡', count: '24 Centers' },
    { key: 'mma', name: t('discipline.mma'), icon: '🛡️', count: '22 Cages' },
    { key: 'judo', name: t('discipline.judo'), icon: '🥇', count: '16 Dojos' },
  ];

  const handleHeroSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/clubs');
  };

  return (
    <div id="home-view" className="space-y-12 pb-12">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white py-16 sm:py-24 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        {/* Background decorative fight grid */}
        <div className="absolute inset-0 bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:24px_24px] opacity-10" />
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-orange-600/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-5xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold tracking-wide uppercase shadow-inner">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t('hero.tagline')}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
            {t('hero.title')}
          </h1>

          <p className="max-w-2xl mx-auto text-sm sm:text-base text-slate-300 font-normal leading-relaxed">
            {t('hero.subtitle')}
          </p>

          {/* Search Bar */}
          <form
            onSubmit={handleHeroSearch}
            className="max-w-2xl mx-auto mt-8 flex flex-col sm:flex-row gap-2 p-2 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl"
          >
            <div className="relative flex-1 flex items-center">
              <Search className="w-5 h-5 text-amber-400 absolute left-4 rtl:left-auto rtl:right-4" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t('filter.searchPlaceholder')}
                className="w-full pl-12 pr-4 rtl:pr-12 rtl:pl-4 py-3 bg-transparent text-white placeholder-slate-400 outline-none text-sm"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black text-xs sm:text-sm transition-all transform active:scale-95 shadow-lg shadow-amber-500/25 flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>{t('action.search')}</span>
              <ArrowRight className="w-4 h-4 rtl:rotate-180" />
            </button>
          </form>

          {/* Quick Discipline Pills */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-2">
            {disciplines.map((d) => (
              <button
                key={d.key}
                onClick={() => router.push('/clubs')}
                className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-slate-300 hover:text-white transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <span>{d.icon}</span>
                <span>{d.name}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* LIVE TOURNAMENT BANNER (if any) */}
      {liveCompetitions.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl bg-gradient-to-r from-rose-950 via-red-900 to-slate-950 border border-rose-800 p-4 sm:p-5 text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
            <div className="flex items-center gap-3">
              <span className="w-3 h-3 rounded-full bg-rose-500 animate-ping shrink-0" />
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider bg-rose-500 px-2 py-0.5 rounded text-white mr-2">
                  {t('filter.status.live')}
                </span>
                <span className="font-bold text-sm sm:text-base">
                  {liveCompetitions[0].title[language] || liveCompetitions[0].title.en}
                </span>
                <span className="text-xs text-rose-300 block sm:inline sm:ml-2">
                  • {liveCompetitions[0].city} ({liveCompetitions[0].venue})
                </span>
              </div>
            </div>

            <button
              onClick={() => router.push('/competitions')}
              className="px-4 py-2 rounded-xl bg-white text-rose-950 hover:bg-rose-100 font-bold text-xs shadow-md shrink-0 flex items-center gap-1.5 cursor-pointer"
            >
              <Video className="w-4 h-4 text-rose-600" />
              <span>{t('comp.liveStream')}</span>
            </button>
          </div>
        </div>
      )}

      {/* LEADERBOARD TOP AD */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AdBanner type="leaderboard" />
      </div>

      {/* FEATURED CLUBS & PROMOTIONAL VIDEOS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex items-end justify-between">
          <div>
            <span className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
              {language === 'ar' ? 'أكاديميات النخبة' : 'Verified Academies'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
              {language === 'ar' ? 'أندية مميزة مع جولات فيديو' : 'Featured Dojos with Video Tours'}
            </h2>
          </div>
          <button
            onClick={() => router.push('/clubs')}
            className="text-xs sm:text-sm font-bold text-amber-600 dark:text-amber-400 hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>{t('nav.clubs')}</span>
            <ArrowRight className="w-4 h-4 rtl:rotate-180" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredClubs.map((club) => (
            <ClubCard
              key={club.id}
              club={club}
              onOpenVideo={(url, title) => setActiveVideo({ url, title })}
            />
          ))}
        </div>
      </section>

      {/* MEMBER DIRECTORY SPOTLIGHT: COACHES & ATHLETES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex items-end justify-between flex-wrap gap-4">
          <div>
            <span className="text-xs font-bold text-red-600 dark:text-red-400 uppercase tracking-wider">
              {t('directory.title')}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
              {t('directory.subtitle')}
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setActiveDirectoryTab('coaches');
                router.push('/clubs');
              }}
              className="text-xs sm:text-sm font-bold text-red-600 dark:text-red-400 hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>{t('directory.tab.coaches')}</span>
              <ArrowRight className="w-4 h-4 rtl:rotate-180" />
            </button>
            <button
              onClick={() => setSubscribeModalOpen(true)}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl shadow-md transition flex items-center gap-1.5"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>{t('subscribe.btn')}</span>
            </button>
          </div>
        </div>

        {/* 3 Featured Coaches Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredCoaches.map((coach) => (
            <div
              key={coach.id}
              className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-lg hover:border-red-500/40 transition flex flex-col justify-between"
            >
              <div className="relative h-28 w-full overflow-hidden">
                <img
                  src={coach.coverImage}
                  alt={coach.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent" />
                <span className="absolute top-2.5 end-2.5 px-2 py-0.5 rounded-full text-[10px] font-bold bg-white/90 dark:bg-slate-900/90 text-slate-800 dark:text-slate-200 backdrop-blur-sm">
                  {t(`discipline.${coach.discipline}`)}
                </span>
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between">
                <div className="flex items-start gap-3 -mt-8 mb-2">
                  <img
                    src={coach.avatar}
                    alt={coach.name}
                    className="w-14 h-14 rounded-xl object-cover ring-2 ring-white dark:ring-slate-900 shadow-md"
                  />
                  <div className="pt-4">
                    <h3 className="font-bold text-slate-900 dark:text-white text-sm">
                      {coach.name}
                    </h3>
                    <span className="text-[11px] text-slate-500 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-slate-400" />
                      {coach.city}, {coach.country}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 mb-3">
                  {coach.title[language]}
                </p>

                <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                    {coach.hourlyRate ? `$${coach.hourlyRate.amount}/hr` : 'Verified Coach'}
                  </span>
                  <button
                    onClick={() => router.push(`/coach/${coach.id}`)}
                    className="text-xs font-bold text-red-600 dark:text-red-400 hover:underline flex items-center gap-1"
                  >
                    <span>{t('action.viewDetails')}</span>
                    <ArrowRight className="w-3 h-3 rtl:rotate-180" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 3 Featured Athletes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
          {featuredAthletes.map((athlete) => (
            <div
              key={athlete.id}
              className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-lg hover:border-amber-500/50 transition flex flex-col justify-between"
            >
              <div className="relative h-28 w-full overflow-hidden">
                <img
                  src={athlete.coverImage}
                  alt={athlete.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent" />
                <span className="absolute top-2.5 end-2.5 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500 text-slate-950">
                  {athlete.ranking}
                </span>
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between">
                <div className="flex items-start gap-3 -mt-8 mb-2">
                  <img
                    src={athlete.avatar}
                    alt={athlete.name}
                    className="w-14 h-14 rounded-xl object-cover ring-2 ring-white dark:ring-slate-900 shadow-md"
                  />
                  <div className="pt-4">
                    <h3 className="font-bold text-slate-900 dark:text-white text-sm">
                      {athlete.name}
                    </h3>
                    <span className="text-[11px] text-amber-600 dark:text-amber-400 font-semibold">
                      {athlete.category}
                    </span>
                  </div>
                </div>

                {athlete.record && (
                  <div className="text-xs py-1.5 px-2.5 rounded-lg bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold flex items-center justify-between mb-3">
                    <span className="text-emerald-600 dark:text-emerald-400">{athlete.record.wins} Wins</span>
                    <span className="text-red-500">{athlete.record.losses} Losses</span>
                    <span className="text-amber-500">{athlete.medals.length} Medals</span>
                  </div>
                )}

                <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <span className="text-xs text-slate-500">
                    {t(`discipline.${athlete.discipline}`)}
                  </span>
                  <button
                    onClick={() => router.push(`/athlete/${athlete.id}`)}
                    className="text-xs font-bold text-amber-600 dark:text-amber-400 hover:underline flex items-center gap-1"
                  >
                    <span>{t('action.viewDetails')}</span>
                    <ArrowRight className="w-3 h-3 rtl:rotate-180" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* EXPLORE BY DISCIPLINE CARDS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div>
          <span className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
            Disciplines
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
            {language === 'ar' ? 'استكشف حسب الفن القتالي' : 'Choose Your Combat Discipline'}
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {disciplines.map((d) => (
            <div
              key={d.key}
              onClick={() => router.push('/clubs')}
              className="group p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-amber-500 hover:shadow-lg transition-all text-center cursor-pointer space-y-2"
            >
              <div className="text-3xl group-hover:scale-110 transition-transform">
                {d.icon}
              </div>
              <h3 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-slate-100 group-hover:text-amber-600">
                {d.name}
              </h3>
              <span className="text-[10px] text-slate-400 font-medium block">
                {d.count}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* IN-FEED AD BANNER */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AdBanner type="infeed" />
      </div>

      {/* RUNNING & UPCOMING COMPETITIONS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex items-end justify-between">
          <div>
            <span className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
              {t('nav.competitions')}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
              {language === 'ar' ? 'بطولات الشرق الأوسط وشمال إفريقيا' : 'Championships & Tournaments'}
            </h2>
          </div>
          <button
            onClick={() => router.push('/competitions')}
            className="text-xs sm:text-sm font-bold text-amber-600 dark:text-amber-400 hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>{t('filter.status.all')}</span>
            <ArrowRight className="w-4 h-4 rtl:rotate-180" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {upcomingCompetitions.map((comp) => (
            <div
              key={comp.id}
              onClick={() => router.push('/competitions')}
              className="group p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-amber-500 transition-all flex flex-col sm:flex-row gap-4 cursor-pointer"
            >
              <img
                src={comp.coverImage}
                alt={comp.title[language] || comp.title.en}
                className="w-full sm:w-44 h-36 rounded-xl object-cover"
              />
              <div className="flex-1 flex flex-col justify-between space-y-2">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-300 uppercase">
                      {t(`discipline.${comp.discipline}`)}
                    </span>
                    <span className="text-xs text-rose-500 font-bold">
                      {comp.startDate}
                    </span>
                  </div>
                  <h4 className="font-bold text-sm sm:text-base text-slate-900 dark:text-slate-100 group-hover:text-amber-600 line-clamp-2 mt-1">
                    {comp.title[language] || comp.title.en}
                  </h4>
                  <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-amber-500" />
                    <span>{comp.city}, {comp.country}</span>
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-700 dark:text-slate-300">
                    Purse: {comp.prizePool || 'Medals'}
                  </span>
                  <span className="text-amber-600 font-bold flex items-center gap-1">
                    <span>{t('action.viewDetails')}</span>
                    <ArrowRight className="w-3 h-3 rtl:rotate-180" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* EDITORIAL NEWS & TECHNIQUE ARTICLES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex items-end justify-between">
          <div>
            <span className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
              {t('nav.news')}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
              {language === 'ar' ? 'مقالات وتقنيات مع حفظ للقراءة دون إنترنت' : 'Techniques & News (Offline-Ready)'}
            </h2>
          </div>
          <button
            onClick={() => router.push('/articles')}
            className="text-xs sm:text-sm font-bold text-amber-600 dark:text-amber-400 hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>{language === 'ar' ? 'جميع المقالات' : 'Read All'}</span>
            <ArrowRight className="w-4 h-4 rtl:rotate-180" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recentArticles.map((art) => (
            <div
              key={art.id}
              onClick={() => router.push(`/article/${art.id}`)}
              className="group rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all overflow-hidden flex flex-col justify-between cursor-pointer"
            >
              <div className="relative h-44 w-full overflow-hidden">
                <img
                  src={art.coverImage}
                  alt={art.title[language] || art.title.en}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-amber-500 text-slate-950 uppercase shadow-xs">
                  {art.category}
                </span>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <h4 className="font-bold text-base text-slate-900 dark:text-slate-100 group-hover:text-amber-600 line-clamp-2">
                    {art.title[language] || art.title.en}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mt-1">
                    {art.summary[language] || art.summary.en}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-400">
                  <span>{art.author.name}</span>
                  <span className="text-amber-600 font-bold">{art.readTimeMinutes} min</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PROMOTIONAL VIDEO MODAL */}
      {activeVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xs">
          <div className="relative w-full max-w-4xl bg-black rounded-2xl overflow-hidden shadow-2xl">
            <div className="p-4 bg-slate-950 text-white flex items-center justify-between border-b border-slate-800">
              <span className="font-bold text-sm flex items-center gap-2">
                <Play className="w-4 h-4 text-amber-500 fill-current" />
                <span>{activeVideo.title} — {t('action.watchVideo')}</span>
              </span>
              <button
                onClick={() => setActiveVideo(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="relative aspect-video w-full">
              <iframe
                src={activeVideo.url}
                title={activeVideo.title}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

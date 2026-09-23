'use client';
import React, { useState } from 'react';
import { useApp } from '@/lib/app-context';
import { Competition, CompetitionStatus, MartialArtDiscipline } from '../types';
import { AdBanner } from './AdBanner';
import {
  Trophy,
  Calendar,
  MapPin,
  Flame,
  Award,
  Users,
  ExternalLink,
  Search,
  Filter,
  Video,
  ChevronRight,
  ShieldAlert,
  Clock,
} from 'lucide-react';

export const CompetitionsView: React.FC = () => {
  const { competitions, language, t,} = useApp();
  const [selectedStatus, setSelectedStatus] = useState<CompetitionStatus | 'all'>('all');
  const [selectedDiscipline, setSelectedDiscipline] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeModalComp, setActiveModalComp] = useState<Competition | null>(null);

  const filtered = competitions.filter((comp) => {
    const matchesStatus = selectedStatus === 'all' || comp.status === selectedStatus;
    const matchesDiscipline = selectedDiscipline === 'all' || comp.discipline === selectedDiscipline;
    const title = (comp.title[language] || comp.title.en).toLowerCase();
    const city = comp.city.toLowerCase();
    const matchesSearch = !searchQuery || title.includes(searchQuery.toLowerCase()) || city.includes(searchQuery.toLowerCase());
    return matchesStatus && matchesDiscipline && matchesSearch;
  });

  return (
    <div id="competitions-view" className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-slate-900 via-slate-800 to-amber-950 p-6 sm:p-10 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10 text-9xl select-none">
          🏆
        </div>
        <div className="relative z-10 max-w-2xl space-y-3">
          <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 font-bold text-xs uppercase tracking-wider">
            MENA Martial Arts Tournaments
          </span>
          <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
            {t('nav.competitions')}
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {language === 'ar'
              ? 'دليلك الشامل لبطولات الجيو جيتسو، الكاراتيه، التايكوندو، المواي تاي والـ MMA في الشرق الأوسط وشمال إفريقيا مع النتائج، شجرة النزالات ومعلومات المنظمين.'
              : 'Official hub for premier combat sports tournaments across MENA. Track running events, upcoming qualifiers, brackets, prize purses, and certified organizers.'}
          </p>
        </div>
      </div>

      {/* Ad Placement */}
      <AdBanner type="infeed" />

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row gap-3 items-center justify-between">
        {/* Status Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
          {[
            { id: 'all', label: t('filter.status.all') },
            { id: 'live', label: t('filter.status.live'), isLive: true },
            { id: 'upcoming', label: t('filter.status.upcoming') },
            { id: 'completed', label: t('filter.status.completed') },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setSelectedStatus(item.id as any)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                selectedStatus === item.id
                  ? item.isLive
                    ? 'bg-rose-500 text-white shadow-md animate-pulse'
                    : 'bg-amber-500 text-slate-950 shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
              }`}
            >
              {item.isLive && <span className="w-2 h-2 rounded-full bg-white animate-ping" />}
              <span>{item.label}</span>
            </button>
          ))}
        </div>

        {/* Discipline & Search input */}
        <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
          <select
            value={selectedDiscipline}
            onChange={(e) => setSelectedDiscipline(e.target.value)}
            className="px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-amber-500 outline-none"
          >
            <option value="all">{t('filter.allDisciplines')}</option>
            <option value="bjj">{t('discipline.bjj')}</option>
            <option value="karate">{t('discipline.karate')}</option>
            <option value="muaythai">{t('discipline.muaythai')}</option>
            <option value="taekwondo">{t('discipline.taekwondo')}</option>
            <option value="mma">{t('discipline.mma')}</option>
            <option value="judo">{t('discipline.judo')}</option>
          </select>

          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 rtl:left-auto rtl:right-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('filter.searchPlaceholder')}
              className="pl-9 pr-3 rtl:pr-9 rtl:pl-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-amber-500 outline-none w-full sm:w-60"
            />
          </div>
        </div>
      </div>

      {/* Competitions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((comp) => (
          <div
            key={comp.id}
            onClick={() => setActiveModalComp(comp)}
            className="group rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden cursor-pointer"
          >
            {/* Image Header with status badge */}
            <div className="relative h-44 w-full overflow-hidden bg-slate-800">
              <img
                src={comp.coverImage}
                alt={comp.title[language] || comp.title.en}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

              <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-500 text-slate-950 uppercase tracking-wide">
                  {t(`discipline.${comp.discipline}`)}
                </span>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 ${
                    comp.status === 'live'
                      ? 'bg-rose-500 text-white shadow-lg animate-pulse'
                      : comp.status === 'upcoming'
                      ? 'bg-sky-500 text-white'
                      : 'bg-slate-700 text-slate-300'
                  }`}
                >
                  {comp.status === 'live' && <span className="w-2 h-2 bg-white rounded-full" />}
                  <span>{comp.status}</span>
                </span>
              </div>

              {comp.prizePool && (
                <div className="absolute bottom-2.5 left-3 px-2 py-0.5 rounded bg-amber-400 text-slate-950 font-black text-xs shadow-md">
                  {t('comp.prizePool')} {comp.prizePool}
                </div>
              )}
            </div>

            {/* Content Body */}
            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <h3 className="font-bold text-base text-slate-900 dark:text-slate-100 group-hover:text-amber-600 transition-colors line-clamp-2">
                  {comp.title[language] || comp.title.en}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                  {comp.description[language] || comp.description.en}
                </p>
              </div>

              {/* Tournament Meta */}
              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2 text-xs text-slate-600 dark:text-slate-400">
                <div className="flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5 text-amber-500" />
                  <span>{comp.startDate} → {comp.endDate}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-amber-500" />
                  <span className="truncate">{comp.venue}, {comp.city}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-3.5 h-3.5 text-amber-500" />
                  <span>{comp.registeredAthletesCount} {t('comp.athletes')}</span>
                </div>
              </div>

              {/* Organizer Badge & Action */}
              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <img
                    src={comp.organizer.logo}
                    alt={comp.organizer.name}
                    className="w-6 h-6 rounded-md object-cover ring-1 ring-slate-200"
                  />
                  <span className="text-[11px] font-semibold text-slate-700 dark:text-slate-300 truncate max-w-[120px]">
                    {comp.organizer.name}
                  </span>
                </div>

                <span className="text-xs font-bold text-amber-600 dark:text-amber-400 flex items-center gap-1 group-hover:underline">
                  <span>{language === 'ar' ? 'التفاصيل والقرعة' : 'Details & Brackets'}</span>
                  <ChevronRight className="w-3.5 h-3.5 rtl:rotate-180" />
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL: COMPETITION DETAIL & BRACKETS PREVIEW */}
      {activeModalComp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs">
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl p-6 sm:p-8 space-y-6">
            <button
              onClick={() => setActiveModalComp(null)}
              className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
            >
              ✕
            </button>

            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2.5 py-0.5 rounded-full bg-amber-500 text-slate-950 font-bold text-xs uppercase">
                  {t(`discipline.${activeModalComp.discipline}`)}
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold text-xs">
                  {activeModalComp.status.toUpperCase()}
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-slate-100">
                {activeModalComp.title[language] || activeModalComp.title.en}
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                {activeModalComp.venue} • {activeModalComp.city}, {activeModalComp.country}
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700">
                <span className="text-[10px] text-slate-400 uppercase font-bold block">{t('comp.entryFee')}</span>
                <span className="font-extrabold text-sm text-slate-900 dark:text-slate-100">{activeModalComp.entryFee}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700">
                <span className="text-[10px] text-slate-400 uppercase font-bold block">{t('comp.prizePool')}</span>
                <span className="font-extrabold text-sm text-amber-600 dark:text-amber-400">{activeModalComp.prizePool || 'Medals & Trophies'}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700">
                <span className="text-[10px] text-slate-400 uppercase font-bold block">{t('comp.deadline')}</span>
                <span className="font-bold text-xs text-rose-600 dark:text-rose-400">{activeModalComp.registrationDeadline}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700">
                <span className="text-[10px] text-slate-400 uppercase font-bold block">{t('comp.athletes')}</span>
                <span className="font-extrabold text-sm text-slate-900 dark:text-slate-100">{activeModalComp.registeredAthletesCount}</span>
              </div>
            </div>

            {/* Organizer Credential */}
            <div className="p-4 rounded-2xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-900/40 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={activeModalComp.organizer.logo}
                  alt={activeModalComp.organizer.name}
                  className="w-12 h-12 rounded-xl object-cover ring-2 ring-amber-500"
                />
                <div>
                  <span className="text-[10px] font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider block">
                    {t('comp.organizer')}
                  </span>
                  <div className="font-bold text-sm text-slate-900 dark:text-slate-100">
                    {activeModalComp.organizer.name}
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">
                    {activeModalComp.organizer.association}
                  </div>
                </div>
              </div>
              <a
                href={`mailto:${activeModalComp.organizer.contact}`}
                className="text-xs font-semibold text-amber-700 dark:text-amber-300 underline"
              >
                {activeModalComp.organizer.contact}
              </a>
            </div>

            {/* Categories & Weight Divisions */}
            <div>
              <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100 mb-2">
                {t('comp.categories')}
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {activeModalComp.categories.map((cat, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800 text-xs text-slate-700 dark:text-slate-300 flex items-center gap-2"
                  >
                    <Award className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                    <span>{cat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Results if completed */}
            {activeModalComp.results && activeModalComp.results.length > 0 && (
              <div>
                <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100 mb-2">
                  {language === 'ar' ? 'النتائج ومنصة التتويج' : 'Podium & Official Results'}
                </h4>
                <div className="space-y-2">
                  {activeModalComp.results.map((res, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs space-y-1"
                    >
                      <div className="font-bold text-slate-900 dark:text-white">{res.category}</div>
                      <div className="flex items-center gap-2 text-amber-500 font-semibold">
                        <span>🥇 Gold:</span> <span className="text-slate-800 dark:text-slate-200">{res.gold}</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-400 font-semibold">
                        <span>🥈 Silver:</span> <span className="text-slate-800 dark:text-slate-200">{res.silver}</span>
                      </div>
                      <div className="flex items-center gap-2 text-amber-700 font-semibold">
                        <span>🥉 Bronze:</span> <span className="text-slate-800 dark:text-slate-200">{res.bronze}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="pt-2 flex flex-wrap gap-2 justify-end">
              <button
                onClick={() => setActiveModalComp(null)}
                className="px-4 py-2 text-xs font-semibold rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
              >
                {t('action.close')}
              </button>
              {activeModalComp.status === 'live' && (
                <button
                  onClick={() => window.open(activeModalComp.liveStreamUrl || 'https://youtube.com', '_blank')}
                  className="px-5 py-2 text-xs font-bold rounded-xl bg-rose-500 hover:bg-rose-600 text-white flex items-center gap-1.5 shadow-md cursor-pointer"
                >
                  <Video className="w-3.5 h-3.5" />
                  <span>{t('comp.liveStream')}</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

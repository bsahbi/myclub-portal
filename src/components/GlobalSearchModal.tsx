import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { Club, Coach, Athlete, Article, MartialArtDiscipline } from '../types';
import {
  Search,
  X,
  Shield,
  UserCheck,
  Trophy,
  BookOpen,
  MapPin,
  Star,
  Clock,
  ArrowRight,
  Flame,
  Sparkles,
  DollarSign,
  ChevronRight,
  Filter,
} from 'lucide-react';

type SearchFilterType = 'all' | 'clubs' | 'coaches' | 'athletes' | 'articles';

interface SearchResultItem {
  id: string;
  type: 'club' | 'coach' | 'athlete' | 'article';
  title: string;
  subtitle: string;
  tag: string;
  badgeColor: string;
  image: string;
  extraInfo?: string;
  route: string;
}

export const GlobalSearchModal: React.FC = () => {
  const {
    searchModalOpen,
    setSearchModalOpen,
    clubs,
    coaches,
    athletes,
    articles,
    language,
    t,
    navigate,
  } = useApp();

  const [query, setQuery] = useState('');
  const [selectedType, setSelectedType] = useState<SearchFilterType>('all');
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsContainerRef = useRef<HTMLDivElement>(null);

  // Focus input on open & reset state
  useEffect(() => {
    if (searchModalOpen) {
      setSelectedIndex(0);
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
      return () => clearTimeout(timer);
    } else {
      setQuery('');
      setSelectedType('all');
    }
  }, [searchModalOpen]);

  // Suggested keywords when query is empty
  const suggestedKeywords = [
    { label: 'Brazilian Jiu-Jitsu', query: 'bjj' },
    { label: 'MMA Cage', query: 'mma' },
    { label: 'Black Belt Coach', query: 'black belt' },
    { label: 'Casablanca', query: 'casablanca' },
    { label: 'Dubai', query: 'dubai' },
    { label: 'Boxing', query: 'boxing' },
    { label: 'Karate', query: 'karate' },
    { label: 'Guard Retention', query: 'guard' },
  ];

  // Normalized search query
  const cleanQuery = query.trim().toLowerCase();

  // Search Results across all 4 requested entities
  const searchResults = useMemo(() => {
    if (!cleanQuery) return [];

    const results: SearchResultItem[] = [];

    // 1. Clubs
    clubs.forEach((club) => {
      const name = (club.name[language] || club.name.en || club.name.ar || '').toLowerCase();
      const city = club.city.toLowerCase();
      const country = club.country.toLowerCase();
      const discipline = club.discipline.toLowerCase();
      const allDisciplines = club.allDisciplines.join(' ').toLowerCase();
      const tagline = (club.tagline[language] || club.tagline.en || '').toLowerCase();
      const desc = (club.description[language] || club.description.en || '').toLowerCase();
      const instructors = club.instructors.map((i) => i.name.toLowerCase()).join(' ');

      const isMatch =
        name.includes(cleanQuery) ||
        city.includes(cleanQuery) ||
        country.includes(cleanQuery) ||
        discipline.includes(cleanQuery) ||
        allDisciplines.includes(cleanQuery) ||
        tagline.includes(cleanQuery) ||
        desc.includes(cleanQuery) ||
        instructors.includes(cleanQuery);

      if (isMatch) {
        results.push({
          id: club.id,
          type: 'club',
          title: club.name[language] || club.name.en,
          subtitle: `${club.city}, ${club.country} • ${t(`discipline.${club.discipline}`)}`,
          tag: t('search.clubs'),
          badgeColor: 'bg-amber-100 text-amber-900 dark:bg-amber-950/80 dark:text-amber-300 border-amber-300 dark:border-amber-800',
          image: club.logo || club.coverImage,
          extraInfo: `★ ${club.rating} (${club.reviewCount})`,
          route: `/club/${club.id}`,
        });
      }
    });

    // 2. Coaches
    coaches.forEach((coach) => {
      const name = coach.name.toLowerCase();
      const title = (coach.title[language] || coach.title.en || coach.title.ar || '').toLowerCase();
      const bio = (coach.bio[language] || coach.bio.en || coach.bio.ar || '').toLowerCase();
      const rank = coach.rank.toLowerCase();
      const discipline = coach.discipline.toLowerCase();
      const allDisciplines = coach.allDisciplines.join(' ').toLowerCase();
      const city = coach.city.toLowerCase();
      const country = coach.country.toLowerCase();
      const skills = coach.skills.join(' ').toLowerCase();
      const certifications = coach.certifications.join(' ').toLowerCase();

      const isMatch =
        name.includes(cleanQuery) ||
        title.includes(cleanQuery) ||
        bio.includes(cleanQuery) ||
        rank.includes(cleanQuery) ||
        discipline.includes(cleanQuery) ||
        allDisciplines.includes(cleanQuery) ||
        city.includes(cleanQuery) ||
        country.includes(cleanQuery) ||
        skills.includes(cleanQuery) ||
        certifications.includes(cleanQuery);

      if (isMatch) {
        results.push({
          id: coach.id,
          type: 'coach',
          title: coach.name,
          subtitle: `${coach.rank} • ${t(`discipline.${coach.discipline}`)} (${coach.city})`,
          tag: t('search.coaches'),
          badgeColor: 'bg-red-100 text-red-900 dark:bg-red-950/80 dark:text-red-300 border-red-300 dark:border-red-800',
          image: coach.avatar,
          extraInfo: coach.hourlyRate ? `$${coach.hourlyRate.amount}/hr` : `${coach.experienceYears}y exp`,
          route: `/coach/${coach.id}`,
        });
      }
    });

    // 3. Athletes
    athletes.forEach((athlete) => {
      const name = athlete.name.toLowerCase();
      const nickname = (athlete.nickname || '').toLowerCase();
      const category = athlete.category.toLowerCase();
      const ranking = athlete.ranking.toLowerCase();
      const discipline = athlete.discipline.toLowerCase();
      const city = athlete.city.toLowerCase();
      const country = athlete.country.toLowerCase();
      const bio = (athlete.bio[language] || athlete.bio.en || athlete.bio.ar || '').toLowerCase();
      const rank = athlete.rank.toLowerCase();
      const medalEvents = athlete.medals.map((m) => m.event.toLowerCase()).join(' ');

      const isMatch =
        name.includes(cleanQuery) ||
        nickname.includes(cleanQuery) ||
        category.includes(cleanQuery) ||
        ranking.includes(cleanQuery) ||
        rank.includes(cleanQuery) ||
        discipline.includes(cleanQuery) ||
        city.includes(cleanQuery) ||
        country.includes(cleanQuery) ||
        bio.includes(cleanQuery) ||
        medalEvents.includes(cleanQuery);

      if (isMatch) {
        results.push({
          id: athlete.id,
          type: 'athlete',
          title: athlete.name + (athlete.nickname ? ` "${athlete.nickname}"` : ''),
          subtitle: `${athlete.category} • ${athlete.ranking} (${athlete.city})`,
          tag: t('search.athletes'),
          badgeColor: 'bg-emerald-100 text-emerald-900 dark:bg-emerald-950/80 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800',
          image: athlete.avatar,
          extraInfo: athlete.record ? `${athlete.record.wins}W-${athlete.record.losses}L` : athlete.ranking,
          route: `/athlete/${athlete.id}`,
        });
      }
    });

    // 4. Articles
    articles.forEach((article) => {
      const title = (article.title[language] || article.title.en || article.title.ar || '').toLowerCase();
      const summary = (article.summary[language] || article.summary.en || article.summary.ar || '').toLowerCase();
      const content = (article.content[language] || article.content.en || article.content.ar || '').toLowerCase();
      const category = article.category.toLowerCase();
      const author = article.author.name.toLowerCase();
      const tags = (article.tags || []).join(' ').toLowerCase();

      const isMatch =
        title.includes(cleanQuery) ||
        summary.includes(cleanQuery) ||
        content.includes(cleanQuery) ||
        category.includes(cleanQuery) ||
        author.includes(cleanQuery) ||
        tags.includes(cleanQuery);

      if (isMatch) {
        results.push({
          id: article.id,
          type: 'article',
          title: article.title[language] || article.title.en,
          subtitle: `${article.author.name} • ${article.category.toUpperCase()}`,
          tag: t('search.articles'),
          badgeColor: 'bg-sky-100 text-sky-900 dark:bg-sky-950/80 dark:text-sky-300 border-sky-300 dark:border-sky-800',
          image: article.coverImage,
          extraInfo: `${article.readTimeMinutes} min read`,
          route: `/article/${article.id}`,
        });
      }
    });

    return results;
  }, [cleanQuery, clubs, coaches, athletes, articles, language, t]);

  // Counts per entity for the current search query
  const counts = useMemo(() => {
    const c = {
      all: searchResults.length,
      clubs: 0,
      coaches: 0,
      athletes: 0,
      articles: 0,
    };
    searchResults.forEach((item) => {
      if (item.type === 'club') c.clubs++;
      if (item.type === 'coach') c.coaches++;
      if (item.type === 'athlete') c.athletes++;
      if (item.type === 'article') c.articles++;
    });
    return c;
  }, [searchResults]);

  // Filtered by active tab
  const filteredResults = useMemo(() => {
    if (selectedType === 'all') return searchResults;
    if (selectedType === 'clubs') return searchResults.filter((r) => r.type === 'club');
    if (selectedType === 'coaches') return searchResults.filter((r) => r.type === 'coach');
    if (selectedType === 'athletes') return searchResults.filter((r) => r.type === 'athlete');
    if (selectedType === 'articles') return searchResults.filter((r) => r.type === 'article');
    return searchResults;
  }, [searchResults, selectedType]);

  // Reset selected index when filtered results change
  useEffect(() => {
    setSelectedIndex(0);
  }, [filteredResults.length, selectedType]);

  // Handle item navigation
  const handleSelect = (item: SearchResultItem) => {
    setSearchModalOpen(false);
    navigate(item.route);
  };

  // Keyboard Navigation: Up, Down, Enter, Esc
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      setSearchModalOpen(false);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (filteredResults.length > 0) {
        setSelectedIndex((prev) => (prev + 1) % filteredResults.length);
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (filteredResults.length > 0) {
        setSelectedIndex((prev) => (prev - 1 + filteredResults.length) % filteredResults.length);
      }
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredResults.length > 0 && filteredResults[selectedIndex]) {
        handleSelect(filteredResults[selectedIndex]);
      }
    }
  };

  if (!searchModalOpen) return null;

  return (
    <div
      id="global-search-overlay"
      className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-start justify-center pt-12 sm:pt-20 px-3 sm:px-4 animate-in fade-in duration-150"
      onClick={() => setSearchModalOpen(false)}
    >
      <div
        id="global-search-modal"
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-3xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[82vh] text-start transition-all"
        onKeyDown={handleKeyDown}
      >
        {/* Search Header Bar with Input */}
        <div className="p-3 sm:p-4 border-b border-slate-200 dark:border-slate-800 flex items-center gap-3 bg-slate-50/50 dark:bg-slate-900/50">
          <Search className="w-5 h-5 text-amber-500 shrink-0 ms-1" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t('search.placeholder')}
            className="flex-1 bg-transparent border-0 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 text-sm sm:text-base outline-none focus:ring-0"
          />
          {query && (
            <button
              onClick={() => {
                setQuery('');
                inputRef.current?.focus();
              }}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-200/50 dark:hover:bg-slate-800 transition cursor-pointer"
              title="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={() => setSearchModalOpen(false)}
            className="px-2 py-1 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-mono transition cursor-pointer"
          >
            Esc
          </button>
        </div>

        {/* Entity Filter Tabs (Clubs, Coaches, Athletes, Articles) */}
        <div className="px-3 sm:px-4 py-2.5 border-b border-slate-100 dark:border-slate-800/80 bg-white dark:bg-slate-900 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setSelectedType('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
              selectedType === 'all'
                ? 'bg-amber-500 text-slate-950 font-bold shadow-xs'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            <span>{t('search.all')}</span>
            {cleanQuery && (
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${selectedType === 'all' ? 'bg-slate-950/20 text-slate-950' : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'}`}>
                {counts.all}
              </span>
            )}
          </button>

          <button
            onClick={() => setSelectedType('clubs')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
              selectedType === 'clubs'
                ? 'bg-amber-500 text-slate-950 font-bold shadow-xs'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            <Shield className="w-3.5 h-3.5" />
            <span>{t('search.clubs')}</span>
            {cleanQuery && (
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${selectedType === 'clubs' ? 'bg-slate-950/20 text-slate-950' : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'}`}>
                {counts.clubs}
              </span>
            )}
          </button>

          <button
            onClick={() => setSelectedType('coaches')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
              selectedType === 'coaches'
                ? 'bg-red-600 text-white font-bold shadow-xs'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            <UserCheck className="w-3.5 h-3.5" />
            <span>{t('search.coaches')}</span>
            {cleanQuery && (
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${selectedType === 'coaches' ? 'bg-white/25 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'}`}>
                {counts.coaches}
              </span>
            )}
          </button>

          <button
            onClick={() => setSelectedType('athletes')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
              selectedType === 'athletes'
                ? 'bg-emerald-600 text-white font-bold shadow-xs'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            <Trophy className="w-3.5 h-3.5" />
            <span>{t('search.athletes')}</span>
            {cleanQuery && (
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${selectedType === 'athletes' ? 'bg-white/25 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'}`}>
                {counts.athletes}
              </span>
            )}
          </button>

          <button
            onClick={() => setSelectedType('articles')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
              selectedType === 'articles'
                ? 'bg-sky-600 text-white font-bold shadow-xs'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>{t('search.articles')}</span>
            {cleanQuery && (
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${selectedType === 'articles' ? 'bg-white/25 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'}`}>
                {counts.articles}
              </span>
            )}
          </button>
        </div>

        {/* Results / Suggestions Body */}
        <div
          ref={resultsContainerRef}
          className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-2 min-h-[220px]"
        >
          {/* STATE 1: Empty Query -> Popular searches and recommendations */}
          {!cleanQuery && (
            <div className="py-6 px-2 space-y-6">
              <div className="text-center space-y-1.5">
                <div className="inline-flex p-3 rounded-full bg-amber-500/10 text-amber-500 mb-1">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-base text-slate-900 dark:text-white">
                  {t('search.title')}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto">
                  {t('search.placeholder')}
                </p>
              </div>

              {/* Suggested Query Chips */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block">
                  {t('search.recent')}
                </span>
                <div className="flex flex-wrap gap-2">
                  {suggestedKeywords.map((item) => (
                    <button
                      key={item.label}
                      onClick={() => setQuery(item.query)}
                      className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 hover:border-amber-500 hover:bg-amber-50 dark:hover:bg-amber-950/20 text-xs text-slate-700 dark:text-slate-300 transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      <Search className="w-3 h-3 text-amber-500" />
                      <span>{item.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Quick Directory Entity Jump */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2">
                <div
                  onClick={() => {
                    setSearchModalOpen(false);
                    navigate('/clubs');
                  }}
                  className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-850 hover:border-amber-500 cursor-pointer transition text-center space-y-1"
                >
                  <Shield className="w-5 h-5 text-amber-500 mx-auto" />
                  <span className="font-bold text-xs text-slate-800 dark:text-slate-200 block">
                    {t('search.clubs')}
                  </span>
                  <span className="text-[10px] text-slate-400">{clubs.length} listings</span>
                </div>

                <div
                  onClick={() => {
                    setSearchModalOpen(false);
                    navigate('/clubs');
                  }}
                  className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-850 hover:border-red-500 cursor-pointer transition text-center space-y-1"
                >
                  <UserCheck className="w-5 h-5 text-red-500 mx-auto" />
                  <span className="font-bold text-xs text-slate-800 dark:text-slate-200 block">
                    {t('search.coaches')}
                  </span>
                  <span className="text-[10px] text-slate-400">{coaches.length} profiles</span>
                </div>

                <div
                  onClick={() => {
                    setSearchModalOpen(false);
                    navigate('/clubs');
                  }}
                  className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-850 hover:border-emerald-500 cursor-pointer transition text-center space-y-1"
                >
                  <Trophy className="w-5 h-5 text-emerald-500 mx-auto" />
                  <span className="font-bold text-xs text-slate-800 dark:text-slate-200 block">
                    {t('search.athletes')}
                  </span>
                  <span className="text-[10px] text-slate-400">{athletes.length} competitors</span>
                </div>

                <div
                  onClick={() => {
                    setSearchModalOpen(false);
                    navigate('/articles');
                  }}
                  className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-850 hover:border-sky-500 cursor-pointer transition text-center space-y-1"
                >
                  <BookOpen className="w-5 h-5 text-sky-500 mx-auto" />
                  <span className="font-bold text-xs text-slate-800 dark:text-slate-200 block">
                    {t('search.articles')}
                  </span>
                  <span className="text-[10px] text-slate-400">{articles.length} guides</span>
                </div>
              </div>
            </div>
          )}

          {/* STATE 2: Has Query, But No Results Found */}
          {cleanQuery && filteredResults.length === 0 && (
            <div className="py-12 px-4 text-center space-y-3">
              <div className="inline-flex p-3 rounded-full bg-rose-500/10 text-rose-500">
                <Search className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                {t('search.noResults')}
              </h4>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                {t('search.tryDifferent')}
              </p>
              <div className="pt-2 flex flex-wrap justify-center gap-2">
                {['BJJ', 'Muay Thai', 'Coach', 'MMA', 'Karate'].map((k) => (
                  <button
                    key={k}
                    onClick={() => setQuery(k.toLowerCase())}
                    className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-amber-500 hover:text-slate-950 transition cursor-pointer"
                  >
                    {k}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STATE 3: Filtered Results List */}
          {cleanQuery && filteredResults.length > 0 && (
            <div className="space-y-1.5">
              {filteredResults.map((item, index) => {
                const isSelected = index === selectedIndex;
                return (
                  <div
                    key={`${item.type}-${item.id}`}
                    onClick={() => handleSelect(item)}
                    onMouseEnter={() => setSelectedIndex(index)}
                    className={`p-3 rounded-xl transition-all flex items-center justify-between gap-3 cursor-pointer border ${
                      isSelected
                        ? 'bg-amber-500/10 dark:bg-amber-500/15 border-amber-500/50 shadow-sm'
                        : 'bg-white dark:bg-slate-850/60 border-slate-100 dark:border-slate-800/80 hover:bg-slate-50 dark:hover:bg-slate-800'
                    }`}
                  >
                    {/* Left: Avatar / Cover thumbnail */}
                    <div className="relative shrink-0">
                      <img
                        src={item.image}
                        alt={item.title}
                        className={`w-11 h-11 object-cover rounded-xl border border-slate-200 dark:border-slate-700 ${
                          item.type === 'athlete' || item.type === 'coach' ? 'rounded-full' : ''
                        }`}
                      />
                    </div>

                    {/* Middle: Title, Subtitle, Entity Badge */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span
                          className={`px-2 py-0.2 rounded-md text-[10px] font-bold uppercase border ${item.badgeColor}`}
                        >
                          {item.tag}
                        </span>
                        {item.extraInfo && (
                          <span className="text-[11px] font-bold text-amber-600 dark:text-amber-400">
                            {item.extraInfo}
                          </span>
                        )}
                      </div>
                      <h4 className="font-bold text-sm text-slate-900 dark:text-white truncate">
                        {item.title}
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                        {item.subtitle}
                      </p>
                    </div>

                    {/* Right: Action Arrow */}
                    <div className="shrink-0 flex items-center gap-1 text-slate-400 group-hover:text-amber-500">
                      <span className="text-xs font-semibold text-amber-600 dark:text-amber-400 hidden sm:inline">
                        {t('action.viewDetails')}
                      </span>
                      <ChevronRight className="w-4 h-4 rtl:rotate-180" />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Modal Footer with Keyboard Shortcuts and Results Summary */}
        <div className="p-3 border-t border-slate-100 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/70 text-xs text-slate-500 dark:text-slate-400 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-mono text-[10px]">
                ↑
              </kbd>
              <kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-mono text-[10px]">
                ↓
              </kbd>
              <span>{t('search.quickKey')}</span>
            </span>
            <span className="sm:hidden">{t('search.quickKey')}</span>
          </div>

          {cleanQuery && (
            <span className="font-semibold text-slate-700 dark:text-slate-300">
              {filteredResults.length} {language === 'ar' ? 'نتائج' : 'results'}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

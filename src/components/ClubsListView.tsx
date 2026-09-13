import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ClubCard } from './ClubCard';
import { AdBanner } from './AdBanner';
import {
  Search,
  Filter,
  MapPin,
  Star,
  Play,
  X,
  ShieldCheck,
  Building,
  UserCheck,
  Trophy,
  Award,
  Sparkles,
  ArrowRight,
  Briefcase,
  Flame,
  Swords,
  DollarSign,
  PlusCircle,
} from 'lucide-react';

export const ClubsListView: React.FC = () => {
  const {
    clubs,
    coaches,
    athletes,
    organizers,
    activeDirectoryTab,
    setActiveDirectoryTab,
    setSubscribeModalOpen,
    language,
    t,
    navigate,
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDiscipline, setSelectedDiscipline] = useState<string>('all');
  const [selectedCountry, setSelectedCountry] = useState<string>('all');
  const [freeTrialOnly, setFreeTrialOnly] = useState(false);
  const [sortBy, setSortBy] = useState<'rating' | 'watchers' | 'priceAsc' | 'priceDesc'>('rating');

  // Video Modal
  const [activeVideo, setActiveVideo] = useState<{ url: string; title: string } | null>(null);

  const countries = [
    { code: 'all', name: t('filter.allCountries') },
    { code: 'MA', name: 'Morocco 🇲🇦' },
    { code: 'EG', name: 'Egypt 🇪🇬' },
    { code: 'AE', name: 'United Arab Emirates 🇦🇪' },
    { code: 'SA', name: 'Saudi Arabia 🇸🇦' },
    { code: 'TN', name: 'Tunisia 🇹🇳' },
    { code: 'JO', name: 'Jordan 🇯🇴' },
  ];

  // 1. Filtered Clubs
  const filteredClubs = clubs
    .filter((club) => {
      const matchesDiscipline =
        selectedDiscipline === 'all' ||
        club.discipline === selectedDiscipline ||
        club.allDisciplines.includes(selectedDiscipline as any);

      const matchesCountry =
        selectedCountry === 'all' || club.countryCode === selectedCountry;

      const matchesTrial = !freeTrialOnly || club.pricing.hasFreeTrial;

      const name = (club.name[language] || club.name.en).toLowerCase();
      const city = club.city.toLowerCase();
      const matchesSearch =
        !searchQuery ||
        name.includes(searchQuery.toLowerCase()) ||
        city.includes(searchQuery.toLowerCase());

      return matchesDiscipline && matchesCountry && matchesTrial && matchesSearch;
    })
    .sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'watchers') return b.watchersCount - a.watchersCount;
      if (sortBy === 'priceAsc') return a.pricing.monthly - b.pricing.monthly;
      if (sortBy === 'priceDesc') return b.pricing.monthly - a.pricing.monthly;
      return 0;
    });

  // 2. Filtered Coaches
  const filteredCoaches = coaches.filter((coach) => {
    const matchesDiscipline =
      selectedDiscipline === 'all' ||
      coach.discipline === selectedDiscipline ||
      coach.allDisciplines.includes(selectedDiscipline as any);

    const matchesCountry =
      selectedCountry === 'all' || coach.countryCode === selectedCountry;

    const name = coach.name.toLowerCase();
    const city = coach.city.toLowerCase();
    const skills = coach.skills.join(' ').toLowerCase();
    const matchesSearch =
      !searchQuery ||
      name.includes(searchQuery.toLowerCase()) ||
      city.includes(searchQuery.toLowerCase()) ||
      skills.includes(searchQuery.toLowerCase());

    return matchesDiscipline && matchesCountry && matchesSearch;
  });

  // 3. Filtered Athletes
  const filteredAthletes = athletes.filter((athlete) => {
    const matchesDiscipline =
      selectedDiscipline === 'all' ||
      athlete.discipline === selectedDiscipline ||
      athlete.allDisciplines?.includes(selectedDiscipline as any);

    const matchesCountry =
      selectedCountry === 'all' || athlete.countryCode === selectedCountry;

    const name = athlete.name.toLowerCase();
    const city = athlete.city.toLowerCase();
    const category = athlete.category.toLowerCase();
    const matchesSearch =
      !searchQuery ||
      name.includes(searchQuery.toLowerCase()) ||
      city.includes(searchQuery.toLowerCase()) ||
      category.includes(searchQuery.toLowerCase());

    return matchesDiscipline && matchesCountry && matchesSearch;
  });

  // 4. Filtered Organizers
  const filteredOrganizers = organizers.filter((org) => {
    const matchesDiscipline =
      selectedDiscipline === 'all' ||
      org.disciplines.includes(selectedDiscipline as any);

    const matchesCountry =
      selectedCountry === 'all' || org.countryCode === selectedCountry;

    const name = (org.name[language] || org.name.en).toLowerCase();
    const city = org.city.toLowerCase();
    const jurisdiction = (org.jurisdiction[language] || org.jurisdiction.en).toLowerCase();
    const matchesSearch =
      !searchQuery ||
      name.includes(searchQuery.toLowerCase()) ||
      city.includes(searchQuery.toLowerCase()) ||
      jurisdiction.includes(searchQuery.toLowerCase());

    return matchesDiscipline && matchesCountry && matchesSearch;
  });

  const currentTabCount =
    activeDirectoryTab === 'clubs'
      ? filteredClubs.length
      : activeDirectoryTab === 'coaches'
      ? filteredCoaches.length
      : activeDirectoryTab === 'athletes'
      ? filteredAthletes.length
      : filteredOrganizers.length;

  return (
    <div id="clubs-directory-view" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in">
      {/* Directory Hero Header Banner */}
      <div className="rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-red-950/80 text-white p-6 sm:p-10 shadow-xl border border-slate-800 relative overflow-hidden">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-600/30 text-red-400 font-bold text-xs uppercase tracking-wider border border-red-500/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t('hero.tagline')}</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
            {t('directory.title')}
          </h1>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl">
            {t('directory.subtitle')}
          </p>

          <div className="pt-2 flex flex-wrap gap-3">
            <button
              onClick={() => setSubscribeModalOpen(true)}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-red-600 hover:bg-red-700 active:bg-red-800 text-white text-xs sm:text-sm font-bold rounded-xl shadow-lg shadow-red-600/25 transition"
            >
              <PlusCircle className="w-4 h-4" />
              <span>{t('subscribe.btn')}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Directory Category Tabs */}
      <div className="flex bg-white dark:bg-slate-900 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-x-auto gap-1">
        {[
          { id: 'clubs', label: t('directory.tab.clubs'), icon: Building, count: clubs.length },
          { id: 'coaches', label: t('directory.tab.coaches'), icon: UserCheck, count: coaches.length },
          { id: 'athletes', label: t('directory.tab.athletes'), icon: Trophy, count: athletes.length },
          { id: 'organizers', label: t('directory.tab.organizers'), icon: Award, count: organizers.length },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeDirectoryTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveDirectoryTab(tab.id as any)}
              className={`flex-1 min-w-[140px] py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition flex items-center justify-center gap-2 whitespace-nowrap ${
                isActive
                  ? 'bg-red-600 text-white shadow-md'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
              <span
                className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                  isActive
                    ? 'bg-white/25 text-white'
                    : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                }`}
              >
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Filter and Search Controller Bar */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Search Input */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3.5 rtl:left-auto rtl:right-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('filter.searchPlaceholder')}
              className="w-full pl-9 pr-3 rtl:pr-9 rtl:pl-3 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-red-500 outline-none"
            />
          </div>

          {/* Discipline Dropdown */}
          <select
            value={selectedDiscipline}
            onChange={(e) => setSelectedDiscipline(e.target.value)}
            className="w-full px-3 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-red-500 outline-none"
          >
            <option value="all">{t('filter.allDisciplines')}</option>
            <option value="bjj">{t('discipline.bjj')}</option>
            <option value="judo">{t('discipline.judo')}</option>
            <option value="karate">{t('discipline.karate')}</option>
            <option value="boxing">{t('discipline.boxing')}</option>
            <option value="kickboxing">{t('discipline.kickboxing')}</option>
            <option value="muaythai">{t('discipline.muaythai')}</option>
            <option value="mma">{t('discipline.mma')}</option>
            <option value="taekwondo">{t('discipline.taekwondo')}</option>
            <option value="wrestling">{t('discipline.wrestling')}</option>
          </select>

          {/* Country Dropdown */}
          <select
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
            className="w-full px-3 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-red-500 outline-none"
          >
            {countries.map((c) => (
              <option key={c.code} value={c.code}>
                {c.name}
              </option>
            ))}
          </select>

          {/* Sort Dropdown */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="w-full px-3 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-red-500 outline-none"
          >
            <option value="rating">{t('filter.sort.rating')}</option>
            <option value="watchers">{t('filter.sort.watchers')}</option>
            <option value="priceAsc">{t('filter.sort.priceAsc')}</option>
            <option value="priceDesc">{t('filter.sort.priceDesc')}</option>
          </select>
        </div>

        {/* Free trial toggle switch (only for clubs tab) */}
        {activeDirectoryTab === 'clubs' && (
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={freeTrialOnly}
                onChange={(e) => setFreeTrialOnly(e.target.checked)}
                className="w-4 h-4 rounded text-red-600 focus:ring-red-500 border-slate-300"
              />
              <span className="font-semibold text-slate-700 dark:text-slate-300">
                {language === 'ar' ? 'عرض النوادي التي توفر حصصاً تجريبية مجانية فقط' : 'Only show clubs offering Free Trial sessions'}
              </span>
            </label>

            <span className="text-slate-400 font-medium">
              {filteredClubs.length} {language === 'ar' ? 'أكاديمية معتمدة' : 'Verified Academies'}
            </span>
          </div>
        )}
      </div>

      {/* Leaderboard Ad Banner */}
      <AdBanner slot="leaderboard" />

      {/* Content depending on Active Tab */}

      {/* 1. CLUBS TAB */}
      {activeDirectoryTab === 'clubs' && (
        <div>
          {filteredClubs.length === 0 ? (
            <div className="p-12 text-center rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
              <Filter className="w-12 h-12 text-slate-400 mx-auto" />
              <h3 className="font-bold text-slate-800 dark:text-slate-200 text-base">
                {language === 'ar' ? 'لا توجد نتائج تطابق بحثك' : 'No clubs match your filter criteria'}
              </h3>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedDiscipline('all');
                  setSelectedCountry('all');
                  setFreeTrialOnly(false);
                }}
                className="px-4 py-2 rounded-xl bg-red-600 text-white font-bold text-xs cursor-pointer shadow"
              >
                {t('action.reset')}
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredClubs.map((club, index) => (
                <React.Fragment key={club.id}>
                  <ClubCard
                    club={club}
                    onOpenVideo={(url, title) => setActiveVideo({ url, title })}
                  />
                  {index === 2 && (
                    <div className="col-span-full">
                      <AdBanner slot="inFeed" />
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>
          )}
        </div>
      )}

      {/* 2. COACHES TAB */}
      {activeDirectoryTab === 'coaches' && (
        <div>
          {filteredCoaches.length === 0 ? (
            <div className="p-12 text-center rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
              <UserCheck className="w-12 h-12 text-slate-400 mx-auto" />
              <h3 className="font-bold text-slate-800 dark:text-slate-200 text-base">
                No coaches match your search criteria
              </h3>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedDiscipline('all');
                  setSelectedCountry('all');
                }}
                className="px-4 py-2 rounded-xl bg-red-600 text-white font-bold text-xs cursor-pointer shadow"
              >
                {t('action.reset')}
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCoaches.map((coach) => (
                <div
                  key={coach.id}
                  className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-lg hover:border-red-500/40 transition flex flex-col justify-between group"
                >
                  <div className="relative h-36 w-full overflow-hidden">
                    <img
                      src={coach.coverImage}
                      alt={coach.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent" />
                    <span className="absolute top-3 end-3 px-2.5 py-0.5 rounded-full text-xs font-bold bg-white/90 dark:bg-slate-900/90 text-slate-800 dark:text-slate-200 backdrop-blur-sm">
                      {t(`discipline.${coach.discipline}`)}
                    </span>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between relative">
                    <div className="flex items-start gap-4 -mt-12 mb-3">
                      <img
                        src={coach.avatar}
                        alt={coach.name}
                        className="w-16 h-16 rounded-2xl object-cover ring-4 ring-white dark:ring-slate-900 shadow-md"
                      />
                      <div className="pt-8">
                        <div className="flex items-center gap-1.5">
                          <h3 className="font-bold text-slate-900 dark:text-white text-base leading-tight">
                            {coach.name}
                          </h3>
                          {coach.verified && (
                            <ShieldCheck className="w-4 h-4 text-blue-500 flex-shrink-0" />
                          )}
                        </div>
                        <span className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                          <MapPin className="w-3.5 h-3.5" />
                          {coach.city}, {coach.country}
                        </span>
                      </div>
                    </div>

                    <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 mb-3">
                      {coach.title[language]}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {coach.skills.slice(0, 3).map((skill, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 text-[11px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-md"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>

                    <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                      <div>
                        {coach.hourlyRate && (
                          <div className="text-xs">
                            <span className="text-slate-400 block">{t('coach.ratePerHour')}</span>
                            <span className="font-extrabold text-slate-900 dark:text-white text-sm">
                              ${coach.hourlyRate.amount}
                            </span>
                          </div>
                        )}
                      </div>

                      <button
                        onClick={() => navigate(`/coach/${coach.id}`)}
                        className="inline-flex items-center gap-1.5 px-4 py-2 bg-red-600 hover:bg-red-700 active:bg-red-800 text-white text-xs font-bold rounded-xl shadow transition"
                      >
                        <span>{t('action.viewDetails')}</span>
                        <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* 3. ATHLETES TAB */}
      {activeDirectoryTab === 'athletes' && (
        <div>
          {filteredAthletes.length === 0 ? (
            <div className="p-12 text-center rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
              <Trophy className="w-12 h-12 text-slate-400 mx-auto" />
              <h3 className="font-bold text-slate-800 dark:text-slate-200 text-base">
                No athlete profiles match your search criteria
              </h3>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedDiscipline('all');
                  setSelectedCountry('all');
                }}
                className="px-4 py-2 rounded-xl bg-red-600 text-white font-bold text-xs cursor-pointer shadow"
              >
                {t('action.reset')}
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAthletes.map((athlete) => (
                <div
                  key={athlete.id}
                  className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-lg hover:border-amber-500/50 transition flex flex-col justify-between group"
                >
                  <div className="relative h-36 w-full overflow-hidden">
                    <img
                      src={athlete.coverImage}
                      alt={athlete.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 to-transparent" />
                    {athlete.sponsorSeeking && (
                      <span className="absolute top-3 start-3 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-500 text-slate-950 flex items-center gap-1 shadow">
                        <Flame className="w-3 h-3" />
                        <span>Sponsor Seeking</span>
                      </span>
                    )}
                    <span className="absolute top-3 end-3 px-2.5 py-0.5 rounded-full text-xs font-bold bg-slate-900/80 text-white backdrop-blur-sm">
                      {t(`discipline.${athlete.discipline}`)}
                    </span>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between relative">
                    <div className="flex items-start gap-4 -mt-12 mb-3">
                      <img
                        src={athlete.avatar}
                        alt={athlete.name}
                        className="w-16 h-16 rounded-2xl object-cover ring-4 ring-white dark:ring-slate-900 shadow-md"
                      />
                      <div className="pt-8">
                        <div className="flex items-center gap-1.5">
                          <h3 className="font-bold text-slate-900 dark:text-white text-base leading-tight">
                            {athlete.name}
                          </h3>
                          {athlete.verified && (
                            <ShieldCheck className="w-4 h-4 text-blue-500 flex-shrink-0" />
                          )}
                        </div>
                        {athlete.nickname && (
                          <span className="text-xs text-red-500 font-semibold italic">
                            "{athlete.nickname}"
                          </span>
                        )}
                      </div>
                    </div>

                    <p className="text-xs text-slate-600 dark:text-slate-300 font-medium mb-3">
                      {athlete.category} • {athlete.ranking}
                    </p>

                    {athlete.record && (
                      <div className="grid grid-cols-3 gap-2 py-2 px-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-center mb-4">
                        <div>
                          <span className="text-sm font-black text-emerald-600 dark:text-emerald-400 block">
                            {athlete.record.wins}W
                          </span>
                          <span className="text-[10px] text-slate-400">Wins</span>
                        </div>
                        <div>
                          <span className="text-sm font-black text-red-600 dark:text-red-400 block">
                            {athlete.record.losses}L
                          </span>
                          <span className="text-[10px] text-slate-400">Losses</span>
                        </div>
                        <div>
                          <span className="text-sm font-black text-amber-500 block">
                            {athlete.medals.length}
                          </span>
                          <span className="text-[10px] text-slate-400">Medals</span>
                        </div>
                      </div>
                    )}

                    <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                      <span className="text-xs text-slate-500 flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5" />
                        {athlete.city}, {athlete.country}
                      </span>

                      <button
                        onClick={() => navigate(`/athlete/${athlete.id}`)}
                        className="inline-flex items-center gap-1.5 px-4 py-2 bg-amber-500 hover:bg-amber-600 active:bg-amber-700 text-slate-950 text-xs font-bold rounded-xl shadow transition"
                      >
                        <span>{t('action.viewDetails')}</span>
                        <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* 4. ORGANIZERS TAB */}
      {activeDirectoryTab === 'organizers' && (
        <div>
          {filteredOrganizers.length === 0 ? (
            <div className="p-12 text-center rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
              <Award className="w-12 h-12 text-slate-400 mx-auto" />
              <h3 className="font-bold text-slate-800 dark:text-slate-200 text-base">
                No event organizers or regulatory entities match criteria
              </h3>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedDiscipline('all');
                  setSelectedCountry('all');
                }}
                className="px-4 py-2 rounded-xl bg-red-600 text-white font-bold text-xs cursor-pointer shadow"
              >
                {t('action.reset')}
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredOrganizers.map((org) => (
                <div
                  key={org.id}
                  className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-lg hover:border-purple-500/50 transition flex flex-col justify-between group"
                >
                  <div className="relative h-36 w-full overflow-hidden">
                    <img
                      src={org.coverImage}
                      alt={org.name[language]}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 to-transparent" />
                    <span className="absolute top-3 end-3 px-2.5 py-0.5 rounded-full text-xs font-bold bg-purple-600 text-white uppercase tracking-wider">
                      {org.type}
                    </span>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between relative">
                    <div className="flex items-start gap-4 -mt-12 mb-3">
                      <img
                        src={org.logo}
                        alt={org.name[language]}
                        className="w-16 h-16 rounded-2xl object-cover ring-4 ring-white dark:ring-slate-900 shadow-md bg-white p-1"
                      />
                      <div className="pt-8">
                        <div className="flex items-center gap-1.5">
                          <h3 className="font-bold text-slate-900 dark:text-white text-base leading-tight">
                            {org.name[language]}
                          </h3>
                          {org.verified && (
                            <ShieldCheck className="w-4 h-4 text-blue-500 flex-shrink-0" />
                          )}
                        </div>
                        <span className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                          <MapPin className="w-3.5 h-3.5" />
                          {org.city}, {org.country}
                        </span>
                      </div>
                    </div>

                    <p className="text-xs text-slate-600 dark:text-slate-300 font-medium line-clamp-2 mb-3">
                      {org.jurisdiction[language]}
                    </p>

                    <div className="p-3 rounded-xl bg-purple-50/50 dark:bg-purple-950/20 border border-purple-100 dark:border-purple-900/30 flex items-center justify-between mb-4">
                      <span className="text-xs text-purple-700 dark:text-purple-300 font-bold">
                        {org.sanctionedEventsCount} Sanctioned Events
                      </span>
                      <span className="text-[11px] text-slate-500">Est. {org.establishedYear}</span>
                    </div>

                    <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                      <span className="text-xs text-slate-400">
                        {org.disciplines.length} Disciplines
                      </span>

                      <button
                        onClick={() => navigate(`/organizer/${org.id}`)}
                        className="inline-flex items-center gap-1.5 px-4 py-2 bg-purple-600 hover:bg-purple-700 active:bg-purple-800 text-white text-xs font-bold rounded-xl shadow transition"
                      >
                        <span>{t('action.viewDetails')}</span>
                        <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Join & Promote Callout at bottom */}
      <div className="rounded-3xl bg-gradient-to-r from-red-600 to-rose-700 text-white p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="space-y-1 text-center sm:text-start">
          <h3 className="text-xl font-bold">
            {t('subscribe.cta')}
          </h3>
          <p className="text-xs sm:text-sm text-red-100 max-w-xl">
            {t('subscribe.modalSubtitle')}
          </p>
        </div>
        <button
          onClick={() => setSubscribeModalOpen(true)}
          className="px-6 py-3 bg-white hover:bg-slate-100 active:bg-slate-200 text-red-600 font-black rounded-xl shadow-lg transition whitespace-nowrap"
        >
          {t('subscribe.btn')}
        </button>
      </div>

      {/* VIDEO POPUP MODAL */}
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

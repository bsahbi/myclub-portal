'use client';
import React, { useState } from 'react';
import { Club, Article } from '../types';
import { useApp } from '@/lib/app-context';
import { InquirySchema } from '../schemas';
import { AdBanner } from './AdBanner';
import { useRouter } from 'next/navigation';
import {
  Star,
  MapPin,
  Phone,
  MessageCircle,
  Mail,
  Globe,
  Calendar,
  Clock,
  Award,
  Users,
  Play,
  BookmarkPlus,
  BookmarkCheck,
  CheckCircle2,
  Share2,
  ChevronLeft,
  ArrowRight,
  ShieldCheck,
  AlertCircle,
  FileText,
  Video,
} from 'lucide-react';

interface ClubDetailViewProps {
  clubId: string;
}

export const ClubDetailView: React.FC<ClubDetailViewProps> = ({ clubId }) => {
  const {
    clubs,
    articles,
    language,
    t,
    toggleWatchClub,
    isWatchingClub,
    submitInquiry,
    toggleBookmarkArticle,
    isArticleBookmarked,
  } = useApp();
  const router = useRouter();

  const club = clubs.find((c) => c.id === clubId || c.slug === clubId) || clubs[0];
  const clubArticles = articles.filter((a) => a.clubId === club.id);
  const watching = isWatchingClub(club.id);

  const [activeTab, setActiveTab] = useState<'overview' | 'instructors' | 'achievements' | 'schedule' | 'news'>('overview');
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [copiedShare, setCopiedShare] = useState(false);

  // Inquiry Form State
  const [inquiryData, setInquiryData] = useState({
    name: '',
    email: '',
    phone: '',
    discipline: club.discipline,
    experienceLevel: 'beginner' as 'beginner' | 'intermediate' | 'advanced',
    preferredTime: 'evening' as 'morning' | 'evening' | 'weekend',
    notes: '',
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = InquirySchema.safeParse(inquiryData);
    if (!result.success) {
      const errs: Record<string, string> = {};
      result.error.issues.forEach((err) => {
        if (err.path[0]) errs[err.path[0].toString()] = err.message;
      });
      setFormErrors(errs);
      return;
    }
    setFormErrors({});
    submitInquiry(club.id, inquiryData);
    setSubmitSuccess(true);
    setTimeout(() => {
      setSubmitSuccess(false);
      setInquiryModalOpen(false);
    }, 2000);
  };

  const handleShare = () => {
    const url = window.location.href;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url);
      setCopiedShare(true);
      setTimeout(() => setCopiedShare(false), 2000);
    }
  };

  const countryFlags: Record<string, string> = {
    MA: '🇲🇦',
    EG: '🇪🇬',
    AE: '🇦🇪',
    SA: '🇸🇦',
    TN: '🇹🇳',
    JO: '🇯🇴',
    DZ: '🇩🇿',
    QA: '🇶🇦',
  };

  return (
    <div id="club-detail-view" className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Back button & Breadcrumbs */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => router.push('/clubs')}
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-amber-600 dark:hover:text-amber-400 transition-colors cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4 rtl:rotate-180" />
          <span>{language === 'ar' ? 'العودة إلى دليل الأندية' : 'Back to Club Directory'}</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={handleShare}
            className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>{copiedShare ? (language === 'ar' ? 'تم النسخ!' : 'Copied!') : t('action.share')}</span>
          </button>
          <button
            onClick={() => toggleWatchClub(club.id)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              watching
                ? 'bg-amber-500 text-slate-950 shadow-md'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            {watching ? <BookmarkCheck className="w-4 h-4" /> : <BookmarkPlus className="w-4 h-4" />}
            <span>{watching ? t('action.watching') : t('action.watch')}</span>
          </button>
        </div>
      </div>

      {/* Hero Showcase with Promotional Video and Cover */}
      <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200/80 dark:border-slate-800 bg-slate-950 text-white min-h-[360px] sm:min-h-[420px] flex flex-col justify-end p-6 sm:p-10">
        <img
          src={club.coverImage}
          alt={club.name[language] || club.name.en}
          className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-overlay"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />

        {/* Floating Promo Video CTA */}
        <div className="absolute top-6 right-6 ltr:right-6 rtl:left-6 rtl:right-auto">
          <button
            onClick={() => setVideoModalOpen(true)}
            className="px-4 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm shadow-xl flex items-center gap-2 transform active:scale-95 transition-all cursor-pointer group"
          >
            <Play className="w-4 h-4 fill-current group-hover:scale-110 transition-transform" />
            <span>{t('action.watchVideo')}</span>
          </button>
        </div>

        {/* Club Identity Header */}
        <div className="relative z-10 space-y-4 max-w-3xl">
          <div className="flex items-center gap-3">
            <img
              src={club.logo}
              alt="Club Logo"
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover ring-4 ring-amber-500/40 shadow-xl"
            />
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
                  {club.name[language] || club.name.en}
                </h1>
                {club.verified && (
                  <span className="px-2 py-0.5 rounded-md bg-sky-500/20 text-sky-400 border border-sky-500/40 text-xs font-semibold flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Verified</span>
                  </span>
                )}
              </div>
              <p className="text-sm sm:text-base text-slate-300 mt-1 font-medium">
                {club.tagline[language] || club.tagline.en}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-slate-300 pt-2">
            <span className="flex items-center gap-1">
              <span className="text-base">{countryFlags[club.countryCode] || '📍'}</span>
              <span>{club.city}, {club.country}</span>
            </span>
            <span className="flex items-center gap-1 text-amber-400 font-bold">
              <Star className="w-4 h-4 fill-current" />
              <span>{club.rating}</span>
              <span className="text-slate-400 font-normal">({club.reviewCount} {language === 'ar' ? 'تقييم' : 'reviews'})</span>
            </span>
            <span className="flex items-center gap-1">
              <Users className="w-4 h-4 text-slate-400" />
              <span>{club.watchersCount} {language === 'ar' ? 'متابع' : 'followers'}</span>
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-bold text-xs">
              Est. {club.establishedYear}
            </span>
          </div>

          <div className="pt-2 flex flex-wrap gap-2">
            <button
              onClick={() => setInquiryModalOpen(true)}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-extrabold text-sm shadow-lg shadow-amber-500/30 transform active:scale-95 transition-all cursor-pointer flex items-center gap-2"
            >
              <span>{t('action.join')}</span>
              <ArrowRight className="w-4 h-4 rtl:rotate-180" />
            </button>
            <a
              href={`https://wa.me/${club.whatsapp.replace(/[^0-9]/g, '')}?text=Hello%20I%20am%20interested%20in%20joining%20MyClub`}
              target="_blank"
              rel="noreferrer"
              className="px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-lg flex items-center gap-2 cursor-pointer transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Chat</span>
            </a>
          </div>
        </div>
      </div>

      {/* Leaderboard Ad Slot */}
      <AdBanner type="leaderboard" />

      {/* Main Content Layout with 2 Columns: Tabs on Left, Contact & Quick Info on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: Navigation Tabs and Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Tab Navigation */}
          <div className="flex border-b border-slate-200 dark:border-slate-800 overflow-x-auto pb-1 gap-2 sm:gap-4 scrollbar-none">
            {[
              { id: 'overview', label: t('tab.overview') },
              { id: 'instructors', label: t('tab.instructors') },
              { id: 'achievements', label: t('tab.achievements') },
              { id: 'schedule', label: t('tab.schedule') },
              { id: 'news', label: `${t('tab.articles')} (${clubArticles.length})` },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2.5 font-bold text-xs sm:text-sm whitespace-nowrap transition-colors border-b-2 cursor-pointer ${
                  activeTab === tab.id
                    ? 'border-amber-500 text-amber-600 dark:text-amber-400'
                    : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-3">
                  {language === 'ar' ? 'نبذة عن الأكاديمية' : 'About the Academy'}
                </h3>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base whitespace-pre-line">
                  {club.description[language] || club.description.en}
                </p>

                <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700">
                    <span className="text-[11px] text-slate-400 font-medium block">
                      {language === 'ar' ? 'الرياضة الأساسية' : 'Primary Art'}
                    </span>
                    <span className="font-bold text-sm text-slate-800 dark:text-slate-200">
                      {t(`discipline.${club.discipline}`)}
                    </span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700">
                    <span className="text-[11px] text-slate-400 font-medium block">
                      {language === 'ar' ? 'الاتحادات المعتمدة' : 'Affiliations'}
                    </span>
                    <span className="font-bold text-sm text-slate-800 dark:text-slate-200">
                      {club.affiliations.join(', ')}
                    </span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700">
                    <span className="text-[11px] text-slate-400 font-medium block">
                      {language === 'ar' ? 'حصة تجريبية' : 'Trial Session'}
                    </span>
                    <span className="font-bold text-sm text-emerald-600 dark:text-emerald-400">
                      {club.pricing.hasFreeTrial ? 'Available Free' : 'On Request'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Promotional Video Banner inside overview */}
              <div className="rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-black">
                <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
                  <span className="text-xs font-bold flex items-center gap-2">
                    <Video className="w-4 h-4 text-amber-500" />
                    <span>{t('action.watchVideo')}</span>
                  </span>
                  <span className="text-xs text-slate-400">{club.name[language] || club.name.en}</span>
                </div>
                <div className="relative aspect-video w-full">
                  <iframe
                    src={club.videoUrl}
                    title="Promotional Video"
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: INSTRUCTORS & TEAM */}
          {activeTab === 'instructors' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {club.instructors.map((inst) => (
                  <div
                    key={inst.id}
                    className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between"
                  >
                    <div className="flex items-start gap-3">
                      <img
                        src={inst.image}
                        alt={inst.name}
                        className="w-16 h-16 rounded-2xl object-cover ring-2 ring-amber-500/30 shrink-0"
                      />
                      <div>
                        <h4 className="font-bold text-base text-slate-900 dark:text-slate-100">
                          {inst.name}
                        </h4>
                        <div className="text-xs text-amber-600 dark:text-amber-400 font-semibold">
                          {inst.rank}
                        </div>
                        <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                          {inst.role}
                        </div>
                      </div>
                    </div>
                    <p className="mt-3 text-xs text-slate-600 dark:text-slate-300 line-clamp-3">
                      {inst.bio[language] || inst.bio.en}
                    </p>
                    <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-500 space-y-1">
                      {inst.achievements.map((ach, idx) => (
                        <div key={idx} className="flex items-center gap-1.5">
                          <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                          <span>{ach}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: ACHIEVEMENTS & MEDALS */}
          {activeTab === 'achievements' && (
            <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 space-y-4 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-4 flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-500" />
                <span>{t('tab.achievements')}</span>
              </h3>

              <div className="space-y-3">
                {club.achievements.map((ach, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-lg shadow-sm ${
                          ach.medal === 'gold'
                            ? 'bg-amber-400 text-amber-950'
                            : ach.medal === 'silver'
                            ? 'bg-slate-300 text-slate-800'
                            : 'bg-amber-700 text-white'
                        }`}
                      >
                        🏆
                      </div>
                      <div>
                        <div className="font-bold text-sm text-slate-900 dark:text-slate-100">
                          {ach.title[language] || ach.title.en}
                        </div>
                        <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                          {ach.category} • {ach.year}
                        </div>
                      </div>
                    </div>
                    <span className="text-xs font-black uppercase text-amber-600 dark:text-amber-400">
                      {ach.medal}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: SCHEDULE */}
          {activeTab === 'schedule' && (
            <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-amber-500" />
                <span>{t('tab.schedule')}</span>
              </h3>

              <div className="divide-y divide-slate-100 dark:divide-slate-800">
                {club.schedule.map((slot, idx) => (
                  <div key={idx} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <div className="font-bold text-sm text-slate-900 dark:text-slate-100">
                        {slot.classTitle[language] || slot.classTitle.en}
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                        {slot.instructorName} • Level: {slot.level.toUpperCase()}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-semibold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 px-3 py-1.5 rounded-lg shrink-0">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{slot.day} ({slot.time})</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: NEWS & POSTS FOR THIS CLUB */}
          {activeTab === 'news' && (
            <div className="space-y-4">
              {clubArticles.length === 0 ? (
                <div className="p-8 text-center rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-500">
                  {language === 'ar' ? 'لا توجد مقالات منشورة لهذا النادي حالياً.' : 'No articles published yet for this club.'}
                </div>
              ) : (
                clubArticles.map((art) => (
                  <div
                    key={art.id}
                    onClick={() => router.push(`/article/${art.id}`)}
                    className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-amber-500 cursor-pointer transition-all flex flex-col sm:flex-row gap-4"
                  >
                    <img
                      src={art.coverImage}
                      alt={art.title[language] || art.title.en}
                      className="w-full sm:w-36 h-28 rounded-xl object-cover"
                    />
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <span className="text-[10px] font-bold uppercase text-amber-600 dark:text-amber-400">
                          {art.category}
                        </span>
                        <h4 className="font-bold text-base text-slate-900 dark:text-slate-100 hover:text-amber-600">
                          {art.title[language] || art.title.en}
                        </h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mt-1">
                          {art.summary[language] || art.summary.en}
                        </p>
                      </div>
                      <div className="flex items-center justify-between text-xs text-slate-400 mt-2">
                        <span>{art.author.name}</span>
                        <span>{art.readTimeMinutes} {t('article.readTime')}</span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        {/* Right Column: Contact & Action Sticky Sidebar */}
        <div className="space-y-6">
          <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-5">
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 pb-2 border-b border-slate-100 dark:border-slate-800">
              {t('tab.contact')}
            </h3>

            <div className="space-y-3 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold block text-slate-900 dark:text-slate-100">
                    {language === 'ar' ? 'العنوان' : 'Address'}
                  </span>
                  <span>{club.address}</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-amber-500 shrink-0" />
                <a href={`tel:${club.phone}`} className="hover:underline dir-ltr">
                  {club.phone}
                </a>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-amber-500 shrink-0" />
                <a href={`mailto:${club.email}`} className="hover:underline truncate">
                  {club.email}
                </a>
              </div>

              {club.website && (
                <div className="flex items-center gap-3">
                  <Globe className="w-4 h-4 text-amber-500 shrink-0" />
                  <a
                    href={club.website}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:underline text-amber-600 truncate"
                  >
                    {club.website.replace('https://', '')}
                  </a>
                </div>
              )}
            </div>

            <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
              <button
                onClick={() => setInquiryModalOpen(true)}
                className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-sm shadow-md transition-transform active:scale-95 cursor-pointer"
              >
                {t('action.join')}
              </button>
            </div>
          </div>

          {/* Sidebar Ad Placement */}
          <AdBanner type="sidebar" />
        </div>
      </div>

      {/* MODAL: PROMOTIONAL VIDEO POPUP */}
      {videoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="relative w-full max-w-4xl bg-black rounded-2xl overflow-hidden shadow-2xl">
            <button
              onClick={() => setVideoModalOpen(false)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/60 text-white hover:bg-black/90 cursor-pointer"
            >
              ✕
            </button>
            <div className="relative aspect-video w-full">
              <iframe
                src={club.videoUrl}
                title="Club Promo"
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}

      {/* MODAL: JOIN / FREE TRIAL APPLICATION FORM WITH ZOD VALIDATION */}
      {inquiryModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
          <div className="relative w-full max-w-lg rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl p-6 sm:p-8">
            <button
              onClick={() => setInquiryModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
            >
              ✕
            </button>

            <div className="mb-4">
              <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                {t('action.join')}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                {club.name[language] || club.name.en} • {club.city}
              </p>
            </div>

            {submitSuccess ? (
              <div className="py-10 text-center space-y-3">
                <CheckCircle2 className="w-14 h-14 text-emerald-500 mx-auto animate-bounce" />
                <h4 className="font-bold text-slate-900 dark:text-slate-100 text-lg">
                  {t('form.success')}
                </h4>
              </div>
            ) : (
              <form onSubmit={handleInquirySubmit} className="space-y-3.5">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    {t('form.name')} *
                  </label>
                  <input
                    type="text"
                    value={inquiryData.name}
                    onChange={(e) => setInquiryData({ ...inquiryData, name: e.target.value })}
                    placeholder="Walid Ben Salem"
                    className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-amber-500 outline-none"
                  />
                  {formErrors.name && (
                    <p className="text-xs text-rose-500 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {formErrors.name}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      {t('form.email')} *
                    </label>
                    <input
                      type="email"
                      value={inquiryData.email}
                      onChange={(e) => setInquiryData({ ...inquiryData, email: e.target.value })}
                      placeholder="walid@mail.com"
                      className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-amber-500 outline-none"
                    />
                    {formErrors.email && (
                      <p className="text-xs text-rose-500 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {formErrors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      {t('form.phone')} *
                    </label>
                    <input
                      type="tel"
                      value={inquiryData.phone}
                      onChange={(e) => setInquiryData({ ...inquiryData, phone: e.target.value })}
                      placeholder="+212 600 000 000"
                      className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-amber-500 outline-none dir-ltr"
                    />
                    {formErrors.phone && (
                      <p className="text-xs text-rose-500 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {formErrors.phone}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      {t('form.experience')}
                    </label>
                    <select
                      value={inquiryData.experienceLevel}
                      onChange={(e) =>
                        setInquiryData({ ...inquiryData, experienceLevel: e.target.value as any })
                      }
                      className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-amber-500 outline-none"
                    >
                      <option value="beginner">{t('form.exp.beginner')}</option>
                      <option value="intermediate">{t('form.exp.intermediate')}</option>
                      <option value="advanced">{t('form.exp.advanced')}</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      {t('form.preferredTime')}
                    </label>
                    <select
                      value={inquiryData.preferredTime}
                      onChange={(e) =>
                        setInquiryData({ ...inquiryData, preferredTime: e.target.value as any })
                      }
                      className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-amber-500 outline-none"
                    >
                      <option value="morning">{t('form.time.morning')}</option>
                      <option value="evening">{t('form.time.evening')}</option>
                      <option value="weekend">{t('form.time.weekend')}</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    {t('form.notes')}
                  </label>
                  <textarea
                    rows={2}
                    value={inquiryData.notes}
                    onChange={(e) => setInquiryData({ ...inquiryData, notes: e.target.value })}
                    placeholder="Specific goals, medical considerations..."
                    className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-amber-500 outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-sm shadow-md transition-transform active:scale-95 cursor-pointer"
                >
                  {t('action.apply')}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

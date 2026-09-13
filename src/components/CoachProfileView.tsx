import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { AdBanner } from './AdBanner';
import {
  Star,
  MapPin,
  Phone,
  MessageCircle,
  Mail,
  Instagram,
  Calendar,
  Clock,
  Award,
  CheckCircle2,
  Share2,
  ChevronLeft,
  ShieldCheck,
  Briefcase,
  DollarSign,
  Building,
  Sparkles,
  Send,
} from 'lucide-react';

interface CoachProfileViewProps {
  coachId: string;
}

export const CoachProfileView: React.FC<CoachProfileViewProps> = ({ coachId }) => {
  const { coaches, language, t, navigate } = useApp();

  const coach = coaches.find((c) => c.id === coachId || c.slug === coachId) || coaches[0];
  const [activeTab, setActiveTab] = useState<'overview' | 'skills' | 'certifications' | 'achievements'>('overview');
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [copiedShare, setCopiedShare] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const [bookingForm, setBookingForm] = useState({
    name: '',
    email: '',
    phone: '',
    experienceLevel: 'beginner',
    preferredTime: 'evening',
    notes: '',
  });

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedShare(true);
    setTimeout(() => setCopiedShare(false), 2500);
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingSuccess(true);
    setTimeout(() => {
      setBookingSuccess(false);
      setBookingModalOpen(false);
      setBookingForm({
        name: '',
        email: '',
        phone: '',
        experienceLevel: 'beginner',
        preferredTime: 'evening',
        notes: '',
      });
    }, 2000);
  };

  if (!coach) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-4">Coach profile not found</h2>
        <button
          onClick={() => navigate('/clubs')}
          className="px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white font-medium rounded-xl transition shadow"
        >
          {t('action.reset')}
        </button>
      </div>
    );
  }

  return (
    <div id="coach-profile-view" className="bg-slate-50 dark:bg-slate-950 min-h-screen pb-16 transition-colors">
      {/* Navigation Breadcrumb */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <button
            onClick={() => navigate('/clubs')}
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400 transition"
          >
            <ChevronLeft className="w-4 h-4 rtl:rotate-180" />
            <span>{t('nav.clubs')}</span>
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={handleShare}
              className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition"
            >
              <Share2 className="w-3.5 h-3.5" />
              {copiedShare ? t('action.saved') : t('action.share')}
            </button>
          </div>
        </div>
      </div>

      {/* Hero Header */}
      <div className="relative">
        <div className="h-64 sm:h-80 w-full overflow-hidden relative">
          <img
            src={coach.coverImage}
            alt={coach.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/50 to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative -mt-24 sm:-mt-28">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-8 shadow-xl border border-slate-200/80 dark:border-slate-800">
            <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
                <div className="relative">
                  <img
                    src={coach.avatar}
                    alt={coach.name}
                    className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover ring-4 ring-white dark:ring-slate-800 shadow-md"
                  />
                  {coach.verified && (
                    <span className="absolute -bottom-1 -right-1 bg-blue-600 text-white p-1 rounded-full shadow" title="Verified Coach">
                      <ShieldCheck className="w-4 h-4" />
                    </span>
                  )}
                </div>

                <div>
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                      {coach.name}
                    </h1>
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-red-100 dark:bg-red-950/50 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-900">
                      {t(`discipline.${coach.discipline}`)}
                    </span>
                    {coach.acceptingNewStudents ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                        {t('coach.acceptingStudents')}
                      </span>
                    ) : (
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                        {t('coach.notAccepting')}
                      </span>
                    )}
                  </div>

                  <p className="text-slate-600 dark:text-slate-300 font-medium text-sm sm:text-base mb-2">
                    {coach.title[language]}
                  </p>

                  <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4 text-slate-400" />
                      {coach.city}, {coach.country}
                    </span>
                    <span className="flex items-center gap-1">
                      <Award className="w-4 h-4 text-amber-500" />
                      {coach.rank}
                    </span>
                    <span className="flex items-center gap-1">
                      <Briefcase className="w-4 h-4 text-blue-500" />
                      {coach.experienceYears} {t('coach.years')} {t('tab.skills')}
                    </span>
                    <span className="flex items-center gap-1 text-amber-500 font-semibold">
                      <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                      {coach.rating} ({coach.reviewCount})
                    </span>
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="w-full md:w-auto flex flex-wrap sm:flex-nowrap items-center gap-3 pt-4 md:pt-0 border-t md:border-t-0 border-slate-100 dark:border-slate-800">
                {coach.hourlyRate && (
                  <div className="text-right hidden lg:block mr-2 rtl:mr-0 rtl:ml-2">
                    <span className="text-xs text-slate-500 dark:text-slate-400 block">{t('coach.ratePerHour')}</span>
                    <span className="text-xl font-extrabold text-slate-900 dark:text-white">
                      ${coach.hourlyRate.amount}
                    </span>
                  </div>
                )}

                <button
                  onClick={() => setBookingModalOpen(true)}
                  className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-semibold rounded-xl shadow-lg shadow-red-600/20 transition"
                >
                  <Calendar className="w-4 h-4" />
                  <span>{t('action.bookSession')}</span>
                </button>

                {coach.whatsapp && (
                  <a
                    href={`https://wa.me/${coach.whatsapp.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noreferrer"
                    className="p-3 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-100 rounded-xl border border-emerald-200 dark:border-emerald-800 transition"
                    title="WhatsApp"
                  >
                    <MessageCircle className="w-5 h-5" />
                  </a>
                )}

                <a
                  href={`tel:${coach.phone}`}
                  className="p-3 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 rounded-xl transition"
                  title="Call"
                >
                  <Phone className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Quick badges & Affiliation */}
            {coach.clubAffiliation && (
              <div className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between flex-wrap gap-3">
                <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                  <Building className="w-4 h-4 text-red-600 dark:text-red-400" />
                  <span>{t('athlete.club')}</span>
                  <button
                    onClick={() => navigate(`/club/${coach.clubAffiliation?.id}`)}
                    className="font-semibold text-red-600 dark:text-red-400 hover:underline"
                  >
                    {coach.clubAffiliation.name[language]}
                  </button>
                </div>

                <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{coach.availability}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left / Main 2 cols */}
          <div className="lg:col-span-2 space-y-6">
            {/* Tabs */}
            <div className="flex border-b border-slate-200 dark:border-slate-800 gap-2 sm:gap-6 overflow-x-auto">
              {[
                { id: 'overview', label: t('tab.overview') },
                { id: 'skills', label: t('tab.skills') },
                { id: 'certifications', label: t('tab.certifications') },
                { id: 'achievements', label: t('tab.achievements') },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`pb-3 font-semibold text-sm whitespace-nowrap transition border-b-2 ${
                    activeTab === tab.id
                      ? 'border-red-600 text-red-600 dark:text-red-400'
                      : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab: Overview */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-200/80 dark:border-slate-800">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-red-600" />
                    {t('tab.overview')}
                  </h3>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-base">
                    {coach.bio[language]}
                  </p>
                </div>

                {/* Core Coaching Skills */}
                <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-200/80 dark:border-slate-800">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
                    {t('coach.skills')}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {coach.skills.map((skill, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800"
                      >
                        <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                        <span className="text-sm font-medium text-slate-800 dark:text-slate-200">
                          {skill}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Tab: Skills */}
            {activeTab === 'skills' && (
              <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-200/80 dark:border-slate-800 space-y-4">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
                  {t('coach.disciplines')}
                </h3>
                <div className="flex flex-wrap gap-2 mb-6">
                  {coach.allDisciplines.map((disc) => (
                    <span
                      key={disc}
                      className="px-4 py-2 rounded-xl text-sm font-semibold bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-900"
                    >
                      {t(`discipline.${disc}`)}
                    </span>
                  ))}
                </div>

                <div className="space-y-3">
                  {coach.skills.map((skill, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 flex items-center justify-between"
                    >
                      <span className="font-semibold text-slate-900 dark:text-white text-sm">
                        {skill}
                      </span>
                      <span className="text-xs px-2.5 py-1 bg-slate-200 dark:bg-slate-700 rounded-md text-slate-700 dark:text-slate-300">
                        {coach.rank}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tab: Certifications */}
            {activeTab === 'certifications' && (
              <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-200/80 dark:border-slate-800 space-y-4">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
                  {t('coach.certifications')}
                </h3>
                <div className="space-y-3">
                  {coach.certifications.map((cert, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-4 p-4 rounded-xl bg-blue-50/50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/40"
                    >
                      <ShieldCheck className="w-6 h-6 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-bold text-slate-900 dark:text-white text-sm sm:text-base">
                          {cert}
                        </h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                          Verified Official Credential • Issued to {coach.name}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tab: Achievements */}
            {activeTab === 'achievements' && (
              <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-200/80 dark:border-slate-800 space-y-4">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
                  {t('tab.achievements')}
                </h3>
                <div className="space-y-3">
                  {coach.achievements.map((ach, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-3 p-4 rounded-xl bg-amber-50/40 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/30"
                    >
                      <Award className="w-5 h-5 text-amber-500 flex-shrink-0" />
                      <span className="font-semibold text-slate-900 dark:text-white text-sm">
                        {ach}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Ad Banner */}
            <AdBanner slot="inFeed" className="my-6" />
          </div>

          {/* Right Column: Rate Card & Booking CTA */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-200/80 dark:border-slate-800">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-emerald-600" />
                {t('action.bookSession')}
              </h3>

              {coach.hourlyRate && (
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 mb-4">
                  <div className="flex items-baseline justify-between mb-1">
                    <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                      {coach.hourlyRate.sessionType}
                    </span>
                    <span className="text-2xl font-black text-slate-900 dark:text-white">
                      ${coach.hourlyRate.amount}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Includes personal assessment, dynamic drill drills, and video recap.
                  </p>
                </div>
              )}

              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>100% Verified Profile & Credentials</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>Direct WhatsApp & phone coordination</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>Private Dojo or Club facilities</span>
                </div>
              </div>

              <button
                onClick={() => setBookingModalOpen(true)}
                className="w-full py-3.5 bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-bold rounded-xl shadow-lg shadow-red-600/25 transition text-center"
              >
                {t('action.bookSession')}
              </button>
            </div>

            {/* Direct Contact Card */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-200/80 dark:border-slate-800 space-y-4">
              <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                {t('action.contact')}
              </h4>

              <div className="space-y-2.5 text-xs sm:text-sm">
                <a
                  href={`tel:${coach.phone}`}
                  className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition"
                >
                  <Phone className="w-4 h-4 text-slate-400" />
                  <span>{coach.phone}</span>
                </a>

                <a
                  href={`mailto:${coach.email}`}
                  className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition"
                >
                  <Mail className="w-4 h-4 text-slate-400" />
                  <span>{coach.email}</span>
                </a>

                {coach.instagram && (
                  <div className="flex items-center gap-3 p-2.5 rounded-lg text-slate-700 dark:text-slate-300">
                    <Instagram className="w-4 h-4 text-pink-500" />
                    <span>{coach.instagram}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {bookingModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
          <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 mb-5">
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  {t('action.bookSession')}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {coach.name} • {t(`discipline.${coach.discipline}`)}
                </p>
              </div>
              <button
                onClick={() => setBookingModalOpen(false)}
                className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 transition"
              >
                ✕
              </button>
            </div>

            {bookingSuccess ? (
              <div className="p-6 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-950/50 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="text-base font-bold text-slate-900 dark:text-white">
                  {t('form.success')}
                </h4>
                <p className="text-xs text-slate-500">
                  Coach {coach.name} has been notified and will reach out to schedule your time slot.
                </p>
              </div>
            ) : (
              <form onSubmit={handleBookingSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    {t('form.name')}
                  </label>
                  <input
                    type="text"
                    required
                    value={bookingForm.name}
                    onChange={(e) => setBookingForm({ ...bookingForm, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-red-600 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      {t('form.email')}
                    </label>
                    <input
                      type="email"
                      required
                      value={bookingForm.email}
                      onChange={(e) => setBookingForm({ ...bookingForm, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-red-600 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      {t('form.phone')}
                    </label>
                    <input
                      type="tel"
                      required
                      value={bookingForm.phone}
                      onChange={(e) => setBookingForm({ ...bookingForm, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-red-600 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      {t('form.experience')}
                    </label>
                    <select
                      value={bookingForm.experienceLevel}
                      onChange={(e) => setBookingForm({ ...bookingForm, experienceLevel: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-red-600 focus:outline-none"
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
                      value={bookingForm.preferredTime}
                      onChange={(e) => setBookingForm({ ...bookingForm, preferredTime: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-red-600 focus:outline-none"
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
                    value={bookingForm.notes}
                    onChange={(e) => setBookingForm({ ...bookingForm, notes: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-red-600 focus:outline-none resize-none"
                    placeholder="Specific areas you want to work on (guard passing, power striking, etc.)"
                  ></textarea>
                </div>

                <div className="flex gap-3 pt-3">
                  <button
                    type="button"
                    onClick={() => setBookingModalOpen(false)}
                    className="flex-1 py-2.5 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold rounded-xl text-sm transition"
                  >
                    {t('action.close')}
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2.5 bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-semibold rounded-xl text-sm transition shadow"
                  >
                    {t('action.apply')}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

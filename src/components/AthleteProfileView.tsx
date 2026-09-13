import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { AdBanner } from './AdBanner';
import {
  Award,
  MapPin,
  ShieldCheck,
  Building,
  Sparkles,
  Share2,
  ChevronLeft,
  Swords,
  Trophy,
  Target,
  Flame,
  Phone,
  Mail,
  Instagram,
  Handshake,
  CheckCircle2,
  Send,
} from 'lucide-react';

interface AthleteProfileViewProps {
  athleteId: string;
}

export const AthleteProfileView: React.FC<AthleteProfileViewProps> = ({ athleteId }) => {
  const { athletes, language, t, navigate } = useApp();

  const athlete = athletes.find((a) => a.id === athleteId || a.slug === athleteId) || athletes[0];
  const [activeTab, setActiveTab] = useState<'record' | 'medals' | 'bio' | 'sponsorship'>('record');
  const [sponsorModalOpen, setSponsorModalOpen] = useState(false);
  const [copiedShare, setCopiedShare] = useState(false);
  const [sponsorSent, setSponsorSent] = useState(false);

  const [sponsorForm, setSponsorForm] = useState({
    companyName: '',
    contactPerson: '',
    email: '',
    phone: '',
    proposalType: 'apparel',
    message: '',
  });

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedShare(true);
    setTimeout(() => setCopiedShare(false), 2500);
  };

  const handleSponsorSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSponsorSent(true);
    setTimeout(() => {
      setSponsorSent(false);
      setSponsorModalOpen(false);
      setSponsorForm({
        companyName: '',
        contactPerson: '',
        email: '',
        phone: '',
        proposalType: 'apparel',
        message: '',
      });
    }, 2000);
  };

  if (!athlete) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-4">Athlete profile not found</h2>
        <button
          onClick={() => navigate('/clubs')}
          className="px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white font-medium rounded-xl transition shadow"
        >
          {t('action.reset')}
        </button>
      </div>
    );
  }

  const winRate = athlete.record
    ? Math.round((athlete.record.wins / (athlete.record.wins + athlete.record.losses || 1)) * 100)
    : 0;

  return (
    <div id="athlete-profile-view" className="bg-slate-50 dark:bg-slate-950 min-h-screen pb-16 transition-colors">
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
            src={athlete.coverImage}
            alt={athlete.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/50 to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative -mt-24 sm:-mt-28">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-8 shadow-xl border border-slate-200/80 dark:border-slate-800">
            <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
                <div className="relative">
                  <img
                    src={athlete.avatar}
                    alt={athlete.name}
                    className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover ring-4 ring-white dark:ring-slate-800 shadow-md"
                  />
                  {athlete.verified && (
                    <span className="absolute -bottom-1 -right-1 bg-blue-600 text-white p-1 rounded-full shadow" title="Verified Competitor">
                      <ShieldCheck className="w-4 h-4" />
                    </span>
                  )}
                </div>

                <div>
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                      {athlete.name}
                    </h1>
                    {athlete.nickname && (
                      <span className="text-sm font-semibold text-red-600 dark:text-red-400 italic">
                        "{athlete.nickname}"
                      </span>
                    )}
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-red-100 dark:bg-red-950/50 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-900">
                      {t(`discipline.${athlete.discipline}`)}
                    </span>
                    {athlete.sponsorSeeking && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-100 dark:bg-amber-950/50 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-800">
                        <Flame className="w-3 h-3 text-amber-600 animate-pulse" />
                        {t('athlete.seekingSponsor')}
                      </span>
                    )}
                  </div>

                  <p className="text-slate-600 dark:text-slate-300 font-semibold text-sm mb-2">
                    {athlete.category} • {athlete.rank}
                  </p>

                  <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4 text-slate-400" />
                      {athlete.city}, {athlete.country}
                    </span>
                    <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-semibold">
                      <Trophy className="w-4 h-4 text-amber-500" />
                      {athlete.ranking}
                    </span>
                    <span className="flex items-center gap-1">
                      <Award className="w-4 h-4 text-blue-500" />
                      {athlete.medals.length} {t('athlete.medalsCount')}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="w-full md:w-auto flex flex-wrap sm:flex-nowrap items-center gap-3 pt-4 md:pt-0 border-t md:border-t-0 border-slate-100 dark:border-slate-800">
                <button
                  onClick={() => setSponsorModalOpen(true)}
                  className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-600 active:bg-amber-700 text-slate-950 font-bold rounded-xl shadow-lg shadow-amber-500/20 transition"
                >
                  <Handshake className="w-4 h-4" />
                  <span>{t('action.sponsorAthlete')}</span>
                </button>

                {athlete.phone && (
                  <a
                    href={`tel:${athlete.phone}`}
                    className="p-3 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 rounded-xl transition"
                    title="Phone"
                  >
                    <Phone className="w-5 h-5" />
                  </a>
                )}

                {athlete.email && (
                  <a
                    href={`mailto:${athlete.email}`}
                    className="p-3 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 rounded-xl transition"
                    title="Email"
                  >
                    <Mail className="w-5 h-5" />
                  </a>
                )}
              </div>
            </div>

            {/* Quick Affiliation Info */}
            {athlete.clubAffiliation && (
              <div className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between flex-wrap gap-3">
                <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                  <Building className="w-4 h-4 text-red-600 dark:text-red-400" />
                  <span>{t('athlete.club')}</span>
                  <button
                    onClick={() => navigate(`/club/${athlete.clubAffiliation?.id}`)}
                    className="font-semibold text-red-600 dark:text-red-400 hover:underline"
                  >
                    {athlete.clubAffiliation.name[language]}
                  </button>
                </div>

                {athlete.instagram && (
                  <div className="flex items-center gap-2 text-xs text-pink-600 dark:text-pink-400 font-medium">
                    <Instagram className="w-3.5 h-3.5" />
                    <span>{athlete.instagram}</span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main 2 columns */}
          <div className="lg:col-span-2 space-y-6">
            {/* Tabs */}
            <div className="flex border-b border-slate-200 dark:border-slate-800 gap-2 sm:gap-6 overflow-x-auto">
              {[
                { id: 'record', label: t('athlete.record') },
                { id: 'medals', label: t('tab.medals') },
                { id: 'bio', label: t('tab.overview') },
                { id: 'sponsorship', label: t('tab.sponsorship') },
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

            {/* Tab: Record */}
            {activeTab === 'record' && athlete.record && (
              <div className="space-y-6">
                {/* Stats cards */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 text-center shadow-sm">
                    <span className="text-3xl sm:text-4xl font-black text-emerald-600 dark:text-emerald-400 block">
                      {athlete.record.wins}
                    </span>
                    <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-1 block">
                      {t('athlete.wins')}
                    </span>
                  </div>

                  <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 text-center shadow-sm">
                    <span className="text-3xl sm:text-4xl font-black text-red-600 dark:text-red-400 block">
                      {athlete.record.losses}
                    </span>
                    <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-1 block">
                      {t('athlete.losses')}
                    </span>
                  </div>

                  <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 text-center shadow-sm">
                    <span className="text-3xl sm:text-4xl font-black text-blue-600 dark:text-blue-400 block">
                      {athlete.record.submissions || athlete.record.kos || 0}
                    </span>
                    <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-1 block">
                      Finishes / KOs
                    </span>
                  </div>

                  <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 text-center shadow-sm">
                    <span className="text-3xl sm:text-4xl font-black text-amber-500 block">
                      {winRate}%
                    </span>
                    <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-1 block">
                      Win Ratio
                    </span>
                  </div>
                </div>

                <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-200/80 dark:border-slate-800">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                    <Swords className="w-5 h-5 text-red-600" />
                    Fighting Style & Combat Profile
                  </h3>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
                    {athlete.bio[language]}
                  </p>
                </div>
              </div>
            )}

            {/* Tab: Medals */}
            {activeTab === 'medals' && (
              <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-200/80 dark:border-slate-800 space-y-4">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-amber-500" />
                  {t('tab.medals')}
                </h3>

                <div className="space-y-3">
                  {athlete.medals.map((item, idx) => (
                    <div
                      key={idx}
                      className={`p-4 rounded-xl flex items-center justify-between border ${
                        item.medal === 'gold'
                          ? 'bg-amber-500/10 border-amber-300 dark:border-amber-700/50'
                          : item.medal === 'silver'
                          ? 'bg-slate-100/70 dark:bg-slate-800/60 border-slate-300 dark:border-slate-700'
                          : 'bg-orange-500/10 border-orange-300 dark:border-orange-700/50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Award
                          className={`w-6 h-6 ${
                            item.medal === 'gold'
                              ? 'text-amber-500'
                              : item.medal === 'silver'
                              ? 'text-slate-400'
                              : 'text-orange-600'
                          }`}
                        />
                        <div>
                          <h4 className="font-bold text-slate-900 dark:text-white text-sm sm:text-base">
                            {item.event}
                          </h4>
                          <span className="text-xs text-slate-500">Official Tournament Podium • {item.year}</span>
                        </div>
                      </div>

                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                          item.medal === 'gold'
                            ? 'bg-amber-500 text-slate-950'
                            : item.medal === 'silver'
                            ? 'bg-slate-300 dark:bg-slate-700 text-slate-800 dark:text-slate-200'
                            : 'bg-orange-600 text-white'
                        }`}
                      >
                        {item.medal}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tab: Bio */}
            {activeTab === 'bio' && (
              <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-200/80 dark:border-slate-800 space-y-4">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3">
                  {t('tab.overview')}
                </h3>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-base">
                  {athlete.bio[language]}
                </p>
              </div>
            )}

            {/* Tab: Sponsorship */}
            {activeTab === 'sponsorship' && (
              <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-200/80 dark:border-slate-800 space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                    <Handshake className="w-5 h-5 text-amber-500" />
                    {t('tab.sponsorship')}
                  </h3>
                  <p className="text-slate-700 dark:text-slate-300 text-sm sm:text-base">
                    {athlete.sponsorPitch?.[language] || 'Actively seeking sports nutrition, gear, and apparel sponsors.'}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center">
                    <span className="font-bold text-slate-900 dark:text-white block text-sm">Fight Kit Placement</span>
                    <span className="text-xs text-slate-500">Gi, rashguard, or shorts branding</span>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center">
                    <span className="font-bold text-slate-900 dark:text-white block text-sm">Social Media Endorsement</span>
                    <span className="text-xs text-slate-500">Dedicated reels, stories & posts</span>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center">
                    <span className="font-bold text-slate-900 dark:text-white block text-sm">Brand Ambassadorship</span>
                    <span className="text-xs text-slate-500">Appearances & promotional videos</span>
                  </div>
                </div>

                <button
                  onClick={() => setSponsorModalOpen(true)}
                  className="w-full py-3 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-xl shadow-md transition text-center"
                >
                  {t('action.sponsorAthlete')}
                </button>
              </div>
            )}

            <AdBanner slot="inFeed" className="my-6" />
          </div>

          {/* Right Column: Quick Contact & Sponsorship Callout */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-amber-500/10 via-amber-500/5 to-transparent border border-amber-300 dark:border-amber-700/50 rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-3">
                <Flame className="w-5 h-5 text-amber-500" />
                <h4 className="font-bold text-slate-900 dark:text-white text-base">
                  {t('athlete.seekingSponsor')}
                </h4>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mb-4">
                Partner with an elite champion preparing for major international tournaments. Maximize your brand's presence in the combat sports arena.
              </p>
              <button
                onClick={() => setSponsorModalOpen(true)}
                className="w-full py-3 bg-amber-500 hover:bg-amber-600 active:bg-amber-700 text-slate-950 font-bold rounded-xl shadow-lg transition"
              >
                {t('action.sponsorAthlete')}
              </button>
            </div>

            {/* Direct Contact */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-200/80 dark:border-slate-800 space-y-4">
              <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                {t('action.contact')}
              </h4>

              <div className="space-y-2.5 text-xs sm:text-sm">
                {athlete.phone && (
                  <a
                    href={`tel:${athlete.phone}`}
                    className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition"
                  >
                    <Phone className="w-4 h-4 text-slate-400" />
                    <span>{athlete.phone}</span>
                  </a>
                )}

                {athlete.email && (
                  <a
                    href={`mailto:${athlete.email}`}
                    className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition"
                  >
                    <Mail className="w-4 h-4 text-slate-400" />
                    <span>{athlete.email}</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sponsorship Proposal Modal */}
      {sponsorModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
          <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 mb-5">
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  {t('action.sponsorAthlete')}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {athlete.name} • {athlete.category}
                </p>
              </div>
              <button
                onClick={() => setSponsorModalOpen(false)}
                className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 transition"
              >
                ✕
              </button>
            </div>

            {sponsorSent ? (
              <div className="p-6 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-950/50 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="text-base font-bold text-slate-900 dark:text-white">
                  Sponsorship Inquiry Sent
                </h4>
                <p className="text-xs text-slate-500">
                  Your proposal has been delivered to {athlete.name}'s representation team.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSponsorSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Company / Brand Name
                  </label>
                  <input
                    type="text"
                    required
                    value={sponsorForm.companyName}
                    onChange={(e) => setSponsorForm({ ...sponsorForm, companyName: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    placeholder="e.g. Combat Nutrition Co."
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Contact Person
                    </label>
                    <input
                      type="text"
                      required
                      value={sponsorForm.contactPerson}
                      onChange={(e) => setSponsorForm({ ...sponsorForm, contactPerson: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Work Email
                    </label>
                    <input
                      type="email"
                      required
                      value={sponsorForm.email}
                      onChange={(e) => setSponsorForm({ ...sponsorForm, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Proposal Details / Package
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={sponsorForm.message}
                    onChange={(e) => setSponsorForm({ ...sponsorForm, message: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none resize-none"
                    placeholder="Brief description of the sponsorship tier or merchandise offer"
                  ></textarea>
                </div>

                <div className="flex gap-3 pt-3">
                  <button
                    type="button"
                    onClick={() => setSponsorModalOpen(false)}
                    className="flex-1 py-2.5 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold rounded-xl text-sm transition"
                  >
                    {t('action.close')}
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-xl text-sm transition shadow"
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

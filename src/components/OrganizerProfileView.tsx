import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { AdBanner } from './AdBanner';
import {
  Trophy,
  MapPin,
  ShieldCheck,
  Building,
  Share2,
  ChevronLeft,
  Calendar,
  Globe,
  Mail,
  Phone,
  CheckCircle2,
  ExternalLink,
  Award,
  Sparkles,
  FileCheck,
} from 'lucide-react';

interface OrganizerProfileViewProps {
  organizerId: string;
}

export const OrganizerProfileView: React.FC<OrganizerProfileViewProps> = ({ organizerId }) => {
  const { organizers, competitions, language, t, navigate } = useApp();

  const organizer = organizers.find((o) => o.id === organizerId || o.slug === organizerId) || organizers[0];
  const [activeTab, setActiveTab] = useState<'overview' | 'events' | 'disciplines' | 'affiliations'>('overview');
  const [sanctionModalOpen, setSanctionModalOpen] = useState(false);
  const [copiedShare, setCopiedShare] = useState(false);
  const [sanctionSent, setSanctionSent] = useState(false);

  const [sanctionForm, setSanctionForm] = useState({
    tournamentName: '',
    hostClubOrOrg: '',
    discipline: 'bjj',
    city: '',
    proposedDate: '',
    expectedAthletes: '150',
    email: '',
    phone: '',
  });

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedShare(true);
    setTimeout(() => setCopiedShare(false), 2500);
  };

  const handleSanctionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSanctionSent(true);
    setTimeout(() => {
      setSanctionSent(false);
      setSanctionModalOpen(false);
    }, 2000);
  };

  if (!organizer) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-4">Organizer profile not found</h2>
        <button
          onClick={() => navigate('/clubs')}
          className="px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white font-medium rounded-xl transition shadow"
        >
          {t('action.reset')}
        </button>
      </div>
    );
  }

  // Filter competitions sanctioned or organized by this entity
  const orgCompetitions = competitions.filter((c) =>
    organizer.upcomingEvents.includes(c.id) || c.organizer[language].toLowerCase().includes(organizer.name[language].toLowerCase().slice(0, 10))
  );

  return (
    <div id="organizer-profile-view" className="bg-slate-50 dark:bg-slate-950 min-h-screen pb-16 transition-colors">
      {/* Breadcrumb */}
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
            src={organizer.coverImage}
            alt={organizer.name[language]}
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
                    src={organizer.logo}
                    alt={organizer.name[language]}
                    className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover ring-4 ring-white dark:ring-slate-800 shadow-md bg-white p-2"
                  />
                  {organizer.verified && (
                    <span className="absolute -bottom-1 -right-1 bg-blue-600 text-white p-1 rounded-full shadow" title="Official Regulatory Body">
                      <ShieldCheck className="w-4 h-4" />
                    </span>
                  )}
                </div>

                <div>
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                      {organizer.name[language]}
                    </h1>
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-purple-100 dark:bg-purple-950/50 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800 uppercase tracking-wider">
                      {organizer.type}
                    </span>
                  </div>

                  <p className="text-slate-600 dark:text-slate-300 font-medium text-sm mb-2">
                    {organizer.jurisdiction[language]}
                  </p>

                  <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4 text-slate-400" />
                      {organizer.city}, {organizer.country}
                    </span>
                    <span className="flex items-center gap-1 text-red-600 dark:text-red-400 font-semibold">
                      <Trophy className="w-4 h-4" />
                      {organizer.sanctionedEventsCount} {t('organizer.sanctionedEvents')}
                    </span>
                    <span className="flex items-center gap-1">
                      <Building className="w-4 h-4 text-slate-400" />
                      Est. {organizer.establishedYear}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="w-full md:w-auto flex flex-wrap sm:flex-nowrap items-center gap-3 pt-4 md:pt-0 border-t md:border-t-0 border-slate-100 dark:border-slate-800">
                <button
                  onClick={() => setSanctionModalOpen(true)}
                  className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 active:bg-purple-800 text-white font-bold rounded-xl shadow-lg shadow-purple-600/20 transition"
                >
                  <FileCheck className="w-4 h-4" />
                  <span>{t('action.requestSanction')}</span>
                </button>

                {organizer.website && (
                  <a
                    href={organizer.website}
                    target="_blank"
                    rel="noreferrer"
                    className="p-3 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 rounded-xl transition"
                    title="Official Website"
                  >
                    <Globe className="w-5 h-5" />
                  </a>
                )}

                <a
                  href={`mailto:${organizer.contactEmail}`}
                  className="p-3 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 rounded-xl transition"
                  title="Contact Secretariat"
                >
                  <Mail className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main 2 columns */}
          <div className="lg:col-span-2 space-y-6">
            {/* Tabs */}
            <div className="flex border-b border-slate-200 dark:border-slate-800 gap-2 sm:gap-6 overflow-x-auto">
              {[
                { id: 'overview', label: t('tab.overview') },
                { id: 'events', label: t('tab.events') },
                { id: 'disciplines', label: t('coach.disciplines') },
                { id: 'affiliations', label: t('organizer.affiliations') },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`pb-3 font-semibold text-sm whitespace-nowrap transition border-b-2 ${
                    activeTab === tab.id
                      ? 'border-purple-600 text-purple-600 dark:text-purple-400'
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
                    <Sparkles className="w-5 h-5 text-purple-600" />
                    Regulatory Mandate & Mission
                  </h3>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-base">
                    {organizer.description[language]}
                  </p>
                </div>

                <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-200/80 dark:border-slate-800">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
                    {t('organizer.affiliations')}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {organizer.affiliations.map((aff, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800"
                      >
                        <ShieldCheck className="w-5 h-5 text-purple-600 flex-shrink-0" />
                        <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                          {aff}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Tab: Events */}
            {activeTab === 'events' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    {t('tab.events')} ({orgCompetitions.length})
                  </h3>
                  <button
                    onClick={() => navigate('/competitions')}
                    className="text-sm font-semibold text-purple-600 dark:text-purple-400 hover:underline inline-flex items-center gap-1"
                  >
                    <span>View All Tournaments</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                </div>

                {orgCompetitions.length === 0 ? (
                  <div className="p-8 text-center bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 text-slate-500">
                    No active tournament listings currently. Sanction your event today.
                  </div>
                ) : (
                  <div className="space-y-4">
                    {orgCompetitions.map((comp) => (
                      <div
                        key={comp.id}
                        className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 hover:border-purple-500/50 transition flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                      >
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300">
                              {t(`discipline.${comp.discipline}`)}
                            </span>
                            <span className="text-xs text-slate-500 flex items-center gap-1">
                              <Calendar className="w-3.5 h-3.5" />
                              {comp.startDate}
                            </span>
                          </div>
                          <h4 className="text-base font-bold text-slate-900 dark:text-white">
                            {comp.title[language] || comp.title.en}
                          </h4>
                          <span className="text-xs text-slate-500 flex items-center gap-1 mt-1">
                            <MapPin className="w-3.5 h-3.5" />
                            {comp.venue}, {comp.city}
                          </span>
                        </div>

                        <button
                          onClick={() => navigate('/competitions')}
                          className="px-4 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold rounded-xl transition"
                        >
                          {t('action.viewDetails')}
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Tab: Disciplines */}
            {activeTab === 'disciplines' && (
              <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-200/80 dark:border-slate-800 space-y-4">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
                  Governed Martial Arts & Sports
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {organizer.disciplines.map((disc) => (
                    <div
                      key={disc}
                      className="p-4 rounded-xl bg-purple-50/50 dark:bg-purple-950/20 border border-purple-100 dark:border-purple-900/30 text-center"
                    >
                      <Award className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                      <span className="font-bold text-slate-900 dark:text-white text-sm">
                        {t(`discipline.${disc}`)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tab: Affiliations */}
            {activeTab === 'affiliations' && (
              <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-200/80 dark:border-slate-800 space-y-4">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
                  Official Affiliations & International Recognition
                </h3>
                <div className="space-y-3">
                  {organizer.affiliations.map((aff, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-3 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700"
                    >
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                      <span className="font-semibold text-slate-900 dark:text-white text-sm">
                        {aff}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <AdBanner slot="inFeed" className="my-6" />
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-purple-600/10 via-purple-600/5 to-transparent border border-purple-200 dark:border-purple-800/50 rounded-2xl p-6">
              <h4 className="font-bold text-slate-900 dark:text-white text-base mb-2">
                Sanction Your Tournament
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mb-4">
                Apply for official recognition, certified international referees, and official ranking points for your competitors.
              </p>
              <button
                onClick={() => setSanctionModalOpen(true)}
                className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl shadow-lg transition"
              >
                {t('action.requestSanction')}
              </button>
            </div>

            {/* Official Contact Info */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-200/80 dark:border-slate-800 space-y-4">
              <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                General Secretariat & Contact
              </h4>

              <div className="space-y-2.5 text-xs sm:text-sm">
                <a
                  href={`tel:${organizer.contactPhone}`}
                  className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition"
                >
                  <Phone className="w-4 h-4 text-slate-400" />
                  <span>{organizer.contactPhone}</span>
                </a>

                <a
                  href={`mailto:${organizer.contactEmail}`}
                  className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition"
                >
                  <Mail className="w-4 h-4 text-slate-400" />
                  <span>{organizer.contactEmail}</span>
                </a>

                {organizer.website && (
                  <a
                    href={organizer.website}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition"
                  >
                    <Globe className="w-4 h-4 text-slate-400" />
                    <span>{organizer.website}</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sanction Modal */}
      {sanctionModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
          <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 mb-5">
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  {t('action.requestSanction')}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {organizer.name[language]}
                </p>
              </div>
              <button
                onClick={() => setSanctionModalOpen(false)}
                className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 transition"
              >
                ✕
              </button>
            </div>

            {sanctionSent ? (
              <div className="p-6 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-950/50 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="text-base font-bold text-slate-900 dark:text-white">
                  Application Submitted
                </h4>
                <p className="text-xs text-slate-500">
                  The technical committee has received your sanction request and will reach out with the accreditation package.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSanctionSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Event / Tournament Name
                  </label>
                  <input
                    type="text"
                    required
                    value={sanctionForm.tournamentName}
                    onChange={(e) => setSanctionForm({ ...sanctionForm, tournamentName: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-purple-600 focus:outline-none"
                    placeholder="e.g. Atlas BJJ Grand Prix 2026"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Host Club / Organization
                    </label>
                    <input
                      type="text"
                      required
                      value={sanctionForm.hostClubOrOrg}
                      onChange={(e) => setSanctionForm({ ...sanctionForm, hostClubOrOrg: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-purple-600 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      City & Venue
                    </label>
                    <input
                      type="text"
                      required
                      value={sanctionForm.city}
                      onChange={(e) => setSanctionForm({ ...sanctionForm, city: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-purple-600 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      required
                      value={sanctionForm.email}
                      onChange={(e) => setSanctionForm({ ...sanctionForm, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-purple-600 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Phone / WhatsApp
                    </label>
                    <input
                      type="tel"
                      required
                      value={sanctionForm.phone}
                      onChange={(e) => setSanctionForm({ ...sanctionForm, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-purple-600 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="flex gap-3 pt-3">
                  <button
                    type="button"
                    onClick={() => setSanctionModalOpen(false)}
                    className="flex-1 py-2.5 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold rounded-xl text-sm transition"
                  >
                    {t('action.close')}
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl text-sm transition shadow"
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

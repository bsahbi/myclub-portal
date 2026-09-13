import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { MemberType, MartialArtDiscipline, NewMemberSubscription } from '../types';
import {
  X,
  CheckCircle2,
  ShieldCheck,
  Building,
  UserCheck,
  Trophy,
  Award,
  Sparkles,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';

export const SubscribeModal: React.FC = () => {
  const {
    subscribeModalOpen,
    setSubscribeModalOpen,
    subscribeMember,
    navigate,
    language,
    t,
  } = useApp();

  const [memberType, setMemberType] = useState<MemberType>('coach');
  const [submittedRoute, setSubmittedRoute] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    whatsapp: '',
    discipline: 'bjj' as MartialArtDiscipline,
    country: 'Morocco',
    city: 'Casablanca',
    countryCode: 'MA',
    titleOrRank: '',
    bio: '',
    skillsOrServices: '',
    categoryOrJurisdiction: '',
    websiteOrSocial: '',
    pricingOrSponsorship: '',
  });

  if (!subscribeModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const subscription: NewMemberSubscription = {
      memberType,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      whatsapp: formData.whatsapp || formData.phone,
      discipline: formData.discipline,
      country: formData.country,
      city: formData.city,
      countryCode: formData.countryCode,
      titleOrRank: formData.titleOrRank,
      bio: formData.bio,
      skillsOrServices: formData.skillsOrServices,
      categoryOrJurisdiction: formData.categoryOrJurisdiction,
      websiteOrSocial: formData.websiteOrSocial,
      pricingOrSponsorship: formData.pricingOrSponsorship,
    };

    const newRoute = subscribeMember(subscription);
    setSubmittedRoute(newRoute);
  };

  const handleClose = () => {
    setSubmittedRoute(null);
    setSubscribeModalOpen(false);
  };

  const handleViewProfile = () => {
    if (submittedRoute) {
      navigate(submittedRoute);
    }
    handleClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm overflow-y-auto animate-fade-in">
      <div className="relative w-full max-w-2xl my-8 bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-red-600 to-rose-700 text-white relative">
          <button
            onClick={handleClose}
            className="absolute top-5 end-5 p-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2 mb-1">
            <Sparkles className="w-5 h-5 text-amber-300" />
            <span className="text-xs uppercase tracking-wider font-bold text-red-100">
              MyClub Portal Directory
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black">
            {t('subscribe.modalTitle')}
          </h2>
          <p className="text-xs sm:text-sm text-red-100 mt-1 max-w-xl">
            {t('subscribe.modalSubtitle')}
          </p>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {submittedRoute ? (
            <div className="py-8 text-center space-y-4 animate-fade-in">
              <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/50 text-emerald-600 flex items-center justify-center mx-auto ring-8 ring-emerald-50 dark:ring-emerald-900/30">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                {t('subscribe.success')}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 max-w-md mx-auto">
                Your profile is now live in the MyClub network for prospective students, sponsors, clubs, and sports fans.
              </p>
              <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={handleViewProfile}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl shadow-lg shadow-red-600/25 transition"
                >
                  <span>{t('subscribe.viewProfile')}</span>
                  <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                </button>
                <button
                  onClick={handleClose}
                  className="px-6 py-3 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-semibold rounded-xl transition"
                >
                  {t('action.close')}
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Step 1: Member Type Selector */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                  {t('subscribe.selectType')}
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {[
                    { type: 'club', label: t('subscribe.typeClub'), icon: Building },
                    { type: 'coach', label: t('subscribe.typeCoach'), icon: UserCheck },
                    { type: 'athlete', label: t('subscribe.typeAthlete'), icon: Trophy },
                    { type: 'organizer', label: t('subscribe.typeOrganizer'), icon: Award },
                  ].map((item) => {
                    const Icon = item.icon;
                    const isSelected = memberType === item.type;
                    return (
                      <button
                        type="button"
                        key={item.type}
                        onClick={() => setMemberType(item.type as MemberType)}
                        className={`p-3 rounded-2xl border text-center transition flex flex-col items-center gap-1.5 ${
                          isSelected
                            ? 'border-red-600 bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 font-bold shadow-sm'
                            : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/60 text-slate-700 dark:text-slate-300'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                        <span className="text-xs leading-tight">{item.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 2: Form Inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    {t('subscribe.nameLabel')} *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-red-600 focus:outline-none"
                    placeholder={
                      memberType === 'coach'
                        ? 'e.g. Coach Mehdi Al-Alawi'
                        : memberType === 'athlete'
                        ? 'e.g. Bilal "The Cobra" Kasmi'
                        : memberType === 'organizer'
                        ? 'e.g. Arab Combat Federation'
                        : 'e.g. Casablanca MMA Academy'
                    }
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    {t('subscribe.disciplineLabel')} *
                  </label>
                  <select
                    value={formData.discipline}
                    onChange={(e) => setFormData({ ...formData, discipline: e.target.value as MartialArtDiscipline })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-red-600 focus:outline-none"
                  >
                    <option value="bjj">{t('discipline.bjj')}</option>
                    <option value="judo">{t('discipline.judo')}</option>
                    <option value="karate">{t('discipline.karate')}</option>
                    <option value="boxing">{t('discipline.boxing')}</option>
                    <option value="kickboxing">{t('discipline.kickboxing')}</option>
                    <option value="muaythai">{t('discipline.muaythai')}</option>
                    <option value="mma">{t('discipline.mma')}</option>
                    <option value="taekwondo">{t('discipline.taekwondo')}</option>
                    <option value="wrestling">{t('discipline.wrestling')}</option>
                    <option value="kungfu">{t('discipline.kungfu')}</option>
                    <option value="aikido">{t('discipline.aikido')}</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    {t('subscribe.emailLabel')} *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-red-600 focus:outline-none"
                    placeholder="pro@myclub.com"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    {t('subscribe.phoneLabel')} *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-red-600 focus:outline-none"
                    placeholder="+212 600 000 000"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    {t('subscribe.countryLabel')} & {t('subscribe.cityLabel')} *
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      required
                      value={formData.country}
                      onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-red-600 focus:outline-none"
                      placeholder="Country"
                    />
                    <input
                      type="text"
                      required
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-red-600 focus:outline-none"
                      placeholder="City"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    {t('subscribe.titleOrRankLabel')}
                  </label>
                  <input
                    type="text"
                    value={formData.titleOrRank}
                    onChange={(e) => setFormData({ ...formData, titleOrRank: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-red-600 focus:outline-none"
                    placeholder="e.g. 2nd Dan Black Belt / Head Trainer"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  {t('subscribe.bioLabel')} *
                </label>
                <textarea
                  rows={2}
                  required
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-red-600 focus:outline-none resize-none"
                  placeholder="Describe your background, coaching philosophy, fight experience, or regulatory jurisdiction..."
                ></textarea>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    {memberType === 'coach'
                      ? 'Coaching Skills (comma separated)'
                      : memberType === 'athlete'
                      ? 'Division & Weight Class'
                      : memberType === 'organizer'
                      ? 'Jurisdiction & Governing Scope'
                      : 'Club Facilities'}
                  </label>
                  <input
                    type="text"
                    value={formData.skillsOrServices}
                    onChange={(e) => setFormData({ ...formData, skillsOrServices: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-red-600 focus:outline-none"
                    placeholder="e.g. Competition Camp, No-Gi, Pads Work"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    {memberType === 'coach'
                      ? 'Hourly Rate or Session Fee'
                      : memberType === 'athlete'
                      ? 'Sponsorship Goal / Inquiries'
                      : memberType === 'organizer'
                      ? 'Sanctioning Guidelines Link'
                      : 'Monthly Membership Fee'}
                  </label>
                  <input
                    type="text"
                    value={formData.pricingOrSponsorship}
                    onChange={(e) => setFormData({ ...formData, pricingOrSponsorship: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-red-600 focus:outline-none"
                    placeholder="e.g. $45 / 60 min session"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  {t('subscribe.websiteLabel')}
                </label>
                <input
                  type="text"
                  value={formData.websiteOrSocial}
                  onChange={(e) => setFormData({ ...formData, websiteOrSocial: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-red-600 focus:outline-none"
                  placeholder="https://instagram.com/myclub_profile"
                />
              </div>

              {/* Submit Buttons */}
              <div className="flex gap-3 pt-3">
                <button
                  type="button"
                  onClick={handleClose}
                  className="flex-1 py-3 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold rounded-xl text-sm transition"
                >
                  {t('action.close')}
                </button>
                <button
                  type="submit"
                  className="flex-2 py-3 bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-bold rounded-xl text-sm transition shadow-lg shadow-red-600/25"
                >
                  {t('subscribe.submitBtn')}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

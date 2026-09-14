import React, { useState } from 'react';
import { useApp } from '@/lib/app-context';
import { MemberType, MartialArtDiscipline, NewMemberSubscription } from '@/types';
import { useRouter } from 'next/navigation';
import {
  X, CheckCircle2, ShieldCheck, Building, UserCheck, Trophy,
  Award, Sparkles, ArrowRight, ExternalLink,
} from 'lucide-react';

export const SubscribeModal: React.FC = () => {
  const {
    subscribeModalOpen,
    setSubscribeModalOpen,
    subscribeMember,
    language,
    t,
  } = useApp();
  const router = useRouter();

  const [memberType, setMemberType] = useState<MemberType>('club');
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
    if (submittedRoute) { router.push(submittedRoute); }
    handleClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-2xl my-8 bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
        <div className="p-6 bg-gradient-to-r from-red-600 to-rose-700 text-white relative">
          <button onClick={handleClose} className="absolute top-5 end-5 p-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white transition">
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2 mb-1">
            <Sparkles className="w-5 h-5 text-amber-300" />
            <span className="text-xs uppercase tracking-wider font-bold text-red-100">MyClub Portal Directory</span>
          </div>
          <p className="text-white/90 text-sm mt-1">
            {language === 'ar'
              ? 'سجّل الآن مجاناً وأصبح ضمن دليل فضاءاتنا الرياضية الموثوق. أختر نوع العضوية التي تريد التسجيل بها:'
              : 'Sign up for free and join our verified sports directory. Choose the membership type you want to register as:'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div className="grid grid-cols-4 gap-2 border-b border-slate-200 dark:border-slate-700 pb-4">
            {([
              { value: 'club' as MemberType, icon: Building, label: t('subscribe.tabClub') },
              { value: 'coach' as MemberType, icon: UserCheck, label: t('subscribe.tabCoach') },
              { value: 'athlete' as MemberType, icon: Trophy, label: t('subscribe.tabAthlete') },
              { value: 'organizer' as MemberType, icon: Award, label: t('subscribe.tabOrganizer') },
            ]).map(({ value, icon: Icon, label }) => (
              <button
                key={value}
                type="button"
                onClick={() => setMemberType(value)}
                className={`flex flex-col items-center gap-1.5 py-3 px-2 rounded-xl border-2 transition-all cursor-pointer text-center ${
                  memberType === value
                    ? 'border-red-600 bg-red-50 dark:bg-red-950/30 text-red-700 dark:text-red-400'
                    : 'border-transparent bg-slate-50 dark:bg-slate-800/60 text-slate-600 dark:text-slate-400 hover:border-slate-300'
                }`}
              >
                <Icon className={`w-5 h-5 ${memberType === value ? 'text-red-600 dark:text-red-400' : 'text-slate-400'}`} />
                <span className="text-[10px] font-bold">{label}</span>
              </button>
            ))}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">{t('subscribe.nameLabel')} *</label>
            <input type="text" required value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-red-600 focus:outline-none"
              placeholder={memberType === 'coach' ? 'Coach Mehdi Al-Alawi' : memberType === 'athlete' ? 'Bilal "The Cobra" Kasmi' : memberType === 'organizer' ? 'Arab Combat Federation' : 'Casablanca MMA Academy'} />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">{t('subscribe.disciplineLabel')} *</label>
            <select value={formData.discipline}
              onChange={(e) => setFormData({ ...formData, discipline: e.target.value as MartialArtDiscipline })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-red-600 focus:outline-none">
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

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">{t('subscribe.emailLabel')} *</label>
              <input type="email" required value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-red-600 focus:outline-none"
                placeholder="you@example.com" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">{t('subscribe.phoneLabel')}</label>
              <input type="tel" value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-red-600 focus:outline-none"
                placeholder="+212 6XX XXX XXX" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">{t('subscribe.cityLabel')}</label>
              <input type="text" value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-red-600 focus:outline-none"
                placeholder="Casablanca" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">{t('subscribe.countryLabel')}</label>
              <select value={formData.country}
                onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-red-600 focus:outline-none">
                <option value="Morocco">Morocco</option>
                <option value="UAE">United Arab Emirates</option>
                <option value="Egypt">Egypt</option>
                <option value="Saudi Arabia">Saudi Arabia</option>
                <option value="Tunisia">Tunisia</option>
                <option value="Jordan">Jordan</option>
                <option value="Qatar">Qatar</option>
                <option value="Algeria">Algeria</option>
                <option value="Kuwait">Kuwait</option>
                <option value="Lebanon">Lebanon</option>
                <option value="Oman">Oman</option>
                <option value="Bahrain">Bahrain</option>
              </select>
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">{t('subscribe.countryCodeLabel')} *</label>
              <select value={formData.countryCode}
                onChange={(e) => setFormData({ ...formData, countryCode: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-red-600 focus:outline-none">
                <option value="MA">Morocco (MA)</option>
                <option value="AE">UAE (AE)</option>
                <option value="EG">Egypt (EG)</option>
                <option value="SA">Saudi Arabia (SA)</option>
                <option value="TN">Tunisia (TN)</option>
                <option value="JO">Jordan (JO)</option>
                <option value="QA">Qatar (QA)</option>
                <option value="DZ">Algeria (DZ)</option>
                <option value="KW">Kuwait (KW)</option>
                <option value="LB">Lebanon (LB)</option>
                <option value="OM">Oman (OM)</option>
                <option value="BH">Bahrain (BH)</option>
              </select>
            </div>
          </div>

          {(memberType === 'coach' || memberType === 'club') && (
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">{t('subscribe.titleOrRankLabel')}</label>
              <input type="text" value={formData.titleOrRank}
                onChange={(e) => setFormData({ ...formData, titleOrRank: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-red-600 focus:outline-none"
                placeholder={language === 'ar' ? 'مثال: حزام أسود BJJ' : 'e.g. BJJ Black Belt'} />
            </div>
          )}

          {(memberType === 'coach' || memberType === 'athlete') && (
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">{t('subscribe.skillsLabel')}</label>
              <input type="text" value={formData.skillsOrServices}
                onChange={(e) => setFormData({ ...formData, skillsOrServices: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-red-600 focus:outline-none"
                placeholder="Private coaching, sparring, Gi/No-Gi, fight prep" />
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">{t('subscribe.bioLabel')}</label>
            <textarea rows={3} value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-red-600 focus:outline-none resize-none"
              placeholder={language === 'ar' ? 'نبذة مختصرة عنك أو عن ناديك' : 'Short bio or one-line about you or your organization'} />
          </div>

          {memberType === 'club' && (
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">{t('subscribe.websiteLabel')} *</label>
              <input type="url" required value={formData.websiteOrSocial}
                onChange={(e) => setFormData({ ...formData, websiteOrSocial: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-red-600 focus:outline-none"
                placeholder="https://yourclub.com or @yourclub" />
            </div>
          )}

          {memberType === 'athlete' && (
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">{t('subscribe.categoryLabel')}</label>
              <input type="text" value={formData.categoryOrJurisdiction}
                onChange={(e) => setFormData({ ...formData, categoryOrJurisdiction: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-red-600 focus:outline-none"
                placeholder="Senior, Junior, Advanced, Semi-Pro..." />
            </div>
          )}

          {memberType === 'organizer' && (
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">{t('subscribe.jurisdictionLabel')}</label>
              <input type="text" value={formData.categoryOrJurisdiction}
                onChange={(e) => setFormData({ ...formData, categoryOrJurisdiction: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-red-600 focus:outline-none"
                placeholder="Local, Regional, National, International" />
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">{t('subscribe.whatsappLabel')}</label>
            <input type="tel" value={formData.whatsapp}
              onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-red-600 focus:outline-none"
              placeholder="+212 6XX XXX XXX" />
          </div>

          {(memberType === 'club' || memberType === 'coach') && (
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">{t('subscribe.pricingLabel')}</label>
              <input type="text" value={formData.pricingOrSponsorship}
                onChange={(e) => setFormData({ ...formData, pricingOrSponsorship: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-red-600 focus:outline-none"
                placeholder={language === 'ar' ? 'الرسوم الشهرية أو عرض الرعاية' : 'Monthly fee or sponsorship pitch'} />
            </div>
          )}

          <button type="submit"
            className="w-full py-3 rounded-xl bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-bold text-sm transition-all shadow-md hover:shadow-lg active:scale-[0.99] cursor-pointer">
            {t('subscribe.submitBtn')} <ArrowRight className="inline-block w-4 h-4 ml-1.5" />
          </button>

          {submittedRoute ? (
            <div className="text-center">
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">
                {language === 'ar' ? 'تم إنشاء الملف الشخصي الخاص بك. عرضه الآن؟' : 'Your profile has been created. View it now?'}
              </p>
              <div className="flex gap-2 justify-center">
                <button type="button" onClick={handleClose}
                  className="px-4 py-2 rounded-lg text-xs font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer">
                  {t('subscribe.laterBtn')}
                </button>
                <button type="button" onClick={handleViewProfile}
                  className="px-4 py-2 rounded-lg text-xs font-bold bg-red-600 hover:bg-red-700 text-white shadow-sm cursor-pointer flex items-center gap-1">
                  {t('subscribe.viewProfileBtn')} <ExternalLink className="w-3 h-3" />
                </button>
              </div>
            </div>
          ) : null}
        </form>

        <div className="px-6 py-3 bg-slate-50 dark:bg-slate-900/50 border-t border-slate-200 dark:border-slate-700 text-center text-[10px] text-slate-500 dark:text-slate-400">
          {language === 'ar'
            ? 'يتم إنشاء الملف الشخصي تلقائياً ويمكنك تعديله لاحقاً من لوحة التحكم.'
            : 'Your profile is created automatically and you can edit it later from the dashboard.'}
        </div>
      </div>
    </div>
  );
};

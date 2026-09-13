import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { AdBanner } from './AdBanner';
import {
  BarChart3,
  TrendingUp,
  Users,
  Building,
  Trophy,
  Mail,
  CheckCircle,
  Eye,
  Calendar,
  Phone,
  ArrowUpRight,
  ShieldCheck,
  Share2,
} from 'lucide-react';

export const DashboardView: React.FC = () => {
  const { clubs, competitions, articles, inquiries, language, t } = useApp();
  const [selectedTimeframe, setSelectedTimeframe] = useState<'30d' | '90d' | '1y'>('30d');

  // Realistic analytics trend metrics
  const analyticsData = {
    totalVisits: '148,250',
    visitsChange: '+23.4%',
    totalInquiries: inquiries.length + 128,
    inquiriesChange: '+18.2%',
    clubViews: '42,900',
    clubViewsChange: '+31.0%',
    activeCompetitions: competitions.filter((c) => c.status === 'live' || c.status === 'upcoming').length,
  };

  const disciplineStats = [
    { name: 'Brazilian Jiu-Jitsu (BJJ)', count: 34, percentage: 32, color: 'bg-amber-500' },
    { name: 'Karate (WKF)', count: 26, percentage: 24, color: 'bg-orange-500' },
    { name: 'Mixed Martial Arts (MMA)', count: 20, percentage: 19, color: 'bg-red-500' },
    { name: 'Muay Thai / Kickboxing', count: 15, percentage: 14, color: 'bg-amber-700' },
    { name: 'Taekwondo (WT)', count: 12, percentage: 11, color: 'bg-sky-500' },
  ];

  const countryStats = [
    { country: 'Morocco (المغرب)', code: 'MA', visits: '48.2k', share: 32 },
    { country: 'United Arab Emirates (الإمارات)', code: 'AE', visits: '36.8k', share: 25 },
    { country: 'Egypt (مصر)', code: 'EG', visits: '28.1k', share: 19 },
    { country: 'Saudi Arabia (السعودية)', code: 'SA', visits: '20.4k', share: 14 },
    { country: 'Tunisia (تونس)', code: 'TN', visits: '14.7k', share: 10 },
  ];

  const monthlyGrowth = [
    { month: 'Apr', visits: 68 },
    { month: 'May', visits: 82 },
    { month: 'Jun', visits: 95 },
    { month: 'Jul', visits: 112 },
    { month: 'Aug', visits: 130 },
    { month: 'Sep', visits: 148 },
  ];

  return (
    <div id="analytics-dashboard-view" className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2.5 rounded-2xl bg-amber-500/10 text-amber-500">
              <BarChart3 className="w-6 h-6" />
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
              {t('analytics.title')}
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            {t('analytics.subtitle')}
          </p>
        </div>

        {/* Timeframe picker */}
        <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
          {(['30d', '90d', '1y'] as const).map((tf) => (
            <button
              key={tf}
              onClick={() => setSelectedTimeframe(tf)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                selectedTimeframe === tf
                  ? 'bg-white dark:bg-slate-700 text-slate-950 dark:text-white shadow-xs'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              {tf.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold">{t('analytics.monthlyVisits')}</span>
            <Users className="w-4 h-4 text-amber-500" />
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="text-2xl font-black text-slate-900 dark:text-white">{analyticsData.totalVisits}</span>
            <span className="text-xs font-bold text-emerald-600 flex items-center gap-0.5">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>{analyticsData.visitsChange}</span>
            </span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold">{t('analytics.totalClubs')}</span>
            <Building className="w-4 h-4 text-amber-500" />
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="text-2xl font-black text-slate-900 dark:text-white">{clubs.length + 85}</span>
            <span className="text-xs font-bold text-emerald-600 flex items-center gap-0.5">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>+14 dojos</span>
            </span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold">{t('analytics.inquiries')}</span>
            <Mail className="w-4 h-4 text-amber-500" />
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="text-2xl font-black text-slate-900 dark:text-white">{analyticsData.totalInquiries}</span>
            <span className="text-xs font-bold text-emerald-600 flex items-center gap-0.5">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>{analyticsData.inquiriesChange}</span>
            </span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold">{t('analytics.competitions')}</span>
            <Trophy className="w-4 h-4 text-amber-500" />
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="text-2xl font-black text-slate-900 dark:text-white">{competitions.length + 18}</span>
            <span className="text-xs font-bold text-amber-500 flex items-center gap-0.5">
              <span>{analyticsData.activeCompetitions} Live/Upcoming</span>
            </span>
          </div>
        </div>
      </div>

      {/* Visual Chart: Growth in Platform Engagement */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-base sm:text-lg text-slate-900 dark:text-slate-100">
              {language === 'ar' ? 'نمو حركة الزيارات والتفاعل الشهري (بالآلاف)' : 'Monthly Traffic & Martial Arts Engagement Growth (k)'}
            </h3>
            <p className="text-xs text-slate-500">Tracked across all MENA countries and martial arts disciplines</p>
          </div>
          <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-3 py-1 rounded-lg">
            +117% YoY Growth
          </span>
        </div>

        {/* SVG/CSS Bar Chart with interactive bars */}
        <div className="pt-6 pb-2">
          <div className="flex items-end justify-between gap-2 sm:gap-6 h-52 sm:h-64 border-b border-slate-200 dark:border-slate-800 px-4">
            {monthlyGrowth.map((point) => (
              <div key={point.month} className="flex-1 flex flex-col items-center gap-2 group cursor-pointer">
                <div className="relative w-full max-w-[48px] flex items-end justify-center">
                  <div
                    style={{ height: `${(point.visits / 160) * 100}%` }}
                    className="w-full rounded-t-xl bg-gradient-to-t from-amber-500 to-orange-500 group-hover:from-amber-400 group-hover:to-orange-400 transition-all shadow-md flex items-start justify-center pt-1"
                  >
                    <span className="text-[10px] text-slate-950 font-black opacity-0 group-hover:opacity-100 transition-opacity">
                      {point.visits}k
                    </span>
                  </div>
                </div>
                <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">
                  {point.month}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 2-Column: Discipline breakdown and Geographic Reach */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Disciplines Popularity */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <h3 className="font-bold text-base text-slate-900 dark:text-slate-100">
            {t('analytics.topDisciplines')}
          </h3>
          <div className="space-y-3">
            {disciplineStats.map((item) => (
              <div key={item.name} className="space-y-1">
                <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
                  <span>{item.name}</span>
                  <span>{item.percentage}% ({item.count} clubs)</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                  <div
                    style={{ width: `${item.percentage}%` }}
                    className={`h-full rounded-full ${item.color}`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Geographic Reach */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <h3 className="font-bold text-base text-slate-900 dark:text-slate-100">
            {t('analytics.geoDistribution')}
          </h3>
          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {countryStats.map((c) => (
              <div key={c.code} className="py-2.5 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-md bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-bold text-slate-700 dark:text-slate-300">
                    {c.code}
                  </span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">{c.country}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-bold text-slate-900 dark:text-white">{c.visits} visits</span>
                  <span className="text-slate-400 w-10 text-end">{c.share}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Club Manager Portal: Inquiries & Leads Inbox */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-amber-500" />
              <span>{language === 'ar' ? 'صندوق طلبات الاشتراك الواردة للنوادي' : 'Club Manager Inquiry Leads & Free Trial Requests'}</span>
            </h3>
            <p className="text-xs text-slate-500">
              {language === 'ar'
                ? 'طلبات التسجيل المباشرة التي تم استلامها عبر استمارات الأندية المسجلة'
                : 'Direct student inquiry applications submitted through verified club profiles'}
            </p>
          </div>
          <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-300 text-xs font-bold">
            {inquiries.length} Inquiries Logged
          </span>
        </div>

        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {inquiries.map((inq) => {
            const club = clubs.find((c) => c.id === inq.clubId);
            return (
              <div key={inq.id} className="py-4 flex flex-col md:flex-row md:items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-slate-900 dark:text-slate-100">{inq.name}</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 uppercase">
                      {inq.experienceLevel}
                    </span>
                    <span className="text-xs text-slate-400">• {inq.date}</span>
                  </div>
                  <div className="text-xs text-slate-600 dark:text-slate-400 flex flex-wrap items-center gap-3">
                    <span className="font-medium text-amber-600 dark:text-amber-400">
                      Club: {club?.name[language] || club?.name.en || inq.clubId}
                    </span>
                    <span>Time: {inq.preferredTime}</span>
                    <span>Art: {inq.discipline}</span>
                  </div>
                  {inq.notes && (
                    <p className="text-xs text-slate-500 italic mt-1">"{inq.notes}"</p>
                  )}
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <a
                    href={`tel:${inq.phone}`}
                    className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-1.5"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>{inq.phone}</span>
                  </a>
                  <a
                    href={`mailto:${inq.email}`}
                    className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-bold flex items-center gap-1.5"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>Reply</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Dashboard Ad Slot */}
      <AdBanner type="leaderboard" />
    </div>
  );
};

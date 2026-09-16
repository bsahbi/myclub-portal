'use client';
import React, { useState } from 'react';
import { useApp } from '@/lib/app-context';
import { AdSenseConfigSchema } from '../schemas';
import { X, CheckCircle2, AlertCircle, Code, ShieldCheck } from 'lucide-react';

export const AdSenseConfigModal: React.FC = () => {
  const { adModalOpen, setAdModalOpen, adSettings, updateAdSettings, t, language } = useApp();
  const [formData, setFormData] = useState({
    clientCode: adSettings.clientCode,
    leaderboardSlot: adSettings.leaderboardSlot,
    sidebarSlot: adSettings.sidebarSlot,
    inFeedSlot: adSettings.inFeedSlot,
    enabled: adSettings.enabled,
    showTestBanners: adSettings.showTestBanners,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!adModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = AdSenseConfigSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0].toString()] = err.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    updateAdSettings(result.data);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      setAdModalOpen(false);
    }, 1200);
  };

  return (
    <div
      id="adsense-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs"
    >
      <div
        id="adsense-modal-card"
        className="relative w-full max-w-lg rounded-2xl bg-white dark:bg-slate-900 shadow-2xl border border-slate-200 dark:border-slate-800 p-6 overflow-hidden"
      >
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400">
              <Code className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 dark:text-slate-100 text-lg">
                {t('ad.configure')}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Google AdSense & Custom Ad Monetization Engine
              </p>
            </div>
          </div>
          <button
            onClick={() => setAdModalOpen(false)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {savedSuccess ? (
          <div className="py-8 flex flex-col items-center justify-center text-emerald-600 dark:text-emerald-400 gap-2">
            <CheckCircle2 className="w-12 h-12 animate-bounce" />
            <span className="font-semibold text-base">
              {language === 'ar' ? 'تم حفظ إعدادات AdSense بنجاح!' : 'AdSense settings updated successfully!'}
            </span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-4 space-y-4">
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
              <div>
                <span className="font-semibold text-sm text-slate-900 dark:text-slate-100 block">
                  {language === 'ar' ? 'تفعيل الإعلانات' : 'Enable Ad Placements'}
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  {language === 'ar'
                    ? 'عرض المساحات الإعلانية في الترويسة والشريط الجانبي وقائمة المقالات'
                    : 'Show ad units across leaderboard, sidebar, and in-feed positions'}
                </span>
              </div>
              <input
                type="checkbox"
                checked={formData.enabled}
                onChange={(e) => setFormData({ ...formData, enabled: e.target.checked })}
                className="w-5 h-5 accent-amber-600 rounded cursor-pointer"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                {t('ad.clientId')}
              </label>
              <input
                type="text"
                value={formData.clientCode}
                onChange={(e) => setFormData({ ...formData, clientCode: e.target.value })}
                placeholder="ca-pub-1234567890123456"
                className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-amber-500 outline-none"
              />
              {errors.clientCode && (
                <p className="text-xs text-rose-500 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {errors.clientCode}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Leaderboard Slot
                </label>
                <input
                  type="text"
                  value={formData.leaderboardSlot}
                  onChange={(e) => setFormData({ ...formData, leaderboardSlot: e.target.value })}
                  placeholder="8492019482"
                  className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-amber-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Sidebar Slot
                </label>
                <input
                  type="text"
                  value={formData.sidebarSlot}
                  onChange={(e) => setFormData({ ...formData, sidebarSlot: e.target.value })}
                  placeholder="9384728192"
                  className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-amber-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  In-Feed Slot
                </label>
                <input
                  type="text"
                  value={formData.inFeedSlot}
                  onChange={(e) => setFormData({ ...formData, inFeedSlot: e.target.value })}
                  placeholder="7291048291"
                  className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-amber-500 outline-none"
                />
              </div>
            </div>

            <div className="p-3 rounded-xl bg-amber-50/80 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/40 text-xs text-amber-900 dark:text-amber-300 flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 shrink-0 mt-0.5" />
              <span>
                {language === 'ar'
                  ? 'يتم حقن وسم AdSense القياسي تلقائياً في الصفحة عند تشغيل التطبيق في النطاق الإنتاجي.'
                  : 'Standard AdSense async script is automatically injected in production build when publisher ID is supplied.'}
              </span>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setAdModalOpen(false)}
                className="px-4 py-2 text-xs font-semibold rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              >
                {t('action.close')}
              </button>
              <button
                type="submit"
                className="px-5 py-2 text-xs font-bold rounded-lg bg-amber-500 hover:bg-amber-600 text-slate-950 shadow-md transition-transform active:scale-95 cursor-pointer"
              >
                {t('ad.saveSettings')}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

import React from 'react';
import { useApp } from '../context/AppContext';
import { Sparkles, Settings, ExternalLink } from 'lucide-react';

interface AdBannerProps {
  type: 'leaderboard' | 'sidebar' | 'infeed';
  className?: string;
}

export const AdBanner: React.FC<AdBannerProps> = ({ type, className = '' }) => {
  const { adSettings, setAdModalOpen, t, language } = useApp();

  if (!adSettings.enabled) {
    return null;
  }

  const isRtl = language === 'ar';

  if (type === 'leaderboard') {
    return (
      <div
        id="ad-leaderboard-container"
        className={`w-full max-w-5xl mx-auto my-4 overflow-hidden rounded-xl border border-dashed border-amber-300 dark:border-amber-800/60 bg-gradient-to-r from-amber-50/70 via-orange-50/50 to-amber-50/70 dark:from-amber-950/20 dark:via-orange-950/20 dark:to-amber-950/20 p-2 sm:p-3 text-center transition-all ${className}`}
      >
        <div className="flex items-center justify-between px-2 pb-1 text-[11px] text-amber-800/80 dark:text-amber-400 font-medium">
          <span className="flex items-center gap-1">
            <span className="px-1.5 py-0.5 rounded bg-amber-200/60 dark:bg-amber-900/60 uppercase tracking-wider text-[10px]">
              {t('ad.sponsored')}
            </span>
            <span>Google AdSense (728x90 / Responsive)</span>
          </span>
          <button
            onClick={() => setAdModalOpen(true)}
            title={t('ad.configure')}
            className="flex items-center gap-1 hover:text-amber-950 dark:hover:text-amber-200 transition-colors cursor-pointer"
          >
            <Settings className="w-3 h-3" />
            <span>{adSettings.clientCode || 'ca-pub-demo'}</span>
          </button>
        </div>

        {/* Real Ad banner visual slot */}
        <div className="mt-1 flex flex-col sm:flex-row items-center justify-between gap-3 p-3 rounded-lg bg-white/80 dark:bg-slate-900/80 border border-amber-200/50 dark:border-amber-900/30">
          <div className="flex items-center gap-3 text-start">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-tr from-amber-500 to-red-500 flex items-center justify-center text-white font-bold shrink-0 shadow-sm">
              🥋
            </div>
            <div>
              <div className="font-semibold text-slate-900 dark:text-slate-100 text-sm sm:text-base flex items-center gap-1.5">
                <span>Hayabusa & Venum MENA Official Store</span>
                <span className="text-xs text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-50 dark:bg-emerald-950/50 px-1.5 py-0.5 rounded">
                  25% OFF
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                {language === 'ar'
                  ? 'أفضل معدات الجيو جيتسو، الكاراتيه والمواي تاي مع توصيل مجاني لدول الخليج والمغرب العربي'
                  : 'Premium Gi, gloves, and protective fightwear with expedited express shipping across MENA'}
              </p>
            </div>
          </div>
          <button
            onClick={() => window.open('https://google.com', '_blank')}
            className="shrink-0 px-4 py-1.5 text-xs font-semibold rounded-lg bg-amber-500 hover:bg-amber-600 text-slate-950 shadow-sm flex items-center gap-1 transition-transform active:scale-95 cursor-pointer"
          >
            <span>{language === 'ar' ? 'تسوق العرض' : 'Shop Gear'}</span>
            <ExternalLink className="w-3 h-3" />
          </button>
        </div>
      </div>
    );
  }

  if (type === 'sidebar') {
    return (
      <div
        id="ad-sidebar-container"
        className={`w-full overflow-hidden rounded-xl border border-dashed border-amber-300 dark:border-amber-800/60 bg-gradient-to-b from-amber-50/70 to-orange-50/50 dark:from-amber-950/20 dark:to-orange-950/20 p-3 text-center transition-all ${className}`}
      >
        <div className="flex items-center justify-between pb-2 text-[11px] text-amber-800/80 dark:text-amber-400 font-medium">
          <span className="px-1.5 py-0.5 rounded bg-amber-200/60 dark:bg-amber-900/60 uppercase tracking-wider text-[10px]">
            {t('ad.sponsored')}
          </span>
          <button
            onClick={() => setAdModalOpen(true)}
            className="flex items-center gap-1 hover:text-amber-950 dark:hover:text-amber-200 cursor-pointer"
          >
            <Settings className="w-3 h-3" />
          </button>
        </div>

        <div className="rounded-lg bg-white/90 dark:bg-slate-900/90 p-4 border border-amber-200/60 dark:border-amber-900/40 text-start flex flex-col gap-3">
          <div className="h-32 w-full rounded-md overflow-hidden relative">
            <img
              src="https://images.unsplash.com/photo-1517438322307-e67111335449?q=80&w=600&auto=format&fit=crop"
              alt="Ad Banner"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-2 text-white text-xs font-bold">
              Combat Nutrition & Recovery Whey
            </div>
          </div>
          <div>
            <div className="font-bold text-sm text-slate-900 dark:text-slate-100">
              {language === 'ar' ? 'مكملات الطاقة الكهرلية للرياضيين' : 'Electrolyte Hydration for Fighters'}
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              {language === 'ar'
                ? 'حافظ على ترطيب عضلاتك وتجنب التشنجات أثناء التمارين الشاقة في الصيف.'
                : 'Formulated specifically for martial artists cutting weight and intense sparring rounds.'}
            </p>
          </div>
          <button
            onClick={() => window.open('https://google.com', '_blank')}
            className="w-full py-2 text-xs font-bold rounded-lg bg-slate-900 hover:bg-slate-800 text-white dark:bg-amber-500 dark:hover:bg-amber-600 dark:text-slate-950 text-center transition-colors cursor-pointer"
          >
            {language === 'ar' ? 'اكتشف العرض الخاص' : 'Claim 20% Discount'}
          </button>
        </div>
      </div>
    );
  }

  // in-feed ad
  return (
    <div
      id="ad-infeed-container"
      className={`w-full my-4 rounded-xl border border-dashed border-amber-300 dark:border-amber-800/60 bg-amber-50/40 dark:bg-amber-950/10 p-3 sm:p-4 flex flex-col sm:flex-row items-center justify-between gap-4 ${className}`}
    >
      <div className="flex items-center gap-3">
        <span className="px-2 py-0.5 rounded bg-amber-200 text-amber-900 dark:bg-amber-900 dark:text-amber-200 text-[10px] font-bold uppercase tracking-wider shrink-0">
          {t('ad.sponsored')}
        </span>
        <div className="text-sm font-medium text-slate-800 dark:text-slate-200">
          {language === 'ar'
            ? 'احصل على تذاكر بطولة أبوظبي للمحترفين مع خصم إضافي للمشتركين'
            : 'Get exclusive VIP passes for Abu Dhabi World Pro Championships'}
        </div>
      </div>
      <button
        onClick={() => setAdModalOpen(true)}
        className="text-xs text-amber-700 dark:text-amber-400 hover:underline shrink-0 cursor-pointer flex items-center gap-1"
      >
        <Sparkles className="w-3 h-3" />
        <span>{t('ad.configure')}</span>
      </button>
    </div>
  );
};

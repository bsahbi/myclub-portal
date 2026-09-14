'use client';
import { useApp } from '@/lib/app-context';
import { useRouter } from 'next/navigation';
import { Shield, Settings, Heart, Globe, Award, Mail } from 'lucide-react';

export function Footer() {
  const router = useRouter();
  const { language, t, setAdModalOpen } = useApp();
  return (
    <footer id="main-footer" className="bg-slate-950 text-slate-400 border-t border-slate-800 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-500 flex items-center justify-center text-slate-950 font-black shadow-md">🥋</div>
              <span className="text-xl font-black text-white tracking-tight">MyClub</span>
            </div>
            <p className="text-slate-400 leading-relaxed">
              {language === 'ar'
                ? 'البوابة الأولى لأندية الفنون القتالية، البطولات والأكاديميات الرياضية في منطقة الشرق الأوسط وشمال أفريقيا.'
                : 'The premier MENA portal for martial arts dojos, championship brackets, certified coaches, and combat sports analytics.'}
            </p>
          </div>
          <div className="space-y-2">
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px]">{t('nav.clubs')} & Events</h4>
            <ul className="space-y-1.5">
              <li><button onClick={() => router.push('/clubs')} className="hover:text-amber-400 transition-colors cursor-pointer">{t('nav.clubs')}</button></li>
              <li><button onClick={() => router.push('/competitions')} className="hover:text-amber-400 transition-colors cursor-pointer">{t('nav.competitions')}</button></li>
              <li><button onClick={() => router.push('/feed')} className="hover:text-amber-400 transition-colors cursor-pointer">{t('nav.feed')}</button></li>
              <li><button onClick={() => router.push('/articles')} className="hover:text-amber-400 transition-colors cursor-pointer">{t('nav.news')}</button></li>
            </ul>
          </div>
          <div className="space-y-2">
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px]">Platform & Features</h4>
            <ul className="space-y-1.5">
              <li><button onClick={() => router.push('/saved')} className="hover:text-amber-400 transition-colors cursor-pointer">{t('nav.saved')} (Offline Storage)</button></li>
              <li><button onClick={() => router.push('/dashboard')} className="hover:text-amber-400 transition-colors cursor-pointer">{t('nav.dashboard')}</button></li>
              <li><button onClick={() => setAdModalOpen(true)} className="hover:text-amber-400 transition-colors cursor-pointer flex items-center gap-1 text-amber-500"><Settings className="w-3.5 h-3.5" /><span>{t('ads.configure')}</span></button></li>
            </ul>
          </div>
          <div className="space-y-2">
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px]">MENA Hubs</h4>
            <p className="text-slate-400">Morocco • UAE • Egypt • Saudi Arabia • Tunisia • Jordan • Qatar • Algeria</p>
            <div className="pt-2">
              <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-[10px] text-amber-400 font-bold inline-block">Multilingual: العربية • Français • English</span>
            </div>
          </div>
        </div>
        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px]">
          <p>© {new Date().getFullYear()} MyClub Martial Arts Portal. All rights reserved.</p>
          <p className="flex items-center gap-1 text-slate-500"><span>Built with type-safety & multi-language RTL support</span></p>
        </div>
      </div>
    </footer>
  );
}

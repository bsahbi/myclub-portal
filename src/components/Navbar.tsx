'use client';
import {
  Menu, X, Globe, Sun, Moon, Monitor, Bell, Bookmark, Compass,
  Trophy, Newspaper, User as UserIcon, LogOut, BarChart3, DollarSign,
  Sparkles, CheckCircle2, ChevronDown, PlusCircle, Search,
} from 'lucide-react';
import { useApp } from '@/lib/app-context';
import { useRouter, usePathname } from 'next/navigation';
import { useState } from 'react';
import { Language } from '@/types';

export function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const {
    language, setLanguage, t, theme, setTheme, currentUser, logout,
    notifications, unreadNotificationCount,
    markAllNotificationsRead, requestPushPermission, hasPushPermission,
    setAuthModalOpen, setAdModalOpen, setSubscribeModalOpen, setSearchModalOpen,
    watchedClubs, bookmarkedArticles,
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [themeMenuOpen, setThemeMenuOpen] = useState(false);
  const [notifDropdownOpen, setNotifDropdownOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const navLinks = [
    { path: '/', label: t('nav.home'), icon: Compass },
    { path: '/clubs', label: t('nav.clubs'), icon: Compass },
    { path: '/competitions', label: t('nav.competitions'), icon: Trophy },
    { path: '/articles', label: t('nav.news'), icon: Newspaper },
    { path: '/feed', label: t('nav.feed'), icon: Sparkles, badge: watchedClubs.length > 0 ? watchedClubs.length : undefined },
    { path: '/saved', label: t('nav.saved'), icon: Bookmark, badge: bookmarkedArticles.length > 0 ? bookmarkedArticles.length : undefined },
    { path: '/dashboard', label: t('nav.dashboard'), icon: BarChart3 },
  ];

  const handleNav = (path: string) => { router.push(path); setMobileMenuOpen(false); };

  const isActive = (linkPath: string, link: typeof navLinks[0]) => {
    if (linkPath === '/') return pathname === '/';
    if (linkPath === '/clubs') return pathname === '/clubs' || pathname.startsWith('/club/');
    if (linkPath === '/articles') return pathname === '/articles' || pathname.startsWith('/article/');
    return pathname === linkPath;
  };

  return (
    <header id="main-app-header" className="sticky top-0 z-40 w-full border-b border-slate-200/80 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md transition-colors">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <button onClick={() => handleNav('/')} className="flex items-center gap-2.5 text-start cursor-pointer group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 via-orange-500 to-red-600 flex items-center justify-center text-white shadow-md shadow-amber-500/20 group-hover:scale-105 transition-transform">
                <span className="text-xl font-black">🥋</span>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-lg sm:text-xl tracking-tight text-slate-900 dark:text-white">{t('brand.name')}</span>
                  <span className="px-1.5 py-0.2 rounded text-[10px] font-bold bg-amber-100 text-amber-900 dark:bg-amber-900/60 dark:text-amber-300 uppercase">MENA</span>
                </div>
                <span className="text-[10px] sm:text-[11px] text-slate-500 dark:text-slate-400 hidden sm:block truncate max-w-[200px] lg:max-w-none">{t('brand.tagline')}</span>
              </div>
            </button>
          </div>

          <nav className="hidden md:flex items-center gap-1 lg:gap-1.5">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const active = isActive(link.path, link);
              return (
                <button key={link.path} onClick={() => handleNav(link.path)}
                  className={`px-3 py-2 rounded-xl text-xs lg:text-sm font-medium transition-all flex items-center gap-1.5 cursor-pointer ${active ? 'bg-amber-500/15 text-amber-700 dark:text-amber-400 font-semibold' : 'text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60'}`}>
                  <Icon className="w-4 h-4" />
                  <span>{link.label}</span>
                  {link.badge !== undefined && (<span className="px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-amber-500 text-slate-950">{link.badge}</span>)}
                </button>
              );
            })}
          </nav>

          <div className="hidden md:flex items-center gap-1.5 lg:gap-2">
            <button id="global-search-nav-btn" onClick={() => setSearchModalOpen(true)}
              className="flex items-center gap-2 px-2.5 lg:px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-100/70 dark:bg-slate-800/60 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:border-amber-500/60 transition cursor-pointer text-xs"
              title={t('search.placeholder')}>
              <Search className="w-3.5 h-3.5 text-amber-500 shrink-0" />
              <span className="hidden lg:inline truncate max-w-[130px]">{t('search.placeholderShort')}</span>
              <kbd className="hidden xl:inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] font-mono bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded text-slate-400">⌘K</kbd>
            </button>

            <button onClick={() => setAdModalOpen(true)} title={t('ad.configure')}
              className="p-2 rounded-xl text-slate-500 dark:text-slate-400 hover:text-amber-600 dark:hover:text-amber-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer">
              <DollarSign className="w-4 h-4" />
            </button>

            <div className="relative">
              <button onClick={() => { setNotifDropdownOpen(!notifDropdownOpen); setUserDropdownOpen(false); setLangMenuOpen(false); setThemeMenuOpen(false); }}
                className="relative p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer">
                <Bell className="w-4 h-4" />
                {unreadNotificationCount > 0 && (<span className="absolute top-1 right-1 w-2.5 h-2.5 bg-rose-500 rounded-full ring-2 ring-white dark:ring-slate-900 animate-pulse" />)}
              </button>
              {notifDropdownOpen && (
                <div className="absolute right-0 ltr:right-0 rtl:left-0 rtl:right-auto mt-2 w-80 sm:w-96 rounded-2xl bg-white dark:bg-slate-900 shadow-2xl border border-slate-200 dark:border-slate-800 p-3 z-50">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                    <span className="font-bold text-xs text-slate-800 dark:text-slate-200">{t('notif.title')} ({notifications.length})</span>
                    <button onClick={markAllNotificationsRead} className="text-[11px] text-amber-600 dark:text-amber-400 hover:underline cursor-pointer">{t('notif.markRead')}</button>
                  </div>
                  {!hasPushPermission && (
                    <div className="mt-2 p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/50 flex items-center justify-between text-xs text-amber-900 dark:text-amber-300">
                      <span className="text-[11px]">{t('notif.enablePush')}</span>
                      <button onClick={requestPushPermission} className="px-2 py-1 bg-amber-500 hover:bg-amber-600 text-slate-950 rounded-lg text-[10px] font-bold shadow-xs cursor-pointer">{language === 'ar' ? 'تفعيل' : 'Enable'}</button>
                    </div>
                  )}
                  <div className="mt-2 max-h-72 overflow-y-auto space-y-2">
                    {notifications.map((notif) => (
                      <div key={notif.id} onClick={() => { router.push(notif.linkRoute); setNotifDropdownOpen(false); }}
                        className={`p-2.5 rounded-xl text-start cursor-pointer transition-colors ${notif.read ? 'bg-slate-50/70 dark:bg-slate-800/40 text-slate-600 dark:text-slate-400' : 'bg-amber-50/80 dark:bg-amber-950/30 text-slate-900 dark:text-slate-100 border border-amber-200/50 dark:border-amber-900/30'}`}>
                        <div className="font-semibold text-xs leading-snug">{notif.title[language] || notif.title.en}</div>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">{notif.message[language] || notif.message.en}</p>
                        <div className="text-[10px] text-slate-400 mt-1 flex items-center justify-between">
                          <span>{notif.timestamp}</span>
                          {!notif.read && (<span className="w-1.5 h-1.5 rounded-full bg-amber-500" />)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="relative">
              <button onClick={() => { setLangMenuOpen(!langMenuOpen); setNotifDropdownOpen(false); setUserDropdownOpen(false); setThemeMenuOpen(false); }}
                className="px-2.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center gap-1.5 cursor-pointer">
                <Globe className="w-3.5 h-3.5 text-amber-500" />
                <span>{language === 'ar' ? 'العربية' : language === 'fr' ? 'FR' : 'EN'}</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>
              {langMenuOpen && (
                <div className="absolute right-0 ltr:right-0 rtl:left-0 rtl:right-auto mt-2 w-36 rounded-xl bg-white dark:bg-slate-900 shadow-xl border border-slate-200 dark:border-slate-800 py-1 z-50">
                  {(['ar', 'fr', 'en'] as Language[]).map((lang) => (
                    <button key={lang} onClick={() => { setLanguage(lang); setLangMenuOpen(false); }}
                      className={`w-full px-3 py-2 text-xs text-start flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer ${language === lang ? 'font-bold text-amber-600 dark:text-amber-400' : ''}`}>
                      <span>{lang === 'ar' ? 'العربية (RTL)' : lang === 'fr' ? 'Français' : 'English'}</span>
                      {language === lang && <CheckCircle2 className="w-3.5 h-3.5" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="relative">
              <button onClick={() => { setThemeMenuOpen(!themeMenuOpen); setLangMenuOpen(false); setNotifDropdownOpen(false); setUserDropdownOpen(false); }}
                className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer border border-transparent hover:border-slate-200 dark:hover:border-slate-700" title={`Theme: ${theme}`} aria-label="Toggle theme">
                {theme === 'light' ? <Sun className="w-4 h-4 text-amber-500" /> : theme === 'dark' ? <Moon className="w-4 h-4 text-sky-400" /> : <Monitor className="w-4 h-4 text-slate-500 dark:text-slate-300" />}
              </button>
              {themeMenuOpen && (
                <div className="absolute right-0 ltr:right-0 rtl:left-0 rtl:right-auto mt-2 w-44 rounded-xl bg-white dark:bg-slate-900 shadow-xl border border-slate-200 dark:border-slate-800 py-1.5 z-50 text-xs">
                  {[
                    { mode: 'light' as const, icon: Sun, label: t('theme.light'), color: 'text-amber-600 dark:text-amber-400 bg-amber-50/50 dark:bg-amber-950/30' },
                    { mode: 'dark' as const, icon: Moon, label: t('theme.dark'), color: 'text-sky-600 dark:text-sky-400 bg-sky-50/50 dark:bg-sky-950/30' },
                    { mode: 'system' as const, icon: Monitor, label: t('theme.system'), color: 'text-amber-600 dark:text-amber-400 bg-slate-100 dark:bg-slate-800/80' },
                  ].map(({ mode, icon: Icon, label, color }) => (
                    <button key={mode} onClick={() => { setTheme(mode); setThemeMenuOpen(false); }}
                      className={`w-full px-3 py-2 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer text-start transition-colors ${theme === mode ? color : 'text-slate-700 dark:text-slate-300'}`}>
                      <div className="flex items-center gap-2"><Icon className="w-3.5 h-3.5 text-amber-500" /><span>{label}</span></div>
                      {theme === mode && <CheckCircle2 className="w-3.5 h-3.5 text-amber-500" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button onClick={() => setSubscribeModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-red-600 hover:bg-red-700 active:bg-red-800 text-white shadow-sm transition-transform active:scale-95 cursor-pointer">
              <PlusCircle className="w-3.5 h-3.5" />
              <span>{t('subscribe.btn')}</span>
            </button>

            {currentUser ? (
              <div className="relative">
                <button onClick={() => { setUserDropdownOpen(!userDropdownOpen); setLangMenuOpen(false); setNotifDropdownOpen(false); setThemeMenuOpen(false); }}
                  className="flex items-center gap-2 p-1 rounded-full hover:ring-2 hover:ring-amber-500 transition-all cursor-pointer">
                  <img src={currentUser.avatar} alt={currentUser.name} className="w-8 h-8 rounded-full object-cover ring-1 ring-slate-200 dark:ring-slate-700" />
                </button>
                {userDropdownOpen && (
                  <div className="absolute right-0 ltr:right-0 rtl:left-0 rtl:right-auto mt-2 w-56 rounded-2xl bg-white dark:bg-slate-900 shadow-2xl border border-slate-200 dark:border-slate-800 p-3 z-50">
                    <div className="pb-2 mb-2 border-b border-slate-100 dark:border-slate-800">
                      <div className="font-bold text-xs text-slate-900 dark:text-white truncate">{currentUser.name}</div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate">{currentUser.email}</div>
                      <span className="inline-block mt-1 px-1.5 py-0.5 rounded text-[9px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">{currentUser.provider.toUpperCase()} LOGIN</span>
                    </div>
                    <button onClick={() => { handleNav('/feed'); setUserDropdownOpen(false); }} className="w-full px-2.5 py-1.5 text-xs text-start flex items-center gap-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 cursor-pointer"><Sparkles className="w-3.5 h-3.5 text-amber-500" /><span>{t('nav.feed')}</span></button>
                    <button onClick={() => { handleNav('/saved'); setUserDropdownOpen(false); }} className="w-full px-2.5 py-1.5 text-xs text-start flex items-center gap-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 cursor-pointer"><Bookmark className="w-3.5 h-3.5 text-amber-500" /><span>{t('nav.saved')}</span></button>
                    <button onClick={() => { handleNav('/dashboard'); setUserDropdownOpen(false); }} className="w-full px-2.5 py-1.5 text-xs text-start flex items-center gap-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 cursor-pointer"><BarChart3 className="w-3.5 h-3.5 text-amber-500" /><span>{t('nav.dashboard')}</span></button>
                    <div className="pt-2 mt-2 border-t border-slate-100 dark:border-slate-800">
                      <button onClick={() => { logout(); setUserDropdownOpen(false); }} className="w-full px-2.5 py-1.5 text-xs text-start flex items-center gap-2 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/30 text-rose-600 dark:text-rose-400 cursor-pointer font-medium"><LogOut className="w-3.5 h-3.5" /><span>{t('nav.logout')}</span></button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button onClick={() => setAuthModalOpen(true)} className="px-4 py-2 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-600 text-slate-950 shadow-sm transition-transform active:scale-95 cursor-pointer flex items-center gap-1.5">
                <UserIcon className="w-3.5 h-3.5" /><span>{t('nav.signin')}</span>
              </button>
            )}
          </div>

          <div className="flex items-center gap-1.5 md:hidden">
            <button id="mobile-search-nav-btn" onClick={() => setSearchModalOpen(true)} aria-label="Global Search" className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer">
              <Search className="w-5 h-5 text-amber-500" />
            </button>
            <button onClick={() => handleNav('/feed')} className="relative p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer">
              <Bell className="w-5 h-5" />
              {unreadNotificationCount > 0 && (<span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full" />)}
            </button>
            <button id="mobile-menu-toggle-btn" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer" aria-label="Toggle Navigation Menu">
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div id="mobile-nav-drawer" className="md:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 py-4 space-y-4 shadow-xl transition-all w-full max-w-full overflow-x-hidden">
          <button onClick={() => { setSearchModalOpen(true); setMobileMenuOpen(false); }} className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/70 text-slate-500 dark:text-slate-400 hover:border-amber-500 transition cursor-pointer text-xs">
            <div className="flex items-center gap-2"><Search className="w-4 h-4 text-amber-500" /><span className="truncate">{t('search.placeholder')}</span></div>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 font-mono">Search</span>
          </button>
          {currentUser ? (
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700">
              <div className="flex items-center gap-3">
                <img src={currentUser.avatar} alt={currentUser.name} className="w-10 h-10 rounded-full object-cover" />
                <div>
                  <div className="font-bold text-sm text-slate-900 dark:text-white">{currentUser.name}</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">{currentUser.email}</div>
                </div>
              </div>
              <button onClick={logout} className="p-2 text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded-lg cursor-pointer" title={t('nav.logout')}><LogOut className="w-5 h-5" /></button>
            </div>
          ) : (
            <button onClick={() => { setAuthModalOpen(true); setMobileMenuOpen(false); }} className="w-full py-2.5 rounded-xl bg-amber-500 text-slate-950 font-bold text-sm shadow-sm flex items-center justify-center gap-2 cursor-pointer">
              <UserIcon className="w-4 h-4" /><span>{t('nav.signin')} / {t('nav.signup')}</span>
            </button>
          )}
          <button onClick={() => { setSubscribeModalOpen(true); setMobileMenuOpen(false); }} className="w-full py-2.5 rounded-xl bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-bold text-sm shadow flex items-center justify-center gap-2 cursor-pointer">
            <PlusCircle className="w-4 h-4" /><span>{t('subscribe.btn')}</span>
          </button>
          <div className="grid grid-cols-2 gap-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const active = isActive(link.path, link);
              return (
                <button key={link.path} onClick={() => handleNav(link.path)}
                  className={`p-3 rounded-xl text-xs font-semibold flex items-center gap-2 text-start transition-colors cursor-pointer ${active ? 'bg-amber-500/15 text-amber-700 dark:text-amber-400 font-bold border border-amber-500/30' : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300'}`}>
                  <Icon className="w-4 h-4 text-amber-500 shrink-0" />
                  <span className="truncate">{link.label}</span>
                  {link.badge !== undefined && (<span className="px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-amber-500 text-slate-950 ml-auto">{link.badge}</span>)}
                </button>
              );
            })}
          </div>
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
            <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
              {(['ar', 'fr', 'en'] as Language[]).map((lang) => (
                <button key={lang} onClick={() => setLanguage(lang)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${language === lang ? 'bg-amber-500 text-slate-950 shadow-xs' : 'text-slate-600 dark:text-slate-400'}`}>
                  {lang === 'ar' ? 'العربية' : lang === 'fr' ? 'FR' : 'EN'}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
              <button onClick={() => setTheme('light')} className={`p-2 rounded-lg cursor-pointer transition-colors ${theme === 'light' ? 'bg-white dark:bg-slate-700 text-amber-500 shadow-xs font-bold' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'}`} title={t('theme.light')} aria-label={t('theme.light')}><Sun className="w-4 h-4" /></button>
              <button onClick={() => setTheme('dark')} className={`p-2 rounded-lg cursor-pointer transition-colors ${theme === 'dark' ? 'bg-white dark:bg-slate-700 text-sky-400 shadow-xs font-bold' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'}`} title={t('theme.dark')} aria-label={t('theme.dark')}><Moon className="w-4 h-4" /></button>
              <button onClick={() => setTheme('system')} className={`p-2 rounded-lg cursor-pointer transition-colors ${theme === 'system' ? 'bg-white dark:bg-slate-700 text-amber-600 dark:text-amber-400 shadow-xs font-bold' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'}`} title={t('theme.system')} aria-label={t('theme.system')}><Monitor className="w-4 h-4" /></button>
            </div>
          </div>
          <button onClick={() => { setAdModalOpen(true); setMobileMenuOpen(false); }} className="w-full py-2 px-3 rounded-xl border border-dashed border-amber-300 dark:border-amber-800/60 bg-amber-50/50 dark:bg-amber-950/20 text-xs text-amber-900 dark:text-amber-300 flex items-center justify-center gap-2 cursor-pointer">
            <DollarSign className="w-3.5 h-3.5" /><span>{t('ad.configure')}</span>
          </button>
        </div>
      )}
    </header>
  );
}

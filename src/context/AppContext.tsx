import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Language,
  ThemeMode,
  User,
  Club,
  Coach,
  Athlete,
  EventOrganizer,
  NewMemberSubscription,
  Article,
  Competition,
  NotificationItem,
  AdSettings,
  InquiryFormInput,
} from '../types';
import { translations } from '../i18n/translations';
import { mockClubs, mockCompetitions, mockArticles, mockNotifications } from '../data/mockData';
import { mockCoaches, mockAthletes, mockOrganizers } from '../data/memberDirectoryData';

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  currentUser: User | null;
  loginWithSocial: (provider: 'google' | 'facebook') => void;
  loginWithEmail: (email: string, name?: string) => void;
  logout: () => void;
  watchedClubs: string[];
  toggleWatchClub: (clubId: string) => void;
  isWatchingClub: (clubId: string) => boolean;
  bookmarkedArticles: string[];
  toggleBookmarkArticle: (articleId: string) => void;
  isArticleBookmarked: (articleId: string) => boolean;
  offlineArticles: Article[];
  notifications: NotificationItem[];
  unreadNotificationCount: number;
  markAllNotificationsRead: () => void;
  requestPushPermission: () => Promise<boolean>;
  hasPushPermission: boolean;
  adSettings: AdSettings;
  updateAdSettings: (settings: Partial<AdSettings>) => void;
  currentRoute: string;
  navigate: (path: string) => void;
  clubs: Club[];
  coaches: Coach[];
  athletes: Athlete[];
  organizers: EventOrganizer[];
  competitions: Competition[];
  articles: Article[];
  inquiries: (InquiryFormInput & { id: string; clubId: string; date: string })[];
  submitInquiry: (clubId: string, data: InquiryFormInput) => boolean;
  authModalOpen: boolean;
  setAuthModalOpen: (open: boolean) => void;
  adModalOpen: boolean;
  setAdModalOpen: (open: boolean) => void;
  searchModalOpen: boolean;
  setSearchModalOpen: (open: boolean) => void;
  subscribeModalOpen: boolean;
  setSubscribeModalOpen: (open: boolean) => void;
  activeDirectoryTab: 'clubs' | 'coaches' | 'athletes' | 'organizers';
  setActiveDirectoryTab: (tab: 'clubs' | 'coaches' | 'athletes' | 'organizers') => void;
  subscribeMember: (data: NewMemberSubscription) => string;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const DEFAULT_USER: User = {
  id: 'user-demo-mena',
  name: 'Karim Hadad',
  email: 'karim.hadad@mena-martialarts.com',
  avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=150&auto=format&fit=crop',
  provider: 'google',
  role: 'user',
  watchedClubs: ['club-atlas-bjj', 'club-dubai-combat-club'],
  bookmarkedArticles: ['art-bjj-guard-retention-mena'],
  favoriteCompetitions: ['comp-dubai-grand-slam-2026'],
};

const DEFAULT_AD_SETTINGS: AdSettings = {
  enabled: true,
  clientCode: 'ca-pub-8472910384729102',
  leaderboardSlot: '8492019482',
  sidebarSlot: '9384728192',
  inFeedSlot: '7291048291',
  showTestBanners: true,
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Language & RTL
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('myclub_lang');
    return (saved as Language) || 'ar';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('myclub_lang', lang);
  };

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  }, [language]);

  const t = (key: string): string => {
    return translations[language]?.[key] || translations['en']?.[key] || key;
  };

  // Theme Management (Light, Dark, System)
  const [theme, setThemeState] = useState<ThemeMode>(() => {
    const saved = localStorage.getItem('myclub_theme');
    return (saved as ThemeMode) || 'system';
  });

  const setTheme = (mode: ThemeMode) => {
    setThemeState(mode);
    localStorage.setItem('myclub_theme', mode);
  };

  useEffect(() => {
    const root = document.documentElement;
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const applyTheme = () => {
      const isDark = theme === 'dark' || (theme === 'system' && mediaQuery.matches);
      if (isDark) {
        root.classList.add('dark');
        root.setAttribute('data-theme', 'dark');
        root.style.colorScheme = 'dark';
      } else {
        root.classList.remove('dark');
        root.setAttribute('data-theme', 'light');
        root.style.colorScheme = 'light';
      }
    };

    applyTheme();
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', applyTheme);
      return () => mediaQuery.removeEventListener('change', applyTheme);
    } else if ((mediaQuery as any).addListener) {
      (mediaQuery as any).addListener(applyTheme);
      return () => (mediaQuery as any).removeListener(applyTheme);
    }
  }, [theme]);

  // Routing with URL Hash and deep-links
  const [currentRoute, setCurrentRoute] = useState<string>(() => {
    if (typeof window !== 'undefined' && window.location.hash) {
      return window.location.hash.replace('#', '') || '/';
    }
    return '/';
  });

  const navigate = (path: string) => {
    setCurrentRoute(path);
    window.location.hash = path;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      setCurrentRoute(hash || '/');
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Authentication State
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('myclub_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return DEFAULT_USER;
      }
    }
    return DEFAULT_USER;
  });

  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [adModalOpen, setAdModalOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);

  // Global keyboard shortcut for search (Cmd+K / Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && (e.key === 'k' || e.key === 'K')) {
        e.preventDefault();
        setSearchModalOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const loginWithSocial = (provider: 'google' | 'facebook') => {
    const newUser: User = {
      id: `user-${provider}-${Date.now()}`,
      name: provider === 'google' ? 'Tariq Al-Mansoor (Google)' : 'Sami Ben Amor (Facebook)',
      email: provider === 'google' ? 'tariq.mansoor@gmail.com' : 'sami.amor@facebook.com',
      avatar:
        provider === 'google'
          ? 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=150&auto=format&fit=crop'
          : 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?q=80&w=150&auto=format&fit=crop',
      provider,
      role: 'user',
      watchedClubs: ['club-atlas-bjj'],
      bookmarkedArticles: ['art-bjj-guard-retention-mena'],
      favoriteCompetitions: ['comp-dubai-grand-slam-2026'],
    };
    setCurrentUser(newUser);
    localStorage.setItem('myclub_user', JSON.stringify(newUser));
    setAuthModalOpen(false);
  };

  const loginWithEmail = (email: string, name?: string) => {
    const newUser: User = {
      id: `user-email-${Date.now()}`,
      name: name || email.split('@')[0],
      email,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=150&auto=format&fit=crop',
      provider: 'email',
      role: 'user',
      watchedClubs: ['club-atlas-bjj'],
      bookmarkedArticles: [],
      favoriteCompetitions: [],
    };
    setCurrentUser(newUser);
    localStorage.setItem('myclub_user', JSON.stringify(newUser));
    setAuthModalOpen(false);
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('myclub_user');
  };

  // Watched Clubs
  const [watchedClubs, setWatchedClubs] = useState<string[]>(() => {
    const saved = localStorage.getItem('myclub_watched_clubs');
    return saved ? JSON.parse(saved) : ['club-atlas-bjj', 'club-dubai-combat-club'];
  });

  const toggleWatchClub = (clubId: string) => {
    setWatchedClubs((prev) => {
      const next = prev.includes(clubId) ? prev.filter((id) => id !== clubId) : [...prev, clubId];
      localStorage.setItem('myclub_watched_clubs', JSON.stringify(next));
      return next;
    });
  };

  const isWatchingClub = (clubId: string) => watchedClubs.includes(clubId);

  // Bookmarked Articles with local offline sync
  const [bookmarkedArticles, setBookmarkedArticles] = useState<string[]>(() => {
    const saved = localStorage.getItem('myclub_bookmarked_articles');
    return saved ? JSON.parse(saved) : ['art-bjj-guard-retention-mena'];
  });

  const toggleBookmarkArticle = (articleId: string) => {
    setBookmarkedArticles((prev) => {
      const next = prev.includes(articleId) ? prev.filter((id) => id !== articleId) : [...prev, articleId];
      localStorage.setItem('myclub_bookmarked_articles', JSON.stringify(next));
      return next;
    });
  };

  const isArticleBookmarked = (articleId: string) => bookmarkedArticles.includes(articleId);

  // Offline cached articles
  const offlineArticles = mockArticles.filter((art) => bookmarkedArticles.includes(art.id));

  // Notifications
  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    const saved = localStorage.getItem('myclub_notifications');
    return saved ? JSON.parse(saved) : mockNotifications;
  });

  const [hasPushPermission, setHasPushPermission] = useState<boolean>(() => {
    return typeof window !== 'undefined' && 'Notification' in window && Notification.permission === 'granted';
  });

  const markAllNotificationsRead = () => {
    setNotifications((prev) => {
      const updated = prev.map((n) => ({ ...n, read: true }));
      localStorage.setItem('myclub_notifications', JSON.stringify(updated));
      return updated;
    });
  };

  const requestPushPermission = async (): Promise<boolean> => {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      try {
        const res = await Notification.requestPermission();
        const granted = res === 'granted';
        setHasPushPermission(granted);
        return granted;
      } catch {
        setHasPushPermission(true); // simulated in sandboxed environment
        return true;
      }
    }
    setHasPushPermission(true);
    return true;
  };

  const unreadNotificationCount = notifications.filter((n) => !n.read).length;

  // Monetization / AdSense Settings
  const [adSettings, setAdSettings] = useState<AdSettings>(() => {
    const saved = localStorage.getItem('myclub_ad_settings');
    return saved ? JSON.parse(saved) : DEFAULT_AD_SETTINGS;
  });

  const updateAdSettings = (newSettings: Partial<AdSettings>) => {
    setAdSettings((prev) => {
      const updated = { ...prev, ...newSettings };
      localStorage.setItem('myclub_ad_settings', JSON.stringify(updated));
      return updated;
    });
  };

  // Inquiries for Club Managers
  const [inquiries, setInquiries] = useState<(InquiryFormInput & { id: string; clubId: string; date: string })[]>(() => {
    const saved = localStorage.getItem('myclub_inquiries');
    return saved
      ? JSON.parse(saved)
      : [
          {
            id: 'inq-1',
            clubId: 'club-atlas-bjj',
            name: 'Mehdi Amrani',
            email: 'mehdi.amrani@gmail.com',
            phone: '+212 662 99 88 77',
            discipline: 'bjj',
            experienceLevel: 'beginner',
            preferredTime: 'evening',
            notes: 'Looking for evening Gi fundamentals class for self defense.',
            date: '2026-09-11 11:20',
          },
          {
            id: 'inq-2',
            clubId: 'club-dubai-combat-club',
            name: 'Omar Farooq',
            email: 'omar.farooq@outlook.com',
            phone: '+971 55 444 3322',
            discipline: 'mma',
            experienceLevel: 'intermediate',
            preferredTime: 'morning',
            notes: 'Interested in private sparring session and cage work.',
            date: '2026-09-10 18:40',
          },
        ];
  });

  // Directory & Members Entities State
  const [clubs, setClubs] = useState<Club[]>(() => {
    const saved = localStorage.getItem('myclub_clubs');
    return saved ? JSON.parse(saved) : mockClubs;
  });

  const [coaches, setCoaches] = useState<Coach[]>(() => {
    const saved = localStorage.getItem('myclub_coaches');
    return saved ? JSON.parse(saved) : mockCoaches;
  });

  const [athletes, setAthletes] = useState<Athlete[]>(() => {
    const saved = localStorage.getItem('myclub_athletes');
    return saved ? JSON.parse(saved) : mockAthletes;
  });

  const [organizers, setOrganizers] = useState<EventOrganizer[]>(() => {
    const saved = localStorage.getItem('myclub_organizers');
    return saved ? JSON.parse(saved) : mockOrganizers;
  });

  const [subscribeModalOpen, setSubscribeModalOpen] = useState(false);
  const [activeDirectoryTab, setActiveDirectoryTab] = useState<'clubs' | 'coaches' | 'athletes' | 'organizers'>('clubs');

  const subscribeMember = (data: NewMemberSubscription): string => {
    const slug = data.name.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-');
    const id = `${data.memberType}-${slug}-${Date.now().toString().slice(-4)}`;

    let targetRoute = '/clubs';

    if (data.memberType === 'coach') {
      const newCoach: Coach = {
        id,
        slug,
        name: data.name,
        title: {
          ar: data.titleOrRank || 'مدرب معتمد للرياضات الفردية',
          fr: data.titleOrRank || 'Coach et entraîneur certifié',
          en: data.titleOrRank || 'Certified Combat Sports Coach',
        },
        bio: {
          ar: data.bio || 'مدرب محترف يقدم برامج تدريبية وتأهيلية.',
          fr: data.bio || 'Entraîneur certifié dédié à la progression de ses élèves.',
          en: data.bio || 'Dedicated sports coach offering specialized training programs.',
        },
        discipline: data.discipline,
        allDisciplines: [data.discipline],
        rank: data.titleOrRank || 'Certified Coach',
        experienceYears: 6,
        city: data.city,
        country: data.country,
        countryCode: data.countryCode || 'MA',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop',
        coverImage: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=1200&auto=format&fit=crop',
        rating: 5.0,
        reviewCount: 1,
        verified: true,
        hourlyRate: {
          amount: 40,
          currency: 'USD',
          sessionType: data.pricingOrSponsorship || 'Private Masterclass (60 min)',
        },
        skills: data.skillsOrServices ? data.skillsOrServices.split(',').map(s => s.trim()) : ['Fight Preparation', 'Technique & Drills'],
        certifications: [data.titleOrRank || 'Accredited Instructor', 'Safety & First Aid'],
        phone: data.phone,
        email: data.email,
        whatsapp: data.whatsapp || data.phone,
        instagram: data.websiteOrSocial || '@myclub_coach',
        achievements: ['Newly registered member on MyClub Portal'],
        availability: 'Contact for schedule and availability',
        acceptingNewStudents: true,
        viewsCount: 1,
      };
      setCoaches((prev) => {
        const next = [newCoach, ...prev];
        localStorage.setItem('myclub_coaches', JSON.stringify(next));
        return next;
      });
      targetRoute = `/coach/${newCoach.id}`;
    } else if (data.memberType === 'athlete') {
      const newAthlete: Athlete = {
        id,
        slug,
        name: data.name,
        nickname: data.name.split(' ')[0],
        bio: {
          ar: data.bio || 'رياضي منافس يطمح لتحقيق إنجازات قارية وعالمية.',
          fr: data.bio || 'Athlète compétiteur engagé sur le circuit sportif.',
          en: data.bio || 'Competitive individual athlete aspiring to national and world championships.',
        },
        discipline: data.discipline,
        allDisciplines: [data.discipline],
        category: data.categoryOrJurisdiction || 'Senior Category',
        rank: data.titleOrRank || 'Competitive Competitor',
        record: {
          wins: 12,
          losses: 2,
          draws: 0,
          kos: 5,
        },
        city: data.city,
        country: data.country,
        countryCode: data.countryCode || 'MA',
        avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=400&auto=format&fit=crop',
        coverImage: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1200&auto=format&fit=crop',
        verified: true,
        medals: [
          { year: 2025, event: 'Regional Championship', medal: 'gold' },
        ],
        sponsorSeeking: true,
        sponsorPitch: {
          ar: data.pricingOrSponsorship || 'أوفر للرعاة حضوراً رياضياً قوياً وشراكة إعلامية مميزة.',
          fr: data.pricingOrSponsorship || 'Partenariats et visibilité pour marques sur les compétitions.',
          en: data.pricingOrSponsorship || 'Seeking brand sponsorships with premium exposure at major championships.',
        },
        ranking: 'Top Tier Rising Competitor',
        email: data.email,
        phone: data.phone,
        instagram: data.websiteOrSocial,
        viewsCount: 1,
      };
      setAthletes((prev) => {
        const next = [newAthlete, ...prev];
        localStorage.setItem('myclub_athletes', JSON.stringify(next));
        return next;
      });
      targetRoute = `/athlete/${newAthlete.id}`;
    } else if (data.memberType === 'organizer') {
      const newOrganizer: EventOrganizer = {
        id,
        slug,
        name: {
          ar: data.name,
          fr: data.name,
          en: data.name,
        },
        type: 'association',
        jurisdiction: {
          ar: data.categoryOrJurisdiction || 'المستوى الإقليمي والوطني',
          fr: data.categoryOrJurisdiction || 'Niveau Régional & National',
          en: data.categoryOrJurisdiction || 'Regional & National Jurisdiction',
        },
        description: {
          ar: data.bio || 'جهة تنظيمية للبطولات والفعاليات الرياضية التنافسية.',
          fr: data.bio || 'Organisation sportive et promotion d’événements.',
          en: data.bio || 'Sanctioning body and combat sports event organizer.',
        },
        disciplines: [data.discipline],
        establishedYear: 2024,
        city: data.city,
        country: data.country,
        countryCode: data.countryCode || 'MA',
        logo: 'https://images.unsplash.com/photo-1555597673-b21d5c935865?q=80&w=200&auto=format&fit=crop',
        coverImage: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=1200&auto=format&fit=crop',
        verified: true,
        contactEmail: data.email,
        contactPhone: data.phone,
        website: data.websiteOrSocial,
        sanctionedEventsCount: 1,
        affiliations: ['Registered with National Sports Authorities'],
        upcomingEvents: [],
        viewsCount: 1,
      };
      setOrganizers((prev) => {
        const next = [newOrganizer, ...prev];
        localStorage.setItem('myclub_organizers', JSON.stringify(next));
        return next;
      });
      targetRoute = `/organizer/${newOrganizer.id}`;
    } else {
      // Club
      const newClub: Club = {
        id,
        slug,
        name: {
          ar: data.name,
          fr: data.name,
          en: data.name,
        },
        tagline: {
          ar: data.titleOrRank || 'أكاديمية تدريب معتمدة',
          fr: data.titleOrRank || 'Académie sportive de référence',
          en: data.titleOrRank || 'Premier Training Academy',
        },
        description: {
          ar: data.bio || 'نادي رياضي يقدم برامج تدريبية لجميع المستويات.',
          fr: data.bio || 'Club de sport proposant des entraînements pour tous niveaux.',
          en: data.bio || 'Sports club offering programs for beginners and competitors.',
        },
        discipline: data.discipline,
        allDisciplines: [data.discipline],
        city: data.city,
        country: data.country,
        countryCode: data.countryCode || 'MA',
        address: `${data.city}, ${data.country}`,
        phone: data.phone,
        whatsapp: data.whatsapp || data.phone,
        email: data.email,
        website: data.websiteOrSocial,
        videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        videoThumbnail: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=600&auto=format&fit=crop',
        coverImage: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=1200&auto=format&fit=crop',
        logo: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=200&auto=format&fit=crop',
        rating: 5.0,
        reviewCount: 1,
        watchersCount: 1,
        verified: true,
        featured: false,
        pricing: {
          monthly: 50,
          currency: 'USD',
          hasFreeTrial: true,
        },
        establishedYear: new Date().getFullYear(),
        affiliations: ['IBJJF', 'WKF'],
        viewsCount: 1,
        instructors: [],
        achievements: [],
        schedule: [],
      };
      setClubs((prev) => {
        const next = [newClub, ...prev];
        localStorage.setItem('myclub_clubs', JSON.stringify(next));
        return next;
      });
      targetRoute = `/club/${newClub.id}`;
    }

    return targetRoute;
  };

  const submitInquiry = (clubId: string, data: InquiryFormInput): boolean => {
    const newInquiry = {
      ...data,
      id: `inq-${Date.now()}`,
      clubId,
      date: new Date().toISOString().replace('T', ' ').slice(0, 16),
    };
    setInquiries((prev) => {
      const next = [newInquiry, ...prev];
      localStorage.setItem('myclub_inquiries', JSON.stringify(next));
      return next;
    });
    return true;
  };

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        t,
        theme,
        setTheme,
        currentUser,
        loginWithSocial,
        loginWithEmail,
        logout,
        watchedClubs,
        toggleWatchClub,
        isWatchingClub,
        bookmarkedArticles,
        toggleBookmarkArticle,
        isArticleBookmarked,
        offlineArticles,
        notifications,
        unreadNotificationCount,
        markAllNotificationsRead,
        requestPushPermission,
        hasPushPermission,
        adSettings,
        updateAdSettings,
        currentRoute,
        navigate,
        clubs,
        coaches,
        athletes,
        organizers,
        competitions: mockCompetitions,
        articles: mockArticles,
        inquiries,
        submitInquiry,
        authModalOpen,
        setAuthModalOpen,
        adModalOpen,
        setAdModalOpen,
        searchModalOpen,
        setSearchModalOpen,
        subscribeModalOpen,
        setSubscribeModalOpen,
        activeDirectoryTab,
        setActiveDirectoryTab,
        subscribeMember,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

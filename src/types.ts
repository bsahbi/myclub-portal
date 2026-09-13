export type Language = 'ar' | 'fr' | 'en';
export type ThemeMode = 'light' | 'dark' | 'system';

export type MartialArtDiscipline =
  | 'judo'
  | 'karate'
  | 'bjj'
  | 'taekwondo'
  | 'muaythai'
  | 'boxing'
  | 'kickboxing'
  | 'mma'
  | 'kungfu'
  | 'wrestling'
  | 'aikido';

export type MemberType = 'club' | 'coach' | 'athlete' | 'organizer';

export interface Coach {
  id: string;
  slug: string;
  name: string;
  title: Record<Language, string>;
  bio: Record<Language, string>;
  discipline: MartialArtDiscipline;
  allDisciplines: MartialArtDiscipline[];
  rank: string; // e.g. "Black Belt 3rd Dan", "Kru Muay Thai"
  experienceYears: number;
  city: string;
  country: string;
  countryCode: string;
  avatar: string;
  coverImage: string;
  rating: number;
  reviewCount: number;
  verified: boolean;
  featured?: boolean;
  hourlyRate?: {
    amount: number;
    currency: string;
    sessionType: string;
  };
  skills: string[];
  certifications: string[];
  clubAffiliation?: {
    id: string;
    name: Record<Language, string>;
  };
  phone: string;
  email: string;
  whatsapp?: string;
  instagram?: string;
  achievements: string[];
  availability: string;
  acceptingNewStudents: boolean;
  viewsCount: number;
}

export interface Athlete {
  id: string;
  slug: string;
  name: string;
  nickname?: string;
  bio: Record<Language, string>;
  discipline: MartialArtDiscipline;
  allDisciplines?: MartialArtDiscipline[];
  category: string; // e.g. "Middleweight (-84 kg)"
  rank: string; // e.g. "Brown Belt", "National Champion"
  record?: {
    wins: number;
    losses: number;
    draws: number;
    kos?: number;
    submissions?: number;
  };
  city: string;
  country: string;
  countryCode: string;
  avatar: string;
  coverImage: string;
  verified: boolean;
  featured?: boolean;
  clubAffiliation?: {
    id: string;
    name: Record<Language, string>;
  };
  medals: {
    year: number;
    event: string;
    medal: 'gold' | 'silver' | 'bronze';
  }[];
  sponsorSeeking: boolean;
  sponsorPitch?: Record<Language, string>;
  ranking: string;
  phone?: string;
  email: string;
  instagram?: string;
  viewsCount: number;
}

export interface EventOrganizer {
  id: string;
  slug: string;
  name: Record<Language, string>;
  type: 'federation' | 'association' | 'league' | 'promoter';
  jurisdiction: Record<Language, string>;
  description: Record<Language, string>;
  disciplines: MartialArtDiscipline[];
  establishedYear: number;
  city: string;
  country: string;
  countryCode: string;
  logo: string;
  coverImage: string;
  verified: boolean;
  featured?: boolean;
  contactEmail: string;
  contactPhone: string;
  website?: string;
  socials?: {
    instagram?: string;
    facebook?: string;
    twitter?: string;
  };
  sanctionedEventsCount: number;
  affiliations: string[];
  upcomingEvents: string[]; // competition IDs
  viewsCount: number;
}

export interface NewMemberSubscription {
  memberType: MemberType;
  name: string;
  email: string;
  phone: string;
  whatsapp?: string;
  discipline: MartialArtDiscipline;
  city: string;
  country: string;
  countryCode: string;
  titleOrRank?: string;
  bio: string;
  skillsOrServices?: string;
  categoryOrJurisdiction?: string;
  websiteOrSocial?: string;
  pricingOrSponsorship?: string;
}

export interface Instructor {
  id: string;
  name: string;
  role: string;
  rank: string; // e.g. "3rd Dan Black Belt", "BJJ Black Belt"
  bio: Record<Language, string>;
  image: string;
  achievements: string[];
}

export interface ClubAchievement {
  year: number;
  title: Record<Language, string>;
  category: string;
  medal: 'gold' | 'silver' | 'bronze' | 'trophy';
}

export interface ScheduleItem {
  day: string; // e.g. "Monday"
  time: string; // e.g. "18:00 - 19:30"
  classTitle: Record<Language, string>;
  level: 'all' | 'beginner' | 'intermediate' | 'advanced' | 'kids';
  instructorName: string;
}

export interface Club {
  id: string;
  slug: string;
  name: Record<Language, string>;
  tagline: Record<Language, string>;
  description: Record<Language, string>;
  discipline: MartialArtDiscipline;
  allDisciplines: MartialArtDiscipline[];
  city: string;
  country: string;
  countryCode: string; // 'MA' | 'EG' | 'AE' | 'SA' | 'TN' | 'JO' | 'DZ' | 'QA'
  address: string;
  phone: string;
  whatsapp: string;
  email: string;
  website?: string;
  videoUrl: string; // promotional video
  videoThumbnail: string;
  coverImage: string;
  logo: string;
  rating: number;
  reviewCount: number;
  verified: boolean;
  featured: boolean;
  establishedYear: number;
  affiliations: string[]; // e.g. "IJF", "IBJJF", "WKF", "UAEJJF"
  instructors: Instructor[];
  achievements: ClubAchievement[];
  schedule: ScheduleItem[];
  pricing: {
    monthly: number;
    currency: string;
    hasFreeTrial: boolean;
  };
  viewsCount: number;
  watchersCount: number;
}

export interface Article {
  id: string;
  slug: string;
  clubId?: string;
  clubName?: Record<Language, string>;
  title: Record<Language, string>;
  summary: Record<Language, string>;
  content: Record<Language, string>;
  category: 'technique' | 'competition' | 'nutrition' | 'interview' | 'news';
  discipline: MartialArtDiscipline;
  coverImage: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  publishedAt: string;
  readTimeMinutes: number;
  tags: string[];
  views: number;
  likes: number;
  featured?: boolean;
}

export type CompetitionStatus = 'live' | 'upcoming' | 'completed';

export interface Competition {
  id: string;
  title: Record<Language, string>;
  description: Record<Language, string>;
  discipline: MartialArtDiscipline;
  status: CompetitionStatus;
  startDate: string;
  endDate: string;
  city: string;
  country: string;
  venue: string;
  organizer: {
    name: string;
    logo: string;
    association: string;
    contact: string;
  };
  registrationDeadline: string;
  entryFee: string;
  prizePool?: string;
  categories: string[]; // e.g. "Male Adult -77kg", "Female Master 1 -60kg"
  bracketsUrl?: string;
  liveStreamUrl?: string;
  coverImage: string;
  registeredAthletesCount: number;
  results?: {
    category: string;
    gold: string;
    silver: string;
    bronze: string;
  }[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  provider: 'google' | 'facebook' | 'email';
  role: 'user' | 'club_manager' | 'admin';
  clubId?: string;
  watchedClubs: string[]; // club IDs
  bookmarkedArticles: string[]; // article IDs
  favoriteCompetitions: string[]; // competition IDs
}

export interface NotificationItem {
  id: string;
  title: Record<Language, string>;
  message: Record<Language, string>;
  type: 'club_news' | 'competition_live' | 'reminder' | 'event';
  timestamp: string;
  read: boolean;
  linkRoute: string;
  relatedEntityId?: string;
}

export interface AdSettings {
  enabled: boolean;
  clientCode: string; // e.g. "ca-pub-1234567890123456"
  leaderboardSlot: string;
  sidebarSlot: string;
  inFeedSlot: string;
  showTestBanners: boolean;
}

export interface InquiryFormInput {
  name: string;
  email: string;
  phone: string;
  discipline: string;
  experienceLevel: 'beginner' | 'intermediate' | 'advanced';
  preferredTime: 'morning' | 'evening' | 'weekend';
  notes?: string;
}

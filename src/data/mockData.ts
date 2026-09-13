import { Club, Article, Competition, NotificationItem } from '../types';

export const mockClubs: Club[] = [
  {
    id: 'club-atlas-bjj',
    slug: 'atlas-jiu-jitsu-casablanca',
    name: {
      ar: 'أكاديمية أطلس للجيو جيتسو البرازيلية',
      fr: 'Atlas Brazilian Jiu-Jitsu Academy Casablanca',
      en: 'Atlas Brazilian Jiu-Jitsu Academy',
    },
    tagline: {
      ar: 'أكبر مركز للجيو جيتسو والجرابلينج في المغرب وشمال إفريقيا',
      fr: 'Le plus grand centre de JJB et Grappling au Maroc et Afrique du Nord',
      en: 'Premier Brazilian Jiu-Jitsu & Submission Grappling Academy in North Africa',
    },
    description: {
      ar: 'تأسست أكاديمية أطلس على يد أبطال دوليين في رياضة الجيو جيتسو البرازيلية. نقدم برامج احترافية للأطفال والبالغين من المبتدئين وحتى المنافسين الدوليين، مع بساط أولمبي معتمد، صالة إعداد بدني وغرف استشفاء.',
      fr: "Fondée par des champions internationaux de JJB, l'Académie Atlas offre des programmes complets pour enfants et adultes, du niveau loisir à la haute compétition internationale.",
      en: 'Founded by international BJJ champions, Atlas Academy provides comprehensive training programs for children, women, and adults, featuring world-class tatami, conditioning facility, and recovery zone.',
    },
    discipline: 'bjj',
    allDisciplines: ['bjj', 'judo', 'wrestling'],
    city: 'Casablanca',
    country: 'Morocco',
    countryCode: 'MA',
    address: '245 Boulevard d’Anfa, Gauthier, Casablanca',
    phone: '+212 522 34 56 78',
    whatsapp: '+212 661 12 34 56',
    email: 'contact@atlasbjj-casa.ma',
    website: 'https://atlasbjj-casa.ma',
    videoUrl: 'https://www.youtube.com/embed/Pj1G0o0-4qg',
    videoThumbnail: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=1200&auto=format&fit=crop',
    coverImage: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1200&auto=format&fit=crop',
    logo: 'https://images.unsplash.com/photo-1555597673-b21d5c935865?q=80&w=200&auto=format&fit=crop',
    rating: 4.9,
    reviewCount: 142,
    verified: true,
    featured: true,
    establishedYear: 2014,
    affiliations: ['IBJJF', 'UAEJJF', 'FRMBJJ'],
    instructors: [
      {
        id: 'inst-1',
        name: 'Prof. Yassine El Amrani',
        role: 'Head Instructor & Co-Founder',
        rank: 'Black Belt 3rd Degree (IBJJF)',
        bio: {
          ar: 'بطل إفريقيا للجيو جيتسو لثلاث مرات ومنافس في بطولة العالم بأبوظبي.',
          fr: 'Triple champion d’Afrique de JJB et compétiteur aux World Pro d’Abu Dhabi.',
          en: '3x African BJJ Champion and multiple-time Abu Dhabi World Pro competitor.',
        },
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&auto=format&fit=crop',
        achievements: ['Gold - African Championship 2021', 'Silver - Abu Dhabi Grand Slam 2022'],
      },
      {
        id: 'inst-2',
        name: 'Coach Sofia Bennani',
        role: 'Women & Kids Program Director',
        rank: 'Brown Belt',
        bio: {
          ar: 'متخصصة في تدريب الفتيات والأطفال وتطوير مهارات الدفاع عن النفس.',
          fr: 'Spécialiste du coaching féminin et des programmes d’autodéfense enfants.',
          en: 'Specialized in youth development and high-level female self-defense & competition.',
        },
        image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=300&auto=format&fit=crop',
        achievements: ['Gold - Morocco Open 2023', 'National Team Coach'],
      },
    ],
    achievements: [
      {
        year: 2024,
        title: {
          ar: 'المركز الأول كأفضل أكاديمية في بطولة شمال إفريقيا المفتوحة',
          fr: '1ère Académie au North Africa BJJ Open 2024',
          en: '1st Place Team Trophy - North Africa BJJ Open 2024',
        },
        category: 'Team Trophy',
        medal: 'trophy',
      },
      {
        year: 2023,
        title: {
          ar: '3 ميداليات ذهبية في بطولة أبوظبي للمحترفين (AJP)',
          fr: '3 Médailles d’Or au Tour AJP Abu Dhabi Pro',
          en: '3 Gold Medals at Abu Dhabi AJP Tour',
        },
        category: 'International',
        medal: 'gold',
      },
    ],
    schedule: [
      {
        day: 'Monday / Wednesday',
        time: '18:30 - 20:00',
        classTitle: {
          ar: 'أساسيات الجيو جيتسو (بالبدلة Gi)',
          fr: 'JJB Fondamentaux (avec kimono Gi)',
          en: 'BJJ Fundamentals (Gi)',
        },
        level: 'beginner',
        instructorName: 'Prof. Yassine El Amrani',
      },
      {
        day: 'Tuesday / Thursday',
        time: '19:00 - 20:30',
        classTitle: {
          ar: 'جرابلينج ونوجي للمتقدمين (No-Gi)',
          fr: 'No-Gi Grappling & Lutte Avancée',
          en: 'Advanced No-Gi & Wrestling for BJJ',
        },
        level: 'advanced',
        instructorName: 'Coach Sofia Bennani',
      },
      {
        day: 'Saturday',
        time: '10:30 - 12:00',
        classTitle: {
          ar: 'برنامج الأبطال الصغار (الأطفال 6-13 سنة)',
          fr: 'Petits Samouraïs (Enfants 6-13 ans)',
          en: 'Kids & Teens Martial Arts Camp',
        },
        level: 'kids',
        instructorName: 'Coach Sofia Bennani',
      },
    ],
    pricing: {
      monthly: 65,
      currency: 'USD',
      hasFreeTrial: true,
    },
    viewsCount: 4890,
    watchersCount: 620,
  },
  {
    id: 'club-al-ahly-karate',
    slug: 'al-ahly-martial-arts-cairo',
    name: {
      ar: 'نادي كاراتيه وجوادوكان القاهرة',
      fr: 'Club de Karaté & Judokan Le Caire',
      en: 'Cairo Karate & Judokan Club',
    },
    tagline: {
      ar: 'مفرخة الأبطال الأولمبيين في الكاراتيه والجودو بمصر',
      fr: 'Pépinière des champions olympiques de Karaté et Judo en Égypte',
      en: 'Olympic champions training ground for Karate & Judo in Egypt',
    },
    description: {
      ar: 'أحد أعرق أندية الفنون القتالية في العاصمة المصرية القاهرة. يضم النادي أحدث التجهيزات البارالمبية والأولمبية وطاقماً تدريبياً يضم نخبة الحكام والمدربين المعتمدين من الاتحاد الدولي للكاراتيه WKF.',
      fr: "Un des plus prestigieux dojos du Caire en Égypte. Encadrement certifié par la WKF et l'IJF avec un palmarès international inégalé.",
      en: 'One of the most prestigious dojos in Cairo, Egypt. Providing accredited WKF Karate and IJF Judo training with an elite team of Olympic medalists.',
    },
    discipline: 'karate',
    allDisciplines: ['karate', 'judo', 'taekwondo'],
    city: 'Cairo',
    country: 'Egypt',
    countryCode: 'EG',
    address: 'Nasr City, Olympic Center Road, Cairo',
    phone: '+20 2 2401 9876',
    whatsapp: '+20 100 876 5432',
    email: 'info@cairokaratejudokan.eg',
    website: 'https://cairokaratejudokan.eg',
    videoUrl: 'https://www.youtube.com/embed/5F2o3eW1Q10',
    videoThumbnail: 'https://images.unsplash.com/photo-1555597673-b21d5c935865?q=80&w=1200&auto=format&fit=crop',
    coverImage: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=1200&auto=format&fit=crop',
    logo: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=200&auto=format&fit=crop',
    rating: 4.8,
    reviewCount: 230,
    verified: true,
    featured: true,
    establishedYear: 1998,
    affiliations: ['WKF', 'IJF', 'Egyptian Karate Federation'],
    instructors: [
      {
        id: 'inst-3',
        name: 'Sensei Tarek Mansour',
        role: 'Master Chief Instructor',
        rank: '7th Dan Black Belt (Shotokan)',
        bio: {
          ar: 'مدرب منتخب مصر للشباب وحائز على وسام الاستحقاق الرياضي.',
          fr: 'Entraîneur national et arbitre international WKF.',
          en: 'Egyptian youth national team coach and certified WKF international master.',
        },
        image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=300&auto=format&fit=crop',
        achievements: ['Gold - All Africa Games', 'WKF Technical Delegate'],
      },
    ],
    achievements: [
      {
        year: 2023,
        title: {
          ar: 'ميدالية فضية في بطولة العالم للكاراتيه WKF',
          fr: 'Médaille d’Argent aux Championnats du Monde WKF',
          en: 'Silver Medal at WKF Karate World Championship',
        },
        category: 'Kumite -75kg',
        medal: 'silver',
      },
    ],
    schedule: [
      {
        day: 'Daily',
        time: '17:00 - 18:30',
        classTitle: {
          ar: 'كاتا وكوميتيه للناشئين',
          fr: 'Kata & Kumité Juniors',
          en: 'Kata & Kumite Juniors',
        },
        level: 'beginner',
        instructorName: 'Sensei Tarek Mansour',
      },
    ],
    pricing: {
      monthly: 40,
      currency: 'USD',
      hasFreeTrial: true,
    },
    viewsCount: 7120,
    watchersCount: 940,
  },
  {
    id: 'club-dubai-combat-club',
    slug: 'dubai-combat-club-uae',
    name: {
      ar: 'نادي دبي للقتال وفنون الدفاع (DCC)',
      fr: 'Dubai Combat Club & MMA Arena',
      en: 'Dubai Combat Club & MMA Arena',
    },
    tagline: {
      ar: 'أحدث منشأة لرياضات القتال المختلطة، الملاكمة والمواي تاي في الخليج',
      fr: 'Le centre d’excellence pour le MMA, la Boxe et le Muay Thaï à Dubaï',
      en: 'Ultimate MMA, Boxing & Muay Thai combat center in the Gulf',
    },
    description: {
      ar: 'يقع نادي دبي للقتال في قلب منطقة القوز بدبي، ويحتوي على قفص MMA رسمي بحجم UFC، وحلبة ملاكمة دولية، وأجهزة قياس الأداء وقوة اللكمات بالذكاء الاصطناعي مع طاقم مدربين من بطلات وأبطال العالم.',
      fr: "Situé à Al Quoz, Dubaï, DCC dispose d'un octogone homologué UFC, de rings de boxe professionnels et de coachs d'élite en striking et sol.",
      en: 'Located in Al Quoz, Dubai Combat Club features a regulation UFC-size cage, Olympic boxing rings, strength conditioning turf, and UFC/One Championship veteran trainers.',
    },
    discipline: 'mma',
    allDisciplines: ['mma', 'muaythai', 'boxing', 'bjj', 'kickboxing'],
    city: 'Dubai',
    country: 'United Arab Emirates',
    countryCode: 'AE',
    address: 'Warehouse 12, Al Quoz Industrial Area 3, Dubai',
    phone: '+971 4 338 9911',
    whatsapp: '+971 50 123 4567',
    email: 'reception@dubaicombat.ae',
    website: 'https://dubaicombat.ae',
    videoUrl: 'https://www.youtube.com/embed/fGkWvJp6_1s',
    videoThumbnail: 'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?q=80&w=1200&auto=format&fit=crop',
    coverImage: 'https://images.unsplash.com/photo-1517438322307-e67111335449?q=80&w=1200&auto=format&fit=crop',
    logo: 'https://images.unsplash.com/photo-1579758629938-03607ccdbaba?q=80&w=200&auto=format&fit=crop',
    rating: 5.0,
    reviewCount: 310,
    verified: true,
    featured: true,
    establishedYear: 2018,
    affiliations: ['UAE BJJ Federation', 'IMMAF', 'WBC Muay Thai'],
    instructors: [
      {
        id: 'inst-4',
        name: 'Kru Alexey Petrov',
        role: 'Striking & Muay Thai Head Coach',
        rank: 'Former Lumpinee Stadium Contender',
        bio: {
          ar: 'خاض أكثر من 70 نزالاً احترافياً في تايلاند ومدرب نجوم بطولة ONE Championship.',
          fr: 'Plus de 70 combats pro en Thaïlande et entraîneur pour ONE Championship.',
          en: '70+ professional bouts in Bangkok stadiums, trainer of UFC and ONE athletes.',
        },
        image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=300&auto=format&fit=crop',
        achievements: ['WMC World Champion 2017', 'Trainer of the Year MENA 2023'],
      },
    ],
    achievements: [
      {
        year: 2024,
        title: {
          ar: 'استضافة معسكر تدريب المقاتلين الدوليين لبطولة UFC 308 بأبوظبي',
          fr: 'Camp d’entraînement officiel pour athlètes UFC 308',
          en: 'Official Preparation Camp for UFC 308 Athletes in Abu Dhabi',
        },
        category: 'Camp Hosting',
        medal: 'gold',
      },
    ],
    schedule: [
      {
        day: 'Mon / Wed / Fri',
        time: '19:00 - 20:30',
        classTitle: {
          ar: 'فنون القتال المختلطة MMA وتقنيات الإسقاط',
          fr: 'MMA Sparring & Cage Control',
          en: 'MMA Striking & Cage Work',
        },
        level: 'intermediate',
        instructorName: 'Kru Alexey Petrov',
      },
    ],
    pricing: {
      monthly: 140,
      currency: 'USD',
      hasFreeTrial: true,
    },
    viewsCount: 12400,
    watchersCount: 1850,
  },
  {
    id: 'club-riyadh-taekwondo',
    slug: 'riyadh-falcon-taekwondo-sa',
    name: {
      ar: 'أكاديمية صقور الرياض للتايكوندو',
      fr: 'Académie Faucons de Riyad de Taekwondo',
      en: 'Riyadh Falcons Taekwondo Academy',
    },
    tagline: {
      ar: 'تأهيل وتدريب نخبة أبطال التايكوندو الأولمبي وفق رؤية المملكة',
      fr: 'Formation d’élite en Taekwondo olympique en Arabie Saoudite',
      en: 'Elite Olympic Taekwondo center accredited in Saudi Arabia',
    },
    description: {
      ar: 'نادي رائد في المملكة العربية السعودية معتمد من الاتحاد السعودي للتايكوندو والاتحاد الدولي WT. يوفر قاعات مجهزة بأنظمة الحماية الإلكترونية Daedo وحلبات حديثة.',
      fr: 'Club de référence accrédité par la Fédération Saoudienne et World Taekwondo (WT) avec plastrons électroniques Daedo de dernière génération.',
      en: 'Premier Saudi WT accredited academy with Daedo electronic scoring systems and elite Korean master instructors.',
    },
    discipline: 'taekwondo',
    allDisciplines: ['taekwondo', 'karate', 'kickboxing'],
    city: 'Riyadh',
    country: 'Saudi Arabia',
    countryCode: 'SA',
    address: 'King Abdulaziz Road, Al Yasmin, Riyadh',
    phone: '+966 11 456 7890',
    whatsapp: '+966 55 987 6543',
    email: 'info@riyadhtaekwondo.sa',
    website: 'https://riyadhtaekwondo.sa',
    videoUrl: 'https://www.youtube.com/embed/5F2o3eW1Q10',
    videoThumbnail: 'https://images.unsplash.com/photo-1555597673-b21d5c935865?q=80&w=1200&auto=format&fit=crop',
    coverImage: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1200&auto=format&fit=crop',
    logo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop',
    rating: 4.9,
    reviewCount: 188,
    verified: true,
    featured: false,
    establishedYear: 2019,
    affiliations: ['World Taekwondo (WT)', 'Saudi Taekwondo Federation'],
    instructors: [
      {
        id: 'inst-5',
        name: 'Master Jin-Woo Park',
        role: 'Technical Director',
        rank: '6th Dan Kukkiwon',
        bio: {
          ar: 'خبير كوري معتمد درب أبطالاً حازوا على ميداليات في الألعاب الآسيوية.',
          fr: 'Grand Maître coréen 6ème Dan Kukkiwon, formateur aux Jeux Asiatiques.',
          en: 'Kukkiwon 6th Dan Master from Seoul, specialized in Olympic sparring strategies.',
        },
        image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=300&auto=format&fit=crop',
        achievements: ['Asian Games Gold Medalist Coach', 'Kukkiwon Master License'],
      },
    ],
    achievements: [
      {
        year: 2023,
        title: {
          ar: 'كأس درع الاتحاد السعودي للتايكوندو للناشئين',
          fr: 'Bouclier de la Fédération Saoudienne Juniors',
          en: 'Saudi Federation Cup Shield - Junior Division',
        },
        category: 'National Champion',
        medal: 'gold',
      },
    ],
    schedule: [
      {
        day: 'Sun / Tue / Thu',
        time: '17:30 - 19:00',
        classTitle: {
          ar: 'تدريب قتالي إلكتروني (كيروجي)',
          fr: 'Kyorugi & plastron électronique',
          en: 'Kyorugi Sparring with Electronic Sensors',
        },
        level: 'all',
        instructorName: 'Master Jin-Woo Park',
      },
    ],
    pricing: {
      monthly: 90,
      currency: 'USD',
      hasFreeTrial: true,
    },
    viewsCount: 5600,
    watchersCount: 780,
  },
  {
    id: 'club-tunis-judo',
    slug: 'tunis-esperance-judo-tn',
    name: {
      ar: 'نادي الجودو والسامبو العاصمي تونس',
      fr: 'Club de Judo & Sambo de Tunis',
      en: 'Tunis Judo & Sambo Club',
    },
    tagline: {
      ar: 'تقاليد عريقة في الجودو الإفريقي والعربي منذ أكثر من ثلاثين عاماً',
      fr: 'Grande tradition de judo olympique et sambo en Tunisie',
      en: 'Rich legacy of African & Arab Judo champions in Tunis',
    },
    description: {
      ar: 'يعد النادي من أعرق صروح الجودو في تونس والمنطقة المغاربية. تخرج منه أبطال شاركوا في دورات الألعاب الأولمبية ومنافسات الجائزة الكبرى للاتحاد الدولي للجودو IJF.',
      fr: "Pionnier du judo en Tunisie, ce dojo historique a formé plusieurs olympiens et médaillés aux championnats d'Afrique.",
      en: 'One of the foundational judo clubs in Tunisia and the Maghreb. Produced multiple Olympic judoka and African Championship gold medalists.',
    },
    discipline: 'judo',
    allDisciplines: ['judo', 'wrestling', 'aikido'],
    city: 'Tunis',
    country: 'Tunisia',
    countryCode: 'TN',
    address: 'Avenue Habib Bourguiba, Centre Sportif, Tunis',
    phone: '+216 71 890 123',
    whatsapp: '+216 98 765 432',
    email: 'contact@judotunis.tn',
    website: 'https://judotunis.tn',
    videoUrl: 'https://www.youtube.com/embed/Pj1G0o0-4qg',
    videoThumbnail: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=1200&auto=format&fit=crop',
    coverImage: 'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?q=80&w=1200&auto=format&fit=crop',
    logo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop',
    rating: 4.7,
    reviewCount: 96,
    verified: true,
    featured: false,
    establishedYear: 1991,
    affiliations: ['IJF', 'African Judo Union (AJU)', 'FTJ'],
    instructors: [
      {
        id: 'inst-6',
        name: 'Sensei Karim Ben Salah',
        role: 'Head Coach',
        rank: '6th Dan IJF',
        bio: {
          ar: 'بطل إفريقيا للجودو ومشارك سابق في أولمبياد أثينا وبكين.',
          fr: 'Ancien olympien à Athènes et Pékin, multiple champion d’Afrique.',
          en: 'Olympian and 4-time African Champion with extensive international coaching tenure.',
        },
        image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop',
        achievements: ['4x African Champion', 'IJF Gold Referee'],
      },
    ],
    achievements: [
      {
        year: 2022,
        title: {
          ar: 'المرتبة الأولى في البطولة التونسية للأندية الممتازة للجودو',
          fr: 'Champion de Tunisie des Clubs de Division 1',
          en: 'Tunisian National Clubs Division 1 Champion',
        },
        category: 'Senior Teams',
        medal: 'gold',
      },
    ],
    schedule: [
      {
        day: 'Monday / Thursday',
        time: '18:00 - 19:45',
        classTitle: {
          ar: 'تقنيات الرمي والقتال الأرضي نيواتزا',
          fr: 'Tachi-waza & Ne-waza Judo',
          en: 'Tachi-waza (Throws) & Ne-waza (Groundwork)',
        },
        level: 'intermediate',
        instructorName: 'Sensei Karim Ben Salah',
      },
    ],
    pricing: {
      monthly: 35,
      currency: 'USD',
      hasFreeTrial: true,
    },
    viewsCount: 3980,
    watchersCount: 450,
  },
  {
    id: 'club-amman-muaythai',
    slug: 'amman-warriors-muaythai-jo',
    name: {
      ar: 'أكاديمية محاربي عمّان للمواي تاي والكيك بوكسينغ',
      fr: 'Amman Warriors Muay Thai & Kickboxing Club',
      en: 'Amman Warriors Muay Thai & Kickboxing Club',
    },
    tagline: {
      ar: 'قوة فن الأطراف الثمانية على أعلى المستويات الاحترافية في الأردن',
      fr: 'L’art des huit membres au plus haut niveau en Jordanie',
      en: 'The Art of Eight Limbs at the highest professional standard in Jordan',
    },
    description: {
      ar: 'مركز قتالي متخصص في تدريب فنون الملاكمة التايلاندية والكيك بوكسينغ K-1. يتميز ببيئة تدريب تنافسية وحماسية ويوفر تدريباً مخصصاً للمبتدئين ولأصحاب الخبرة الساعين للياقة بدنية خارقة.',
      fr: 'Centre d’entraînement d’élite pour le Muay Thaï et le K-1 avec ring professionnel et sacs lourds traditionnels.',
      en: 'Jordan’s premier Muay Thai and K-1 kickboxing hub with heavy bags, professional rings, and conditioning coaches.',
    },
    discipline: 'muaythai',
    allDisciplines: ['muaythai', 'kickboxing', 'boxing'],
    city: 'Amman',
    country: 'Jordan',
    countryCode: 'JO',
    address: 'Al Madina Al Munawwara St, 7th Circle, Amman',
    phone: '+962 6 585 1234',
    whatsapp: '+962 79 555 1234',
    email: 'info@ammanwarriors.jo',
    website: 'https://ammanwarriors.jo',
    videoUrl: 'https://www.youtube.com/embed/fGkWvJp6_1s',
    videoThumbnail: 'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?q=80&w=1200&auto=format&fit=crop',
    coverImage: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=1200&auto=format&fit=crop',
    logo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop',
    rating: 4.85,
    reviewCount: 115,
    verified: true,
    featured: false,
    establishedYear: 2017,
    affiliations: ['IFMA', 'WAKO Jordan', 'Jordan Kickboxing Federation'],
    instructors: [
      {
        id: 'inst-7',
        name: 'Kru Tareq Al-Zubi',
        role: 'Head Muay Thai Coach',
        rank: 'IFMA Certified Senior Kru',
        bio: {
          ar: 'بطل العرب في المواي تاي وعضو سابق في المنتخب الأردني.',
          fr: 'Champion Arabe de Muay Thaï et ancien de l’équipe nationale jordanienne.',
          en: 'Arab Muay Thai Champion and former national team representative.',
        },
        image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=300&auto=format&fit=crop',
        achievements: ['Gold - Arab Championship Amman', 'IFMA Gold Coach Cert'],
      },
    ],
    achievements: [
      {
        year: 2023,
        title: {
          ar: 'الميدالية الذهبية لوزن 71 كغ في بطولة غرب آسيا للمواي تاي',
          fr: 'Médaille d’Or 71kg aux Championnats d’Asie de l’Ouest',
          en: 'West Asia Muay Thai Championships Gold 71kg',
        },
        category: 'Senior 71kg',
        medal: 'gold',
      },
    ],
    schedule: [
      {
        day: 'Sun / Tue / Thu',
        time: '19:30 - 21:00',
        classTitle: {
          ar: 'ضربات وسادات المواي تاي والكلينش',
          fr: 'Muay Thai Pads & Clinch Clinique',
          en: 'Muay Thai Padwork & Clinch Work',
        },
        level: 'all',
        instructorName: 'Kru Tareq Al-Zubi',
      },
    ],
    pricing: {
      monthly: 55,
      currency: 'USD',
      hasFreeTrial: true,
    },
    viewsCount: 4210,
    watchersCount: 520,
  },
];

export const mockCompetitions: Competition[] = [
  {
    id: 'comp-dubai-grand-slam-2026',
    title: {
      ar: 'بطولة أبوظبي غراند سلام للجيو جيتسو (جولة دبي 2026)',
      fr: 'Grand Slam de Jiu-Jitsu Abu Dhabi (Tour de Dubaï 2026)',
      en: 'Abu Dhabi Grand Slam Jiu-Jitsu Championship (Dubai Tour 2026)',
    },
    description: {
      ar: 'أقوى جولات الجراند سلام العالمية بمشاركة أكثر من 800 لاعب ولاعبة من مختلف أنحاء العالم، تنافس على جوائز نقدية كبرى ونقاط التصنيف العالمي AJP.',
      fr: "Une des plus grandes étapes mondiales avec plus de 800 athlètes de tous pays, dotée de prix majeurs et de points au classement mondial AJP.",
      en: 'World-renowned prestigious AJP tour stop gathering top brown & black belt world contenders competing for world rankings and cash prize purses.',
    },
    discipline: 'bjj',
    status: 'live',
    startDate: '2026-09-11',
    endDate: '2026-09-13',
    city: 'Dubai',
    country: 'United Arab Emirates',
    venue: 'Coca-Cola Arena, City Walk, Dubai',
    organizer: {
      name: 'Abu Dhabi Jiu-Jitsu Pro (AJP)',
      logo: 'https://images.unsplash.com/photo-1555597673-b21d5c935865?q=80&w=200&auto=format&fit=crop',
      association: 'UAE Jiu-Jitsu Federation (UAEJJF)',
      contact: 'events@ajptour.com',
    },
    registrationDeadline: '2026-09-05',
    entryFee: '$120 USD',
    prizePool: '$225,000 USD',
    categories: [
      'Men Adult Black Belt (-69kg, -77kg, -85kg, -94kg, -120kg)',
      'Women Adult Brown/Black Belt (-55kg, -62kg, -70kg)',
      'Men Master 1 & 2 Divisions',
      'Juvenile Blue Belts',
    ],
    bracketsUrl: 'https://ajptour.com/en/event/bracket/preview',
    liveStreamUrl: 'https://www.youtube.com/embed/live_demo_stream',
    coverImage: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=1200&auto=format&fit=crop',
    registeredAthletesCount: 840,
    results: [
      {
        category: 'Men Adult Black Belt -77kg',
        gold: 'Lucas Pinheiro (Brazil / Atlas Team)',
        silver: 'Ahmed Al-Ketbi (UAE)',
        bronze: 'Tarek Hamed (Egypt)',
      },
    ],
  },
  {
    id: 'comp-cairo-arab-karate-2026',
    title: {
      ar: 'بطولة الأندية العربية المفتوحة للكاراتيه (القاهرة 2026)',
      fr: 'Championnat Arabe des Clubs de Karaté (Le Caire 2026)',
      en: 'Arab Clubs Open Karate Championship (Cairo 2026)',
    },
    description: {
      ar: 'البطولة الرسمية للأندية العربية في منافسات الكاتا والكوميتيه المعتمدة من الاتحاد العربي للكاراتيه، بمشاركة أندية من 14 دولة عربية.',
      fr: 'Compétition officielle des clubs arabes de karaté en kata et kumite, homologuée par l’Union Arabe de Karaté (AKF).',
      en: 'Official championship for Arab clubs in kata and kumite under Arab Karate Federation regulations, featuring 14 countries.',
    },
    discipline: 'karate',
    status: 'upcoming',
    startDate: '2026-10-18',
    endDate: '2026-10-21',
    city: 'Cairo',
    country: 'Egypt',
    venue: 'Cairo International Stadium Sports Hall 1',
    organizer: {
      name: 'Arab Karate Federation (AKF)',
      logo: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=200&auto=format&fit=crop',
      association: 'Egyptian Karate Federation',
      contact: 'arabkarate@cairo2026.org',
    },
    registrationDeadline: '2026-10-05',
    entryFee: '$50 USD / Athlete',
    prizePool: '$45,000 USD',
    categories: [
      'Senior Male Individual Kumite (-60kg, -67kg, -75kg, -84kg, +84kg)',
      'Senior Female Individual Kumite (-50kg, -55kg, -61kg, -68kg, +68kg)',
      'Team Kata Senior',
      'Cadets & Juniors',
    ],
    coverImage: 'https://images.unsplash.com/photo-1555597673-b21d5c935865?q=80&w=1200&auto=format&fit=crop',
    registeredAthletesCount: 420,
  },
  {
    id: 'comp-casablanca-muaythai-cup',
    title: {
      ar: 'كأس شمال إفريقيا للمواي تاي والكيك بوكسينغ (الدار البيضاء 2025)',
      fr: 'Coupe d’Afrique du Nord de Muay Thaï & K1 (Casablanca 2025)',
      en: 'North Africa Muay Thai & K1 Cup (Casablanca 2025)',
    },
    description: {
      ar: 'أرشيف نزلات كأس شمال إفريقيا التاريخية التي أقيمت في مجمع محمد الخامس بالدار البيضاء بحضور جماهيري غفير ومشاركة أبطال المغرب والجزائر وتونس ومصر.',
      fr: "Revivez les temps forts de la Coupe d'Afrique du Nord tenue au Complexe Mohammed V avec des combats spectaculaires.",
      en: 'Archived edition of the premier North African showdown featuring pro Muay Thai and K-1 bouts at Mohammed V Complex.',
    },
    discipline: 'muaythai',
    status: 'completed',
    startDate: '2025-11-14',
    endDate: '2025-11-16',
    city: 'Casablanca',
    country: 'Morocco',
    venue: 'Complexe Sportif Mohammed V, Casablanca',
    organizer: {
      name: 'FRMBDA & WMC Africa',
      logo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop',
      association: 'World Muay Thai Council Africa',
      contact: 'info@wmc-africa.org',
    },
    registrationDeadline: '2025-11-01',
    entryFee: '$70 USD',
    prizePool: '$30,000 USD',
    categories: ['Super Lightweight 63.5kg', 'Welterweight 67kg', 'Middleweight 75kg'],
    coverImage: 'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?q=80&w=1200&auto=format&fit=crop',
    registeredAthletesCount: 160,
    results: [
      {
        category: 'Pro Welterweight 67kg',
        gold: 'Hamza El-Ghazouani (Morocco)',
        silver: 'Sofiane Bouzid (Algeria)',
        bronze: 'Bilel Riahi (Tunisia)',
      },
    ],
  },
];

export const mockArticles: Article[] = [
  {
    id: 'art-bjj-guard-retention-mena',
    slug: 'modern-bjj-guard-retention-secrets',
    clubId: 'club-atlas-bjj',
    clubName: {
      ar: 'أكاديمية أطلس للجيو جيتسو',
      fr: 'Atlas BJJ Academy',
      en: 'Atlas BJJ Academy',
    },
    title: {
      ar: 'دليلك الشامل لتقنيات استعادة الحراسة (Guard Retention) في الجيو جيتسو الحديثة',
      fr: 'Guide Ultime de Rétention de Garde en Jiu-Jitsu Brésilien Moderne',
      en: 'Mastering Guard Retention: The Modern BJJ Blueprint',
    },
    summary: {
      ar: 'كيف تحافظ على دفاعك المحكم وتمنع الخصوم من تجاوز حراستك باستخدام أصول هندسة الحركة وحماية الأوتاد الأربعة.',
      fr: 'Apprenez à construire une défense impénétrable grâce aux principes biomécaniques et à la gestion des distances.',
      en: 'How to build an unpassable guard using hip frames, high knee-shields, and dynamic inversion techniques.',
    },
    content: {
      ar: `تعتبر وضعية الحراسة (The Guard) السمة الفريدة التي تميز الجيو جيتسو البرازيلية عن بقية الفنون القتالية الأرضية. إن القدرة على تحييد هجوم الخصم المندفع واستعادة المسافة أو الانتقال إلى هجوم مضاد هي الفرق بين الحزام الأبيض وحزام البطولات.

### 1. مفهوم إطارات الحماية (Frames vs Levers)
عندما يبدأ الخصم في محاولة المرور (Guard Passing)، يجب أن تكون ذراعاك وساقاك بمثابة دعامات هيكلية (Bone Frames) لا تعتمد على قوة العضلات بل على تماسك الهيكل العظمي.

### 2. قاعدة الركبة إلى الكوع (Elbow-to-Knee Connection)
الحفاظ على التصاق الكوع بالركبة يغلق كل مساحات النفوذ التي يسعى المهاجم لاستغلالها لتثبيت وضعية التحكم الجانبي (Side Control).

### 3. تدريبات يومية لتحسين المرونة الحركية
- الهروب بالوركين (Shrimping) على خط مستقيم
- الدوران الخلفي (Granby Roll) لحماية الظهر
- الرفع العكسي بالقدمين على الجدار`,
      fr: `La garde est le cœur battant du Jiu-Jitsu Brésilien. Pouvoir stopper un passage de garde agressif et reprendre l'initiative fait toute la différence sur le tatami.

### 1. Les Cadres Structurels (Frames)
Ne poussez pas avec vos muscles, bloquez avec la structure osseuse. Votre avant-bras et votre tibia créent un mur infranchissable.

### 2. La Connexion Coude-Genou
Le secret absolu réside dans la fermeture hermétique de l'espace entre le coude et le genou.`,
      en: `The Guard is the signature weapon of Brazilian Jiu-Jitsu. The ability to neutralize an aggressive pass and transition immediately into attacks defines world-class practitioners.

### 1. Skeletal Frames vs Muscular Pushing
Frames rely on structural alignment rather than muscular exertion. By aligning your forearm or shin across the opponent's hips or collar, you resist their bodyweight with zero fatigue.

### 2. The Golden Knee-to-Elbow Connection
Keeping your elbow attached to your ipsilateral knee completely shuts down diagonal cross-body entries and chest-to-chest pins.`,
    },
    category: 'technique',
    discipline: 'bjj',
    coverImage: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=1200&auto=format&fit=crop',
    author: {
      name: 'Prof. Yassine El Amrani',
      role: 'Head Instructor (Black Belt 3rd Degree)',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop',
    },
    publishedAt: '2026-09-08',
    readTimeMinutes: 6,
    tags: ['BJJ', 'Technique', 'Guard', 'Casablanca', 'Defense'],
    views: 1840,
    likes: 194,
    featured: true,
  },
  {
    id: 'art-weight-cut-nutrition-combat',
    slug: 'safe-weight-cutting-combat-sports',
    clubId: 'club-dubai-combat-club',
    clubName: {
      ar: 'نادي دبي للقتال',
      fr: 'Dubai Combat Club',
      en: 'Dubai Combat Club',
    },
    title: {
      ar: 'بروتوكول إنقاص الوزن الآمن للمقاتلين قبل البطولات بدون فقدان الطاقة',
      fr: 'Protocole de Perte de Poids Sécurisée pour Combattants de Haut Niveau',
      en: 'Science-Backed Weight Cutting for Combat Athletes',
    },
    summary: {
      ar: 'كيف يدير أبطال الـ MMA والملاكمة في دبي والمنطقة عملية الميزان وإعادة الإماهة السريعة بأمان تام وفق أسس علمية.',
      fr: 'Guide médical et nutritionnel pour réussir sa pesée sans compromettre sa force musculaire ni sa santé.',
      en: 'A step-by-step hydration and sodium tapering blueprint engineered for safe weigh-ins and maximum power.',
    },
    content: {
      ar: `يعد إنقاص الوزن (Weight Cut) أحد أصعب التحديات التي يواجهها مقاتلو الفنون القتالية قبل النزالات. الخطأ في هذه العملية قد يؤدي إلى هبوط حاد في الأداء أو مخاطر صحية بالغة.

### استراتيجية التخفيض التدريجي
1. **حمية الكربوهيدرات الذكية**: خفض مخازن الجليكوجين في العضلات تدريجياً قبل 4 أيام من موعد الميزان.
2. **تحميل الماء والملح (Water Loading)**: تنظيم احتباس السوائل وتفعيل إدرار البول الطبيعي للجسم.
3. **بروتوكول إعادة الإماهة بعد الميزان**: شرب محاليل كهرلية متوازنة (Electrolytes) غنية بالبوتاسيوم والمغنيسيوم لتفادي التشنجات.`,
      fr: `La coupe de poids est une étape cruciale pour les combattants de MMA, Boxe et Judo.

### Stratégie Étape par Étape
1. Gestion des réserves de glycogène
2. Cycle de sodium et hydratation contrôlée
3. Protocole de réhydratation post-pesée avec électrolytes`,
      en: `Cutting weight is both an art and a precise physiological science. Done improperly, it ruins explosive power, cardiovascular endurance, and brain protection.

### The 3 Core Pillars:
1. Glycogen depletion without muscle breakdown
2. Controlled sodium cycling & water manipulation
3. Rapid 24-hour post-weigh-in rehydration strategy`,
    },
    category: 'nutrition',
    discipline: 'mma',
    coverImage: 'https://images.unsplash.com/photo-1517438322307-e67111335449?q=80&w=1200&auto=format&fit=crop',
    author: {
      name: 'Dr. Sarah Al-Marzouqi',
      role: 'Sports Nutritionist & Combat Coach',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=150&auto=format&fit=crop',
    },
    publishedAt: '2026-09-02',
    readTimeMinutes: 8,
    tags: ['Nutrition', 'MMA', 'Weight Cut', 'Dubai', 'Performance'],
    views: 2950,
    likes: 310,
    featured: true,
  },
  {
    id: 'art-karate-olympic-kumite-tactics',
    slug: 'olympic-karate-distance-management',
    clubId: 'club-al-ahly-karate',
    clubName: {
      ar: 'نادي كاراتيه القاهرة',
      fr: 'Club de Karaté Le Caire',
      en: 'Cairo Karate Club',
    },
    title: {
      ar: 'إدارة المسافة (Ma-ai) وسرعة الانطلاق في الكوميتيه الحديث',
      fr: 'Gestion de la Distance (Ma-ai) et Vitesse de Frappe en Kumité WKF',
      en: 'Mastering Ma-ai: Spatial Timing & Explosive Attacks in WKF Karate',
    },
    summary: {
      ar: 'تحليل دقيق لأسرار الهجوم المباغت (كيزامي زوكي وجياكو زوكي) والتحكم النفسي في بساط التاتامي الدولي.',
      fr: 'Analyse des techniques de feinte et de contre-attaque rapide pour dominer le tatami international.',
      en: 'Deconstructing distance traps, footwork rhythms, and blistering Gyaku-Zuki counters.',
    },
    content: {
      ar: `في رياضة الكاراتيه الأولمبية، تفصل أجزاء من الثانية بين حصد النقطة الذهبية (Ippon) أو الوقوع في فخ العقوبات.

### مفهوم الـ Ma-ai (المسافة القتالية الفعالة)
لا تقتصر المسافة على الأمتار فقط، بل تعني اللحظة الذهبية التي يكون فيها الخصم غير قادر على الدفاع أثناء نقل وزنه.`,
      fr: `Le Ma-ai représente la distance spatiotemporelle exacte entre deux combattants.`,
      en: `In elite WKF Kumite, matches are won or lost in fractions of a second through spatial deception.`,
    },
    category: 'competition',
    discipline: 'karate',
    coverImage: 'https://images.unsplash.com/photo-1555597673-b21d5c935865?q=80&w=1200&auto=format&fit=crop',
    author: {
      name: 'Sensei Tarek Mansour',
      role: 'WKF 7th Dan Master',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=150&auto=format&fit=crop',
    },
    publishedAt: '2026-08-27',
    readTimeMinutes: 5,
    tags: ['Karate', 'WKF', 'Cairo', 'Kumite', 'Olympics'],
    views: 1420,
    likes: 128,
  },
];

export const mockNotifications: NotificationItem[] = [
  {
    id: 'notif-1',
    title: {
      ar: 'بث مباشر الآن: نهائيات بطولة أبوظبي غراند سلام في دبي!',
      fr: 'En direct : Finales du Grand Slam de Jiu-Jitsu à Dubaï !',
      en: 'Live Now: Abu Dhabi Grand Slam BJJ Finals in Dubai!',
    },
    message: {
      ar: 'نزالات الحزام الأسود لوزن 77 كغ تنطلق الآن في صالة كوكاكولا أرينا.',
      fr: 'Les combats ceinture noire -77kg débutent à la Coca-Cola Arena.',
      en: 'Black Belt -77kg finals are underway at Coca-Cola Arena.',
    },
    type: 'competition_live',
    timestamp: '2026-09-11 12:45',
    read: false,
    linkRoute: '/competitions',
    relatedEntityId: 'comp-dubai-grand-slam-2026',
  },
  {
    id: 'notif-2',
    title: {
      ar: 'تحديث من نادي أطلس كازابلانكا الذي تتابعه',
      fr: 'Mise à jour du club Atlas Casablanca que vous suivez',
      en: 'Update from Atlas Casablanca Academy (You are watching)',
    },
    message: {
      ar: 'تمت إضافة جدول حصص نهاية الأسبوع الجديدة وبرنامج الأبطال الصغار.',
      fr: 'Nouveau planning du week-end et cours enfants disponibles.',
      en: 'New weekend schedule and kids masterclass just published.',
    },
    type: 'club_news',
    timestamp: '2026-09-10 16:30',
    read: false,
    linkRoute: '/club/club-atlas-bjj',
    relatedEntityId: 'club-atlas-bjj',
  },
  {
    id: 'notif-3',
    title: {
      ar: 'فتح باب التسجيل في بطولة الأندية العربية بالقاهرة',
      fr: 'Inscriptions ouvertes pour le Championnat Arabe au Caire',
      en: 'Registration Open: Arab Karate Championship Cairo',
    },
    message: {
      ar: 'تبقت 15 يوماً فقط قبل إغلاق باب التسجيل لجميع الفئات والأوزان.',
      fr: 'Il reste 15 jours pour enregistrer vos athlètes et équipes.',
      en: 'Only 15 days remaining before the official registration cutoff.',
    },
    type: 'event',
    timestamp: '2026-09-09 09:15',
    read: true,
    linkRoute: '/competitions',
    relatedEntityId: 'comp-cairo-arab-karate-2026',
  },
];

'use client';
import React, { useState } from 'react';
import { Club } from '../types';
import { useApp } from '@/lib/app-context';
import { useRouter } from 'next/navigation';
import {
  Star,
  MapPin,
  CheckCircle,
  Play,
  Eye,
  BookmarkPlus,
  BookmarkCheck,
  Award,
  ChevronRight,
  Shield,
} from 'lucide-react';

interface ClubCardProps {
  club: Club;
  onOpenVideo?: (videoUrl: string, title: string) => void;
}

export const ClubCard: React.FC<ClubCardProps> = ({ club, onOpenVideo }) => {
  const { language, t, toggleWatchClub, isWatchingClub } = useApp();
  const router = useRouter();
  const watching = isWatchingClub(club.id);

  const countryFlags: Record<string, string> = {
    MA: '🇲🇦',
    EG: '🇪🇬',
    AE: '🇦🇪',
    SA: '🇸🇦',
    TN: '🇹🇳',
    JO: '🇯🇴',
    DZ: '🇩🇿',
    QA: '🇶🇦',
  };

  const handleCardClick = () => {
    router.push(`/club/${club.id}`);
  };

  return (
    <div
      id={`club-card-${club.id}`}
      className="group relative rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden"
    >
      {/* Cover Image & Video / Watch overlays */}
      <div className="relative h-48 w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
        <img
          src={club.coverImage}
          alt={club.name[language] || club.name.en}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        {/* Top Badges: Country flag & Rating */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
          <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm">
            <span>{countryFlags[club.countryCode] || '🥋'}</span>
            <span>{club.city}</span>
          </span>

          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleWatchClub(club.id);
            }}
            title={watching ? t('action.watching') : t('action.watch')}
            className={`p-2 rounded-full backdrop-blur-md transition-all cursor-pointer ${
              watching
                ? 'bg-amber-500 text-slate-950 shadow-md scale-105'
                : 'bg-black/50 text-white hover:bg-black/70 hover:scale-105'
            }`}
          >
            {watching ? <BookmarkCheck className="w-4 h-4" /> : <BookmarkPlus className="w-4 h-4" />}
          </button>
        </div>

        {/* Video Play Trigger Button */}
        {club.videoUrl && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (onOpenVideo) {
                onOpenVideo(club.videoUrl, club.name[language] || club.name.en);
              } else {
                handleCardClick();
              }
            }}
            className="absolute inset-0 m-auto w-12 h-12 rounded-full bg-amber-500/90 hover:bg-amber-500 text-slate-950 flex items-center justify-center shadow-lg transform active:scale-95 transition-all group-hover:scale-110 cursor-pointer"
            aria-label="Play promotional video"
          >
            <Play className="w-5 h-5 fill-current ml-0.5" />
          </button>
        )}

        {/* Bottom stats inside image */}
        <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-white text-xs">
          <div className="flex items-center gap-1 font-bold">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>{club.rating}</span>
            <span className="text-white/70 font-normal">({club.reviewCount})</span>
          </div>
          {club.pricing.hasFreeTrial && (
            <span className="px-2 py-0.5 rounded-md bg-emerald-500/90 text-white font-bold text-[10px] tracking-wide">
              {t('action.freeTrial')}
            </span>
          )}
        </div>
      </div>

      {/* Card Body */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Logo, Title and Verified icon */}
          <div className="flex items-start gap-3">
            <img
              src={club.logo}
              alt="Logo"
              className="w-10 h-10 rounded-xl object-cover ring-2 ring-amber-500/30 shrink-0"
            />
            <div className="flex-1 min-w-0 text-start">
              <div className="flex items-center gap-1.5">
                <h3
                  onClick={handleCardClick}
                  className="font-bold text-base sm:text-lg text-slate-900 dark:text-slate-100 hover:text-amber-600 dark:hover:text-amber-400 cursor-pointer truncate"
                >
                  {club.name[language] || club.name.en}
                </h3>
                {club.verified && (
                  <CheckCircle className="w-4 h-4 text-sky-500 shrink-0" />
                )}
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                {club.tagline[language] || club.tagline.en}
              </p>
            </div>
          </div>

          {/* Discipline Badges */}
          <div className="mt-3 flex flex-wrap gap-1.5">
            <span className="px-2 py-0.5 rounded-lg text-[11px] font-bold bg-amber-100 text-amber-900 dark:bg-amber-950/70 dark:text-amber-300">
              {t(`discipline.${club.discipline}`)}
            </span>
            {club.allDisciplines
              .filter((d) => d !== club.discipline)
              .slice(0, 2)
              .map((d) => (
                <span
                  key={d}
                  className="px-2 py-0.5 rounded-lg text-[11px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                >
                  {t(`discipline.${d}`)}
                </span>
              ))}
          </div>

          {/* Key Instructors & Achievements preview */}
          <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1">
              <Shield className="w-3.5 h-3.5 text-amber-500" />
              <span>{club.instructors[0]?.name || 'Expert Coaches'}</span>
            </span>
            <span className="flex items-center gap-1">
              <Award className="w-3.5 h-3.5 text-amber-500" />
              <span>{club.achievements.length} Medals</span>
            </span>
          </div>
        </div>

        {/* Footer with Price & View Action */}
        <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold block">
              {language === 'ar' ? 'الاشتراك الشهري' : 'Starting at'}
            </span>
            <span className="text-sm font-extrabold text-slate-900 dark:text-white">
              ${club.pricing.monthly}{' '}
              <span className="text-xs font-normal text-slate-500">/ mo</span>
            </span>
          </div>

          <button
            onClick={handleCardClick}
            className="px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-amber-500 dark:hover:bg-amber-600 text-white dark:text-slate-950 text-xs font-bold transition-transform active:scale-95 flex items-center gap-1 cursor-pointer"
          >
            <span>{t('action.viewDetails')}</span>
            <ChevronRight className="w-3.5 h-3.5 rtl:rotate-180" />
          </button>
        </div>
      </div>
    </div>
  );
};

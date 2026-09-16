import type { Club, Coach, Athlete, EventOrganizer, Competition, Article } from '../types';

// byId lookup helpers — take an array and return a map id -> entity
export function byId<T extends { id: string }>(items: T[]): Record<string, T> {
  const map: Record<string, T> = {};
  for (const item of items) map[item.id] = item;
  return map;
}

// slug -> id mapping for clubs (used by legacy navigate targets)
export function slugToId(clubs: Club[]): Record<string, string> {
  const map: Record<string, string> = {};
  for (const c of clubs) map[c.slug] = c.id;
  return map;
}

// URL helpers — return Next.js route paths for entities
export function getClubUrl(id: string): string { return `/club/${id}`; }
export function getCoachUrl(id: string): string { return `/coach/${id}`; }
export function getAthleteUrl(id: string): string { return `/athlete/${id}`; }
export function getOrganizerUrl(id: string): string { return `/organizer/${id}`; }
export function getArticleUrl(id: string): string { return `/article/${id}`; }
export function getCompetitionUrl(id: string): string { return `/competitions`; }

// Resolve a club slug to its current id (in case the club was re-created with a new id)
export function resolveClubId(clubs: Club[], slug: string): string | undefined {
  return clubs.find(c => c.slug === slug)?.id;
}

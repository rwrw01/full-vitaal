// src/service/cohort.ts
const MS_PER_DAY = 86_400_000;

export interface CohortState {
  status: 'future' | 'active' | 'completed';
  currentWeek: number;
  unlockedWeeks: number;
  daysUntilStart?: number;
  daysUntilNextWeek?: number;
}

export function parseStartDate(input: string): Date | null {
  if (!input) return null;
  const date = new Date(input);
  if (isNaN(date.getTime())) return null;
  return date;
}

export function getCohortState(startDate: Date, totalWeeks: number): CohortState {
  const now = new Date();
  const startDay = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const daysSinceStart = Math.floor((today.getTime() - startDay.getTime()) / MS_PER_DAY);

  if (daysSinceStart < 0) {
    return {
      status: 'future',
      currentWeek: 0,
      unlockedWeeks: 0,
      daysUntilStart: Math.abs(daysSinceStart),
    };
  }

  const rawWeek = Math.floor(daysSinceStart / 7) + 1;
  const currentWeek = Math.min(rawWeek, totalWeeks);
  const unlockedWeeks = currentWeek;

  if (rawWeek > totalWeeks) {
    return { status: 'completed', currentWeek: totalWeeks, unlockedWeeks: totalWeeks };
  }

  const daysIntoWeek = daysSinceStart % 7;
  const daysUntilNextWeek = 7 - daysIntoWeek;

  return {
    status: 'active',
    currentWeek,
    unlockedWeeks,
    daysUntilNextWeek: currentWeek < totalWeeks ? daysUntilNextWeek : undefined,
  };
}

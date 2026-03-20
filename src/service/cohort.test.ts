// src/service/cohort.test.ts
import { describe, it, expect, vi, afterEach } from 'vitest';
import { getCohortState, parseStartDate } from './cohort';

describe('parseStartDate', () => {
  it('should parse valid date string', () => {
    expect(parseStartDate('2026-04-07')).toEqual(new Date('2026-04-07'));
  });

  it('should return null for invalid date', () => {
    expect(parseStartDate('not-a-date')).toBeNull();
  });

  it('should return null for empty string', () => {
    expect(parseStartDate('')).toBeNull();
  });
});

describe('getCohortState', () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it('should show week 1 on start date', () => {
    vi.setSystemTime(new Date('2026-04-07'));
    const state = getCohortState(new Date('2026-04-07'), 10);
    expect(state.currentWeek).toBe(1);
    expect(state.unlockedWeeks).toBe(1);
    expect(state.status).toBe('active');
  });

  it('should show week 3 after 14 days', () => {
    vi.setSystemTime(new Date('2026-04-21'));
    const state = getCohortState(new Date('2026-04-07'), 10);
    expect(state.currentWeek).toBe(3);
    expect(state.unlockedWeeks).toBe(3);
  });

  it('should cap at total weeks', () => {
    vi.setSystemTime(new Date('2026-08-01'));
    const state = getCohortState(new Date('2026-04-07'), 10);
    expect(state.currentWeek).toBe(10);
    expect(state.unlockedWeeks).toBe(10);
    expect(state.status).toBe('completed');
  });

  it('should return future status for future start date', () => {
    vi.setSystemTime(new Date('2026-04-01'));
    const state = getCohortState(new Date('2026-04-07'), 10);
    expect(state.status).toBe('future');
    expect(state.daysUntilStart).toBe(6);
  });

  it('should return days until next week', () => {
    vi.setSystemTime(new Date('2026-04-09')); // day 3 of week 1
    const state = getCohortState(new Date('2026-04-07'), 10);
    expect(state.currentWeek).toBe(1);
    expect(state.daysUntilNextWeek).toBe(5);
  });
});

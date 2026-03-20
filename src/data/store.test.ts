// src/data/store.test.ts
import { describe, it, expect, beforeEach } from 'vitest';
import { store } from './store';

describe('store', () => {
  beforeEach(async () => {
    await store.clear();
  });

  it('should save and retrieve start date', async () => {
    await store.setStartDate('2026-04-07');
    expect(await store.getStartDate()).toBe('2026-04-07');
  });

  it('should return null for missing start date', async () => {
    expect(await store.getStartDate()).toBeNull();
  });

  it('should mark week as completed', async () => {
    await store.completeWeek(3);
    expect(await store.isWeekCompleted(3)).toBe(true);
    expect(await store.isWeekCompleted(4)).toBe(false);
  });

  it('should save and retrieve reflection', async () => {
    await store.saveReflection(3, 'Ik kan meer wandelen');
    expect(await store.getReflection(3)).toBe('Ik kan meer wandelen');
  });

  it('should return all reflections for export', async () => {
    await store.saveReflection(1, 'Reflectie week 1');
    await store.saveReflection(3, 'Reflectie week 3');
    const all = await store.getAllReflections();
    expect(all).toEqual([
      { week: 1, text: 'Reflectie week 1' },
      { week: 3, text: 'Reflectie week 3' },
    ]);
  });

  it('should return completed week numbers', async () => {
    await store.completeWeek(1);
    await store.completeWeek(3);
    expect(await store.getCompletedWeeks()).toEqual([1, 3]);
  });
});

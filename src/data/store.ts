// src/data/store.ts
import { get, set, del, keys, clear } from 'idb-keyval';

const KEY_START = 'start_date';
const KEY_WEEK_DONE = (w: number) => `week_${w}_done`;
const KEY_REFLECTION = (w: number) => `reflection_${w}`;
const KEY_CHECKLIST = (w: number) => `checklist_${w}`;
const KEY_QUIZ = (w: number) => `quiz_${w}`;

export const store = {
  async setStartDate(date: string): Promise<void> {
    await set(KEY_START, date);
  },

  async getStartDate(): Promise<string | null> {
    return (await get<string>(KEY_START)) ?? null;
  },

  async completeWeek(week: number): Promise<void> {
    await set(KEY_WEEK_DONE(week), true);
  },

  async isWeekCompleted(week: number): Promise<boolean> {
    return (await get<boolean>(KEY_WEEK_DONE(week))) === true;
  },

  async getCompletedWeeks(): Promise<number[]> {
    const allKeys = await keys();
    return allKeys
      .filter((k): k is string => typeof k === 'string' && k.startsWith('week_') && k.endsWith('_done'))
      .map((k) => parseInt(k.replace('week_', '').replace('_done', ''), 10))
      .sort((a, b) => a - b);
  },

  async saveReflection(week: number, text: string): Promise<void> {
    await set(KEY_REFLECTION(week), text);
  },

  async getReflection(week: number): Promise<string | null> {
    return (await get<string>(KEY_REFLECTION(week))) ?? null;
  },

  async getAllReflections(): Promise<Array<{ week: number; text: string }>> {
    const allKeys = await keys();
    const reflectionKeys = allKeys
      .filter((k): k is string => typeof k === 'string' && k.startsWith('reflection_'))
      .sort();

    const results: Array<{ week: number; text: string }> = [];
    for (const k of reflectionKeys) {
      const week = parseInt(k.replace('reflection_', ''), 10);
      const text = await get<string>(k);
      if (text) results.push({ week, text });
    }
    return results;
  },

  async saveChecklist(week: number, checked: string[]): Promise<void> {
    await set(KEY_CHECKLIST(week), checked);
  },

  async getChecklist(week: number): Promise<string[]> {
    return (await get<string[]>(KEY_CHECKLIST(week))) ?? [];
  },

  async saveQuizAnswers(week: number, answers: Record<number, string>): Promise<void> {
    await set(KEY_QUIZ(week), answers);
  },

  async getQuizAnswers(week: number): Promise<Record<number, string>> {
    return (await get<Record<number, string>>(KEY_QUIZ(week))) ?? {};
  },

  async clear(): Promise<void> {
    await clear();
  },
};

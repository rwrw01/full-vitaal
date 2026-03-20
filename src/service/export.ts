// src/service/export.ts
import type { WeekModule } from '@/content/types';

interface Reflection {
  week: number;
  text: string;
}

export function formatReflections(reflections: Reflection[], weeks: WeekModule[]): string {
  const header = '=== Vitaal Na De Bootcamp — Mijn Reflecties ===\n\n';

  if (reflections.length === 0) {
    return header + 'Geen reflecties opgeslagen.\n';
  }

  const body = reflections
    .map((r) => {
      const weekTitle = weeks.find((w) => w.week === r.week)?.title ?? `Week ${r.week}`;
      return `--- Week ${r.week}: ${weekTitle} ---\n${r.text}\n`;
    })
    .join('\n');

  return header + body;
}

export function downloadTextFile(content: string, filename: string): void {
  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

// src/service/export.test.ts
import { describe, it, expect } from 'vitest';
import { formatReflections } from './export';

describe('formatReflections', () => {
  it('should format reflections as readable text', () => {
    const reflections = [
      { week: 1, text: 'Ik slaap beter' },
      { week: 3, text: 'Meer bewegen helpt' },
    ];
    const weeks = [
      { week: 1, title: 'Energie & ritme' },
      { week: 3, title: 'Beweeggewoontes' },
    ];
    const result = formatReflections(reflections, weeks as any);
    expect(result).toContain('Week 1: Energie & ritme');
    expect(result).toContain('Ik slaap beter');
    expect(result).toContain('Week 3: Beweeggewoontes');
    expect(result).toContain('Meer bewegen helpt');
    expect(result).toContain('Vitaal Na De Bootcamp');
  });

  it('should handle empty reflections', () => {
    const result = formatReflections([], []);
    expect(result).toContain('Geen reflecties');
  });
});

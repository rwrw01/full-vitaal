// src/ui/trainer.test.ts
import { describe, it, expect } from 'vitest';
import { buildCohortUrl } from './trainer';

describe('buildCohortUrl', () => {
  it('should build URL with start date parameter', () => {
    const url = buildCohortUrl('https://vitaal.example.nl', '2026-04-07');
    expect(url).toBe('https://vitaal.example.nl/?start=2026-04-07');
  });

  it('should handle base URL with trailing slash', () => {
    const url = buildCohortUrl('https://vitaal.example.nl/', '2026-04-07');
    expect(url).toBe('https://vitaal.example.nl/?start=2026-04-07');
  });
});

// src/ui/overview.test.ts
import { describe, it, expect, vi, afterEach } from 'vitest';
import { renderOverview } from './overview';

// Mock store and cohort
vi.mock('@/data/store', () => ({
  store: {
    getCompletedWeeks: vi.fn().mockResolvedValue([1, 2]),
    getStartDate: vi.fn().mockResolvedValue('2026-04-07'),
  },
}));

describe('renderOverview', () => {
  afterEach(() => { vi.useRealTimers(); });

  it('should render progress bar with correct fraction', async () => {
    vi.setSystemTime(new Date('2026-04-21')); // week 3
    const container = document.createElement('div');
    await renderOverview(container);
    const fill = container.querySelector('.progress-bar-fill') as HTMLElement;
    expect(fill).toBeTruthy();
    expect(fill.style.width).toBe('20%'); // 2 completed of 10
  });

  it('should render 10 week cards', async () => {
    vi.setSystemTime(new Date('2026-04-21'));
    const container = document.createElement('div');
    await renderOverview(container);
    const cards = container.querySelectorAll('.card');
    expect(cards.length).toBe(10);
  });

  it('should mark completed weeks with done class', async () => {
    vi.setSystemTime(new Date('2026-04-21'));
    const container = document.createElement('div');
    await renderOverview(container);
    const cards = container.querySelectorAll('.card');
    expect(cards[0]?.classList.contains('card--done')).toBe(true);
    expect(cards[1]?.classList.contains('card--done')).toBe(true);
    expect(cards[2]?.classList.contains('card--current')).toBe(true);
    expect(cards[3]?.classList.contains('card--locked')).toBe(true);
  });
});

// src/ui/module.test.ts
import { describe, it, expect, vi } from 'vitest';
import { renderModule } from './module';

vi.mock('@/data/store', () => ({
  store: {
    getReflection: vi.fn().mockResolvedValue(null),
    saveReflection: vi.fn().mockResolvedValue(undefined),
    isWeekCompleted: vi.fn().mockResolvedValue(false),
    completeWeek: vi.fn().mockResolvedValue(undefined),
  },
}));

const mockWeek = {
  week: 3,
  title: 'Beweeggewoontes',
  microlearning: {
    title: 'Waarom 10.000 stappen een mythe is',
    body: 'Test body tekst met **markdown**.',
  },
  reflection: { question: 'Hoe beweeg je?' },
  challenge: { emoji: '\uD83C\uDFC3', title: 'Beweegmomentjes', description: 'Doe het.' },
};

describe('renderModule', () => {
  it('should render microlearning title', async () => {
    const container = document.createElement('div');
    await renderModule(container, mockWeek);
    expect(container.querySelector('h2')?.textContent).toContain('Waarom 10.000 stappen');
  });

  it('should render reflection question', async () => {
    const container = document.createElement('div');
    await renderModule(container, mockWeek);
    expect(container.textContent).toContain('Hoe beweeg je?');
  });

  it('should render challenge', async () => {
    const container = document.createElement('div');
    await renderModule(container, mockWeek);
    expect(container.textContent).toContain('Beweegmomentjes');
  });

  it('should render complete button', async () => {
    const container = document.createElement('div');
    await renderModule(container, mockWeek);
    expect(container.querySelector('.btn--primary')).toBeTruthy();
  });
});

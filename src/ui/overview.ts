// src/ui/overview.ts
import { store } from '@/data/store';
import { getCohortState } from '@/service/cohort';
import weeks from '@/content/weeks.json';

export async function renderOverview(container: HTMLElement): Promise<void> {
  const startDate = await store.getStartDate();
  if (!startDate) return; // handled by router

  const state = getCohortState(new Date(startDate), weeks.length);
  const completedWeeks = await store.getCompletedWeeks();

  const completedCount = completedWeeks.length;
  const progressPct = Math.round((completedCount / weeks.length) * 100);

  container.innerHTML = `
    <h1>Vitaal Na De Bootcamp</h1>
    <div class="section">
      <div style="display:flex;justify-content:space-between;font-size:0.8rem;margin-bottom:0.4rem">
        <span>Voortgang</span>
        <span style="color:var(--color-primary);font-weight:600">${completedCount} van ${weeks.length} weken</span>
      </div>
      <div class="progress-bar">
        <div class="progress-bar-fill" style="width:${progressPct}%"></div>
      </div>
    </div>
    <div id="week-list"></div>
  `;

  const list = container.querySelector('#week-list')!;

  for (const week of weeks) {
    const isCompleted = completedWeeks.includes(week.week);
    const isCurrent = week.week === state.currentWeek && !isCompleted;
    const isLocked = week.week > state.unlockedWeeks;

    const card = document.createElement('div');
    card.className = 'card' +
      (isCompleted ? ' card--done' : '') +
      (isCurrent ? ' card--current' : '') +
      (isLocked ? ' card--locked' : '');

    const iconBg = isCompleted ? 'var(--color-primary)'
      : isCurrent ? 'var(--color-accent)'
      : 'rgba(255,255,255,0.1)';

    const iconContent = isCompleted ? '\u2713' : isLocked ? '\uD83D\uDD12' : `${week.week}`;

    const subtitle = isCompleted ? 'Afgerond'
      : isCurrent ? 'Open nu'
      : isLocked && state.daysUntilNextWeek
        ? `Beschikbaar over ${(week.week - state.unlockedWeeks) * 7} dagen`
        : '';

    card.innerHTML = `
      <div class="card-icon" style="background:${iconBg}">${iconContent}</div>
      <div style="flex:1">
        <div style="font-weight:600;font-size:0.9rem">Week ${week.week}: ${week.title}</div>
        <div style="font-size:0.75rem;color:var(--color-text-muted)">${subtitle}</div>
      </div>
      ${!isLocked ? '<div style="font-size:1.2rem">\u203A</div>' : ''}
    `;

    if (!isLocked) {
      card.addEventListener('click', () => {
        window.location.hash = `#/week/${week.week}`;
      });
    }

    list.appendChild(card);
  }
}

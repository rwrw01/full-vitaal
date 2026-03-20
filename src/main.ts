import './ui/styles.css';
import { addRoute, startRouter } from './router';
import { store } from './data/store';
import { parseStartDate, getCohortState } from './service/cohort';
import { renderOverview } from './ui/overview';
import { renderModule } from './ui/module';
import { renderWelcome, renderError, renderFuture, renderCompleted } from './ui/welcome';
import { renderTrainer } from './ui/trainer';
import { formatReflections, downloadTextFile } from './service/export';
import { setupPWA } from './pwa';
import weeks from './content/weeks.json';
import type { WeekModule } from './content/types';

const app = document.getElementById('app')!;

async function initStartDate(): Promise<void> {
  const params = new URLSearchParams(window.location.search);
  const startParam = params.get('start');
  if (startParam) {
    const parsed = parseStartDate(startParam);
    if (parsed) {
      await store.setStartDate(startParam);
      window.history.replaceState({}, '', window.location.pathname + window.location.hash);
    }
  }
}

addRoute('/trainer', async () => {
  await renderTrainer(app);
});

addRoute('/week/:num', async (params) => {
  const weekNum = parseInt(params['num'] ?? '', 10);
  const week = (weeks as WeekModule[]).find((w) => w.week === weekNum);
  if (!week) {
    renderError(app, 'Deze week bestaat niet.');
    return;
  }

  const startDate = await store.getStartDate();
  if (!startDate) {
    renderWelcome(app);
    return;
  }

  const state = getCohortState(new Date(startDate), weeks.length);
  if (weekNum > state.unlockedWeeks) {
    renderError(app, 'Deze week is nog niet beschikbaar.');
    return;
  }

  await renderModule(app, week);
});

addRoute('/', async () => {
  const startDate = await store.getStartDate();
  if (!startDate) {
    renderWelcome(app);
    return;
  }

  const parsed = parseStartDate(startDate);
  if (!parsed) {
    renderError(app, 'Ongeldige link — vraag je trainer om een nieuwe QR-code.');
    return;
  }

  const state = getCohortState(parsed, weeks.length);

  if (state.status === 'future') {
    renderFuture(app, state.daysUntilStart!);
    return;
  }

  if (state.status === 'completed') {
    renderCompleted(app);
    const exportBtn = app.querySelector('#export-btn');
    exportBtn?.addEventListener('click', async () => {
      const reflections = await store.getAllReflections();
      const text = formatReflections(reflections, weeks as WeekModule[]);
      downloadTextFile(text, 'mijn-reflecties.txt');
    });
    return;
  }

  await renderOverview(app);
});

async function boot(): Promise<void> {
  await initStartDate();
  setupPWA();
  startRouter();
}

boot();

// src/ui/module.ts
import { store } from '@/data/store';
import type { WeekModule } from '@/content/types';

export async function renderModule(container: HTMLElement, week: WeekModule): Promise<void> {
  const savedReflection = await store.getReflection(week.week);
  const isCompleted = await store.isWeekCompleted(week.week);

  const videoHtml = week.microlearning.video
    ? `<div class="video-embed"><iframe src="${week.microlearning.video}" allowfullscreen loading="lazy"></iframe></div>`
    : '';

  container.innerHTML = `
    <a href="#/" class="back-link">\u2039 Terug naar overzicht</a>
    <div class="label" style="color:var(--color-text-muted)">Week ${week.week}</div>
    <h1>${week.title}</h1>

    <div class="section" style="margin-top:1.5rem">
      <div class="label" style="color:var(--color-primary)">Microlearning</div>
      <h2>${week.microlearning.title}</h2>
      <div class="body">${formatBody(week.microlearning.body)}</div>
      ${videoHtml}
    </div>

    <hr style="border:none;border-top:1px solid var(--color-border);margin:1.5rem 0">

    <div class="section">
      <div class="label" style="color:var(--color-reflection)">Reflectie</div>
      <p style="font-weight:500;margin:0.5rem 0">${week.reflection.question}</p>
      <textarea id="reflection" placeholder="Typ hier je antwoord... (wordt alleen op jouw telefoon opgeslagen)">${savedReflection ?? ''}</textarea>
    </div>

    <hr style="border:none;border-top:1px solid var(--color-border);margin:1.5rem 0">

    <div class="section">
      <div class="label" style="color:var(--color-challenge)">Challenge van de week</div>
      <div class="challenge-card">
        <div class="emoji">${week.challenge.emoji}</div>
        <div>
          <div style="font-weight:600">${week.challenge.title}</div>
          <p style="font-size:0.85rem;color:var(--color-text-muted);margin-top:0.3rem">${week.challenge.description}</p>
        </div>
      </div>
    </div>

    <div style="text-align:center;margin-top:1.5rem">
      <button id="complete-btn" class="btn btn--primary" ${isCompleted ? 'disabled style="opacity:0.5"' : ''}>
        ${isCompleted ? '\u2713 Afgerond' : '\u2713 Week afronden'}
      </button>
    </div>
  `;

  // Auto-save reflection on input
  const textarea = container.querySelector('#reflection') as HTMLTextAreaElement;
  let saveTimeout: ReturnType<typeof setTimeout>;
  textarea.addEventListener('input', () => {
    clearTimeout(saveTimeout);
    saveTimeout = setTimeout(() => {
      store.saveReflection(week.week, textarea.value);
    }, 500);
  });

  // Complete button
  const btn = container.querySelector('#complete-btn') as HTMLButtonElement;
  if (!isCompleted) {
    btn.addEventListener('click', async () => {
      await store.completeWeek(week.week);
      btn.textContent = '\u2713 Afgerond';
      btn.disabled = true;
      btn.style.opacity = '0.5';
    });
  }
}

function formatBody(markdown: string): string {
  // Minimal markdown: bold and paragraphs only
  return markdown
    .split('\n\n')
    .map((p) => `<p style="margin:0.5rem 0;font-size:0.9rem;line-height:1.6;opacity:0.85">${
      p.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    }</p>`)
    .join('');
}

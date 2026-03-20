import { store } from '@/data/store';
import type { WeekModule } from '@/content/types';

export async function renderModule(container: HTMLElement, week: WeekModule): Promise<void> {
  const savedReflection = await store.getReflection(week.week);
  const isCompleted = await store.isWeekCompleted(week.week);
  const savedChecklist = await store.getChecklist(week.week);
  const savedQuiz = await store.getQuizAnswers(week.week);

  const checklistHtml = week.checklist ? renderChecklist(week, savedChecklist) : '';
  const quizHtml = week.quiz ? renderQuiz(week, savedQuiz) : '';

  container.innerHTML = `
    <a href="#/" class="back-link">\u2039 Terug naar overzicht</a>
    <div class="label" style="color:var(--color-text-muted)">Week ${week.week}</div>
    <h1>${week.title}</h1>

    <div class="section" style="margin-top:1.5rem">
      <div class="label" style="color:var(--color-primary)">Microlearning</div>
      <h2>${week.microlearning.title}</h2>
      <div class="body">${formatBody(week.microlearning.body)}</div>
    </div>

    ${checklistHtml}
    ${quizHtml}

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

  setupReflection(container, week.week);
  if (week.checklist) setupChecklist(container, week.week);
  if (week.quiz) setupQuiz(container, week);
  setupCompleteButton(container, week.week, isCompleted);
}

function renderChecklist(week: WeekModule, saved: string[]): string {
  const items = week.checklist!.items.map((item) => {
    const checked = saved.includes(item.id) ? 'checked' : '';
    return `
      <label class="checklist-item" style="display:flex;align-items:center;gap:0.75rem;padding:0.6rem 0;cursor:pointer">
        <input type="checkbox" data-id="${item.id}" ${checked}
          style="width:20px;height:20px;accent-color:var(--color-primary);flex-shrink:0">
        <span style="font-size:0.9rem;${checked ? 'text-decoration:line-through;opacity:0.6' : ''}">${item.label}</span>
      </label>`;
  }).join('');

  const count = saved.length;
  const total = week.checklist!.items.length;

  return `
    <hr style="border:none;border-top:1px solid var(--color-border);margin:1.5rem 0">
    <div class="section">
      <div class="label" style="color:var(--color-primary)">Checklist</div>
      <div style="display:flex;justify-content:space-between;align-items:center;margin:0.5rem 0">
        <span style="font-weight:500">${week.checklist!.title}</span>
        <span id="checklist-count" style="font-size:0.8rem;color:var(--color-primary)">${count}/${total}</span>
      </div>
      <div class="progress-bar" style="margin-bottom:0.75rem">
        <div class="progress-bar-fill" id="checklist-progress" style="width:${total > 0 ? Math.round((count / total) * 100) : 0}%"></div>
      </div>
      <div id="checklist-items" style="border:1px solid var(--color-border);border-radius:var(--radius);padding:0.25rem 0.75rem">
        ${items}
      </div>
    </div>`;
}

function renderQuiz(week: WeekModule, saved: Record<number, string>): string {
  const questions = week.quiz!.questions.map((q, i) => {
    const answered = saved[i] !== undefined;
    const selectedId = saved[i];

    const options = q.options.map((opt) => {
      const isSelected = selectedId === opt.id;
      const showResult = answered;
      let classes = 'quiz-option';
      if (showResult && isSelected && opt.correct) classes += ' quiz-correct';
      if (showResult && isSelected && !opt.correct) classes += ' quiz-wrong';
      if (showResult && !isSelected && opt.correct) classes += ' quiz-reveal';

      return `
        <button class="${classes}" data-question="${i}" data-option="${opt.id}"
          ${answered ? 'disabled' : ''}
          style="display:block;width:100%;text-align:left;padding:0.6rem 0.75rem;margin:0.4rem 0;
            background:${showResult && isSelected && opt.correct ? 'rgba(16,185,129,0.15)' : showResult && isSelected && !opt.correct ? 'rgba(239,68,68,0.15)' : showResult && opt.correct ? 'rgba(16,185,129,0.08)' : 'var(--color-surface)'};
            border:1px solid ${showResult && isSelected && opt.correct ? 'var(--color-primary)' : showResult && isSelected && !opt.correct ? '#ef4444' : 'var(--color-border)'};
            border-radius:8px;color:var(--color-text);cursor:${answered ? 'default' : 'pointer'};font-size:0.9rem">
          ${opt.label}
        </button>`;
    }).join('');

    const explanation = answered
      ? `<div style="margin-top:0.5rem;padding:0.6rem;background:rgba(16,185,129,0.08);border-radius:8px;font-size:0.85rem;color:var(--color-text-muted)">${q.explanation}</div>`
      : '';

    return `
      <div class="quiz-question" style="margin-bottom:1rem">
        <p style="font-weight:500;margin-bottom:0.4rem">${q.question}</p>
        <div class="quiz-options">${options}</div>
        ${explanation}
      </div>`;
  }).join('');

  return `
    <hr style="border:none;border-top:1px solid var(--color-border);margin:1.5rem 0">
    <div class="section">
      <div class="label" style="color:var(--color-accent)">Test jezelf</div>
      <span style="font-weight:500">${week.quiz!.title}</span>
      <div id="quiz-container" style="margin-top:0.75rem">${questions}</div>
    </div>`;
}

function setupChecklist(container: HTMLElement, weekNum: number): void {
  const checkboxes = container.querySelectorAll<HTMLInputElement>('#checklist-items input[type="checkbox"]');
  checkboxes.forEach((cb) => {
    cb.addEventListener('change', async () => {
      const allChecked: string[] = [];
      container.querySelectorAll<HTMLInputElement>('#checklist-items input[type="checkbox"]').forEach((c) => {
        if (c.checked) allChecked.push(c.dataset['id'] ?? '');
        const span = c.parentElement?.querySelector('span');
        if (span) {
          span.style.textDecoration = c.checked ? 'line-through' : 'none';
          span.style.opacity = c.checked ? '0.6' : '1';
        }
      });
      await store.saveChecklist(weekNum, allChecked);

      const total = checkboxes.length;
      const count = allChecked.length;
      const countEl = container.querySelector('#checklist-count');
      const progressEl = container.querySelector('#checklist-progress') as HTMLElement | null;
      if (countEl) countEl.textContent = `${count}/${total}`;
      if (progressEl) progressEl.style.width = `${Math.round((count / total) * 100)}%`;
    });
  });
}

function setupQuiz(container: HTMLElement, week: WeekModule): void {
  const buttons = container.querySelectorAll<HTMLButtonElement>('.quiz-option');
  buttons.forEach((btn) => {
    btn.addEventListener('click', async () => {
      const qIdx = parseInt(btn.dataset['question'] ?? '0', 10);
      const optId = btn.dataset['option'] ?? '';

      const saved = await store.getQuizAnswers(week.week);
      saved[qIdx] = optId;
      await store.saveQuizAnswers(week.week, saved);

      // Re-render to show result
      await renderModule(container, week);
    });
  });
}

function setupReflection(container: HTMLElement, weekNum: number): void {
  const textarea = container.querySelector('#reflection') as HTMLTextAreaElement;
  let saveTimeout: ReturnType<typeof setTimeout>;
  textarea.addEventListener('input', () => {
    clearTimeout(saveTimeout);
    saveTimeout = setTimeout(() => {
      store.saveReflection(weekNum, textarea.value);
    }, 500);
  });
}

function setupCompleteButton(container: HTMLElement, weekNum: number, isCompleted: boolean): void {
  const btn = container.querySelector('#complete-btn') as HTMLButtonElement;
  if (!isCompleted) {
    btn.addEventListener('click', async () => {
      await store.completeWeek(weekNum);
      btn.textContent = '\u2713 Afgerond';
      btn.disabled = true;
      btn.style.opacity = '0.5';
    });
  }
}

function formatBody(markdown: string): string {
  return markdown
    .split('\n\n')
    .map((block) => {
      const trimmed = block.trim();
      if (!trimmed) return '';

      if (trimmed.startsWith('### ')) return `<h4 style="margin:1rem 0 0.3rem;font-size:0.95rem">${inline(trimmed.slice(4))}</h4>`;
      if (trimmed.startsWith('## ')) return `<h3 style="margin:1.2rem 0 0.3rem;font-size:1.05rem">${inline(trimmed.slice(3))}</h3>`;
      if (trimmed.startsWith('# ')) return `<h2 style="margin:1.2rem 0 0.3rem">${inline(trimmed.slice(2))}</h2>`;

      if (trimmed.match(/^[-*] /m)) {
        const items = trimmed.split('\n')
          .filter((l) => l.match(/^[-*] /))
          .map((l) => `<li>${inline(l.replace(/^[-*] /, ''))}</li>`)
          .join('');
        return `<ul style="margin:0.5rem 0;padding-left:1.2rem;font-size:0.9rem;line-height:1.6;opacity:0.85">${items}</ul>`;
      }

      if (trimmed.match(/^\d+\. /m)) {
        const items = trimmed.split('\n')
          .filter((l) => l.match(/^\d+\. /))
          .map((l) => `<li>${inline(l.replace(/^\d+\. /, ''))}</li>`)
          .join('');
        return `<ol style="margin:0.5rem 0;padding-left:1.2rem;font-size:0.9rem;line-height:1.6;opacity:0.85">${items}</ol>`;
      }

      return `<p style="margin:0.5rem 0;font-size:0.9rem;line-height:1.6;opacity:0.85">${inline(trimmed)}</p>`;
    })
    .join('');
}

function inline(text: string): string {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>');
}

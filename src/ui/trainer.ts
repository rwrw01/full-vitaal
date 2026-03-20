// src/ui/trainer.ts
import QRCode from 'qrcode';

export function buildCohortUrl(baseUrl: string, startDate: string): string {
  const base = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
  return `${base}/?start=${startDate}`;
}

export async function renderTrainer(container: HTMLElement): Promise<void> {
  const today = new Date().toISOString().split('T')[0];

  container.innerHTML = `
    <h1>Trainer Dashboard</h1>
    <p style="color:var(--color-text-muted);margin:0.5rem 0 1.5rem">
      Genereer een QR-code voor je volgende cohort.
    </p>

    <div class="section">
      <label class="label" style="display:block;margin-bottom:0.5rem">Startdatum cohort</label>
      <input type="date" id="start-input" value="${today}"
        style="width:100%;padding:0.75rem;background:var(--color-surface);color:var(--color-text);border:1px solid var(--color-border);border-radius:var(--radius);font-size:1rem">
    </div>

    <div class="section">
      <button id="generate-btn" class="btn btn--primary" style="width:100%">QR-code genereren</button>
    </div>

    <div id="qr-output" style="text-align:center;display:none">
      <canvas id="qr-canvas" style="max-width:280px;width:100%;border-radius:var(--radius)"></canvas>
      <p id="qr-url" style="font-size:0.8rem;color:var(--color-text-muted);margin-top:0.5rem;word-break:break-all"></p>
      <button id="copy-btn" class="btn btn--secondary" style="margin-top:0.5rem">Link kopiëren</button>
    </div>
  `;

  const input = container.querySelector('#start-input') as HTMLInputElement;
  const btn = container.querySelector('#generate-btn') as HTMLButtonElement;
  const output = container.querySelector('#qr-output') as HTMLElement;
  const canvas = container.querySelector('#qr-canvas') as HTMLCanvasElement;
  const urlDisplay = container.querySelector('#qr-url') as HTMLElement;
  const copyBtn = container.querySelector('#copy-btn') as HTMLButtonElement;

  btn.addEventListener('click', async () => {
    const baseUrl = window.location.origin + (import.meta.env.BASE_URL || '/');
    const url = buildCohortUrl(baseUrl, input.value);

    await QRCode.toCanvas(canvas, url, {
      width: 280,
      margin: 2,
      color: { dark: '#0f172a', light: '#ffffff' },
    });

    urlDisplay.textContent = url;
    output.style.display = 'block';
  });

  copyBtn.addEventListener('click', async () => {
    const url = urlDisplay.textContent;
    if (url) {
      await navigator.clipboard.writeText(url);
      copyBtn.textContent = '✓ Gekopieerd!';
      setTimeout(() => { copyBtn.textContent = 'Link kopiëren'; }, 2000);
    }
  });
}

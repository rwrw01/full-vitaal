// src/ui/welcome.ts
export function renderWelcome(container: HTMLElement): void {
  container.innerHTML = `
    <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:60vh;text-align:center">
      <div style="font-size:3rem;margin-bottom:1rem">\uD83C\uDF3F</div>
      <h1>Vitaal Na De Bootcamp</h1>
      <p style="color:var(--color-text-muted);margin-top:0.5rem">
        Scan de QR-code van je trainer om je programma te starten.
      </p>
    </div>
  `;
}

export function renderError(container: HTMLElement, message: string): void {
  container.innerHTML = `
    <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:60vh;text-align:center">
      <div style="font-size:3rem;margin-bottom:1rem">\u26A0\uFE0F</div>
      <h1>Oeps</h1>
      <p style="color:var(--color-text-muted);margin-top:0.5rem">${message}</p>
    </div>
  `;
}

export function renderFuture(container: HTMLElement, daysUntilStart: number): void {
  container.innerHTML = `
    <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:60vh;text-align:center">
      <div style="font-size:3rem;margin-bottom:1rem">\u231B</div>
      <h1>Nog even geduld</h1>
      <p style="color:var(--color-text-muted);margin-top:0.5rem">
        Je programma start over <strong>${daysUntilStart}</strong> ${daysUntilStart === 1 ? 'dag' : 'dagen'}.
      </p>
    </div>
  `;
}

export function renderCompleted(container: HTMLElement): void {
  container.innerHTML = `
    <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:60vh;text-align:center">
      <div style="font-size:3rem;margin-bottom:1rem">\uD83C\uDF89</div>
      <h1>Gefeliciteerd!</h1>
      <p style="color:var(--color-text-muted);margin-top:0.5rem">
        Je hebt het hele programma doorlopen. Blijf je gewoontes vasthouden!
      </p>
      <button id="export-btn" class="btn btn--secondary" style="margin-top:1rem">
        \uD83D\uDCC4 Exporteer je reflecties
      </button>
    </div>
  `;
}

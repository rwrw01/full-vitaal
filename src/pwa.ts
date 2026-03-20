/// <reference types="vite-plugin-pwa/client" />
import { registerSW } from 'virtual:pwa-register';

export function setupPWA(): void {
  const updateSW = registerSW({
    onNeedRefresh() {
      const banner = document.createElement('div');
      banner.className = 'update-banner';
      banner.innerHTML = `
        <span>Er is een update beschikbaar</span>
        <button class="btn btn--primary" style="padding:0.4rem 0.8rem;font-size:0.8rem"
          id="update-btn">Vernieuwen</button>
      `;
      document.body.appendChild(banner);

      banner.querySelector('#update-btn')?.addEventListener('click', () => {
        updateSW();
      });
    },
  });
}

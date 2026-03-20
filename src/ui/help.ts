export function renderHelp(container: HTMLElement): void {
  container.innerHTML = `
    <a href="#/trainer" class="back-link">\u2039 Terug naar trainer</a>
    <h1>Handleiding</h1>
    <p style="color:var(--color-text-muted);margin:0.5rem 0 1.5rem">
      Alles wat je moet weten over Vitaal Na De Bootcamp.
    </p>

    <div class="section">
      <h2>Hoe werkt het?</h2>
      <p style="font-size:0.9rem;line-height:1.6;opacity:0.85;margin:0.5rem 0">
        Na je bootcamp krijg je 10 weken lang elke week een nieuwe module. Elke module bevat een korte microlearning, een quiz, een checklist en een reflectievraag. Zo bouw je stap voor stap nieuwe gewoontes op.
      </p>
    </div>

    <hr style="border:none;border-top:1px solid var(--color-border);margin:1.5rem 0">

    <div class="section">
      <h2 style="color:var(--color-primary)">Voor de trainer</h2>

      <h3 style="margin-top:1rem">Cohort starten</h3>
      <ol style="padding-left:1.2rem;font-size:0.9rem;line-height:1.8">
        <li>Ga naar de <a href="#/trainer" style="color:var(--color-primary)">Trainer-pagina</a></li>
        <li>Kies de startdatum van het cohort (= eerste dag na de bootcamp)</li>
        <li>Klik op <strong>QR-code genereren</strong></li>
        <li>Toon de QR-code aan je cursisten op de laatste bootcampdag</li>
      </ol>

      <h3 style="margin-top:1rem">Tips voor de laatste bootcampdag</h3>
      <ul style="padding-left:1.2rem;font-size:0.9rem;line-height:1.8">
        <li>Neem 5 minuten om samen de app te installeren</li>
        <li>Loop de installatiestappen (hieronder) samen door</li>
        <li>Spreek een vast moment af: <em>"Elke maandag even openen"</em></li>
        <li>Laat cursisten alvast week 1 openen als test</li>
      </ul>

      <h3 style="margin-top:1rem">Goed om te weten</h3>
      <ul style="padding-left:1.2rem;font-size:0.9rem;line-height:1.8">
        <li>Dezelfde content werkt voor elk cohort — je hoeft alleen een nieuwe startdatum te kiezen</li>
        <li>Er zijn geen accounts of logins — alles draait lokaal op het toestel van de cursist</li>
        <li>Je hebt geen toegang tot reflecties van cursisten (privacy by design)</li>
        <li>Er zijn momenteel geen push-notificaties — herinner cursisten aan het wekelijkse ritme</li>
      </ul>
    </div>

    <hr style="border:none;border-top:1px solid var(--color-border);margin:1.5rem 0">

    <div class="section">
      <h2 style="color:var(--color-accent)">Voor de cursist</h2>

      <h3 style="margin-top:1rem">Stap 1: QR-code scannen</h3>
      <div style="display:flex;align-items:flex-start;gap:0.75rem;padding:1rem;background:var(--color-surface);border-radius:var(--radius);margin:0.5rem 0">
        <div style="font-size:1.5rem;flex-shrink:0">📱</div>
        <div style="font-size:0.9rem;line-height:1.6">
          Open de camera-app op je telefoon en richt hem op de QR-code die je trainer laat zien. Tik op de link die verschijnt.
        </div>
      </div>

      <h3 style="margin-top:1rem">Stap 2: App installeren op je startscherm</h3>

      <div style="margin:0.5rem 0">
        <div style="font-weight:600;font-size:0.9rem;margin-bottom:0.5rem;color:var(--color-text-muted)">iPhone (Safari):</div>
        <ol style="padding-left:1.2rem;font-size:0.9rem;line-height:1.8">
          <li>Tik op het <strong>deel-icoon</strong> (vierkantje met pijl omhoog) onderaan het scherm</li>
          <li>Scroll naar beneden en tik op <strong>"Zet op beginscherm"</strong></li>
          <li>Tik op <strong>"Voeg toe"</strong></li>
        </ol>
      </div>

      <div style="margin:0.75rem 0">
        <div style="font-weight:600;font-size:0.9rem;margin-bottom:0.5rem;color:var(--color-text-muted)">Android (Chrome):</div>
        <ol style="padding-left:1.2rem;font-size:0.9rem;line-height:1.8">
          <li>Tik op de <strong>drie puntjes</strong> (menu) rechtsboven</li>
          <li>Tik op <strong>"App installeren"</strong> of <strong>"Toevoegen aan startscherm"</strong></li>
          <li>Tik op <strong>"Installeren"</strong></li>
        </ol>
      </div>

      <div style="padding:0.75rem;background:rgba(16,185,129,0.1);border:1px solid rgba(16,185,129,0.3);border-radius:var(--radius);font-size:0.85rem;margin:0.75rem 0">
        <strong>Waarom installeren?</strong> De app werkt dan ook zonder internet en opent als een losse app (niet in de browser). Je reflecties en voortgang worden veilig op jouw telefoon bewaard.
      </div>

      <h3 style="margin-top:1.5rem">Stap 3: Wekelijks openen</h3>
      <div style="display:flex;align-items:flex-start;gap:0.75rem;padding:1rem;background:var(--color-surface);border-radius:var(--radius);margin:0.5rem 0">
        <div style="font-size:1.5rem;flex-shrink:0">📅</div>
        <div style="font-size:0.9rem;line-height:1.6">
          <strong>Er zijn geen meldingen</strong> — kies een vast moment in de week om de app te openen. Bijvoorbeeld elke maandagochtend bij je koffie. Elke 7 dagen wordt een nieuwe module ontgrendeld.
        </div>
      </div>

      <h3 style="margin-top:1.5rem">Wat zit er in elke module?</h3>
      <div style="display:flex;flex-direction:column;gap:0.5rem;margin:0.5rem 0">
        <div style="display:flex;align-items:center;gap:0.75rem;padding:0.6rem 0.75rem;background:var(--color-surface);border-radius:var(--radius)">
          <div style="font-size:1.2rem;flex-shrink:0">📖</div>
          <div>
            <div style="font-weight:600;font-size:0.9rem">Microlearning</div>
            <div style="font-size:0.8rem;color:var(--color-text-muted)">Kort stukje kennis — 2 minuten leestijd</div>
          </div>
        </div>
        <div style="display:flex;align-items:center;gap:0.75rem;padding:0.6rem 0.75rem;background:var(--color-surface);border-radius:var(--radius)">
          <div style="font-size:1.2rem;flex-shrink:0">✅</div>
          <div>
            <div style="font-weight:600;font-size:0.9rem">Checklist</div>
            <div style="font-size:0.8rem;color:var(--color-text-muted)">Dagelijkse actiepunten om af te vinken</div>
          </div>
        </div>
        <div style="display:flex;align-items:center;gap:0.75rem;padding:0.6rem 0.75rem;background:var(--color-surface);border-radius:var(--radius)">
          <div style="font-size:1.2rem;flex-shrink:0">🧠</div>
          <div>
            <div style="font-weight:600;font-size:0.9rem">Quiz</div>
            <div style="font-size:0.8rem;color:var(--color-text-muted)">Test jezelf met korte vragen</div>
          </div>
        </div>
        <div style="display:flex;align-items:center;gap:0.75rem;padding:0.6rem 0.75rem;background:var(--color-surface);border-radius:var(--radius)">
          <div style="font-size:1.2rem;flex-shrink:0">💭</div>
          <div>
            <div style="font-weight:600;font-size:0.9rem">Reflectie</div>
            <div style="font-size:0.8rem;color:var(--color-text-muted)">Schrijf op wat je opvalt — alleen voor jou</div>
          </div>
        </div>
        <div style="display:flex;align-items:center;gap:0.75rem;padding:0.6rem 0.75rem;background:var(--color-surface);border-radius:var(--radius)">
          <div style="font-size:1.2rem;flex-shrink:0">🎯</div>
          <div>
            <div style="font-weight:600;font-size:0.9rem">Challenge</div>
            <div style="font-size:0.8rem;color:var(--color-text-muted)">Eén concrete actie voor de week</div>
          </div>
        </div>
      </div>

      <h3 style="margin-top:1.5rem">Veelgestelde vragen</h3>

      <details style="margin:0.5rem 0;border:1px solid var(--color-border);border-radius:var(--radius);overflow:hidden">
        <summary style="padding:0.75rem;cursor:pointer;font-weight:500;font-size:0.9rem;background:var(--color-surface)">Kan iemand anders mijn reflecties lezen?</summary>
        <div style="padding:0.75rem;font-size:0.85rem;line-height:1.6">Nee. Je reflecties worden alleen op jouw telefoon opgeslagen. Niemand anders — ook je trainer niet — kan ze zien. Je kunt ze aan het einde exporteren als tekstbestand.</div>
      </details>

      <details style="margin:0.5rem 0;border:1px solid var(--color-border);border-radius:var(--radius);overflow:hidden">
        <summary style="padding:0.75rem;cursor:pointer;font-weight:500;font-size:0.9rem;background:var(--color-surface)">Werkt het zonder internet?</summary>
        <div style="padding:0.75rem;font-size:0.85rem;line-height:1.6">Ja, als je de app hebt geïnstalleerd op je startscherm. Alle content is bij het eerste bezoek al gedownload. Je reflecties en voortgang worden lokaal opgeslagen.</div>
      </details>

      <details style="margin:0.5rem 0;border:1px solid var(--color-border);border-radius:var(--radius);overflow:hidden">
        <summary style="padding:0.75rem;cursor:pointer;font-weight:500;font-size:0.9rem;background:var(--color-surface)">Ik ben mijn voortgang kwijt. Wat nu?</summary>
        <div style="padding:0.75rem;font-size:0.85rem;line-height:1.6">Dit kan gebeuren als je je browsergegevens hebt gewist. Helaas kunnen we de voortgang dan niet herstellen (er is geen server). Je kunt de QR-code opnieuw scannen en verdergaan waar je was — de weken tot nu zijn nog steeds ontgrendeld.</div>
      </details>

      <details style="margin:0.5rem 0;border:1px solid var(--color-border);border-radius:var(--radius);overflow:hidden">
        <summary style="padding:0.75rem;cursor:pointer;font-weight:500;font-size:0.9rem;background:var(--color-surface)">Krijg ik een herinnering als er een nieuwe week klaar staat?</summary>
        <div style="padding:0.75rem;font-size:0.85rem;line-height:1.6">Nee, er zijn geen push-notificaties. Kies een vast moment in de week (bijv. maandagochtend) om de app te openen. Je trainer kan je hier op de laatste bootcampdag tips over geven.</div>
      </details>

      <details style="margin:0.5rem 0;border:1px solid var(--color-border);border-radius:var(--radius);overflow:hidden">
        <summary style="padding:0.75rem;cursor:pointer;font-weight:500;font-size:0.9rem;background:var(--color-surface)">Moet ik een account aanmaken?</summary>
        <div style="padding:0.75rem;font-size:0.85rem;line-height:1.6">Nee. De app werkt zonder account, zonder login, zonder registratie. QR-code scannen en je bent klaar.</div>
      </details>
    </div>
  `;
}

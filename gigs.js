// Gedane optredens, overgenomen van songkick.com/artists/10209042-best-parts/gigography
// Nieuw optreden? Voeg bovenaan een regel toe.
const GIGS = [
  ["2026-06-10", "Café De Loge", "Gent", "BE"],
  ["2026-05-16", "Tracks & Travellers", "Knokke-Heist", "BE"],
  ["2026-04-14", "Empiria", "Genua", "IT"],
  ["2026-04-11", "Il Circo della Farfalla", "Francavilla", "IT"],
  ["2026-03-28", "Café Breda", "Roeselare", "BE"],
  ["2026-01-10", "Hnita-Jazz Club", "Heist-op-den-Berg", "BE", "met The Go Find"],
  ["2025-12-03", "Charlatan", "Gent", "BE"],
  ["2025-11-09", "De Kleine Kunst", "Gent", "BE"],
  ["2025-11-01", "De Kreun", "Kortrijk", "BE", "met Spain"],
  ["2025-10-15", "Django", "Gent", "BE"],
  ["2025-10-04", "Music Mania", "Gent", "BE"],
  ["2025-06-05", "Foli-a", "Retie", "BE"],
  ["2025-04-19", "Cantine Polvanera", "Bari", "IT"],
  ["2025-04-16", "Efesto", "Bologna", "IT"],
  ["2025-03-13", "", "Gent", "BE"],
  ["2024-12-11", "Pilar", "Brussel", "BE"],
  ["2024-06-01", "'t Kruisken", "Belsele", "BE"],
  ["2023-10-14", "Café De Afzakkerij", "Veghel", "NL"],
  ["2023-05-11", "Birg", "Gent", "BE"],
  ["2023-04-28", "De Kreun", "Kortrijk", "BE"],
  ["2023-04-20", "De Snuffel", "Brugge", "BE"],
  ["2022-10-04", "", "Gent", "BE"],
  ["2022-08-27", "", "Bergen op Zoom", "NL"],
  ["2022-07-06", "Secret Garden Sessions", "Kortemark", "BE"],
  ["2022-06-04", "Muziekodroom", "Hasselt", "BE", "met Fence, The Yummy Mouths e.a."],
  ["2022-05-25", "Café Rood Wit", "Antwerpen", "BE"],
  ["2022-04-23", "Green Vinyl", "Breda", "NL"],
].map(([date, venue, city, country, extra]) => ({ date, venue, city, country, extra }));

(function renderGigs() {
  const el = document.querySelector("#gigs");
  if (!el) return;

  const countries = new Set(GIGS.map((g) => g.country));
  const cities = new Set(GIGS.map((g) => g.city));
  document.querySelector(".live-stats").innerHTML = `
    <div><strong>${GIGS.length}</strong> concerten</div>
    <div><strong>${cities.size}</strong> steden</div>
    <div><strong>${countries.size}</strong> landen</div>`;

  const fmt = (d) => {
    const [y, m, day] = d.split("-");
    return `${day}.${m}`;
  };

  const years = [...new Set(GIGS.map((g) => g.date.slice(0, 4)))];
  el.innerHTML = years.map((y) => `
    <div class="year">
      <h3>${y}</h3>
      <ul>
        ${GIGS.filter((g) => g.date.startsWith(y)).map((g) => `
          <li>
            <time datetime="${g.date}">${fmt(g.date)}</time>
            <span class="where">
              <span class="venue">${g.venue || g.city}</span>
              ${g.extra ? `<span class="extra">${g.extra}</span>` : ""}
            </span>
            <span class="city">${g.venue ? g.city : ""}<span class="cc">${g.country}</span></span>
          </li>`).join("")}
      </ul>
    </div>`).join("");
})();

// Gedane optredens, overgenomen van songkick.com/artists/10209042-best-parts/gigography
// Nieuw optreden? Voeg bovenaan een regel toe.
const GIGS = [
  ["2026-10-24", "Vierberg", "Westouter", "BE"],
  ["2026-06-10", "Café De Loge", { nl: "Gent", en: "Ghent" }, "BE"],
  ["2026-05-16", "Tracks & Travellers", "Knokke-Heist", "BE"],
  ["2026-04-14", "Empiria", { nl: "Genua", en: "Genoa" }, "IT"],
  ["2026-04-11", "Il Circo della Farfalla", "Francavilla", "IT"],
  ["2026-03-28", "Café Breda", "Roeselare", "BE"],
  ["2026-01-10", "Hnita-Jazz Club", "Heist-op-den-Berg", "BE", { nl: "met The Go Find", en: "with The Go Find" }],
  ["2025-12-03", "Charlatan", { nl: "Gent", en: "Ghent" }, "BE"],
  ["2025-11-09", "De Kleine Kunst", { nl: "Gent", en: "Ghent" }, "BE"],
  ["2025-11-01", "De Kreun", "Kortrijk", "BE", { nl: "met Spain", en: "with Spain" }],
  ["2025-10-15", "Django", { nl: "Gent", en: "Ghent" }, "BE"],
  ["2025-10-04", "Music Mania", { nl: "Gent", en: "Ghent" }, "BE"],
  ["2025-06-05", "Foli-a", "Retie", "BE"],
  ["2025-04-19", "Cantine Polvanera", "Bari", "IT"],
  ["2025-04-16", "Efesto", "Bologna", "IT"],
  ["2025-03-13", "", { nl: "Gent", en: "Ghent" }, "BE"],
  ["2024-12-11", "Pilar", { nl: "Brussel", en: "Brussels" }, "BE"],
  ["2024-06-01", "'t Kruisken", "Belsele", "BE"],
  ["2023-10-14", "Café De Afzakkerij", "Veghel", "NL"],
  ["2023-05-11", "Birg", { nl: "Gent", en: "Ghent" }, "BE"],
  ["2023-04-28", "De Kreun", "Kortrijk", "BE"],
  ["2023-04-20", "De Snuffel", { nl: "Brugge", en: "Bruges" }, "BE"],
  ["2022-10-04", "Villa Anamma", { nl: "Gent", en: "Ghent" }, "BE"],
  ["2022-08-27", { nl: "Privé-event", en: "Private event" }, "Bergen op Zoom", "NL", { nl: "georganiseerd door The Collectors Gilze", en: "organised by The Collectors Gilze" }],
  ["2022-07-06", "Secret Garden Sessions", "Kortemark", "BE"],
  ["2022-06-04", "Muziekodroom", "Hasselt", "BE", { nl: "met Fence, The Yummy Mouths e.a.", en: "with Fence, The Yummy Mouths and others" }],
  ["2022-05-25", "Café Rood Wit", { nl: "Antwerpen", en: "Antwerp" }, "BE"],
  ["2022-04-23", "Green Vinyl", "Breda", "NL"],
].map(([date, venue, city, country, extra]) => ({ date, venue, city, country, extra }));

function renderGigs() {
  const { t, L } = I18N;
  const el = document.querySelector("#gigs");
  if (!el) return;

  const countries = new Set(GIGS.map((g) => g.country));
  const cities = new Set(GIGS.map((g) => L(g.city)));
  document.querySelector(".live-stats").innerHTML = `
    <div><strong>${GIGS.length}</strong> ${t("live.shows")}</div>
    <div><strong>${cities.size}</strong> ${t("live.cities")}</div>
    <div><strong>${countries.size}</strong> ${t("live.countries")}</div>`;

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
              <span class="venue">${L(g.venue) || L(g.city)}</span>
              ${g.extra ? `<span class="extra">${L(g.extra)}</span>` : ""}
            </span>
            <span class="city">${g.venue ? L(g.city) : ""}<span class="cc">${g.country}</span></span>
          </li>`).join("")}
      </ul>
    </div>`).join("");
}

renderGigs();
document.addEventListener("langchange", renderGigs);

// Teksten in het Nederlands en Engels.
// In de HTML wijst data-i18n="sleutel" naar een tekst hieronder.
const STRINGS = {
  nl: {
    "meta.description": "Tunnels and Mixed Feelings, de nieuwe plaat van Best Parts. Vinyl en merch.",
    "nav.record": "De plaat",
    "nav.cart": "Mandje",
    "nav.cartOpen": "Winkelmandje openen",
    "nav.lang": "Taal",
    "hero.eyebrow": "Nieuwe plaat · BP003",
    "hero.lead": "Zes nieuwe songs, gemaakt in Gent. Nu op vinyl, met merch op basis van de tekeningen uit de hoes.",
    "hero.cta": "Naar de shop",
    "hero.alt": "Hoes van Tunnels and Mixed Feelings: een rode trein rijdt door een blauwe berg die in de lucht zweeft",
    "shop.note": "Verzending in België of afhalen op een concert.",
    "shop.add": "In mandje",
    "shop.size": "Maat",
    "shop.added": "{name} zit in je mandje",
    "shop.records": "Platen",
    "shop.merch": "Merch",
    "stock.leftOf": "Nog {n} van {total}",
    "stock.left": "Nog {n} stuks",
    "stock.low": "bijna op",
    "stock.soldOut": "Uitverkocht",
    "stock.max": "Er zijn er nog maar {n}",
    "record.title": "De plaat",
    "record.credits": "Geschreven en opgenomen door Hans Gruyaert, Stijn Anseel &amp; Bertrand Lafontaine. Mix door Pieterjan Coppejans in Robot Studios, mastering door Frederik Dejongh bij Jerboa Mastering.",
    "record.alt": "Inkttekeningen uit de binnenhoes: een trein in een berg, een gitaarpedaal, boksers, een vliegtuig",
    "live.foot": 'Ons volgende optreden staat op <a href="https://www.songkick.com/artists/10209042-best-parts">Songkick</a> en <a href="https://instagram.com/bestpartsband">Instagram</a>.',
    "live.shows": "concerten",
    "live.cities": "steden",
    "live.countries": "landen",
    "cart.title": "Mandje",
    "cart.label": "Winkelmandje",
    "cart.close": "Sluiten",
    "cart.empty": "Je mandje is nog leeg.",
    "cart.subtotal": "Subtotaal",
    "cart.shipping": "Verzending België",
    "cart.free": "gratis",
    "cart.total": "Totaal",
    "cart.size": "maat",
    "cart.less": "Eén minder",
    "cart.more": "Eén meer",
    "cart.checkout": "Afrekenen",
    "cart.payNote": "Betalen met Bancontact, je bankapp of kaart.",
    "cart.demo": "Demo: betalen wordt later gekoppeld aan Stripe of Mollie.",
  },
  en: {
    "meta.description": "Tunnels and Mixed Feelings, the new record by Best Parts. Vinyl and merch.",
    "nav.record": "The record",
    "nav.cart": "Cart",
    "nav.cartOpen": "Open cart",
    "nav.lang": "Language",
    "hero.eyebrow": "New record · BP003",
    "hero.lead": "Six new songs, made in Ghent. Out now on vinyl, with merch based on the drawings from the sleeve.",
    "hero.cta": "Go to the shop",
    "hero.alt": "Cover of Tunnels and Mixed Feelings: a red train runs through a blue mountain floating in the sky",
    "shop.note": "Shipping within Belgium, or pick up at a show.",
    "shop.add": "Add to cart",
    "shop.size": "Size",
    "shop.added": "{name} added to your cart",
    "shop.records": "Records",
    "shop.merch": "Merch",
    "stock.leftOf": "{n} of {total} left",
    "stock.left": "{n} left",
    "stock.low": "almost gone",
    "stock.soldOut": "Sold out",
    "stock.max": "Only {n} available",
    "record.title": "The record",
    "record.credits": "Written and recorded by Hans Gruyaert, Stijn Anseel &amp; Bertrand Lafontaine. Mixed by Pieterjan Coppejans at Robot Studios, mastered by Frederik Dejongh at Jerboa Mastering.",
    "record.alt": "Ink drawings from the inner sleeve: a train in a mountain, a guitar pedal, boxers, a plane",
    "live.foot": 'Our next show is listed on <a href="https://www.songkick.com/artists/10209042-best-parts">Songkick</a> and <a href="https://instagram.com/bestpartsband">Instagram</a>.',
    "live.shows": "shows",
    "live.cities": "cities",
    "live.countries": "countries",
    "cart.title": "Cart",
    "cart.label": "Shopping cart",
    "cart.close": "Close",
    "cart.empty": "Your cart is empty.",
    "cart.subtotal": "Subtotal",
    "cart.shipping": "Shipping (Belgium)",
    "cart.free": "free",
    "cart.total": "Total",
    "cart.size": "size",
    "cart.less": "One less",
    "cart.more": "One more",
    "cart.checkout": "Checkout",
    "cart.payNote": "Pay with Bancontact, your banking app or card.",
    "cart.demo": "Demo: payments will be connected to Stripe or Mollie later.",
  },
};

const I18N = (() => {
  let lang;
  try { lang = localStorage.getItem("bp-lang"); } catch {}
  if (!STRINGS[lang]) lang = (navigator.language || "nl").toLowerCase().startsWith("nl") ? "nl" : "en";

  const t = (key, vars = {}) =>
    (STRINGS[lang][key] ?? key).replace(/\{(\w+)\}/g, (_, k) => vars[k] ?? "");

  // Waarde die per taal verschilt: { nl: "...", en: "..." } of gewoon een tekst
  const L = (v) => (v && typeof v === "object" ? v[lang] ?? v.nl : v);

  function apply() {
    document.documentElement.lang = lang;
    document.querySelector('meta[name="description"]').content = t("meta.description");
    document.querySelectorAll("[data-i18n]").forEach((el) => (el.innerHTML = t(el.dataset.i18n)));
    document.querySelectorAll("[data-i18n-alt]").forEach((el) => (el.alt = t(el.dataset.i18nAlt)));
    document.querySelectorAll("[data-i18n-label]").forEach((el) => el.setAttribute("aria-label", t(el.dataset.i18nLabel)));
    document.querySelectorAll(".lang button").forEach((b) => b.setAttribute("aria-pressed", b.dataset.lang === lang));
  }

  function set(next) {
    if (!STRINGS[next] || next === lang) return;
    lang = next;
    try { localStorage.setItem("bp-lang", lang); } catch {}
    apply();
    document.dispatchEvent(new Event("langchange"));
  }

  document.querySelectorAll(".lang button").forEach((b) => b.addEventListener("click", () => set(b.dataset.lang)));
  apply();

  return { t, L, set, get lang() { return lang; } };
})();

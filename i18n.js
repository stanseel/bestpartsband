// Teksten in het Nederlands en Engels.
// In de HTML wijst data-i18n="sleutel" naar een tekst hieronder.
const STRINGS = {
  nl: {
    "meta.description": "Tunnels and Mixed Feelings, de nieuwe plaat van Best Parts. Vinyl en merch.",
    "nav.record": "Listening corner",
    "nav.cart": "Mandje",
    "nav.cartOpen": "Winkelmandje openen",
    "nav.lang": "Taal",
    "hero.eyebrow": "BP003",
    "hero.lead": "Nieuwe songs, made in Gent. Op vinyl geperst, klaar om grijs te draaien. De vorige platen en ons Italiaans tour T-shirt zijn vanaf nu ook beschikbaar via de shop.",
    "hero.cta": "Naar de shop",
    "hero.alt": "Hoes van Tunnels and Mixed Feelings: een rode trein rijdt door een blauwe berg die in de lucht zweeft",
    "shop.note": "Verzending binnen België of gratis af te halen in Gent. Internationaal verzenden kan ook, de prijs hangt af van je land.",
    "shop.add": "In mandje",
    "shop.size": "Maat",
    "shop.back": "Achter",
    "shop.front": "Voor",
    "shop.zoom": "Groter bekijken",
    "shop.added": "{name} zit in je mandje",
    "stock.soldOut": "Uitverkocht",
    "stock.max": "Er zijn er nog maar {n}",
    "record.title": "Listening corner",
    "record.play": "Fragment van {title} beluisteren",
    "record.pause": "Fragment van {title} pauzeren",
    "record.previews": "Klik op een nummer voor een fragment van 45 seconden.",
    "record.credits": "Geschreven en opgenomen door Hans Gruyaert, Stijn Anseel &amp; Bertrand Lafontaine. Mix door Pieterjan Coppejans in Robot Studios, mastering door Frederik Dejongh bij Jerboa Mastering.",
    "record.alt": "Inkttekeningen uit de binnenhoes: een trein in een berg, een gitaarpedaal, boksers, een vliegtuig",
    "live.foot": 'Ons volgende optreden staat op <a href="https://www.songkick.com/artists/10209042-best-parts">Songkick</a> en <a href="https://instagram.com/bestpartsband">Instagram</a>.',
    "live.shows": "concerten",
    "live.cities": "steden",
    "live.countries": "landen",
    "booking.title": "Boek ons",
    "booking.lead": "Best Parts op je podium, festival of in je café? Laat weten waar en wanneer, dan nemen we snel contact op.",
    "booking.name": "Naam",
    "booking.email": "E-mailadres",
    "booking.when": "Datum en plaats",
    "booking.message": "Bericht",
    "booking.send": "Verstuur aanvraag",
    "booking.sending": "Bezig met versturen…",
    "booking.missing": "Vul je naam, een geldig e-mailadres en een bericht in.",
    "booking.thanks": "Bedankt! Je aanvraag is verstuurd. We laten snel iets horen.",
    "booking.error": "Versturen lukte niet. Probeer het later opnieuw of stuur ons een bericht via Instagram.",
    "cart.title": "Mandje",
    "cart.label": "Winkelmandje",
    "cart.close": "Sluiten",
    "cart.empty": "<strong>Geen plaat te bespeuren.</strong>Het is hier nog muisstil.",
    "cart.subtotal": "Subtotaal",
    "cart.shipping": "Verzending",
    "cart.delivery": "Levering",
    "cart.pickupRow": "Afhalen in Gent",
    "cart.pickupNote": "Na je bestelling spreken we via e-mail een moment af.",
    "delivery.be": "Verzending België · {price}, gratis vanaf {free}",
    "delivery.pickup": "Afhalen in Gent · gratis",
    "delivery.near": "Nederland, Luxemburg, Duitsland, Frankrijk · {price}",
    "delivery.europe": "Rest van Europa · {price}",
    "delivery.world": "Rest van de wereld · {price}",
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
    "nav.record": "Listening corner",
    "nav.cart": "Cart",
    "nav.cartOpen": "Open cart",
    "nav.lang": "Language",
    "hero.eyebrow": "BP003",
    "hero.lead": "New songs, made in Ghent. Pressed on vinyl, ready to be worn out. The earlier records and our Italy tour T-shirt are now available in the shop too.",
    "hero.cta": "Go to the shop",
    "hero.alt": "Cover of Tunnels and Mixed Feelings: a red train runs through a blue mountain floating in the sky",
    "shop.note": "Shipping within Belgium or free pickup in Ghent. We ship internationally too, the price depends on your country.",
    "shop.add": "Add to cart",
    "shop.size": "Size",
    "shop.back": "Back",
    "shop.front": "Front",
    "shop.zoom": "View larger",
    "shop.added": "{name} added to your cart",
    "stock.soldOut": "Sold out",
    "stock.max": "Only {n} available",
    "record.title": "Listening corner",
    "record.play": "Play a preview of {title}",
    "record.pause": "Pause the preview of {title}",
    "record.previews": "Click a track for a 45-second preview.",
    "record.credits": "Written and recorded by Hans Gruyaert, Stijn Anseel &amp; Bertrand Lafontaine. Mixed by Pieterjan Coppejans at Robot Studios, mastered by Frederik Dejongh at Jerboa Mastering.",
    "record.alt": "Ink drawings from the inner sleeve: a train in a mountain, a guitar pedal, boxers, a plane",
    "live.foot": 'Our next show is listed on <a href="https://www.songkick.com/artists/10209042-best-parts">Songkick</a> and <a href="https://instagram.com/bestpartsband">Instagram</a>.',
    "live.shows": "shows",
    "live.cities": "cities",
    "live.countries": "countries",
    "booking.title": "Book us",
    "booking.lead": "Best Parts on your stage, at your festival or in your bar? Tell us where and when, and we'll get back to you soon.",
    "booking.name": "Name",
    "booking.email": "Email address",
    "booking.when": "Date and place",
    "booking.message": "Message",
    "booking.send": "Send request",
    "booking.sending": "Sending…",
    "booking.missing": "Please fill in your name, a valid email address and a message.",
    "booking.thanks": "Thank you! Your request has been sent. We'll be in touch soon.",
    "booking.error": "Sending failed. Please try again later or message us on Instagram.",
    "cart.title": "Cart",
    "cart.label": "Shopping cart",
    "cart.close": "Close",
    "cart.empty": "<strong>Not a record in sight.</strong>It’s dead quiet in here.",
    "cart.subtotal": "Subtotal",
    "cart.shipping": "Shipping",
    "cart.delivery": "Delivery",
    "cart.pickupRow": "Pickup in Ghent",
    "cart.pickupNote": "After your order we'll arrange a time by email.",
    "delivery.be": "Shipping Belgium · {price}, free from {free}",
    "delivery.pickup": "Pickup in Ghent · free",
    "delivery.near": "Netherlands, Luxembourg, Germany, France · {price}",
    "delivery.europe": "Rest of Europe · {price}",
    "delivery.world": "Rest of the world · {price}",
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

// Producten. Prijzen en teksten zijn voorbeelden: pas ze hier aan.
// Teksten die per taal verschillen staan als { nl: "...", en: "..." }.
//
// Voorraad bij de platen: "stock" is hoeveel er nog zijn, "edition" hoeveel er ooit gemaakt zijn.
// De echte aantallen staan in stock.json en pas je aan via admin.html.
// De getallen hieronder zijn alleen een reserve als stock.json niet laadt.
// De site toont geen teller; bij 0 staat de plaat op uitverkocht.
const lp = (cover, alt) =>
  `<div class="lp"><div class="disc"></div><img src="${cover}" alt="${alt}"></div>`;

// Getekend T-shirt met het echte drukbestand erop: achterkant (grote print) en voorkant (logo op de borst)
const teeShape = "M232 52 L128 92 L28 222 L98 262 L152 196 C150 290 149 390 148 484 L452 484 C451 390 450 290 448 196 L502 262 L572 222 L472 92 L368 52";
const tee = (side, uid = "") => {
  const back = side === "back";
  const neck = back ? "Q300 80 232 52" : "Q300 132 232 52";
  return `<svg class="tee-view tee-${side}" viewBox="0 0 600 530" aria-hidden="true">
    <defs>
      <linearGradient id="tee-fold-${side}${uid}" x1="0" x2="1">
        <stop offset="0" stop-color="#000" stop-opacity=".07"/><stop offset=".12" stop-color="#000" stop-opacity="0"/>
        <stop offset=".88" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".07"/>
      </linearGradient>
    </defs>
    ${back ? "" : `<path d="M232 52 Q300 84 368 52 Q300 132 232 52Z" fill="#d9d2c0"/>`}
    <path d="${teeShape} ${neck}Z" fill="#f3eee2"/>
    <path d="M152 196 C150 290 149 390 148 484 L452 484 C451 390 450 290 448 196Z" fill="url(#tee-fold-${side}${uid})"/>
    <path d="M152 196 L128 92 M448 196 L472 92" stroke="#000" stroke-opacity=".08" stroke-width="2" fill="none"/>
    <path d="M38 209 L108 249 M562 209 L492 249 M149 470 L451 470" stroke="#000" stroke-opacity=".13" stroke-width="1.5" stroke-dasharray="5 4" fill="none"/>
    <path d="M368 52 ${neck}" stroke="#ebe5d6" stroke-width="7" fill="none" stroke-linecap="round"/>
    <path d="M368 52 ${neck}" stroke="#000" stroke-opacity=".1" stroke-width="1.2" fill="none" transform="translate(0 4)"/>
    ${back
      ? `<image href="img/tee-print-back.png" x="203" y="128" width="194" height="274"/>`
      : `<image href="img/tee-print-front.png" x="352" y="168" width="76" height="57"/>`}
  </svg>`;
};

const PRODUCTS = [
  {
    id: "lp-tmf",
    name: "Tunnels and Mixed Feelings",
    sub: { nl: "Gatefold Vinyl LP · 6 songs · 2026", en: "Gatefold Vinyl LP · 6 songs · 2026" },
    price: 25,
    stock: 100,
    edition: 100,
    stage: "blue",
    thumb: "img/cover-front.jpg",
    art: lp("img/cover-front.jpg", "Tunnels and Mixed Feelings"),
  },
  {
    id: "lp-montana",
    name: "Montana",
    sub: { nl: "Vinyl · 5 songs · 2024", en: "Vinyl · 5 songs · 2024" },
    price: 20,
    stock: null, // nog in te vullen
    edition: null,
    stage: "orange",
    thumb: "img/cover-montana.jpg",
    art: lp("img/cover-montana.jpg", "Montana"),
  },
  {
    id: "lp-best-parts",
    name: "Best Parts",
    sub: { nl: "Vinyl LP · 8 songs · 2022", en: "Vinyl LP · 8 songs · 2022" },
    price: 20,
    stock: null, // nog in te vullen
    edition: null,
    stage: "cream",
    thumb: "img/cover-best-parts.jpg",
    art: lp("img/cover-best-parts.jpg", "Best Parts"),
  },
  {
    id: "tee-italy",
    name: { nl: "Italy Tour T-shirt", en: "Italy Tour T-shirt" },
    sub: { nl: "Ecru · logo vooraan, grote print op de rug", en: "Off-white · logo on the front, large print on the back" },
    price: 25,
    sizes: ["S", "M", "L", "XL", "XXL"],
    stage: "red",
    thumb: "img/tee-print-back.png",
    thumbFit: true,
    views: ["back", "front", "photo"],
    alt: {
      nl: "Ecru T-shirt. Achterkant: Best Parts, een paard met mensenbenen, Balliamo piano stanotte, Italy tour twenty six. Voorkant: klein Best Parts-logo op de borst.",
      en: "Off-white T-shirt. Back: Best Parts, a horse with human legs, Balliamo piano stanotte, Italy tour twenty six. Front: small Best Parts logo on the chest.",
    },
    art: `<div class="tee">${tee("back")}${tee("front")}</div><img class="tee-photo" src="img/tee-italy.jpg" alt="" loading="lazy">`,
    zoom: `<div class="tee">${tee("back", "-zoom")}${tee("front", "-zoom")}</div><img class="tee-photo" src="img/tee-italy.jpg" alt="" loading="lazy">`,
  },
  {
    id: "tote",
    hidden: true, // voorlopig niet in de shop: zet op false om hem terug te tonen
    name: { nl: "Plane totebag", en: "Plane tote bag" },
    sub: { nl: "Natuurkleurig canvas · 38 × 42 cm", en: "Natural canvas · 38 × 42 cm" },
    price: 15,
    stage: "red",
    thumb: "img/plane.jpg",
    art: `<div class="tote">
      <svg viewBox="0 0 160 220" aria-hidden="true"><path fill="none" stroke="#e9dfc8" stroke-width="9" d="M48 70V40a32 32 0 0 1 64 0v30"/><rect x="8" y="64" width="144" height="152" fill="#e9dfc8"/></svg>
      <img class="print ink" src="img/plane.jpg" alt="Print: een vliegtuig">
    </div>`,
  },
];

// Levering: prijs per bestelling. Pas de bedragen hier aan.
// "freeFrom" = gratis verzending vanaf dit bestelbedrag (alleen België).
const DELIVERY = {
  be: { price: 8, freeFrom: 50 },
  pickup: { price: 0 },
  near: { price: 12 }, // Nederland, Luxemburg, Duitsland, Frankrijk
  europe: { price: 18 },
  world: { price: 30 },
};

const euro = (n) => "€ " + (Number.isInteger(n) ? n : n.toFixed(2).replace(".", ","));
const $ = (s) => document.querySelector(s);
const { t, L } = I18N;

// ---------- mandje (onthouden in deze browser) ----------
let cart = [];
try { cart = JSON.parse(localStorage.getItem("bp-cart")) || []; } catch {}
cart = cart.filter((l) => PRODUCTS.some((p) => p.id === l.id && !p.hidden)); // producten die niet meer bestaan weglaten
let delivery = "be";
try { delivery = localStorage.getItem("bp-delivery") || "be"; } catch {}
if (!DELIVERY[delivery]) delivery = "be";
const save = () => { try { localStorage.setItem("bp-cart", JSON.stringify(cart)); } catch {} };

const product = (id) => PRODUCTS.find((p) => p.id === id);
const hasStock = (p) => typeof p.stock === "number";
const inCart = (id) => cart.filter((l) => l.id === id).reduce((n, l) => n + l.qty, 0);
const left = (p) => (hasStock(p) ? Math.max(0, p.stock - inCart(p.id)) : Infinity);

function add(id, size) {
  const p = product(id);
  if (left(p) <= 0) return toast(p.stock === 0 ? t("stock.soldOut") : t("stock.max", { n: p.stock }));
  const key = id + (size ? "-" + size : "");
  const line = cart.find((l) => l.key === key);
  if (line) line.qty++;
  else cart.push({ key, id, size, qty: 1 });
  save();
  render();
  renderProducts();
  const c = $(".cart-count");
  c.classList.remove("bump"); void c.offsetWidth; c.classList.add("bump");
  toast(t("shop.added", { name: L(p.name) + (size ? " (" + size + ")" : "") }));
}

function changeQty(key, d) {
  const line = cart.find((l) => l.key === key);
  if (!line) return;
  if (d > 0 && left(product(line.id)) <= 0) return toast(t("stock.max", { n: product(line.id).stock }));
  line.qty += d;
  if (line.qty <= 0) cart = cart.filter((l) => l !== line);
  save();
  render();
  renderProducts();
}

// ---------- producten tonen ----------
// Geen teller op de site: alleen een vermelding als een product uitverkocht is
function stockBadge(p) {
  if (!hasStock(p) || p.stock > 0) return "";
  return `<p class="sold-out-note">${t("stock.soldOut")}</p>`;
}

const view = {}; // welke kant van het T-shirt getoond wordt

function card(p) {
  const soldOut = hasStock(p) && p.stock === 0;
  return `
    <article class="card${soldOut ? " sold-out" : ""}" data-id="${p.id}">
      <div class="stage ${p.stage}"${p.views ? ` data-view="${view[p.id] || p.views[0]}" role="img" aria-label="${L(p.alt)}"` : ""}>${p.art}${p.views ? `
        ${p.zoom ? `<button class="zoom-btn" type="button" aria-label="${t("shop.zoom")}"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5"/><path d="M15.5 15.5 21 21M10.5 7.5v6M7.5 10.5h6"/></svg></button>` : ""}
        <div class="views" role="group">${p.views.map((v) => `<button type="button" data-view="${v}" aria-pressed="${v === (view[p.id] || p.views[0])}">${t("shop." + v)}</button>`).join("")}</div>` : ""}</div>
      <div class="card-body">
        <h3>${L(p.name)}</h3>
        <p class="sub">${L(p.sub)}</p>
        <p class="price">${euro(p.price)}</p>
        ${stockBadge(p)}
        <div class="card-actions">
          ${p.sizes ? `<div class="sizes" role="group" aria-label="${t("shop.size")}">${p.sizes.map((s) => `<button type="button" aria-pressed="${s === "M"}">${s}</button>`).join("")}</div>` : ""}
          <button class="btn btn-ink add" type="button"${soldOut ? " disabled" : ""}>${soldOut ? t("stock.soldOut") : t("shop.add")}</button>
        </div>
      </div>
    </article>`;
}

function renderProducts() {
  const sizes = {};
  document.querySelectorAll(".card").forEach((c) => {
    const s = c.querySelector('.sizes [aria-pressed="true"]');
    if (s) sizes[c.dataset.id] = s.textContent;
  });

  $("#products").innerHTML = `<div class="grid">${PRODUCTS.filter((p) => !p.hidden).map(card).join("")}</div>`;

  Object.entries(sizes).forEach(([id, size]) =>
    document.querySelectorAll(`.card[data-id="${id}"] .sizes button`).forEach((b) => b.setAttribute("aria-pressed", b.textContent === size))
  );

  document.querySelectorAll(".card").forEach((card) => {
    card.querySelectorAll(".sizes button").forEach((b) =>
      b.addEventListener("click", () => {
        card.querySelectorAll(".sizes button").forEach((x) => x.setAttribute("aria-pressed", x === b));
      })
    );
    card.querySelectorAll(".views button").forEach((b) =>
      b.addEventListener("click", () => {
        view[card.dataset.id] = b.dataset.view;
        card.querySelector(".stage").dataset.view = b.dataset.view;
        card.querySelectorAll(".views button").forEach((x) => x.setAttribute("aria-pressed", x === b));
      })
    );
    if (product(card.dataset.id).zoom) {
      card.querySelector(".stage").addEventListener("click", (e) => {
        if (!e.target.closest(".views")) openZoom(product(card.dataset.id));
      });
    }
    card.querySelector(".add").addEventListener("click", () => {
      const size = card.querySelector('.sizes [aria-pressed="true"]');
      add(card.dataset.id, size && size.textContent);
    });
  });
}

// ---------- grotere weergave ----------
const zoomBox = $(".zoom");
function openZoom(p) {
  const current = view[p.id] || p.views[0];
  zoomBox.innerHTML = `
    <div class="stage ${p.stage} zoom-stage" data-view="${current}" role="img" aria-label="${L(p.alt)}">${p.zoom}
      <div class="views" role="group">${p.views.map((v) => `<button type="button" data-view="${v}" aria-pressed="${v === current}">${t("shop." + v)}</button>`).join("")}</div>
    </div>
    <button class="zoom-close" type="button" aria-label="${t("cart.close")}">×</button>`;
  zoomBox.querySelectorAll(".views button").forEach((b) =>
    b.addEventListener("click", () => {
      view[p.id] = b.dataset.view;
      zoomBox.querySelector(".stage").dataset.view = b.dataset.view;
      zoomBox.querySelectorAll(".views button").forEach((x) => x.setAttribute("aria-pressed", x === b));
    })
  );
  zoomBox.querySelector(".zoom-close").addEventListener("click", () => zoomBox.close());
  zoomBox.showModal();
}
zoomBox.addEventListener("click", (e) => e.target === zoomBox && zoomBox.close()); // klik naast het beeld sluit
zoomBox.addEventListener("close", renderProducts); // kaart toont dezelfde kant als de grote weergave

// ---------- mandje tonen ----------
function render() {
  const count = cart.reduce((n, l) => n + l.qty, 0);
  const subtotal = cart.reduce((n, l) => n + l.qty * product(l.id).price, 0);
  const d = DELIVERY[delivery];
  const shipping = subtotal === 0 || (d.freeFrom && subtotal >= d.freeFrom) ? 0 : d.price;

  $(".delivery-select").innerHTML = Object.entries(DELIVERY).map(([id, o]) =>
    `<option value="${id}"${id === delivery ? " selected" : ""}>${t("delivery." + id, { price: euro(o.price), free: euro(o.freeFrom || 0) })}</option>`).join("");
  $(".shipping-label").textContent = t(delivery === "pickup" ? "cart.pickupRow" : "cart.shipping");
  $(".pickup-note").hidden = delivery !== "pickup";

  $(".cart-count").textContent = count;
  $(".cart-empty").hidden = count > 0;
  $(".cart-foot").hidden = count === 0;
  $(".subtotal").textContent = euro(subtotal);
  $(".shipping").textContent = shipping ? euro(shipping) : t("cart.free");
  $(".grand").textContent = euro(subtotal + shipping);

  $(".cart-items").innerHTML = cart.map((l) => {
    const p = product(l.id);
    return `<li>
      <div class="thumb${p.thumbFit ? " fit" : ""}"><img src="${p.thumb}" alt=""></div>
      <div>
        <div class="name">${L(p.name)}</div>
        <div class="meta">${L(p.sub).split(" · ")[0]}${l.size ? " · " + t("cart.size") + " " + l.size : ""}</div>
        <div class="qty">
          <button type="button" data-key="${l.key}" data-d="-1" aria-label="${t("cart.less")}">−</button>
          <span>${l.qty}</span>
          <button type="button" data-key="${l.key}" data-d="1" aria-label="${t("cart.more")}">+</button>
        </div>
      </div>
      <div class="line">${euro(l.qty * p.price)}</div>
    </li>`;
  }).join("");
}

$(".cart-items").addEventListener("click", (e) => {
  const b = e.target.closest("button[data-key]");
  if (b) changeQty(b.dataset.key, Number(b.dataset.d));
});

$(".delivery-select").addEventListener("change", (e) => {
  delivery = e.target.value;
  try { localStorage.setItem("bp-delivery", delivery); } catch {}
  render();
});

// ---------- open / dicht ----------
function openCart(open) {
  $(".cart").classList.toggle("open", open);
  $(".cart").setAttribute("aria-hidden", !open);
  $(".cart").inert = !open;
  $(".scrim").hidden = !open;
  document.body.classList.toggle("cart-open", open);
  (open ? $(".cart-close") : $(".cart-btn")).focus({ preventScroll: true });
}

// Mandje blijft bereikbaar: zodra de kop uit beeld scrolt, zweeft de knop rechtsboven
if ("IntersectionObserver" in window) {
  new IntersectionObserver(([e]) => $(".cart-btn").classList.toggle("float", !e.isIntersecting)).observe($(".top"));
}
$(".cart-btn").addEventListener("click", () => openCart(true));
$(".cart-close").addEventListener("click", () => openCart(false));
$(".scrim").addEventListener("click", () => openCart(false));
document.addEventListener("keydown", (e) => e.key === "Escape" && $(".cart").classList.contains("open") && openCart(false));

// ---------- afrekenen ----------
// Demo: hier komt later de koppeling met Stripe of Mollie.
$(".checkout").addEventListener("click", () => {
  toast(t("cart.demo"));
});

let toastTimer;
function toast(msg) {
  const t = $(".toast");
  t.textContent = msg;
  t.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove("show"), 2600);
}

renderProducts();
render();
document.addEventListener("langchange", () => { renderProducts(); render(); });

// Actuele voorraad uit stock.json (bijgehouden via admin.html)
fetch("stock.json?t=" + Date.now(), { cache: "no-store" })
  .then((r) => (r.ok ? r.json() : null))
  .then((data) => {
    if (!data) return;
    PRODUCTS.forEach((p) => {
      const d = data[p.id];
      if (!d) return;
      if ("stock" in d) p.stock = d.stock;
      if ("edition" in d) p.edition = d.edition;
    });
    renderProducts();
    render();
  })
  .catch(() => {});

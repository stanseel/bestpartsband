// Producten. Prijzen en teksten zijn voorbeelden: pas ze hier aan.
// Teksten die per taal verschillen staan als { nl: "...", en: "..." }.
//
// Voorraad bij de platen: "stock" is hoeveel er nog zijn, "edition" hoeveel er ooit gemaakt zijn.
// Iets verkocht buiten de site (op een concert, via Bandcamp)? Verlaag "stock" hier.
// Zonder "stock" toont de site geen teller. Bij 0 staat de plaat op uitverkocht.
const lp = (cover, alt) =>
  `<div class="lp"><div class="disc"></div><img src="${cover}" alt="${alt}"></div>`;

const PRODUCTS = [
  {
    id: "lp-tmf",
    name: "Tunnels and Mixed Feelings",
    sub: { nl: "Vinyl LP · 6 songs · 2026", en: "Vinyl LP · 6 songs · 2026" },
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
    price: 15,
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
    sub: { nl: "Ecru, zwarte print op de rug", en: "Off-white, black print on the back" },
    price: 25,
    sizes: ["S", "M", "L", "XL", "XXL"],
    stage: "photo",
    thumb: "img/tee-italy-thumb.jpg",
    art: `<img src="img/tee-italy.jpg" alt="Achterkant van het T-shirt: Best Parts, een paard met mensenbenen, Balliamo piano stanotte, Italy tour twenty six">`,
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

const SHIPPING = 5; // verzending België per bestelling
const FREE_FROM = 50; // gratis verzending vanaf dit bedrag

const euro = (n) => "€ " + (Number.isInteger(n) ? n : n.toFixed(2).replace(".", ","));
const $ = (s) => document.querySelector(s);
const { t, L } = I18N;

// ---------- mandje (onthouden in deze browser) ----------
let cart = [];
try { cart = JSON.parse(localStorage.getItem("bp-cart")) || []; } catch {}
cart = cart.filter((l) => PRODUCTS.some((p) => p.id === l.id && !p.hidden)); // producten die niet meer bestaan weglaten
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
function stockBadge(p) {
  if (!hasStock(p)) return "";
  const pct = p.edition ? Math.round((p.stock / p.edition) * 100) : 100;
  const low = p.stock > 0 && p.stock <= 10;
  const label = p.stock === 0 ? t("stock.soldOut")
    : p.edition ? t("stock.leftOf", { n: p.stock, total: p.edition })
    : t("stock.left", { n: p.stock });
  return `<div class="stock${low ? " low" : ""}${p.stock === 0 ? " out" : ""}">
      <div class="stock-bar"><span style="width:${pct}%"></span></div>
      <span class="stock-label">${label}${low ? " · " + t("stock.low") : ""}</span>
    </div>`;
}

function card(p) {
  const soldOut = hasStock(p) && p.stock === 0;
  return `
    <article class="card${soldOut ? " sold-out" : ""}" data-id="${p.id}">
      <div class="stage ${p.stage}">${p.art}</div>
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
    card.querySelector(".add").addEventListener("click", () => {
      const size = card.querySelector('.sizes [aria-pressed="true"]');
      add(card.dataset.id, size && size.textContent);
    });
  });
}

// ---------- mandje tonen ----------
function render() {
  const count = cart.reduce((n, l) => n + l.qty, 0);
  const subtotal = cart.reduce((n, l) => n + l.qty * product(l.id).price, 0);
  const shipping = subtotal === 0 || subtotal >= FREE_FROM ? 0 : SHIPPING;

  $(".cart-count").textContent = count;
  $(".cart-empty").hidden = count > 0;
  $(".cart-foot").hidden = count === 0;
  $(".subtotal").textContent = euro(subtotal);
  $(".shipping").textContent = shipping ? euro(shipping) : t("cart.free");
  $(".grand").textContent = euro(subtotal + shipping);

  $(".cart-items").innerHTML = cart.map((l) => {
    const p = product(l.id);
    return `<li>
      <div class="thumb"><img src="${p.thumb}" alt=""></div>
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

// ---------- open / dicht ----------
function openCart(open) {
  $(".cart").classList.toggle("open", open);
  $(".cart").setAttribute("aria-hidden", !open);
  $(".scrim").hidden = !open;
}
$(".cart-btn").addEventListener("click", () => openCart(true));
$(".cart-close").addEventListener("click", () => openCart(false));
$(".scrim").addEventListener("click", () => openCart(false));
document.addEventListener("keydown", (e) => e.key === "Escape" && openCart(false));

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

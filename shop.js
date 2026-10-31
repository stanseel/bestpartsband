// Producten. Prijzen en teksten zijn voorbeelden: pas ze hier aan.
const PRODUCTS = [
  {
    id: "lp",
    name: "Tunnels and Mixed Feelings",
    sub: "Vinyl LP · 180 gram · met binnenhoes",
    price: 25,
    stage: "blue",
    thumb: "img/cover-front.jpg",
    art: `<div class="lp"><div class="disc"></div><img src="img/cover-front.jpg" alt="Vinylhoes"></div>`,
  },
  {
    id: "cd",
    name: "Tunnels and Mixed Feelings",
    sub: "CD · digipack",
    price: 15,
    stage: "blue",
    thumb: "img/cover-front.jpg",
    art: `<div class="cd"><div class="disc"></div><div class="case"><img src="img/cover-front.jpg" alt="CD-hoes"></div></div>`,
  },
  {
    id: "tee",
    name: "Boxers T-shirt",
    sub: "Rood, zwarte print · bio-katoen",
    price: 25,
    sizes: ["S", "M", "L", "XL", "XXL"],
    stage: "blue",
    thumb: "img/boxers.jpg",
    art: `<div class="tee">
      <svg viewBox="0 0 200 210" aria-hidden="true"><path fill="#e70029" d="M70 8c6 12 18 18 30 18s24-6 30-18l44 18 22 46-30 14-12-22v138H46V64L34 86 4 72l22-46z"/><path fill="none" stroke="#000" stroke-opacity=".18" stroke-width="2" d="M70 8c6 12 18 18 30 18s24-6 30-18"/></svg>
      <img class="print ink" src="img/boxers.jpg" alt="Print: twee boksers">
    </div>`,
  },
  {
    id: "tote",
    name: "Plane totebag",
    sub: "Natuurkleurig canvas · 38 × 42 cm",
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

// ---------- mandje (onthouden in deze browser) ----------
let cart = [];
try { cart = JSON.parse(localStorage.getItem("bp-cart")) || []; } catch {}
const save = () => { try { localStorage.setItem("bp-cart", JSON.stringify(cart)); } catch {} };

function add(id, size) {
  const key = id + (size ? "-" + size : "");
  const line = cart.find((l) => l.key === key);
  if (line) line.qty++;
  else cart.push({ key, id, size, qty: 1 });
  save();
  render();
  const c = $(".cart-count");
  c.classList.remove("bump"); void c.offsetWidth; c.classList.add("bump");
  const p = PRODUCTS.find((p) => p.id === id);
  toast(`${p.name}${size ? " (" + size + ")" : ""} zit in je mandje`);
}

function changeQty(key, d) {
  const line = cart.find((l) => l.key === key);
  if (!line) return;
  line.qty += d;
  if (line.qty <= 0) cart = cart.filter((l) => l !== line);
  save();
  render();
}

// ---------- producten tonen ----------
function renderProducts() {
  $("#products").innerHTML = PRODUCTS.map((p) => `
    <article class="card" data-id="${p.id}">
      <div class="stage ${p.stage}">${p.art}</div>
      <div class="card-body">
        <h3>${p.name}</h3>
        <p class="sub">${p.sub}</p>
        <p class="price">${euro(p.price)}</p>
        <div class="card-actions">
          ${p.sizes ? `<div class="sizes" role="group" aria-label="Maat">${p.sizes.map((s) => `<button type="button" aria-pressed="${s === "M"}">${s}</button>`).join("")}</div>` : ""}
          <button class="btn btn-ink add" type="button">In mandje</button>
        </div>
      </div>
    </article>`).join("");

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
  const subtotal = cart.reduce((n, l) => n + l.qty * PRODUCTS.find((p) => p.id === l.id).price, 0);
  const shipping = subtotal === 0 || subtotal >= FREE_FROM ? 0 : SHIPPING;

  $(".cart-count").textContent = count;
  $(".cart-empty").hidden = count > 0;
  $(".cart-foot").hidden = count === 0;
  $(".subtotal").textContent = euro(subtotal);
  $(".shipping").textContent = shipping ? euro(shipping) : "gratis";
  $(".grand").textContent = euro(subtotal + shipping);

  $(".cart-items").innerHTML = cart.map((l) => {
    const p = PRODUCTS.find((p) => p.id === l.id);
    return `<li>
      <div class="thumb"><img src="${p.thumb}" alt=""></div>
      <div>
        <div class="name">${p.name}</div>
        <div class="meta">${p.sub.split(" · ")[0]}${l.size ? " · maat " + l.size : ""}</div>
        <div class="qty">
          <button type="button" data-key="${l.key}" data-d="-1" aria-label="Eén minder">−</button>
          <span>${l.qty}</span>
          <button type="button" data-key="${l.key}" data-d="1" aria-label="Eén meer">+</button>
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
  toast("Demo: betalen wordt later gekoppeld aan Stripe of Mollie.");
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

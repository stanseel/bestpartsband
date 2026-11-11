// Boekingsaanvraag: het formulier wordt via FormSubmit doorgestuurd naar de band.
// De adressen staan in stukjes zodat adresverzamelaars ze niet zomaar uit de code plukken.
(() => {
  const { t } = I18N;
  const form = document.querySelector(".booking-form");
  if (!form) return;

  const at = (name, domain) => name + "@" + domain;
  const TO = at("hansgruyaert", "telenet.be"); // na activatie te vervangen door de code die FormSubmit opstuurt
  const CC = at("stijn", "stans.be");
  const status = form.querySelector(".booking-status");
  const button = form.querySelector("button");
  let state = ""; // sleutel van de melding die getoond wordt, zodat ze mee vertaalt

  const show = (key) => { state = key; status.textContent = key ? t(key) : ""; };
  document.addEventListener("langchange", () => show(state));

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (!form.checkValidity()) return show("booking.missing");
    const data = Object.fromEntries(new FormData(form));
    if (data._honey) return; // ingevuld door een robot

    button.disabled = true;
    show("booking.sending");
    try {
      const res = await fetch("https://formsubmit.co/ajax/" + TO, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          Naam: data.name,
          email: data.email,
          "Datum en plaats": data.when,
          Bericht: data.message,
          _cc: CC,
          _subject: "Boekingsaanvraag Best Parts: " + data.name,
          _template: "table",
          _captcha: "false",
        }),
      });
      const out = await res.json();
      if (!res.ok || String(out.success) !== "true") throw new Error(out.message || res.status);
      form.classList.add("sent");
      show("booking.thanks");
    } catch (err) {
      button.disabled = false;
      show("booking.error");
    }
  });
})();

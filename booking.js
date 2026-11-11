// Boekingsaanvraag: het formulier wordt via Web3Forms doorgestuurd naar de mailbox van de band.
// De sleutel hieronder mag openbaar zijn; er staat geen e-mailadres in de code.
(() => {
  const { t } = I18N;
  const form = document.querySelector(".booking-form");
  if (!form) return;

  const ACCESS_KEY = "214bb089-49a6-48bf-bbab-867059800293";
  const status = form.querySelector(".booking-status");
  const button = form.querySelector("button");
  let state = ""; // sleutel van de melding die getoond wordt, zodat ze mee vertaalt

  const show = (key) => { state = key; status.textContent = key ? t(key) : ""; };
  document.addEventListener("langchange", () => show(state));

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (!form.checkValidity()) return show("booking.missing");
    const data = Object.fromEntries(new FormData(form));
    if (data.botcheck) return; // ingevuld door een robot

    button.disabled = true;
    show("booking.sending");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: ACCESS_KEY,
          subject: "Boekingsaanvraag Best Parts: " + data.name,
          from_name: "Best Parts website",
          name: data.name,
          email: data.email,
          "Datum en plaats": data.when,
          message: data.message,
        }),
      });
      const out = await res.json();
      if (!res.ok || !out.success) throw new Error(out.message || res.status);
      form.classList.add("sent");
      show("booking.thanks");
    } catch (err) {
      button.disabled = false;
      show("booking.error");
    }
  });
})();

// De hoes in de header: klik om ze om te draaien, de muis kantelt ze lichtjes mee.
(() => {
  const sleeve = document.querySelector(".sleeve");
  if (!sleeve) return;
  const box = sleeve.querySelector(".sleeve-box");
  const hint = document.querySelector(".sleeve-hint");
  const REST = 12; // rusthoek, zodat de rode rug zichtbaar blijft
  let turns = 0, mx = 0, my = 0;

  function apply() {
    const back = turns % 2 === 1;
    // altijd in dezelfde richting verder draaien; de rug blijft naar de kijker gekeerd
    box.style.setProperty("--ry", turns * 180 + (back ? -REST : REST) + mx + "deg");
    box.style.setProperty("--rx", my + "deg");
    sleeve.setAttribute("aria-pressed", back);
  }

  sleeve.addEventListener("click", () => {
    turns++;
    sleeve.classList.remove("tilting");
    if (hint) hint.classList.add("done");
    apply();
  });

  sleeve.addEventListener("pointermove", (e) => {
    if (e.pointerType === "touch") return;
    const r = sleeve.getBoundingClientRect();
    mx = ((e.clientX - r.left) / r.width - .5) * 16;
    my = -((e.clientY - r.top) / r.height - .5) * 12;
    sleeve.classList.add("tilting");
    apply();
  });
  sleeve.addEventListener("pointerleave", () => {
    mx = my = 0;
    sleeve.classList.remove("tilting");
    apply();
  });

  apply();
})();

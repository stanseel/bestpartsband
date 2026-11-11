// Fragmenten van 45 seconden bij de tracklist. Er speelt altijd maar één nummer tegelijk.
(() => {
  const { t } = I18N;
  const audio = new Audio();
  audio.preload = "none";
  let current = null; // de <li> die speelt of gepauzeerd is

  const label = (li) => {
    const b = li.querySelector(".play");
    b.setAttribute("aria-label", t(li.classList.contains("playing") ? "record.pause" : "record.play", { title: b.dataset.title }));
  };
  const items = [...document.querySelectorAll(".tracks li")];
  const labels = () => items.forEach(label);

  function stop(li, reset) {
    li.classList.remove("playing");
    if (reset) li.style.removeProperty("--p");
    label(li);
  }

  function toggle(li) {
    const src = li.querySelector(".play").dataset.src;
    if (current === li) {
      if (audio.paused) audio.play(); else audio.pause();
      return;
    }
    if (current) stop(current, true);
    current = li;
    audio.src = src;
    audio.play();
  }

  audio.addEventListener("play", () => { current.classList.add("playing"); label(current); });
  audio.addEventListener("pause", () => current && stop(current, false));
  audio.addEventListener("ended", () => { stop(current, true); current = null; });
  audio.addEventListener("timeupdate", () => {
    if (current && audio.duration) current.style.setProperty("--p", audio.currentTime / audio.duration);
  });

  items.forEach((li) => li.addEventListener("click", () => toggle(li)));
  labels();
  document.addEventListener("langchange", labels);
})();

/* =========================
   PASSWORD ACCESS
   ========================= */

const PASSWORD = "BCIE2026";

const passwordGate = document.getElementById("passwordGate");
const passwordForm = document.getElementById("passwordForm");
const passwordInput = document.getElementById("passwordInput");
const passwordError = document.getElementById("passwordError");

const alreadyUnlocked =
  sessionStorage.getItem("transformemosUnlocked") === "true";


function unlockPresentation(){

  sessionStorage.setItem(
    "transformemosUnlocked",
    "true"
  );

  passwordGate.classList.add("unlocked");

  document.body.classList.remove("locked");

  setTimeout(() => {
    passwordGate.style.display = "none";
  }, 500);
}


if(alreadyUnlocked){

  passwordGate.style.display = "none";

}else{

  document.body.classList.add("locked");

  setTimeout(() => {
    passwordInput.focus();
  },300);

}


passwordForm.addEventListener(
  "submit",
  function(event){

    event.preventDefault();

    const enteredPassword =
      passwordInput.value.trim();


    if(enteredPassword === PASSWORD){

      passwordError.classList.remove("show");

      unlockPresentation();

    }else{

      passwordError.classList.add("show");

      passwordInput.value = "";

      passwordInput.focus();

      passwordInput.animate(
        [
          {transform:"translateX(0)"},
          {transform:"translateX(-6px)"},
          {transform:"translateX(6px)"},
          {transform:"translateX(-4px)"},
          {transform:"translateX(4px)"},
          {transform:"translateX(0)"}
        ],
        {
          duration:320
        }
      );
    }
  }
);
document.addEventListener("DOMContentLoaded", () => {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const menuToggle = document.querySelector(".menu-toggle");
  const siteMenu = document.querySelector(".site-menu");
  const menuLinks = [...document.querySelectorAll(".site-menu a")];

  if (menuToggle && siteMenu) {
    menuToggle.addEventListener("click", () => {
      const open = siteMenu.classList.toggle("open");
      menuToggle.setAttribute("aria-expanded", String(open));
    });

    menuLinks.forEach(link => {
      link.addEventListener("click", () => {
        siteMenu.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  const revealElements = document.querySelectorAll(
    ".eyebrow, .section h2, .section-intro, .challenge-panel, .info-card, .stat, .episode-card, .role-visual, .role-copy, .ecosystem-card, .xavier-copy, .xavier-photo-wrap, .closing h2, .closing p, .cta"
  );

  revealElements.forEach(el => el.classList.add("reveal"));

  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealElements.forEach(el => el.classList.add("is-visible"));
  } else {
    const revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -7% 0px" });

    revealElements.forEach(el => revealObserver.observe(el));
  }

  const sections = [...document.querySelectorAll("header[id], main section[id]")];

  const setActiveLink = id => {
    menuLinks.forEach(link => {
      link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
    });
  };

  if ("IntersectionObserver" in window) {
    const spyObserver = new IntersectionObserver(entries => {
      const visible = entries
        .filter(entry => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (visible) setActiveLink(visible.target.id);
    }, { rootMargin: "-25% 0px -60% 0px", threshold: [0.05, 0.2, 0.5] });

    sections.forEach(section => spyObserver.observe(section));
  }

  menuLinks.forEach(link => {
    link.addEventListener("click", event => {
      const selector = link.getAttribute("href");
      const target = document.querySelector(selector);
      if (!target) return;

      event.preventDefault();
      target.scrollIntoView({
        behavior: reduceMotion ? "auto" : "smooth",
        block: "start"
      });
    });
  });
});

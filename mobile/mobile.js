document.addEventListener("DOMContentLoaded", () => {
  const PASSWORD = "BCIE2026";

  const gate = document.getElementById("passwordGate");
  const form = document.getElementById("passwordForm");
  const input = document.getElementById("passwordInput");
  const error = document.getElementById("passwordError");

  document.body.classList.add("locked");

  if (input) {
    setTimeout(() => input.focus(), 250);
  }

  if (form && gate && input) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();

      if (input.value.trim() === PASSWORD) {
        if (error) error.classList.remove("show");

        document.body.classList.remove("locked");
        gate.classList.add("unlocked");

        setTimeout(() => {
          gate.style.display = "none";
        }, 450);
      } else {
        if (error) error.classList.add("show");

        input.value = "";
        input.focus();
      }
    });
  }

  const toggle = document.querySelector(".menu-toggle");
  const menu = document.querySelector(".site-menu");
  const links = [...document.querySelectorAll(".site-menu a")];

  if (toggle && menu) {
    toggle.addEventListener("click", () => {
      const open = menu.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
    });
  }

  links.forEach((link) => {
    link.addEventListener("click", (event) => {
      const selector = link.getAttribute("href");
      const target = document.querySelector(selector);

      if (!target) return;

      event.preventDefault();

      if (menu) menu.classList.remove("open");
      if (toggle) toggle.setAttribute("aria-expanded", "false");

      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    });
  });
});

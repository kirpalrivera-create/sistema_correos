(function () {
  const KEY = "nau-quejas-a11y";
  const body = document.body;
  const trigger = document.getElementById("access-trigger");
  const panel = document.getElementById("access-panel");
  const menuToggle = document.getElementById("menu-toggle");
  const menu = document.getElementById("menu-modulo");

  const prefs = {
    contrast: "high-contrast",
    textsize: "large-text",
    "readable-font": "readable-font",
    "highlight-links": "highlight-links",
    "stop-motion": "stop-motion",
  };

  function load() {
    try {
      return JSON.parse(localStorage.getItem(KEY) || "{}");
    } catch {
      return {};
    }
  }

  function save(state) {
    localStorage.setItem(KEY, JSON.stringify(state));
  }

  function apply(state) {
    Object.entries(prefs).forEach(([id, cls]) => {
      body.classList.toggle(cls, Boolean(state[id]));
      const btn = document.getElementById(id);
      if (btn) btn.setAttribute("aria-pressed", state[id] ? "true" : "false");
    });
  }

  const state = load();
  apply(state);

  if (trigger && panel) {
    trigger.addEventListener("click", () => {
      const open = panel.hasAttribute("hidden");
      panel.toggleAttribute("hidden", !open);
      trigger.setAttribute("aria-expanded", open ? "true" : "false");
      trigger.setAttribute(
        "aria-label",
        open ? "Cerrar opciones de accesibilidad" : "Abrir opciones de accesibilidad"
      );
      if (open) {
        const first = panel.querySelector("button, a");
        if (first) first.focus();
      }
    });
  }

  Object.keys(prefs).forEach((id) => {
    const btn = document.getElementById(id);
    if (!btn) return;
    btn.addEventListener("click", () => {
      state[id] = !state[id];
      save(state);
      apply(state);
    });
  });

  const reset = document.getElementById("access-reset");
  if (reset) {
    reset.addEventListener("click", () => {
      Object.keys(prefs).forEach((id) => {
        state[id] = false;
      });
      save(state);
      apply(state);
    });
  }

  if (menuToggle && menu) {
    menuToggle.addEventListener("click", () => {
      const open = menu.getAttribute("data-open") === "true";
      menu.setAttribute("data-open", open ? "false" : "true");
      menuToggle.setAttribute("aria-expanded", open ? "false" : "true");
    });
  }

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;
    if (panel && !panel.hasAttribute("hidden")) {
      panel.setAttribute("hidden", "");
      if (trigger) {
        trigger.setAttribute("aria-expanded", "false");
        trigger.focus();
      }
    }
    if (menu && menu.getAttribute("data-open") === "true") {
      menu.setAttribute("data-open", "false");
      if (menuToggle) {
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.focus();
      }
    }
  });
})();

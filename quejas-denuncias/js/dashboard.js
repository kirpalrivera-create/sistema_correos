import {
  h,
  render,
} from "https://cdn.jsdelivr.net/npm/preact@10.26.9/dist/preact.module.js";

function excerpt(text) {
  const clean = String(text || "").replace(/\s+/g, " ").trim();
  if (clean.length <= 72) return clean;
  return clean.slice(0, 72) + "…";
}

function Dashboard({ rows }) {
  return h("div", null, [
    h("div", { className: "dash-toolbar no-print" }, [
      h("p", null, rows.length + " registros"),
      h(
        "button",
        {
          type: "button",
          className: "btn btn-secondary",
          onClick: () => {
            window.NauQuejas.logout();
            window.location.href = "login.html";
          },
        },
        "Cerrar sesión"
      ),
    ]),
    h("div", { className: "panel", style: { padding: 0 } }, [
      h("table", { className: "tabla-quejas" }, [
        h("thead", null, [
          h("tr", null, [
            h("th", { scope: "col" }, "Folio"),
            h("th", { scope: "col" }, "Tipo"),
            h("th", { scope: "col" }, "Resumen"),
            h("th", { scope: "col" }, "Acciones"),
          ]),
        ]),
        h(
          "tbody",
          null,
          rows.map((row) =>
            h("tr", { key: row.folio }, [
              h("td", null, row.folio),
              h("td", null, row.tipo),
              h("td", { className: "excerpt" }, excerpt(row.queja_denuncia)),
              h("td", null, [
                h(
                  "a",
                  {
                    className: "btn btn-primary",
                    href: "queja.html?folio=" + encodeURIComponent(row.folio),
                  },
                  "Ver"
                ),
              ]),
            ])
          )
        ),
      ]),
    ]),
  ]);
}

if (!window.NauQuejas.requireSession()) {
  /* redirect */
} else {
  const mount = document.getElementById("dashboard-app");
  mount.textContent = "";
  render(h(Dashboard, { rows: window.NauQuejas.readAll() }), mount);
}

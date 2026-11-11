(function () {
  if (!window.NauQuejas.requireSession()) return;

  const params = new URLSearchParams(window.location.search);
  const folio = params.get("folio");
  const record = folio ? window.NauQuejas.find(folio) : null;
  const root = document.getElementById("queja-ficha");
  const title = document.getElementById("queja-titulo");

  if (!record) {
    title.textContent = "Queja no encontrada";
    root.innerHTML = "<p>No hay un registro con ese folio.</p>";
    return;
  }

  title.textContent = "Queja " + record.folio;
  const dl = document.createElement("dl");
  dl.className = "queja-ficha";
  const fields = [
    ["Folio", record.folio],
    ["Tipo", record.tipo],
    ["Nombre", [record.nombre, record.p_apellido, record.s_apellido].filter(Boolean).join(" ")],
    ["Teléfono", record.telefono || "—"],
    ["Correo", record.correo || "—"],
    ["Hechos", record.queja_denuncia || "—"],
  ];
  fields.forEach(([label, value]) => {
    const dt = document.createElement("dt");
    dt.textContent = label;
    const dd = document.createElement("dd");
    dd.textContent = value;
    dl.append(dt, dd);
  });
  root.replaceChildren(dl);

  const printBtn = document.getElementById("imprimir-queja");
  if (printBtn) {
    printBtn.addEventListener("click", () => window.print());
  }
})();

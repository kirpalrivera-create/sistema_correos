(function () {
  const params = new URLSearchParams(window.location.search);
  const folio = params.get("folio") || "QD-LOCAL";
  const tipo = params.get("tipo") || "Queja o denuncia";
  const folioNode = document.getElementById("folio");
  const tipoNode = document.getElementById("tipo");
  if (folioNode) folioNode.textContent = folio;
  if (tipoNode) tipoNode.textContent = tipo;
})();

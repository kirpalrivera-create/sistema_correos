(function () {
  const COLONIAS = {
    53000: ["Centro de Naucalpan", "San Rafael Chamapa"],
    53050: ["El Mirador", "San Bartolo Naucalpan", "San Francisco Cuautlalpan"],
    53100: ["Los Remedios", "Santa María Nativitas"],
    53200: ["San Mateo Nopala", "Santiago Tepatlaxco"],
    53300: ["Ciudad Satélite", "Lomas Verdes"],
    53400: ["Naucalpan Centro", "Industrial Alce Blanco"],
  };

  const form = document.querySelector("[data-quejas-form]");
  if (!form) return;

  const summary = document.getElementById("error-summary");
  const summaryList = document.getElementById("error-summary-list");
  const live = document.getElementById("form-status");
  const cp = form.querySelector("#cp");
  const colonia = form.querySelector("#colonia");

  function setColonias(code) {
    if (!colonia) return;
    const list = COLONIAS[code] || [];
    const current = colonia.value;
    colonia.innerHTML = '<option value="">Selecciona una colonia</option>';
    list.forEach((name) => {
      const opt = document.createElement("option");
      opt.value = name;
      opt.textContent = name;
      colonia.appendChild(opt);
    });
    if (list.includes(current)) colonia.value = current;
  }

  if (cp && colonia) {
    cp.addEventListener("input", () => {
      const code = cp.value.replace(/\D/g, "").slice(0, 5);
      cp.value = code;
      if (code.length === 5) setColonias(code);
    });
  }

  function fieldError(field, message) {
    field.setAttribute("aria-invalid", "true");
    const id = field.id + "-error";
    let node = document.getElementById(id);
    if (!node) {
      node = document.createElement("p");
      node.id = id;
      node.className = "field-error";
      field.insertAdjacentElement("afterend", node);
    }
    node.textContent = message;
    const described = (field.getAttribute("aria-describedby") || "")
      .split(/\s+/)
      .filter(Boolean);
    if (!described.includes(id)) {
      described.push(id);
      field.setAttribute("aria-describedby", described.join(" "));
    }
    return { id: field.id, message, label: labelText(field) };
  }

  function clearField(field) {
    field.removeAttribute("aria-invalid");
    const id = field.id + "-error";
    const node = document.getElementById(id);
    if (node) node.remove();
  }

  function labelText(field) {
    const label = form.querySelector(`label[for="${field.id}"]`);
    return label ? label.textContent.replace(/\s+/g, " ").trim() : field.name;
  }

  function validate() {
    const errors = [];
    form.querySelectorAll("[aria-invalid]").forEach((el) => clearField(el));

    form.querySelectorAll("[required]").forEach((field) => {
      if (!String(field.value || "").trim()) {
        errors.push(fieldError(field, "Este campo es obligatorio."));
      }
    });

    const tel = form.querySelector("#telefono");
    if (tel && tel.value && !/^\d{10}$/.test(tel.value)) {
      errors.push(fieldError(tel, "Escribe 10 dígitos, sin espacios ni guiones."));
    }

    const mail = form.querySelector("#correo");
    if (mail && mail.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail.value)) {
      errors.push(fieldError(mail, "Escribe un correo electrónico válido."));
    }

    const curp = form.querySelector("#curpd");
    if (curp && curp.value && !/^[A-Z0-9]{18}$/i.test(curp.value)) {
      errors.push(fieldError(curp, "La CURP debe tener 18 caracteres."));
    }

    if (cp && cp.hasAttribute("required") && cp.value && !/^\d{5}$/.test(cp.value)) {
      errors.push(fieldError(cp, "El código postal debe tener 5 dígitos."));
    }

    return errors;
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const errors = validate();
    if (errors.length) {
      summary.hidden = false;
      summaryList.innerHTML = "";
      errors.forEach((err) => {
        const li = document.createElement("li");
        const a = document.createElement("a");
        a.href = "#" + err.id;
        a.textContent = err.label + ": " + err.message;
        li.appendChild(a);
        summaryList.appendChild(li);
      });
      if (live) live.textContent = "Hay " + errors.length + " errores en el formulario.";
      summary.focus();
      return;
    }

    summary.hidden = true;
    const folio = "QD-" + Date.now().toString(36).toUpperCase();
    const tipo = form.getAttribute("data-tipo") || "Queja";
    const params = new URLSearchParams({ folio, tipo });
    window.location.href = "acuse.html?" + params.toString();
  });

  const privacy = document.getElementById("aviso-privacidad");
  const openPrivacy = document.getElementById("abrir-aviso");
  const closePrivacy = document.getElementById("cerrar-aviso");
  if (openPrivacy && privacy) {
    openPrivacy.addEventListener("click", () => privacy.showModal());
  }
  if (closePrivacy && privacy) {
    closePrivacy.addEventListener("click", () => privacy.close());
  }
})();

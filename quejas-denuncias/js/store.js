(function (global) {
  const QUEJAS_KEY = "nau-quejas-registros";
  const SESSION_KEY = "nau-quejas-sesion";
  const DEMO_EMAIL = "revision@naucalpan.gob.mx";
  const DEMO_PASS = "Quejas2026";

  const SEED = [
    {
      folio: "QD-DEMO01",
      tipo: "Órgano Interno de Control",
      fecha: "2026-11-10T18:00:00.000Z",
      nombre: "Ana",
      p_apellido: "García",
      s_apellido: "López",
      telefono: "5551234567",
      correo: "ana@example.com",
      queja_denuncia:
        "No obtuve respuesta a una solicitud de información en el plazo establecido.",
    },
    {
      folio: "QD-DEMO02",
      tipo: "Asuntos internos",
      fecha: "2026-11-09T16:30:00.000Z",
      nombre: "Luis",
      p_apellido: "Hernández",
      s_apellido: "Ruiz",
      telefono: "5559876543",
      correo: "luis@example.com",
      queja_denuncia:
        "Un elemento de la Guardia Municipal actuó de forma indebida en un retén.",
    },
  ];

  function readAll() {
    try {
      const raw = localStorage.getItem(QUEJAS_KEY);
      if (!raw) {
        localStorage.setItem(QUEJAS_KEY, JSON.stringify(SEED));
        return SEED.slice();
      }
      const data = JSON.parse(raw);
      return Array.isArray(data) ? data : SEED.slice();
    } catch {
      return SEED.slice();
    }
  }

  function saveAll(list) {
    localStorage.setItem(QUEJAS_KEY, JSON.stringify(list));
  }

  function add(record) {
    const list = readAll();
    list.unshift(record);
    saveAll(list);
    return record;
  }

  function find(folio) {
    return readAll().find((item) => item.folio === folio) || null;
  }

  function login(email, password) {
    const ok =
      email.trim().toLowerCase() === DEMO_EMAIL && password === DEMO_PASS;
    if (ok) sessionStorage.setItem(SESSION_KEY, email.trim().toLowerCase());
    return ok;
  }

  function logout() {
    sessionStorage.removeItem(SESSION_KEY);
  }

  function session() {
    return sessionStorage.getItem(SESSION_KEY);
  }

  function requireSession() {
    if (!session()) {
      window.location.replace("login.html");
      return false;
    }
    return true;
  }

  global.NauQuejas = {
    DEMO_EMAIL,
    readAll,
    add,
    find,
    login,
    logout,
    session,
    requireSession,
  };
})(window);

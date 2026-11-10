(function () {
  const form = document.getElementById("login-form");
  const status = document.getElementById("login-status");
  if (!form) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const email = form.email.value;
    const password = form.password.value;
    if (window.NauQuejas.login(email, password)) {
      window.location.replace("dashboard.html");
      return;
    }
    status.hidden = false;
    status.textContent =
      "El correo o la contraseña no coinciden. Usa la cuenta de revisión de demostración.";
    status.focus();
  });
})();

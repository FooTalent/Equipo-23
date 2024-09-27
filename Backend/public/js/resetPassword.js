document.addEventListener("DOMContentLoaded", function () {
  const resetPassForm = document.getElementById("resetPassForm");

  resetPassForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const password = resetPassForm.password.value;
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");
    if (token) {
      const tokenInput = document.getElementById("token");
      tokenInput.value = token;
    } else {
      alert("Token no encontrado en la URL.");
    }

    try {
      const response = await fetch("api/users/resetPassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password, token }),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Se cambio la contraseña exitosamente");
        window.location.href = "/login";
      } else {
        alert("Ocurrio un error inesperado");
        window.location.href = "/sendEmailForgetPassword";
      }
    } catch (error) {
      console.error("Error:", error);
    }
  });
});

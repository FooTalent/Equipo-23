document.addEventListener("DOMContentLoaded", function() {
  let buttonLogout = document.getElementById("buttonLogout");

  buttonLogout.addEventListener("click", (e) => {
    e.preventDefault();
    let urlEndpoint = "/api/sessions/logout";

    fetch(urlEndpoint, { method: "GET" })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Hubo un problema al llamar al endpoint.");
        }
        return response.json();
      })
      .then((data) => {
        if (data.error) {
          alert(data.message);
        } else {
          window.location.href = "/";
        }
      })
      .catch((error) => {
        alert("Hubo un problema al cerrar sesión. Por favor, inténtalo de nuevo más tarde.");
      });
  });
});

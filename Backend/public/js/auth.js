document.addEventListener("DOMContentLoaded", async function () {
  const authLink = document.getElementById("authLink");
  const createProductLink = document.getElementById("createProductLink");
  const cartViewButton = document.getElementById("cartView");

  try {
    const response = await fetch("/api/sessions/current", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    if (response.ok) {
      const data = await response.json();
      if (data) {
        authLink.textContent = "Perfil";
        authLink.href = "/profile";
        createProductLink.style.display = "block";
        if (data.data.role === "admin") {
          cartViewButton.style.display = "none";
        } else {
          cartViewButton.style.display = "block";
        }
      }
    } else if (response.status == 401) {
      authLink.textContent = "Login";
      authLink.href = "/login";
      createProductLink.style.display = "none";
    } else {
      createProductLink.style.display = "none";
    }
  } catch (error) {
    createProductLink.style.display = "none";
  }
});

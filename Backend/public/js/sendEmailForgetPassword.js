const emailForm = document.getElementById("emailForm");

emailForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = emailForm.email.value;

  try {
    const response = await fetch("/api/users/sendEmailToResetPassword", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({email}),
    });
    const data = await response.json();
    if (response.ok) {
      alert("Se envio un correo al email ingresado. Verificalo.");
      location.reload();
    } else {
      alert("No se pudo mandar el correo.");
      location.reload();
    }
  } catch (error) {
    console.error("Error:", error);
  }
});

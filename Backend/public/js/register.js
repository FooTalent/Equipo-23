document.addEventListener("DOMContentLoaded", function () {
  const registerForm = document.getElementById("registerForm");
  const errorMessage = document.getElementById("error-message");

  const errorDictionary = {
    "First_name is required": "El nombre es requerido",
    "First_name cannot be empty": "El nombre no puede estar vacío",
    "Last_name is required": "El apellido es requerido",
    "Last_name cannot be empty": "El apellido no puede estar vacío",
    "Age is required": "La edad es requerida",
    "Age cannot be empty": "La edad no puede estar vacía",
    "Age must be greater than or equal to 18":
      "La edad debe ser mayor o igual a 18",
    "Email is required": "El correo electrónico es requerido",
    "Email cannot be empty": "El correo electrónico no puede estar vacío",
    "Password is required": "La contraseña es requerida",
    "Password cannot be empty": "La contraseña no puede estar vacía",
    "Password must be at least 6 characters long":
      "La contraseña debe tener al menos 6 caracteres",
    "First_name cannot contain numbers or special characters":
      "El nombre no puede contener números ni caracteres especiales",
    "Last_name cannot contain numbers or special characters":
      "El apellido no puede contener números ni caracteres especiales",
  };

  const translateError = (error) => {
    return errorDictionary[error] || error;
  };

  registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = {
      first_name: registerForm.first_name.value,
      last_name: registerForm.last_name.value,
      age: registerForm.age.value,
      email: registerForm.email.value,
      password: registerForm.password.value,
    };
    let urlEndpoint = "/api/sessions/register";
    try {
      const response = await fetch(urlEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log(data)
      if (response.ok) {
        window.location.href = "/userRegistrationCode";
      } else {
        let errorMsg;
        if (data.errors) {
          if (Array.isArray(data.errors)) {
            errorMsg = data.errors.map(translateError).join(", ");
          } else {
            errorMsg = translateError(data.errors);
          }
        } else {
          errorMsg = "Ocurrió un error inesperado.";
        }
        throw new Error(errorMsg);
      }
    } catch (error) {
      errorMessage.textContent = error.message;
    }
  });
});

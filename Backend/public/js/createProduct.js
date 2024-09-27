document.addEventListener("DOMContentLoaded", function () {
  const productForm = document.getElementById("productForm");
  const errorMessage = document.getElementById("error-message");

  productForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(productForm);
    try {
      const response = await fetch("/api/products", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        errorMessage.textContent = "";
        alert("Producto creado correctamente");
        location.reload();
      } else {
        const data = await response.json();

        if (data.errors && Array.isArray(data.errors)) {
          const messages = data.errors.join(", ");
          errorMessage.textContent = messages;
        } else {
          errorMessage.textContent = "Error al subir el producto";
        }
      }
    } catch (error) {
      errorMessage.textContent = "Hubo un problema al enviar el formulario. Por favor, inténtalo de nuevo más tarde.";
    }
  });
});

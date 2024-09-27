document.addEventListener("DOMContentLoaded", () => {

  // Mapa de traducción para los mensajes de error
  const errorMessages = {
    'You cannot add your own products to your cart': 'No puedes agregar tus propios productos a tu carrito',
  };


  let addToCartBtn = document.getElementById("addToCartBtn");
  if (addToCartBtn) {
    addToCartBtn.addEventListener("click", async () => {
      const productId = addToCartBtn.getAttribute("data-product-id");
      try {
        const response = await fetch("/api/cart", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Error al obtener el carrito");
        }

        const data = await response.json();
        if (data.error) {
          window.location.href = "/not-available";
        } else {
          const cartId = data.cartId;
          const urlEndpoint = `/api/carts/${cartId}/product/${productId}`;

          const responseAdd = await fetch(urlEndpoint, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({}),
          });

          const dataAdd = await responseAdd.json();
          if (!responseAdd.ok) {
            const errorMessage = dataAdd.message || "Error al agregar el producto";
            // Traduce el mensaje de error
            const translatedMessage = errorMessages[errorMessage] || errorMessage;
            throw new Error(translatedMessage);          }
          alert("Producto agregado al carrito correctamente");
        }
      } catch (error) {
        alert(
          error
        );
      }
    });
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const purchaseBtn = document.getElementById("purchaseBtn");
  if (purchaseBtn) {
    purchaseBtn.addEventListener("click", async (e) => {
      e.preventDefault();

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
        const url = `/api/carts/purchase/${data.cartId}`;
        const responsePurch = await fetch(
          url,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({}),
          }
        );

        const dataPurch = await responsePurch.json();
        if (responsePurch.ok && dataPurch.data.productosProcesados.length > 0) {
          alert("Se realizo la compra");
          location.reload();
        } else {
          throw new Error("No se pudo procesar la compra");
        }
      } catch (error) {
        alert("No se pudo procesar la compra")
      }
    });
  }
});

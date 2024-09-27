let cartButton = document.getElementById("cartView");

cartButton.addEventListener("click", async () => {
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
      window.location.href = "/login";
    } else {
      window.location.href = `/carts/${data.cartId}`;
    }
  } catch (error) {
    alert(
      "Hubo un problema al intentar acceder al carrito. Por favor, inténtalo de nuevo más tarde."
    );
  }
});

document.querySelectorAll(".increaseQuanBtn").forEach((button) => {
  button.addEventListener("click", async () => {
    const productId = button.getAttribute("data-product-id");
    let quantity = parseInt(button.getAttribute("data-quantity"), 10);
    const productDiv = button.closest(".product");
    const stock = parseInt(
      productDiv.querySelector(".stockProd").getAttribute("data-stock"),
      10
    );
    const quantityUpdate = quantity + 1;

    if (quantity < stock) {
      try {
        const cartResponse = await fetch("/api/cart", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!cartResponse.ok) {
          throw new Error("Error al obtener el carrito");
        }
        const data = await cartResponse.json();
        if (!data.error) {
          const cartId = data.cartId;
          const urlEndpoint = `/api/carts/${cartId}/product/${productId}`;
          const responseInc = await fetch(urlEndpoint, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ quantity: quantityUpdate }),
          });
          if (responseInc.ok) {
            button.setAttribute("data-quantity", quantityUpdate);
            const quantProd = productDiv.querySelector(".quantProd");
            quantProd.textContent = `Quantity: ${quantityUpdate}`;
            quantProd.setAttribute("data-quant", quantityUpdate);
            // loaded page
            location.reload();
            if (quantityUpdate === stock) {
              button.disabled = true;
            }
            const decreaseQuanBtn =
              productDiv.querySelector(".decreaseQuanBtn");
            decreaseQuanBtn.setAttribute("data-quantity", quantityUpdate);
            decreaseQuanBtn.disabled = false;
          } else {
            throw new Error("Error al actualizar la cantidad del producto");
          }
        }
      } catch (error) {
        alert(
          "Hubo un problema al intentar acceder al carrito. Por favor, inténtalo de nuevo más tarde."
        );
      }
    }
  });
});

document.querySelectorAll(".decreaseQuanBtn").forEach((button) => {
  button.addEventListener("click", async () => {
    const productId = button.getAttribute("data-product-id");
    let quantity = parseInt(button.getAttribute("data-quantity"), 10);
    if (quantity > 1) {
      const quantityUpdate = quantity - 1;
      const productDiv = button.closest(".product");
      try {
        const cartResponse = await fetch("/api/cart", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!cartResponse.ok) {
          throw new Error("Error al obtener el carrito");
        }

        const data = await cartResponse.json();
        if (!data.error) {
          const cartId = data.cartId;
          const urlEndpoint = `/api/carts/${cartId}/product/${productId}`;
          const responseDec = await fetch(urlEndpoint, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ quantity: quantityUpdate }),
          });
          if (responseDec.ok) {
            button.setAttribute("data-quantity", quantityUpdate);
            const quantProd = productDiv.querySelector(".quantProd");
            quantProd.textContent = `Quantity: ${quantityUpdate}`;
            quantProd.setAttribute("data-quant", quantityUpdate);
            // loaded page
            location.reload();
            if (quantityUpdate === 1) {
              button.disabled = true;
            }
            const increaseQuanBtn =
              productDiv.querySelector(".increaseQuanBtn");
            increaseQuanBtn.setAttribute("data-quantity", quantityUpdate);
            increaseQuanBtn.disabled = false;
          } else {
            throw new Error("Error al actualizar la cantidad del producto");
          }
        }
      } catch (error) {
        alert(
          "Hubo un problema al intentar acceder al carrito. Por favor, inténtalo de nuevo más tarde."
        );
      }
    }
  });
});

document.querySelectorAll(".deleteProdToCart").forEach((button) => {
  button.addEventListener("click", async () => {
    const productId = button.getAttribute("data-product-id");
    const productDiv = button.closest(".product");
    try {
      const cartResponse = await fetch("/api/cart", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!cartResponse.ok) {
        throw new Error("Error al obtener el carrito");
      }

      const data = await cartResponse.json();
      if (!data.error) {
        const cartId = data.cartId;
        const urlEndpoint = `/api/carts/${cartId}/product/${productId}`;
        const responseDel = await fetch(urlEndpoint, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (responseDel.ok) {
          productDiv.remove();
          location.reload();
        } else {
          throw new Error("Error al eliminar el producto del carrito");
        }
      }
    } catch (error) {
      alert(
        "Hubo un problema al intentar acceder al carrito. Por favor, inténtalo de nuevo más tarde."
      );
    }
  });
});

document.querySelectorAll(".product").forEach((productDiv) => {
  const increaseButton = productDiv.querySelector(".increaseQuanBtn");
  const decreaseButton = productDiv.querySelector(".decreaseQuanBtn");
  const quantity = parseInt(increaseButton.getAttribute("data-quantity"), 10);
  const stock = parseInt(
    productDiv.querySelector(".stockProd").getAttribute("data-stock"),
    10
  );

  if (quantity >= stock) {
    increaseButton.disabled = true;
  }

  if (quantity <= 1) {
    decreaseButton.disabled = true;
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const boton = document.getElementById("btnCalcular");

  boton.addEventListener("click", () => {
    const precios = [];
    const form = document.getElementById("formCompra");
    let total = 0;

    for (let i = 1; i <= 15; i++) {
      const precioInput = form[`precio${i}`].value.trim();

      // Si está vacío, se ignora ese producto
      if (precioInput === "") continue;

      // Validar si es número positivo (enteros o decimales)
      if (!/^\d+(\.\d+)?$/.test(precioInput)) {
        alert(` Error en el producto ${i}: solo se permiten números positivos (enteros o decimales).`);
        return;
      }

      const precio = parseFloat(precioInput);
      if (precio <= 0) {
        alert(`El precio del producto ${i} debe ser mayor que 0.`);
        return;
      }

      precios.push(precio);
      total += precio;
    }

    if (precios.length === 0) {
      alert(" Debe ingresar al menos un precio válido.");
      return;
    }

    const descuento = total * 0.15;
    const totalConDescuento = total - descuento;

    alert(`Total sin descuento: $${total.toFixed(2)}\n Total con 15% de descuento: $${totalConDescuento.toFixed(2)}`);
  });
});

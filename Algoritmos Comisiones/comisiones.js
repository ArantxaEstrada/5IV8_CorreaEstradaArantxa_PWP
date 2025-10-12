function calcularTotal() {
    s
    const primerMes = document.getElementById("mes1").value.trim();
    const segundoMes = document.getElementById("mes2").value.trim();
    const tercerMes = document.getElementById("mes3").value.trim();
    const cajaResultado = document.getElementById("resultado");

   
    const soloNumeros = /^[0-9]{1,12}(\.[0-9]+)?$/;

    if (!soloNumeros.test(primerMes)) {
        alert(" El sueldo del Mes 1 debe ser un número válido con máximo 12 dígitos.");
        return;
    }
    if (!soloNumeros.test(segundoMes)) {
        alert(" El sueldo del Mes 2 debe ser un número válido con máximo 12 dígitos.");
        return;
    }
    if (!soloNumeros.test(tercerMes)) {
        alert(" El sueldo del Mes 3 debe ser un número válido con máximo 12 dígitos.");
        return;
    }

    const mes1 = parseFloat(primerMes);
    const mes2 = parseFloat(segundoMes);
    const mes3 = parseFloat(tercerMes);


    const comision1 = mes1 * 0.10;
    const comision2 = mes2 * 0.10;
    const comision3 = mes3 * 0.10;

    const totalComisiones = comision1 + comision2 + comision3;
    const totalFinal = mes1 + mes2 + mes3 + totalComisiones;

    cajaResultado.innerHTML = `
         Total de comisiones: $${totalComisiones.toFixed(2)}<br>
         Total general (sueldos + comisiones): $${totalFinal.toFixed(2)}
    `;
}

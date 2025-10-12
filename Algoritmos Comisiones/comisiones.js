function sumarTodo() {
    const primero = mes1.value.trim();
    const segundo = mes2.value.trim();
    const tercero = mes3.value.trim();

    const reglaNumero = /^\d{1,12}(\.\d+)?$/;

    if (!primero || !segundo || !tercero) {
        alert("Debes llenar los tres sueldos.");
        return;
    }

    if (!reglaNumero.test(primero) || !reglaNumero.test(segundo) || !reglaNumero.test(tercero)) {
        alert("Solo se permiten números con decimales y máximo 12 dígitos.");
        return;
    }

    const sueldoUno = parseFloat(primero);
    const sueldoDos = parseFloat(segundo);
    const sueldoTres = parseFloat(tercero);

    const total = (sueldoUno * 1.10) + (sueldoDos * 1.10) + (sueldoTres * 1.10);

    alert(` El total con comisiones es: $${total.toFixed(2)}`);
}

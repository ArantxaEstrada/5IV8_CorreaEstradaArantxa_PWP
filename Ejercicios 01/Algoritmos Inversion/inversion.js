
const numeritos = /^[0-9]+$/; 
const longitudMaxima = 10; 
const porcentajeInteres = 0.02; 

document.addEventListener("DOMContentLoaded", function() {
    const boton = document.getElementById("calcularBtn");
    boton.addEventListener("click", calcularGanancia);
});

function calcularGanancia() {
    const capitalInput = document.getElementById("capital").value.trim();

    if (!numeritos.test(capitalInput)) {
        alert("Error: Solo se permiten números.");
        return;
    }

    if (capitalInput.length !== longitudMaxima) {
        alert("Error: Debe ingresar exactamente 10 dígitos.");
        return;
    }

    const capitalNumero = Number(capitalInput);

    const ganancia = capitalNumero * porcentajeInteres;
    const total = capitalNumero + ganancia;

    alert(`Su capital inicial: ${capitalNumero}\nGanancia del 2%: ${ganancia.toFixed(2)}\nTotal después de un mes: ${total.toFixed(2)}`);
}

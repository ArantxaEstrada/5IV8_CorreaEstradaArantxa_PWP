document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const parcial1 = parseFloat(document.getElementById('parcial1').value) || 0;
        const parcial2 = parseFloat(document.getElementById('parcial2').value) || 0;
        const parcial3 = parseFloat(document.getElementById('parcial3').value) || 0;
        const examenFinal = parseFloat(document.getElementById('examenFinal').value) || 0;
        const trabajoFinal = parseFloat(document.getElementById('trabajoFinal').value) || 0;

        const promedioParciales = (parcial1 + parcial2 + parcial3) / 3;

        const calificacionFinal = 
            (promedioParciales * 0.55) +
            (examenFinal * 0.30) +
            (trabajoFinal * 0.15);

        alert("Calificación final : " + calificacionFinal.toFixed(2));
    });
});
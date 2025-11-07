document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('formInvertir');
    const input = document.getElementById('palabras');
    const resultado = document.getElementById('resultado');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        
        const texto = input.value.trim().replace(/\s+/g, ' ');

        if (!texto) {
            resultado.textContent = "Ingresa una o más palabras.";
            resultado.style.color = "red";
            return;
        }

       
        const invertidas = texto.split(' ').reverse().join(' ');

        
        resultado.textContent = `Resultado: ${invertidas}`;
        resultado.style.color = "green";
    });
});

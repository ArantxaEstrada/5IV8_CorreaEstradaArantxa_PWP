document.addEventListener('DOMContentLoaded', () => {
    const contenedorPiezas = document.getElementById('contenedorPiezas');
    const contenedorPuzzle = document.getElementById('contenedorPuzzle');
    const mensaje = document.getElementById('mensaje');
    const botonMezclar = document.getElementById('mezclar');

    let piezas = [];

    function iniciarRompecabezas() {
        contenedorPiezas.innerHTML = '';
        contenedorPuzzle.innerHTML = '';
        mensaje.textContent = '';
        piezas = [];

        for (let i = 1; i <= 9; i++) {
            const pieza = document.createElement('img');
            pieza.src = `./img/Pokemon/${i}.jpg`;
            pieza.id = `pieza-${i}`;
            pieza.draggable = true;
            pieza.addEventListener('dragstart', e => e.dataTransfer.setData('text', e.target.id));
            piezas.push(pieza);
        }

        mezclarPiezas();
        piezas.forEach(p => contenedorPiezas.appendChild(p));

        for (let i = 1; i <= 9; i++) {
            const cuadro = document.createElement('div');
            cuadro.classList.add('cuadro');
            cuadro.addEventListener('dragover', e => e.preventDefault());
            cuadro.addEventListener('drop', soltarPieza);
            contenedorPuzzle.appendChild(cuadro);
        }
    }

    function mezclarPiezas() {
        piezas.sort(() => Math.random() - 0.5);
    }

    function soltarPieza(e) {
        e.preventDefault();
        const idPieza = e.dataTransfer.getData('text');
        const pieza = document.getElementById(idPieza);

        if (!e.target.firstChild) {
            e.target.appendChild(pieza);
            verificarGanador();
        }
    }

    function verificarGanador() {
        const cuadros = contenedorPuzzle.querySelectorAll('.cuadro');
        let completo = true;

        cuadros.forEach((cuadro, index) => {
            const pieza = cuadro.firstChild;
            if (!pieza || pieza.id !== `pieza-${index + 1}`) {
                completo = false;
            }
        });

        if (completo) {
            mensaje.textContent = '⚡ ¡Pika Pika! Has completado el rompecabezas de Pikachu ⚡';
        }
    }

    botonMezclar.addEventListener('click', iniciarRompecabezas);

    iniciarRompecabezas();
});

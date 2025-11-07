const input = document.getElementById('textoGato');
const buscarBtn = document.getElementById('buscarBtn');
const contenedor = document.getElementById('contenedorGato');
const volverBtn = document.getElementById('volverBtn');


async function mostrarGato() {
    const texto = input.value.trim();
    let url = '';

   
    if (texto === '') {
        url = 'https://cataas.com/cat?timestamp=' + new Date().getTime();
    } else {
        url = `https://cataas.com/cat/says/${encodeURIComponent(texto)}?timestamp=${new Date().getTime()}`;
    }

    contenedor.innerHTML = '<p>Cargando gato... </p>';
    volverBtn.classList.add('oculto');

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Error al cargar el gato');
        const blob = await response.blob();
        const imgURL = URL.createObjectURL(blob);

        contenedor.innerHTML = `<img src="${imgURL}" alt="Gato">`;
        volverBtn.classList.remove('oculto');
    } catch (error) {
        mostrarError();
    }
}


function mostrarError() {
    contenedor.innerHTML = `
        <p>No se encontró un gato con ese texto :c </p>
        <img src="https://cataas.com/cat/says/Error?timestamp=${new Date().getTime()}" alt="Error gato">
    `;
    volverBtn.classList.remove('oculto');
}


volverBtn.addEventListener('click', () => {
    contenedor.innerHTML = '';
    input.value = '';
    volverBtn.classList.add('oculto');
});


buscarBtn.addEventListener('click', mostrarGato);


input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') mostrarGato();
});

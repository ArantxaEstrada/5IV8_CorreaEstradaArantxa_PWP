   document.getElementById('formUnicos').addEventListener('submit', function(e) {
            e.preventDefault();
            const texto = document.getElementById('palabras').value.trim();
            if (texto.length === 0) {
                document.getElementById('resultado').textContent = "Por favor ingresa palabras.";
                return;
            }
            const palabras = texto.split(',');
            let maxUnicos = 0;
            let palabraMax = "";
            const regex = /^[A-Z]+$/;

                palabras.forEach(palabra => {
                    if (!regex.test(palabra)) return;
                    const unicos = new Set(palabra.split(''));
                    if (unicos.size > maxUnicos) {
                        maxUnicos = unicos.size;
                        palabraMax = palabra;
                    }
                });
    
                document.getElementById('resultado').textContent = palabraMax
                    ? `La palabra con más caracteres únicos es: ${palabraMax}`
                    : "No se encontró ninguna palabra válida.";
            });
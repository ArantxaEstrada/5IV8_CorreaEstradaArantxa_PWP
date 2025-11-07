 document.getElementById('formPorcentaje').addEventListener('submit', function(e) {
            e.preventDefault();
            const hombres = parseInt(document.getElementById('hombres').value) || 0;
            const mujeres = parseInt(document.getElementById('mujeres').value) || 0;
            const total = hombres + mujeres;

            if (total === 0) {
                alert("Debe ingresar al menos una persona.");
                return;
            }

            const porcentajeHombres = (hombres / total) * 100;
            const porcentajeMujeres = (mujeres / total) * 100;

            document.getElementById('porcentajeHombres').textContent = porcentajeHombres.toFixed(1) + "%";
            document.getElementById('porcentajeMujeres').textContent = porcentajeMujeres.toFixed(1) + "%";

            document.getElementById('barraHombres').style.width = porcentajeHombres + "%";
            document.getElementById('barraMujeres').style.width = porcentajeMujeres + "%";

                document.getElementById('resultado').style.display = "block";
            });
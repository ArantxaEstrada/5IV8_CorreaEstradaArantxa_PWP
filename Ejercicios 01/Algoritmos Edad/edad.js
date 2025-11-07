 document.getElementById('formEdad').addEventListener('submit', function(e) {
            e.preventDefault();
            const fechaInput = document.getElementById('fechaNacimiento').value;
            if (!fechaInput) return;

            const hoy = new Date();
            const nacimiento = new Date(fechaInput);
            let edad = hoy.getFullYear() - nacimiento.getFullYear();
            const m = hoy.getMonth() - nacimiento.getMonth();
            if (m < 0 || (m === 0 && hoy.getDate() < nacimiento.getDate())) {
                edad--;
            }

            document.getElementById('edadTexto').textContent = `Tienes ${edad} años.`;
            document.getElementById('resultado').style.display = "block";
        });
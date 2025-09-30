/*
Javascript es un lenguaje multiparadigma
Acepta la programación Funcional, Estructurada, POO, Evento
Dentro de JS, no existe el tipado de variables

Solo existen 3 tipos de variables de acuerdo al estandar ES6:
VAR, LET, CONST
*/

function validar(formulario) {
    //Quiero validar que el campo nombre acepte mas de 3 carácteres
    if (formulario.nombre.value.length < 4) {
        alert("Por favor escribe mas de tres caracteres en el campo del nombre");
        formulario.nombre.focus();
        return false;
    }

    //Validación para únicamente letras
    var checkStr = formulario.nombre.value;
    alert(checkStr);

    var abcOK = "QWERTYUIOPASDFGHJKLÑZXCVBNM" + "qwertyuiopasdfghjklñzxcvbnm";
    var allValido = true;

    //Tenemos que compara la cadena de nombre vs Abecedario
    for (var i = 0; i < checkStr.length; i++) {
        var caracteres = checkStr.charAt(i);
        for (var j = 0; j < abcOK.length; j++) {
            if (caracteres == abcOK.charAt(j)) {
                break;
            }
        }
        if (j == abcOK.length) {
            allValido = false;
            break;
        }
    }
    if (!allValido) {
        alert("Escriba únicamente letras en el campo nombre");
        formulario.nombre.focus();
        return false;
    }

        var checkStr = formulario.edad.value;
    alert(checkStr);

    var abcOK = "0123456789";
    var allValido = true;

    //Tenemos que compara la edad
    for (var i = 0; i < checkStr.length; i++) {
        var caracteres = checkStr.charAt(i);
        for (var j = 0; j < abcOK.length; j++) {
            if (caracteres == abcOK.charAt(j)) {
                break;
            }
        }
        if (j == abcOK.length) {
            allValido = false;
            break;
        }
    }
    if (!allValido) {
        alert("Escriba únicamente letras en el campo nombre");
        formulario.edad.focus();
        return false;
    }

    // Vamos a crear una función de una expresión regular para validar el correo electrónico
    //texto.texto@texto.texto
    var b = /^[^@\s]+[^@\.\s]+(\.[^@\.\s]+)+$/;
    var txt = formulario.correo.value;

    alert("Email " + (b.test(txt)? " ": "no ") + "valido")
    return b.test;
}
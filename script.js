const mensajeBienvenida = "Bienvenido";


const sustituciones = [
    { letra: /a/gi, cambio: "4" },
    { letra: /e/gi, cambio: "3" },
    { letra: /i/gi, cambio: "1" },
    { letra: /o/gi, cambio: "0" },
    { letra: /s/gi, cambio: "$" },
    { letra: /t/gi, cambio: "7" }
];

function generarContrasena() {
    let nombre = prompt("Cuál es tu nombre?");
    if (!nombre) {
        alert("Ingresar un nombre.");
        return;
    }
    
    let frase = prompt("Ingresa una frase para generar la contraseña:");
    if (!frase) {
        alert("Ingresar una frase.");
        return;
    }
    

    let contrasena = frase;
    sustituciones.forEach(({ letra, cambio }) => {
        contrasena = contrasena.replace(letra, cambio);
    });
    
    
    alert(`Tu contraseña es: ${contrasena}`);
    alert(`Adios, ${nombre}.😘`);
}

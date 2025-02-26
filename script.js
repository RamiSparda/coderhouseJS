const mensajeBienvenida = "Bienvenido";
let intentos = 3;

// Diccionario de sustituciones
const sustituciones = [
    { letra: /a/gi, cambio: "4" },
    { letra: /e/gi, cambio: "3" },
    { letra: /i/gi, cambio: "1" },
    { letra: /o/gi, cambio: "0" },
    { letra: /s/gi, cambio: "$" },
    { letra: /t/gi, cambio: "7" }
];


// Función para generar una contraseña basada en una frase
function generarContrasena() {
    let nombre = prompt("Cuál es tu nombre?");
    if (!nombre) {
        alert("Ingresa un nombre.");
        return;
    }
    
    while (intentos > 0) {
        let frase = prompt("Ingresa una frase para generar la contraseña:");
        if (!frase) {
            alert("Ingresa una frase.");
            intentos--;
            continue;
        }
        
        let contrasena = frase;
        sustituciones.forEach(({ letra, cambio }) => {
            contrasena = contrasena.replace(letra, cambio);
        });
        
        
        alert(`Tu contraseña generada es: ${contrasena}`);
        break;
    }
    
    alert(`Adios, ${nombre}. 😘`);
}


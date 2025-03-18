document.addEventListener("DOMContentLoaded", () => {
    let intentos = 3;
    const sustituciones = [
        { letra: /a/gi, cambio: "4" },
        { letra: /e/gi, cambio: "3" },
        { letra: /i/gi, cambio: "1" },
        { letra: /o/gi, cambio: "0" },
        { letra: /s/gi, cambio: "$" },
        { letra: /t/gi, cambio: "7" }
    ];

    const plataformasExtras = {
        "GitHub": "_gt",
        "Facebook": "_fb",
        "Twitter": "_tw"
    };

    const fraseInput = document.getElementById("frase");
    const plataformaSelect = document.getElementById("plataforma");
    const listaContraseñas = document.getElementById("listaContraseñas");
    const generarBtn = document.getElementById("generarBtn");
    const mensajeError = document.getElementById("mensajeError");
    const mensajeExito = document.getElementById("mensajeExito");

    cargarContraseñas();
    generarBtn.addEventListener("click", generarContraseña);

    function mostrarMensaje(mensaje, tipo) {
        const mensajeElemento = tipo === "error" ? mensajeError : mensajeExito;
        mensajeElemento.textContent = mensaje;
        mensajeElemento.style.display = "block";
        setTimeout(() => mensajeElemento.style.display = "none", 3000);
    }

    function generarContraseña() {

        let frase = fraseInput.value.trim();
        if (!frase) {
            mostrarMensaje("Por favor, ingresa una frase para generar la contraseña.", "error");
            if (--intentos === 0) generarBtn.disabled = true;
            return;
        }

        let Contraseña = sustituciones.reduce((acc, { letra, cambio }) => acc.replace(letra, cambio), frase);
        Contraseña += plataformasExtras[plataformaSelect.value] || "";

        const ContraseñaObj = { plataforma: plataformaSelect.value, Contraseña };
        guardarContraseña(ContraseñaObj);
        mostrarContraseña(ContraseñaObj);
    }

    function guardarContraseña(ContraseñaObj) {
        const contraseñas = JSON.parse(localStorage.getItem("contraseñas")) || [];
        contraseñas.push(ContraseñaObj);
        localStorage.setItem("contraseñas", JSON.stringify(contraseñas));
    }

    function cargarContraseñas() {
        listaContraseñas.innerHTML = "";
        const contraseñas = JSON.parse(localStorage.getItem("contraseñas")) || [];
        contraseñas.forEach(mostrarContraseña);
    }

    function mostrarContraseña({ plataforma, Contraseña }) {
        const li = document.createElement("li");
        li.textContent = `Plataforma: ${plataforma} - ${Contraseña} `;

        const copyBtn = document.createElement("button");
        copyBtn.textContent = "Copiar";
        copyBtn.addEventListener("click", () => copiarContraseña(Contraseña));

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Eliminar";
        deleteBtn.addEventListener("click", () => eliminarContraseña(plataforma, li));

        li.appendChild(copyBtn);
        li.appendChild(deleteBtn);
        listaContraseñas.appendChild(li);
    }

    function copiarContraseña(Contraseña) {
        navigator.clipboard.writeText(Contraseña)
            .then(() => mostrarMensaje("Contraseña copiada al portapapeles.", "exito"))
            .catch(() => mostrarMensaje("Error al copiar la contraseña.", "error"));
    }

    function eliminarContraseña(plataforma, elemento) {
        let contraseñas = JSON.parse(localStorage.getItem("contraseñas")) || [];
        contraseñas = contraseñas.filter(c => c.plataforma !== plataforma);
        localStorage.setItem("contraseñas", JSON.stringify(contraseñas));

        elemento.remove();
        mostrarMensaje("Contraseña eliminada.", "exito");
    }
});


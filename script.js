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
        const frase = fraseInput.value.trim();
        if (!frase) {
            mostrarMensaje("Por favor, ingresa una frase para generar la contraseña.", "error");
            if (--intentos === 0) generarBtn.disabled = true;
            return;
        }

        let contrasena = sustituciones.reduce((acc, { letra, cambio }) => acc.replace(letra, cambio), frase);
        contrasena += plataformasExtras[plataformaSelect.value] || "";

        const contrasenaObj = { plataforma: plataformaSelect.value, contrasena };
        guardarContraseña(contrasenaObj);
        mostrarContraseña(contrasenaObj);
    }

    function guardarContraseña(contrasenaObj) {
        // Guardar localmente
        const contraseñas = JSON.parse(localStorage.getItem("contraseñas")) || [];
        contraseñas.push(contrasenaObj);
        localStorage.setItem("contraseñas", JSON.stringify(contraseñas));

        fetch("https://jsonplaceholder.typicode.com/posts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(contrasenaObj)
        })
        .then(response => {
            if (!response.ok) throw new Error("Error al guardar remotamente");
            return response.json();
        })
        .then(data => {
            console.log("Contraseña enviada al servidor (simulado):", data);
        })
        .catch(error => {
            console.error("Error con fetch:", error);
            mostrarMensaje("Error al guardar en el servidor.", "error");
        });
    }

    function cargarContraseñas() {
        listaContraseñas.innerHTML = "";
        const contraseñas = JSON.parse(localStorage.getItem("contraseñas")) || [];
        contraseñas.forEach(mostrarContraseña);
    }

    function mostrarContraseña({ plataforma, contrasena }) {
        const tr = document.createElement("tr");
    
        const tdPlataforma = document.createElement("td");
        tdPlataforma.textContent = plataforma;
    
        const tdContrasena = document.createElement("td");
        tdContrasena.textContent = contrasena;
    
        const tdAcciones = document.createElement("td");
    
        const copyBtn = document.createElement("button");
        copyBtn.textContent = "Copiar";
        copyBtn.addEventListener("click", () => copiarContraseña(contrasena));
    
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Eliminar";
        deleteBtn.addEventListener("click", () => eliminarContraseña(plataforma, tr));
    
        tdAcciones.appendChild(copyBtn);
        tdAcciones.appendChild(deleteBtn);
    
        tr.appendChild(tdPlataforma);
        tr.appendChild(tdContrasena);
        tr.appendChild(tdAcciones);
    
        listaContraseñas.appendChild(tr);
    }
    
    

    function copiarContraseña(contrasena) {
        navigator.clipboard.writeText(contrasena)
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


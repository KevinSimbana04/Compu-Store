const registroForm = document.getElementById("registroForm");
const mensaje = document.getElementById("mensaje");

registroForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const nombre = document.getElementById("nombre").value.trim();
    const correo = document.getElementById("correo").value.trim();
    const contrasena = document.getElementById("contrasena").value.trim();

    // Obtener usuarios existentes desde localStorage
    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    // Crear nuevo usuario
    const nuevoUsuario = {
        id: usuarios.length ? Math.max(...usuarios.map(u => u.id)) + 1 : 1,
        nombre,
        correo,
        contrasena,
        rol: "Cliente"
    };

    // Guardar en localStorage
    usuarios.push(nuevoUsuario);
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    mensaje.textContent = "¡Registro exitoso!";
    registroForm.reset();

    // No redirigimos, la tabla leerá los datos automáticamente
});



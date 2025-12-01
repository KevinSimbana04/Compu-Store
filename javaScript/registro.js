
    // Cambiar entre Login y Registro
    function mostrarRegistro() {
    document.getElementById('loginCard').classList.add('oculto');
    document.getElementById('registroCard').classList.remove('oculto');
}

    function mostrarLogin() {
    document.getElementById('registroCard').classList.add('oculto');
    document.getElementById('loginCard').classList.remove('oculto');
}

    // Ver/Ocultar contraseña
    function verPassword(idCampo) {
    const campo = document.getElementById(idCampo);
    const icono = campo.nextElementSibling.nextElementSibling;

    if (campo.type === 'password') {
    campo.type = 'text';
    icono.textContent = '🙈';
} else {
    campo.type = 'password';
    icono.textContent = '👁️';
}
}

    // Validación de correo
    document.getElementById('regCorreo').addEventListener('blur', function(e) {
    const correo = e.target.value;
    const mensajeError = document.getElementById('errorCorreo');
    const caracteres = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (correo.length > 0 && !caracteres.test(correo)) {
    mensajeError.classList.add('mostrar');
    e.target.style.borderColor = '#ff4444';
} else {
    mensajeError.classList.remove('mostrar');
    e.target.style.borderColor = '#e0e0e0';
}
});

    // FORMULARIO DE REGISTRO
    let formRegistro = document.getElementById("formRegistro");

    formRegistro.addEventListener("submit", function (e) {
    e.preventDefault();

    const datos = {
    nombre: document.getElementById("regNombre").value,
    apellido: document.getElementById("regApellido").value,
    cedula: document.getElementById("regCedula").value,
    fechaNac: document.getElementById("regFechaNac").value,
    correo: document.getElementById("regCorreo").value,
    direccion: document.getElementById("regDireccion").value,
    usuario: document.getElementById("regUsuario").value,
    password: document.getElementById("regContraseña").value
};

    console.log("Datos Capturados: ", datos);

    // Verificar si ya existe el usuario
    const datosGuardados = JSON.parse(localStorage.getItem("datosUsuario"));

    if (datosGuardados && datosGuardados.usuario === datos.usuario) {
    alert("❌ Este usuario ya está registrado");
    return;
}

    // Animación del botón
    const boton = e.target.querySelector('.login-button');
    boton.textContent = 'Guardando...';
    boton.disabled = true;

    // Simular guardado
    setTimeout(() => {
    // Guardar en localStorage como JSON
    localStorage.setItem("datosUsuario", JSON.stringify(datos));

    alert("✅ Usuario registrado correctamente\n\n" +
    "Nombre: " + datos.nombre + " " + datos.apellido + "\n" +
    "Usuario: " + datos.usuario + "\n\n" +
    "Ya puedes iniciar sesión");

    console.log("Usuario guardado exitosamente");

    boton.textContent = 'Crear Cuenta';
    boton.disabled = false;

    formRegistro.reset();

    // Cambiar a login después de registrar
    mostrarLogin();
}, 1000);
});

    // FORMULARIO DE LOGIN
    const formLogin = document.getElementById("formLogin");

    formLogin.addEventListener("submit", function (e) {
    e.preventDefault();

    const usuarioIngresado = document.getElementById("logUsuario").value;
    const passwordIngresado = document.getElementById("logContraseña").value;

    const datosGuardados = JSON.parse(localStorage.getItem("datosUsuario"));

    if (!datosGuardados) {
    alert("❌ No hay usuarios registrados\n\nPor favor regístrate primero");
    mostrarRegistro();
    return;
}

    const boton = e.target.querySelector('.login-button');
    boton.textContent = 'Verificando...';
    boton.disabled = true;

    setTimeout(() => {
    if (usuarioIngresado === datosGuardados.usuario &&
    passwordIngresado === datosGuardados.password) {

    alert("✅ Inicio de sesión exitoso\n\n" +
    "¡Bienvenido " + datosGuardados.nombre + " " + datosGuardados.apellido + "!\n\n" +
    "Usuario: " + datosGuardados.usuario + "\n" +
    "Correo: " + datosGuardados.correo);

    console.log("Login exitoso:", datosGuardados);

    // Aquí puedes redirigir a otra página o mostrar el sistema
    window.location.href = "/pages/dashboard.html";

} else {
    alert("❌ Usuario o contraseña incorrectos");
}

    boton.textContent = 'Iniciar Sesión';
    boton.disabled = false;
}, 1000);
});

    // Efectos visuales en los inputs
    document.querySelectorAll('input').forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.style.transform = 'scale(1.02)';
    });

    input.addEventListener('blur', function() {
    this.parentElement.style.transform = 'scale(1)';
});
});



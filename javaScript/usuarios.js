const userTable = document.getElementById('userTable');

function mostrarUsuarios() {
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    userTable.innerHTML = "";

    usuarios.forEach(u => {
        userTable.innerHTML += `
            <tr>
                <td>${u.id}</td>
                <td>${u.nombre}</td>
                <td>${u.correo}</td>
                <td>${u.rol}</td>
                <td>
                    <button onclick="eliminarUsuario(${u.id})" class="btn-delete">Eliminar</button>
                </td>
            </tr>
        `;
    });
}

function eliminarUsuario(id) {
    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    usuarios = usuarios.filter(u => u.id !== id);
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    mostrarUsuarios();
}

// Inicializar tabla al cargar la página
document.addEventListener("DOMContentLoaded", mostrarUsuarios);

// Escuchar cambios en localStorage y actualizar tabla automáticamente
window.addEventListener('storage', mostrarUsuarios);


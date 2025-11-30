let productos = JSON.parse(localStorage.getItem("productos")) || [];
let ventas = JSON.parse(localStorage.getItem("ventas")) || [];

const catalogo = document.getElementById("catalogo");
const modalVenta = document.getElementById("modalVenta");
const cerrarModal = document.getElementById("cerrarModal");
const nombreProductoModal = document.getElementById("nombreProductoModal");
const precioProductoModal = document.getElementById("precioProductoModal");
const cantidadCompra = document.getElementById("cantidadCompra");
const btnRegistrarVenta = document.getElementById("btnRegistrarVenta");

let productoSeleccionado = null;

// Mostrar catalogo
function mostrarCatalogo() {
    catalogo.innerHTML = "";
    productos.forEach(p => {
        const card = document.createElement("div");
        card.className = "producto-card";
        card.innerHTML = `
            <img src="${p.imagen}" alt="${p.nombre}">
            <h3>${p.nombre}</h3>
            <p>Precio: $${parseFloat(p.precio).toFixed(2)}</p>
            <p>Stock: ${p.stock}</p>
            <button onclick="abrirModal(${p.id})" ${p.stock === 0 ? 'disabled class="agotado"' : ''}>
                ${p.stock === 0 ? 'Agotado' : 'Comprar'}
            </button>
        `;
        catalogo.appendChild(card);
    });
}

// Abrir modal
function abrirModal(id) {
    productoSeleccionado = productos.find(p => p.id === id);
    if(!productoSeleccionado) return;

    nombreProductoModal.textContent = productoSeleccionado.nombre;
    precioProductoModal.textContent = parseFloat(productoSeleccionado.precio).toFixed(2);
    cantidadCompra.value = 1; // reset cantidad
    modalVenta.classList.add('show'); // usa clase para transición
}

// Cerrar modal
cerrarModal.onclick = () => modalVenta.classList.remove('show');

// Cerrar modal al hacer click fuera del contenido
window.addEventListener('click', e => {
    if(e.target === modalVenta) modalVenta.classList.remove('show');
});

// Registrar venta
btnRegistrarVenta.onclick = () => {
    const cantidad = parseInt(cantidadCompra.value);
    if(cantidad <= 0) return alert("Ingrese una cantidad válida");
    if(cantidad > productoSeleccionado.stock) return alert("No hay suficiente stock");

    const nuevaVenta = {
        id: ventas.length > 0 ? Math.max(...ventas.map(v => v.id)) + 1 : 1,
        producto: productoSeleccionado.nombre,
        imagen: productoSeleccionado.imagen,
        precioUnitario: productoSeleccionado.precio,
        cantidad,
        total: productoSeleccionado.precio * cantidad
    };

    ventas.push(nuevaVenta);
    productoSeleccionado.stock -= cantidad;

    localStorage.setItem("ventas", JSON.stringify(ventas));
    localStorage.setItem("productos", JSON.stringify(productos));

    mostrarCatalogo();
    modalVenta.classList.remove('show');
    alert("Compra registrada exitosamente!");
}

// Inicializar
document.addEventListener("DOMContentLoaded", () => {
    productos = JSON.parse(localStorage.getItem("productos")) || [];
    ventas = JSON.parse(localStorage.getItem("ventas")) || [];
    mostrarCatalogo();
});

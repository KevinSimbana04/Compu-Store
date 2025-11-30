let productos = JSON.parse(localStorage.getItem("productos")) || [];
let ventas = JSON.parse(localStorage.getItem("ventas")) || [];

const productoVentaSelect = document.getElementById("productoVenta");
const cantidadVentaInput = document.getElementById("cantidadVenta");
const formVenta = document.getElementById("formVenta");
const tablaVentas = document.querySelector("#tablaVentas tbody");
const totalIngresosSpan = document.getElementById("totalIngresos");

// Mostrar ventas en tabla
function mostrarVentas() {
    ventas = JSON.parse(localStorage.getItem("ventas")) || [];
    tablaVentas.innerHTML = "";
    let totalIngresos = 0;

    ventas.forEach(v => {
        tablaVentas.innerHTML += `
            <tr>
                <td>${v.id}</td>
                <td>${v.producto}</td>
                <td>${v.imagen ? `<img src="${v.imagen}" width="50">` : ''}</td>
                <td>$${parseFloat(v.precioUnitario).toFixed(2)}</td>
                <td>${v.cantidad}</td>
                <td>$${parseFloat(v.total).toFixed(2)}</td>
                <td><button onclick="eliminarVenta(${v.id})">Eliminar</button></td>
            </tr>
        `;
        totalIngresos += v.total;
    });

    totalIngresosSpan.textContent = totalIngresos.toFixed(2);
}

// Eliminar venta
function eliminarVenta(id) {
    ventas = JSON.parse(localStorage.getItem("ventas")) || [];
    productos = JSON.parse(localStorage.getItem("productos")) || [];

    const venta = ventas.find(v => v.id === id);
    if(venta){
        const producto = productos.find(p => p.nombre === venta.producto);
        if(producto) producto.stock += venta.cantidad;
        localStorage.setItem("productos", JSON.stringify(productos));
    }

    ventas = ventas.filter(v => v.id !== id);
    localStorage.setItem("ventas", JSON.stringify(ventas));
    mostrarVentas();
}

// Escuchar cambios en localStorage para sincronizar con catálogo
window.addEventListener('storage', (e) => {
    if(e.key === 'ventas' || e.key === 'productos') {
        mostrarVentas();
        cargarProductosSelect(); // si usas select para registrar venta manual
    }
});

// Inicializar
document.addEventListener("DOMContentLoaded", () => {
    mostrarVentas();
    // cargarProductosSelect(); // si tienes formulario manual de ventas
});

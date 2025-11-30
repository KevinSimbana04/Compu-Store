// Gestionar Productos
let productos = JSON.parse(localStorage.getItem("productos")) || [];
let idEditar = null;

const form = document.getElementById("productForm");
const table = document.getElementById("productTable");

// Mostrar productos al cargar la página
document.addEventListener("DOMContentLoaded", mostrarProductos);

// Manejar submit del formulario
form.addEventListener("submit", function(e) {
    e.preventDefault();

    const nombre = document.getElementById("nombreProducto").value;
    const precio = document.getElementById("precioProducto").value;
    const categoria = document.getElementById("categoriaProducto").value;
    const stock = document.getElementById("stockProducto").value;
    const imagen = document.getElementById("imagenProducto").value;

    if (idEditar) {
        // Actualizar producto existente
        productos = productos.map(prod => 
            prod.id === idEditar
            ? { id: prod.id, nombre, precio, categoria, stock, imagen }
            : prod
        );
        idEditar = null;
        document.querySelector(".btn.add").textContent = "Agregar Producto";
        document.querySelector(".btn.add").style.background = "#3B82F6";
    } else {
        // Calcular ID consecutivo
        const nuevoId = productos.length > 0 
            ? Math.max(...productos.map(p => p.id)) + 1 
            : 1;

        const producto = {
            id: nuevoId,
            nombre,
            precio,
            categoria,
            stock,
            imagen
        };
        productos.push(producto);
    }

    guardarLocal();
    mostrarProductos();
    form.reset();
});

// Mostrar productos en la tabla
function mostrarProductos() {
    table.innerHTML = "";

    productos.forEach(prod => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${prod.id}</td>
            <td>${prod.nombre}</td>
            <td>$${parseFloat(prod.precio).toFixed(2)}</td>
            <td>${prod.categoria}</td>
            <td>${prod.stock}</td>
            <td>${prod.imagen ? `<img src="${prod.imagen}" alt="${prod.nombre}" width="50">` : ''}</td>
            <td>
                <button class="btn-edit" onclick="editarProducto(${prod.id})">Editar</button>
                <button class="btn-delete" onclick="eliminarProducto(${prod.id})">Eliminar</button>
            </td>
        `;
        table.appendChild(row);
    });
}

// Guardar en LocalStorage
function guardarLocal() {
    localStorage.setItem("productos", JSON.stringify(productos));
}

// Eliminar producto
function eliminarProducto(id) {
    productos = productos.filter(prod => prod.id !== id);
    guardarLocal();
    mostrarProductos();
}

// Editar producto
function editarProducto(id) {
    const prod = productos.find(p => p.id === id);

    document.getElementById("nombreProducto").value = prod.nombre;
    document.getElementById("precioProducto").value = prod.precio;
    document.getElementById("categoriaProducto").value = prod.categoria;
    document.getElementById("stockProducto").value = prod.stock;
    document.getElementById("imagenProducto").value = prod.imagen;

    idEditar = id;

    const btn = document.querySelector(".btn.add");
    btn.textContent = "Actualizar Producto";
    btn.style.background = "#10b981";
}

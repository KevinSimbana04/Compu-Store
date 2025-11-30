// ====== Total Usuarios ======
const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
const totalUsuariosElement = document.getElementById('totalUsuarios');
if (totalUsuariosElement) {
    totalUsuariosElement.textContent = usuarios.length;
}

// ====== KPI Total Ventas ======
let ventas = JSON.parse(localStorage.getItem("ventas")) || [];
const totalVentas = ventas.reduce((acc, v) => acc + parseFloat(v.total), 0);
document.getElementById("totalVentas").textContent = `$${totalVentas.toFixed(2)}`;

// ====== KPI Promedio de Ventas ======
const promedioVentas = ventas.length ? totalVentas / ventas.length : 0;
document.getElementById("promedioVentas").textContent = `$${promedioVentas.toFixed(2)}`;

// ====== Ventas Totales (line chart) ======
const ventasTotales = ventas.map(v => v.total); // array con cada venta
const ventasLabels = ventas.map((v, i) => `Venta ${i+1}`);

const ctxSales = document.getElementById('salesChart').getContext('2d');
const salesChart = new Chart(ctxSales, {
    type: 'line',
    data: {
        labels: ventasLabels,
        datasets: [{
            label: 'Ventas',
            data: ventasTotales,
            backgroundColor: 'rgba(59,130,246,0.2)',
            borderColor: 'rgba(59,130,246,1)',
            borderWidth: 2,
            fill: true,
            tension: 0.3
        }]
    },
    options: {
        responsive: true,
        plugins: { legend: { display: false } }
    }
});

// ====== Productos Vendidos (bar chart) ======
let cantidadPorProducto = {};
ventas.forEach(v => {
    cantidadPorProducto[v.producto] = (cantidadPorProducto[v.producto] || 0) + v.cantidad;
});

const labelsProductos = Object.keys(cantidadPorProducto);
const dataProductos = Object.values(cantidadPorProducto);

const ctxProducts = document.getElementById('productsChart').getContext('2d');
const productsChart = new Chart(ctxProducts, {
    type: 'bar',
    data: {
        labels: labelsProductos,
        datasets: [{
            label: 'Cantidad',
            data: dataProductos,
            backgroundColor: 'rgba(59,130,246,0.7)'
        }]
    },
    options: {
        responsive: true,
        plugins: { legend: { display: false } }
    }
});

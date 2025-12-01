const defaultProducts = [
    // Laptops
    { id: 1, nombre: "ASUS TUF A15", precio: 1299.99, categoria: "Laptop", stock: 10, imagen: "../IMAGENES/1-1.png" },
    { id: 2, nombre: "Lenovo Legion 5", precio: 1399.99, categoria: "Laptop", stock: 10, imagen: "../IMAGENES/2-2.png" },
    { id: 3, nombre: "HP Pavilion Gaming", precio: 999.99, categoria: "Laptop", stock: 10, imagen: "../IMAGENES/3-3.png" },
    { id: 4, nombre: "Dell Inspiron 15", precio: 849.99, categoria: "Laptop", stock: 10, imagen: "../IMAGENES/4-4.png" },
    // PCs
    { id: 5, nombre: "PC Gamer AMD", precio: 1099.99, categoria: "Computadoras", stock: 10, imagen: "../IMAGENES/5-5.jpg" },
    { id: 6, nombre: "PC Gamer Intel", precio: 1299.99, categoria: "Computadoras", stock: 10, imagen: "../IMAGENES/14-14.webp" },
    { id: 7, nombre: "PC Office", precio: 699.99, categoria: "Computadoras", stock: 10, imagen: "../IMAGENES/12-12.webp" },
    { id: 8, nombre: "PC Multimedia", precio: 599.99, categoria: "Computadoras", stock: 10, imagen: "/IMAGENES/13-13.webp" },
    // Accesorios
    { id: 9, nombre: "Teclado Mecánico", precio: 79.99, categoria: "Accesorios", stock: 10, imagen: "../IMAGENES/7-7.png" },
    { id: 10, nombre: "Mouse Gamer", precio: 49.99, categoria: "Accesorios", stock: 10, imagen: "../IMAGENES/9-9.png" },
    { id: 11, nombre: "Auriculares Gaming", precio: 59.99, categoria: "Accesorios", stock: 10, imagen: "../IMAGENES/8-8.png" },
    { id: 12, nombre: "Webcam HD", precio: 39.99, categoria: "Accesorios", stock: 10, imagen: "../IMAGENES/16-16.webp" },
    { id: 13, nombre: "Monitor 24\"", precio: 149.99, categoria: "Accesorios", stock: 10, imagen: "../IMAGENES/17-17.webp" },
    { id: 14, nombre: "Disco Duro SSD", precio: 119.99, categoria: "Accesorios", stock: 10, imagen: "../IMAGENES/10-10.webp" },
    { id: 15, nombre: "Memoria RAM 16GB", precio: 89.99, categoria: "Accesorios", stock: 10, imagen: "../IMAGENES/18-18.jpeg" }
];

// Comprueba si ya existen productos en Local Storage (evita sobrescribir los datos del usuario)
if (!localStorage.getItem('productos')) {
    localStorage.setItem('productos', JSON.stringify(defaultProducts));
}

// Inicializa el arreglo de ventas si no existe
if (!localStorage.getItem('ventas')) {
    localStorage.setItem('ventas', JSON.stringify([]));
}
document.addEventListener('DOMContentLoaded', () => {
    // Se usa un setTimeout para asegurar que los componentes (header y menu) 
    // cargados asíncronamente por fetch en menu.js ya estén en el DOM.
    setTimeout(() => {
        const menuToggle = document.getElementById('menuToggle');
        const menuLateral = document.querySelector('.menu-container'); 
        const body = document.body;
        const btnSalir= document.querySelector('.user-a button');

        if (menuToggle && menuLateral) {
            
            // 1. Crear o encontrar el overlay
            let overlay = document.querySelector('.menu-overlay');
            if (!overlay) {
                overlay = document.createElement('div');
                overlay.classList.add('menu-overlay');
                document.body.appendChild(overlay);
            }
            
            // 2. Función para alternar el estado del menú
            const toggleMenu = () => {
                menuLateral.classList.toggle('active');
                body.classList.toggle('menu-open');
                overlay.classList.toggle('active');
            };
            
            // 3. Asignar eventos
            menuToggle.addEventListener('click', toggleMenu);

            // Al hacer clic en el overlay, se cierra el menú
            overlay.onclick = toggleMenu;
            
            // Cerrar el menú si se hace clic en un enlace (navegación en móvil)
            menuLateral.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', () => {
                    if (menuLateral.classList.contains('active')) {
                        toggleMenu();
                    }
                });
            });
        }

        //Cofiguracion bton salir
        if (btnSalir) {
            btnSalir.addEventListener('click', () => {
                // Usando la librería SweetAlert2 en lugar de customConfirm o confirm()
                Swal.fire({
                    title: '¿Cerrar Sesión?',
                    text: '¿Estás seguro de que deseas cerrar sesión?',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#ef4444', // Rojo del tema
                    cancelButtonColor: '#cbd5e1', // Gris del tema
                    confirmButtonText: 'Sí, Salir',
                    cancelButtonText: 'Cancelar'
                }).then((result) => {
                    if (result.isConfirmed) {
                        // Si el usuario confirma, redirigir a la página de inicio o login
                        window.location.href = "/inicio.html";
                    } else {
                        // Mensaje si cancela
                        Swal.fire('Cancelado', 'Sesión no cerrada.', 'info');
                    }
                });
            });
        }
    }, 500); 
});
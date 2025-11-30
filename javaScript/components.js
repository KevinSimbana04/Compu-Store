function includeComponent(selector, filepath) {
    fetch(filepath)
        .then(res => res.text())
        .then(html => document.querySelector(selector).innerHTML = html)
        .catch(err => console.error("Error al cargar componente:", err));
}

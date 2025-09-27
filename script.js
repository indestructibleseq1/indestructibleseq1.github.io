// =======================================
// LÓGICA DE NAVEGACIÓN (MENÚ HAMBURGUESA)
// =======================================

function toggleMenu() {
    const sidebar = document.getElementById('sidebar-menu');
    const overlay = document.getElementById('overlay');
    
    // Alterna la clase 'open' para abrir o cerrar el menú y el overlay
    sidebar.classList.toggle('open');
    overlay.classList.toggle('open');
}


// =======================================
// LÓGICA DEL FORMULARIO (CHISTES Y ALERTA)
// =======================================

const chistes = [
    "¿Qué hace una abeja en el gimnasio? ¡Zum-ba!",
    "¿Cuál es el último animal que subió al arca de Noé? El del-fín.",
    "Si se muere un vampiro, ¿en qué se convierte? En un esqueleto elegante.",
    "¡Me da una de queso, por favor! Lo siento, se me ha caído el sistema.",
    "¿Qué le dice un jardinero a otro? ¡Nos vemos cuando podamos!"
];

function mostrarChiste(event) {
    // 1. Evita que el formulario se envíe y recargue la página
    event.preventDefault();

    const select = document.getElementById('integrante');
    
    // Verifica que se haya seleccionado un integrante antes de continuar
    if (select.value === "") {
        alert("Por favor, selecciona un integrante primero.");
        return;
    }
    
    const nombreSeleccionado = select.options[select.selectedIndex].text;
    
    // 2. Selecciona un chiste aleatorio
    const indiceAleatorio = Math.floor(Math.random() * chistes.length);
    const chisteSeleccionado = chistes[indiceAleatorio];

    // 3. Muestra la alerta con el nombre del integrante y el chiste
    alert(`¡Hola, ${nombreSeleccionado}!\n\nAquí va un chiste:\n"${chisteSeleccionado}"`);
}


// =======================================
// ASIGNACIÓN DE EVENTOS AL CARGAR LA PÁGINA
// =======================================

document.addEventListener('DOMContentLoaded', () => {
    // Asigna la función 'mostrarChiste' al evento 'submit' del formulario
    const form = document.querySelector('.form-body');
    if (form) {
        form.addEventListener('submit', mostrarChiste);
    }

    // Nota: El evento 'click' para toggleMenu() se sigue manejando 
    // directamente en el HTML: onclick="toggleMenu()"
});

  if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('Service Worker registrado con éxito:', registration);
            })
            .catch(function(error) {
                console.log('Fallo el registro del Service Worker:', error);
            });
        }
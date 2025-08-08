// js-cafeteria/script.js

document.addEventListener('DOMContentLoaded', function() {
    // --- 1. Funcionalidad de Menú Hamburguesa (si implementas uno) ---
    // Si tu header tendrá un botón de menú hamburguesa para móviles,
    // necesitarás elementos HTML como:
    // <button class="menu-toggle" aria-label="Abrir menú">&#9776;</button>
    // <nav id="main-nav">...</nav>
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('nav ul'); // Asumo que tu menú es la lista <ul> dentro de <nav>

    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', function() {
            mainNav.classList.toggle('active'); // Alterna la clase 'active' para mostrar/ocultar
            // Puedes añadir estilos CSS para .active en tu style.css
            // Ejemplo CSS:
            // @media (max-width: 768px) {
            //   nav ul { display: none; flex-direction: column; }
            //   nav ul.active { display: flex; }
            // }
        });

        // Opcional: Cerrar el menú al hacer clic en un enlace (para SPAs o páginas de una sección)
        mainNav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (mainNav.classList.contains('active')) {
                    mainNav.classList.remove('active');
                }
            });
        });
    }


    // --- 2. Scroll Suave para Enlaces Internos ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault(); // Evita el comportamiento predeterminado del ancla

            const targetId = this.getAttribute('href');
            // Verifica si el objetivo existe en la página
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // Calcula la posición de desplazamiento con un offset para el header fijo
                const headerOffset = document.querySelector('header').offsetHeight; // Altura del header
                const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY;
                const offsetPosition = elementPosition - headerOffset - 20; // 20px extra de padding

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth' // Desplazamiento suave
                });
            }
        });
    });

    // --- 3. Animaciones al Scroll (Ej. Fade-in para secciones) ---
    // Necesitarás añadir una clase como 'fade-in-element' a los elementos que quieras animar
    // y luego añadir una clase 'is-visible' cuando estén en el viewport.
    const fadeInElements = document.querySelectorAll('.fade-in-element');

    const observerOptions = {
        root: null, // El viewport es el root
        rootMargin: '0px',
        threshold: 0.1 // Cuando el 10% del elemento esté visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // Dejar de observar una vez que se haga visible
            }
        });
    }, observerOptions);

    fadeInElements.forEach(el => {
        observer.observe(el);
    });

    // CSS de ejemplo para 'fade-in-element' y 'is-visible':
    // .fade-in-element {
    //   opacity: 0;
    //   transform: translateY(20px);
    //   transition: opacity 0.6s ease-out, transform 0.6s ease-out;
    // }
    // .fade-in-element.is-visible {
    //   opacity: 1;
    //   transform: translateY(0);
    // }


    // --- 4. Validación Básica de Formulario (ej. para el Contacto) ---
    // Aunque Formspree maneja el envío, una validación client-side mejora la UX.
    const contactForm = document.querySelector('.contacto-form-container form'); // Selecciona tu formulario de contacto

    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            const nameInput = contactForm.querySelector('#name');
            const emailInput = contactForm.querySelector('#email');
            const messageInput = contactForm.querySelector('#message');

            let isValid = true;

            // Simple validación de campos obligatorios
            if (!nameInput.value.trim()) {
                alert('Por favor, ingresa tu nombre.');
                isValid = false;
                nameInput.focus();
            } else if (!emailInput.value.trim() || !isValidEmail(emailInput.value.trim())) {
                alert('Por favor, ingresa un correo electrónico válido.');
                isValid = false;
                emailInput.focus();
            } else if (!messageInput.value.trim()) {
                alert('Por favor, ingresa tu mensaje.');
                isValid = false;
                messageInput.focus();
            }

            if (!isValid) {
                event.preventDefault(); // Detiene el envío del formulario si no es válido
            }
        });

        // Función auxiliar para validar formato de email
        function isValidEmail(email) {
            const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(String(email).toLowerCase());
        }
    }

    // --- 5. Efecto de cabecera al hacer scroll (Cambiar estilo al desplazarse) ---
    const header = document.querySelector('header');
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) { // Cuando el scroll es mayor a 50px
                header.classList.add('scrolled'); // Añade una clase al header
            } else {
                header.classList.remove('scrolled'); // Quita la clase si vuelve al inicio
            }
        });
    }
    // CSS de ejemplo para 'scrolled':
    // header.scrolled {
    //   background-color: rgba(40, 36, 42, 0.95); /* Un poco más opaco */
    //   box-shadow: 0 2px 10px rgba(0,0,0,0.3);
    //   padding: 10px 0; /* Menos padding */
    // }


    // --- 6. Función para añadir una clase 'loaded' al body una vez que todo carga ---
    // Útil para animaciones de entrada de página completas
    document.body.classList.add('loaded');
    // CSS de ejemplo:
    // body:not(.loaded) { opacity: 0; }
    // body.loaded { opacity: 1; transition: opacity 1s ease-in; }

});
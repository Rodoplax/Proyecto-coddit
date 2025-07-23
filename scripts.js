
// Menú hamburguesa en movil //


let menu = document.querySelector(".nav__hamburger");
let nav = document.getElementById("nav");

menu.addEventListener("click", ()=>{
    nav.classList.toggle("nav__open");
    menu.classList.toggle("open");
});

//    Nav que aparece y desaprece al hacer scroll //

let prevScroll = window.scrollY;
const navbar = document.getElementById("header");

window.addEventListener("scroll", () => {
    const currentScroll = window.scrollY;
    if (currentScroll > prevScroll) {
        navbar.style.top = "-120px"; 
    } else {
        navbar.style.top = "0";
    }
    prevScroll = currentScroll;
});


/* Carrusel de el proceso */



document.addEventListener('DOMContentLoaded', () => {
  const mediaQuery = window.matchMedia("(max-width: 768px)");
  let initialized = false;
  let cleanup = () => {}; // Función para eliminar listeners si se desactiva

  function initCarousel() {
    const carousel = document.getElementById('carousel');
    const buttons = document.querySelectorAll('.controles button');
    const progressFills = document.querySelectorAll('.btn-progreso .fill');
    const totalSections = 4;
    let currentIndex = 0;
    let interval;

    function goToSection(index) {
      currentIndex = index;
      carousel.style.transform = `translateX(-${index * 100}vw)`;
      updateProgressBars(index);
    }

    function updateProgressBars(index) {
      progressFills.forEach((fill, i) => {
        fill.style.width = i === index ? '103%' : '0%';
      });
    }

    buttons.forEach(button => {
      button.addEventListener('click', onButtonClick);
    });

    function onButtonClick() {
      const index = parseInt(this.getAttribute('data-index'));
      goToSection(index);
      resetInterval();
    }

    function startAutoSlide() {
      interval = setInterval(() => {
        currentIndex = (currentIndex + 1) % totalSections;
        goToSection(currentIndex);
      }, 5000);
    }

    function resetInterval() {
      clearInterval(interval);
      startAutoSlide();
    }

    startAutoSlide();

    // Swipe/drag
    let startX = 0;
    let isDragging = false;
    let threshold = 50;

    function onMouseDown(e) {
      startX = e.clientX;
      isDragging = true;
    }

    function onMouseUp(e) {
      if (!isDragging) return;
      const delta = e.clientX - startX;
      handleSwipe(delta);
      isDragging = false;
    }

    function onTouchStart(e) {
      startX = e.touches[0].clientX;
      isDragging = true;
    }

    function onTouchEnd(e) {
      if (!isDragging) return;
      const endX = e.changedTouches[0].clientX;
      const delta = endX - startX;
      handleSwipe(delta);
      isDragging = false;
    }

    function handleSwipe(delta) {
      if (Math.abs(delta) > threshold) {
        if (delta > 0) {
          currentIndex = Math.max(0, currentIndex - 1);
        } else {
          currentIndex = Math.min(totalSections - 1, currentIndex + 1);
        }
        goToSection(currentIndex);
        resetInterval();
      }
    }

    carousel.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    carousel.addEventListener('touchstart', onTouchStart);
    carousel.addEventListener('touchend', onTouchEnd);

    initialized = true;

    // Devuelve una función de limpieza para quitar los listeners si cambia a móvil
    cleanup = () => {
      clearInterval(interval);
      buttons.forEach(button => {
        button.removeEventListener('click', onButtonClick);
      });
      carousel.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      carousel.removeEventListener('touchstart', onTouchStart);
      carousel.removeEventListener('touchend', onTouchEnd);
    };
  }

  function checkView(e) {
  if (!e.matches && !initialized) {
    initCarousel();
  } else if (e.matches && initialized) {
    cleanup();
    initialized = false;
    const carousel = document.getElementById('carousel');
    if (carousel) {
      carousel.style.transform = 'translateX(0)';
    }
    console.log("Carrusel desactivado por tamaño móvil");
  }
}
  // Detectar al cargar
  checkView(mediaQuery);

  // Escuchar cambios
  mediaQuery.addEventListener("change", checkView);
});

const items = document.querySelectorAll('.proceso__carousel-item');

function checkVisibility() {
  items.forEach(item => {
    const rect = item.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
      item.classList.add('visible');
    }
  });
}

window.addEventListener('scroll', checkVisibility);
window.addEventListener('load', checkVisibility);


/* Círculos de la página de servicios */

const circulos = document.querySelectorAll('.circulo');
const modal = document.getElementById('infoModal');
const modalTitulo = document.getElementById('modalTitulo');
const modalTexto = document.getElementById('modalTexto');

circulos.forEach(circle => {
  circle.addEventListener('click', () => {
    const titulo = circle.getAttribute('data-title'); // asegúrate que sea 'data-title'
    const desc = circle.getAttribute('data-desc');
    modalTitulo.textContent = titulo || 'Sin título';
    modalTexto.textContent = desc || 'Sin descripción';
    modal.style.display = 'flex';
  });
});

function closeModal() {
  modal.style.display = 'none';
}




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

  // Botones manuales
    buttons.forEach(button => {
    button.addEventListener('click', () => {
        const index = parseInt(button.getAttribute('data-index'));
        goToSection(index);
        resetInterval();
    });
    });

  // Autoplay
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

  // Swipe/drag funcionalidad
    let startX = 0;
    let isDragging = false;
  let threshold = 50; // mínimo para considerar swipe

  // Mouse events
    carousel.addEventListener('mousedown', (e) => {
    startX = e.clientX;
    isDragging = true;
    });

    window.addEventListener('mouseup', (e) => {
    if (!isDragging) return;
    const delta = e.clientX - startX;
    handleSwipe(delta);
    isDragging = false;
    });

  // Touch events
    carousel.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    isDragging = true;
    });

    carousel.addEventListener('touchend', (e) => {
    if (!isDragging) return;
    const endX = e.changedTouches[0].clientX;
    const delta = endX - startX;
    handleSwipe(delta);
    isDragging = false;
    });

    function handleSwipe(delta) {
    if (Math.abs(delta) > threshold) {
        if (delta > 0) {
        currentIndex = Math.max(0, currentIndex - 1); // Swipe a la derecha
        } else {
        currentIndex = Math.min(totalSections - 1, currentIndex + 1); // Swipe a la izquierda
        }
        goToSection(currentIndex);
        resetInterval();
    }
    }
});
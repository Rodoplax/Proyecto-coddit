let menu = document.querySelector(".nav__hamburger");
let nav = document.getElementById("nav");
menu.addEventListener("click", ()=>{
    nav.classList.toggle("nav__open");
    menu.classList.toggle("open");
});
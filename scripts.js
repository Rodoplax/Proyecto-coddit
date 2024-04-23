// Mensaje al cambiar de pestaña/página XD

let docTitle = document.title;
window.addEventListener("blur", () => {
    document.title = "¿Dónde vas? 😥";
})
window.addEventListener("focus", () => {
    document.title = docTitle;
})
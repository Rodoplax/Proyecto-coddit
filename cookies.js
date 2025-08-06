
function loadAnalytics() {
    var scriptTag = document.createElement('script');
    scriptTag.async = true;
    scriptTag.src = "https://www.googletagmanager.com/gtag/js?id=G-KP1C4J1TYV";
    document.head.appendChild(scriptTag);

    scriptTag.onload = function () {
        window.dataLayer = window.dataLayer || [];
        function gtag() { dataLayer.push(arguments); }
        gtag('js', new Date());
        gtag('config', 'G-KP1C4J1TYV');
    };
}

document.addEventListener('DOMContentLoaded', function () {
    cookieconsent.run({
        notice_banner_type: "simple",
        consent_type: "express",
        palette: "light",
        language: "es",
        page_load_consent_levels: ["strictly-necessary"],
        notice_banner_reject_button_hide: false,
        preferences_center_close_button_hide: false,
        page_refresh_confirmation_buttons: false,
        website_name: "coddit"
    });

    // Listener para el botón con ID 'open_preferences_center'
    var openPrefs = document.getElementById('open_preferences_center');
    if (openPrefs) {
        openPrefs.addEventListener('click', function (e) {
            e.preventDefault();
            if (typeof cookieconsent.openPreferencesCenter === 'function') {
                cookieconsent.openPreferencesCenter();
            } else {
                console.warn("La función 'openPreferencesCenter' no está disponible.");
            }
        });
    }

    // Listener para el botón alternativo (por ejemplo, en el footer)
    // Listener para abrir panel de preferencias desde el botón
    var btnConfigurar = document.getElementById('btn-configurar-cookies');
    if (btnConfigurar) {
        btnConfigurar.addEventListener('click', function (e) {
            e.preventDefault();
            if (typeof cookieconsent !== "undefined" && cookieconsent.openPreferencesCenter) {
                cookieconsent.openPreferencesCenter();
            } else {
                console.warn("CookieConsent aún no está cargado.");
            }
        });
    }


    // Si el usuario acepta cookies analíticas, se carga GA
    window.addEventListener("cookieConsentAccept", function () {
        const consent = cookieconsent.getUserPreferences();
        if (consent["analytics"]) {
            loadAnalytics();
        }
    });
});



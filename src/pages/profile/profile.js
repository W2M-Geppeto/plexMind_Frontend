import { 
  logout,
  getCookie,
  goBack
} from '/src/shared/utility.js';

let backBtn = document.getElementById('exitIcon');


// Extrae la descripción del usuario desde la cookie y la muestra en el About me
function mostrarDescripcionDesdeCookie() {
    try {
        const userCookie = getCookie("user");
        const aboutMeP = document.querySelector('.main-content .wrap-text p');
        if (!aboutMeP) return;
        if (userCookie) {
            // Parsear el JSON de la cookie
            const userObj = JSON.parse(userCookie);
            const description = userObj.description;
            if (description) {
                aboutMeP.innerHTML = description.replace(/\n/g, '<br>');
            } else {
                aboutMeP.textContent = "No hay descripción disponible";
            }
        } else {
            aboutMeP.textContent = "No hay descripción disponible";
        }
    } catch (error) {
        console.error("Error mostrando la descripción desde la cookie:", error);
    }
}
// Ejecuta al cargar la página
document.addEventListener('DOMContentLoaded', function() {
    mostrarDescripcionDesdeCookie();

    // Evento para el botón de volver
    if (backBtn) {
        backBtn.addEventListener('click', function(e) {
            e.preventDefault();
            goBack();
        });
    }

    // Evento para el icono de logout
    document.querySelectorAll('.logoutIcon').forEach(icon => {
        icon.addEventListener('click', function(e) {
            e.preventDefault();
            logout(); // Llama a la función de utility.js
        });
    });
});

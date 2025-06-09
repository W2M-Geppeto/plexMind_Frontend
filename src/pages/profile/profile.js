let backBtn = document.getElementById('exitIcon');


//Funcion para leer los datos del usuario
async function getUserData() {
    try{
        const response = await fetch('/src/resources/data/mocks/user.json');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    }
}
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
document.addEventListener('DOMContentLoaded', mostrarDescripcionDesdeCookie);
document.addEventListener('DOMContentLoaded', async function() {
    backBtn.addEventListener('click', function(e) {
        e.preventDefault();
        goBack();
    });


});

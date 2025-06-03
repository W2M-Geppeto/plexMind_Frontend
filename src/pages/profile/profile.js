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

// Cambia este valor para mostrar el usuario que quieras
// Este valor nos lo debe devolver en el futuro el backend/API
const id = 700;

// Función que muestra los datos del usuario en la página
async function mostrarUsuario() {
    const users = await getUserData();
    if (!users) return;
    // Busca el usuario por IdUser
    const user = users.find(u => u.id === id);
    if (user) {
        // Nombre en la navbar (antes del @)
        document.getElementById('user').textContent = user.email.split('@')[0];
        // Descripción en About me (con saltos de línea)
        document.querySelector('.main-content .wrap-text p').innerHTML = user.description.replace(/\n/g, '<br>');
    } else {
        document.getElementById('user').textContent = "Usuario no encontrado";
        document.querySelector('.main-content .wrap-text p').textContent = "";
    }
}

// Ejecuta al cargar la página
document.addEventListener('DOMContentLoaded', mostrarUsuario);


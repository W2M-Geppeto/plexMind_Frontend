// Cambia este valor por el IdUser que quieras mostrar
const idUser = 700;

fetch('/src/resources/data/mocks/user.json')
  .then(response => response.json())
  .then(users => {
    // Busca el usuario con el idUser deseado
    const user = users.find(u => u.IdUser === idUser);
    if (user) {
      // Pon el nombre antes del @ como nombre visible
      document.getElementById('user').textContent = user.Email.split('@')[0];
      // Reemplaza \n por <br> en la descripción
      document.querySelector('.main-content .wrap-text p').innerHTML = user.description.replace(/\n/g, '<br>');
    } else {
      document.getElementById('user').textContent = "Usuario no encontrado";
      document.querySelector('.main-content .wrap-text p').textContent = "";
    }
  })
  .catch(error => console.error('Error cargando el usuario:', error));
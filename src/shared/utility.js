let user = document.getElementById('user');
let personIcon = document.querySelector('.personIcon');

//funcion para rellenar el nombre de usuario según el email acortado


//Función para volvere a la pagina anterior, se necesita la información de la página anterior en sessionStorage en cada enlace/boton que lleve a una página nueva
function goBack() {
  const previous = sessionStorage.getItem('previousPage');
  if (previous && previous !== window.location.pathname) {
    window.location.href = previous;
  } else {
    window.location.href = '/src/pages/index/index.html';
  }
}
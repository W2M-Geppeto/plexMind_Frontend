let user = document.getElementById('user');

//funcion para rellenar el nombre de usuario según el email acortado
function fillMainUser(){
const userInfo = JSON.parse(sessionStorage.getItem('user'));
user.textContent = userInfo.email ? userInfo.email.split('@')[0] : 'Usuario';
}

//Función para guardar y recuperar la página anterior
function setPreviousPage(selector) {
  document.querySelectorAll(selector).forEach(element => {
    element.addEventListener('click', function() {
      sessionStorage.setItem('previousPage', window.location.pathname);
    });
  });
}

function goBack() {
  const previous = sessionStorage.getItem('previousPage');
  if (previous && previous !== window.location.pathname) {
    window.location.href = previous;
  } else {
    window.location.href = '/src/pages/index/index.html';
  }
}

//Añadir la llamada a la funcion:   setPreviousPage('.go-to-forum'); y la classe a todos los elementos que lleven al foro
function setPreviousPageOnClick(selector) {
  document.querySelector(selector).addEventListener('click', function() {
      sessionStorage.setItem('previousPage', window.location.pathname);
    });
  };
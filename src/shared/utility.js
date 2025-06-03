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

//Función para volver a la página anterior
function goBack() {
  const previous = sessionStorage.getItem('previousPage');
  if (previous && previous !== window.location.pathname) {
    window.location.href = previous;
  } else {
    window.location.href = '/src/pages/index/index.html';
  }
}

//Añadir la llamada a la funcion: setPreviousPage('.goForum'); y la classe a todos los elementos que lleven al foro
function setPreviousPage(selector) {
  document.querySelectorAll(selector).forEach(element => {
    element.addEventListener('click', function() {
      sessionStorage.setItem('previousPage', window.location.pathname);
    });
  });
}
  //Función para que el logo vuelva al home
  function backHome(){
    document.querySelector('.logo-navbar').addEventListener('click', function(e) {
      e.preventDefault();
      window.location.href = '/src/pages/index/index.html';
    });
  }

  //Función para que el icono vaya al profile 
  function goProfile() {
   document.getElementById('personIcon').addEventListener('click', function(e) {
      e.preventDefault();
      window.location.href = '/src/pages/profile/profile.html';
    });
  } 
  
  goProfile();
  backHome();

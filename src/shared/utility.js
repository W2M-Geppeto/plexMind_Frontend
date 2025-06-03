function fillMainUser(){
const userInfo = JSON.parse(sessionStorage.getItem('user'));
document.getElementById('user').textContent = (userInfo && userInfo.email) ? userInfo.email.split('@')[0] : 'Usuario';}
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
//Añadir la llamada a la funcion: setPreviousPage('.goForum'); y la classe a todos los elementos que lleven al foro
function setPreviousPage(selector) {
  document.querySelectorAll(selector).forEach(element => {
    element.addEventListener('click', function() {
      sessionStorage.setItem('previousPage', window.location.pathname);
    });
  });
}
  function backHome(){
    document.querySelector('.logo-navbar').addEventListener('click', function(e) {
      e.preventDefault();
      window.location.href = '/src/pages/index/index.html';
    });
  }
  function goProfile() {
   document.getElementById('personIcon').addEventListener('click', function(e) {
      e.preventDefault();
      window.location.href = '/src/pages/profile/profile.html';
    });
  } 
  goProfile();
  backHome();

//Función para leer los datos del fetch
async function getData(direccion) {
  try {
    const response = await fetch(direccion);
    if (!response.ok) {
    throw new Error(`Network response was not ok \nStatus: ${response.status} - ${response.statusText}`);}
    return await response.json();
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error);}
}

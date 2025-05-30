// común
let user = document.getElementById('user');
const favoriteUserIcon = document.getElementById('favoriteUserIcon');
let personIcon = document.querySelector('.personIcon');

//Propio
let titleForum = document.getElementById('title-Forum');
let descriptionForum = document.getElementById('description');
let likecCounter = 0;
// const forumElementos = ...


//Función para leer los datos del foro
async function getForumData() {
  try {
    const response = await fetch('/api/forum');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error);
  }
}

document.addEventListener('DOMContentLoaded', function() {
    // Función para mostrar los datos en el foro
    

    //Rellenar enlaces con sus iconos 

    //LikesCounter aumentar likes
    document.getElementById('favoriteForumIcon').onclick = function() {
        likecCounter++;
    alert('¡Gracias por tu apoyo! Tu like ha sido registrad' + likecCounter + ' likes');
  };
  
});



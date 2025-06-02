// común
let user = document.getElementById('user');
let personIcon = document.querySelector('.personIcon');

//Propio
let titleForum = document.querySelector('.titleForum');
let categoryforum = document.querySelector('.categoryForum');
let forumIcon = document.getElementById('favoriteForumIcon');
let resourceList = document.getElementById('resourceList');
let data = null;
// const forumElementos = ...


//Función para leer los datos del foro
async function getForumData() {
  try {
    const response = await fetch('/api/forum');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    data = await response.json();
    return data;
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error);
  }
}

//Función para cambiar la clase de la lista de recursos, según si tiene o no elementos hijos
function seeResources() {
    if (resourceList && resourceList.children.length === 0) {
        resourceList.classList.add('resourceListEmpty');
    } else if (resourceList) {
        resourceList.classList.remove('resourceListEmpty');
    }
}

function fillData(){
  titleForum.textContent =  data.title;;
  categoryforum.textContent = data.category;
  //nombre del usuaerio
}

function giveLike(){

}

//Funciones para que se ejecuten después de cargar el DOM
document.addEventListener('DOMContentLoaded', async function() {
  data = await getForumData();
  seeResources();
 const observer = new MutationObserver(seeResources);
  if (resourceList) {
    observer.observe(resourceList, { childList: true });
  }
  
  data = await getForumData();  

  if (data) fillData();
  else console.log('No data found for the forum');
});




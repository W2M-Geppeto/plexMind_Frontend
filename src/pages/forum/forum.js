let titleForum = document.querySelector('.titleForum');
let categoryforum = document.querySelector('.categoryForum');
let resourceList = document.getElementById('resourceList');
let data = null;
let listElements = null;
const emptyList = document.querySelector('.emptyList');
let backBtn = document.getElementById('exitIcon');

//Función para enviar al back el id del topic
function sendTopic(){
  const idTopic = sessionStorage.getItem('topic');
  //Enviarselo a la bbd



}


//Función para leer los datos del foro
async function getForumData() {
  try {
    const response = await fetch('/src/resources/data/mocks/topic.json');
    if (!response.ok) {
    throw new Error(`Network response was not ok \nStatus: ${response.status} - ${response.statusText}`);}
    return await response.json();
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error);}
}

//Función para leer los datos de la lista
async function getListData() {
  try {
    const response = await fetch('/src/resources/data/mocks/recursos_id_topic_1.json');
    if (!response.ok) {
    throw new Error(`Network response was not ok \nStatus: ${response.status} - ${response.statusText}`);
  }
  return await response.json();
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error);
  }
}

//Función para cambiar la clase de la lista de recursos, según si tiene o no elementos hijos
function seeResources() {
  if (resourceList && resourceList.children.length === 0) {
    emptyList.style.display = '';      
  } else{
    emptyList.style.display = 'none';
  }
}

//Función para rellenar la infromación del foro con el titulo y categoría
function fillData(){
  titleForum.textContent =  data[1].nameTopic.toUpperCase(); //sin [] cuando solo sea un objeto
  categoryforum.textContent = data[1].idCategory.toUpperCase();
}
// function fillData(){
//   titleForum.textContent = data.title.toUpperCase();
//   categoryforum.textContent = data.category.toUpperCase();
// }


//Función para rellenar la lista de recursos
function fillList() {
  resourceList.innerHTML = ""; 
  for (let i = 0; i < listElements.length; i++) {
    const resource = listElements[i];
    let icon = getIcon(resource.type);    
    const li = document.createElement('li');
    li.className = 'list-group-item';
    li.id = 'list-item';
    li.innerHTML = `
      <div class="row">
        <div class="col-2"></div>
        <div class="col-8">
          <a href="#" target="_blank" class="text-decoration-none text-reset text-truncate w-100 d-block txt-color">
            ${resource.name} 
          </a>
        </div>
        <div class="col-1 d-flex justify-content-end">
          <i class="material-icons" id="favoriteForumIcon" data-id="${resource.id}">favorite</i>
        </div>
        <div class="col-1 d-flex justify-content-end">
          <i class="material-icons" id="linkIconForum">${icon}</i>
        </div>
      </div>
    `;
    resourceList.appendChild(li);
  }
}

//Función para obtener el icono pertienente
function getIcon(type){
  switch(type) {
    case 'VIDEO':
      return 'ondemand_video';
    case 'DOC':
      return 'description';
    default:
      return 'link';
  }
}

//Función para enviar +1 like a la bbdd
function giveLike(idResource){
  //Enviarselo a la bbdd
  console.log(`Like given to resource with ID: ${idResource}`);
}

//Funciones para que se ejecuten después de cargar el DOM
document.addEventListener('DOMContentLoaded', async function() {
  fillMainUser();
  seeResources();
  const observer = new MutationObserver(seeResources);
  if (resourceList) {
    observer.observe(resourceList, { childList: true });}
  data = await getForumData();  
  if (data) fillData();
  else console.log('No data found for the forum');
  listElements = await getListData();
  if (listElements) fillList();
  else console.log('No data found for the list of resources');
  backBtn.addEventListener('click', function(e) {
    e.preventDefault();
    goBack();
  });
  resourceList.addEventListener('click', function(e) {
    if (e.target && e.target.id === 'favoriteForumIcon') {
      e.preventDefault();
      giveLike(e.target.getAttribute('data-id'));
    }
});
});




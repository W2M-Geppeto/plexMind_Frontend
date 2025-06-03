let titleForum = document.querySelector('.titleForum');
let categoryforum = document.querySelector('.categoryForum');
let resourceList = document.getElementById('resourceList');
let data = null;
let listElements = null;
const emptyList = document.querySelector('.emptyList');
let backBtn = document.getElementById('exitIcon');
function sendTopic(){
  const idTopic = sessionStorage.getItem('topic');
  //Enviarselo a la bbd

}
function seeResources() {
  if (resourceList && resourceList.children.length === 0) {
    emptyList.style.display = '';      
  } else{
    emptyList.style.display = 'none';
  }
}
function fillData(){
  titleForum.textContent =  data[1].nameTopic.toUpperCase();
  categoryforum.textContent = data[1].idCategory.toUpperCase();
}
// function fillData(){
//   titleForum.textContent = data.title.toUpperCase();
//   categoryforum.textContent = data.category.toUpperCase();
// }
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
function giveLike(idResource){
  //Enviarselo a la bbdd
  console.log(`Like given to resource with ID: ${idResource}`);
}
document.addEventListener('DOMContentLoaded', async function() {
  fillMainUser();
  seeResources();
  const observer = new MutationObserver(seeResources);
  if (resourceList) {
    observer.observe(resourceList, { childList: true });}
  data = await getData('/src/resources/data/mocks/topic.json') ;  
  if (data) fillData();
  else console.log('No data found for the forum');
  listElements = await getData('/src/resources/data/mocks/recursos_id_topic_3.json') ;
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
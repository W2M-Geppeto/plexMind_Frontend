let titleForum = document.querySelector('.titleForum');
let categoryforum = document.querySelector('.categoryForum');
let resourceList = document.getElementById('resourceList');
const emptyList = document.querySelector('.emptyList');
let backBtn = document.getElementById('exitIcon');
let data = null;
let idTopic = {idTopic: 3}; //getCookie('idTopic')
function emptyResources() {
  if (resourceList && resourceList.children.length === 0) {
    emptyList.style.display = '';      
  } else{
    emptyList.style.display = 'none';
  }
}
function fillData(){
  titleForum.textContent =  data[1].nameTopic.toUpperCase();
  categoryforum.textContent = (data[1].idCategory + "end").toUpperCase();
}
function fillList() {
  resourceList.innerHTML = ""; 
  let likedCookie = getCookie("liked_prueba");
  let likedArr = likedCookie ? JSON.parse(likedCookie) : [];
  for (let i = 0; i < listElements.length; i++) {
    const resource = listElements[i];
    let icon = getIcon(resource.type);   
    let isLiked = likedArr.includes(resource.id);    
    const li = document.createElement('li');
    li.className = 'list-group-item';
    li.id = 'list-item';
    let idStyle = isLiked ? "favoriteForumIconLiked" : "favoriteForumIcon";
    li.innerHTML = `
      <div class="row">
        <div class="col-2"></div>
        <div class="col-8">
          <a href="#" target="_blank" class="text-decoration-none text-reset text-truncate txt-color link">
            ${resource.name} 
          </a>
        </div>
        <div class="col-1 d-flex justify-content-end">
          <i class="material-icons" id=${idStyle} data-id="${resource.id}">favorite</i>
        </div>
        <div class="col-1 d-flex justify-content-end">
          <i class="material-icons" id="linkIconForum">${icon}</i>
        </div>
      </div>
    `;
    resourceList.appendChild(li);
  }
  emptyResources();
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
function giveLike(idResource) {
  let likedCookie = getCookie("liked_prueba");
  let likedArr = likedCookie ? JSON.parse(likedCookie) : [];
  idResource = Number(idResource);
  if (!likedArr.includes(idResource)) likedArr.push(idResource);
  createNewCookie(
    "liked_prueba",
     JSON.stringify(likedArr),
    { expires: new Date(Date.now() + 10 * 365 * 24 * 60 * 60 * 1000) }
  );
  
  let sendlikesCookie = getCookie("toSendLikes");
  let likedArr2 = sendlikesCookie ? JSON.parse(sendlikesCookie) : [];
  idResource = Number(idResource);
  if (!likedArr2.includes(idResource)) likedArr.push(idResource);
  createNewCookie(
    "toSendLikes",
     JSON.stringify(likedArr2),{}
  );
}
document.addEventListener('DOMContentLoaded', async function() {
  data = await getData('/src/resources/data/mocks/topic.json');
  //let data = await sendFGetData('/src/resources/data/mocks/topic.json', idTopic);  
  console.log(data);
  if (data) fillData();
  else console.log('No data found for the forum');
  let listElements = await sendGetData('https://micro-resource.onrender.com/api/resources/topic/1/details', idTopic);
  if (listElements) fillList();
  else  emptyResources();
  backBtn.addEventListener('click', function(e) {
    e.preventDefault();
    goBack();
  });
  resourceList.addEventListener('click', function(e) {
    if (e.target && e.target.id === 'favoriteForumIcon') {
      e.preventDefault();
      e.target.removeAttribute('id');
      giveLike(e.target.getAttribute('data-id'));
    }
});

document.querySelector(".personIcon").addEventListener("click", function (e) {
  e.preventDefault();
  createNewCookie("previousPage", window.location.pathname, {});
  
});
});
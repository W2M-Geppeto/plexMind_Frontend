let titleForum = document.querySelector('.titleForum');
let categoryforum = document.querySelector('.categoryForum');
let resourceList = document.getElementById('resourceList');
const emptyList = document.querySelector('.emptyList');
const backBtn = document.getElementById('exitIcon');
const logo = document.querySelector('.logo-navbar');
let likedArr2 = [];
let data = null;
let likedDataUser = []
let listElements = [];
let idTopic = {idTopic: 3}; //getCookie('idTopic')
function emptyResources() {
  if (resourceList && resourceList.children.length === 0) {
    emptyList.style.display = '';      
  } else{
    emptyList.style.display = 'none';
  }
}
function fillData(){
  console.log("data", data);
  titleForum.textContent =  data[1].nameTopic.toUpperCase();
  categoryforum.textContent = (data[1].idCategory + "end").toUpperCase();
}
function fillList(likedDataUser) {
  resourceList.innerHTML = ""; 
  for (let i = 0; i < listElements.length; i++) {
    const resource = listElements[i];
    let icon = getIcon(resource.type);   
    let isLiked = likedDataUser.includes(resource.id);    
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
  let sendlikesCookie = getCookie("toSendLikes");
  likedArr2 = sendlikesCookie ? JSON.parse(sendlikesCookie) : [];
  idResource = Number(idResource);
  if (!likedArr2.includes(idResource)) likedArr2.push(idResource);
  createNewCookie(
    "toSendLikes",
     JSON.stringify(likedArr2),{}
  );
  console.log("likedArr2", likedArr2);
  console.log(document.cookie);
}
function sendLikes(){
if (likedArr2.length > 0) {
  //sendData('',(likedArr2));
  deleteCookie("toSendLikes");
 }
}
document.addEventListener('DOMContentLoaded', async function() {
  data = await getData("http://127.0.0.1:5500/src/resources/data/mocks/topic.json");
  //data = await sendFGetData('/src/resources/data/mocks/topic.json', idTopic);  
  if (data) fillData();
  //listElements = await sendGetData('https://micro-resource.onrender.com/api/resources/topic/1/details', idTopic);
  listElements = await getData("http://127.0.0.1:5500/src/resources/data/mocks/recursos_id_topic_3.json");
  likedDataUser = await getData("http://127.0.0.1:5500/src/resources/data/mocks/liked.json");
  console.log("likedDataUser", likedDataUser);
  if (listElements) fillList(likedDataUser);
  else  emptyResources();
  backBtn.addEventListener('click', function(e) {
    e.preventDefault();
    sendLikes();
    goBack();
  });
  

  logo.addEventListener('click', function(e) {
    e.preventDefault();
    sendLikes();
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
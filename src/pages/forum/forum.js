let titleForum = document.querySelector('.titleForum');
let categoryforum = document.querySelector('.categoryForum');
let resourceList = document.getElementById('resourceList');
const emptyList = document.querySelector('.emptyList');
const backBtn = document.getElementById('exitIcon');
let likedArr = [];
let data = null;
let likedDataUser = []
let listElements = [];
try {
  idTopic = JSON.parse(getCookie('topic'));
} catch (error) {
  console.error("Error al parsear la cookie:", error);
  idTopic = null;
}
 let idUser;
  try {
  let user = JSON.parse(getCookie("user"));
  idUser = user ? user.id : null;
  } catch (error) {
     console.error("Error al parsear la cookie:", error);
     idUser = null;}

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
          <a href="${resource.link} " target="_blank" class="text-decoration-none text-reset text-truncate txt-color link">
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
  likedArr = sendlikesCookie ? JSON.parse(sendlikesCookie) : [];
  idResource = Number(idResource);
  if (!likedArr.includes(idResource)) likedArr.push(idResource);
  createNewCookie(
    "toSendLikes",
     JSON.stringify(likedArr),{}
  );
}
async function sendLikes() {
  if (Array.isArray(likedArr) && likedArr.length > 0) {
    try {
      await sendData("", {idUser: idUser, likes: likedArr});
      deleteCookie("toSendLikes");
      likedArr.length = 0;
    } catch (error) {
      console.error("Error al enviar likes:", error);
    }
  }
}
document.addEventListener('DOMContentLoaded', async function() {
  data = await sendFGetData('/src/resources/data/mocks/topic.json', idTopic);  
  if (data) fillData();
  
  listElements = await sendGetData('https://micro-resource.onrender.com/api/resources/topic/${idTopic}/details', idTopic);
  // likedDataUser =  sendGetData(' ', idUser);
  if (listElements) fillList(likedDataUser);
  else  emptyResources();
  backBtn.addEventListener('click', function(e) {
    e.preventDefault();
    goBack();
  });

  window.addEventListener("beforeunload", async function () {
    console.log("Sending likes before leaving the page...");
    //navigator.sendBeacon("/api/sendLikes");
     await sendLikes();
  });

  resourceList.addEventListener('click', function(e) {
    if (e.target && e.target.id === 'favoriteForumIcon') {
      e.preventDefault();
      e.target.removeAttribute('id');
      giveLike(e.target.getAttribute('data-id'));
      console.log(document.cookie);
    }
    
});

document.querySelector(".personIcon").addEventListener("click", function (e) {
  e.preventDefault();
  createNewCookie("previousPage", window.location.pathname, {});
});
});
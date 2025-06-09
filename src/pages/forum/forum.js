let titleForum = document.querySelector('.titleForum');
let categoryforum = document.querySelector('.categoryForum');
let resourceList = document.getElementById('resourceList');
const emptyList = document.querySelector('.emptyList');
const backBtn = document.getElementById('exitIcon');
let topicData = null;
let idUser = -1;
try {
  topicData = JSON.parse(getCookie('topic'));
} catch (error) {
  console.error("Error al parsear la cookie:", error);
  topicData = null;
}
try {
let user = JSON.parse(getCookie("user"));
idUser = user ? user.id : -1;  
} catch (error) {
  console.error("Error al parsear la cookie:", error);
  idUser = -1;}

function emptyResources() {
  if (resourceList && resourceList.children.length === 0) {
    emptyList.style.display = '';      
  } else{
    emptyList.style.display = 'none';
  }
}

function fillData(){
  if(topicData.nameTopic && topicData.nameCategory){
    titleForum.textContent =  topicData.nameTopic.toUpperCase();
    categoryforum.textContent = topicData.nameCategory.toUpperCase();
  }else{
    titleForum.textContent =  "NO DATA";
    categoryforum.textContent = "NO DATA";
  }
  // posible cambio nombre datos json
}

function fillList(likedDataUser, listElements) {
  resourceList.innerHTML = ""; 
  console.log("listElements", listElements);
  for (let i = 0; i < listElements.length; i++) {
    const resource = listElements[i];
    let icon = getIcon(resource.type);   
    let isLiked = likedDataUser.includes(resource.id);    
    const li = document.createElement('li');
    li.className = 'list-group-item';
    li.id = 'list-item';
    let classStyle = isLiked ? "favoriteForumIcon favoriteForumIconLiked" : "favoriteForumIcon";
    li.innerHTML = `
      <div class="row">
        <div class="col-2"></div>
        <div class="col-8">
          <a href="${resource.link} " target="_blank" class="text-decoration-none text-reset text-truncate txt-color link">
            ${resource.name} 
          </a>
        </div>
        <div class="col-1 d-flex justify-content-end">
          <i class="material-icons ${classStyle}" data-id="${resource.id}">favorite</i>
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
async function addLike(idResource) { 
  idResource = Number(idResource);
  try {
      await sendData("", idResource);
    } catch (error) {
      console.error("Error al enviar likes:", error);
    }
}
async function removeLike(idResource) {
  idResource = Number(idResource);
  try {
      await sendData("", idResource);
    } catch (error) {
      console.error("Error al enviar likes:", error);
    }
}

document.addEventListener('DOMContentLoaded', async function() {
  fillData(); 
  let topicId = topicData.idTopic ? topicData.idTopic : -1;
  //let listElements = await sendGetData(`https://plexmind.onrender.com/api/resources/topic/%7BidTopic%7D/details`, topicId);
  let listElements = await getData("http://127.0.0.1:5500/src/resources/data/mocks/recursos_id_topic_3.json");  
  //let likedDataUser =  await sendGetData(' ', idUser);
  let likedDataUser = [3,27,88];
  if (listElements) fillList(likedDataUser, listElements);
  else  emptyResources();
  backBtn.addEventListener('click', function(e) {
    e.preventDefault();
    goBack();
  });
  resourceList.addEventListener('click', function(e) {
      if (e.target && e.target.classList.contains('favoriteForumIcon')) {
          e.preventDefault();
          e.target.classList.toggle('favoriteForumIconLiked');
          if (e.target.classList.contains('favoriteForumIconLiked')) {
              // addLike(e.target.getAttribute('data-id'));
          } else {
              // removeLike(e.target.getAttribute('data-id'));
          }
          console.log(e.target.classList)
      }
      if (e.target && e.target.id === "linkIconForum") {
          e.preventDefault();
          if(idUser === -1)
            goToLogin();
          else
          console.log("Aún no implementado");
      }
  });

document.querySelector(".personIcon").addEventListener("click", function (e) {
  e.preventDefault();
  createNewCookie("previousPage", window.location.pathname, {});
});
});
let titleForum = document.querySelector('.titleForum');
let categoryforum = document.querySelector('.categoryForum');
let resourceList = document.getElementById('resourceList');
const emptyList = document.querySelector('.emptyList');
const backBtn = document.getElementById('exitIcon');
let idTopic = null;
try {
  idTopic = JSON.parse(getCookie('topic'));
} catch (error) {
  console.error("Error al parsear la cookie:", error);
  idTopic = null;
}
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

function fillData(data){
  console.log("data", data);
  titleForum.textContent =  data[1].nameTopic.toUpperCase();
  categoryforum.textContent = (data[1].idCategory + "end").toUpperCase();
}

function fillList(likedDataUser, listElements) {
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
  let data = await getData('/src/resources/data/mocks/topic.json');  
  if (data) fillData(data);
  let listElements = await sendGetData('https://micro-resource.onrender.com/api/resources/topic/${idTopic}/details', idTopic);
  let likedDataUser =  await sendGetData(' ', idUser);
  if (listElements) fillList(likedDataUser, listElements);
  else  emptyResources();
  backBtn.addEventListener('click', function(e) {
    e.preventDefault();
    goBack();
  });

  resourceList.addEventListener('click', function(e) {
    if (e.target && e.target.id === 'favoriteForumIcon' || e.target.id === 'favoriteForumIconLiked') {
      e.preventDefault();
      
      if(e.target.id === 'favoriteForumIcon'){e.target.id = 'favoriteForumIconLiked';
      addLike(e.target.getAttribute('data-id'));}
      else{
         e.target.id = 'favoriteForumIcon';
        removeLike(e.target.getAttribute('data-id'));
      }
    }    
});

document.querySelector(".personIcon").addEventListener("click", function (e) {
  e.preventDefault();
  createNewCookie("previousPage", window.location.pathname, {});
});
});
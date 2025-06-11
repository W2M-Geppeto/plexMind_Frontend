let titleForum = document.querySelector(".titleForum");
let categoryforum = document.querySelector(".categoryForum");
let resourceList = document.getElementById("resourceList");
const emptyList = document.querySelector(".emptyList");
const backBtn = document.getElementById("exitIcon");
let topicData = null;
let user = null;

try {
  topicData = JSON.parse(getCookie("topic"));
} catch (error) {
  topicData = null;
}

try {
  user = JSON.parse(getCookie("user"));
} catch (error) {
  user = null;
}

function emptyResources() {
  if (resourceList && resourceList.children.length === 0) {
    emptyList.style.display = "";
  } else {
    emptyList.style.display = "none";
  }
}

function fillData() {
  console.log(topicData);
  if (topicData) {
    titleForum.textContent = topicData.nameTopic.toUpperCase();
    categoryforum.textContent = topicData.nameCategory.toUpperCase();
  } else {
    titleForum.textContent = "NO DATA";
    categoryforum.textContent = "NO DATA";
  }
}

function fillList(listElements, likedDataUser) {
  resourceList.innerHTML = "";
  for (let i = 0; i < listElements.length; i++) {
    const resource = listElements[i];
    let icon = getIcon(resource.type);
    let isLiked = likedDataUser.includes(resource.id);
    const li = document.createElement("li");
    li.className = "list-group-item";
    li.id = "list-item";
    let classStyle = isLiked
      ? "favoriteForumIcon favoriteForumIconLiked"
      : "favoriteForumIcon";
    li.innerHTML = `
      <div class="row">
        <div class="col-2"></div>
        <div class="col-8">
          <a href="${resource.link}" class="text-decoration-none text-reset text-truncate txt-color link" id="link">
            ${resource.name} 
          </a>
        </div>
        <div class="col-1 d-flex justify-content-end">
          <i class="material-icons ${classStyle}" data-id="${resource.id}" id="favIcon">favorite</i>
        </div>
        <div class="col-1 d-flex justify-content-end">
          <i class="material-icons" id="linkIconForum" >${icon}</i>
        </div>
      </div>
    `;
    resourceList.appendChild(li);
  }
  emptyResources();
}

function getIcon(type) {
  switch (type) {
    case "VIDEO":
      return "ondemand_video";
    case "DOC":
      return "description";
    default:
      return "link";
  }
}

async function addLike(idResource, idUser) {
  idResource = Number(idResource);
  try {
    await sendData(
      `https://plexmind.onrender.com/api/resources/like/${idResource}/${idUser}`
    );
  } catch (error) {
    console.error("Error al enviar likes:", error);
  }
}

async function removeLike(idResource, idUser) {
  idResource = Number(idResource);
  try {
    await sendData(
      `https://plexmind.onrender.com/api/resources/dislike/${idResource}/${idUser}`
    );
  } catch (error) {
    console.error("Error al enviar likes:", error);
  }
}

document.addEventListener("DOMContentLoaded", async function () {
  checkLogin();
  goProfile();
  fillData();
  let idTopic = topicData ? topicData.id : -1;
  let listElements = await getData(
    `https://plexmind.onrender.com/api/resources/topic/${idTopic}/details`
  );
  let idUser = user ? user.id : -1;
  let likedDataUser = [];
  if (idTopic != -1 && idUser != -1) {
    likedDataUser = await getData(
      `https://plexmind.onrender.com/api/users/check/likes/${idUser}/${idTopic}`
    );
    likedDataUser = await getData(
      `https://plexmind.onrender.com/api/users/likes/${idUser}/${idTopic}`
    );
    if(likedDataUser== undefined){
      likedDataUser = [];
    }
  }
  if (listElements) fillList(listElements, likedDataUser);
  else emptyResources();
  backBtn.addEventListener("click", function (e) {
    e.preventDefault();
    goBack();
  });
  resourceList.addEventListener("click", function (e) {
    if (e.target) {
      e.preventDefault();
      let iconType = e.target.id;
      if (idUser != -1) {
        switch (iconType) {
          case "link":
            window.open(e.target.href, "_blank");
            break;
          case "favIcon":
            e.target.classList.toggle("favoriteForumIconLiked");
            if (e.target.classList.contains("favoriteForumIconLiked")) {
              addLike(e.target.getAttribute("data-id"), idUser);
            } else {
              removeLike(e.target.getAttribute("data-id"), idUser);
            }
            break;
          case "linkIconForum":
              const modalElement = document.getElementById("exampleModal");
              const modalInstance = new bootstrap.Modal(modalElement, {
                backdrop: true,
              });
              modalInstance.show();
            break;
        }
      } else {
        login();
      }
    }
  });

  if (getCookie("user")) {
    document
      .querySelector(".personIcon")
      .addEventListener("click", function (e) {
        e.preventDefault();
        createNewCookie("previousPage", window.location.pathname, {});
      });
  }
});

import { 
  checkLogin, 
  goProfile, 
  logout,  
  createNewCookie, 
  getCookie, 
  getData
} from '/src/shared/utility.js';

// const mockOrdered = "/src/resources/data/mocks/trending_topic_orderByLike.json";
const url = "https://plexmind.onrender.com/api/resources/top-by-likes";
let data = null;

async function fillTrending() {
  try {
    data = await getData(url);
    const trendingRow = document.querySelector(".trendingRow");
     if (!trendingRow) {
    console.error("No se encontró el contenedor .trendingRow en el DOM.");
    return null;
  }
    if (data && data.length > 0) {
      trendingRow.innerHTML = "";
      data.forEach((item) => {
        // Construye la URL al foro usando el id
        const forumUrl = `/forum.html?id=${item.id}`;

        trendingRow.innerHTML += `
                <div class="col-md-6 col-lg-4">
                    <a href="${forumUrl}" class="btn btn-trend w-100 text-start mb-3" data-id="${item.id}">
                        <div class="row align-items-center">
                            <div class="col-7 fs-4 forum-title">${item.nameTopic.toUpperCase()}</div>
                            <div class="col-5 d-flex justify-content-end align-items-center">
                                <span class="me-2 mb-0 align-middle d-md-none d-xl-inline" style="font-size:1.2rem">
                                ${item.numLikes}</span>
                                <i class="material-icons align-middle" style="font-size:2.5rem;">favorite</i>
                            </div>
                        </div>
                    </a>
                </div>
                `;
      });

      document.querySelectorAll(".btn-trend").forEach((btn) => {
        btn.addEventListener("click", function (e) {
          e.preventDefault();
          const idTopic = btn.getAttribute("data-id");
          const topicObj = data.find(item => String(item.id) === idTopic);
          if (topicObj) {
            createNewCookie("topic", JSON.stringify(topicObj), {});
            console.log(getCookie("topic"));
          };

          window.location.href = btn.href;
          console.log(`Navigating to forum with ID: ${idTopic}`);
        });
      });
      return data;
    } else {
      trendingRow.innerHTML = "<p>No hay temas trending.</p>";
      return null;
    }
  } catch (error) {
    console.error("Error loading trending data:", error);
    return null;
  }
}



document.addEventListener('DOMContentLoaded', async function () {
  checkLogin()

  await fillTrending();
    goProfile();
});

document.querySelectorAll('.logoutIcon').forEach(icon => {
    icon.addEventListener('click', function(e) {
        e.preventDefault();
        logout();
        });
   });










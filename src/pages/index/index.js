const mockOrdered = '/src/resources/data/mocks/trending_topic_orderByLike.json';
const url = 'https://plexmind.onrender.com/api/resources/top-by-likes';

let data = null;
async function fillTrending() {
    try {
        data = await getData(url);
        const trendingRow = document.querySelector('.trendingRow');
        if (data && data.length > 0) {
            trendingRow.innerHTML = "";
            data.forEach(item => {
                // Construye la URL al foro usando el id
                const forumUrl = `/src/pages/forum/forum.html?id=${item.id}`;


                trendingRow.innerHTML += `
                <div class="col-md-6 col-lg-4">
                    <a href="${forumUrl}" class="btn btn-trend w-100 text-start mb-3" data-id="${item.id}">
                        <div class="row align-items-center">
                            <div class="col-7 fs-4 forum-title">${item.nameTopic.toUpperCase()}</div>
                            <div class="col-5 d-flex justify-content-end align-items-center">
                                <span class="me-2 mb-0 align-middle d-md-none d-xl-inline" style="font-size:1.2rem">${item.numLikes}</span>
                                <i class="material-icons align-middle" style="font-size:2.5rem;">favorite</i>
                            </div>
                        </div>
                    </a>
                </div>
                `;

            });
            
            document.querySelectorAll('.btn-trend').forEach(btn => {
                btn.addEventListener('click', function (e) {
                    e.preventDefault();
                    const idTopic = btn.getAttribute('data-id');
                    createNewCookie('topic', idTopic, {});
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
        console.error('Error loading trending data:', error);
        return null;
    }

}

document.addEventListener("DOMContentLoaded", function() {
    // Load login.html content into the modal
    fetch('/src/pages/login/login.html')
      .then(response => response.text())
      .then(html => {
        // Extract only the <body> content from login.html
        const bodyContent = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
        document.getElementById('loginModalContent').innerHTML = bodyContent ? bodyContent[1] : html;
      });

    // Prevent closing the modal by clicking outside or pressing ESC
    document.body.classList.add('modal-open');
    document.body.style.overflow = 'hidden';
});

document.addEventListener('DOMContentLoaded', async function () {
    goProfile();
    await fillTrending();

});








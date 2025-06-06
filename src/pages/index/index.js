async function fillTrending() {
    try {
        const data = await getData(url = 'https://micro-resource.onrender.com/api/resources/top-by-likes');
        const trendingRow = document.querySelector('.trendingRow');
        if (data && data.length > 0) {
            trendingRow.innerHTML = "";
            data.forEach(item => {
                // Construye la URL al foro usando el id
                const forumUrl = `/src/pages/forum/forum.html?id=${item.id}`;


                trendingRow.innerHTML += `
                <div class="col-md-6 col-lg-4">
                    <a href="${forumUrl}" class="btn btn-trend w-100 text-start mb-3">
                        <div class="row align-items-center">
                            <div class="col-7 fs-4 forum-title">${item.nameTopic.toUpperCase()}</div>
                            <div class="col-5 d-flex justify-content-end align-items-center">
                                <span class="me-2 mb-0 align-middle d-md-none d-xl-inline" style="font-size:1.2rem">${item.sumLikes}</span>
                                <i class="material-icons align-middle" style="font-size:2.5rem;">favorite</i>
                            </div>
                        </div>
                    </a>
                </div>
                `;

            });
            setPreviousPage('.btn-trend');
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


document.addEventListener('DOMContentLoaded', async function () {
    await fillTrending();
    if (data) {
        createNewCookie('topic', JSON.stringify(data), {});
        console.log('cookie creada');
        console.log(getCookie('topic'));
        return true;
    } else {
        console.log('cookie ERROR');
        return false;
    }
})






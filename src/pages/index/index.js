
let list = "";
const mockOrdered = '/src/resources/data/mocks/trending_topic_orderByLike.json';

async function fillTrendingForums() {
    try {
        const response = await fetch(mockOrdered);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching trending data:', error);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const trendingRow = document.querySelector('.trendingRow');
    fillTrendingForums().then(data => {
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
        } else {
            trendingRow.innerHTML = "<p>No hay temas trending.</p>";
        }
    }).catch(error => {
        console.error('Error loading trending data:', error);
    });
});

//getCookie('user') 

// console.log(getCookie('user'));
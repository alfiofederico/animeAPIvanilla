const API_URL = "https://api.jikan.moe/v3/top/anime/1/bypopularity";
 const main = document.getElementById("main");
 const form = document.getElementById("form");
 const search_query = document.getElementById("search");

/* initial loading/main page */

 getAnimes(API_URL);

async function getAnimes(url) {
  const res = await fetch(url);
  const data = await res.json();

  showAnimes(data.top ? data.top.slice(0, 16) : data.results.slice(0, 16));
}

function showAnimes(animes){
  main.innerHTML = "";

  animes.forEach((anime) => {
     const { title, image_url, url, score } = anime
console.log(anime);
     const animeEl = document.createElement("div");
     animeEl.classList.add("anime");

     animeEl.innerHTML = `
            <a href=${url} target="_blank"><img src="${image_url}" alt="${title}"></a>
            <div class="anime-info">
              <a href=${url} target="_blank"><h3>${title}</h3></a>
              <p><span class="${getClassByRate(score)}">${score}</span></p>
            </div>
        `;
     main.appendChild(animeEl);
  })
}


/* Form */

const SEARCH_API = `https://api.jikan.moe/v3/search/anime?order_by=title&sort=asc&limit=16`;

form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (search_query.value) {
    getAnimes(`${SEARCH_API}&q=${search_query.value}`);

  
    search_query.value = "";
  } else {
    window.location.reload();
  }
});
  

function getClassByRate(vote) {
    if(vote >= 8) {
        return 'green'
    } else if(vote >= 5) {
        return 'orange'
    } else {
        return 'red'
    }
  }
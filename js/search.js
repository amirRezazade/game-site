import {
  key,
  genres,
  esrbRatings,
  changeUpToTop,
  platforms,
  cardPlatforms,
} from "./funcs.js";
const slider = document.getElementById("slider-year");
const minYear = document.getElementById("min-year");
const maxYear = document.getElementById("max-year");
const pointSlider = document.getElementById("slider-point");
const minPoint = document.getElementById("min-point");
const maxPoint = document.getElementById("max-point");
const searchBtn = document.querySelector("#search-btn");
const genreInput = document.querySelector("#genre");
const platformInput = document.querySelector("#platforms");
const searchInput = document.querySelector("#search-input");
let page = 1;
let answer;
getParams();

window.addEventListener("DOMContentLoaded", () => {
  document.querySelector(".content").classList.remove("hidden");
  document.querySelector(".loader-container").style.display = "none";
});

noUiSlider.create(slider, {
  start: [1970, 2025],
  connect: true,
  step: 1,
  direction: "ltr",
  range: {
    min: 1970,
    max: 2025,
  },
  format: {
    to: (value) => Math.round(value), // اعداد انگلیسی
    from: (value) => Number(value),
  },
});

slider.noUiSlider.on("update", (values, handle) => {
  if (handle === 0) minYear.textContent = values[0];
  else maxYear.textContent = values[1];
});
noUiSlider.create(pointSlider, {
  start: [0, 100],
  connect: true,
  step: 1,
  direction: "ltr",
  range: {
    min: 0,
    max: 100,
  },
  format: {
    to: (value) => Number(value), // اعداد انگلیسی
    from: (value) => Number(value),
  },
});

pointSlider.noUiSlider.on("update", (values, handle) => {
  if (handle === 0) minPoint.textContent = values[0];
  else maxPoint.textContent = values[1];
});

searchBtn.addEventListener("click", () => {
  page = 1;
  setParams();
});
document.querySelector("#name-search-btn").addEventListener("click", () => {
  page = 1;
  setParams();
});
searchInput.addEventListener("keydown", (e) => {
  if (e.keyCode == 13) {
    page = 1;
    setParams();
  }
});
function setParams() {
  removeAllUrlParams();
  const yearValues = slider.noUiSlider.get();
  const pointValues = pointSlider.noUiSlider.get();
  let minYear = yearValues[0];
  let maxYear = yearValues[1];
  let minPoint = pointValues[0];
  let maxPoint = pointValues[1];
  let word = searchInput.value.trim();
  let genre = genreInput.value;
  let platform = platformInput.value;
  addUrlParam("min-year", minYear);
  addUrlParam("max-year", maxYear);
  addUrlParam("min-point", minPoint);
  addUrlParam("max-point", maxPoint);
  addUrlParam("genre", genre);
  addUrlParam("platform", platform);
  word != "" ? addUrlParam("key", word) : "";
  addUrlParam("page", page);
  getParams();
}
function changePage(){
  addUrlParam("page", page);
  getParams();
}
function getParams() {
  let urlParams = new URLSearchParams(window.location.search);
  page = urlParams.get('page') ? urlParams.get('page') : 1 
  let word = urlParams.get("key") ? `&search=${urlParams.get("key")}` : ""
  let genre = urlParams.get('genre') ? urlParams.get('genre') : 'all'
  let platform = urlParams.get('platform') ? urlParams.get('platform') : 'all'
  let minYear = urlParams.get('min-year') ? urlParams.get('min-year') : 1970
  let maxYear = urlParams.get('max-year') ? urlParams.get('max-year') : 2025
  let minPoint = urlParams.get('min-point') ? urlParams.get('min-point'): 1
  let maxPoint = urlParams.get('max-point') ? urlParams.get('max-point'): 100
  getGames(
    `https://api.rawg.io/api/games?key=${key}${word}${genre != 'all' ? `&genres=${genre}` : ''}${platform != 'all' ? `&parent_platforms=${platform}` : ''}&dates=${minYear}-01-01,${maxYear}-12-31&metacritic=${minPoint ==0 ? 1 : minPoint},${maxPoint}&ordering=-rating&page_size=18&page=${page}`
  );
  genreInput.value=urlParams.get('genre') ? urlParams.get('genre') : 'all'
  platformInput.value=urlParams.get('platform') ? urlParams.get('platform') : 'all'
  searchInput.value = urlParams.get('key') ? urlParams.get('key') : ''
}
async function getGames(url) {
  console.log(url);
  document.getElementById("game-loader").style.display = "flex";
  document.getElementById("pagination").style.display = "none";
  document.querySelector("#games-container").innerHTML = "";

  let res = await fetch(url);
  answer = await res.json();
  let list = answer.results;
  console.log(answer);
  paginationControl();
  document.getElementById("game-loader").style.display = "none";
  if (answer.count > 18)
    document.getElementById("pagination").style.display = "flex";

  if (list.length != 0) {
    list.forEach((elem) => {
      let pla = [];
      elem.parent_platforms.forEach((e) => {
        pla.push(cardPlatforms[e.platform.id]);
      });
      document.querySelector("#games-container").innerHTML += `
           <a id="${elem.id}" href="game.html?id=${elem.id}" class="h-auto ">
        <div class="card-parent group">
          <div class="card relative z-10 overflow-hidden ">
            <img loading="lazy" class="w-full object-cover aspect-3/4 " src="${
              elem.background_image
                ? elem.background_image
                : "img/default-poster.jpg"
            }" alt="${elem.name}">
            <div class="glow"></div>
            <div class="flex gap-1 absolute w-full h-full top-0 left-0 p-3 text-white bg-gradient-to-b from-black/30 from-5% via-transparent text-left to-black/30 to-95%%">
            <span class="absolute top-0 right-0 p-3">${elem.rating.toFixed(
              1
            )}</span>
            <span class="absolute top-0 left-0 p-3">${
              elem.metacritic ? elem.metacritic + "%" : ""
            }</span>
             <div class="absolute bottom-0 left-0 flex flex-wrap-reverse items-center  gap-2 text-white p-2">
             ${pla.join(" ")}
             </div>
            
            </div>
          </div>
          <div dir="ltr" class="text-center px-1.5 py-2 opacity-0 invisible transition-all duration-300 -translate-y-1/1 truncate text-white -z-10 group-hover:translate-y-0 group-hover:opacity-100 group-hover:visible">${
            elem.name
          }</div>
        </div>
      </a>
          `;
    });
  } else {
    document.querySelector("#games-container").innerHTML += `
                          <h1 class="block text-center col-span-full text-xl">محتوایی برای نمایش وجود ندارد</h1>

         `;
  }
}

function paginationControl() {
  if (Math.ceil(answer.count / 18) < 500)
    document.querySelector("#end").textContent = Math.ceil(answer.count / 18);
  else document.querySelector("#end").textContent = 500;

  if (page == Math.ceil(answer.count / 18) || page == 500) {
    document.querySelector("#next").disabled = true;
  } else document.querySelector("#next").disabled = false;

  if (page == 1) {
    document.querySelector("#prev").disabled = true;
    document.querySelector("#one").style.backgroundColor = "#4f39f6";
    document.querySelector("#count").style.backgroundColor = "";
    document.querySelector("#count").textContent = Number(
      Math.ceil(document.querySelector("#end").textContent / 2)
    );
  } else {
    document.querySelector("#prev").disabled = false;
    document.querySelector("#one").style.backgroundColor = "";
  }

  if (page == Math.ceil(answer.count / 18) || page == 500) {
    document.querySelector("#end").style.backgroundColor = "#4f39f6";
    document.querySelector("#count").style.backgroundColor = "";
    document.querySelector("#count").textContent = Number(
      Math.ceil(document.querySelector("#end").textContent / 2)
    );
  } else document.querySelector("#end").style.backgroundColor = "";

  if (page != 1 && page != Number(document.querySelector("#end").textContent)) {
    document.querySelector("#count").textContent = page;
    document.querySelector("#count").style.backgroundColor = "#4f39f6";
  }
}
document.querySelector("#next").addEventListener("click", () => {
  page++;
  changePage()
});
document.querySelector("#prev").addEventListener("click", () => {
  page--;
  changePage()
});
document.querySelector("#one").addEventListener("click", () => {
  page = 1;
  changePage()
});
document.querySelector("#end").addEventListener("click", () => {
  page = Number(document.querySelector("#end").textContent);
  changePage()
});
document.querySelector("#count").addEventListener("click", () => {
  page = Number(document.querySelector("#count").textContent);
  changePage()
});

function addUrlParam(key, value) {
  let url = new URL(window.location.href);
  url.searchParams.set(key, value);
  history.pushState({}, "", url);
}

function removeAllUrlParams() {
  let url = new URL(window.location.href);
  url.search = "";
  history.pushState({}, "", url);
}

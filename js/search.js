import { key, cardPlatforms, showVpnModal, addCarts, rotateToMouse, removeLoader } from "./funcs.js";
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
const orderingInput = document.querySelector("#ordering");
let page = 1;
let answer;
let card;
let bounds;
getParams();
removeLoader();

let date = new Date();
noUiSlider.create(slider, {
  start: [1970, date.getFullYear()],
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
  let ordering = orderingInput.value;
  addUrlParam("min-year", minYear);
  addUrlParam("max-year", maxYear);
  addUrlParam("min-point", minPoint);
  addUrlParam("max-point", maxPoint);
  addUrlParam("genre", genre);
  addUrlParam("platform", platform);
  word != "" ? addUrlParam("key", word) : "";
  addUrlParam("ordering", ordering);
  addUrlParam("page", page);
  getParams();
}
function changePage() {
  addUrlParam("page", page);
  getParams();
}
function getParams() {
  let urlParams = new URLSearchParams(window.location.search);
  page = urlParams.get("page") ? urlParams.get("page") : 1;
  let word = urlParams.get("key") ? `&search=${urlParams.get("key")}` : "";
  let genre = urlParams.get("genre") ? urlParams.get("genre") : "all";
  let platform = urlParams.get("platform") ? urlParams.get("platform") : "all";
  let minYear = urlParams.get("min-year") ? urlParams.get("min-year") : 1970;
  let maxYear = urlParams.get("max-year") ? urlParams.get("max-year") : 2025;
  let minPoint = urlParams.get("min-point") ? urlParams.get("min-point") : 1;
  let maxPoint = urlParams.get("max-point") ? urlParams.get("max-point") : 100;
  let ordering = urlParams.get("ordering") ? urlParams.get("ordering") : "-metacritic";
  getGames(`https://api.rawg.io/api/games?key=${key}${word}${genre != "all" ? `&genres=${genre}` : ""}${platform != "all" ? `&parent_platforms=${platform}` : ""}&dates=${minYear}-01-01,${maxYear}-12-31&metacritic=${minPoint == 0 ? 1 : minPoint},${maxPoint}&ordering=${ordering}&page_size=18&page=${page}`);
  genreInput.value = urlParams.get("genre") ? urlParams.get("genre") : "all";
  platformInput.value = urlParams.get("platform") ? urlParams.get("platform") : "all";
  searchInput.value = urlParams.get("key") ? urlParams.get("key") : "";
  orderingInput.value = urlParams.get("ordering") ? urlParams.get("ordering") : "-metacritic";
}
async function getGames(url) {
  document.getElementById("game-loader").style.display = "flex";
  document.getElementById("pagination").style.display = "none";
  document.querySelector("#games-container").innerHTML = "";
  try {
    let res = await fetch(url);
    if (!res.ok) showVpnModal();

    answer = await res.json();
    let list = answer.results;
    console.log(list);
    paginationControl();
    document.getElementById("game-loader").style.display = "none";
    if (answer.count > 18) document.getElementById("pagination").style.display = "flex";

    if (list.length != 0) {
      addCarts("#games-container", list);
      rotateToMouse();
    } else {
      document.querySelector("#games-container").innerHTML += `<h1 class="block text-center col-span-full text-xl">محتوایی برای نمایش وجود ندارد</h1>`;
    }
  } catch (error) {
    console.log(error);
    showVpnModal();
  } finally {
  }
}

function paginationControl() {
  if (Math.ceil(answer.count / 18) < 500) document.querySelector("#end").textContent = Math.ceil(answer.count / 18);
  else document.querySelector("#end").textContent = 500;

  if (page == Math.ceil(answer.count / 18) || page == 500) {
    document.querySelector("#next").disabled = true;
  } else document.querySelector("#next").disabled = false;

  if (page == 1) {
    document.querySelector("#prev").disabled = true;
    document.querySelector("#one").style.backgroundColor = "#4f39f6";
    document.querySelector("#count").style.backgroundColor = "";
    document.querySelector("#count").textContent = Number(Math.ceil(document.querySelector("#end").textContent / 2));
  } else {
    document.querySelector("#prev").disabled = false;
    document.querySelector("#one").style.backgroundColor = "";
  }

  if (page == Math.ceil(answer.count / 18) || page == 500) {
    document.querySelector("#end").style.backgroundColor = "#4f39f6";
    document.querySelector("#count").style.backgroundColor = "";
    document.querySelector("#count").textContent = Number(Math.ceil(document.querySelector("#end").textContent / 2));
  } else document.querySelector("#end").style.backgroundColor = "";

  if (page != 1 && page != Number(document.querySelector("#end").textContent)) {
    document.querySelector("#count").textContent = page;
    document.querySelector("#count").style.backgroundColor = "#4f39f6";
  }
}
document.querySelector("#next").addEventListener("click", () => {
  page++;
  changePage();
});
document.querySelector("#prev").addEventListener("click", () => {
  page--;
  changePage();
});
document.querySelector("#one").addEventListener("click", () => {
  page = 1;
  changePage();
});
document.querySelector("#end").addEventListener("click", () => {
  page = Number(document.querySelector("#end").textContent);
  changePage();
});
document.querySelector("#count").addEventListener("click", () => {
  page = Number(document.querySelector("#count").textContent);
  changePage();
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

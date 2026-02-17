import { key, genres, esrbRatings, changeUpToTop, platforms, addCarts, rotateToMouse, generateSwiper, cardPlatforms, showVpnModal, removeLoader } from "./funcs.js";
const urlParams = new URLSearchParams(window.location.search);
let gameId = urlParams.get("id");
if (!gameId) gameId = 41494;
window.addEventListener("DOMContentLoaded", () => {
  getHeader();
  getScreens();
  changeUpToTop();
});

async function getHeader() {
  try {
    let res = await fetch(`https://api.rawg.io/api/games/${gameId}?key=${key}`);
    if (!res.ok) showVpnModal();
    let response = await res.json();
    document.querySelector("#header-content").innerHTML += `
        <div class="w-full h-full bg-cover " style="background-image: url('${response.background_image}') , url('img/default-bg.jpg');">
            <div class="w-full h-full relative flex items-center bg-gradient-to-l from-black/80 to-transparent">
            <div  class="text-white mt-21 my-5 md:mb-10  flex flex-col items-start gap-4 sm:gap-5 lg:gap-8  pr-5 md:pr-10 w-full xl:w-2/3  lg:items-start lg:pr-20">
              <div class="w-full flex ">
                <img class="${response.reddit_logo ? "" : "hidden"}" width="50px" height="50px" src="${response.reddit_logo}" alt="">
                <h2 class="text-right font-[kalam-bold] text-wrap text-4xl leading-normal bg-gradient-to-b from-white to-gray-400  bg-clip-text text-transparent sm:text-5xl lg:text-6xl ">${response.name}</h2>
              </div>
                 
                <div class="flex flex-col gap-3 sm:gap-5 xl:justify-around">
                <p >تاریخ انتشار: <span> ${response.released ? response.released : "اعلام نشده"}</span></p>
                <p class="">امتیاز منتقدان: <span> ${response.metacritic || "---"}</span></p>
                <p>امتیاز کاربران: <span class=""> ${response.rating.toFixed(1)} از 5</span></p>
                <p>تعداد رای دهندگان: <span class=""> ${response.reviews_count || "---"}</span></p>
                <p>رده سنی: <span class=""> ${response.esrb_rating ? esrbRatings[response.esrb_rating.id].fa : esrbRatings[6].fa}</span></p>
                <p class="${response.playtime == 0 ? "hidden" : ""}">میانگین زمان بازی: <span class=""> ${response.playtime} ساعت </span></p>
                
                </div>
                  <div id="header-platforms" class="flex flex-wrap items-center gap-4 text-xs sm:text-sm">
                    ${response.parent_platforms.map((e) => `<a href="search.html?platform=${e.platform.id}"> ${platforms[e.platform.id]}</a>`).join("")}
                  </div>
                    <div id="header-genres" class="flex flex-wrap items-center gap-2 text-xs sm:text-sm">
                     ${response.genres.map((gen) => ` <a href="search.html?genre=${gen.id}" class="px-2.5 py-0.5 border rounded-4xl  transition-all duration-400 hover:text-indigo-600 ">${genres[gen.id].fa}</a>`).join("")}
                  </div>
              </div>  
            </div>
          </div>
        `;
    document.querySelector("#moreinfo-content").innerHTML += response.description;
    offersGame(response.genres, response.tags);
    removeLoader();
  } catch (error) {
    showVpnModal();
  }
}

async function getScreens() {
  let res = await fetch(`https://api.rawg.io/api/games/${gameId}/screenshots?key=${key}`);
  let response = await res.json();
  let photos = response.results;
  if (photos.length) {
    photos.forEach((elem) => {
      document.querySelector("#screen-swiper-wrapper").innerHTML += `
       <div class="swiper-slide w-full">
                <img class="w-full object-cover" src="${elem.image}" alt="">
              </div>
      `;
      document.querySelector("#thumbsSwiper-wrapper").innerHTML += `
       <div class="swiper-slide w-full opacity-40">
            <a href="javascript:void(0)">
            <img class="w-full h-full object-cover loading-animation" src="${elem.image}" alt="">
            </a>
              </div>
      `;
    });
    const thumbs = new Swiper(".thumbsSwiper", {
      spaceBetween: 10,
      slidesPerView: 3,
      centeredSlides: false,
      watchSlidesProgress: true,
      breakpoints: {
        501: {
          slidesPerView: 4,
        },
        800: {
          slidesPerView: 5,
        },
        1200: {
          slidesPerView: 6,
        },
      },
    });
    const screenshotsGamesSwiper = new Swiper(".screen-swiper", {
      spaceBetween: 10,
      navigation: {
        prevEl: ".screen-swiper-button-next",
        nextEl: ".screen-swiper-button-prev",
      },
      thumbs: {
        swiper: thumbs,
      },
    });
  } else {
    document.querySelector("#screens-swiper").innerHTML = ` <h1 class="text-center mt-15"> تصاویر بیشتری از این بازی وجود ندارد</h1>`;
  }
}

async function offersGame(genres, tags) {
  let firstGenres = genres
    .slice(0, 2)
    .map((g) => g.id)
    .join(",");
  let firstTags = tags
    .slice(0, 2)
    .map((t) => t.id)
    .join(",");
  let res = await fetch(`https://api.rawg.io/api/games?key=${key}&genres=${firstGenres}&tags=${firstTags}&ordering=-released,-rating&page_size=10&exclude=${gameId}`);
  let response = await res.json();
  let list = response.results;
  let onTop = list.filter((g) => g.background_image);
  if (onTop.length !== 0) {
    addCarts("#offers-game-swiper", onTop);
    generateSwiper(".offers-game-swiper");
    rotateToMouse();
  } else document.querySelector(".offers-game-swiper").closest("section").style.display = "none";
}

import {
  key,
  genres,
  esrbRatings,
  changeUpToTop,
  platforms,
  cardPlatforms,
  showVpnModal,
  removeLoader,
} from "./funcs.js";
let card;
let bounds;
const urlParams = new URLSearchParams(window.location.search);
const gameId = urlParams.get("id");
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
        <div class="w-full h-full bg-cover " style="background-image: url('${
          response.background_image
        }') , url('img/search-page-background.png');">
            <div class="w-full h-full relative flex items-center bg-gradient-to-l from-black/80 to-transparent">
            <div  class="text-white mt-21 my-5 md:mb-10  flex flex-col items-start gap-4 sm:gap-5 lg:gap-8  pr-5 md:pr-10 w-full xl:w-2/3  lg:items-start lg:pr-20">
              <div class="w-full flex ">
                <img class="${
                  response.reddit_logo ? "" : "hidden"
                }" width="50px" height="50px" src="${
      response.reddit_logo
    }" alt="">
                <h2 class="text-right font-[kalam-bold] text-wrap text-4xl leading-normal bg-gradient-to-b from-white to-gray-400  bg-clip-text text-transparent sm:text-5xl lg:text-6xl ">${
                  response.name
                }</h2>
              </div>
                 
                <div class="flex flex-col gap-3 sm:gap-5 xl:justify-around">
                <p >تاریخ انتشار: <span> ${
                  response.released ? response.released : "اعلام نشده"
                }</span></p>
                <p class="">امتیاز منتقدان: <span> ${
                  response.metacritic
                }</span></p>
                <p>امتیاز کاربران: <span class=""> ${response.rating.toFixed(
                  1
                )} از 5</span></p>
                <p>تعداد رای دهندگان: <span class=""> ${
                  response.reviews_count
                }</span></p>
                <p>رده سنی: <span class=""> ${
                  response.esrb_rating
                    ? esrbRatings[response.esrb_rating.id].fa
                    : esrbRatings[6].fa
                }</span></p>
                <p class="${
                  response.playtime == 0 ? "hidden" : ""
                }">میانگین زمان بازی: <span class=""> ${
      response.playtime
    } ساعت </span></p>
                
                </div>
                  <div id="header-platforms" class="flex flex-wrap items-center gap-4 text-xs sm:text-sm">
    
                  </div>
                    <div id="header-genres" class="flex flex-wrap items-center gap-2 text-xs sm:text-sm">
                   
                  </div>
                  
              </div>  
            </div>
          </div>
        `;
    document.querySelector("#moreinfo-content").innerHTML += `
                 ${response.description}

        `;
    getHeaderGenres(response.genres);
    getHeaderPlatforms(response.parent_platforms);
    offersGame(response.genres, response.tags);
    removeLoader();
  } catch (error) {
    showVpnModal();
  }
}

async function getScreens() {
  let res = await fetch(
    `https://api.rawg.io/api/games/${gameId}/screenshots?key=${key}`
  );
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
            <img class="w-full object-cover" src="${elem.image}" alt="">
            </a>
              </div>
      `;
    });
    const thumbs = new Swiper(".thumbsSwiper", {
      spaceBetween: 10,
      slidesPerView: 5,
      centeredSlides: true,
      watchSlidesProgress: true,
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
    document.querySelector(
      "#screens-swiper"
    ).innerHTML = ` <h1 class="text-center mt-15"> تصاویر بیشتری از این بازی وجود ندارد</h1>`;
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
  let res = await fetch(
    `https://api.rawg.io/api/games?key=${key}&genres=${firstGenres}&tags=${firstTags}&ordering=-released,-rating&page_size=10&exclude=${gameId}`
  );
  let response = await res.json();
  let list = response.results;
  let onTop = list.filter((g) => g.background_image);
  onTop.forEach((elem) => {
    let pla = [];
    elem.parent_platforms.forEach((e) => {
      pla.push(cardPlatforms[e.platform.id]);
    });
    document.querySelector("#offers-game-swiper").innerHTML += `
      <a id="${elem.id}"  href="game.html?id=${
      elem.id
    }" class=" swiper-slide h-auto ">
          <div class="card-parent group">
            <div class="card relative z-10 overflow-hidden ">
              <img loading="lazy" class="w-full object-cover aspect-3/4 " src="${
                elem.background_image
              }" alt="${elem.name}">
              <div class="glow"></div>
              <div class="flex gap-1 absolute w-full h-full top-0 left-0 p-3 text-white bg-gradient-to-b from-black/30 from-5% via-transparent text-left to-black/30 to-95%%">
              <span class="absolute top-0 right-0 p-3">${elem.rating.toFixed(
                1
              )}</span>
             <div class="absolute bottom-0 left-0 flex flex-wrap-reverse items-center  gap-2 text-white p-2">
                    ${pla.join(" ")}
             </div>
              
              </div>
            </div>
            <div dir="ltr" class="text-center px-1.5 py-2 opacity-0 invisible transition-all duration-300 -translate-y-1/1 truncate text-white -z-10 group-hover:translate-y-0 group-hover:opacity-100 group-hover:visible">${
              elem.name || elem.slug
            }</div>
          </div>
        </a>
      `;
  });
  const offersGamesSwiper = new Swiper(".offers-game-swiper", {
    speed: 500,
    slidesPerView: 2,
    spaceBetween: 15,
    initialSlide: 1,
    centeredSlides: true,
    breakpoints: {
      450: {
        slidesPerView: 3,
      },
      750: {
        spaceBetween: 20,
        slidesPerView: 4,
        initialSlide: 0,
      },
      1024: {
        spaceBetween: 20,
        slidesPerView: 5,
        centeredSlides: false,
        initialSlide: 0,
      },
      1440: {
        spaceBetween: 20,
        centeredSlides: false,
        slidesPerView: 7,
        initialSlide: 0,
      },
    },
  });
  card = document.querySelectorAll(".card");
  card.forEach((elem) => {
    elem.addEventListener("mousemove", (e) => {
      bounds = elem.getBoundingClientRect();
      rotateToMouse(elem, e);
    });
  });
  card.forEach((elem) => {
    elem.addEventListener("mouseleave", () => {
      elem.style.transform = "";
      elem.style.background = "";
    });
  });
}

function getHeaderGenres(gameGenres) {
  gameGenres.forEach((gen) => {
    document.querySelector("#header-genres").innerHTML += `
       <a href="search.html?genre=${
         gen.id
       }" class="px-2.5 py-0.5 border rounded-4xl  transition-all duration-400 hover:text-indigo-600 ">${
      genres[gen.id].fa
    }</a> 
     `;
  });
}

function rotateToMouse(elem, e) {
  const mouseX = e.clientX;
  const mouseY = e.clientY;
  const leftX = mouseX - bounds.x;
  const topY = mouseY - bounds.y;
  const center = {
    x: leftX - bounds.width / 2,
    y: topY - bounds.height / 2,
  };
  const distance = Math.sqrt(center.x ** 2 + center.y ** 2);

  elem.style.transform = `
     scale3d(1.02, 1.02, 1.02)
      rotate3d(
        ${center.y / 100},
        ${-center.x / 100},
        0,
        ${Math.log(distance) * 3}deg
      )
    `;

  elem.querySelector(".glow").style.backgroundImage = `
      radial-gradient(
        circle at
        ${center.x * 2 + bounds.width / 2}px
        ${center.y * 2 + bounds.height / 2}px,
        #ffffff10,
        #00000009
      )
    `;
}
function getHeaderPlatforms(gamePlatform) {
  gamePlatform.forEach((e) => {
    document.querySelector("#header-platforms").innerHTML += `
        <a href="search.html?platform=${e.platform.id}"> ${
      platforms[e.platform.id]
    }</a>
     `;
  });
}

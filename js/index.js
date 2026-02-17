import { key, genres, changeUpToTop, platforms, addCarts, generateSwiper, cardPlatforms, showVpnModal, removeLoader, rotateToMouse } from "./funcs.js";
const accordions = document.querySelectorAll("#accordion");
window.addEventListener("DOMContentLoaded", () => {
  getHeader();
  loadData();
  changeUpToTop();
});
async function getHeader() {
  try {
    let response = await fetch(`https://api.rawg.io/api/games?key=${key}&ordering=-relased&page_size=10&dates=2020-01-01,2026-12-31`);
    if (!response.ok) showVpnModal();
    let res = await response.json();
    let list = res.results;
    let onTop = list.filter((g) => g.background_image);

    onTop.forEach((elem) => {
      document.querySelector("#header-swiper-wrapper").innerHTML += `
          <div class="swiper-slide">
              <div class=" w-screen h-full md:h-screen shrink-0  bg-cover " style=" background-image: url(${elem.background_image}) , url('img/default-bg.jpg')" >
              <div class="w-full h-full relative flex flex-col justify-center items-center lg:items-start lg:pr-25 bg-gradient-to-l from-black/80 to-transparent to-45%">
              
                <div class="animated absolute w-1/1 h-auto z-30 px-5 sm:w-3/4 sm:px-0 lg:w-2/4">
                  <div class="inline-flex items-center gap-3 w-auto  border-1 px-3 py-1 border-gray-300 rounded-full ">
                    <span class="relative flex size-4">
                      <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-indigo-400"></span>
                      <span class="relative inline-flex size-4 rounded-full bg-indigo-500"></span>
                    </span>
                    <span > سرور ها در دسترس هستند</span>
                  </div>
                  <div class="my-7 flex flex-col gap-6 pl-10">
                    <h2 class=" font-[kalam-bold] text-4xl leading-normal bg-gradient-to-b from-white to-gray-400 h-15  bg-clip-text text-transparent sm:text-5xl lg:text-6xl lg:h-20">${elem.name}</h2>
                    <div  class="flex flex-wrap gap-4 items-center">
                   ${elem.parent_platforms.map((el) => `<a href="search.html?platform=${el.platform.id}"> ${platforms[el.platform.id]}</a>`).join("")}
                  </div>
                    <p class=" text-justify text-white opacity-70 leading-7 ">لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است</p>
                  </div>
                  <div class=" flex flex-col gap-2 sm:gap-5">
                  <div class="flex items-center gap-2">
                  ${elem.genres.map((gen) => `<a href="search.html?genre=${gen.id}" class="px-2.5 py-0.5 border rounded-4xl  transition-all duration-400 hover:text-indigo-600 ">${genres[gen.id].fa}</a> `).join("")}
                  </div>
                  <div class="flex gap-2 text-xs ">
                  </div>
                    <button  class="group custom-shadow-2 inline mt-4 max-h-9 w-70 cursor-pointer group overflow-hidden  py-1 px-3 z-50 text-base rounded  font-[kalam] transition-all duration-300 ease-in bg-gradient-to-r from-indigo-700 to-indigo-500 ">
                      <a href="game.html?id=${elem.id}" class=" flex flex-col gap-3 -translate-y-3/5 transition-all duration-200 ease-in group-hover:translate-y-0">
                        <span>مشاهده بازی</span>
                        <span>مشاهده بازی</span>
                      </a>
                    </button>
                  </div>
                </div>
              </div>
              </div>
            </div>
   `;
    });
    removeLoader();
  } catch (error) {
    console.log(error);
    showVpnModal();
  }

  const swiper = new Swiper(".swiper", {
    loop: true,
    speed: 750,
    autoplay: {
      delay: 5000,
    },
    pagination: {
      el: ".swiper-pagination",
      type: "custom",
      renderCustom: function (swiper, current, total) {
        return `<span class="text-white text-4xl lg:text-5xl">${current}</span><span class="text-stone-400 text-xl lg:text-2xl">/ ${total}</span>`;
      },
    },
    breakpoints: {
      600: {
        speed: 1100,
      },
    },
  });
  document.querySelector("#header-prev").addEventListener("click", () => {
    swiper.slidePrev();
  });
  document.querySelector("#header-next").addEventListener("click", () => {
    swiper.slideNext();
  });
}
async function newGems() {
  let res = await fetch(`https://api.rawg.io/api/games?key=${key}&ordering=-added&dates=2022-01-01,2025-12-31&metacritic=80,100&page_size=20`);
  let response = await res.json();
  let list = response.results;
  let onTop = list.filter((g) => g.background_image && g.rating >= 4.0 && g.ratings_count >= 200).splice(0, 10);
  addCarts("#new-game-swiper", onTop);
  generateSwiper(".new-game-swiper");
}
async function topGems() {
  let res = await fetch(`https://api.rawg.io/api/games?key=${key}&ordering=-released,-rating&dates=2015-01-01,2025-12-31&page_size=15`);
  let response = await res.json();
  let list = response.results;
  let onTop = list.filter((g) => g.background_image && g.rating >= 4.0 && g.ratings_count >= 800).splice(0, 10);
  addCarts("#top-game-swiper", onTop);
  generateSwiper(".top-game-swiper");
}
async function featureGems() {
  const today = new Date().toISOString().split("T")[0];
  let res = await fetch(`https://api.rawg.io/api/games?key=${key}&dates=${today},2050-12-31&ordering=-added`);
  let response = await res.json();
  let list = response.results;
  let onTop = list.filter((g) => g.background_image).splice(0, 10);
  addCarts("#feature-game-swiper", onTop);
  generateSwiper(".feature-game-swiper");
}
generateSwiper(".genres-swiper");

async function loadData() {
  try {
    await Promise.all([newGems(), topGems(), featureGems()]);
    rotateToMouse();
  } catch (err) {
    console.log(err);
    showVpnModal();
  }
}
accordions.forEach((elem) => {
  elem.addEventListener("click", () => {
    accordions.forEach((e) => {
      if (e != elem) {
        e.parentElement.style.height = "48px";
        e.querySelector("svg").classList.remove("rotate-180");
      }
    });

    if (elem.parentElement.clientHeight < 50) {
      elem.parentElement.style.height = elem.parentElement.scrollHeight + "px";
      elem.querySelector("svg").classList.add("rotate-180");
    } else {
      elem.parentElement.style.height = "48px";
      elem.querySelector("svg").classList.remove("rotate-180");
    }
  });
});

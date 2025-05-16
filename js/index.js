const navItems = document.querySelectorAll("#nav-items");
const toggleMenu = document.querySelector("#toggle-menu");
const toggleMenuBtn = document.querySelector("#toggle-menu-btn");
const nav = document.querySelector("nav");
const upToTop = document.querySelector("#up-to-top");
const upToTopContainer = document.querySelector("#up-to-top-container");
const accordions = document.querySelectorAll("#accordion");
const genres = {
  4: { en: "Action", fa: "اکشن" },
  3: { en: "Adventure", fa: "ماجراجویی" },
  5: { en: "RPG", fa: "نقش‌آفرینی" },
  10: { en: "Strategy", fa: "استراتژی" },
  2: { en: "Shooter", fa: "تیراندازی" },
  7: { en: "Puzzle", fa: "پازل" },
  1: { en: "Racing", fa: "مسابقه‌ای" },
  15: { en: "Sports", fa: "ورزشی" },
  6: { en: "Fighting", fa: "مبارزه‌ای" },
  14: { en: "Simulation", fa: "شبیه‌سازی" },
  11: { en: "Arcade", fa: "آرکید" },
  83: { en: "Platformer", fa: "پلتفرمر" },
  59: { en: "Massively Multiplayer", fa: "چندنفره گسترده" },
  51: { en: "Indie", fa: "مستقل" },
  40: { en: "Casual", fa: "معمولی" },
  16: { en: "Board Games", fa: "بازی‌های رومیزی" },
  34: { en: "Card", fa: "کارتی" },
  28: { en: "Educational", fa: "آموزشی" },
  19: { en: "Family", fa: "خانوادگی" },
  17: { en: "Horror", fa: "ترس و وحشت" },
  18: { en: "Sandbox", fa: "سندباکس" },
  32: { en: "Open World", fa: "جهان باز" },
  33: { en: "Survival", fa: "بقا" },
  36: { en: "Battle Royale", fa: "بتل رویال" },
  37: { en: "Stealth", fa: "مخفیکاری" },
  31: { en: "Visual Novel", fa: "رمان تصویری" },
  24: { en: "Turn-Based", fa: "نوبتی" },
  25: { en: "Tactical", fa: "تاکتیکی" },
  30: { en: "Metroidvania", fa: "مترویدوانیا" },
  29: { en: "Roguelike", fa: "روگلایک" },
  38: { en: "Souls-like", fa: "سولز-لایک" },
  26: { en: "Beat 'em up", fa: "بیت ام آپ" },
  35: { en: "MOBA", fa: "موبا" },
  27: { en: "MMORPG", fa: "ام‌ام‌او‌آر‌پی‌جی" }
};
const esrbRatings = {
  1: { en: "Everyone", fa: "(همه سنین)" },
  2: { en: "Everyone 10+", fa: " (۱۰+)" },
  3: { en: "Teen", fa: " (۱۳+)" },
  4: { en: "Mature", fa: " (۱۷+)" },
  5: { en: "Adults Only", fa: "(۱۸+)" },
  6: { en: "Rating Pending", fa: "در انتظار رده‌بندی" },
};
window.addEventListener("load", () => {
  let content = document.querySelector('.content')
  let loaderContent = document.querySelector('.loader-container')
  content.classList.remove('hidden')
  loaderContent.style.display='none'
})
window.addEventListener("scroll", () => {
  let navOffsetTop = window.scrollY;
  if (navOffsetTop >= 70) {
    nav.style.backgroundColor = "oklch(0.129 0.042 264.695)";
    nav.style.paddingBlock = "0px";
  } else {
    nav.style.backgroundColor = "";
    nav.style.paddingBlock = "";
  }

  changeUpToTop();
});
window.addEventListener("DOMContentLoaded", () => {
  getHeader()
  changeUpToTop();
});
async function getHeader(){
   let response = await fetch('https://api.rawg.io/api/games?key=dc71f8491ea14dc3a3f0bce8294043e4&dates=2024-01-01,2024-12-31&ordering=-added&page_size=5')
   let res = await response.json()
   let list = res.results
   console.log(list);
  list.forEach(elem=>{
    
 document.querySelector('#header-swiper-wrapper').innerHTML+=`
   <div class="swiper-slide">
              <div class=" w-screen h-[80vh] md:h-screen shrink-0  bg-cover " style=" background-image: url('${elem.background_image}')" >
              <div class="w-full h-full relative flex flex-col justify-center items-center lg:items-start lg:pr-25 bg-gradient-to-l from-black/80 to-transparent">
              
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
                    <div>
                    <a href="search.html/${elem.esrb_rating ? elem.esrb_rating.id : 6}" class="px-2.5 py-0.5 border rounded-4xl text-xs transition-all duration-400 hover:text-indigo-600 ">${elem.esrb_rating ? esrbRatings[elem.esrb_rating.id].fa : esrbRatings[6].fa}</a>
                    </div>
                    <p class=" text-justify text-white opacity-70 leading-7 ">لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است</p>
                  </div>
                  <div class=" flex flex-col gap-2 sm:gap-5">
                      <div id="${elem.id}" class="flex gap-2 text-xs ">
                  </div>
                    <button  class="group custom-shadow-2 inline mt-4 max-h-9 w-70 cursor-pointer group overflow-hidden  py-1 px-3 z-50 text-base rounded  font-[kalam] transition-all duration-300 ease-in bg-gradient-to-r from-indigo-700 to-indigo-500 ">
                      <a href="game.html/${elem.id}" class=" flex flex-col gap-3 -translate-y-3/5 transition-all duration-200 ease-in group-hover:translate-y-0">
                        <span>مشاهده بازی</span>
                        <span>مشاهده بازی</span>
                      </ش>
                    </button>
                  </div>
                </div>
              </div>
              </div>
            </div>
   `
   getGenres(elem);
   
  })
   
  const swiper = new Swiper(".swiper", {
    loop: true,
    speed: 600,
    autoplay: {
      delay: 4000, 
     
    },
    pagination: {
      el: ".swiper-pagination",
      type: "custom",
      renderCustom: function (swiper, current, total) {
        return `<span class="text-white text-4xl lg:text-5xl">${current}</span><span class="text-stone-400 text-xl lg:text-2xl">/ ${total}</span>`;
      },
    },
    breakpoints:{
      600:{
      speed: 1100,

      }
    }
  });
  document.querySelector('#header-prev').addEventListener('click' , ()=>{
    swiper.slidePrev()
  })
  document.querySelector('#header-next').addEventListener('click' , ()=>{
    swiper.slideNext()
  })
}
function getGenres(elem){
let genreWrapper =  document.getElementById(elem.id)
    elem.genres.forEach(e=> {
    genreWrapper.innerHTML+=
       `<a href="search.html/${e.id}" class="px-2.5 py-0.5 border rounded-4xl  transition-all duration-400 hover:text-indigo-600 ">${genres[e.id].fa}</a> `
    
    })
}

const commentSwiper = new Swiper(".comment-swiper", {
  loop: true,
  speed: 500,
  slidesPerView: 1,
  initialSlide: 4,
  spaceBetween: 20,
  centeredSlides:true,
  grabCursor: true,
  pagination: {
    el: ".swiper--pagination",
    clickable: true,
  },
  breakpoints: {
    640: {
      slidesPerView: 2,

    },
    1024: {
      slidesPerView: 3,
      spaceBetween: 30,
    },
    1280: {
      slidesPerView: 4,
    },
  },
 
});


toggleMenuBtn.addEventListener("click", () => {
  toggleMenu.classList.toggle("translate-x-3/2");
  if (toggleMenu.classList.contains("translate-x-3/2")) {
    toggleMenuBtn.innerHTML = `   <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 64 64"
        width="40"
        height="40"
      >
        <linearGradient
          id="BTq72ScaTZ1UBmT8omo2pa"
          x1="32"
          x2="32"
          y1="5.333"
          y2="59.867"
          gradientUnits="userSpaceOnUse"
          spreadMethod="reflect"
        >
          <stop offset="0" stop-color="#1a6dff" />
          <stop offset="1" stop-color="#c822ff" />
        </linearGradient>
        <path
          fill="url(#BTq72ScaTZ1UBmT8omo2pa)"
          d="M32,58C17.663,58,6,46.337,6,32S17.663,6,32,6s26,11.663,26,26S46.337,58,32,58z M32,8 C18.767,8,8,18.767,8,32s10.767,24,24,24s24-10.767,24-24S45.233,8,32,8z"
        />
        <linearGradient
          id="BTq72ScaTZ1UBmT8omo2pb"
          x1="32"
          x2="32"
          y1="5.333"
          y2="59.867"
          gradientUnits="userSpaceOnUse"
          spreadMethod="reflect"
        >
          <stop offset="0" stop-color="#1a6dff" />
          <stop offset="1" stop-color="#c822ff" />
        </linearGradient>
        <path
          fill="url(#BTq72ScaTZ1UBmT8omo2pb)"
          d="M32,52c-11.028,0-20-8.972-20-20s8.972-20,20-20s20,8.972,20,20S43.028,52,32,52z M32,14 c-9.925,0-18,8.075-18,18s8.075,18,18,18s18-8.075,18-18S41.925,14,32,14z"
        />
        <linearGradient
          id="BTq72ScaTZ1UBmT8omo2pc"
          x1="32"
          x2="32"
          y1="21.5"
          y2="26.336"
          gradientUnits="userSpaceOnUse"
          spreadMethod="reflect"
        >
          <stop offset="0" stop-color="#6dc7ff" />
          <stop offset="1" stop-color="#e6abff" />
        </linearGradient>
        <path
          fill="url(#BTq72ScaTZ1UBmT8omo2pc)"
          d="M42,25c0,0.552-0.448,1-1,1H23c-0.552,0-1-0.448-1-1v-2c0-0.552,0.448-1,1-1h18 c0.552,0,1,0.448,1,1V25z"
        />
        <linearGradient
          id="BTq72ScaTZ1UBmT8omo2pd"
          x1="32"
          x2="32"
          y1="29.333"
          y2="34.5"
          gradientUnits="userSpaceOnUse"
          spreadMethod="reflect"
        >
          <stop offset="0" stop-color="#6dc7ff" />
          <stop offset="1" stop-color="#e6abff" />
        </linearGradient>
        <path
          fill="url(#BTq72ScaTZ1UBmT8omo2pd)"
          d="M42,33c0,0.552-0.448,1-1,1H23c-0.552,0-1-0.448-1-1v-2c0-0.552,0.448-1,1-1h18 c0.552,0,1,0.448,1,1V33z"
        />
        <linearGradient
          id="BTq72ScaTZ1UBmT8omo2pe"
          x1="32"
          x2="32"
          y1="37"
          y2="41.337"
          gradientUnits="userSpaceOnUse"
          spreadMethod="reflect"
        >
          <stop offset="0" stop-color="#6dc7ff" />
          <stop offset="1" stop-color="#e6abff" />
        </linearGradient>
        <path
          fill="url(#BTq72ScaTZ1UBmT8omo2pe)"
          d="M42,41c0,0.552-0.448,1-1,1H23c-0.552,0-1-0.448-1-1v-2c0-0.552,0.448-1,1-1h18 c0.552,0,1,0.448,1,1V41z"
        />
      </svg>`;
  } else {
    toggleMenuBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="40" height="40">
        <linearGradient id="NHD9gZdQDJj0HA67oC7KMa" x1="32" x2="32" y1="5" y2="59.134" gradientUnits="userSpaceOnUse" spreadMethod="reflect">
          <stop offset="0" stop-color="#1a6dff"/>
          <stop offset="1" stop-color="#c822ff"/>
        </linearGradient>
        <path fill="url(#NHD9gZdQDJj0HA67oC7KMa)" d="M32,58C17.663,58,6,46.337,6,32S17.663,6,32,6s26,11.663,26,26S46.337,58,32,58z M32,8 C18.767,8,8,18.767,8,32s10.767,24,24,24s24-10.767,24-24S45.233,8,32,8z"/>
        <linearGradient id="NHD9gZdQDJj0HA67oC7KMb" x1="32" x2="32" y1="5" y2="59.134" gradientUnits="userSpaceOnUse" spreadMethod="reflect">
          <stop offset="0" stop-color="#1a6dff"/>
          <stop offset="1" stop-color="#c822ff"/>
        </linearGradient>
        <path fill="url(#NHD9gZdQDJj0HA67oC7KMb)" d="M32,52c-11.028,0-20-8.972-20-20s8.972-20,20-20s20,8.972,20,20S43.028,52,32,52z M32,14 c-9.925,0-18,8.075-18,18s8.075,18,18,18s18-8.075,18-18S41.925,14,32,14z"/>
        <linearGradient id="NHD9gZdQDJj0HA67oC7KMc" x1="32" x2="32" y1="20.833" y2="42.698" gradientUnits="userSpaceOnUse" spreadMethod="reflect">
          <stop offset="0" stop-color="#6dc7ff"/>
          <stop offset="1" stop-color="#e6abff"/>
        </linearGradient>
        <path fill="url(#NHD9gZdQDJj0HA67oC7KMc)" d="M40.692,24.724l-1.417-1.417c-0.41-0.41-1.076-0.41-1.486,0L32,29.097l-5.789-5.789 c-0.41-0.41-1.076-0.41-1.486,0l-1.417,1.417c-0.41,0.41-0.41,1.076,0,1.486L29.097,32l-5.789,5.789c-0.41,0.41-0.41,1.076,0,1.486 l1.417,1.417c0.41,0.41,1.076,0.41,1.486,0L32,34.903l5.789,5.789c0.41,0.41,1.076,0.41,1.486,0l1.417-1.417 c0.41-0.41,0.41-1.076,0-1.486L34.903,32l5.789-5.789C41.103,25.8,41.103,25.135,40.692,24.724z"/>
      </svg>`;
  }
});
navItems.forEach((elm) => {
  elm.addEventListener("click", (s) => {
    if (window.innerWidth < 1024) {
      if (
        (s.target.nodeName == "A" || s.target.nodeName == "svg") &&
        s.target.parentElement == elm
      ) {
        navItems.forEach((e) => {
          e.style.height = "48px";
        });
        let elemHeight = elm.scrollHeight;
        if (elm.getBoundingClientRect().height < 50) {
          elm.style.height = elemHeight + "px";
          elm.classList.remove("max-h-12");
        } else {
          elm.style.height = "48px";
        }
      }
    }
  });
});

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

function changeUpToTop() {
  if (window.scrollY > 650) {
    upToTopContainer.style.opacity = "1";
    upToTopContainer.style.visibility = "visible";
  } else {
    upToTopContainer.style.opacity = "0";
    upToTopContainer.style.visibility = "hidden";
  }

  let windowHeight = document.documentElement.scrollHeight - window.innerHeight;
  let scrollHeight = Math.floor((window.scrollY / windowHeight) * 100);
  upToTop.style.width = scrollHeight + "%";
}


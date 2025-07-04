 import {key , genres , esrbRatings , changeUpToTop ,platforms , cardPlatforms} from "./funcs.js";
let card ;
let bounds;
const accordions = document.querySelectorAll("#accordion");
window.addEventListener("DOMContentLoaded", () => {
  getHeader()
  document.querySelector('.content').classList.remove('hidden')
  document.querySelector('.loader-container').style.display='none'
  changeUpToTop();
  newGems()
  topGems()
  featureGems()
});
async function getHeader(){
   let response = await fetch(`https://api.rawg.io/api/games?key=${key}&ordering=-released,-rating&page_size=10&dates=2020-01-01,2025-12-31`)
   let res = await response.json()
   let  list= res.results
   let onTop = list.filter(g =>g.background_image)

  onTop.forEach(elem=>{ 
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
                    <div id="${elem.id}header-platforms" class="flex flex-wrap gap-4 items-center">
                   
                    
                  </div>
                    <p class=" text-justify text-white opacity-70 leading-7 ">لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است</p>
                  </div>
                  <div class=" flex flex-col gap-2 sm:gap-5">
                      <div id="${elem.id}header-genres" class="flex gap-2 text-xs ">
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
   `   
   getGenres(elem);
   getPlatforms(elem);
   
  })
   
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

async function newGems() {
   let res = await fetch(`https://api.rawg.io/api/games?key=${key}&ordering=-added&dates=2022-01-01,2025-12-31&metacritic=80,100&page_size=20`)
   let response = await res.json()
   let list = response.results
   let onTop = list.filter(g=> g.background_image && g.rating >= 4.0 && g.ratings_count >= 200)
   let duration = 600
   onTop.forEach(elem=>{
      let pla=[]
    elem.parent_platforms.forEach(e=>{
      pla.push(cardPlatforms[e.platform.id])      
    })
      duration=duration < 2000 ? duration + 200 : 2000       
    document.querySelector('#new-game-swiper').innerHTML+=`
    <a id="${elem.id}" data-aos="fade-left" data-aos-duration="${duration}" href="game.html?id=${elem.id}" class=" swiper-slide h-auto ">
        <div class="card-parent group">
          <div class="card relative z-10 overflow-hidden ">
            <img loading="lazy" class="w-full object-cover aspect-3/4 " src="${elem.background_image}" alt="${elem.name}">
            <div class="glow"></div>
            <div class="flex gap-1 absolute w-full h-full top-0 left-0 p-3 text-white bg-gradient-to-b from-black/30 from-5% via-transparent text-left to-black/30 to-95%%">
            <span class="absolute top-0 right-0 p-3">${elem.rating.toFixed(1)}</span>
             <div class="absolute bottom-0 left-0 flex flex-wrap-reverse items-center  gap-2 text-white p-2">
                   ${pla.join(' ')}
             </div>
            
            </div>
          </div>
          <div dir="ltr" class="text-center px-1.5 py-2 opacity-0 invisible transition-all duration-300 -translate-y-1/1 truncate text-white -z-10 group-hover:translate-y-0 group-hover:opacity-100 group-hover:visible">${elem.name || elem.slug}</div>
        </div>
      </a>
    `
   })
   const newGamesSwiper = new Swiper(".new-game-swiper", {
  speed: 500,
  slidesPerView:2,
  spaceBetween: 15,
  
  initialSlide:1 ,
  centeredSlides:true,
  breakpoints: {
   450:{
        slidesPerView:3,

    },
    750: {
      spaceBetween: 20,
      slidesPerView: 4,
      initialSlide:0 ,
      
    },
    1024: {
      spaceBetween: 20,
      slidesPerView: 5,
      centeredSlides:false,
      initialSlide:0 ,
    },
    1440: {
      spaceBetween: 20,
      centeredSlides:false,
      slidesPerView: 7,
      initialSlide:0 ,
    },
  },
 
 });
     card = document.querySelectorAll('.card');
  card.forEach(elem=>{
    elem.addEventListener('mousemove', (e) => {
        bounds = elem.getBoundingClientRect();
          rotateToMouse(elem , e)
      });
  })
  card.forEach(elem=>{
      elem.addEventListener('mouseleave', () => {
        elem.style.transform = '';
        elem.style.background = '';
      });
  
  })
  }
async function topGems() {
   let res = await fetch(`https://api.rawg.io/api/games?key=${key}&ordering=-released,-rating&dates=2015-01-01,2025-12-31&page_size=15`)
   let response = await res.json()
   let list = response.results   
      let onTop = list.filter(g=> g.background_image && g.rating >= 4.0 && g.ratings_count >= 800)
      let duration = 800
      onTop.forEach(elem=>{
     let pla=[]
    elem.parent_platforms.forEach(e=>{
      pla.push(cardPlatforms[e.platform.id])      
    })
      duration=duration < 2000 ? duration + 200 : 2000      
    document.querySelector('#top-game-swiper').innerHTML+=`
    <a id="${elem.id}" data-aos="fade-left" data-aos-duration="${duration}" href="game.html?id=${elem.id}" class=" swiper-slide h-auto ">
        <div class="card-parent group">
          <div class="card relative z-10 overflow-hidden ">
            <img loading="lazy" class="w-full object-cover aspect-3/4 " src="${elem.background_image}" alt="${elem.name}">
            <div class="glow"></div>
            <div class="flex gap-1 absolute w-full h-full top-0 left-0 p-3 text-white bg-gradient-to-b from-black/30 from-5% via-transparent text-left to-black/30 to-95%%">
            <span class="absolute top-0 right-0 p-3">${elem.rating.toFixed(1)}</span>
             <div class="absolute bottom-0 left-0 flex flex-wrap-reverse items-center  gap-2 text-white p-2">
                   ${pla.join(' ')}
           </div>
            
            </div>
          </div>
          <div dir="ltr" class="text-center px-1.5 py-2 opacity-0 invisible transition-all duration-300 -translate-y-1/1 truncate text-white -z-10 group-hover:translate-y-0 group-hover:opacity-100 group-hover:visible">${elem.name || elem.slug}</div>
        </div>
      </a>
    `
   })
   const topGamesSwiper = new Swiper(".top-game-swiper", {
  speed: 500,
  slidesPerView:2,
  spaceBetween: 15,
  
  initialSlide:1 ,
  centeredSlides:true,
  breakpoints: {
    450:{
        slidesPerView:3,
    },
    750: {
      spaceBetween: 20,
      slidesPerView: 4,
     initialSlide:0 ,
      
    },
    1024: {
      spaceBetween: 20,
      slidesPerView: 5,
      centeredSlides:false,
     initialSlide:0 ,
    },
    1440: {
      spaceBetween: 20,
      centeredSlides:false,
      slidesPerView: 7,
      initialSlide:0 ,
    },
  },
 
 });
     card = document.querySelectorAll('.card');
  card.forEach(elem=>{
    elem.addEventListener('mousemove', (e) => {
        bounds = elem.getBoundingClientRect();
          rotateToMouse(elem , e)
      });
  })
  card.forEach(elem=>{
      elem.addEventListener('mouseleave', () => {
        elem.style.transform = '';
        elem.style.background = '';
      });
  
  })
  }
async function featureGems() {
  const today = new Date().toISOString().split('T')[0];
   let res = await fetch(`https://api.rawg.io/api/games?key=${key}&dates=${today},2050-12-31&ordering=-added`)
   let response = await res.json()
   
   let list = response.results
   
   let onTop = list.filter(g=> g.background_image)
    let duration = 800
   onTop.forEach(elem=>{
      let pla=[]
    elem.parent_platforms.forEach(e=>{
      pla.push(cardPlatforms[e.platform.id])      
    })
      duration=duration < 2000 ? duration + 200 : 2000      
    document.querySelector('#feature-game-swiper').innerHTML+=`
    <a id="${elem.id}" data-aos="fade-left" data-aos-duration="${duration}" href="game.html?id=${elem.id}" class=" swiper-slide h-auto ">
        <div class="card-parent group">
          <div class="card relative z-10 overflow-hidden ">
            <img loading="lazy" class="w-full object-cover aspect-3/4 " src="${elem.background_image}" alt="${elem.name}">
            <div class="glow"></div>
            <div class="flex gap-1 absolute w-full h-full top-0 left-0 p-3 text-white bg-gradient-to-b from-black/30 from-5% via-transparent text-left to-black/30 to-95%%">
            <span class="absolute top-0 right-0 p-3 text-sm">${elem.released}</span>
             <div class="absolute bottom-0 left-0 flex flex-wrap-reverse items-center  gap-2 text-white p-2">
            ${pla.join(' ')}
           </div>
            
            </div>
          </div>
          <div dir="ltr" class="text-center px-1.5 py-2 opacity-0 invisible transition-all duration-300 -translate-y-1/1 truncate text-white -z-10 group-hover:translate-y-0 group-hover:opacity-100 group-hover:visible">${elem.name || elem.slug}</div>
        </div>
      </a>
    `
   })
   const featureGamesSwiper = new Swiper(".feature-game-swiper", {
  speed: 500,
  slidesPerView:2,
  spaceBetween: 15,
  
  initialSlide:1 ,
  centeredSlides:true,
  breakpoints: {
    450:{
        slidesPerView:3,
    },
    750: {
      spaceBetween: 20,
      slidesPerView: 4,
     initialSlide:0 ,
      
    },
    1024: {
      spaceBetween: 20,
      slidesPerView: 5,
      centeredSlides:false,
     initialSlide:0 ,
    },
    1440: {
      spaceBetween: 20,
      centeredSlides:false,
      slidesPerView: 7,
      initialSlide:0 ,
    },
  },
 
 });
     card = document.querySelectorAll('.card');
  card.forEach(elem=>{
    elem.addEventListener('mousemove', (e) => {
        bounds = elem.getBoundingClientRect();
          rotateToMouse(elem , e)
      });
  })
  card.forEach(elem=>{
      elem.addEventListener('mouseleave', () => {
        elem.style.transform = '';
        elem.style.background = '';
      });
  
  })
  }

const genresSwiper = new Swiper(".genres-swiper", {
  speed: 500,
  slidesPerView:3,
  spaceBetween: 15,
  
  initialSlide:1 ,
  centeredSlides:true,
  breakpoints: {
    750: {
      spaceBetween: 20,
      slidesPerView: 4,
        initialSlide:0 ,
      },
      1024: {
        slidesPerView: 5,
        centeredSlides:false,
        initialSlide:0 ,
      },
      1440: {
        centeredSlides:false,
        slidesPerView: 7,
        initialSlide:0 ,
    },
  },
 
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
function rotateToMouse(elem , e) {        
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    const leftX = mouseX - bounds.x;
    const topY = mouseY - bounds.y;
    const center = {
      x: leftX - bounds.width / 2,
      y: topY - bounds.height / 2
    }
    const distance = Math.sqrt(center.x**2 + center.y**2);
    
    elem.style.transform = `
     scale3d(1.02, 1.02, 1.02)
      rotate3d(
        ${center.y / 100},
        ${-center.x / 100},
        0,
        ${Math.log(distance)* 3}deg
      )
    `;
    
    elem.querySelector('.glow').style.backgroundImage = `
      radial-gradient(
        circle at
        ${center.x * 2 + bounds.width/2}px
        ${center.y * 2 + bounds.height/2}px,
        #ffffff10,
        #00000009
      )
    `;
  }
function getPlatforms(elem){
let platformWrapper =  document.getElementById(elem.id+'header-platforms')
   elem.parent_platforms.forEach(e=> {
   platformWrapper.innerHTML+=
       `        <a href="search.html?platform=${e.platform.id}"> ${platforms[e.platform.id]}</a>
        `
    
    })
}
function getGenres(elem){
let genreWrapper =  document.getElementById(elem.id+'header-genres')
    elem.genres.forEach(e=> {
    genreWrapper.innerHTML+=
       `<a href="search.html?genre=${e.id}" class="px-2.5 py-0.5 border rounded-4xl  transition-all duration-400 hover:text-indigo-600 ">${genres[e.id].fa}</a> `
    
    })
}
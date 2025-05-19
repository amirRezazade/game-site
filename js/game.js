 import {key , genres , esrbRatings , changeUpToTop , getGenres } from "./funcs.js";


 window.addEventListener('DOMContentLoaded' , ()=>{
    getHeader()
      document.querySelector('.content').classList.remove('hidden')
  document.querySelector('.loader-container').style.display='none'
 })

 async function getHeader(){
    let res= await fetch(`https://api.rawg.io/api/games/51325?key=dc71f8491ea14dc3a3f0bce8294043e4`)
    let response = await res.json()
    console.log(response);
    // response.forEach(elem => {
        document.querySelector('#header-content').innerHTML+=`
        <div class="w-full h-full bg-cover " style="background-image: url('${response.background_image}');">
            <div class="w-full h-full relative bg-gradient-to-l from-black/40 from-10% to-transparent ">
              <div class="text-white flex flex-col gap-3 pr-5 absolute top-1/2">
                <h2 class=" font-[kalam-bold] text-4xl leading-normal bg-gradient-to-b from-white to-gray-400 h-15  bg-clip-text text-transparent sm:text-5xl lg:text-6xl lg:h-20">${response.name}</h2>
                <span>${response.rating.toFixed(1)}</span>
                  <div class="flex flex-wrap items-center gap-2 text-xs sm:text-sm">
                    <a href="search.html?genre=51" class="px-2.5 py-0.5 border rounded-4xl  transition-all duration-400 hover:text-indigo-600 ">مستقل</a>
                    <a href="search.html?genre=51" class="px-2.5 py-0.5 border rounded-4xl  transition-all duration-400 hover:text-indigo-600 ">مستقل</a>
                    <a href="search.html?genre=51" class="px-2.5 py-0.5 border rounded-4xl  transition-all duration-400 hover:text-indigo-600 ">مستقل</a>

                  </div>
         
                  <div class="flex flex-wrap items-center gap-2 text-xs sm:text-sm">
                    <a href="search.html?genre=51" class="px-2.5 py-0.5 border rounded-4xl  transition-all duration-400 hover:text-indigo-600 ">مستقل</a>
                    <a href="search.html?genre=51" class="px-2.5 py-0.5 border rounded-4xl  transition-all duration-400 hover:text-indigo-600 ">مستقل</a>
                    <a href="search.html?genre=51" class="px-2.5 py-0.5 border rounded-4xl  transition-all duration-400 hover:text-indigo-600 ">مستقل</a>

                  </div>
                  <span>${response.released}</span>
              </div>  
            </div>
          </div>
        `
    // });
    
 }
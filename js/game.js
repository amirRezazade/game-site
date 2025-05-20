 import {key , genres , esrbRatings , changeUpToTop , getGenres ,platforms } from "./funcs.js";

const urlParams = new URLSearchParams(window.location.search);
const gameId = urlParams.get('id');
 window.addEventListener('DOMContentLoaded' , ()=>{
    getHeader()
      document.querySelector('.content').classList.remove('hidden')
  document.querySelector('.loader-container').style.display='none'
 })

 async function getHeader(){
    let res= await fetch(`https://api.rawg.io/api/games/${gameId}?key=${key}`)
    let response = await res.json()
    console.log(response);    
       let platforms =[]
    response.parent_platforms.forEach(e=> {
      platforms.push( e.platform.id) 
    })  
        document.querySelector('#header-content').innerHTML+=`
        <div class="w-full h-full bg-cover " style="background-image: url('${response.background_image}');">
            <div class="w-full h-full relative flex items-center bg-gradient-to-l from-black/80 to-transparent">
            <div  class="text-white flex flex-col gap-9 pr-5 w-2/3  justify-center items-center lg:items-start lg:pr-25">
              <div class="w-full">
                <img class="${response.reddit_logo ? '' : 'hidden'}" width="50px" height="50px" src="${response.reddit_logo}" alt="">
                <h2 class="text-right font-[kalam-bold] text-wrap text-4xl leading-normal bg-gradient-to-b from-white to-gray-400  bg-clip-text text-transparent sm:text-5xl lg:text-6xl ">${response.name}</h2>
              </div>
                 
                <div class="flex flex-col  gap-5">
                <p >تاریخ انتشار: <span> ${ response.released ? response.released : 'اعلام نشده'}</span></p>
                <p class="${response.tba==true ? 'hidden' : ''}">آخرین آپدیت: <span> ${response.updated.slice(0,10)}</span></p>
                <p>امتیاز: <span class=""> ${response.rating.toFixed(1)} از 5</span></p>
                <p>تعداد رای دهندگان: <span class=""> ${response.reviews_count	}</span></p>
                <p>رده سنی: <span class=""> ${response.esrb_rating ? esrbRatings[response.esrb_rating.id].fa : esrbRatings[6].fa}</span></p>
                <p class="${response.playtime==0 ? 'hidden' : ''}">میانگین زمان بازی: <span class=""> ${response.playtime} ساعت </span></p>
                
                </div>
                  <div id="header-platforms" class="flex flex-wrap items-center gap-4 text-xs sm:text-sm">
    
                  </div>
                    <div id="header-genres" class="flex flex-wrap items-center gap-2 text-xs sm:text-sm">
                   
                  </div>
                  
              </div>  
            </div>
          </div>
        `
        getHeaderGenres(response.genres)
        getHeaderPlatforms(response.parent_platforms)

    
 }
 function getHeaderGenres(gameGenres){
   gameGenres.forEach(gen=>{
     document.querySelector('#header-genres').innerHTML+=`
       <a href="search.html?genre=${gen.id}" class="px-2.5 py-0.5 border rounded-4xl  transition-all duration-400 hover:text-indigo-600 ">${genres[gen.id].fa}</a>
     `
   })
 }
 function getHeaderPlatforms(gamePlatform){
   gamePlatform.forEach(gen=>{
     document.querySelector('#header-platforms').innerHTML+= platforms[gen.platform.id]

   })
 }
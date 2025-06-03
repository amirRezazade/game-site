 import {key , genres , esrbRatings , changeUpToTop ,platforms , cardPlatforms} from "./funcs.js";

const slider = document.getElementById('slider-year');
const minYear = document.getElementById('min-year');
const maxYear = document.getElementById('max-year');
const pointSlider = document.getElementById('slider-point');
const minPoint = document.getElementById('min-point');
const maxPoint = document.getElementById('max-point');
const searchBtn = document.querySelector('#search-btn');
const genreInput = document.querySelector('#genre');
const platformInput = document.querySelector('#platforms');
const searchInput = document.querySelector('#search-input');
  
  window.addEventListener('DOMContentLoaded' , ()=>{
       document.querySelector('.content').classList.remove('hidden')
     document.querySelector('.loader-container').style.display='none'
     })

        noUiSlider.create(slider, {
          start: [1888, 2025],
          connect: true,
          step: 1,
          direction: 'ltr',
          range: {
            min: 1888,
            max: 2025
          },
          format: {
            to: value => Math.round(value), // اعداد انگلیسی
            from: value => Number(value)
          }
        });
      
        slider.noUiSlider.on('update', (values, handle) => {
          if (handle === 0) minYear.textContent = values[0];
          else maxYear.textContent = values[1];
        });
        noUiSlider.create(pointSlider, {
          start: [0, 100],
          connect: true,
          step: 1,
          direction: 'ltr',
          range: {
            min: 0,
            max: 100
          },
          format: {
            to: value =>Number(value), // اعداد انگلیسی
            from: value => Number(value)
          }
        });
      
        pointSlider.noUiSlider.on('update', (values, handle) => {
          if (handle === 0) minPoint.textContent = values[0];
          else maxPoint.textContent = values[1];
        });
      


        searchBtn.addEventListener('click' , getParams)
      function getParams(){
     
           const yearValues = slider.noUiSlider.get(); // مقدار هر دو دسته
           const pointValues = pointSlider.noUiSlider.get(); // مقدار هر دو دسته
           let minYear = yearValues[0]
           let maxYear = yearValues[1]
           let minPoint = pointValues[0]
           let maxPoint = pointValues[1]
           let word = searchInput.value.trim() ?  `&search=${searchInput.value.trim()}`: ''
           let genre = genreInput.value != 'all' ? `&genres=${genreInput.value}` : ''
           let platform = platformInput.value != 'all' ? `&parent_platforms=${platformInput.value}` : ''
           console.log(word);
           
              console.log(`https://api.rawg.io/api/games?key=${key}${word}${genre}${platform}&dates=${minYear}-01-01,${maxYear}-12-31&ordering=-rating&metacritic=${minPoint},${maxPoint}&page_size=10`)
              getGames(`https://api.rawg.io/api/games?key=${key}${word}${genre}${platform}&dates=${minYear}-01-01,${maxYear}-12-31&ordering=-rating&metacritic=${minPoint},${maxPoint}&page_size=18&page=1`)
             
      }
     async function getGames(url){
        document.querySelector('#games-container').innerHTML=''
        
        let res =await fetch(url)
        let answer=await res.json()
        let list = answer.results
        console.log(list);
        list.forEach(elem => {
            let pla=[]
    elem.parent_platforms.forEach(e=>{
      pla.push(cardPlatforms[e.platform.id])      
    })
          document.querySelector('#games-container').innerHTML+=`
           <a id="${elem.id}" href="game.html?id=${elem.id}" class="h-auto ">
        <div class="card-parent group">
          <div class="card relative z-10 overflow-hidden ">
            <img loading="lazy" class="w-full object-cover aspect-3/4 " src="${elem.background_image}" alt="${elem.name}">
            <div class="glow"></div>
            <div class="flex gap-1 absolute w-full h-full top-0 left-0 p-3 text-white bg-gradient-to-b from-black/30 from-5% via-transparent text-left to-black/30 to-95%%">
            <span class="absolute top-0 right-0 p-3">${elem.rating.toFixed(1)}</span>
            <span class="absolute top-0 left-0 p-3">${elem.metacritic ? elem.metacritic+'%' : ''}</span>
             <div class="absolute bottom-0 left-0 flex flex-wrap-reverse items-center  gap-2 text-white p-2">
             ${pla.join(' ')}
             </div>
            
            </div>
          </div>
          <div dir="ltr" class="text-center px-1.5 py-2 opacity-0 invisible transition-all duration-300 -translate-y-1/1 truncate text-white -z-10 group-hover:translate-y-0 group-hover:opacity-100 group-hover:visible">${elem.name}</div>
        </div>
      </a>
          `
          
        });
        
      }
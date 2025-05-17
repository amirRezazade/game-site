const key = 'dc71f8491ea14dc3a3f0bce8294043e4'
const upToTop = document.querySelector("#up-to-top");
const upToTopContainer = document.querySelector("#up-to-top-container");
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
function getGenres(elem){
let genreWrapper =  document.getElementById(elem.id)
    elem.genres.forEach(e=> {
    genreWrapper.innerHTML+=
       `<a href="search.html?genre=${e.id}" class="px-2.5 py-0.5 border rounded-4xl  transition-all duration-400 hover:text-indigo-600 ">${genres[e.id].fa}</a> `
    
    })
}
export {key , genres , esrbRatings , changeUpToTop , getGenres }
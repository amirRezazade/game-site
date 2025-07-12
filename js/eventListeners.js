import { changeUpToTop } from "./funcs.js";

const navItems = document.querySelectorAll("#nav-items");
const toggleMenu = document.querySelector("#toggle-menu");
const toggleMenuBtn = document.querySelector("#toggle-menu-btn");
const nav = document.querySelector("nav");
const navSearchToggle = document.querySelector("#nav-search-toggle");

window.addEventListener("load", () => {
  changeUpToTop();
});
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
navSearchToggle.addEventListener("click", (e) => {
  document.querySelector("#nav-search-parent").classList.toggle("opacity-0");
  document.querySelector("#nav-search-parent").classList.toggle("invisible");
});

const navSearchInput = document.querySelector("#nav-input");
document
  .querySelector("#nav-search-btn")
  .addEventListener(
    "click",
    () => (location.href = `search.html?key=${navSearchInput.value}`)
  );
navSearchInput.addEventListener("keyup", (event) => {
  if (event.keyCode == 13)
    location.href = `search.html?key=${navSearchInput.value}`;
});

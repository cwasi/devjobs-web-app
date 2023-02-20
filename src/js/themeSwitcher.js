"use strict";

const themeSwitch = document.querySelector(".toggle__input");
const body = document.querySelector("body");

let getMode = localStorage.getItem("theme");
if (getMode && getMode === "dark") {
  body.classList.add("dark-mode");
  themeSwitch.checked = true;
} else {
  body.classList.remove("dark-mode");
  themeSwitch.checked = false;
}

themeSwitch.addEventListener("click", (e) => {
  if (themeSwitch.checked === true) {
    localStorage.setItem("theme", "dark");
    body.classList.add("dark-mode");
  } else {
    localStorage.setItem("theme", "light");
    body.classList.remove("dark-mode");
  }
});

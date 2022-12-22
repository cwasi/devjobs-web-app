"use strict";

const themeSwitcher = document.querySelector(".toggle__input");
const body = document.querySelector("body");

let getMode = localStorage.getItem("theme");
if (getMode && getMode === "dark") {
  body.classList.add("dark-mode");
  themeSwitcher.classList.add("active");
}

themeSwitcher.addEventListener("click", (e) => {
  body.classList.toggle("dark-mode");

  if (!body.classList.contains("dark-mode")) {
    return localStorage.setItem("theme", "light");
  }
  localStorage.setItem("theme", "dark");
});

themeSwitcher.addEventListener("click", () =>
  themeSwitcher.classList.toggle("active")
);

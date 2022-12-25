"use strict";

import JSONData from "../data/data.json" assert { type: "json" };

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const jobsContainer = document.querySelector(".jobs__container");
const locationInput = document.querySelector(".filter-by-location");
const modalLocationInput = document.querySelector(".modal__filter-by-location");
const searchBtn = document.querySelector(".search-btn");
const checkBox = document.querySelector(".check-box");
const modalCheckBox = document.querySelector(".modal__check-box");
const searchInput = document.querySelector(".search__input");
const modalSearchBtn = document.querySelector(".modal__search-btn");
const searchBtnSm = document
  .querySelector(".search__form")
  .lastElementChild.querySelector(".btn-s");
const btnFilter = document.querySelector(".btn-filter");
let checkboxState;

const filteredBySearch = function (jobs, searchInput) {
  const input = searchInput.trim().toLowerCase();

  return jobs.filter((item) => {
    return (
      item.position.toLowerCase().includes(input) ||
      item.company.toLowerCase().includes(input)
    );
  });
};

const filteredByLocation = function (jobs, input) {
  return jobs.slice().filter((item) => {
    if (item.location.toLowerCase() === input.trim().toLowerCase()) {
      return item;
    }
  });
};

/////////////////////////////////////////////////////////////////

const displayJobs = function (jobs, searchInput, locationInput) {
  jobsContainer.innerHTML = "";

  let filtered;

  if (searchBtn) {
    filtered = filteredBySearch(jobs, searchInput);
  }

  if (locationInput) {
    filtered = locationInput
      ? filteredByLocation(filtered, locationInput)
      : jobs;
  }

  if (checkboxState) {
    filtered = filtered.filter((item) => {
      if (item.contract.toLowerCase() === "Full Time".toLowerCase()) {
        return item;
      }
    });
  }

  filtered.forEach((job) => {
    const html = `<a href="#" class="job-card job-card-${job.id}">
        <div class="icon__company-box" style="background-color:${job.logoBackground}">
          <img
            src="${job.logo}"
            alt="logo of scoot company"
            class="icon"
          />
        </div>
        
        <div class="job-card__body">
          <div class="job-card__time-box text-color-dark-gray">
            <span class="job-card__time__posted">${job.postedAt}</span>
            <div class="dot"></div>
            <span class="job-card__work-time">${job.contract}</span>
          </div>
          <h3 class="job-card__title heading-3 m-top--75">
          ${job.position}
          </h3>
          <p class="text-color-dark-gray m-top--75">${job.company}</p>
          <p
            class="job-card__country text-color-violet font-w-bold m-top-a">
            ${job.location}
          </p>
        </div>
        </a>`;

    jobsContainer.insertAdjacentHTML("beforeend", html);
  });
};

displayJobs(JSONData, searchInput.value, locationInput.value);

const openModal = function (e) {
  e.preventDefault(e);
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

///////////////////////////////////////////////////////////////////

if (searchBtn) {
  searchBtn.addEventListener("click", (e) => {
    e.preventDefault();

    checkboxState = checkBox.checked ? true : "";
    displayJobs(JSONData, searchInput.value, locationInput.value);
  });
}
if (searchBtnSm) {
  searchBtnSm.addEventListener("click", (e) => {
    e.preventDefault();
    checkboxState = checkBox.checked ? true : "";
    displayJobs(JSONData, searchInput.value, locationInput.value);
  });
}

modalSearchBtn.addEventListener("click", (e) => {
  checkboxState = modalCheckBox.checked ? true : "";
  displayJobs(JSONData, searchInput.value, modalLocationInput.value);
});

if (btnFilter) {
  btnFilter.addEventListener("click", openModal);
}

jobsContainer.addEventListener("click", (e) => {
  e.preventDefault();

  const jobCard = e.target.closest(".job-card");
  const jobPosition = jobCard
    .querySelector(".heading-3")
    .textContent.trim()
    .toLowerCase();

  localStorage.setItem("position", `${jobPosition}`);
  window.location.href = "./src/pages/detail.html";
});

///////////////////////////////////////
// Modal window

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

overlay.addEventListener("click", closeModal);

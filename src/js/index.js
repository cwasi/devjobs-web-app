"use strict";

import JSONData from "../data/data.json" assert { type: "json" };

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const jobsContainer = document.querySelector(".jobs__container");
const locationInput = document.querySelector(".filter-by-location");
const modalLocationInput = document.querySelector(".modal__filter-by-location");
const btnSearch = document.querySelector(".search-btn");
const checkBox = document.querySelector(".check-box");
const modalCheckBox = document.querySelector(".modal__check-box");
const searchInput = document.querySelector(".search__input");
const btnModalSearch = document.querySelector(".modal__search-btn");
let loadMoreBtn = document.querySelector(".load-more");
const btnContainer = document.querySelector(".jobs__button-box");
const jobsNumInfo = document.querySelector(".jobs-num-info");
const btnClearAllFilter = document.querySelector(".btn-clear-all-filters");
const searchBtnSm = document
  .querySelector(".search__form")
  .lastElementChild.querySelector(".btn-s");
const btnFilter = document.querySelector(".btn-filter");
let checkboxState;
let InitialJobCards = 12;
let loadJobCard = 12;

///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////
// Functions
const jobCardHTML = function (job) {
  return `<a href="${job.position}" class="job-card job-card-${job.id}">
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
};

const displayNoMoreJobs = function () {
  const p = document.createElement("p");
  p.style.display = "none";
  btnContainer.style.width = "100%";
  p.textContent = "No more jobs!";
  p.classList.add("text-color-dark-gray");
  p.style.backgroundColor = "#4b4c501a";
  p.style.textAlign = "center";
  p.style.padding = "2rem 0";
  p.style.borderRadius = ".6rem";
  p.style.display = "block";
  btnContainer.insertAdjacentElement("afterbegin", p);
};
const displayloadMoreBtn = function () {
  btnContainer.innerHTML = "";
  loadMoreBtn = document.createElement("button");
  loadMoreBtn.textContent = "Load more";
  loadMoreBtn.classList.add("btn", "btn__primary-default", "load-more");
  btnContainer.insertAdjacentElement("afterbegin", loadMoreBtn);

  btnContainer
    .querySelector(".load-more")
    .addEventListener("click", loadMoreJobCards.bind(JSONData));
};

const displayNumOfJobs = function (num) {
  jobsNumInfo.classList.remove("d-n");
  jobsNumInfo.firstElementChild.textContent = `You're seeing ${num} jobs`;
};

const filteredBySearch = function (jobs, searchInput) {
  const input = searchInput.trim().toLowerCase();

  return jobs.filter((item) => {
    return (
      item.position.toLowerCase().includes(input) ||
      item.company.toLowerCase().includes(input)
    );
  });
};

const filteredByLocation = function (jobs, locationInput) {
  const input = locationInput.trim().toLowerCase();
  return jobs
    .slice()
    .filter((item) => item.location.toLowerCase().includes(input));
};

const displayJobs = function (jobs, searchInput, locationInput, checkboxState) {
  
  if (!searchInput && !locationInput && !checkboxState) {
    return;
  }
  console.log("enter was pressed");

  jobsContainer.innerHTML = "";
  let filtered;

  if (btnSearch) {
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
    const html = jobCardHTML(job);
    jobsContainer.insertAdjacentHTML("beforeend", html);
  });

  if (jobsContainer.childElementCount < loadJobCard) {
    btnContainer.innerHTML = "";

    displayNoMoreJobs();
  }
  displayNumOfJobs(jobsContainer.childElementCount);
};

const loadInitialtJobs = function (data) {
  const jobCards = data;
  let displayJobCard = "";
  let counter = 0;
  jobsContainer.innerHTML = "";

  for (let jobCard of jobCards) {
    if (counter < InitialJobCards) {
      displayJobCard += jobCardHTML(jobCard);
    }
    counter++;
  }
  jobsContainer.insertAdjacentHTML("beforeend", displayJobCard);
};

const loadMoreJobCards = function () {
  const jobCards = this;
  const currentDisplayJobCard = jobsContainer.childElementCount;

  let displayJobCard = "";
  let counter = 0;
  for (let jobCard of jobCards) {
    if (
      counter >= currentDisplayJobCard &&
      counter < loadJobCard + currentDisplayJobCard
    ) {
      displayJobCard += jobCardHTML(jobCard);
    }
    counter++;
  }
  jobsContainer.insertAdjacentHTML("beforeend", displayJobCard);

  if (jobsContainer.childElementCount === jobCards.length) {
    displayNoMoreJobs();
    loadMoreBtn.style.display = "none";
  }
};

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
///////////////////////////////////////////////////////////////////
// Event Handlers

loadMoreBtn.addEventListener("click", loadMoreJobCards.bind(JSONData));

if (btnSearch) {
  btnSearch.addEventListener("click", (e) => {
    e.preventDefault();
    checkboxState = checkBox.checked ? true : "";
    displayJobs(
      JSONData,
      searchInput.value,
      locationInput.value,
      checkboxState
    );
  });
}

if (searchBtnSm) {
  searchBtnSm.addEventListener("click", (e) => {
    e.preventDefault();
    checkboxState = checkBox.checked ? true : "";
    displayJobs(
      JSONData,
      searchInput.value,
      locationInput.value,
      checkboxState
    );
  });
}

btnModalSearch.addEventListener("click", (e) => {
  e.preventDefault();
  checkboxState = modalCheckBox.checked ? true : "";
  displayJobs(
    JSONData,
    searchInput.value,
    modalLocationInput.value,
    checkboxState
  );
});

if (btnFilter) {
  btnFilter.addEventListener("click", openModal);
}

btnClearAllFilter.addEventListener("click", (e) => {
  searchInput.value = locationInput.value = "";
  checkBox.checked = checkboxState = false;
  jobsNumInfo.classList.add("d-n");
  btnContainer.style.width = "8.813rem";

  loadInitialtJobs(JSONData);
  displayloadMoreBtn();
});

jobsContainer.addEventListener("click", (e) => {
  e.preventDefault();

  const jobCard = e.target.closest(".job-card");

  if (!jobCard) {
    return;
  }

  const jobPosition = jobCard
    .querySelector(".heading-3")
    .textContent.trim()
    .toLowerCase();

  localStorage.setItem("position", `${jobPosition}`);
  window.location.href = "./src/pages/detail.html";
});

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

document.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    displayJobs(
      JSONData,
      searchInput.value,
      modalLocationInput.value,
      checkboxState
    );
  }
});

overlay.addEventListener("click", closeModal);

loadInitialtJobs(JSONData);

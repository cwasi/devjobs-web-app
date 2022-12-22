"use strict";

import JSONData from "../data/data.json" assert { type: "json" };

const jobsContainer = document.querySelector(".jobs__container");
const locationInput = document.querySelector(".filter-by-location");
const searchBtn = document.querySelector(".search-btn");
const checkBox = document.querySelector(".check-box");
const searchInput = document.querySelector(".search__input");
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

  let n = filteredBySearch(jobs, searchInput);

  if (locationInput) {
    n = locationInput ? filteredByLocation(n, locationInput) : jobs;
  }

  if (checkboxState) {
    n = n.filter((item) => {
      if (item.contract.toLowerCase() === "Full Time".toLowerCase()) {
        return item;
      }
    });
  }

  n.forEach((job) => {
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

///////////////////////////////////////////////////////////////////

if (searchBtn) {
  searchBtn.addEventListener("click", (e) => {
    e.preventDefault();

    checkboxState = checkBox.checked ? true : "";
    displayJobs(JSONData, searchInput.value, locationInput.value);
  });
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

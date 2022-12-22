"use strict";

import JSONData from "../data/data.json" assert { type: "json" };

const text = document.querySelector("#text");
const detailContainer = document.querySelector(".detail__title__container");
const titleIconBox = document.querySelector(".title__logo-box");
const titleIcon = document.querySelector(".icon");
const titleBody = document.querySelector(".title__body");
const detailTitleBox = document.querySelector(".detail__title-box");
const detailBody = document.querySelector(".detail__body");
const unorderedList = detailBody.querySelector(".list__unordered");
const orderedList = document.querySelector(".list__ordered");
const footerHeading = document
  .querySelector(".footer__text-box")
  .querySelector(".heading-3");

const title = localStorage.getItem("position");
const data = JSONData;

const jobDetails = data.filter((item) => {
  if (item.position.toLowerCase().trim() === title) {
    return item;
  }
})[0];


const renderUI = function (jobDetails) {
  titleIconBox.style.backgroundColor = `${jobDetails.logoBackground}`;
  titleIcon.setAttribute("src", `${jobDetails.logo}`.replace("/src", "."));
  titleIcon.setAttribute("alt", `${jobDetails.company} Logo`);

  const titleBodyHTML = `
        <h3 class="title__text heading-3">${jobDetails.company}</h3>
        <div class="title__link text-color-dark-gray">${jobDetails.company}.com</div>
  `;

  const detailTitelHTML = `
  <div class="detail__title-box">
  <div class="job-card__time-box text-color-dark-gray">
  <span class="job-card__time__posted">${jobDetails.postedAt}</span>
  <div class="dot"></div>
  <span class="job-card__work-time">${jobDetails.contract}</span>
  </div>
  <h1 class="heading-1 m-top-0--5">${jobDetails.position}</h1>
  <p class="text-color-violet font-w-bold">${jobDetails.location}</p>
  </div>
  `;
  
  detailBody.querySelector('.description').textContent=jobDetails.description
  detailBody.querySelector('.requirement-content').textContent=jobDetails.requirements.content
  detailBody.querySelector('.role-content').textContent=jobDetails.role.content
  
  jobDetails.requirements.items.forEach((list) => {
    const html = `<li class="list__item">
        <p class="list__item__text">${list}</p>
        </li>
        `;
    unorderedList.insertAdjacentHTML("beforeend", html);
  });

  jobDetails.role.items.forEach((list) => {
    const html = `<ol class="list__item">
      <p class="list__item__text">${list}</p>
      </ol>`;

    orderedList.insertAdjacentHTML("beforeend", html);
  });

  titleBody.innerHTML = titleBodyHTML;
  detailTitleBox.innerHTML = detailTitelHTML;
  footerHeading.textContent = jobDetails.position;
};


renderUI(jobDetails);

'use strict';



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });


// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");
// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {

    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }

  });
}
  
const downloadBtn = document.querySelectorAll("[download-btn]");
for (let i = 0; i < downloadBtn.length; i++) {

  downloadBtn[i].addEventListener("click", function () {
    const link = document.createElement('a');
      link.href = './assets/files/Resume.pdf';
      link.download = 'Resume.pdf'; 
      link.target = "_blank";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
  });
} 
function updateCreditsClass() {
  var pageHeight = document.querySelector("[data-full-page]")?.offsetHeight + 120;
  var windowHeight = window.innerHeight;
  var credits = document.querySelector(".template-credits");
  if(pageHeight < windowHeight) {
    if(!credits.classList.contains("credits-small")){
      credits.classList.add("credits-small");
    }
  } else {
    if(credits.classList.contains("credits-small")){
      credits.classList.remove("credits-small");
    }
  }
}
updateCreditsClass();
window.addEventListener('resize', updateCreditsClass);
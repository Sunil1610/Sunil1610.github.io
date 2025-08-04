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

// Ideas toggle functionality
const ideasToggle = document.querySelector(".ideas-toggle");
const ideasDetails = document.querySelector(".ideas-details");

if (ideasToggle && ideasDetails) {
  ideasToggle.addEventListener("click", function (e) {
    e.preventDefault();
    ideasDetails.style.display = ideasDetails.style.display === "none" ? "block" : "none";
  });
  
  // Close modal when clicking outside
  ideasDetails.addEventListener("click", function (e) {
    if (e.target === ideasDetails) {
      closeIdeas();
    }
  });
}

// Ideas carousel functionality
let currentCardIndex = 0;
const totalCards = 4;

function scrollIdeas(direction) {
  if (direction === 'left') {
    currentCardIndex = (currentCardIndex - 1 + totalCards) % totalCards;
  } else {
    currentCardIndex = (currentCardIndex + 1) % totalCards;
  }
  
  updateCarousel();
}

function updateCarousel() {
  const cards = document.querySelectorAll(".idea-card");
  const isMobile = window.innerWidth <= 768;
  
  cards.forEach((card, index) => {
    const cardIndex = parseInt(card.dataset.index);
    let transform = '';
    let opacity = 0.6;
    let zIndex = 1;
    let border = '1px solid #9c27b0';
    let textColor = '#ccc';
    let titleColor = '#fff';
    
    // Mobile adjustments
    const mobileTranslate = isMobile ? 100 : 200;
    const mobileScale = isMobile ? 0.7 : 0.8;
    const farTranslate = isMobile ? 200 : 400;
    const farScale = isMobile ? 0.5 : 0.6;
    
    // Calculate position based on current index
    if (cardIndex === currentCardIndex) {
      // Active card (center)
      transform = 'scale(1)';
      opacity = 1;
      zIndex = 3;
      border = '2px solid #ff6b35';
      textColor = '#fff';
      titleColor = '#fff';
    } else if (cardIndex === (currentCardIndex + 1) % totalCards) {
      // Next card (right)
      transform = `scale(${mobileScale}) translateX(${mobileTranslate}px)`;
      opacity = 0.8;
      zIndex = 2;
      border = '1px solid #4ecdc4';
      textColor = '#ccc';
      titleColor = '#fff';
    } else if (cardIndex === (currentCardIndex - 1 + totalCards) % totalCards) {
      // Previous card (left)
      transform = `scale(${mobileScale}) translateX(-${mobileTranslate}px)`;
      opacity = 0.8;
      zIndex = 2;
      border = '1px solid #45b7d1';
      textColor = '#ccc';
      titleColor = '#fff';
    } else {
      // Far cards
      transform = `scale(${farScale}) translateX(${farTranslate}px)`;
      opacity = 0.6;
      zIndex = 1;
      border = '1px solid #9c27b0';
      textColor = '#ccc';
      titleColor = '#fff';
    }
    
    // Apply styles
    card.style.transform = transform;
    card.style.opacity = opacity;
    card.style.zIndex = zIndex;
    card.style.border = border;
    card.style.background = '#2a2a2a';
    
    // Update text colors
    const title = card.querySelector('h4');
    const text = card.querySelector('p');
    if (title) title.style.color = titleColor;
    if (text) text.style.color = textColor;
  });
}

// Close ideas modal
function closeIdeas() {
  const ideasDetails = document.querySelector(".ideas-details");
  if (ideasDetails) {
    ideasDetails.style.display = "none";
  }
}

// Technologies infinite scroll functionality
function initTechnologiesScroll() {
  const technologiesList = document.querySelector(".technologies-list");
  if (!technologiesList) return;

  // Clone the items for infinite scroll
  const items = technologiesList.querySelectorAll(".technologies-item");
  items.forEach(item => {
    const clone = item.cloneNode(true);
    technologiesList.appendChild(clone);
  });

  let isScrolling = true;
  let animationId = null;

  function animateScroll() {
    if (!isScrolling) return;
    
    technologiesList.scrollLeft += 1;
    
    // Reset to beginning when reaching the end of original content
    if (technologiesList.scrollLeft >= technologiesList.scrollWidth / 2) {
      technologiesList.scrollLeft = 0;
    }
    
    animationId = requestAnimationFrame(animateScroll);
  }

  // Start scrolling
  animateScroll();

  // Pause on hover
  technologiesList.addEventListener('mouseenter', () => {
    isScrolling = false;
    if (animationId) {
      cancelAnimationFrame(animationId);
      animationId = null;
    }
  });

  // Resume on mouse leave
  technologiesList.addEventListener('mouseleave', () => {
    isScrolling = true;
    animateScroll();
  });
}

// Initialize technologies scroll when page loads
document.addEventListener('DOMContentLoaded', function() {
  initTechnologiesScroll();
});
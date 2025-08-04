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
    const isOpen = ideasDetails.style.display === "none" || ideasDetails.style.display === "";
    ideasDetails.style.display = isOpen ? "block" : "none";
    
    if (isOpen) {
      updateCarousel(); // Update carousel when modal opens
      initTouchSupport(); // Initialize touch support
      // Prevent body scroll on mobile
      if (window.innerWidth <= 767) {
        document.body.style.overflow = 'hidden';
      }
    } else {
      // Restore body scroll
      document.body.style.overflow = '';
    }
  });
  
  // Close modal when clicking outside
  ideasDetails.addEventListener("click", function (e) {
    if (e.target === ideasDetails) {
      closeIdeas();
    }
  });
}

// Touch support for mobile and tablet carousel
function initTouchSupport() {
  const carousel = document.querySelector(".ideas-carousel");
  if (!carousel || window.innerWidth > 767) return;

  let startX = 0;
  let isDragging = false;

  carousel.addEventListener('touchstart', function(e) {
    startX = e.touches[0].clientX;
    isDragging = true;
  }, { passive: true });

  carousel.addEventListener('touchmove', function(e) {
    if (!isDragging) return;
    e.preventDefault();
  }, { passive: false });

  carousel.addEventListener('touchend', function(e) {
    if (!isDragging) return;
    isDragging = false;

    const endX = e.changedTouches[0].clientX;
    const diffX = startX - endX;

    // Minimum swipe distance
    if (Math.abs(diffX) > 50) {
      if (diffX > 0) {
        // Swipe left - next card
        scrollIdeas('right');
      } else {
        // Swipe right - previous card
        scrollIdeas('left');
      }
    }
  }, { passive: true });
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
  const isMobile = window.innerWidth <= 480;
  const isTablet = window.innerWidth > 480 && window.innerWidth <= 767;
  
  if (isMobile) {
    // Mobile: Show only one card at a time, stack layout
    cards.forEach((card, index) => {
      const cardIndex = parseInt(card.dataset.index);
      
      if (cardIndex === currentCardIndex) {
        card.classList.add('active');
        card.style.display = 'block';
        card.style.position = 'relative';
        card.style.transform = 'none';
        card.style.opacity = '1';
        card.style.zIndex = '1';
        card.style.border = '2px solid #ff6b35';
        card.style.background = '#2a2a2a';
        card.style.width = '100%';
        card.style.maxWidth = 'none';
        card.style.marginBottom = '20px';
      } else {
        card.classList.remove('active');
        card.style.display = 'none';
      }
      
      // Ensure text is readable on mobile
      const title = card.querySelector('h4');
      const text = card.querySelector('p');
      if (title) title.style.color = '#fff';
      if (text) text.style.color = '#fff';
    });
  } else if (isTablet) {
    // Tablet: Modified carousel with better spacing
    cards.forEach((card, index) => {
      const cardIndex = parseInt(card.dataset.index);
      let transform = '';
      let opacity = 0.6;
      let zIndex = 1;
      let border = '1px solid #9c27b0';
      let textColor = '#ccc';
      let titleColor = '#fff';
      
      // Reset mobile styles
      card.style.display = 'block';
      card.classList.remove('active');
      
      // Tablet adjustments - smaller translations for better fit
      const tabletTranslate = 150;
      const tabletScale = 0.85;
      const farTranslate = 300;
      const farScale = 0.7;
      
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
        transform = `scale(${tabletScale}) translateX(${tabletTranslate}px)`;
        opacity = 0.8;
        zIndex = 2;
        border = '1px solid #4ecdc4';
        textColor = '#ccc';
        titleColor = '#fff';
      } else if (cardIndex === (currentCardIndex - 1 + totalCards) % totalCards) {
        // Previous card (left)
        transform = `scale(${tabletScale}) translateX(-${tabletTranslate}px)`;
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
  } else {
    // Desktop: Original carousel behavior
    cards.forEach((card, index) => {
      const cardIndex = parseInt(card.dataset.index);
      let transform = '';
      let opacity = 0.6;
      let zIndex = 1;
      let border = '1px solid #9c27b0';
      let textColor = '#ccc';
      let titleColor = '#fff';
      
      // Reset mobile styles
      card.style.display = 'block';
      card.classList.remove('active');
      
      // Desktop adjustments
      const desktopTranslate = 200;
      const desktopScale = 0.8;
      const farTranslate = 400;
      const farScale = 0.6;
      
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
        transform = `scale(${desktopScale}) translateX(${desktopTranslate}px)`;
        opacity = 0.8;
        zIndex = 2;
        border = '1px solid #4ecdc4';
        textColor = '#ccc';
        titleColor = '#fff';
      } else if (cardIndex === (currentCardIndex - 1 + totalCards) % totalCards) {
        // Previous card (left)
        transform = `scale(${desktopScale}) translateX(-${desktopTranslate}px)`;
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
}

// Close ideas modal
function closeIdeas() {
  const ideasDetails = document.querySelector(".ideas-details");
  if (ideasDetails) {
    ideasDetails.style.display = "none";
    // Restore body scroll
    document.body.style.overflow = '';
  }
}

// Technologies infinite scroll functionality
function initTechnologiesScroll() {
  const technologiesList = document.querySelector(".technologies-list");
  if (!technologiesList) return;

  // Check if device is mobile
  const isMobile = window.innerWidth <= 768;
  
  // Only enable auto-scroll on desktop to prevent mobile scroll issues
  if (isMobile) {
    // On mobile, just enable manual scrolling without auto-animation
    technologiesList.style.overflowX = 'auto';
    technologiesList.style.scrollBehavior = 'smooth';
    return;
  }

  // Clone the items for infinite scroll (desktop only)
  const items = technologiesList.querySelectorAll(".technologies-item");
  items.forEach(item => {
    const clone = item.cloneNode(true);
    technologiesList.appendChild(clone);
  });

  let isScrolling = true;
  let animationId = null;
  let scrollSpeed = 0.5; // Reduced speed for smoother animation

  function animateScroll() {
    if (!isScrolling) return;
    
    technologiesList.scrollLeft += scrollSpeed;
    
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
  
  // Pause on focus (accessibility)
  technologiesList.addEventListener('focus', () => {
    isScrolling = false;
    if (animationId) {
      cancelAnimationFrame(animationId);
      animationId = null;
    }
  });
  
  // Resume on blur
  technologiesList.addEventListener('blur', () => {
    isScrolling = true;
    animateScroll();
  });
}

// Initialize technologies scroll when page loads
document.addEventListener('DOMContentLoaded', function() {
  initTechnologiesScroll();
  updateCarousel(); // Initialize carousel on page load
});

// Handle window resize for responsive behavior
window.addEventListener('resize', function() {
  // Re-initialize technologies scroll on resize
  initTechnologiesScroll();
  // Update carousel layout on resize
  updateCarousel();
});
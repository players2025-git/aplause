const slides = document.querySelectorAll('.carousel-slide');
const dots = document.querySelectorAll('.dot');
const nextBtn = document.querySelector('.next');
const prevBtn = document.querySelector('.prev');

let index = 0;
let autoSlide;

function showSlide(n) {
  slides.forEach((slide, i) => {
    slide.classList.remove('active');
    dots[i].classList.remove('active');
  });
  slides[n].classList.add('active');
  dots[n].classList.add('active');

  // Smooth background color transition
  document.querySelector('.carousel-container').style.backgroundColor =
    getComputedStyle(slides[n]).getPropertyValue('--bg-color');
}

function nextSlide() {
  index = (index + 1) % slides.length;
  showSlide(index);
}

function prevSlide() {
  index = (index - 1 + slides.length) % slides.length;
  showSlide(index);
}

nextBtn.addEventListener('click', () => {
  nextSlide();
  resetAutoSlide();
});

prevBtn.addEventListener('click', () => {
  prevSlide();
  resetAutoSlide();
});

dots.forEach((dot, i) => {
  dot.addEventListener('click', () => {
    index = i;
    showSlide(index);
    resetAutoSlide();
  });
});

function startAutoSlide() {
  autoSlide = setInterval(nextSlide, 5000);
}

function resetAutoSlide() {
  clearInterval(autoSlide);
  startAutoSlide();
}

startAutoSlide();

  // Scroll-triggered animation
  const scrollElements = document.querySelectorAll(".about-container, .about-image, .about-content");

  const elementInView = (el, offset = 100) => {
    const elementTop = el.getBoundingClientRect().top;
    return (
      elementTop <= (window.innerHeight || document.documentElement.clientHeight) - offset
    );
  };

  const displayScrollElement = (element) => {
    element.classList.add('scroll-visible');
    element.classList.remove('scroll-hidden');
  };

  const hideScrollElement = (element) => {
    element.classList.add('scroll-hidden');
    element.classList.remove('scroll-visible');
  };

  const handleScrollAnimation = () => {
    scrollElements.forEach((el) => {
      if (elementInView(el, 120)) {
        displayScrollElement(el);
      } else {
        hideScrollElement(el);
      }
    });
  };

  window.addEventListener('scroll', handleScrollAnimation);
  // Run on load
  handleScrollAnimation();

const abtSlides = document.querySelectorAll('.abt-slide');
const abtNext = document.querySelector('.abt-next');
const abtPrev = document.querySelector('.abt-prev');
let abtIndex = 0;
let abtInterval;

function abtShowSlide(index) {
  abtSlides.forEach((slide, i) => {
    slide.classList.remove('abt-active');
    if (i === index) slide.classList.add('abt-active');
  });
}

function abtNextSlide() {
  abtIndex = (abtIndex + 1) % abtSlides.length;
  abtShowSlide(abtIndex);
}

function abtPrevSlide() {
  abtIndex = (abtIndex - 1 + abtSlides.length) % abtSlides.length;
  abtShowSlide(abtIndex);
}

abtNext.addEventListener('click', () => {
  abtNextSlide();
  abtResetAuto();
});
abtPrev.addEventListener('click', () => {
  abtPrevSlide();
  abtResetAuto();
});

function abtStartAuto() {
  abtInterval = setInterval(abtNextSlide, 15000);
}
function abtResetAuto() {
  clearInterval(abtInterval);
  abtStartAuto();
}
abtStartAuto();

const abtCarousel = document.querySelector('.abt-carousel');
abtCarousel.addEventListener('mouseenter', () => clearInterval(abtInterval));
abtCarousel.addEventListener('mouseleave', abtStartAuto);
// Hamburger menu functionality
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');
const drops = document.querySelectorAll('.drop');

// Toggle mobile menu
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('sho');
    navLinks.classList.toggle('active');
});

// Close menu when clicking on a link (mobile)
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            
            // Close any open dropdowns
            document.querySelectorAll('.dropdown').forEach(dropdown => {
                dropdown.classList.remove('active');
            });
        }
    });
});

// Mobile dropdown functionality
drops.forEach(drop => {
    const dropdown = drop.querySelector('.dropdown');
    
    drop.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
            e.preventDefault();
            dropdown.classList.toggle('show');
            
            // Rotate caret icon
            const icon = drop.querySelector('i');
            if (dropdown.classList.contains('show')) {
                icon.style.transform = 'rotate(180deg)';
            } else {
                icon.style.transform = 'rotate(0deg)';
            }
        }
    });
});

// Close menu when clicking outside (mobile)
document.addEventListener('click', (e) => {
    if (window.innerWidth <= 768) {
        if (!navLinks.contains(e.target) && !hamburger.contains(e.target)) {
            hamburger.classList.remove('show');
            navLinks.classList.remove('show');
            
            // Close any open dropdowns
            document.querySelectorAll('.dropdown').forEach(dropdown => {
                dropdown.classList.remove('show');
            });
            
            // Reset caret icons
            document.querySelectorAll('.drop i').forEach(icon => {
                icon.style.transform = 'rotate(0deg)';
            });
        }
    }
});

// Handle window resize
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
        
        // Reset mobile dropdowns
        document.querySelectorAll('.dropdown').forEach(dropdown => {
            dropdown.classList.remove('active');
        });
        
        // Reset caret icons
        document.querySelectorAll('.drop i').forEach(icon => {
            icon.style.transform = '';
        });
    }
});
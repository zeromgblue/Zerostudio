// Toggle menu icon and navbar
const menuIcon = document.querySelector('#menu-icon');
const navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
};

// Scroll sections active link
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        // ตรวจสอบว่ามี section นั้นๆ อยู่หรือไม่เพื่อเพิ่มคลาส active ในเมนู
        if(top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove('active');
                let targetLink = document.querySelector('header nav a[href*=' + id + ']');
                if(targetLink && !targetLink.classList.contains('nav-contact-btn')) {
                    targetLink.classList.add('active');
                }
            });
        };
    });

    // Sticky navbar
    let header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 100);

    // Remove toggle icon and navbar when click navbar link
    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');
};

// Scroll reveal animation
const revealElements = document.querySelectorAll('.reveal');

const revealOnScroll = () => {
    for (let i = 0; i < revealElements.length; i++) {
        const windowHeight = window.innerHeight;
        const revealTop = revealElements[i].getBoundingClientRect().top;
        const revealPoint = 100;

        if (revealTop < windowHeight - revealPoint) {
            revealElements[i].classList.add('active');
        }
    }
}

window.addEventListener('scroll', revealOnScroll);
revealOnScroll(); // Trigger once on load

// Image Carousel Logic (with Prev/Next arrows)
const carouselInner = document.querySelector('.carousel-inner');
const slides = document.querySelectorAll('.carousel-slide');
const dots = document.querySelectorAll('.carousel-dot');
const prevBtn = document.querySelector('#prev-btn');
const nextBtn = document.querySelector('#next-btn');
let currentSlide = 0;
let slideInterval;

const showSlide = (n) => {
    currentSlide = (n + slides.length) % slides.length;
    
    // เลื่อน carousel-inner (Slide Animation)
    // 50% ต่อสไลด์ เพราะมี 2 สไลด์ (carousel-inner กว้าง 200%)
    carouselInner.style.transform = `translateX(-${currentSlide * 50}%)`;
    
    // Update dots
    dots.forEach(dot => dot.classList.remove('active'));
    dots[currentSlide].classList.add('active');
}

const nextSlide = () => {
    showSlide(currentSlide + 1);
}

const prevSlide = () => {
    showSlide(currentSlide - 1);
}

// Start auto sliding
const startSlideShow = () => {
    slideInterval = setInterval(nextSlide, 5000); // 5 seconds for larger slides
}

const resetSlideShow = () => {
    clearInterval(slideInterval);
    startSlideShow();
}

startSlideShow();

if (prevBtn && nextBtn) {
    nextBtn.addEventListener('click', () => {
        nextSlide();
        resetSlideShow();
    });

    prevBtn.addEventListener('click', () => {
        prevSlide();
        resetSlideShow();
    });
}

// Add click event to dots
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        showSlide(index);
        resetSlideShow();
    });
});

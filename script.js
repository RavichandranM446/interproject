// Basic interactivity for buttons (e.g., logging actions)
document.querySelector('.login-btn').addEventListener('click', () => {
    console.log('Log in button clicked');
});

document.querySelector('.signup-btn').addEventListener('click', () => {
    console.log('Sign up button clicked');
});
document.addEventListener('DOMContentLoaded', function() {
    const slidesContainer = document.querySelector('.carousel-slides');
    const slides = document.querySelectorAll('.carousel-slide');
    const prevButton = document.querySelector('.carousel-control-prev');
    const nextButton = document.querySelector('.carousel-control-next');
    const indicatorsContainer = document.querySelector('.carousel-indicators');
    
    let currentSlide = 0;
    const totalSlides = slides.length;
    let isAutoPlaying = true;
    let slideInterval;
    const intervalTime = 5000;

    // Create indicator dots
    slides.forEach((_, index) => {
        const indicator = document.createElement('button');
        indicator.classList.add('carousel-indicator');
        indicator.setAttribute('aria-label', `Go to slide ${index + 1}`);
        indicator.addEventListener('click', () => goToSlide(index));
        indicatorsContainer.appendChild(indicator);
    });

    const indicators = document.querySelectorAll('.carousel-indicator');

    // Update the active indicator
    function updateIndicators() {
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentSlide);
        });
    }

    // Go to specific slide
    function goToSlide(index) {
        currentSlide = index;
        slidesContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
        updateIndicators();
    }

    // Navigate to next slide
    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        goToSlide(currentSlide);
    }

    // Navigate to previous slide
    function prevSlide() {
        currentSlide = currentSlide === 0 ? totalSlides - 1 : currentSlide - 1;
        goToSlide(currentSlide);
    }

    // Start auto play
    function startAutoPlay() {
        if (slideInterval) clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, intervalTime);
    }

    // Stop auto play
    function stopAutoPlay() {
        if (slideInterval) {
            clearInterval(slideInterval);
            slideInterval = null;
        }
    }

    // Event listeners
    prevButton.addEventListener('click', () => {
        prevSlide();
        if (isAutoPlaying) {
            stopAutoPlay();
            startAutoPlay();
        }
    });

    nextButton.addEventListener('click', () => {
        nextSlide();
        if (isAutoPlaying) {
            stopAutoPlay();
            startAutoPlay();
        }
    });

    // Pause on hover
    const carouselContainer = document.querySelector('.carousel-container');
    carouselContainer.addEventListener('mouseenter', stopAutoPlay);
    carouselContainer.addEventListener('mouseleave', () => {
        if (isAutoPlaying) startAutoPlay();
    });

    // Initialize
    updateIndicators();
    if (isAutoPlaying) startAutoPlay();
});
 const cards = document.querySelectorAll('.accreditation-card');
        const container = document.querySelector('.accreditation-container');

        const checkVisibility = () => {
            const containerRect = container.getBoundingClientRect();
            cards.forEach(card => {
                const cardRect = card.getBoundingClientRect();
                const isVisible = cardRect.left >= containerRect.left && cardRect.right <= containerRect.right;
                if (isVisible) {
                    card.classList.add('visible');
                }
            });
        };

        window.addEventListener('scroll', checkVisibility);
        window.addEventListener('resize', checkVisibility);
        setInterval(checkVisibility, 100);
        checkVisibility();
        // Load and display courses from JSON
// Load and display courses from JSON
fetch('https://university.cappriciosec.com/university.json')
  .then(response => response.json())
  .then(data => {
    const container = document.getElementById('courses-container');
    
    data.courses.forEach(course => {
      const card = document.createElement('div');
      card.className = 'course-card';
      
      const img = document.createElement('img');
      img.src = course.image;
      img.alt = course.title;
      
      const title = document.createElement('h3');
      title.textContent = course.title;
      
      card.appendChild(img);
      card.appendChild(title);
      container.appendChild(card);
    });
  })
  .catch(error => console.error('Error loading courses.json:', error));

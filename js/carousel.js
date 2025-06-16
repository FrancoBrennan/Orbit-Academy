let currentIndex = 0;
      const totalSlides = 4; // cantidad de imágenes
      const carousel = document.getElementById('carouselImages');

      function updateSlide() {
        carousel.style.transform = `translateX(-${currentIndex * 100}vw)`;
      }

      function nextSlide() {
        currentIndex = (currentIndex + 1) % totalSlides;
        updateSlide();
      }

      function prevSlide() {
        currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
        updateSlide();
      }

      // autoplay opcional
      setInterval(nextSlide, 6000);

(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);


  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {

    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }

    const body = document.body;
    testWebPSupport(function (isSupported) {
        if (isSupported) {
            // console.log("WebP is supported! Will use WebP where possible.");
            body.style.backgroundImage = "url('./assets/img/background.webp')";
        } else {
            // console.log("WebP not supported. Will use JPG or PNG instead.");
            body.style.backgroundImage = "url('./assets/img/background.png')";
        }
    });

    // Dynamically load Google Font stylesheet after the page loads
    loadGoogleFont();

  });

  /**
   * Dynamically load Google Font stylesheet
   */
  function loadGoogleFont() {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=Permanent+Marker&display=swap';
    link.media = 'print'; // Initially load for print
    link.onload = function() {
      this.onload = null;
      this.removeAttribute('media'); // Make it active for the page
    };

    document.head.appendChild(link); // Append the link element to the head
  }

})();

function testWebPSupport(callback) {
  const webpImage = new Image();
  webpImage.src = "/assets/img/test-webp.webp";
  webpImage.onload = function () {
      callback(true); // WebP is supported
  };
  webpImage.onerror = function () {
      callback(false); // WebP is not supported
  };
}



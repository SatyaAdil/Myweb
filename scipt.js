// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Initialize loading screen
  const loader = document.createElement('div');
  loader.className = 'loader';
  loader.innerHTML = `
    <div class="loader-content">
      <div class="loader-spinner"></div>
    </div>
  `;
  document.body.appendChild(loader);
  
  // Hide loader when page is loaded
  window.addEventListener('load', function() {
    setTimeout(() => {
      loader.classList.add('hidden');
      setTimeout(() => loader.remove(), 500);
      initAnimation();
    }, 1000);
  });
  
  // Create scroll progress bar
  const scrollProgress = document.createElement('div');
  scrollProgress.className = 'scroll-progress';
  document.body.appendChild(scrollProgress);
  
  // Create custom cursor elements
  const cursor = document.createElement('div');
  cursor.className = 'cursor';
  const cursorDot = document.createElement('div');
  cursorDot.className = 'cursor-dot';
  document.body.appendChild(cursor);
  document.body.appendChild(cursorDot);
  
  // Create back to top button
  const backToTop = document.createElement('div');
  backToTop.className = 'back-to-top';
  backToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
  document.body.appendChild(backToTop);
  
  // Create sound toggle button
  const soundToggle = document.createElement('div');
  soundToggle.id = 'sound-toggle';
  soundToggle.innerHTML = '<i class="fas fa-volume-mute"></i>';
  document.body.appendChild(soundToggle);
  
  // Variables
  let soundEnabled = false;
  let themeIsDark = false;
  let activeSection = 'hero';
  const navLinks = document.querySelectorAll('nav a');
  const header = document.querySelector('header');
  const sections = document.querySelectorAll('section');
  const themeToggle = document.getElementById('theme-toggle');
  
  // Sound effects
  const hoverSound = new Howl({
    src: ['data:audio/mp3;base64,SUQzBAAAAAABEVRYWFgAAAAtAAADY29tbWVudABCaWdTb3VuZEJhbmsuY29tIC8gTGFzZXJTb3VuZHMuY29tAAAAQ09NTQAAAAA9AAABTGFzZXJTb3VuZHMuY29tIFNGWCBGcmVlIEZvciBDb21tZXJjaWFsIFVzZSBBbmQgUm95YWx0eS1GcmVlAENPTQAAAAATAAADZW5naW5lZXIATGFzZXJTb3VuZHMAVFhYWAAAABkAAANzb2Z0d2FyZQBTb3VuZCBGb3JnZSA2LjAA'],
    volume: 0.3
  });
  
  const clickSound = new Howl({
    src: ['data:audio/mp3;base64,SUQzBAAAAAABEVRYWFgAAAAtAAADY29tbWVudABCaWdTb3VuZEJhbmsuY29tIC8gTGFzZXJTb3VuZHMuY29tAAAAQ09NTQAAAAA9AAABTGFzZXJTb3VuZHMuY29tIFNGWCBGcmVlIEZvciBDb21tZXJjaWFsIFVzZSBBbmQgUm95YWx0eS1GcmVlAENPTQAAAAATAAADZW5naW5lZXIATGFzZXJTb3VuZHMAVFhYWAAAABkAAANzb2Z0d2FyZQBTb3VuZCBGb3JnZSA2LjAA'],
    volume: 0.5
  });
  
  // Background ambient sound
  const ambientSound = new Howl({
    src: ['data:audio/mp3;base64,SUQzBAAAAAABEVRYWFgAAAAtAAADY29tbWVudABCaWdTb3VuZEJhbmsuY29tIC8gTGFzZXJTb3VuZHMuY29tAAAAQ09NTQAAAAA9AAABTGFzZXJTb3VuZHMuY29tIFNGWCBGcmVlIEZvciBDb21tZXJjaWFsIFVzZSBBbmQgUm95YWx0eS1GcmVlAENPTQAAAAATAAADZW5naW5lZXIATGFzZXJTb3VuZHMAVFhYWAAAABkAAANzb2Z0d2FyZQBTb3VuZCBGb3JnZSA2LjAA'],
    volume: 0.2,
    loop: true
  });
  
  // Initialize animations
  function initAnimation() {
    // Initialize Three.js hero animation
    initThreeJsAnimation();
    
    // Initialize GSAP ScrollTrigger
    initScrollTrigger();
    
    // Initialize Portfolio Carousel
    initPortfolioCarousel();
  }
  
  // Three.js hero animation
  function initThreeJsAnimation() {
    const canvas = document.getElementById('hero-canvas');
    
    // Create a scene, camera, and renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / 2 / window.innerHeight, 0.1, 1000);
    
    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      alpha: true,
      antialias: true
    });
    
    renderer.setSize(window.innerWidth / 2, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    
    // Add responsive handling
    window.addEventListener('resize', () => {
      if (window.innerWidth <= 1024) {
        renderer.setSize(window.innerWidth, window.innerHeight);
      } else {
        renderer.setSize(window.innerWidth / 2, window.innerHeight);
      }
      camera.aspect = window.innerWidth / 2 / window.innerHeight;
      camera.updateProjectionMatrix();
    });
    
    // Create particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 1500;
    
    const posArray = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 5;
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    
    // Material
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.02,
      color: themeIsDark ? 0x3498db : 0x2c3e50,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending
    });
    
    // Create mesh
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);
    
    // Position camera
    camera.position.z = 2;
    
    // Animation loop
    function animate() {
      requestAnimationFrame(animate);
      
      particlesMesh.rotation.x += 0.0005;
      particlesMesh.rotation.y += 0.0005;
      
      renderer.render(scene, camera);
    }
    
    animate();
    
 // Change particle color with theme change
 function updateParticleColor() {
  particlesMaterial.color.set(themeIsDark ? 0x3498db : 0x2c3e50);
}

// Expose the function to be called when theme changes
window.updateParticleColor = updateParticleColor;
}

// Initialize GSAP ScrollTrigger for animations
function initScrollTrigger() {
gsap.registerPlugin(ScrollTrigger);

// About cards animation
const aboutCards = document.querySelectorAll('.about-card');
aboutCards.forEach((card, index) => {
  gsap.fromTo(
    card,
    { y: 100, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: "power2.out",
      scrollTrigger: {
        trigger: card,
        start: "top 80%",
        toggleClass: { targets: card, className: "visible" }
      },
      delay: index * 0.2
    }
  );
});

// Portfolio items animation
const portfolioItems = document.querySelectorAll('.carousel-item');
portfolioItems.forEach((item, index) => {
  gsap.fromTo(
    item,
    { scale: 0.8, opacity: 0 },
    {
      scale: 1,
      opacity: 1,
      duration: 0.6,
      ease: "back.out(1.7)",
      scrollTrigger: {
        trigger: '#portfolio',
        start: "top 60%"
      },
      delay: index * 0.15
    }
  );
});

// Contact form animation
const formElements = document.querySelectorAll('#contact form > *');
formElements.forEach((element, index) => {
  gsap.fromTo(
    element,
    { x: -50, opacity: 0 },
    {
      x: 0,
      opacity: 1,
      duration: 0.5,
      ease: "power1.out",
      scrollTrigger: {
        trigger: '#contact',
        start: "top 70%"
      },
      delay: index * 0.1
    }
  );
});

// Social icons animation
const socialIcons = document.querySelectorAll('.social-icons a');
socialIcons.forEach((icon, index) => {
  gsap.fromTo(
    icon,
    { y: 30, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 0.5,
      ease: "back.out(1.7)",
      scrollTrigger: {
        trigger: 'footer',
        start: "top 90%"
      },
      delay: index * 0.1
    }
  );
});
}

// Initialize Portfolio Carousel with interactive features
function initPortfolioCarousel() {
const carousel = document.querySelector('.portfolio-carousel');
const items = document.querySelectorAll('.carousel-item');

if (items.length === 0) return;

// Add view project button to each item
items.forEach((item, index) => {
  const viewBtn = document.createElement('a');
  
  // Jika ini adalah item Laravel (proyek ke-4)
  if (index === 3) { // Indeks 3 adalah item ke-4
    viewBtn.href = 'laravel.html';
  } else {
    viewBtn.href = '#';
  }
  
  viewBtn.className = 'view-project';
  viewBtn.textContent = 'View Project';
  item.style.position = 'relative';
  item.appendChild(viewBtn);
  
  // Add click event
  viewBtn.addEventListener('click', function(e) {
    if (soundEnabled) clickSound.play();
    
    // Jika bukan item Laravel, tampilkan alert
    if (index !== 3) {
      e.preventDefault();
      alert('Sedang Dalam Tahap Perbaikan!');
    }
    // Jika item Laravel, biarkan link bekerja seperti biasa
  });
});

// Set first item as active
items[0].classList.add('active');

// Add smooth scrolling
let isDown = false;
let startX;
let scrollLeft;

carousel.addEventListener('mousedown', (e) => {
  isDown = true;
  carousel.style.cursor = 'grabbing';
  startX = e.pageX - carousel.offsetLeft;
  scrollLeft = carousel.scrollLeft;
});

carousel.addEventListener('mouseleave', () => {
  isDown = false;
  carousel.style.cursor = 'grab';
});

carousel.addEventListener('mouseup', () => {
  isDown = false;
  carousel.style.cursor = 'grab';
});

carousel.addEventListener('mousemove', (e) => {
  if (!isDown) return;
  e.preventDefault();
  const x = e.pageX - carousel.offsetLeft;
  const walk = (x - startX) * 2;
  carousel.scrollLeft = scrollLeft - walk;
  
  // Update active class based on scroll position
  updateActiveItem();
});

carousel.addEventListener('scroll', () => {
  updateActiveItem();
});

// Update active item based on scroll position
function updateActiveItem() {
  const scrollPosition = carousel.scrollLeft;
  const itemWidth = items[0].offsetWidth + parseInt(getComputedStyle(items[0]).marginRight);
  
  items.forEach((item, index) => {
    const itemPosition = index * itemWidth;
    if (scrollPosition >= itemPosition - itemWidth / 2 && 
        scrollPosition < itemPosition + itemWidth / 2) {
      items.forEach(i => i.classList.remove('active'));
      item.classList.add('active');
    }
  });
}

// Add touch support for mobile
carousel.addEventListener('touchstart', (e) => {
  startX = e.touches[0].pageX - carousel.offsetLeft;
  scrollLeft = carousel.scrollLeft;
});

carousel.addEventListener('touchmove', (e) => {
  if (!startX) return;
  const x = e.touches[0].pageX - carousel.offsetLeft;
  const walk = (x - startX) * 2;
  carousel.scrollLeft = scrollLeft - walk;
  updateActiveItem();
});

carousel.addEventListener('touchend', () => {
  startX = null;
});

// Add image loading animation
const images = document.querySelectorAll('.carousel-item img');
images.forEach(img => {
  // Add placeholder styling while image loads
  img.classList.add('img-placeholder');
  
  img.addEventListener('load', () => {
    // Remove placeholder styling when image is loaded
    img.classList.remove('img-placeholder');
  });
  
  // If image fails to load, keep placeholder styling
  img.addEventListener('error', () => {
    console.log('Image failed to load');
  });
});
}

// Update navigation active state based on scroll position
function updateNavActiveState() {
let current = '';

sections.forEach(section => {
  const sectionTop = section.offsetTop - 100;
  const sectionHeight = section.offsetHeight;
  if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
    current = section.getAttribute('id');
  }
});

if (current !== activeSection) {
  activeSection = current;
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href').includes(current)) {
      link.classList.add('active');
    }
  });
}

// Update scroll progress bar
const totalScroll = document.documentElement.scrollHeight - document.documentElement.clientHeight;
const scrollPercentage = (window.scrollY / totalScroll) * 100;
scrollProgress.style.width = `${scrollPercentage}%`;

// Show/hide back to top button
if (window.scrollY > 500) {
  backToTop.classList.add('visible');
} else {
  backToTop.classList.remove('visible');
}

// Add scrolled class to header
if (window.scrollY > 50) {
  header.classList.add('scrolled');
} else {
  header.classList.remove('scrolled');
}
}

// Custom cursor effect
function updateCursor(e) {
gsap.to(cursor, {
  x: e.clientX,
  y: e.clientY,
  duration: 0.2
});

gsap.to(cursorDot, {
  x: e.clientX,
  y: e.clientY,
  duration: 0.1
});
}

// Event listeners
window.addEventListener('scroll', updateNavActiveState);
window.addEventListener('mousemove', updateCursor);

// Hover effects for links with cursor
document.querySelectorAll('a, button, input, textarea, .carousel-item').forEach(item => {
item.addEventListener('mouseenter', () => {
  cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
  cursorDot.style.transform = 'translate(-50%, -50%) scale(1.5)';
  cursorDot.style.backgroundColor = 'var(--primary-color)';
  
  if (soundEnabled) {
    hoverSound.play();
  }
});

item.addEventListener('mouseleave', () => {
  cursor.style.transform = 'translate(-50%, -50%) scale(1)';
  cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
  cursorDot.style.backgroundColor = 'var(--secondary-color)';
});
});

// Theme toggle
themeToggle.addEventListener('click', () => {
if (soundEnabled) clickSound.play();

themeIsDark = !themeIsDark;
document.body.classList.toggle('dark-theme');

themeToggle.textContent = themeIsDark ? 'Mode Terang' : 'Mode Gelap';

// Update particles color if Three.js is initialized
if (window.updateParticleColor) {
  window.updateParticleColor();
}
});

// Sound toggle
soundToggle.addEventListener('click', () => {
soundEnabled = !soundEnabled;
soundToggle.innerHTML = soundEnabled 
  ? '<i class="fas fa-volume-up"></i>' 
  : '<i class="fas fa-volume-mute"></i>';

if (soundEnabled) {
  clickSound.play();
  ambientSound.play();
} else {
  ambientSound.pause();
}
});

// Back to top button
backToTop.addEventListener('click', () => {
if (soundEnabled) clickSound.play();

window.scrollTo({
  top: 0,
  behavior: 'smooth'
});
});

// Smooth scroll for navigation links
navLinks.forEach(link => {
link.addEventListener('click', function(e) {
  e.preventDefault();
  
  if (soundEnabled) clickSound.play();
  
  const targetId = this.getAttribute('href');
  const targetSection = document.querySelector(targetId);
  
  window.scrollTo({
    top: targetSection.offsetTop - 80,
    behavior: 'smooth'
  });
});
});

// Form submission with validation and animation
const contactForm = document.querySelector('#contact form');
if (contactForm) {
contactForm.addEventListener('submit', function(e) {
  e.preventDefault();
  
  if (soundEnabled) clickSound.play();
  
  // Basic validation
  const nameInput = this.querySelector('input[name="name"]');
  const emailInput = this.querySelector('input[name="email"]');
  const messageInput = this.querySelector('textarea[name="message"]');
  
  let isValid = true;
  
  if (nameInput.value.trim() === '') {
    animateInvalidInput(nameInput);
    isValid = false;
  }
  
  if (emailInput.value.trim() === '' || !isValidEmail(emailInput.value)) {
    animateInvalidInput(emailInput);
    isValid = false;
  }
  
  if (messageInput.value.trim() === '') {
    animateInvalidInput(messageInput);
    isValid = false;
  }
  
  if (isValid) {
    // Simulate form submission
    const submitButton = this.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    
    submitButton.disabled = true;
    submitButton.textContent = 'Mengirim...';
    
    setTimeout(() => {
      // Reset form
      contactForm.reset();
      
      // Show success message
      submitButton.textContent = 'Terkirim!';
      
      // After some time, revert button
      setTimeout(() => {
        submitButton.disabled = false;
        submitButton.textContent = originalText;
      }, 2000);
    }, 1500);
  }
});
}

// Email validation helper
function isValidEmail(email) {
const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
return regex.test(email);
}

// Animate invalid input
function animateInvalidInput(input) {
input.style.borderColor = 'red';

gsap.to(input, {
  x: [-10, 10, -10, 10, 0],
  duration: 0.5,
  ease: "power1.inOut",
  onComplete: () => {
    setTimeout(() => {
      input.style.borderColor = '';
    }, 1000);
  }
});
}

// Initialize on page load
updateNavActiveState();
});

// Preload images
window.addEventListener('DOMContentLoaded', () => {
// Get all image elements
const images = document.querySelectorAll('img');

// For each image, set up preloading
images.forEach(img => {
// Only preload if src is available
if (img.getAttribute('src')) {
  const preloadLink = document.createElement('link');
  preloadLink.href = img.getAttribute('src');
  preloadLink.rel = 'preload';
  preloadLink.as = 'image';
  document.head.appendChild(preloadLink);
}
});
});



// Main configuration
const config = {
  weatherApiKey: "61a30353f2a4700111356411c966c452", // Replace with your actual API key
  stockApiKey: "QZGY57EPDCPD4EVW", // Replace with your actual API key
  refreshInterval: 60000, // Refresh data every minute
  locale: "id-ID", // Indonesian locale for formatting
  units: "metric" // Use Celsius
};

// Initialize the dashboard
document.addEventListener("DOMContentLoaded", () => {
  initClock();
  initWeather();
  initStocks();
  initTraffic();
  initSports();
  
  // Set up periodic refresh
  setInterval(() => {
    updateWeather();
    updateStocks();
    updateTraffic();
    updateSports();
  }, config.refreshInterval);
});

// Clock and Date functions
function initClock() {
  updateClock();
  setInterval(updateClock, 1000);
}

function updateClock() {
  const now = new Date();
  
  // Update time
  const hours = now.getHours();
  const minutes = now.getMinutes();
  document.getElementById("current-time").textContent = 
    `${hours}:${minutes < 10 ? '0' + minutes : minutes}`;
  
  // Update date
  const options = { weekday: 'long', month: 'long', day: 'numeric' };
  const dateString = now.toLocaleDateString(config.locale, options);
  document.getElementById("current-date").textContent = dateString;
}

// Weather functions
function initWeather() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords;
      fetchWeatherData(latitude, longitude);
    }, weatherError);
  } else {
    weatherError("Geolocation is not supported by this browser.");
  }
}

function weatherError(error) {
  console.error("Weather error:", error);
  document.getElementById("weather-condition").textContent = "Tidak tersedia";
}

function fetchWeatherData(lat, lon) {
  // Using OpenWeatherMap API as an example
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${config.units}&appid=${config.weatherApiKey}`;
  
  fetch(url)
    .then(response => response.json())
    .then(data => {
      updateWeatherUI(data);
    })
    .catch(error => {
      weatherError(error);
    });
}

function updateWeatherUI(data) {
  // Location
  document.getElementById("weather-location").textContent = data.name;
  
  // Temperature
  const temp = Math.round(data.main.temp);
  const tempHigh = Math.round(data.main.temp_max);
  const tempLow = Math.round(data.main.temp_min);
  
  document.getElementById("temperature").textContent = temp;
  document.getElementById("temp-unit").textContent = config.units === "metric" ? "C" : "F";
  document.getElementById("temp-high").textContent = tempHigh;
  document.getElementById("temp-low").textContent = tempLow;
  
  // Weather condition
  document.getElementById("weather-condition").textContent = 
    data.weather[0].description.charAt(0).toUpperCase() + 
    data.weather[0].description.slice(1);
  
  // Update icon
  const weatherIcon = document.getElementById("weather-icon");
  weatherIcon.className = getWeatherIconClass(data.weather[0].id);
}

function getWeatherIconClass(weatherId) {
  // Map OpenWeatherMap condition codes to FontAwesome icons
  if (weatherId >= 200 && weatherId < 300) return "fas fa-bolt";
  if (weatherId >= 300 && weatherId < 400) return "fas fa-cloud-rain";
  if (weatherId >= 500 && weatherId < 600) return "fas fa-cloud-showers-heavy";
  if (weatherId >= 600 && weatherId < 700) return "fas fa-snowflake";
  if (weatherId >= 700 && weatherId < 800) return "fas fa-smog";
  if (weatherId === 800) return "fas fa-sun";
  if (weatherId > 800) return "fas fa-cloud-sun";
  
  return "fas fa-cloud"; // Default
}

function updateWeather() {
  // Re-fetch weather data
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords;
      fetchWeatherData(latitude, longitude);
    });
  }
}

// Stocks functions
function initStocks() {
  fetchStocksData();
}

function fetchStocksData() {
  // Using example data - replace with actual API call
  const stocksContainer = document.getElementById("stocks-container");
  stocksContainer.innerHTML = ""; // Clear loading placeholder
  
  // Example stock symbols - replace with your preferred stocks
  const stocks = [
    { symbol: "IHSG", name: "IDX Composite" },
    { symbol: "BBRI", name: "Bank BRI" },
    { symbol: "TLKM", name: "Telkom Indonesia" },
    { symbol: "ASII", name: "Astra International" }
  ];
  
  // In a real implementation, you would fetch data from a financial API
  // For this example, we'll use mock data
  stocks.forEach(stock => {
    // Generate random mock data for demonstration
    const price = (Math.random() * 10000 + 1000).toFixed(2);
    const changePercent = (Math.random() * 6 - 3).toFixed(2);
    const isPositive = parseFloat(changePercent) >= 0;
    
    const stockElement = document.createElement("div");
    stockElement.className = "stock-item";
    stockElement.innerHTML = `
      <div class="stock-name">${stock.name} (${stock.symbol})</div>
      <div class="stock-change ${isPositive ? 'positive' : 'negative'}">
        ${isPositive ? '+' : ''}${changePercent}%
      </div>
      <div class="stock-price">Rp ${price.replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</div>
    `;
    
    stocksContainer.appendChild(stockElement);
  });
}

function updateStocks() {
  fetchStocksData();
}

// Traffic functions
function initTraffic() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords;
      initTrafficMap(latitude, longitude);
      fetchTrafficData(latitude, longitude);
    }, error => {
      console.error("Traffic error:", error);
      document.getElementById("traffic-status").textContent = "Tidak tersedia";
    });
  } else {
    document.getElementById("traffic-status").textContent = "Geolokasi tidak didukung di browser ini";
  }
}

function initTrafficMap(lat, lon) {
  const mapElement = document.getElementById("traffic-map");
  
  // This is a placeholder - in a real implementation, you would initialize
  // a map using Google Maps, Mapbox, or another mapping service
  mapElement.innerHTML = `
    <div style="background-color: #e0e0e0; width: 100%; height: 150px; display: flex; align-items: center; justify-content: center;">
      <div style="color: #333; font-size: 14px;">
        Peta lalu lintas tersedia di sini
        <br>
        <small>Lokasi: ${lat.toFixed(4)}, ${lon.toFixed(4)}</small>
      </div>
    </div>
  `;
}

function fetchTrafficData(lat, lon) {
  // In a real implementation, you would fetch traffic data from a service
  // like Google Maps, Waze, or a local traffic API
  
  // Mock data for demonstration
  const locations = ["Slawi", "Tegal", "Brebes"];
  const statuses = [
    "Lancar", 
    "Kepadatan rendah", 
    "Kepadatan sedang", 
    "Padat merayap", 
    "Macet"
  ];
  
  const randomLocation = locations[Math.floor(Math.random() * locations.length)];
  const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
  
  document.getElementById("traffic-location").textContent = randomLocation;
  document.getElementById("traffic-status").textContent = randomStatus;
}

function updateTraffic() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords;
      fetchTrafficData(latitude, longitude);
    });
  }
}

// Sports functions
function initSports() {
  fetchSportsData();
}

function fetchSportsData() {
  // In a real implementation, you would fetch sports data from a sports API
  
  // Mock data for Liga Premier (Premier League) matches
  const teams = [
    "Arsenal", "Man City", "Liverpool", "Man United", 
    "Tottenham", "Chelsea", "Newcastle", "West Ham"
  ];
  
  const matchesContainer = document.getElementById("matches-container");
  matchesContainer.innerHTML = ""; // Clear loading placeholder
  
  // Generate 3 random matches
  for (let i = 0; i < 3; i++) {
    // Pick two random teams
    let homeIndex = Math.floor(Math.random() * teams.length);
    let awayIndex;
    do {
      awayIndex = Math.floor(Math.random() * teams.length);
    } while (awayIndex === homeIndex);
    
    const homeTeam = teams[homeIndex];
    const awayTeam = teams[awayIndex];
    
    // Generate random scores
    const homeScore = Math.floor(Math.random() * 5);
    const awayScore = Math.floor(Math.random() * 5);
    
    // Create match element
    const matchElement = document.createElement("div");
    matchElement.className = "match-item";
    matchElement.innerHTML = `
      <div class="teams">
        <span class="team home">${homeTeam}</span>
        <span class="vs">vs</span>
        <span class="team away">${awayTeam}</span>
      </div>
      <div class="score">${homeScore} - ${awayScore}</div>
    `;
    
    matchesContainer.appendChild(matchElement);
  }
  
  // Update match status
  const statuses = ["Pertandingan Hari Ini", "Pertandingan Selesai", "Jadwal Mendatang"];
  document.getElementById("match-status").textContent = 
    statuses[Math.floor(Math.random() * statuses.length)];
}

function updateSports() {
  fetchSportsData();
}
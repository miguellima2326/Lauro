const music = document.getElementById("bgMusic");
const toggleButton = document.getElementById("toggleMusic");

let isPlaying = false;

toggleButton.addEventListener("click", () => {
  if (isPlaying) {
    music.pause();
    toggleButton.textContent = "Tocar Música 🎵";
  } else {
    music.play();
    toggleButton.textContent = "Pausar Música ⏸️";
  }
  isPlaying = !isPlaying;
});

const slides = document.querySelector('.slides');
const totalSlides = document.querySelectorAll('.slide').length;
const carrossel = document.querySelector('.carrossel');

let index = 0;
let intervalId;

// Cria as bolhas indicadoras dinamicamente
const indicadoresContainer = document.createElement('div');
indicadoresContainer.classList.add('indicadores');
carrossel.appendChild(indicadoresContainer);

for(let i = 0; i < totalSlides; i++) {
  const indicador = document.createElement('div');
  indicador.classList.add('indicador');
  if(i === 0) indicador.classList.add('active');
  indicadoresContainer.appendChild(indicador);
}

// Função para atualizar slide e bolha ativa
function updateSlide(novoIndex) {
  index = novoIndex;
  slides.style.transform = `translateX(-${index * 100}%)`;
  
  // Atualiza bolhas
  document.querySelectorAll('.indicador').forEach((bolha, i) => {
    bolha.classList.toggle('active', i === index);
  });
}

// Troca automática de slide
function startAutoSlide() {
  intervalId = setInterval(() => {
    updateSlide((index + 1) % totalSlides);
  }, 120000000);
}

function stopAutoSlide() {
  clearInterval(intervalId);
}

startAutoSlide();

// Clique nas laterais para navegar manualmente
carrossel.addEventListener('click', (e) => {
  const rect = carrossel.getBoundingClientRect();
  const clickX = e.clientX - rect.left;

  stopAutoSlide();

  if(clickX < rect.width / 2) {
    // Lado esquerdo: slide anterior
    updateSlide((index - 1 + totalSlides) % totalSlides);
  } else {
    // Lado direito: próximo slide
    updateSlide((index + 1) % totalSlides);
  }

  startAutoSlide();
});

// --- Aqui começa o código para Swipe ---

let startX = 0;
let endX = 0;

slides.addEventListener('touchstart', (e) => {
  startX = e.touches[0].clientX;
});

slides.addEventListener('touchmove', (e) => {
  endX = e.touches[0].clientX;
});

slides.addEventListener('touchend', () => {
  const threshold = 50; // distância mínima para considerar swipe
  const diffX = startX - endX;

  stopAutoSlide();

  if(diffX > threshold) {
    // swipe para esquerda → próximo slide
    updateSlide((index + 1) % totalSlides);
  } else if(diffX < -threshold) {
    // swipe para direita → slide anterior
    updateSlide((index - 1 + totalSlides) % totalSlides);
  }

  startAutoSlide();
});




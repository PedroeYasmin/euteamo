// Configuração da data inicial
const startDate = new Date('2024-05-25T22:25:00');

// Função para atualizar o contador
function updateCounter() {
    const now = new Date();
    const diff = now - startDate;
    
    // Cálculo de tempo
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    
    // Atualização dos elementos HTML
    document.getElementById('days').textContent = days;
    document.getElementById('hours').textContent = hours;
    document.getElementById('minutes').textContent = minutes;
    document.getElementById('seconds').textContent = seconds;
    
    // Atualização do texto da mensagem
    document.getElementById('days-text').textContent = days;
    document.getElementById('hours-text').textContent = hours;
    document.getElementById('minutes-text').textContent = minutes;
    document.getElementById('seconds-text').textContent = seconds;
}

// Atualizar o contador a cada segundo
setInterval(updateCounter, 1000);
updateCounter(); // Inicializar o contador imediatamente

// Configuração do carrossel otimizado para muitas imagens
class OptimizedCarousel {
    constructor() {
        this.carousel = document.querySelector('.carousel');
        this.carouselContainer = document.querySelector('.carousel-container');
        this.progressBar = document.querySelector('.carousel-progress-bar');
        
        this.currentIndex = 0;
        this.totalImages = 0;
        this.images = [];
        this.loadedImages = new Set();
        this.isTransitioning = false;
        this.autoplayInterval = null;
        
        // Configurações
        this.autoplaySpeed = 5000; // 5 segundos entre slides
        this.preloadCount = 3; // Número de imagens para pré-carregar em cada direção
        
        // Inicialização
        this.loadImageList();
        this.setupEventListeners();
        this.startAutoplay();
    }
    
    // Carregar a lista de imagens da pasta 'images'
    loadImageList() {
        // Aqui definimos o padrão de nomenclatura para as imagens
        // Você pode adicionar até 50 imagens seguindo este padrão
        this.images = Array.from({length: 50}, (_, i) => `images/imagem${i + 1}.jpg`);
        this.totalImages = this.images.length;
        
        // Inicializar o carrossel com os primeiros slides
        this.initializeCarousel();
    }
    
    // Inicializar o carrossel com os primeiros slides
    initializeCarousel() {
        // Adicionar um spinner de carregamento
        const loadingSpinner = document.createElement('div');
        loadingSpinner.className = 'loading-spinner';
        this.carouselContainer.appendChild(loadingSpinner);
        
        // Carregar o primeiro slide e seus vizinhos
        this.loadImage(0).then(() => {
            // Remover o spinner quando a primeira imagem estiver carregada
            this.carouselContainer.removeChild(loadingSpinner);
            
            // Pré-carregar as próximas imagens
            for (let i = 1; i <= this.preloadCount; i++) {
                const nextIndex = i % this.totalImages;
                this.loadImage(nextIndex);
            }
            
            // Atualizar a barra de progresso
            this.updateProgressBar();
        });
    }
    
    // Carregar uma imagem específica
    async loadImage(index) {
        if (this.loadedImages.has(index)) return;
        
        return new Promise((resolve) => {
            const slide = document.createElement('div');
            slide.className = 'carousel-slide';
            slide.dataset.index = index;
            
            const img = new Image();
            img.src = this.images[index];
            img.alt = 'Foto do casal';
            img.loading = 'lazy';
            
            img.onload = () => {
                this.loadedImages.add(index);
                resolve();
            };
            
            img.onerror = () => {
                // Se a imagem não existir, usar uma imagem de fallback ou pular
                console.log(`Imagem ${this.images[index]} não encontrada`);
                resolve();
            };
            
            slide.appendChild(img);
            this.carousel.appendChild(slide);
        });
    }
    
    // Navegar para um slide específico
    goToSlide(index) {
        if (this.isTransitioning) return;
        this.isTransitioning = true;
        
        // Garantir que o índice esteja dentro dos limites
        const targetIndex = (index + this.totalImages) % this.totalImages;
        
        // Carregar a imagem alvo e suas vizinhas
        this.loadImage(targetIndex).then(() => {
            // Pré-carregar as próximas imagens
            for (let i = 1; i <= this.preloadCount; i++) {
                const nextIndex = (targetIndex + i) % this.totalImages;
                const prevIndex = (targetIndex - i + this.totalImages) % this.totalImages;
                this.loadImage(nextIndex);
                this.loadImage(prevIndex);
            }
            
            // Atualizar a posição do carrossel
            this.carousel.style.transform = `translateX(-${targetIndex * 100}%)`;
            this.currentIndex = targetIndex;
            
            // Atualizar a barra de progresso
            this.updateProgressBar();
            
            // Permitir nova transição após a atual terminar
            setTimeout(() => {
                this.isTransitioning = false;
            }, 800); // Tempo igual à duração da transição CSS
        });
    }
    
    // Ir para o próximo slide
    nextSlide() {
        this.goToSlide(this.currentIndex + 1);
    }
    
    // Ir para o slide anterior
    prevSlide() {
        this.goToSlide(this.currentIndex - 1);
    }
    
    // Atualizar a barra de progresso
    updateProgressBar() {
        const progress = ((this.currentIndex + 1) / this.totalImages) * 100;
        this.progressBar.style.width = `${progress}%`;
    }
    
    // Configurar os event listeners
    setupEventListeners() {
        // Variáveis para controle de toque/clique
        let touchStartX = 0;
        let touchEndX = 0;
        let clickStartX = 0;
        
        // Event listeners para dispositivos touch
        this.carouselContainer.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
            this.pauseAutoplay();
        }, {passive: true});
        
        this.carouselContainer.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            this.handleSwipe(touchStartX, touchEndX);
            this.startAutoplay();
        }, {passive: true});
        
        // Event listeners para mouse
        this.carouselContainer.addEventListener('mousedown', (e) => {
            clickStartX = e.clientX;
            this.pauseAutoplay();
        });
        
        this.carouselContainer.addEventListener('mouseup', (e) => {
            // Detectar clique na metade esquerda ou direita
            const containerWidth = this.carouselContainer.offsetWidth;
            const clickPosition = e.clientX;
            
            if (Math.abs(clickStartX - clickPosition) < 10) { // Se foi um clique (não um arrasto)
                if (clickPosition < containerWidth / 2) {
                    this.prevSlide();
                } else {
                    this.nextSlide();
                }
            }
            
            this.startAutoplay();
        });
        
        // Pausar autoplay quando o mouse estiver sobre o carrossel
        this.carouselContainer.addEventListener('mouseenter', () => {
            this.pauseAutoplay();
        });
        
        this.carouselContainer.addEventListener('mouseleave', () => {
            this.startAutoplay();
        });
    }
    
    // Lidar com gestos de swipe
    handleSwipe(startX, endX) {
        const swipeThreshold = 50;
        if (endX < startX - swipeThreshold) {
            // Swipe para a esquerda
            this.nextSlide();
        } else if (endX > startX + swipeThreshold) {
            // Swipe para a direita
            this.prevSlide();
        }
    }
    
    // Iniciar reprodução automática
    startAutoplay() {
        this.pauseAutoplay(); // Limpar qualquer intervalo existente
        this.autoplayInterval = setInterval(() => {
            this.nextSlide();
        }, this.autoplaySpeed);
    }
    
    // Pausar reprodução automática
    pauseAutoplay() {
        if (this.autoplayInterval) {
            clearInterval(this.autoplayInterval);
            this.autoplayInterval = null;
        }
    }
}

// Inicializar o carrossel quando a página for carregada
window.addEventListener('load', () => {
    const carousel = new OptimizedCarousel();
});

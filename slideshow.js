class Slideshow {
    constructor() {
        this.currentSlide = 0;
        this.slides = document.querySelectorAll('.slide');
        this.dots = document.querySelectorAll('.dot');
        this.progressBar = document.querySelector('.progress-bar');
        this.autoPlayInterval = null;
        this.progressInterval = null;
        this.isVisible = false;
        this.autoPlayDuration = 5000;
        
        this.init();
    }
    
    init() {
        if (this.slides.length === 0) return;
        
        this.setupIntersectionObserver();
        
        if (this.isVisible) {
            this.startAutoPlay();
        }
        
        this.setupKeyboardNavigation();
        
        this.setupHoverControls();
    }
    
    setupIntersectionObserver() {
        const aboutSection = document.getElementById('about');
        if (!aboutSection) return;
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.isVisible = true;
                    this.startAutoPlay();
                    this.playCurrentVideo();
                } else {
                    this.isVisible = false;
                    this.stopAutoPlay();
                    this.pauseAllVideos();
                }
            });
        }, {
            threshold: 0.3
        });
        
        observer.observe(aboutSection);
    }
    
    setupKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            if (!this.isVisible) return;
            
            if (e.key === 'ArrowLeft') {
                this.changeSlide(-1);
            } else if (e.key === 'ArrowRight') {
                this.changeSlide(1);
            }
        });
    }
    
    setupHoverControls() {
        const container = document.querySelector('.slideshow-container');
        if (!container) return;
        
        container.addEventListener('mouseenter', () => {
            this.stopAutoPlay();
        });
        
        container.addEventListener('mouseleave', () => {
            if (this.isVisible) {
                this.startAutoPlay();
            }
        });
    }
    
    showSlide(index) {
        this.slides.forEach(slide => slide.classList.remove('active'));
        this.dots.forEach(dot => dot.classList.remove('active'));
        
        this.pauseAllVideos();
        
        this.currentSlide = index;
        
        if (this.slides[this.currentSlide]) {
            this.slides[this.currentSlide].classList.add('active');
        }
        if (this.dots[this.currentSlide]) {
            this.dots[this.currentSlide].classList.add('active');
        }
        
        this.playCurrentVideo();
        
        this.resetProgressBar();
    }
    
    changeSlide(direction) {
        let newIndex = this.currentSlide + direction;
        
        if (newIndex >= this.slides.length) {
            newIndex = 0;
        } else if (newIndex < 0) {
            newIndex = this.slides.length - 1;
        }
        
        this.showSlide(newIndex);
        
        if (this.isVisible) {
            this.stopAutoPlay();
            this.startAutoPlay();
        }
    }
    
    currentSlideSet(index) {
        this.showSlide(index - 1);
        
        if (this.isVisible) {
            this.stopAutoPlay();
            this.startAutoPlay();
        }
    }
    
    startAutoPlay() {
        this.stopAutoPlay();
        
        this.autoPlayInterval = setInterval(() => {
            this.changeSlide(1);
        }, this.autoPlayDuration);
        
        this.startProgressBar();
    }
    
    stopAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
            this.autoPlayInterval = null;
        }
        
        this.stopProgressBar();
    }
    
    startProgressBar() {
        this.stopProgressBar();
        this.resetProgressBar();
        
        let progress = 0;
        const increment = 100 / (this.autoPlayDuration / 50);
        
        this.progressInterval = setInterval(() => {
            progress += increment;
            if (this.progressBar) {
                this.progressBar.style.width = Math.min(progress, 100) + '%';
            }
            
            if (progress >= 100) {
                this.stopProgressBar();
            }
        }, 50);
    }
    
    stopProgressBar() {
        if (this.progressInterval) {
            clearInterval(this.progressInterval);
            this.progressInterval = null;
        }
    }
    
    resetProgressBar() {
        if (this.progressBar) {
            this.progressBar.style.width = '0%';
        }
    }
    
    playCurrentVideo() {
        const currentSlideElement = this.slides[this.currentSlide];
        if (!currentSlideElement) return;
        
        const video = currentSlideElement.querySelector('video');
        if (video) {
            video.currentTime = 0;
            video.play().catch(e => {
                console.log('Video autoplay prevented:', e);
            });
        }
    }
    
    pauseAllVideos() {
        this.slides.forEach(slide => {
            const video = slide.querySelector('video');
            if (video) {
                video.pause();
            }
        });
    }
}

let slideshowInstance;

function changeSlide(direction) {
    if (slideshowInstance) {
        slideshowInstance.changeSlide(direction);
    }
}

function currentSlide(index) {
    if (slideshowInstance) {
        slideshowInstance.currentSlideSet(index);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    slideshowInstance = new Slideshow();
});

document.addEventListener('visibilitychange', function() {
    if (!slideshowInstance) return;
    
    if (document.hidden) {
        slideshowInstance.stopAutoPlay();
        slideshowInstance.pauseAllVideos();
    } else if (slideshowInstance.isVisible) {
        slideshowInstance.startAutoPlay();
        slideshowInstance.playCurrentVideo();
    }
});

window.addEventListener('blur', function() {
    if (slideshowInstance) {
        slideshowInstance.stopAutoPlay();
        slideshowInstance.pauseAllVideos();
    }
});

window.addEventListener('focus', function() {
    if (slideshowInstance && slideshowInstance.isVisible) {
        slideshowInstance.startAutoPlay();
        slideshowInstance.playCurrentVideo();
    }
});
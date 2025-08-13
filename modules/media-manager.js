// ==========================================================================
// Media Management Module - 이미지 레이지 로딩 및 미디어 갤러리
// ==========================================================================

export class MediaManager {
    constructor() {
        this.lazyImageObserver = null;
        this.loadedImages = new Set();
        this.failedImages = new Set();
        this.retryAttempts = new Map();
        this.maxRetries = 3;
        
        this.init();
    }

    /**
     * 초기화
     */
    init() {
        this.initLazyLoading();
        this.initMediaGallery();
        this.setupErrorHandling();
    }

    /**
     * 레이지 로딩 초기화
     */
    initLazyLoading() {
        // Intersection Observer 지원 확인
        if (!('IntersectionObserver' in window)) {
            console.warn('IntersectionObserver not supported, loading all images immediately');
            this.loadAllImages();
            return;
        }

        const options = {
            root: null,
            rootMargin: '50px',
            threshold: 0.1
        };

        this.lazyImageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.loadImage(entry.target);
                    this.lazyImageObserver.unobserve(entry.target);
                }
            });
        }, options);

        // 기존 이미지들 관찰 시작
        this.observeExistingImages();
        
        // 새로 추가되는 이미지들 감지
        this.observeNewImages();
    }

    /**
     * 기존 이미지들 관찰 시작
     */
    observeExistingImages() {
        const images = document.querySelectorAll('img[data-src]');
        images.forEach(img => {
            this.lazyImageObserver.observe(img);
        });
    }

    /**
     * 새로 추가되는 이미지들 감지
     */
    observeNewImages() {
        const container = document.querySelector('.container');
        if (!container) return;

        const mutationObserver = new MutationObserver((mutations) => {
            mutations.forEach(mutation => {
                mutation.addedNodes.forEach(node => {
                    if (node.nodeType === Node.ELEMENT_NODE) {
                        // 추가된 노드가 이미지인 경우
                        if (node.tagName === 'IMG' && node.hasAttribute('data-src')) {
                            this.lazyImageObserver.observe(node);
                        }
                        
                        // 자식 이미지들도 확인
                        const childImages = node.querySelectorAll('img[data-src]');
                        childImages.forEach(img => {
                            this.lazyImageObserver.observe(img);
                        });
                    }
                });
            });
        });

        mutationObserver.observe(container, {
            childList: true,
            subtree: true
        });
    }

    /**
     * 이미지 로드
     * @param {HTMLImageElement} img - 이미지 엘리먼트
     */
    loadImage(img) {
        if (this.loadedImages.has(img) || this.failedImages.has(img)) {
            return;
        }

        const src = img.getAttribute('data-src');
        if (!src) return;

        // 로딩 상태 표시
        img.classList.add('loading');
        
        // 임시 이미지 생성하여 프리로드
        const tempImage = new Image();
        
        tempImage.onload = () => {
            img.src = src;
            img.classList.remove('loading');
            img.classList.add('loaded');
            this.loadedImages.add(img);
            
            // fade-in 애니메이션
            img.style.opacity = '0';
            img.style.transition = 'opacity 0.3s ease';
            
            requestAnimationFrame(() => {
                img.style.opacity = '1';
            });
        };

        tempImage.onerror = () => {
            this.handleImageError(img, src);
        };

        tempImage.src = src;
    }

    /**
     * 이미지 에러 처리
     * @param {HTMLImageElement} img - 이미지 엘리먼트
     * @param {string} src - 이미지 소스
     */
    handleImageError(img, src) {
        const retryCount = this.retryAttempts.get(img) || 0;
        
        if (retryCount < this.maxRetries) {
            // 재시도
            this.retryAttempts.set(img, retryCount + 1);
            console.warn(`🔄 Retrying image load (${retryCount + 1}/${this.maxRetries}): ${src}`);
            
            setTimeout(() => {
                this.loadImage(img);
            }, 1000 * (retryCount + 1)); // 점진적 지연
        } else {
            // 최대 재시도 초과 - 폴백 처리
            this.failedImages.add(img);
            img.classList.remove('loading');
            img.classList.add('error');
            
            this.showImageFallback(img);
            console.error(`❌ Failed to load image after ${this.maxRetries} attempts: ${src}`);
        }
    }

    /**
     * 이미지 폴백 표시
     * @param {HTMLImageElement} img - 이미지 엘리먼트
     */
    showImageFallback(img) {
        // 기존 폴백 엘리먼트 찾기
        let fallback = img.nextElementSibling;
        if (fallback && fallback.classList.contains('image-fallback')) {
            fallback.style.display = 'block';
            img.style.display = 'none';
            return;
        }

        // 폴백 엘리먼트 생성
        fallback = document.createElement('div');
        fallback.className = 'image-fallback screenshot-placeholder';
        fallback.innerHTML = `
            <div style="text-align: center; padding: 20px; color: #666;">
                <div style="font-size: 3em; margin-bottom: 10px;">🖼️</div>
                <div>이미지를 불러올 수 없습니다</div>
                <div style="font-size: 0.8em; margin-top: 5px;">${img.alt || 'Image'}</div>
            </div>
        `;
        
        img.parentNode.insertBefore(fallback, img.nextSibling);
        img.style.display = 'none';
    }

    /**
     * 모든 이미지 즉시 로드 (폴백)
     */
    loadAllImages() {
        const images = document.querySelectorAll('img[data-src]');
        images.forEach(img => {
            const src = img.getAttribute('data-src');
            if (src) {
                img.src = src;
                img.removeAttribute('data-src');
            }
        });
    }

    /**
     * 미디어 갤러리 초기화
     */
    initMediaGallery() {
        this.setupImageClickHandlers();
        this.setupVideoHandlers();
        this.setupGalleryNavigation();
    }

    /**
     * 이미지 클릭 핸들러 설정
     */
    setupImageClickHandlers() {
        document.addEventListener('click', (e) => {
            if (e.target.tagName === 'IMG' && e.target.closest('.media-gallery')) {
                e.preventDefault();
                if (window.UIInteractions) {
                    window.UIInteractions.openImageModal(e.target);
                }
            }
        });
    }

    /**
     * 비디오 핸들러 설정
     */
    setupVideoHandlers() {
        const videos = document.querySelectorAll('video');
        videos.forEach(video => {
            // 비디오 에러 처리
            video.addEventListener('error', (e) => {
                console.error('Video load error:', e);
                this.showVideoFallback(video);
            });

            // 비디오 로드 완료
            video.addEventListener('loadedmetadata', () => {
                video.classList.add('loaded');
            });

            // 접근성: 키보드 컨트롤
            video.addEventListener('keydown', (e) => {
                switch(e.key) {
                    case ' ':
                    case 'k':
                        e.preventDefault();
                        video.paused ? video.play() : video.pause();
                        break;
                    case 'ArrowLeft':
                        e.preventDefault();
                        video.currentTime = Math.max(0, video.currentTime - 10);
                        break;
                    case 'ArrowRight':
                        e.preventDefault();
                        video.currentTime = Math.min(video.duration, video.currentTime + 10);
                        break;
                    case 'm':
                        e.preventDefault();
                        video.muted = !video.muted;
                        break;
                }
            });
        });
    }

    /**
     * 비디오 폴백 표시
     * @param {HTMLVideoElement} video - 비디오 엘리먼트
     */
    showVideoFallback(video) {
        const fallback = document.createElement('div');
        fallback.className = 'video-fallback screenshot-placeholder';
        fallback.innerHTML = `
            <div style="text-align: center; padding: 40px; color: #666;">
                <div style="font-size: 4em; margin-bottom: 15px;">🎬</div>
                <div style="font-size: 1.2em; margin-bottom: 10px;">동영상을 재생할 수 없습니다</div>
                <div style="font-size: 0.9em;">브라우저가 이 형식을 지원하지 않거나<br>파일을 찾을 수 없습니다</div>
            </div>
        `;
        
        video.parentNode.insertBefore(fallback, video.nextSibling);
        video.style.display = 'none';
    }

    /**
     * 갤러리 네비게이션 설정
     */
    setupGalleryNavigation() {
        document.addEventListener('keydown', (e) => {
            const modal = document.getElementById('imageModal');
            if (!modal || modal.style.display !== 'block') return;

            const gallery = document.querySelector('.media-gallery');
            if (!gallery) return;

            const images = Array.from(gallery.querySelectorAll('img'));
            const currentImg = document.getElementById('modalImage');
            const currentIndex = images.findIndex(img => img.src === currentImg.src);

            switch(e.key) {
                case 'ArrowLeft':
                    e.preventDefault();
                    if (currentIndex > 0) {
                        window.UIInteractions.openImageModal(images[currentIndex - 1]);
                    }
                    break;
                case 'ArrowRight':
                    e.preventDefault();
                    if (currentIndex < images.length - 1) {
                        window.UIInteractions.openImageModal(images[currentIndex + 1]);
                    }
                    break;
            }
        });
    }

    /**
     * 에러 처리 설정
     */
    setupErrorHandling() {
        // 전역 이미지 에러 처리
        document.addEventListener('error', (e) => {
            if (e.target.tagName === 'IMG') {
                this.handleImageError(e.target, e.target.src);
            }
        }, true);
    }

    /**
     * 미디어 통계 정보
     * @returns {Object} 통계 정보
     */
    getMediaStats() {
        const totalImages = document.querySelectorAll('img').length;
        const loadedImages = this.loadedImages.size;
        const failedImages = this.failedImages.size;
        const pendingImages = totalImages - loadedImages - failedImages;

        return {
            total: totalImages,
            loaded: loadedImages,
            failed: failedImages,
            pending: pendingImages,
            successRate: totalImages > 0 ? Math.round((loadedImages / totalImages) * 100) : 0
        };
    }

    /**
     * 정리
     */
    cleanup() {
        if (this.lazyImageObserver) {
            this.lazyImageObserver.disconnect();
        }
        this.loadedImages.clear();
        this.failedImages.clear();
        this.retryAttempts.clear();
    }
}

// 전역 인스턴스 생성
window.MediaManager = new MediaManager();

// 전역 함수로 노출 (기존 코드 호환성)
window.initLazyLoading = () => window.MediaManager.initLazyLoading();
window.handleImageErrors = () => window.MediaManager.setupErrorHandling();
window.initMediaGallery = () => window.MediaManager.initMediaGallery();

console.log('🖼️ Media Manager loaded successfully!');
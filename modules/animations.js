// ==========================================================================
// Animations Module - 스크롤 애니메이션 및 시각 효과
// ==========================================================================

export class AnimationManager {
    constructor() {
        this.observedElements = new Set();
        this.intersectionObserver = null;
        this.animationQueue = [];
        this.isLowPerformanceDevice = false;
        
        this.init();
    }

    /**
     * 초기화
     */
    init() {
        this.detectPerformance();
        this.initScrollAnimations();
        this.setupPerformanceOptimizations();
    }

    /**
     * 디바이스 성능 감지
     */
    detectPerformance() {
        // 메모리 정보
        const memory = navigator.deviceMemory || 4; // GB, 기본값 4GB
        
        // 하드웨어 동시성 (CPU 코어 수)
        const cores = navigator.hardwareConcurrency || 4;
        
        // 연결 정보
        const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
        const effectiveType = connection ? connection.effectiveType : '4g';
        
        // 성능 점수 계산 (0-10)
        let performanceScore = 5; // 기본값
        
        // 메모리 점수 (0-3점)
        if (memory >= 8) performanceScore += 2;
        else if (memory >= 4) performanceScore += 1;
        else performanceScore -= 1;
        
        // CPU 점수 (0-2점)
        if (cores >= 8) performanceScore += 2;
        else if (cores >= 4) performanceScore += 1;
        
        // 네트워크 점수 (0-1점)
        if (effectiveType === '4g') performanceScore += 1;
        else if (effectiveType === 'slow-2g' || effectiveType === '2g') performanceScore -= 2;
        
        this.isLowPerformanceDevice = performanceScore < 4;
        
        console.log(`🚀 Performance Score: ${performanceScore}/10 (Low Performance: ${this.isLowPerformanceDevice})`);
        
        return {
            score: performanceScore,
            isLowPerformance: this.isLowPerformanceDevice,
            details: { memory, cores, effectiveType }
        };
    }

    /**
     * 성능 최적화 설정
     */
    setupPerformanceOptimizations() {
        if (this.isLowPerformanceDevice) {
            // 저성능 디바이스에서는 애니메이션 간소화
            document.documentElement.style.setProperty('--animation-duration', '0.2s');
            document.documentElement.style.setProperty('--transition-duration', '0.1s');
        } else {
            document.documentElement.style.setProperty('--animation-duration', '0.6s');
            document.documentElement.style.setProperty('--transition-duration', '0.3s');
        }

        // Reduced motion 선호도 확인
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReducedMotion) {
            document.documentElement.classList.add('reduced-motion');
        }
    }

    /**
     * 스크롤 애니메이션 초기화
     */
    initScrollAnimations() {
        const options = {
            threshold: this.isLowPerformanceDevice ? 0.3 : 0.1,
            rootMargin: this.isLowPerformanceDevice ? '50px' : '100px'
        };

        this.intersectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateElement(entry.target);
                }
            });
        }, options);

        // 기존 섹션들에 애니메이션 적용
        this.observeExistingSections();
        
        // 새로 추가되는 섹션들 감지
        this.observeNewSections();
    }

    /**
     * 기존 섹션들 관찰 시작
     */
    observeExistingSections() {
        const sections = document.querySelectorAll('.section');
        sections.forEach(section => {
            this.prepareElementForAnimation(section);
            this.intersectionObserver.observe(section);
            this.observedElements.add(section);
        });
    }

    /**
     * 새로 추가되는 섹션들 감지
     */
    observeNewSections() {
        const container = document.querySelector('.container');
        if (!container) return;

        const mutationObserver = new MutationObserver((mutations) => {
            mutations.forEach(mutation => {
                mutation.addedNodes.forEach(node => {
                    if (node.nodeType === Node.ELEMENT_NODE) {
                        if (node.classList.contains('section')) {
                            this.prepareElementForAnimation(node);
                            this.intersectionObserver.observe(node);
                            this.observedElements.add(node);
                        }
                        
                        // 자식 섹션들도 확인
                        const childSections = node.querySelectorAll('.section');
                        childSections.forEach(section => {
                            if (!this.observedElements.has(section)) {
                                this.prepareElementForAnimation(section);
                                this.intersectionObserver.observe(section);
                                this.observedElements.add(section);
                            }
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
     * 엘리먼트 애니메이션 준비
     * @param {HTMLElement} element - 엘리먼트
     */
    prepareElementForAnimation(element) {
        if (this.isLowPerformanceDevice) {
            // 저성능 디바이스에서는 간단한 fade-in만
            element.style.opacity = '0';
            element.style.transition = 'opacity 0.3s ease';
        } else {
            // 고성능 디바이스에서는 풀 애니메이션
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        }
    }

    /**
     * 엘리먼트 애니메이션 실행
     * @param {HTMLElement} element - 엘리먼트
     */
    animateElement(element) {
        // 이미 애니메이션된 엘리먼트는 건너뛰기
        if (element.classList.contains('animated')) return;

        element.classList.add('animated');
        
        if (this.isLowPerformanceDevice) {
            element.style.opacity = '1';
        } else {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }

        // 스킬바가 있다면 애니메이션 시작
        const skillBars = element.querySelectorAll('.skill-fill');
        if (skillBars.length > 0) {
            this.initSkillBarAnimations(skillBars);
            this.animateSkillBars(skillBars);
        }
    }

    /**
     * 스킬바 애니메이션 초기화
     */
    initSkillBarAnimations(skillBars) {
        skillBars.forEach(bar => {
            bar.style.width = '0%';
            bar.style.transition = this.isLowPerformanceDevice ? 
                'width 0.8s ease' : 
                'width 1.5s cubic-bezier(0.4, 0, 0.2, 1)';
        });
    }

    /**
     * 스킬바 애니메이션 실행
     * @param {NodeList} skillBars - 스킬바 엘리먼트들
     */
    animateSkillBars(skillBars) {
        skillBars.forEach((bar, index) => {
            const targetWidth = bar.getAttribute('data-width') || '0%';
            bar.style.width = '0%';
            
            setTimeout(() => {
                bar.style.width = targetWidth;
                
                // 애니메이션 완료 후 효과
                if (!this.isLowPerformanceDevice) {
                    bar.addEventListener('transitionend', () => {
                        bar.style.boxShadow = '0 0 10px rgba(33, 150, 243, 0.5)';
                        setTimeout(() => {
                            bar.style.boxShadow = '';
                        }, 500);
                    }, { once: true });
                }
            }, index * (this.isLowPerformanceDevice ? 100 : 200));
        });
    }

    /**
     * 커스텀 애니메이션 추가
     * @param {HTMLElement} element - 엘리먼트
     * @param {string} animation - 애니메이션 타입
     */
    addCustomAnimation(element, animation) {
        if (!element) return;

        const animations = {
            'bounce-in': {
                from: 'transform: scale(0.3) translateY(-50px); opacity: 0;',
                to: 'transform: scale(1) translateY(0); opacity: 1;'
            },
            'slide-in-left': {
                from: 'transform: translateX(-100px); opacity: 0;',
                to: 'transform: translateX(0); opacity: 1;'
            },
            'slide-in-right': {
                from: 'transform: translateX(100px); opacity: 0;',
                to: 'transform: translateX(0); opacity: 1;'
            },
            'fade-in-up': {
                from: 'transform: translateY(30px); opacity: 0;',
                to: 'transform: translateY(0); opacity: 1;'
            }
        };

        const animationData = animations[animation];
        if (!animationData) return;

        // 시작 상태 설정
        element.style.cssText += animationData.from;
        element.style.transition = this.isLowPerformanceDevice ? 
            'all 0.3s ease' : 
            'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';

        // 애니메이션 실행
        requestAnimationFrame(() => {
            element.style.cssText = element.style.cssText.replace(
                animationData.from, 
                animationData.to
            );
        });
    }

    /**
     * 성능 모니터링
     */
    monitorPerformance() {
        let frameCount = 0;
        let lastTime = performance.now();

        const measureFPS = () => {
            frameCount++;
            const currentTime = performance.now();
            
            if (currentTime - lastTime >= 1000) {
                const fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
                
                if (fps < 30 && !this.isLowPerformanceDevice) {
                    console.warn('🐌 Low FPS detected, switching to performance mode');
                    this.isLowPerformanceDevice = true;
                    this.setupPerformanceOptimizations();
                }
                
                frameCount = 0;
                lastTime = currentTime;
            }
            
            requestAnimationFrame(measureFPS);
        };

        requestAnimationFrame(measureFPS);
    }

    /**
     * 애니메이션 정리
     */
    cleanup() {
        if (this.intersectionObserver) {
            this.intersectionObserver.disconnect();
        }
        this.observedElements.clear();
        this.animationQueue = [];
    }
}

// 전역 인스턴스 생성
window.AnimationManager = new AnimationManager();

// 전역 함수로 노출 (기존 코드 호환성)
window.initScrollAnimations = () => window.AnimationManager.initScrollAnimations();

console.log('🎬 Animation Manager loaded successfully!');
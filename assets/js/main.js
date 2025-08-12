// ==========================================================================
// 경력 계산 및 타이틀 업데이트
// ==========================================================================

// 경력 시작일 설정
const careerStartDate = new Date('2020-11-11');

/**
 * 경력 기간 계산
 * @returns {Object} 경력 정보 객체
 */
function calculateExperience() {
    const now = new Date();
    const diffTime = Math.abs(now - careerStartDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    // 년/월/일 계산
    const years = Math.floor(diffDays / 365);
    const remainingDays = diffDays % 365;
    const months = Math.floor(remainingDays / 30);
    const days = remainingDays % 30;
    
    return { years, months, days, totalDays: diffDays };
}

/**
 * 타이틀과 등급 업데이트
 */
function updateTitle() {
    const exp = calculateExperience();
    const titleElement = document.getElementById('dynamic-title');
    
    // 요소가 존재하지 않으면 종료
    if (!titleElement) {
        console.log('Title element not found');
        return;
    }
    
    let rankText = '';
    let tooltipText = '';
    let expText = `${exp.years}년 ${exp.months}개월`;
    
    // 마인크래프트 블록 색상별 동그라미 랭크 시스템
    if (exp.years >= 15) {
        rankText = '⚫ BEDROCK ENGINEER';
    } else if (exp.years >= 10) {
        rankText = '🔵 DIAMOND ENGINEER';
    } else if (exp.years >= 7) {
        rankText = '🟣 OBSIDIAN ENGINEER';
    } else if (exp.years >= 5) {
        rankText = '🟡 GOLD ENGINEER';
    } else if (exp.years >= 3) {
        rankText = '⚪ IRON ENGINEER';
    } else if (exp.years >= 1) {
        rankText = '🔘 STONE ENGINEER';
    } else {
        rankText = '🟤 DIRT ENGINEER';
    }

    tooltipText = `0-1년 : 🟤 DIRT
1-3년: 🔘 STONE
3-5년: ⚪ IRON
5-7년: 🟡 GOLD
7-10년: 🟣 OBSIDIAN
10-15년: 🔵 DIAMOND
15년+: ⚫ BEDROCK`;
    
    // 타이틀 업데이트
    titleElement.textContent = `🎮 GAME DEVELOPER • ${rankText} (${expText})🎮`;
    
    // 툴팁 업데이트 (브라우저 기본 툴팁 사용)
    titleElement.title = tooltipText;
    
    console.log('Title updated successfully!');
    console.log(`Current experience: ${exp.years}년 ${exp.months}개월 ${exp.days}일`);
}

// ==========================================================================
// 프로젝트 디테일 토글 기능
// ==========================================================================

/**
 * 프로젝트 상세 정보 토글
 * @param {string} projectId - 토글할 프로젝트 ID
 */
function toggleDetails(projectId) {
    const content = document.getElementById(projectId);
    const button = event.target;
    
    if (!content || !button) {
        console.log('Toggle elements not found');
        return;
    }
    
    if (content.classList.contains('active')) {
        // 현재 열려있는 상태 -> 닫기
        content.classList.remove('active');
        button.textContent = button.textContent.replace('CLOSE', 'VIEW');
        button.classList.remove('active');
        console.log(`Closed project details: ${projectId}`);
    } else {
        // 다른 모든 상세 정보 닫기
        document.querySelectorAll('.details-content.active').forEach(el => {
            el.classList.remove('active');
        });
        document.querySelectorAll('.details-toggle.active').forEach(el => {
            el.classList.remove('active');
            el.textContent = el.textContent.replace('CLOSE', 'VIEW');
        });
        
        // 현재 항목 열기
        content.classList.add('active');
        button.textContent = button.textContent.replace('VIEW', 'CLOSE');
        button.classList.add('active');
        console.log(`Opened project details: ${projectId}`);
    }
}

// ==========================================================================
// 이미지 모달 기능
// ==========================================================================

/**
 * 이미지 모달 열기
 * @param {HTMLImageElement} imgElement - 클릭된 이미지 요소
 */
function openImageModal(imgElement) {
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const modalCaption = document.getElementById('modalCaption');
    
    if (modal && modalImg && modalCaption) {
        modal.classList.add('active');
        modalImg.src = imgElement.src;
        modalImg.alt = imgElement.alt;
        
        // 캡션 설정 (이미지의 alt 텍스트 또는 부모의 캡션 사용)
        const captionElement = imgElement.parentElement.querySelector('.media-caption');
        modalCaption.textContent = captionElement ? captionElement.textContent : imgElement.alt;
        
        // ESC 키로 닫기 가능하도록 이벤트 리스너 추가
        document.addEventListener('keydown', handleModalKeydown);
        
        console.log('Image modal opened:', imgElement.alt);
    }
}

/**
 * 이미지 모달 닫기
 */
function closeImageModal() {
    const modal = document.getElementById('imageModal');
    if (modal) {
        modal.classList.remove('active');
        
        // 키보드 이벤트 리스너 제거
        document.removeEventListener('keydown', handleModalKeydown);
        
        console.log('Image modal closed');
    }
}

/**
 * 모달에서 키보드 이벤트 처리
 * @param {KeyboardEvent} event - 키보드 이벤트
 */
function handleModalKeydown(event) {
    if (event.key === 'Escape') {
        closeImageModal();
    }
}

// ==========================================================================
// 스무스 스크롤 기능
// ==========================================================================

/**
 * 부드러운 스크롤 효과
 * @param {string} targetId - 스크롤할 대상 요소 ID
 */
function smoothScrollTo(targetId) {
    const target = document.getElementById(targetId);
    if (target) {
        target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// ==========================================================================
// 애니메이션 효과
// ==========================================================================

/**
 * 요소가 뷰포트에 들어올 때 애니메이션 트리거
 */
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // 애니메이션 대상 요소들 관찰
    document.querySelectorAll('.section, .project-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

/**
 * 스킬 레벨 바 애니메이션
 */
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-fill');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const width = bar.style.width;
                
                // 애니메이션 초기화
                bar.style.width = '0%';
                
                // 애니메이션 실행
                setTimeout(() => {
                    bar.style.transition = 'width 1.5s ease-out';
                    bar.style.width = width;
                }, 200);
                
                observer.unobserve(bar);
            }
        });
    }, { threshold: 0.5 });
    
    skillBars.forEach(bar => observer.observe(bar));
}

// ==========================================================================
// 이미지 지연 로딩 및 오류 처리
// ==========================================================================

/**
 * 이미지 지연 로딩 초기화
 */
function initLazyLoading() {
    // Intersection Observer가 지원되는 경우에만 사용
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    
                    // data-src가 있으면 src로 이동 (지연 로딩)
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                    
                    // 로딩 클래스 제거
                    img.classList.remove('lazy-loading');
                    img.classList.add('lazy-loaded');
                    
                    // 관찰 중지
                    observer.unobserve(img);
                }
            });
        });

        // 지연 로딩할 이미지들 관찰 시작
        document.querySelectorAll('img[data-src]').forEach(img => {
            img.classList.add('lazy-loading');
            imageObserver.observe(img);
        });
    }
}

/**
 * 이미지 로딩 실패 시 폴백 처리
 */
function handleImageErrors() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        // 이미 onerror가 설정되어 있지 않은 경우에만 추가
        if (!img.onerror) {
            img.onerror = function() {
                console.log('Image failed to load:', this.src);
                
                // 폴백 이미지가 있는 경우 표시
                const fallback = this.nextElementSibling;
                if (fallback && fallback.classList.contains('image-fallback')) {
                    this.style.display = 'none';
                    fallback.style.display = 'block';
                }
            };
        }
    });
}

/**
 * 미디어 갤러리 초기화
 */
function initMediaGallery() {
    // 비디오 자동재생 방지 및 로딩 최적화
    const videos = document.querySelectorAll('video');
    videos.forEach(video => {
        // 모바일에서 자동재생 방지
        if (getDeviceType() === 'mobile') {
            video.preload = 'metadata';
        }
        
        // 비디오 로딩 오류 처리
        video.onerror = function() {
            console.log('Video failed to load:', this.src);
            const fallback = this.nextElementSibling;
            if (fallback && fallback.classList.contains('image-fallback')) {
                this.style.display = 'none';
                fallback.style.display = 'block';
            }
        };
    });
    
    // 이미지 클릭 이벤트 설정
    const galleryImages = document.querySelectorAll('.media-item img');
    galleryImages.forEach(img => {
        img.style.cursor = 'pointer';
        img.title = '클릭하여 크게 보기';
    });
}

/**
 * 기술 아이콘 로딩 최적화
 */
function optimizeTechIcons() {
    const techIcons = document.querySelectorAll('.tech-icon');
    
    techIcons.forEach(icon => {
        // 아이콘 로딩 실패 시 숨김 처리
        icon.onerror = function() {
            this.style.display = 'none';
            console.log('Tech icon failed to load:', this.src);
        };
        
        // 아이콘 로딩 성공 시 애니메이션 효과
        icon.onload = function() {
            this.style.opacity = '0';
            this.style.transition = 'opacity 0.3s ease';
            setTimeout(() => {
                this.style.opacity = '1';
            }, 100);
        };
    });
}

// ==========================================================================
// 콘솔 아트
// ==========================================================================

/**
 * 콘솔에 마인크래프트 아트 출력
 */
function displayConsoleArt() {
    const art = `
%c
██████╗  █████╗ ███╗   ███╗███████╗    ██████╗ ███████╗██╗   ██╗
██╔════╝ ██╔══██╗████╗ ████║██╔════╝    ██╔══██╗██╔════╝██║   ██║
██║  ███╗███████║██╔████╔██║█████╗      ██║  ██║█████╗  ██║   ██║
██║   ██║██╔══██║██║╚██╔╝██║██╔══╝      ██║  ██║██╔══╝  ╚██╗ ██╔╝
╚██████╔╝██║  ██║██║ ╚═╝ ██║███████╗    ██████╔╝███████╗ ╚████╔╝ 
 ╚═════╝ ╚═╝  ╚═╝╚═╝     ╚═╝╚══════╝    ╚═════╝ ╚══════╝  ╚═══╝

🎮 포트폴리오에 방문해주셔서 감사합니다!
💻 개발자 도구를 열어보시는 군요! 
⚡ 혹시 함께 일하고 싶으시다면 연락주세요!
    `;
    
    console.log(art, 'color: #4CAF50; font-family: monospace; font-size: 12px;');
}

// ==========================================================================
// 유틸리티 함수들
// ==========================================================================

/**
 * 디바이스 타입 감지 (성능 최적화 포함)
 * @returns {string} 디바이스 타입
 */
function getDeviceType() {
    const ua = navigator.userAgent;
    if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
        return 'tablet';
    }
    if (/Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
        return 'mobile';
    }
    return 'desktop';
}

/**
 * 디바이스 성능 감지 및 애니메이션 최적화
 */
function optimizeAnimationsForDevice() {
    const deviceType = getDeviceType();
    const logo = document.querySelector('.minecraft-logo');
    
    if (!logo) return;
    
    // 저성능 디바이스 감지
    const isLowPerformance = detectLowPerformanceDevice();
    
    // 배터리 상태 확인 (지원하는 브라우저에서)
    const isLowBattery = checkBatteryLevel();
    
    if (deviceType === 'mobile' || isLowPerformance || isLowBattery) {
        // 모바일 또는 저성능 디바이스에서 추가 최적화
        logo.style.willChange = 'opacity';
        logo.style.transform = 'translate3d(0, 0, 0)';
        
        // 매우 저성능인 경우 애니메이션 비활성화
        if (isLowPerformance) {
            logo.style.animation = 'none';
            logo.style.textShadow = '0 0 8px #0ff';
        }
    }
    
    console.log(`🎯 Device optimization: ${deviceType}, Low performance: ${isLowPerformance}, Low battery: ${isLowBattery}`);
}

/**
 * 저성능 디바이스 감지
 * @returns {boolean} 저성능 디바이스 여부
 */
function detectLowPerformanceDevice() {
    // RAM 메모리 확인 (지원하는 브라우저에서)
    if ('deviceMemory' in navigator) {
        return navigator.deviceMemory <= 2; // 2GB 이하
    }
    
    // CPU 코어 수 확인
    if ('hardwareConcurrency' in navigator) {
        return navigator.hardwareConcurrency <= 2; // 2코어 이하
    }
    
    // User Agent 기반 저성능 디바이스 패턴
    const ua = navigator.userAgent.toLowerCase();
    const lowPerformancePatterns = [
        'android 4', 'android 5', 'android 6',
        'iphone os 9', 'iphone os 10', 'iphone os 11',
        'samsung-sm-', 'gt-i9', 'gt-s', 'sh-',
        'arm_64', 'armv6', 'armv7'
    ];
    
    return lowPerformancePatterns.some(pattern => ua.includes(pattern));
}

/**
 * 배터리 레벨 확인
 * @returns {boolean} 저배터리 상태 여부
 */
function checkBatteryLevel() {
    // Battery API가 지원되는 경우
    if ('getBattery' in navigator) {
        navigator.getBattery().then(battery => {
            if (battery.level <= 0.2 || battery.charging === false) {
                // 배터리 20% 이하이거나 충전 중이 아닌 경우
                const logo = document.querySelector('.minecraft-logo');
                if (logo) {
                    logo.style.animationDuration = '3s'; // 느린 애니메이션
                }
                return true;
            }
        }).catch(() => {
            // Battery API 오류 시 무시
        });
    }
    return false;
}

/**
 * 브라우저 성능 모니터링 (개발용)
 */
function monitorPerformance() {
    if ('performance' in window) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                const perfData = performance.getEntriesByType('navigation')[0];
                const deviceType = getDeviceType();
                const isLowPerf = detectLowPerformanceDevice();
                
                console.log('📊 Performance Metrics:');
                console.log(`Load Time: ${(perfData.loadEventEnd - perfData.fetchStart).toFixed(2)}ms`);
                console.log(`DOM Ready: ${(perfData.domContentLoadedEventEnd - perfData.fetchStart).toFixed(2)}ms`);
                console.log(`Device Type: ${deviceType}`);
                console.log(`Low Performance: ${isLowPerf}`);
                
                // 모바일 애니메이션 최적화 상태 확인
                const logo = document.querySelector('.minecraft-logo');
                if (logo && deviceType === 'mobile') {
                    const animationName = getComputedStyle(logo).animationName;
                    console.log(`🎯 Mobile Animation: ${animationName === 'flickerMobile' ? 'Optimized ✅' : 'Standard'}`);
                }
                
                // 메모리 사용량 모니터링 (지원하는 브라우저에서)
                if ('memory' in performance) {
                    const memory = performance.memory;
                    console.log(`💾 Memory: ${(memory.usedJSHeapSize / 1024 / 1024).toFixed(2)}MB used`);
                }
                
                // 프레임 레이트 모니터링 시작
                if (deviceType === 'mobile') {
                    monitorFrameRate();
                }
            }, 0);
        });
    }
}

/**
 * 프레임 레이트 모니터링 (모바일 전용)
 */
function monitorFrameRate() {
    let frames = 0;
    let lastTime = performance.now();
    
    function countFrames(timestamp) {
        frames++;
        
        if (timestamp - lastTime >= 1000) {
            const fps = Math.round((frames * 1000) / (timestamp - lastTime));
            
            if (fps < 30) {
                console.warn(`⚠️ Low FPS detected: ${fps}fps - Consider reducing animations`);
                
                // 매우 낮은 FPS인 경우 애니메이션 자동 비활성화
                if (fps < 20) {
                    const logo = document.querySelector('.minecraft-logo');
                    if (logo) {
                        logo.style.animation = 'none';
                        logo.style.textShadow = '0 0 8px #0ff';
                        console.log('🚨 Animation disabled due to low performance');
                    }
                }
            } else {
                console.log(`✅ Good FPS: ${fps}fps`);
            }
            
            frames = 0;
            lastTime = timestamp;
        }
        
        // 5초간만 모니터링
        if (timestamp - performance.timing.navigationStart < 5000) {
            requestAnimationFrame(countFrames);
        }
    }
    
    requestAnimationFrame(countFrames);
}

// ==========================================================================
// 이벤트 리스너 및 초기화
// ==========================================================================

/**
 * 페이지 로드 완료 시 초기화
 */
document.addEventListener('DOMContentLoaded', function() {
    console.log('🎮 Portfolio initialized!');
    
    // 콘솔 아트 출력
    displayConsoleArt();
    
    // 디바이스 최적화 (가장 먼저 실행)
    optimizeAnimationsForDevice();
    
    // 타이틀 업데이트
    setTimeout(() => {
        updateTitle();
    }, 100);
    
    // 섹션 로더 초기화 및 동적 섹션 로드
    setTimeout(() => {
        initializeSectionSystem();
    }, 200);
    
    // 매일 자정에 경력 업데이트
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(now.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    const msUntilMidnight = tomorrow.getTime() - now.getTime();
    
    setTimeout(() => {
        updateTitle();
        // 이후 24시간마다 업데이트
        setInterval(updateTitle, 24 * 60 * 60 * 1000);
    }, msUntilMidnight);
});

/**
 * 섹션 시스템 초기화
 */
async function initializeSectionSystem() {
    try {
        // 섹션 템플릿과 로더가 로드될 때까지 대기
        if (typeof window.SectionLoader === 'undefined') {
            console.log('⏳ Waiting for Section Loader...');
            setTimeout(initializeSectionSystem, 100);
            return;
        }
        
        console.log('🚀 Initializing section system...');
        
        // 섹션 데이터 로드 및 렌더링
        await window.SectionLoader.renderAllSections('main-container');
        
        // 로딩 메시지 제거
        const loadingMessage = document.getElementById('loading-message');
        if (loadingMessage) {
            loadingMessage.style.opacity = '0';
            setTimeout(() => {
                loadingMessage.remove();
            }, 300);
        }
        
        // 애니메이션 초기화 (섹션이 로드된 후)
        setTimeout(() => {
            initScrollAnimations();
            animateSkillBars();
        }, 500);
        
        // 미디어 관련 기능 초기화
        setTimeout(() => {
            initMediaGallery();
            initLazyLoading();
            handleImageErrors();
            optimizeTechIcons();
        }, 700);
        
        console.log('✅ Section system initialized successfully!');
        
    } catch (error) {
        console.error('❌ Failed to initialize section system:', error);
        
        // 폴백: 로딩 메시지를 오류 메시지로 변경
        const loadingMessage = document.getElementById('loading-message');
        if (loadingMessage) {
            loadingMessage.innerHTML = '⚠️ 섹션 로드 중 오류가 발생했습니다. 페이지를 새로고침해주세요.';
            loadingMessage.style.color = '#ff6b6b';
        }
    }
}

/**
 * 윈도우 로드 완료 시 추가 초기화
 */
window.addEventListener('load', function() {
    console.log('🚀 All resources loaded!');
    
    // 최종 타이틀 업데이트 확인
    setTimeout(() => {
        if (document.getElementById('dynamic-title').textContent.includes('CALCULATING')) {
            updateTitle();
        }
    }, 200);
    
    // 모든 이미지가 로드된 후 최종 체크
    const images = document.querySelectorAll('img');
    let loadedImages = 0;
    
    images.forEach(img => {
        if (img.complete) {
            loadedImages++;
        } else {
            img.addEventListener('load', () => {
                loadedImages++;
                if (loadedImages === images.length) {
                    console.log('📸 All images loaded successfully!');
                }
            });
        }
    });
});

// 개발 모드에서 성능 모니터링 활성화
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    monitorPerformance();
}

// ==========================================================================
// Export 기능
// ==========================================================================

/**
 * Word 문서로 내보내기 (HTML을 Word에서 읽을 수 있는 형식으로 변환)
 */
function exportToWord() {
    const button = event.target.closest('.export-btn');
    showLoading(button);
    
    try {
        // 포트폴리오 내용을 Word 호환 HTML로 변환
        const portfolioContent = generateWordContent();
        
        // Blob 생성 (Word에서 읽을 수 있는 HTML 형식)
        const blob = new Blob([portfolioContent], {
            type: 'application/msword'
        });
        
        // 다운로드 링크 생성
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `김개발자_포트폴리오_${getFormattedDate()}.doc`;
        
        // 다운로드 실행
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // URL 해제
        setTimeout(() => {
            window.URL.revokeObjectURL(url);
        }, 1000);
        
        console.log('Word 문서 다운로드 완료');
        
    } catch (error) {
        console.error('Word 내보내기 실패:', error);
        alert('Word 문서 생성 중 오류가 발생했습니다.');
    } finally {
        hideLoading(button);
    }
}

/**
 * PDF로 내보내기 (브라우저 인쇄 기능 활용)
 */
function exportToPDF() {
    const button = event.target.closest('.export-btn');
    showLoading(button);
    
    try {
        // PDF 인쇄용 설정
        const printCSS = `
            <style>
                @media print {
                    @page { 
                        margin: 1cm; 
                        size: A4; 
                    }
                    body { 
                        font-family: 'Arial', sans-serif !important;
                        -webkit-print-color-adjust: exact !important;
                        color-adjust: exact !important;
                    }
                }
            </style>
        `;
        
        // 현재 head에 임시 스타일 추가
        const styleElement = document.createElement('style');
        styleElement.innerHTML = printCSS.replace(/<\/?style>/g, '');
        document.head.appendChild(styleElement);
        
        // PDF로 인쇄 안내
        setTimeout(() => {
            alert('PDF로 저장하려면:\n1. 인쇄 대화상자에서 "대상"을 "PDF로 저장" 선택\n2. "저장" 버튼 클릭');
            window.print();
            
            // 임시 스타일 제거
            setTimeout(() => {
                document.head.removeChild(styleElement);
            }, 1000);
        }, 500);
        
        console.log('PDF 인쇄 대화상자 열림');
        
    } catch (error) {
        console.error('PDF 내보내기 실패:', error);
        alert('PDF 생성 중 오류가 발생했습니다.');
    } finally {
        hideLoading(button);
    }
}

/**
 * Word 호환 HTML 콘텐츠 생성
 */
function generateWordContent() {
    const exp = calculateExperience();
    const currentDate = getFormattedDate();
    
    // 모든 프로젝트 세부 내용 수집
    const projectDetails = collectProjectDetails();
    
    return `
<!DOCTYPE html>
<html xmlns:o="urn:schemas-microsoft-com:office:office"
      xmlns:w="urn:schemas-microsoft-com:office:word"
      xmlns="http://www.w3.org/TR/REC-html40">
<head>
<meta charset="utf-8">
<meta name="ProgId" content="Word.Document">
<meta name="Generator" content="Microsoft Word 15">
<meta name="Originator" content="Microsoft Word 15">
<title>김개발자 - 게임 개발자 포트폴리오</title>
<!--[if gte mso 9]>
<xml>
<w:WordDocument>
<w:View>Print</w:View>
<w:Zoom>90</w:Zoom>
<w:DoNotPromptForConvert/>
<w:DoNotShowInsertionsAndDeletions/>
</w:WordDocument>
</xml>
<![endif]-->
<style>
body { font-family: 'Malgun Gothic', Arial, sans-serif; font-size: 12pt; line-height: 1.6; margin: 40px; }
h1 { font-size: 24pt; color: #1976D2; text-align: center; margin-bottom: 20px; }
h2 { font-size: 18pt; color: #333; border-bottom: 2px solid #1976D2; padding-bottom: 5px; margin-top: 30px; }
h3 { font-size: 14pt; color: #1976D2; margin-top: 20px; }
h4 { font-size: 12pt; color: #666; margin-top: 15px; }
.header { text-align: center; margin-bottom: 40px; border-bottom: 3px solid #1976D2; padding-bottom: 20px; }
.contact-info { margin: 20px 0; text-align: center; }
.contact-item { display: inline-block; margin: 0 15px; padding: 5px 10px; border: 1px solid #ccc; }
.project-card { border: 1px solid #ddd; padding: 20px; margin: 20px 0; page-break-inside: avoid; }
.project-meta { margin: 10px 0; }
.meta-item { display: inline-block; background: #f0f0f0; padding: 3px 8px; margin: 2px; border: 1px solid #ccc; font-size: 10pt; }
.tech-tag { display: inline-block; background: #e3f2fd; padding: 3px 8px; margin: 2px; border: 1px solid #1976d2; font-size: 10pt; }
.skill-category { margin: 20px 0; }
.skill-item { margin: 10px 0; }
.code-snippet, .architecture-diagram { background: #f5f5f5; border: 1px solid #ddd; padding: 15px; margin: 10px 0; font-family: 'Consolas', monospace; font-size: 10pt; white-space: pre-wrap; }
.performance-stats { display: table; width: 100%; margin: 15px 0; }
.stat-item { display: table-cell; background: #fff3e0; border: 1px solid #ff9800; padding: 10px; text-align: center; }
ul { margin-left: 20px; }
li { margin: 5px 0; }
</style>
</head>
<body>

<div class="header">
    <h1>김개발자 - 게임 개발자 포트폴리오</h1>
    <p><strong>🎮 GAME DEVELOPER • ${getRankText(exp.years)} • UNITY & UNREAL MASTER 🎮</strong></p>
    <div class="contact-info">
        <span class="contact-item">📧 developer@email.com</span>
        <span class="contact-item">📱 010-0000-0000</span>
        <span class="contact-item">🔗 github.com/developer</span>
        <span class="contact-item">💼 yourusername.github.io</span>
    </div>
    <p><em>생성일: ${currentDate} | 총 경력: ${exp.years}년 ${exp.months}개월</em></p>
</div>

<h2>🏗️ PLAYER PROFILE (프로필 개요)</h2>
<p><strong>🏗️ BUILDING EXPERIENCE:</strong> 5년<br>
<strong>🎯 SPECIALIZATION:</strong> 게임 세계 구축 및 최적화<br>
<strong>⚡ CORE SKILLS:</strong> Unity & Unreal Engine을 활용한 크로스 플랫폼 게임 개발</p>

<p>마인크래프트처럼 무한한 가능성을 가진 게임 세계를 만드는 것이 저의 목표입니다. 한 블록 한 블록 쌓아 올리듯 안정적이고 확장 가능한 코드를 작성하며, 플레이어들이 멋진 모험을 할 수 있는 게임을 만들어갑니다. 성능 최적화와 메모리 관리를 통해 어떤 디바이스에서도 부드럽게 실행되는 게임을 구현합니다.</p>

<h2>🎮 COMPLETED PROJECTS (상용 프로젝트)</h2>

<div class="project-card">
    <h3>[COMPANY A] MOBILE RPG WORLD</h3>
    <div class="project-meta">
        <span class="meta-item">📱 MOBILE</span>
        <span class="meta-item">👥 TEAM: 15</span>
        <span class="meta-item">⏰ 18 MONTHS</span>
        <span class="meta-item">📈 1M+ DOWNLOADS</span>
    </div>
    
    <p><strong>ROLE:</strong> 메인 클라이언트 개발자 (UI 시스템, 전투 시스템)<br>
    <strong>ACHIEVEMENTS:</strong></p>
    <ul>
        <li>🧱 Unity UGUI 기반 모듈형 UI 프레임워크 설계</li>
        <li>⚡ 메모리 사용량 40% 절감을 위한 리소스 최적화</li>
        <li>⚔️ 실시간 PvP 전투 시스템 네트워크 동기화</li>
        <li>🚀 크로스 플랫폼 자동 빌드 파이프라인 구축</li>
    </ul>
    
    <p><strong>기술 스택:</strong></p>
    <p>
        <span class="tech-tag">UNITY 2021.3</span>
        <span class="tech-tag">C#</span>
        <span class="tech-tag">UGUI</span>
        <span class="tech-tag">MIRROR NET</span>
        <span class="tech-tag">ADDRESSABLES</span>
    </p>
    
    <h4>📊 PERFORMANCE METRICS</h4>
    <div class="performance-stats">
        <div class="stat-item"><strong>40%</strong><br>메모리 절감</div>
        <div class="stat-item"><strong>60FPS</strong><br>안정 프레임</div>
        <div class="stat-item"><strong>200ms</strong><br>UI 반응속도</div>
        <div class="stat-item"><strong>15MB</strong><br>런타임 메모리</div>
    </div>
    
    <h4>🏗️ SYSTEM ARCHITECTURE</h4>
    <div class="architecture-diagram">┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   UI MANAGER    │◄──►│  RESOURCE POOL   │◄──►│  NETWORK MGR    │
│                 │    │                  │    │                 │
│ • Panel Stack   │    │ • Asset Bundle   │    │ • Mirror Net    │
│ • Event System  │    │ • Object Pool    │    │ • Sync System   │
│ • Animation Mgr │    │ • Memory Monitor │    │ • PvP Handler   │
└─────────────────┘    └──────────────────┘    └─────────────────┘
           │                       │                       │
           └───────────────────────┼───────────────────────┘
                                   ▼
                        ┌──────────────────┐
                        │   GAME CORE      │
                        │                  │
                        │ • State Machine  │
                        │ • Event Bus      │
                        │ • Save System    │
                        └──────────────────┘</div>
    
    <h4>💻 CODE SAMPLE</h4>
    <div class="code-snippet">// 최적화된 UI 매니저 핵심 로직
public class UIManager : MonoBehaviour 
{
    private Dictionary&lt;Type, UIPanel&gt; panelCache = new();
    private Stack&lt;UIPanel&gt; panelStack = new();
    
    public T ShowPanel&lt;T&gt;() where T : UIPanel
    {
        if (!panelCache.TryGetValue(typeof(T), out var panel))
        {
            panel = ResourcePool.Instance.GetPanel&lt;T&gt;();
            panelCache[typeof(T)] = panel;
        }
        
        panelStack.Push(panel);
        panel.Show();
        return panel as T;
    }
}</div>
</div>

<h2>🎮 SKILL INVENTORY (기술 스킬)</h2>

<div class="skill-category">
    <h3>🎮 GAME ENGINES</h3>
    <div class="skill-item">Unity (5년 경험) - ■■■■■ 95%</div>
    <div class="skill-item">Unreal Engine (2년 경험) - ■■■■□ 80%</div>
</div>

<div class="skill-category">
    <h3>💻 PROGRAMMING</h3>
    <div class="skill-item">C# (실무 5년) - ■■■■■ 90%</div>
    <div class="skill-item">C++ (실무 2년) - ■■■■□ 75%</div>
    <div class="skill-item">Python (학습 중) - ■■■□□ 60%</div>
</div>

<h2>💻 CODE REPOSITORY (코드 샘플)</h2>
<div class="code-snippet">🔗 GITHUB REPOSITORY ACCESS
📍 URL: github.com/developer/game-frameworks
✅ STATUS: PUBLIC ACCESS GRANTED

MODULAR UI FRAMEWORK SYSTEM
OPTIMIZED OBJECT POOLING MANAGER
EVENT DRIVEN GAMESTATE CONTROLLER
CROSS PLATFORM INPUT WRAPPER

✅ DOWNLOAD COMPLETE • ALL SYSTEMS OPERATIONAL</div>

<hr style="margin-top: 50px; border: 2px solid #1976D2;">
<p style="text-align: center; color: #666; font-size: 10pt; margin-top: 20px;">
    <em>이 문서는 웹 포트폴리오에서 자동 생성되었습니다. | 최신 정보: yourusername.github.io</em>
</p>

</body>
</html>`;
}

/**
 * 프로젝트 세부 정보 수집
 */
function collectProjectDetails() {
    const details = [];
    document.querySelectorAll('.details-content').forEach(detail => {
        if (detail.id) {
            details.push({
                id: detail.id,
                content: detail.innerHTML
            });
        }
    });
    return details;
}

/**
 * 경력에 따른 랭크 텍스트 반환
 */
function getRankText(years) {
    if (years >= 15) return '⚫ BEDROCK ENGINEER (15년+)';
    if (years >= 10) return '🔵 DIAMOND ENGINEER (10-15년)';
    if (years >= 7) return '🟣 OBSIDIAN ENGINEER (7-10년)';
    if (years >= 5) return '🟡 GOLD ENGINEER (5-7년)';
    if (years >= 3) return '⚪ IRON ENGINEER (3-5년)';
    if (years >= 1) return '🔘 STONE ENGINEER (1-3년)';
    return '🟤 DIRT ENGINEER (0-1년)';
}

/**
 * 현재 날짜를 포맷된 문자열로 반환
 */
function getFormattedDate() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

/**
 * 버튼 로딩 상태 표시
 */
function showLoading(button) {
    if (button) {
        button.classList.add('loading');
        const icon = button.querySelector('.export-icon');
        if (icon) {
            icon.textContent = '⏳';
        }
    }
}

/**
 * 버튼 로딩 상태 해제
 */
function hideLoading(button) {
    if (button) {
        setTimeout(() => {
            button.classList.remove('loading');
            const icon = button.querySelector('.export-icon');
            if (icon) {
                // 원래 아이콘으로 복원
                if (button.onclick.toString().includes('exportToWord')) {
                    icon.textContent = '📄';
                } else if (button.onclick.toString().includes('exportToPDF')) {
                    icon.textContent = '📋';
                }
            }
        }, 1000);
    }
}

// ==========================================================================
// 전역 함수 노출 (HTML에서 호출용)
// ==========================================================================

// 전역으로 노출되어야 하는 함수들
window.toggleDetails = toggleDetails;
window.smoothScrollTo = smoothScrollTo;
window.openImageModal = openImageModal;
window.closeImageModal = closeImageModal;
window.exportToWord = exportToWord;
window.exportToPDF = exportToPDF;

// Export 함수 테스트
console.log('Export functions loaded:');
console.log('exportToWord:', typeof window.exportToWord);
console.log('exportToPDF:', typeof window.exportToPDF);

console.log('🎯 Main.js with export features loaded successfully!');
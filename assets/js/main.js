/**
 * 마인크래프트 스타일 게임 개발자 포트폴리오
 * JavaScript 메인 파일
 */

// ==========================================================================
// 경력 계산 및 타이틀 업데이트
// ==========================================================================

// 경력 시작일 설정 (여기서 본인의 실제 시작일로 변경하세요)
const careerStartDate = new Date('2019-03-01'); // 예: 2019년 3월 1일 시작

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
    
    // 마인크래프트 블록 색상별 동그라미 랭크 시스템
    if (exp.years >= 15) {
        rankText = '⚫ BEDROCK ENGINEER (15년+)';
        tooltipText = '🗿 BEDROCK MASTER - 절대 파괴할 수 없는 최강의 블록 - 게임 개발의 전설적인 마스터 - 모든 기술과 경험을 겸비한 베테랑';
    } else if (exp.years >= 10) {
        rankText = '🔵 DIAMOND ENGINEER (10-15년)';
        tooltipText = '💎 DIAMOND EXPERT - 가장 단단하고 희귀한 광물 - 최고급 도구와 무기 제작 가능 - 업계 최고 수준의 시니어 개발자';
    } else if (exp.years >= 7) {
        rankText = '🟣 OBSIDIAN ENGINEER (7-10년)';
        tooltipText = '🌋 OBSIDIAN CRAFTSMAN - 용암과 물이 만나 생성되는 강력한 블록 - 네더 포털 제작에 필수적 - 고급 기술력을 보유한 전문가';
    } else if (exp.years >= 5) {
        rankText = '🟡 GOLD ENGINEER (5-7년)';
        tooltipText = '✨ GOLD SPECIALIST - 희귀하고 빛나는 귀중한 광물 - 레드스톤 회로에 최적화 - 창의적 해결책을 제시하는 시니어';
    } else if (exp.years >= 3) {
        rankText = '⚪ IRON ENGINEER (3-5년)';
        tooltipText = '⚡ IRON DEVELOPER - 실용적이고 든든한 중급 재료 - 대부분의 도구와 장비 제작 가능 - 안정적인 기술력을 갖춘 개발자';
    } else if (exp.years >= 1) {
        rankText = '🔘 STONE ENGINEER (1-3년)';
        tooltipText = '🏗️ STONE BUILDER - 기본적이지만 견고한 건축 재료 - 다양한 구조물 제작의 기초 - 탄탄한 기본기를 갖춘 주니어';
    } else {
        rankText = '🟤 DIRT ENGINEER (0-1년)';
        tooltipText = '🌱 DIRT DIGGER - 모든 것의 시작점이 되는 기본 블록 - 무한한 가능성을 품고 있음 - 열정 가득한 신입 개발자';
    }
    
    // 타이틀 업데이트
    titleElement.textContent = `🎮 GAME DEVELOPER • ${rankText} • UNITY & UNREAL MASTER 🎮`;
    
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
██████╗ ███████╗██╗   ██╗███████╗██╗      ██████╗ ██████╗ ███████╗██████╗ 
██╔══██╗██╔════╝██║   ██║██╔════╝██║     ██╔═══██╗██╔══██╗██╔════╝██╔══██╗
██║  ██║█████╗  ██║   ██║█████╗  ██║     ██║   ██║██████╔╝█████╗  ██████╔╝
██║  ██║██╔══╝  ╚██╗ ██╔╝██╔══╝  ██║     ██║   ██║██╔═══╝ ██╔══╝  ██╔══██╗
██████╔╝███████╗ ╚████╔╝ ███████╗███████╗╚██████╔╝██║     ███████╗██║  ██║
╚═════╝ ╚══════╝  ╚═══╝  ╚══════╝╚══════╝ ╚═════╝ ╚═╝     ╚══════╝╚═╝  ╚═╝

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
 * 디바이스 타입 감지
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
 * 브라우저 성능 모니터링 (개발용)
 */
function monitorPerformance() {
    if ('performance' in window) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                const perfData = performance.getEntriesByType('navigation')[0];
                console.log('📊 Performance Metrics:');
                console.log(`Load Time: ${(perfData.loadEventEnd - perfData.fetchStart).toFixed(2)}ms`);
                console.log(`DOM Ready: ${(perfData.domContentLoadedEventEnd - perfData.fetchStart).toFixed(2)}ms`);
                console.log(`Device Type: ${getDeviceType()}`);
            }, 0);
        });
    }
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
    
    // 타이틀 업데이트
    setTimeout(() => {
        updateTitle();
    }, 100);
    
    // 애니메이션 초기화
    setTimeout(() => {
        initScrollAnimations();
        animateSkillBars();
    }, 300);
    
    // 미디어 관련 기능 초기화
    setTimeout(() => {
        initMediaGallery();
        initLazyLoading();
        handleImageErrors();
        optimizeTechIcons();
    }, 500);
    
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
// 전역 함수 노출 (HTML에서 호출용)
// ==========================================================================

// 전역으로 노출되어야 하는 함수들
window.toggleDetails = toggleDetails;
window.smoothScrollTo = smoothScrollTo;
window.openImageModal = openImageModal;
window.closeImageModal = closeImageModal;

console.log('🎯 Main.js loaded successfully!');
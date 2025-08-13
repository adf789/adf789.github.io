// ==========================================================================
// Section System Module - 섹션 시스템 통합 관리
// ==========================================================================

export class SectionSystem {
    constructor() {
        this.isInitialized = false;
        this.fallbackMode = false;
        this.loadingTimeout = null;
        this.retryCount = 0;
        this.maxRetries = 3;
        
        this.init();
    }

    /**
     * 초기화
     */
    init() {
        this.markTiming('section-system-init-start');
        this.initializeSectionSystem();
    }

    /**
     * 섹션 시스템 초기화
     */
    async initializeSectionSystem() {
        console.log('🏗️ Initializing section system...');
        
        // 타임아웃 및 폴백 시스템 비활성화됨
        console.log('📋 Section system timeout disabled - primary system only');

        try {
            // 1단계: 고급 템플릿 시스템 시도
            if (await this.tryAdvancedSystem()) {
                this.clearLoadingTimeout();
                this.isInitialized = true;
                this.markTiming('section-system-init-end');
                console.log('✅ Advanced section system initialized successfully');
                return;
            }

            // 폴백 시스템 비활성화 - 로드 실패 시 무시
            console.log('⚠️ Primary section system failed - no fallback available');

        } catch (error) {
            console.log('📋 Section system failed, ignoring as requested:', error.message);
        }
    }

    /**
     * 고급 템플릿 시스템 시도
     * @returns {boolean} 성공 여부
     */
    async tryAdvancedSystem() {
        try {
            // SectionLoader와 SectionTemplateManager 확인
            if (!window.SectionManager || !window.SectionLoader) {
                console.log('🔄 Advanced components not ready, waiting...');
                return false;
            }

            // 섹션 데이터 로드 시도
            const loaded = await window.SectionLoader.loadSections();
            if (loaded && loaded.length > 0) {
                this.hideLoadingMessage();
                return true;
            }

            return false;
        } catch (error) {
            console.warn('Advanced system failed:', error);
            return false;
        }
    }

    /**
     * 폴백 섹션 로드 (비활성화됨)
     */
    loadFallbackSections() {
        console.log('📋 Fallback sections disabled - ignoring request');
    }

    /**
     * 폴백 섹션 생성
     * @param {Object} sectionData - 섹션 데이터
     * @param {HTMLElement} container - 컨테이너 엘리먼트
     */
    createFallbackSection(sectionData, container) {
        const section = document.createElement('div');
        section.className = 'section';
        
        section.innerHTML = `
            <div class="section-header">
                <div class="inventory-icon"></div>
                <span>${sectionData.title}</span>
            </div>
            <div class="section-content">
                ${sectionData.content}
            </div>
        `;

        container.appendChild(section);

        // 애니메이션 효과
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.5s ease, transform 0.5s ease';

        requestAnimationFrame(() => {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        });
    }

    /**
     * 로딩 메시지 숨기기
     */
    hideLoadingMessage() {
        const loadingMessage = document.getElementById('loading-message');
        if (loadingMessage) {
            loadingMessage.style.transition = 'opacity 0.3s ease';
            loadingMessage.style.opacity = '0';
            
            setTimeout(() => {
                loadingMessage.style.display = 'none';
            }, 300);
        }
    }

    /**
     * 에러 메시지 표시
     */
    showErrorMessage() {
        const container = document.querySelector('.container');
        if (!container) return;

        const errorDiv = document.createElement('div');
        errorDiv.innerHTML = `
            <div style="text-align: center; padding: 50px; color: #666;">
                <div style="font-size: 3em; margin-bottom: 20px;">⚠️</div>
                <h3>섹션을 로드할 수 없습니다</h3>
                <p>페이지를 새로고침하거나 잠시 후 다시 시도해주세요.</p>
                <button onclick="location.reload()" style="padding: 10px 20px; background: #1976D2; color: white; border: none; border-radius: 5px; cursor: pointer;">
                    🔄 새로고침
                </button>
            </div>
        `;

        const loadingMessage = document.getElementById('loading-message');
        if (loadingMessage) {
            loadingMessage.replaceWith(errorDiv);
        } else {
            container.appendChild(errorDiv);
        }
    }

    /**
     * 로딩 타임아웃 정리
     */
    clearLoadingTimeout() {
        if (this.loadingTimeout) {
            clearTimeout(this.loadingTimeout);
            this.loadingTimeout = null;
        }
    }

    /**
     * 타이밍 마크
     * @param {string} name - 마크 이름
     */
    markTiming(name) {
        if ('performance' in window && performance.mark) {
            performance.mark(name);
        }
    }

    /**
     * 시스템 상태 확인
     * @returns {Object} 상태 정보
     */
    getSystemStatus() {
        return {
            initialized: this.isInitialized,
            fallbackMode: this.fallbackMode,
            retryCount: this.retryCount,
            hasAdvancedSystem: !!(window.SectionManager && window.SectionLoader),
            hasSimpleSystem: typeof window.addSimpleSection === 'function'
        };
    }

    /**
     * 섹션 추가 (외부 API) - 중복 검사 포함
     * @param {string} title - 섹션 제목
     * @param {string} content - 섹션 내용
     */
    addSection(title, content) {
        // 중복 검사: 같은 제목의 섹션이 이미 있는지 확인
        const container = document.querySelector('.container');
        if (container) {
            const existingSections = container.querySelectorAll('.section-header span');
            for (const sectionTitle of existingSections) {
                if (sectionTitle.textContent.trim() === title.trim()) {
                    console.log(`⚠️ Section already exists, skipping: ${title}`);
                    return;
                }
            }
        }

        if (window.addSimpleSection) {
            window.addSimpleSection(title, content);
        } else if (window.SectionHelpers) {
            window.SectionHelpers.addBasicSection(title, content);
        } else {
            // 폴백: 직접 DOM 조작
            if (container) {
                this.createFallbackSection({ title, content }, container);
            }
        }
    }

    /**
     * 시스템 재시작
     */
    restart() {
        this.isInitialized = false;
        this.fallbackMode = false;
        this.retryCount = 0;
        this.clearLoadingTimeout();
        
        // 기존 섹션들 제거
        const sections = document.querySelectorAll('.section');
        sections.forEach(section => section.remove());
        
        // 로딩 메시지 표시 비활성화됨 - 폴백 없음
        
        // 재초기화
        setTimeout(() => {
            this.initializeSectionSystem();
        }, 500);
    }
}

// 전역 인스턴스 생성
window.SectionSystem = new SectionSystem();

// 전역 함수로 노출 (기존 코드 호환성)
window.initializeSectionSystem = () => window.SectionSystem.initializeSectionSystem();
window.loadFallbackSections = () => window.SectionSystem.loadFallbackSections();

console.log('🏗️ Section System loaded successfully!');